// Grammar Role Mappings
const roleNames = {
  yuklem: "Yüklem",
  ozne: "Özne",
  belirtili_nesne: "Belirtili Nesne",
  belirtisiz_nesne: "Belirtisiz Nesne",
  dolayli_tumlec: "Dolaylı Tümleç (Yer Tamlayıcısı)",
  zarf_tumleci: "Zarf Tümleci",
  edat_tumleci: "Edat Tümleci",
  cdu: "Cümle Dışı Unsur"
};

// Global App State
const state = {
  activeTab: "analyzer",
  sentences: sentenceDatabase,
  
  // Analyzer Tab State
  analyzer: {
    filteredSentences: [],
    currentIdx: 0,
    userSelections: {}, // index -> role
    isChecked: false
  },
  
  // Splitter Tab State
  splitter: {
    currentIdx: 0,
    words: [], // array of { text, originalIdx }
    userSplits: new Set(), // indices of words after which a split exists
    isSplitChecked: false,
    isLabelingMode: false,
    userSelections: {}, // groupIndex -> role
    isFinalChecked: false
  },
  
  // Quiz Tab State
  quiz: {
    currentSentence: null,
    targetRole: "",
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    isAnswered: false
  },

  // Custom Builder Tab State
  custom: {
    text: "",
    words: [],
    userSplits: new Set(),
    isSplitConfirmed: false,
    groups: [],
    userSelections: {} // groupIndex -> role
  },

  // Worksheet Tab State
  worksheet: {
    difficulty: "Kolay",
    sentences: []
  },

  // Accessibility & Smart Board State
  smartBoardMode: localStorage.getItem("smartBoardActive") === "true",
  audioFeedback: localStorage.getItem("audioFeedbackActive") !== "false", // defaults to true
  activeToken: null // { element, type, index, onSelect }
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAccessibilityToggles();
  initAnalyzer();
  initSplitter();
  initQuiz();
  initCustomBuilder();
  initWorksheet();
});

// ==========================================
// Accessibility & Smart Board Toggle & Audio Logic
// ==========================================
function initAccessibilityToggles() {
  const sbToggle = document.getElementById("smart-board-toggle");
  const audioToggle = document.getElementById("audio-feedback-toggle");
  
  // Sync state with checkbox DOM
  if (sbToggle) sbToggle.checked = state.smartBoardMode;
  if (audioToggle) audioToggle.checked = state.audioFeedback;
  
  // Apply class initially
  if (state.smartBoardMode) {
    document.body.classList.add("smart-board-active");
  } else {
    document.body.classList.remove("smart-board-active");
  }
  
  // Smart Board Mode change event
  if (sbToggle) {
    sbToggle.addEventListener("change", (e) => {
      state.smartBoardMode = e.target.checked;
      localStorage.setItem("smartBoardActive", state.smartBoardMode);
      
      if (state.smartBoardMode) {
        document.body.classList.add("smart-board-active");
        playAudioFeedback("success");
      } else {
        document.body.classList.remove("smart-board-active");
        playAudioFeedback("tap");
        closeSmartBoardSelector();
      }

      refreshActiveSplitViews();
    });
  }
  
  // Audio Feedback change event
  if (audioToggle) {
    audioToggle.addEventListener("change", (e) => {
      state.audioFeedback = e.target.checked;
      localStorage.setItem("audioFeedbackActive", state.audioFeedback);
      if (state.audioFeedback) {
        playAudioFeedback("tap");
      }
    });
  }
  
  // Initialize Selection Panel events
  initSmartBoardSelectorPanel();
}

// Web Audio API synthesizer for sound effects
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playAudioFeedback(type) {
  if (!state.audioFeedback) return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    if (type === "tap") {
      // Soft click/pop sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
      
    } else if (type === "success") {
      // Pleasant rising arpeggio chime
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const time = now + idx * 0.07;
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        
        gain.gain.setValueAtTime(0.06, time);
        gain.gain.linearRampToValueAtTime(0.001, time + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.3);
      });
      
    } else if (type === "error") {
      // Bass drop/buzzer sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.22);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.22);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (err) {
    console.error("Audio playback error:", err);
  }
}

// Selector Panel Initialization and Control
function initSmartBoardSelectorPanel() {
  const closeBtn = document.getElementById("sb-selector-close");
  const clearBtn = document.getElementById("sb-selector-clear");
  const roleButtons = document.querySelectorAll(".sb-role-btn");
  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      playAudioFeedback("tap");
      closeSmartBoardSelector();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (state.activeToken) {
        playAudioFeedback("tap");
        state.activeToken.onSelect(null);
        closeSmartBoardSelector();
      }
    });
  }
  
  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (state.activeToken) {
        const role = btn.getAttribute("data-role");
        playAudioFeedback("tap");
        state.activeToken.onSelect(role);
        closeSmartBoardSelector();
      }
    });
  });
}

