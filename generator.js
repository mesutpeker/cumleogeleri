// Turkish Thematic Dynamic Sentence Generator Module
// Each theme guarantees that ANY random combination of its words produces a meaningful sentence.
// Design principles:
//   - Every verb works with every object in the same theme
//   - Every subject can perform every verb in the same theme
//   - Every location is plausible for every action in the same theme
//   - Every adverb is appropriate for every verb in the same theme
//   - All verbs are 3rd person singular (di'li geçmiş zaman)
//   - All subjects are singular
//   - All dolaylı tümleç use locative case (-da/-de) for universal compatibility

const generatorThemes = [
  {
    name: "Okul ve Öğrenme",
    ozne: ["öğretmenimiz", "çalışkan öğrenci", "küçük Elif", "meraklı Ahmet", "sınıf başkanı", "edebiyat öğretmeni", "sessiz çocuk", "yeni öğrenci", "zeki kız", "küçük Mehmet"],
    zarf: ["dikkatle", "sessizce", "heyecanla", "sabırla", "büyük bir özenle", "yüksek sesle", "ilgiyle", "hızla", "gülerek", "tek başına"],
    dolayli: ["sınıfta", "kütüphanede", "evde", "odasında", "bahçede", "masanın başında", "okul kantininde", "koridorda", "teneffüste", "salonda"],
    nesne: ["ödevini", "güzel şiiri", "kısa yazıyı", "uzun hikâyeyi", "yeni konuyu", "eski masalı", "deney raporunu", "mektubunu", "araştırma ödevini", "proje çalışmasını"],
    yuklem: ["okudu", "yazdı", "bitirdi", "hazırladı", "kontrol etti", "tekrarladı", "tamamladı", "inceledi", "paylaştı", "sundu"]
  },
  {
    name: "Aile ve Mutfak",
    ozne: ["annem", "babam", "ablam", "büyükannem", "küçük kardeşim", "teyzem", "dedem", "komşumuz", "amcam", "dayım"],
    zarf: ["gülerek", "seve seve", "telaşla", "özenle", "mutlu bir şekilde", "sabırla", "neşeyle", "erken saatte", "akşamüstü", "hemen"],
    dolayli: ["mutfakta", "salonda", "bahçede", "balkonda", "sofrada", "evde", "yemek odasında", "verandada", "çardakta", "tezgâhın başında"],
    nesne: ["lezzetli yemeği", "sıcak çorbayı", "güzel pastayı", "taze ekmeği", "soğuk meyve suyunu", "sıcak çayı", "nefis böreği", "tatlı kurabiyeyi", "mis gibi kahveyi", "taze salatasını"],
    yuklem: ["hazırladı", "getirdi", "ikram etti", "tattı", "paylaştı", "pişirdi", "taşıdı", "servis etti", "sundu", "dağıttı"]
  },
  {
    name: "Park ve Oyun",
    ozne: ["neşeli çocuk", "küçük Ali", "minik Zeynep", "yaramaz kardeşim", "komşunun oğlu", "afacan kız", "kıvırcık saçlı çocuk", "en küçük arkadaşım", "cesur çocuk", "utangaç kız"],
    zarf: ["neşeyle", "hızla", "kahkahalarla", "koşarak", "coşkuyla", "sevinçle", "büyük bir heyecanla", "zıplayarak", "gülümseyerek", "yarışarak"],
    dolayli: ["parkta", "bahçede", "sokakta", "oyun alanında", "çimenlikte", "evin önünde", "okulun bahçesinde", "avluda", "sahilde", "kumda"],
    nesne: ["renkli topu", "güzel uçurtmayı", "kırmızı balonu", "eski bisikleti", "büyük kovayı", "tahta arabayı", "küçük kepçeyi", "ip atlama ipini", "minik sandalı", "parlak bilyeleri"],
    yuklem: ["buldu", "sakladı", "getirdi", "paylaştı", "taşıdı", "kaybetti", "topladı", "gösterdi", "bıraktı", "verdi"]
  },
  {
    name: "Doğa ve Hayvanlar",
    ozne: ["tatlı sincap", "küçük kuş", "sevimli köpek", "yavru kedi", "minik karınca", "şirin tavşan", "renkli papağan", "yaşlı kaplumbağa", "beyaz güvercin", "ufak kirpi"],
    zarf: ["yavaşça", "sessizce", "neşeyle", "sabırla", "merakla", "dikkatle", "aceleyle", "usulca", "mutlu bir şekilde", "hızla"],
    dolayli: ["ağacın altında", "bahçede", "gölün kenarında", "çimenlikte", "yuvasında", "orman yolunda", "çitin arkasında", "taşların arasında", "dalın üzerinde", "parkta"],
    nesne: ["küçük fındığı", "kuru yaprağı", "minik tohumu", "taze çileği", "ufak kozalağı", "parlak boncuğu", "yumuşak tüyü", "küçük dalı", "renkli çiçeği", "minik böceği"],
    yuklem: ["buldu", "aradı", "taşıdı", "sakladı", "gördü", "topladı", "kokladı", "bıraktı", "getirdi", "seçti"]
  },
  {
    name: "Sanat ve El İşi",
    ozne: ["küçük ressam", "yetenekli Ayşe", "yaratıcı çocuk", "minik sanatçı", "heyecanlı öğrenci", "usta öğretmen", "sabırlı çocuk", "genç tasarımcı", "meraklı Zeynep", "azimli öğrenci"],
    zarf: ["büyük bir sevinçle", "özenle", "heyecanla", "keyifle", "sabırla", "dikkatle", "neşeyle", "coşkuyla", "gururla", "mutlu bir şekilde"],
    dolayli: ["sınıfta", "atölyede", "masanın üzerinde", "resim odasında", "sergide", "stüdyoda", "bahçede", "salonda", "evde", "panoda"],
    nesne: ["güzel tabloyu", "renkli resmi", "kâğıt çiçeği", "minik heykeli", "el işi sepeti", "özgün kolajı", "kil vazoyu", "ahşap kutuyu", "cam süsü", "renkli kartı"],
    yuklem: ["yaptı", "boyadı", "sergiledi", "bitirdi", "hediye etti", "süsledi", "tasarladı", "tamamladı", "gösterdi", "sundu"]
  }
];