function openSmartBoardSelector(tokenElement, wordText, tabType, index, onSelectCallback) {
  state.activeToken = {
    element: tokenElement,
    type: tabType,
    index: index,
    onSelect: onSelectCallback
  };
  
  // Remove selection outline from other tokens, apply to this one
  document.querySelectorAll(".word-token.selected-token").forEach(el => {
    el.classList.remove("selected-token");
  });
  tokenElement.classList.add("selected-token");
  
  // Set text in the selector panel
  const labelText = document.getElementById("sb-selected-word");
  if (labelText) labelText.innerText = wordText;
  
  // Slide up panel
  const panel = document.getElementById("smart-board-selector");
  if (panel) panel.classList.add("show");
}

function closeSmartBoardSelector() {
  if (state.activeToken && state.activeToken.element) {
    state.activeToken.element.classList.remove("selected-token");
  }
  state.activeToken = null;
  
  const panel = document.getElementById("smart-board-selector");
  if (panel) panel.classList.remove("show");
}

// ==========================================
// 1. Navigation Logic
// ==========================================
function initNavigation() {
  const navButtons = document.querySelectorAll(".nav-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-target");
      
      playAudioFeedback("tap");
      closeSmartBoardSelector();
      
      // Update nav active class
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Update panel visibility
      tabPanels.forEach(p => p.classList.remove("active"));
      document.getElementById(targetTab).classList.add("active");
      
      state.activeTab = targetTab;
      
      // Specific tab load actions
      if (targetTab === "quiz") {
        loadNewQuizQuestion();
      } else if (targetTab === "worksheet") {
        if (state.worksheet.sentences.length === 0) {
          generateWorksheet();
        }
      }
    });
  });
}

// ==========================================
// 2. Öğe Çözümleme (Analyzer) Tab Logic
// ==========================================
function initAnalyzer() {
  const diffButtons = document.querySelectorAll("#analyzer-difficulty .diff-btn");
  const resetBtn = document.getElementById("analyzer-reset");
  const checkBtn = document.getElementById("analyzer-check-btn");
  const answerBtn = document.getElementById("analyzer-answer-btn");
  const nextBtn = document.getElementById("analyzer-next-btn");

  // Filter sentences by difficulty
  diffButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      playAudioFeedback("tap");
      diffButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const diff = btn.getAttribute("data-diff");
      filterAnalyzerSentences(diff);
    });
  });

  resetBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    resetAnalyzer();
  });
  checkBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    checkAnalyzerAnswers();
  });
  answerBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    showAnalyzerAnswers();
  });
  nextBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    nextAnalyzerSentence();
  });

  // Initial load
  filterAnalyzerSentences("all");
}

function filterAnalyzerSentences(difficulty) {
  if (difficulty === "all") {
    state.analyzer.filteredSentences = [...state.sentences];
  } else {
    state.analyzer.filteredSentences = state.sentences.filter(s => s.difficulty === difficulty);
  }
  
  state.analyzer.currentIdx = 0;
  loadAnalyzerSentence();
}

function loadAnalyzerSentence() {
  const sentences = state.analyzer.filteredSentences;
  const sentenceBox = document.getElementById("analyzer-sentence-box");
  const detailsPanel = document.getElementById("analyzer-details-panel");
  
  // Hide details panel and clear selector
  detailsPanel.classList.remove("show");
  closeSmartBoardSelector();
  state.analyzer.userSelections = {};
  state.analyzer.isChecked = false;

  if (sentences.length === 0) {
    sentenceBox.innerHTML = `<p style="font-size: 1.1rem; color: var(--text-secondary);">Bu zorluk seviyesinde cümle bulunamadı.</p>`;
    return;
  }

  const currentSentence = sentences[state.analyzer.currentIdx];
  sentenceBox.innerHTML = "";

  currentSentence.analysis.forEach((part, index) => {
    const token = document.createElement("div");
    token.className = "word-token";
    token.setAttribute("data-index", index);
    token.innerHTML = `<span class="token-text">${part.text}</span>`;
    
    // Add popover container
    const popover = createRolePopover(index, (role) => {
      state.analyzer.userSelections[index] = role;
      updateAnalyzerTokenUI(token, part.text, role);
    });
    
    token.appendChild(popover);

    token.addEventListener("click", (e) => {
      // Toggle popover visibility
      if (state.analyzer.isChecked) return; // disable selection after checking
      
      playAudioFeedback("tap");
      
      if (state.smartBoardMode) {
        openSmartBoardSelector(token, part.text, "analyzer", index, (role) => {
          state.analyzer.userSelections[index] = role;
          updateAnalyzerTokenUI(token, part.text, role);
        });
      } else {
        const isPopoverBtn = e.target.closest(".popover-btn");
        if (isPopoverBtn) return; // let callback handle it
        
        const currentPopover = token.querySelector(".role-popover");
        
        // Close other open popovers
        document.querySelectorAll(".role-popover.show").forEach(p => {
          if (p !== currentPopover) p.classList.remove("show");
        });
        
        currentPopover.classList.toggle("show");
      }
      e.stopPropagation();
    });

    sentenceBox.appendChild(token);
  });

  // Close popover when clicking anywhere else
  document.addEventListener("click", () => {
    document.querySelectorAll(".role-popover.show").forEach(p => p.classList.remove("show"));
  });
}

function createRolePopover(partIndex, onSelectCallback) {
  const popover = document.createElement("div");
  popover.className = "role-popover";
  
  Object.entries(roleNames).forEach(([roleKey, roleName]) => {
    const btn = document.createElement("button");
    btn.className = "popover-btn";
    btn.setAttribute("data-role", roleKey);
    btn.innerText = roleName.split(" ")[0]; // short display
    btn.title = roleName;
    
    btn.addEventListener("click", () => {
      playAudioFeedback("tap");
      onSelectCallback(roleKey);
      popover.classList.remove("show");
    });
    
    popover.appendChild(btn);
  });
  
  return popover;
}

function updateAnalyzerTokenUI(token, text, role) {
  token.setAttribute("data-role", role);
  
  // Clear old labels
  const oldLabel = token.querySelector(".role-label");
  if (oldLabel) oldLabel.remove();
  
  if (role) {
    const label = document.createElement("span");
    label.className = "role-label";
    label.innerText = roleNames[role].split(" ")[0];
    token.appendChild(label);
  }
}

function checkAnalyzerAnswers() {
  const sentences = state.analyzer.filteredSentences;
  if (sentences.length === 0) return;

  const currentSentence = sentences[state.analyzer.currentIdx];
  let allCorrect = true;
  
  currentSentence.analysis.forEach((part, index) => {
    const token = document.querySelector(`.word-token[data-index="${index}"]`);
    const userRole = state.analyzer.userSelections[index];
    const correctRole = part.role;
    
    if (userRole !== correctRole) {
      allCorrect = false;
      if (token) {
        token.style.borderColor = "var(--color-error)";
        token.style.boxShadow = "0 0 12px rgba(239, 68, 68, 0.4)";
      }
    } else {
      if (token) {
        token.style.borderColor = "var(--color-success)";
        token.style.boxShadow = "0 0 12px rgba(16, 185, 129, 0.4)";
      }
    }
  });

  if (allCorrect) {
    playAudioFeedback("success");
    launchConfetti();
    showAnalyzerDetails(currentSentence);
  } else {
    playAudioFeedback("error");
    const sentenceBox = document.getElementById("analyzer-sentence-box");
    sentenceBox.classList.add("animate-shake");
    setTimeout(() => sentenceBox.classList.remove("animate-shake"), 400);
  }
  
  state.analyzer.isChecked = true;
}

function showAnalyzerAnswers() {
  const sentences = state.analyzer.filteredSentences;
  if (sentences.length === 0) return;

  const currentSentence = sentences[state.analyzer.currentIdx];
  
  currentSentence.analysis.forEach((part, index) => {
    const token = document.querySelector(`.word-token[data-index="${index}"]`);
    if (token) {
      updateAnalyzerTokenUI(token, part.text, part.role);
      token.style.borderColor = "var(--border-color)";
      token.style.boxShadow = "none";
    }
    state.analyzer.userSelections[index] = part.role;
  });

  showAnalyzerDetails(currentSentence);
  state.analyzer.isChecked = true;
}

function showAnalyzerDetails(sentence) {
  const detailsPanel = document.getElementById("analyzer-details-panel");
  const detailsGrid = document.getElementById("analyzer-details-grid");
  
  detailsGrid.innerHTML = "";
  
  sentence.analysis.forEach(part => {
    const card = document.createElement("div");
    card.className = "analysis-card";
    card.setAttribute("data-role", part.role);
    
    card.innerHTML = `
      <div class="card-role-title">${roleNames[part.role]}</div>
      <div class="card-text">"${part.text}"</div>
      <div class="card-meta">
        ${part.question !== "-" ? `<span><strong>Soru:</strong> ${part.question}</span>` : ""}
        <span><strong>Açıklama:</strong> ${part.explanation}</span>
      </div>
    `;
    
    detailsGrid.appendChild(card);
  });
  
  detailsPanel.classList.add("show");
}

function resetAnalyzer() {
  loadAnalyzerSentence();
}

function nextAnalyzerSentence() {
  const sentences = state.analyzer.filteredSentences;
  if (sentences.length === 0) return;

  state.analyzer.currentIdx = (state.analyzer.currentIdx + 1) % sentences.length;
  loadAnalyzerSentence();
}