// Sentence Templates by Difficulty
const generatorTemplates = {
  Kolay: [
    // Özne + Nesne + Yüklem
    { pattern: ["ozne", "nesne", "yuklem"], capitalize: [true, false, false], punc: "." },
    // Özne + Yer Tamlayıcısı + Yüklem
    { pattern: ["ozne", "dolayli", "yuklem"], capitalize: [true, false, false], punc: "." },
    // Özne + Zarf Tümleci + Yüklem
    { pattern: ["ozne", "zarf", "yuklem"], capitalize: [true, false, false], punc: "." }
  ],
  Orta: [
    // Özne + Yer Tamlayıcısı + Nesne + Yüklem
    { pattern: ["ozne", "dolayli", "nesne", "yuklem"], capitalize: [true, false, false, false], punc: "." },
    // Özne + Zarf Tümleci + Nesne + Yüklem
    { pattern: ["ozne", "zarf", "nesne", "yuklem"], capitalize: [true, false, false, false], punc: "." },
    // Özne + Zarf Tümleci + Yer Tamlayıcısı + Yüklem
    { pattern: ["ozne", "zarf", "dolayli", "yuklem"], capitalize: [true, false, false, false], punc: "." }
  ],
  Zor: [
    // Özne + Zarf Tümleci + Yer Tamlayıcısı + Nesne + Yüklem
    { pattern: ["ozne", "zarf", "dolayli", "nesne", "yuklem"], capitalize: [true, false, false, false, false], punc: "." },
    // Devrik: Zarf Tümleci + Yüklem + Özne + Yer Tamlayıcısı
    { pattern: ["zarf", "yuklem", "ozne", "dolayli"], capitalize: [true, false, false, false], punc: "." },
    // Devrik: Yer Tamlayıcısı + Nesne + Yüklem + Özne
    { pattern: ["dolayli", "nesne", "yuklem", "ozne"], capitalize: [true, false, false, false], punc: "." }
  ]
};

// Select a random element from an array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a single random sentence string with semantic consistency
function generateRandomSentence(difficulty) {
  let diff = difficulty;
  if (diff === "Karışık") {
    const diffs = ["Kolay", "Orta", "Zor"];
    diff = diffs[Math.floor(Math.random() * diffs.length)];
  }

  // 1. Choose a random theme to preserve semantic consistency
  const theme = generatorThemes[Math.floor(Math.random() * generatorThemes.length)];

  // 2. Select template
  const templates = generatorTemplates[diff];
  const template = templates[Math.floor(Math.random() * templates.length)];

  const sentenceParts = [];

  template.pattern.forEach((partType, idx) => {
    // Select only from the chosen theme's word list
    let word = getRandomItem(theme[partType]);
    
    // Capitalize if template specifies (first word of sentence)
    if (template.capitalize[idx]) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      // Lowercase first letter for non-initial words
      // Keep proper names (starting after a space) intact — only touch charAt(0)
      word = word.charAt(0).toLowerCase() + word.slice(1);
    }

    sentenceParts.push(word);
  });

  return sentenceParts.join(" ") + template.punc;
}

// Expose to window object for browser access
window.generateRandomSentence = generateRandomSentence;