// ==========================================
// 3. Kelime Grubu Bölme (Splitter) Logic
// ==========================================
function initSplitter() {
  const resetBtn = document.getElementById("splitter-reset");
  const checkBtn = document.getElementById("splitter-check-btn");
  const answerBtn = document.getElementById("splitter-answer-btn");
  const nextBtn = document.getElementById("splitter-next-btn");
  const labelBtn = document.getElementById("splitter-label-btn");
  const finalCheckBtn = document.getElementById("splitter-final-check");

  resetBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    resetSplitter();
  });
  checkBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    checkSplitterSplits();
  });
  answerBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    showSplitterAnswers();
  });
  nextBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    nextSplitterSentence();
  });
  labelBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    startSplitterLabeling();
  });
  finalCheckBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    checkSplitterFinalRoles();
  });

  loadSplitterSentence();
}

function cleanWordForSplit(word) {
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
}

function updateSplitDividerUI(divider, isActive) {
  if (!divider) return;

  divider.classList.toggle("active", isActive);
  divider.setAttribute("aria-pressed", isActive ? "true" : "false");
  divider.innerHTML = isActive
    ? '<span class="split-divider-icon">|</span><span class="split-divider-label">Böl</span>'
    : '<span class="split-divider-icon split-divider-icon-idle">+</span>';
}

function renderWordSplitInterface(container, words, splitSet, options = {}) {
  const {
    isLocked = false,
    wordDataAttr = "data-word-idx",
    splitDataAttr = "data-split-after-idx"
  } = options;

  container.innerHTML = "";
  container.classList.add("word-split-row");
  container.classList.remove("word-split-mode");

  words.forEach((wordItem, idx) => {
    const wordText = typeof wordItem === "string" ? wordItem : wordItem.text;

    const token = document.createElement("div");
    token.className = "word-token word-split-token";
    token.innerText = wordText;
    token.setAttribute(wordDataAttr, idx);
    container.appendChild(token);

    if (idx < words.length - 1) {
      const divider = document.createElement("button");
      divider.type = "button";
      divider.className = "split-divider-btn" + (splitSet.has(idx) ? " active" : "");
      divider.setAttribute(splitDataAttr, idx);
      divider.setAttribute("aria-label", `${idx + 1}. kelimeden sonra bölme noktası`);
      divider.title = "Bölme noktası ekle / kaldır";
      updateSplitDividerUI(divider, splitSet.has(idx));

      if (!isLocked) {
        divider.addEventListener("click", () => {
          playAudioFeedback("tap");

          if (splitSet.has(idx)) {
            splitSet.delete(idx);
          } else {
            splitSet.add(idx);
          }

          updateSplitDividerUI(divider, splitSet.has(idx));
          divider.classList.remove("split-success", "split-error");
        });
      } else {
        divider.disabled = true;
      }

      container.appendChild(divider);
    }
  });
}

function renderSplitterWords() {
  const sentenceBox = document.getElementById("splitter-sentence-box");
  if (!sentenceBox || state.splitter.words.length === 0) return;

  renderWordSplitInterface(sentenceBox, state.splitter.words, state.splitter.userSplits, {
    isLocked: state.splitter.isSplitChecked
  });
}

function renderCustomSplitWords() {
  const box = document.getElementById("custom-sentence-box");
  if (!box || state.custom.words.length === 0) return;

  renderWordSplitInterface(box, state.custom.words, state.custom.userSplits, {
    isLocked: state.custom.isSplitConfirmed,
    wordDataAttr: "data-custom-word-idx"
  });
}

function refreshActiveSplitViews() {
  if (state.activeTab === "splitter" && state.splitter.words.length > 0) {
    renderSplitterWords();
  } else if (
    state.activeTab === "custom" &&
    state.custom.words.length > 0 &&
    !state.custom.isSplitConfirmed
  ) {
    renderCustomSplitWords();
  }
}

function loadSplitterSentence() {
  const sentence = state.sentences[state.splitter.currentIdx];
  const sentenceBox = document.getElementById("splitter-sentence-box");
  const labelingArea = document.getElementById("splitter-labeling-area");
  const detailsPanel = document.getElementById("splitter-details-panel");
  const labelBtn = document.getElementById("splitter-label-btn");
  
  detailsPanel.classList.remove("show");
  labelingArea.style.display = "none";
  labelBtn.disabled = true;
  labelBtn.style.opacity = "0.6";
  labelBtn.style.cursor = "not-allowed";
  
  closeSmartBoardSelector();
  state.splitter.userSplits.clear();
  state.splitter.isSplitChecked = false;
  state.splitter.isLabelingMode = false;
  state.splitter.userSelections = {};
  state.splitter.isFinalChecked = false;

  // Split sentence into words
  const wordsRaw = sentence.text.split(" ");
  state.splitter.words = wordsRaw.map((w, idx) => ({
    text: w,
    idx: idx
  }));

  renderSplitterWords();
}

function getCorrectSplitIndices(sentence, wordsArray) {
  const correctSplits = new Set();
  let currentWordCount = 0;
  
  // Go through analysis groups and calculate how many words are in each group
  for (let i = 0; i < sentence.analysis.length - 1; i++) {
    const groupWords = sentence.analysis[i].text.split(" ");
    currentWordCount += groupWords.length;
    correctSplits.add(currentWordCount - 1); // split after this word index
  }
  
  return correctSplits;
}

function checkSplitterSplits() {
  const sentence = state.sentences[state.splitter.currentIdx];
  const correctSplits = getCorrectSplitIndices(sentence, state.splitter.words);
  const sentenceBox = document.getElementById("splitter-sentence-box");
  
  let allCorrect = true;
  
  // Check if user splits match correct splits exactly
  state.splitter.words.forEach((wObj, idx) => {
    if (idx === state.splitter.words.length - 1) return;

    const divider = sentenceBox.querySelector(`[data-split-after-idx="${idx}"]`);
    const hasUserSplit = state.splitter.userSplits.has(idx);
    const hasCorrectSplit = correctSplits.has(idx);

    if (divider) {
      divider.classList.remove("split-success", "split-error");
    }

    if (hasUserSplit !== hasCorrectSplit) {
      allCorrect = false;
      if (divider && hasUserSplit) {
        divider.classList.add("split-error");
      }
    } else if (divider && hasUserSplit) {
      divider.classList.add("split-success");
    }
  });

  if (allCorrect) {
    playAudioFeedback("success");
    launchConfetti();
    const labelBtn = document.getElementById("splitter-label-btn");
    labelBtn.removeAttribute("disabled");
    labelBtn.style.opacity = "1";
    labelBtn.style.cursor = "pointer";
    state.splitter.isSplitChecked = true;
  } else {
    playAudioFeedback("error");
    sentenceBox.classList.add("animate-shake");
    setTimeout(() => sentenceBox.classList.remove("animate-shake"), 400);
  }
}

function showSplitterAnswers() {
  const sentence = state.sentences[state.splitter.currentIdx];
  const correctSplits = getCorrectSplitIndices(sentence, state.splitter.words);
  const sentenceBox = document.getElementById("splitter-sentence-box");
  
  state.splitter.userSplits.clear();

  state.splitter.words.forEach((wObj, idx) => {
    if (idx === state.splitter.words.length - 1) return;

    const divider = sentenceBox.querySelector(`[data-split-after-idx="${idx}"]`);
    if (!divider) return;

    divider.classList.remove("split-success", "split-error");

    if (correctSplits.has(idx)) {
      state.splitter.userSplits.add(idx);
      updateSplitDividerUI(divider, true);
    } else {
      updateSplitDividerUI(divider, false);
    }
  });

  const labelBtn = document.getElementById("splitter-label-btn");
  labelBtn.removeAttribute("disabled");
  labelBtn.style.opacity = "1";
  labelBtn.style.cursor = "pointer";
  state.splitter.isSplitChecked = true;
}

function startSplitterLabeling() {
  const sentence = state.sentences[state.splitter.currentIdx];
  const labelingArea = document.getElementById("splitter-labeling-area");
  const groupedBox = document.getElementById("splitter-grouped-box");
  
  labelingArea.style.display = "block";
  groupedBox.innerHTML = "";
  
  // Form groups from splits
  const groups = [];
  let currentGroup = [];
  
  state.splitter.words.forEach((wObj, idx) => {
    currentGroup.push(wObj.text);
    if (state.splitter.userSplits.has(idx) || idx === state.splitter.words.length - 1) {
      groups.push(currentGroup.join(" "));
      currentGroup = [];
    }
  });

  state.splitter.isLabelingMode = true;

  groups.forEach((groupText, gIdx) => {
    const token = document.createElement("div");
    token.className = "word-token";
    token.setAttribute("data-group-idx", gIdx);
    token.innerHTML = `<span class="token-text">${groupText}</span>`;
    
    // Add popover
    const popover = createRolePopover(gIdx, (role) => {
      state.splitter.userSelections[gIdx] = role;
      updateAnalyzerTokenUI(token, groupText, role);
    });
    token.appendChild(popover);

    token.addEventListener("click", (e) => {
      if (state.splitter.isFinalChecked) return;
      
      playAudioFeedback("tap");

      if (state.smartBoardMode) {
        openSmartBoardSelector(token, groupText, "splitter", gIdx, (role) => {
          state.splitter.userSelections[gIdx] = role;
          updateAnalyzerTokenUI(token, groupText, role);
        });
      } else {
        const isPopoverBtn = e.target.closest(".popover-btn");
        if (isPopoverBtn) return;
        
        const currentPopover = token.querySelector(".role-popover");
        document.querySelectorAll(".role-popover.show").forEach(p => {
          if (p !== currentPopover) p.classList.remove("show");
        });
        currentPopover.classList.toggle("show");
      }
      e.stopPropagation();
    });

    groupedBox.appendChild(token);
  });
}

function checkSplitterFinalRoles() {
  const sentence = state.sentences[state.splitter.currentIdx];
  let allCorrect = true;
  
  sentence.analysis.forEach((part, idx) => {
    const token = document.querySelector(`[data-group-idx="${idx}"]`);
    const userRole = state.splitter.userSelections[idx];
    const correctRole = part.role;
    
    if (userRole !== correctRole) {
      allCorrect = false;
      if (token) {
        token.style.borderColor = "var(--color-error)";
      }
    } else {
      if (token) {
        token.style.borderColor = "var(--color-success)";
      }
    }
  });

  if (allCorrect) {
    playAudioFeedback("success");
    launchConfetti();
    showSplitterDetails(sentence);
    state.splitter.isFinalChecked = true;
  } else {
    playAudioFeedback("error");
    const groupedBox = document.getElementById("splitter-grouped-box");
    groupedBox.classList.add("animate-shake");
    setTimeout(() => groupedBox.classList.remove("animate-shake"), 400);
  }
}

function showSplitterDetails(sentence) {
  const detailsPanel = document.getElementById("splitter-details-panel");
  const detailsGrid = document.getElementById("splitter-details-grid");
  
  detailsGrid.innerHTML = "";
  
  sentence.analysis.forEach(part => {
    const card = document.createElement("div");
    card.className = "analysis-card";
    card.setAttribute("data-role", part.role);
    
    card.innerHTML = `
      <div class="card-role-title">${roleNames[part.role]}</div>
      <div class="card-text">"${part.text}"</div>
      <div class="card-meta">
        ${part.question !== "-" ? `<span><strong>Soru:</strong> ${part.question}</span>` : ""}
        <span><strong>Açıklama:</strong> ${part.explanation}</span>
      </div>
    `;
    
    detailsGrid.appendChild(card);
  });
  
  detailsPanel.classList.add("show");
}

function resetSplitter() {
  loadSplitterSentence();
}

function nextSplitterSentence() {
  state.splitter.currentIdx = (state.splitter.currentIdx + 1) % state.sentences.length;
  loadSplitterSentence();
}

// ==========================================
// 4. Pratik & Test (Quiz) Logic
// ==========================================
function initQuiz() {
  // Event delegation for clicking word tokens in quiz
  const quizBox = document.getElementById("quiz-sentence-box");
  quizBox.addEventListener("click", handleQuizWordClick);
}

function loadNewQuizQuestion() {
  const sentences = state.sentences;
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  state.quiz.currentSentence = sentence;
  state.quiz.isAnswered = false;

  // Filter out less common/unlabeled roles for questions
  const possibleRoles = sentence.analysis
    .map(p => p.role)
    .filter(r => r !== "cdu" && r !== "");

  const targetRole = possibleRoles[Math.floor(Math.random() * possibleRoles.length)];
  state.quiz.targetRole = targetRole;

  // Update instructions banner
  const instructionBox = document.getElementById("quiz-instruction-box");
  instructionBox.innerHTML = `Cümledeki <span class="target-role-badge badge-${targetRole}">${roleNames[targetRole].split(" ")[0]}</span> öğesini bulunuz.`;

  // Render sentence word groups
  const quizBox = document.getElementById("quiz-sentence-box");
  quizBox.innerHTML = "";
  document.getElementById("quiz-feedback").innerHTML = "";

  sentence.analysis.forEach((part, index) => {
    const token = document.createElement("div");
    token.className = "word-token";
    token.setAttribute("data-quiz-idx", index);
    token.innerText = part.text;
    quizBox.appendChild(token);
  });
}

function handleQuizWordClick(e) {
  if (state.quiz.isAnswered) return;
  
  const token = e.target.closest("[data-quiz-idx]");
  if (!token) return;

  const clickedIdx = parseInt(token.getAttribute("data-quiz-idx"));
  const correctIdx = state.quiz.currentSentence.analysis.findIndex(p => p.role === state.quiz.targetRole);
  
  const feedbackEl = document.getElementById("quiz-feedback");
  state.quiz.isAnswered = true;

  if (clickedIdx === correctIdx) {
    // Correct
    playAudioFeedback("success");
    token.setAttribute("data-role", state.quiz.targetRole);
    token.style.borderColor = "var(--color-success)";
    token.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.4)";
    
    state.quiz.score += 10;
    state.quiz.correctCount++;
    state.quiz.streak++;
    
    feedbackEl.innerHTML = `<span style="color: var(--color-success)">Tebrikler! Doğru cevap. (+10 Puan)</span>`;
    launchConfetti();
  } else {
    // Incorrect
    playAudioFeedback("error");
    token.style.borderColor = "var(--color-error)";
    token.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.4)";
    
    // Highlight correct token
    const correctToken = document.querySelector(`[data-quiz-idx="${correctIdx}"]`);
    if (correctToken) {
      correctToken.setAttribute("data-role", state.quiz.targetRole);
      correctToken.style.borderColor = "var(--color-success)";
    }

    state.quiz.score = Math.max(0, state.quiz.score - 5);
    state.quiz.wrongCount++;
    state.quiz.streak = 0;

    const explanation = state.quiz.currentSentence.analysis[correctIdx].explanation;
    feedbackEl.innerHTML = `<span style="color: var(--color-error)">Yanlış cevap! Doğru cevap highlighted edildi. (-5 Puan)<br>
    <small style="color: var(--text-secondary); font-weight: normal; margin-top: 0.5rem; display: block;">Açıklama: ${explanation}</small></span>`;
    
    const quizBox = document.getElementById("quiz-sentence-box");
    quizBox.classList.add("animate-shake");
    setTimeout(() => quizBox.classList.remove("animate-shake"), 400);
  }

  // Update stats
  document.getElementById("quiz-score").innerText = state.quiz.score;
  document.getElementById("quiz-correct").innerText = state.quiz.correctCount;
  document.getElementById("quiz-wrong").innerText = state.quiz.wrongCount;
  document.getElementById("quiz-streak").innerText = state.quiz.streak;

  // Load next question after delay
  setTimeout(loadNewQuizQuestion, clickedIdx === correctIdx ? 2000 : 4500);
}

// ==========================================
// 5. Serbest Çizim (Custom Builder) Logic
// ==========================================
function initCustomBuilder() {
  const createBtn = document.getElementById("custom-create-btn");
  const confirmSplitBtn = document.getElementById("custom-confirm-split");
  const resetBtn = document.getElementById("custom-reset");
  const saveBtn = document.getElementById("custom-save-btn");
  const backToSplitBtn = document.getElementById("custom-back-to-split");

  createBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    createCustomSentence();
  });
  confirmSplitBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    confirmCustomSplits();
  });
  resetBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    resetCustomBuilder();
  });
  saveBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    saveCustomDiagram();
  });
  backToSplitBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    backToCustomSplits();
  });
}

function createCustomSentence() {
  const input = document.getElementById("custom-sentence-input");
  const text = input.value.trim();
  
  if (!text) {
    alert("Lütfen önce bir cümle girin.");
    return;
  }

  state.custom.text = text;
  state.custom.userSplits.clear();
  state.custom.isSplitConfirmed = false;
  state.custom.userSelections = {};
  
  closeSmartBoardSelector();

  const words = text.split(" ");
  state.custom.words = words;

  // Hide older elements
  document.getElementById("custom-diagram-area").style.display = "none";
  document.getElementById("custom-grouped-box").style.display = "none";
  document.getElementById("custom-controls-2").style.display = "none";

  // Show builder workspace
  document.getElementById("custom-card").style.display = "block";
  document.getElementById("custom-helper-text").innerText = "1. Aşama: Kelimelerin arasındaki + düğmelerine dokunarak bölme noktalarını belirleyin. İşiniz bittiğinde buton ile onaylayın.";
  document.getElementById("custom-controls-1").style.display = "flex";

  const box = document.getElementById("custom-sentence-box");
  box.style.display = "flex";
  renderCustomSplitWords();
}

function confirmCustomSplits() {
  state.custom.isSplitConfirmed = true;
  document.getElementById("custom-sentence-box").style.display = "none";
  document.getElementById("custom-controls-1").style.display = "none";
  
  closeSmartBoardSelector();

  const groupedBox = document.getElementById("custom-grouped-box");
  groupedBox.style.display = "flex";
  groupedBox.innerHTML = "";
  
  document.getElementById("custom-helper-text").innerText = "2. Aşama: Oluşturduğunuz kelime gruplarına tıklayarak öğe rollerini atayın.";
  document.getElementById("custom-controls-2").style.display = "flex";

  // Build groups
  const groups = [];
  let currentGroup = [];

  state.custom.words.forEach((word, idx) => {
    currentGroup.push(word);
    if (state.custom.userSplits.has(idx) || idx === state.custom.words.length - 1) {
      groups.push(currentGroup.join(" "));
      currentGroup = [];
    }
  });

  state.custom.groups = groups;

  groups.forEach((groupText, gIdx) => {
    const token = document.createElement("div");
    token.className = "word-token";
    token.setAttribute("data-custom-group-idx", gIdx);
    token.innerHTML = `<span class="token-text">${groupText}</span>`;
    
    const popover = createRolePopover(gIdx, (role) => {
      state.custom.userSelections[gIdx] = role;
      updateAnalyzerTokenUI(token, groupText, role);
    });
    token.appendChild(popover);

    token.addEventListener("click", (e) => {
      playAudioFeedback("tap");

      if (state.smartBoardMode) {
        openSmartBoardSelector(token, groupText, "custom", gIdx, (role) => {
          state.custom.userSelections[gIdx] = role;
          updateAnalyzerTokenUI(token, groupText, role);
        });
      } else {
        const isPopoverBtn = e.target.closest(".popover-btn");
        if (isPopoverBtn) return;
        
        const currentPopover = token.querySelector(".role-popover");
        document.querySelectorAll(".role-popover.show").forEach(p => {
          if (p !== currentPopover) p.classList.remove("show");
        });
        currentPopover.classList.toggle("show");
      }
      e.stopPropagation();
    });

    groupedBox.appendChild(token);
  });
}

function backToCustomSplits() {
  state.custom.isSplitConfirmed = false;
  document.getElementById("custom-sentence-box").style.display = "flex";
  document.getElementById("custom-controls-1").style.display = "flex";
  
  closeSmartBoardSelector();
  
  document.getElementById("custom-grouped-box").style.display = "none";
  document.getElementById("custom-controls-2").style.display = "none";
  document.getElementById("custom-helper-text").innerText = "1. Aşama: Kelimelerin arasındaki + düğmelerine dokunarak bölme noktalarını belirleyin. İşiniz bittiğinde buton ile onaylayın.";
}

function saveCustomDiagram() {
  const diagramArea = document.getElementById("custom-diagram-area");
  const diagramContent = document.getElementById("custom-diagram-content");

  playAudioFeedback("success");
  closeSmartBoardSelector();
  diagramArea.style.display = "block";
  diagramContent.innerHTML = "";

  const container = document.createElement("div");
  container.className = "sentence-container";
  container.style.justifyContent = "center";

  state.custom.groups.forEach((groupText, gIdx) => {
    const role = state.custom.userSelections[gIdx] || "cdu";
    const token = document.createElement("div");
    token.className = "word-token";
    token.setAttribute("data-role", role);
    token.innerHTML = `
      <span class="token-text" style="font-size: 1.35rem; font-weight: 500;">${groupText}</span>
      <span class="role-label" style="font-size: 0.8rem; margin-top: 0.4rem;">${roleNames[role]}</span>
    `;
    container.appendChild(token);
  });

  diagramContent.appendChild(container);
  
  // Smooth scroll to diagram
  diagramArea.scrollIntoView({ behavior: "smooth" });
}

function resetCustomBuilder() {
  createCustomSentence();
}

// ==========================================
// 6. Confetti & Utility Functions
// ==========================================
function launchConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["#6366f1", "#10b981", "#3b82f6", "#ef4444", "#fbbf24", "#ec4899"];
  
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    
    // Random styling
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = Math.random() * 12 + 6 + "px";
    piece.style.height = piece.style.width;
    piece.style.opacity = Math.random() * 0.7 + 0.3;
    
    // Animation options
    const duration = Math.random() * 2 + 1.5;
    const delay = Math.random() * 0.3;
    piece.style.animationDuration = duration + "s";
    piece.style.animationDelay = delay + "s";
    
    // 3D rotation start/end
    const rot = Math.random() * 360;
    piece.style.transform = `rotate(${rot}deg)`;

    container.appendChild(piece);
    
    // Remove element after animation finishes
    setTimeout(() => {
      piece.remove();
    }, (duration + delay) * 1000);
  }
}

// ==========================================
// 7. Çalışma Kağıdı Üretici (Worksheet) Logic
// ==========================================
function initWorksheet() {
  const diffButtons = document.querySelectorAll("#worksheet-difficulty .diff-btn");
  const generateBtn = document.getElementById("worksheet-generate-btn");
  const printBtn = document.getElementById("worksheet-print-btn");

  diffButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      playAudioFeedback("tap");
      diffButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      state.worksheet.difficulty = btn.getAttribute("data-diff");
      generateWorksheet();
    });
  });

  generateBtn.addEventListener("click", () => {
    playAudioFeedback("tap");
    generateWorksheet();
  });

  printBtn.addEventListener("click", () => {
    playAudioFeedback("success");
    window.print();
  });
}

function generateWorksheet() {
  const difficulty = state.worksheet.difficulty;
  const pool = window.getWorksheetSentencePool
    ? window.getWorksheetSentencePool(difficulty)
    : [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 15).map(sentence => ({
    text: sentence.text
  }));

  state.worksheet.sentences = selected;
  renderWorksheetPreview();
}

function renderWorksheetPreview() {
  const listContainer = document.getElementById("worksheet-preview-list");
  const diffLabel = document.getElementById("worksheet-meta-difficulty");
  const dateLabel = document.getElementById("worksheet-meta-date");

  if (!listContainer || !diffLabel || !dateLabel) return;

  // Set difficulty meta label
  diffLabel.innerText = `Zorluk Seviyesi: ${state.worksheet.difficulty}`;

  // Set today's date format (DD.MM.YYYY)
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  dateLabel.innerText = `Tarih: ${day}.${month}.${year}`;

  // Clear previous sentences
  listContainer.innerHTML = "";

  state.worksheet.sentences.forEach((sentence, idx) => {
    const item = document.createElement("div");
    item.className = "worksheet-item";

    item.innerHTML = `
      <span class="item-num">${idx + 1}.</span>
      <div class="item-content">
        <div class="item-sentence">${sentence.text}</div>
        <div class="item-blank-lines">
          <div class="blank-line"></div>
        </div>
      </div>
    `;

    listContainer.appendChild(item);
  });
}

