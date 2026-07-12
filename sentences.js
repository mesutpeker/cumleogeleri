const sentenceDatabase = [
  {
    id: 1,
    difficulty: "Kolay",
    text: "Kardeşim dün akşam bize çok lezzetli bir çorba yaptı.",
    analysis: [
      { text: "Kardeşim", role: "ozne", question: "Kim?", explanation: "Eylemi yapan kişidir." },
      { text: "dün akşam", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Eylemin zamanını belirtir." },
      { text: "bize", role: "dolayli_tumlec", question: "Kime?", explanation: "Eylemin yöneldiği kişiyi belirtir." },
      { text: "çok lezzetli bir çorba", role: "belirtisiz_nesne", question: "Ne?", explanation: "Özneden sonra yükleme sorulan 'Ne?' sorusunun cevabıdır." },
      { text: "yaptı", role: "yuklem", question: "-", explanation: "Cümlede yargıyı bildiren çekimli fiildir." }
    ]
  },
  {
    id: 2,
    difficulty: "Kolay",
    text: "Kırmızı balonlar gökyüzüne doğru yavaşça süzüldü.",
    analysis: [
      { text: "Kırmızı balonlar", role: "ozne", question: "Ne?", explanation: "Süzülme eylemini gerçekleştiren öznedir (Sıfat tamlaması)." },
      { text: "gökyüzüne doğru", role: "zarf_tumleci", question: "Nereye doğru?", explanation: "Eylemin yönünü belirten edat grubudur (Zarf tümleci)." },
      { text: "yavaşça", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin durumunu belirten zarftır." },
      { text: "süzüldü", role: "yuklem", question: "-", explanation: "Yargıyı bildiren yüklemdir." }
    ]
  },
  {
    id: 3,
    difficulty: "Orta",
    text: "Sınıfın en çalışkan öğrencisi, öğretmenin sorduğu tüm zor soruları hemen çözdü.",
    analysis: [
      { text: "Sınıfın en çalışkan öğrencisi", role: "ozne", question: "Kim?", explanation: "Soruları çözen kişidir (İsim ve sıfat tamlamaları grubu)." },
      { text: "öğretmenin sorduğu tüm zor soruları", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen ve belirtme durumu eki alan nesnedir." },
      { text: "hemen", role: "zarf_tumleci", question: "Ne zaman / Nasıl?", explanation: "Eylemin zamanını ve çabukluğunu belirten zarftır." },
      { text: "çözdü", role: "yuklem", question: "-", explanation: "Cümlenin yargı bildiren çekimli fiilidir." }
    ]
  },
  {
    id: 4,
    difficulty: "Orta",
    text: "Küçük çocuk, bahçedeki yaşlı ağacın altına kitaplarını bırakmıştı.",
    analysis: [
      { text: "Küçük çocuk", role: "ozne", question: "Kim?", explanation: "Bırakma eylemini yapan kişidir (Sıfat tamlaması)." },
      { text: "bahçedeki yaşlı ağacın altına", role: "dolayli_tumlec", question: "Nereye?", explanation: "Eylemin yöneldiği yeri bildiren yer tamlayıcısıdır." },
      { text: "kitaplarını", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen belirli nesnedir (Belirtme eki almıştır)." },
      { text: "bırakmıştı", role: "yuklem", question: "-", explanation: "Zaman ve kip eki almış çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 5,
    difficulty: "Zor",
    text: "Sessizce süzüldü martılar gökyüzünün maviliğine.",
    analysis: [
      { text: "Sessizce", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin durumunu belirten zarftır." },
      { text: "süzüldü", role: "yuklem", question: "-", explanation: "Cümlede yargı bildiren ve ortada yer alan eylemdir (Devrik cümle)." },
      { text: "martılar", role: "ozne", question: "Ne / Kim?", explanation: "Süzülme eylemini yapan canlılardır (Özne)." },
      { text: "gökyüzünün maviliğine", role: "dolayli_tumlec", question: "Nereye?", explanation: "Eylemin yöneldiği yeri bildiren yer tamlayıcısıdır (Belirtili isim tamlaması)." }
    ]
  },
  {
    id: 6,
    difficulty: "Zor",
    text: "Yazarın son kitabında anlattığı olaylar, okuyucunun yüreğinde derin izler bıraktı.",
    analysis: [
      { text: "Yazarın son kitabında anlattığı olaylar", role: "ozne", question: "Ne?", explanation: "İz bırakan şeydir (Karma sıfat-isim tamlaması grubudur)." },
      { text: "okuyucunun yüreğinde", role: "dolayli_tumlec", question: "Nerede?", explanation: "Eylemin gerçekleştiği yeri bildiren yer tamlayıcısıdır." },
      { text: "derin izler", role: "belirtisiz_nesne", question: "Ne?", explanation: "Özneden sonra sorulan 'Ne?' sorusuna yanıt veren sıfat tamlaması yapısındaki belirtisiz nesnedir." },
      { text: "bıraktı", role: "yuklem", question: "-", explanation: "Yargıyı bildiren yüklemdir." }
    ]
  },
  {
    id: 7,
    difficulty: "Orta",
    text: "Ali, babasının eski kırmızı arabasıyla her gün işe giderdi.",
    analysis: [
      { text: "Ali", role: "ozne", question: "Kim?", explanation: "Eylemi gerçekleştiren kişidir." },
      { text: "babasının eski kırmızı arabasıyla", role: "edat_tumleci", question: "Ne ile?", explanation: "Eylemin ne vasıtasıyla yapıldığını belirten edat tümlecidir." },
      { text: "her gün", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Eylemin tekrarlanma sıklığını ve zamanını belirtir." },
      { text: "işe", role: "dolayli_tumlec", question: "Nereye?", explanation: "Yönelme durumu eki almış dolaylı tümleçtir." },
      { text: "giderdi", role: "yuklem", question: "-", explanation: "Geniş zamanın hikayesiyle çekimlenmiş eylem yüklemdir." }
    ]
  },
  {
    id: 8,
    difficulty: "Zor",
    text: "Uzun yıllar boyunca doğup büyüdüğü bu şirin kasabadan ayrılmak ona çok zor geldi.",
    analysis: [
      { text: "Uzun yıllar boyunca doğup büyüdüğü bu şirin kasabadan ayrılmak", role: "ozne", question: "Ne?", explanation: "Zor gelen durumdur (İsim-fiil grubuyla kurulmuş bir özne grubudur)." },
      { text: "ona", role: "dolayli_tumlec", question: "Kime?", explanation: "Yönelme hali eki almış yer tamlayıcısıdır." },
      { text: "çok", role: "zarf_tumleci", question: "Ne kadar?", explanation: "Miktar bildiren zarftır." },
      { text: "zor geldi", role: "yuklem", question: "-", explanation: "Deyimleşmiş / birleşik yapıda yargı bildiren yüklemdir (Birlikte alınır)." }
    ]
  },
  {
    id: 9,
    difficulty: "Orta",
    text: "Öğretmenimiz, bugünkü derste bize yeni konuyu çok güzel anlattı.",
    analysis: [
      { text: "Öğretmenimiz", role: "ozne", question: "Kim?", explanation: "Konuyu anlatan özne unsurdur." },
      { text: "bugünkü derste", role: "dolayli_tumlec", question: "Nerede?", explanation: "Bulunma durumundaki dolaylı tümleçtir." },
      { text: "bize", role: "dolayli_tumlec", question: "Kime?", explanation: "Yönelme durumundaki yer tamlayıcısıdır." },
      { text: "yeni konuyu", role: "belirtili_nesne", question: "Neyi?", explanation: "Belirtme durumu eki almış nesnedir." },
      { text: "çok güzel", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin niteliğini gösteren zarf grubudur." },
      { text: "anlattı", role: "yuklem", question: "-", explanation: "Cümlede yargıyı taşıyan çekimli eylemdir." }
    ]
  },
  {
    id: 10,
    difficulty: "Kolay",
    text: "Kuşlar sıcak ülkelere doğru göç ediyor.",
    analysis: [
      { text: "Kuşlar", role: "ozne", question: "Kim / Ne?", explanation: "Göç eden canlılardır (Özne)." },
      { text: "sıcak ülkelere doğru", role: "zarf_tumleci", question: "Nereye doğru?", explanation: "Yönelme edatıyla kurulmuş tümleçtir." },
      { text: "göç ediyor", role: "yuklem", question: "-", explanation: "Etmek yardımcı fiiliyle kurulmuş birleşik yüklemdir." }
    ]
  },
  {
    id: 11,
    difficulty: "Orta",
    text: "Dün gece yağan yağmur sokakları göle çevirdi.",
    analysis: [
      { text: "Dün gece yağan yağmur", role: "ozne", question: "Ne?", explanation: "Eylemi gerçekleştiren sıfat-fiil grubu (Özne)." },
      { text: "sokakları", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen belirtili nesnedir." },
      { text: "göle", role: "dolayli_tumlec", question: "Neye?", explanation: "Yönelme eki almış dolaylı tümleçtir." },
      { text: "çevirdi", role: "yuklem", question: "-", explanation: "Yargıyı taşıyan fiil yüklemdir." }
    ]
  },
  {
    id: 12,
    difficulty: "Kolay",
    text: "Babam her sabah gazeteyi dikkatle okur.",
    analysis: [
      { text: "Babam", role: "ozne", question: "Kim?", explanation: "Okuma eylemini yapan kişidir." },
      { text: "her sabah", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarftır." },
      { text: "gazeteyi", role: "belirtili_nesne", question: "Neyi?", explanation: "Okunan nesnedir (Belirtme durumundadır)." },
      { text: "dikkatle", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin yapılma şeklini bildiren zarftır." },
      { text: "okur", role: "yuklem", question: "-", explanation: "Geniş zamanla çekimli yüklemdir." }
    ]
  },
  {
    id: 13,
    difficulty: "Kolay",
    text: "Bahçedeki güzel çiçekler susuzluktan kurumuştu.",
    analysis: [
      { text: "Bahçedeki güzel çiçekler", role: "ozne", question: "Ne?", explanation: "Kuruma eylemine maruz kalan sıfat tamlamasıdır." },
      { text: "susuzluktan", role: "zarf_tumleci", question: "Neden/Niçin?", explanation: "Eylemin gerçekleşme nedenini bildiren tümleçtir." },
      { text: "kurumuştu", role: "yuklem", question: "-", explanation: "Duyulan geçmiş zamanın hikayesiyle çekimlenmiş fiildir." }
    ]
  },
  {
    id: 14,
    difficulty: "Orta",
    text: "Mavi gözlü çocuk, annesinin elini sıkıca tutuyordu.",
    analysis: [
      { text: "Mavi gözlü çocuk", role: "ozne", question: "Kim?", explanation: "Eylemi gerçekleştiren sıfat tamlamasıdır." },
      { text: "annesinin elini", role: "belirtili_nesne", question: "Neyi?", explanation: "Belirtili isim tamlaması yapısındaki nesnedir." },
      { text: "sıkıca", role: "zarf_tumleci", question: "Nasıl?", explanation: "Tutmanın niteliğini belirten zarftır." },
      { text: "tutuyordu", role: "yuklem", question: "-", explanation: "Şimdiki zamanın hikayesiyle çekimli yüklemdir." }
    ]
  },
  {
    id: 15,
    difficulty: "Orta",
    text: "Bize bu zor günlerde sadece dostlarımız yardım etti.",
    analysis: [
      { text: "Bize", role: "dolayli_tumlec", question: "Kime?", explanation: "Yönelme yönü belirten dolaylı tümleç." },
      { text: "bu zor günlerde", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Eylemin zamanını sınırlayan zarftır." },
      { text: "sadece dostlarımız", role: "ozne", question: "Kim?", explanation: "Yardım eden kişilerdir (Özne grubu)." },
      { text: "yardım etti", role: "yuklem", question: "-", explanation: "Etmek eylemiyle kurulmuş birleşik yüklemdir." }
    ]
  },
  {
    id: 16,
    difficulty: "Orta",
    text: "Kitap okumak, insanı bambaşka dünyalara götürür.",
    analysis: [
      { text: "Kitap okumak", role: "ozne", question: "Ne?", explanation: "İsim-fiil grubuyla kurulmuş öznedir." },
      { text: "insanı", role: "belirtili_nesne", question: "Kimi?", explanation: "Belirtme durumu eki almış nesnedir." },
      { text: "bambaşka dünyalara", role: "dolayli_tumlec", question: "Nereye?", explanation: "Yönelme belirten sıfat tamlaması grubudur." },
      { text: "götürür", role: "yuklem", question: "-", explanation: "Geniş zamanlı çekimli eylemdir." }
    ]
  },
  {
    id: 17,
    difficulty: "Orta",
    text: "Kapının önündeki yaşlı adam merakla etrafı süzüyordu.",
    analysis: [
      { text: "Kapının önündeki yaşlı adam", role: "ozne", question: "Kim?", explanation: "Süzme eylemini yapan karma tamlama grubudur." },
      { text: "merakla", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin durumunu bildiren zarftır." },
      { text: "etrafı", role: "belirtili_nesne", question: "Neyi?", explanation: "-i hali almış nesnedir." },
      { text: "süzüyordu", role: "yuklem", question: "-", explanation: "Şimdiki zamanın hikayesiyle çekimli yüklemdir." }
    ]
  },
  {
    id: 18,
    difficulty: "Orta",
    text: "Akşamleyin eve dönerken eski bir arkadaşımla karşılaştım.",
    analysis: [
      { text: "Akşamleyin eve dönerken", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zarf-fiil grubuyla kurulmuş zaman belirtecidir." },
      { text: "eski bir arkadaşımla", role: "edat_tumleci", question: "Kiminle?", explanation: "Birliktelik bildiren edat tümlecidir." },
      { text: "karşılaştım", role: "yuklem", question: "-", explanation: "Görülen geçmiş zamanla çekimlenmiş yüklemdir." }
    ]
  },
  {
    id: 19,
    difficulty: "Kolay",
    text: "Yarın sabah erkenden hep birlikte yola çıkacağız.",
    analysis: [
      { text: "Yarın sabah erkenden", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarf grubudur." },
      { text: "hep birlikte", role: "zarf_tumleci", question: "Nasıl?", explanation: "Birliktelik belirten zarf grubudur." },
      { text: "yola çıkacağız", role: "yuklem", question: "-", explanation: "Deyimleşmiş anlamca kaynaşmış yüklemdir." }
    ]
  },
  {
    id: 20,
    difficulty: "Orta",
    text: "Gökyüzündeki kara bulutlar fırtınanın habercisiydi.",
    analysis: [
      { text: "Gökyüzündeki kara bulutlar", role: "ozne", question: "Ne?", explanation: "Yargının öznesi durumundaki sıfat tamlamasıdır." },
      { text: "fırtınanın habercisiydi", role: "yuklem", question: "-", explanation: "Ek fiil alarak yüklem olmuş isim tamlamasıdır." }
    ]
  },
  {
    id: 21,
    difficulty: "Orta",
    text: "Karabaş, yabancıları görünce havlamaya başladı.",
    analysis: [
      { text: "Karabaş", role: "ozne", question: "Kim?", explanation: "Eylemi yapan canlıdır." },
      { text: "yabancıları görünce", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zarf-fiil eki (-ince) ile kurulan zaman zarfıdır." },
      { text: "havlamaya", role: "dolayli_tumlec", question: "Neye?", explanation: "Yönelme eki almış yer tamlayıcısıdır." },
      { text: "başladı", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 22,
    difficulty: "Orta",
    text: "Büyükbabam gençliğinde bu fabrikada mühendis olarak çalışmış.",
    analysis: [
      { text: "Büyükbabam", role: "ozne", question: "Kim?", explanation: "Çalışma eylemini yapan kişidir." },
      { text: "gençliğinde", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarftır." },
      { text: "bu fabrikada", role: "dolayli_tumlec", question: "Nerede?", explanation: "Bulunma eki alan yer tamlayıcısıdır." },
      { text: "mühendis olarak", role: "zarf_tumleci", question: "Nasıl?", explanation: "-arak ekiyle kurulmuş zarf-fiil tümlecidir." },
      { text: "çalışmış", role: "yuklem", question: "-", explanation: "Öğrenilen geçmiş zamanlı fiildir." }
    ]
  },
  {
    id: 23,
    difficulty: "Zor",
    text: "Beni en çok mutlu eden şey senin başarındır.",
    analysis: [
      { text: "Beni en çok mutlu eden şey", role: "ozne", question: "Ne?", explanation: "Yargıya konu olan sıfat-fiil öbeğidir (Özne)." },
      { text: "senin başarındır", role: "yuklem", question: "-", explanation: "Ek fiil alan belirtili isim tamlaması biçimindeki yüklemdir." }
    ]
  },
  {
    id: 24,
    difficulty: "Orta",
    text: "Kütüphaneden aldığım kitapları dün akşam sırasıyla okudum.",
    analysis: [
      { text: "Kütüphaneden aldığım kitapları", role: "belirtili_nesne", question: "Neyi?", explanation: "Belirtme durumu eki almış sıfat-fiil grubudur." },
      { text: "dün akşam", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Eylemin zamanını bildirir." },
      { text: "sırasıyla", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin tarzını bildiren zarftır." },
      { text: "okudum", role: "yuklem", question: "-", explanation: "Görülen geçmiş zaman 1. tekil şahıs yüklemdir." }
    ]
  },
  {
    id: 25,
    difficulty: "Kolay",
    text: "Yeni aldığımız televizyon dün aniden bozuldu.",
    analysis: [
      { text: "Yeni aldığımız televizyon", role: "ozne", question: "Ne?", explanation: "Bozulma eylemine uğrayan sıfat tamlamasıdır." },
      { text: "dün", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarftır." },
      { text: "aniden", role: "zarf_tumleci", question: "Nasıl?", explanation: "Durum bildiren zarftır." },
      { text: "bozuldu", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 26,
    difficulty: "Orta",
    text: "Yıllardır görmediğim çocukluk arkadaşımı dün caddede gördüm.",
    analysis: [
      { text: "Yıllardır görmediğim çocukluk arkadaşımı", role: "belirtili_nesne", question: "Kimi?", explanation: "Eylemden etkilenen belirtili nesne grubudur." },
      { text: "dün", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman zarfıdır." },
      { text: "caddede", role: "dolayli_tumlec", question: "Nerede?", explanation: "-de durum eki almış yer tamlayıcısıdır." },
      { text: "gördüm", role: "yuklem", question: "-", explanation: "Yargıyı bitiren fiildir." }
    ]
  },
  {
    id: 27,
    difficulty: "Orta",
    text: "Bahçedeki kuru yaprakları süpürgeyle topladı.",
    analysis: [
      { text: "Bahçedeki kuru yaprakları", role: "belirtili_nesne", question: "Neyi?", explanation: "Sıfat tamlaması biçimindeki nesnedir." },
      { text: "süpürgeyle", role: "edat_tumleci", question: "Ne ile?", explanation: "Araç bildiren edat tümlecidir (Süpürge ile)." },
      { text: "topladı", role: "yuklem", question: "-", explanation: "Fiil yüklemidir." }
    ]
  },
  {
    id: 28,
    difficulty: "Orta",
    text: "Gürültüden rahatsız olan bebek sabaha kadar uyumadı.",
    analysis: [
      { text: "Gürültüden rahatsız olan bebek", role: "ozne", question: "Kim?", explanation: "Uyumayan varlığı bildiren sıfat-fiil grubudur." },
      { text: "sabaha kadar", role: "zarf_tumleci", question: "Ne zamana kadar?", explanation: "Zaman sınırını çizen edat öbeğidir." },
      { text: "uyumadı", role: "yuklem", question: "-", explanation: "Olumsuz çekimli fiildir." }
    ]
  },
  {
    id: 29,
    difficulty: "Zor",
    text: "Ünlü sanatçının son sergisi sanatseverler tarafından çok beğenildi.",
    analysis: [
      { text: "Ünlü sanatçının son sergisi", role: "ozne", question: "Ne?", explanation: "Edilgen fiilli cümlede beğenilen nesne sözde öznedir." },
      { text: "sanatseverler tarafından", role: "zarf_tumleci", question: "Kimin tarafından?", explanation: "Örtülü özne işlevi gören edat grubudur (Zarf tümleci)." },
      { text: "çok", role: "zarf_tumleci", question: "Ne kadar?", explanation: "Miktar bildiren zarftır." },
      { text: "beğenildi", role: "yuklem", question: "-", explanation: "Edilgen çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 30,
    difficulty: "Orta",
    text: "Dün gece sinemada izlediğimiz film hepimizi derinden etkiledi.",
    analysis: [
      { text: "Dün gece sinemada izlediğimiz film", role: "ozne", question: "Ne?", explanation: "Etkiyi yaratan sıfat tamlamasıdır." },
      { text: "hepimizi", role: "belirtili_nesne", question: "Kimi?", explanation: "-i hali eki almış nesnedir." },
      { text: "derinden", role: "zarf_tumleci", question: "Nasıl?", explanation: "Etkinin derecesini belirten zarftır." },
      { text: "etkiledi", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 31,
    difficulty: "Orta",
    text: "Ablam üniversiteden mezun olunca iş aramaya başlayacak.",
    analysis: [
      { text: "Ablam", role: "ozne", question: "Kim?", explanation: "Başlayacak olan kişidir." },
      { text: "üniversiteden mezun olunca", role: "zarf_tumleci", question: "Ne zaman?", explanation: "-unca ekiyle kurulmuş zaman zarfıdır." },
      { text: "iş aramaya", role: "dolayli_tumlec", question: "Neye?", explanation: "Yönelme durumu alan fiilimsi grubudur." },
      { text: "başlayacak", role: "yuklem", question: "-", explanation: "Gelecek zaman çekimli eylemdir." }
    ]
  },
  {
    id: 32,
    difficulty: "Orta",
    text: "Aniden patlayan rüzgar masadaki tüm kağıtları havaya uçurdu.",
    analysis: [
      { text: "Aniden patlayan rüzgar", role: "ozne", question: "Ne?", explanation: "Uçurma işini yapan sıfat-fiil grubudur." },
      { text: "masadaki tüm kağıtları", role: "belirtili_nesne", question: "Neyi?", explanation: "Uçurulan nesnelerdir." },
      { text: "havaya", role: "dolayli_tumlec", question: "Nereye?", explanation: "-e yönelme eki almış dolaylı tümleçtir." },
      { text: "uçurdu", role: "yuklem", question: "-", explanation: "Ettirgen çatılı fiil yüklemdir." }
    ]
  },
  {
    id: 33,
    difficulty: "Orta",
    text: "Hafta sonu arkadaşlarla pikniğe gideceğiz.",
    analysis: [
      { text: "Hafta sonu", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarftır." },
      { text: "arkadaşlarla", role: "edat_tumleci", question: "Kiminle?", explanation: "Birliktelik edatı alan kelime grubudur (-le edatı)." },
      { text: "pikniğe", role: "dolayli_tumlec", question: "Nereye?", explanation: "Yönelme durumundaki dolaylı tümleçtir." },
      { text: "gideceğiz", role: "yuklem", question: "-", explanation: "Gelecek zaman 1. çoğul yüklemdir." }
    ]
  },
  {
    id: 34,
    difficulty: "Orta",
    text: "Sokağın sonundaki eski bina dün sessizce yıkıldı.",
    analysis: [
      { text: "Sokağın sonundaki eski bina", role: "ozne", question: "Ne?", explanation: "Yıkılan bina edilgen yapıda sözde öznedir." },
      { text: "dün", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarftır." },
      { text: "sessizce", role: "zarf_tumleci", question: "Nasıl?", explanation: "Durum bildiren zarftır." },
      { text: "yıkıldı", role: "yuklem", question: "-", explanation: "Edilgen fiil yüklemdir." }
    ]
  },
  {
    id: 35,
    difficulty: "Orta",
    text: "Yorgun gözlerle etrafına bakan yolcu bir kenara oturdu.",
    analysis: [
      { text: "Yorgun gözlerle etrafına bakan yolcu", role: "ozne", question: "Kim?", explanation: "Oturan yolcuyu niteleyen sıfat-fiil grubu öznedir." },
      { text: "bir kenara", role: "dolayli_tumlec", question: "Nereye?", explanation: "Yönelme durumu eki almış dolaylı tümleçtir." },
      { text: "oturdu", role: "yuklem", question: "-", explanation: "Yargıyı taşıyan fiil yüklemdir." }
    ]
  },
  {
    id: 36,
    difficulty: "Orta",
    text: "Bu güzel haberi duyunca sevinçten havalara uçtu.",
    analysis: [
      { text: "Bu güzel haberi duyunca", role: "zarf_tumleci", question: "Ne zaman?", explanation: "-unca zarf-fiil ekini içeren kelime grubudur." },
      { text: "sevinçten", role: "zarf_tumleci", question: "Neden?", explanation: "Sebep bildiren zarftır." },
      { text: "havalara uçtu", role: "yuklem", question: "-", explanation: "Deyim olduğu için bölünmeyen yüklemdir." }
    ]
  },
  {
    id: 37,
    difficulty: "Orta",
    text: "Sabahları spor yapmak insanın enerjisini artırır.",
    analysis: [
      { text: "Sabahları spor yapmak", role: "ozne", question: "Ne?", explanation: "İsim-fiil grubuyla kurulmuş özne grubudur." },
      { text: "insanın enerjisini", role: "belirtili_nesne", question: "Neyi?", explanation: "Belirtili isim tamlaması yapısındaki nesnedir." },
      { text: "artırır", role: "yuklem", question: "-", explanation: "Geniş zamanlı çekimli eylemdir." }
    ]
  },
  {
    id: 38,
    difficulty: "Orta",
    text: "Uzun zamandır aradığım anahtarı yatağın altında buldum.",
    analysis: [
      { text: "Uzun zamandır aradığım anahtarı", role: "belirtili_nesne", question: "Neyi?", explanation: "Nesne görevindeki sıfat-fiil grubudur." },
      { text: "yatağın altında", role: "dolayli_tumlec", question: "Nerede?", explanation: "İsim tamlaması yapısındaki yer tamlayıcısıdır." },
      { text: "buldum", role: "yuklem", question: "-", explanation: "Görülen geçmiş zamanla çekimli eylemdir." }
    ]
  },
  {
    id: 39,
    difficulty: "Kolay",
    text: "Dünkü fırtınada evin çatısı uçtu.",
    analysis: [
      { text: "Dünkü fırtınada", role: "zarf_tumleci", question: "Ne zaman / Hangi durumda?", explanation: "Durum ve zaman bildiren zarf tümlecidir." },
      { text: "evin çatısı", role: "ozne", question: "Ne?", explanation: "Uçan unsurdur (Belirtili isim tamlaması)." },
      { text: "uçtu", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 40,
    difficulty: "Kolay",
    text: "Kardeşim ödevlerini her zaman özenle hazırlar.",
    analysis: [
      { text: "Kardeşim", role: "ozne", question: "Kim?", explanation: "Eylemi gerçekleştiren öznedir." },
      { text: "ödevlerini", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen nesnedir (Belirtme eki almıştır)." },
      { text: "her zaman", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Sıklık ve zaman belirten zarftır." },
      { text: "özenle", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin yapılış tarzını belirten zarftır." },
      { text: "hazırlar", role: "yuklem", question: "-", explanation: "Yargıyı bildiren fiil yüklemdir." }
    ]
  },
  {
    id: 41,
    difficulty: "Orta",
    text: "Okuldan dönen çocuklar sokakta neşeyle koşuyordu.",
    analysis: [
      { text: "Okuldan dönen çocuklar", role: "ozne", question: "Kim?", explanation: "Koşma eylemini yapan sıfat-fiil grubu (Özne)." },
      { text: "sokakta", role: "dolayli_tumlec", question: "Nerede?", explanation: "-de kalma eki almış dolaylı tümleçtir." },
      { text: "neşeyle", role: "zarf_tumleci", question: "Nasıl?", explanation: "Koşmanın durumunu belirten zarftır." },
      { text: "koşuyordu", role: "yuklem", question: "-", explanation: "Şimdiki zamanın hikayesiyle çekimli yüklemdir." }
    ]
  },
  {
    id: 42,
    difficulty: "Orta",
    text: "Annemin yaptığı sıcak ekmeğin kokusu tüm evi kapladı.",
    analysis: [
      { text: "Annemin yaptığı sıcak ekmeğin kokusu", role: "ozne", question: "Ne?", explanation: "Kaplama işini yapan karma isim-sıfat tamlaması grubudur." },
      { text: "tüm evi", role: "belirtili_nesne", question: "Neyi?", explanation: "Sıfat tamlaması yapısında belirtme durumundaki nesnedir." },
      { text: "kapladı", role: "yuklem", question: "-", explanation: "Görülen geçmiş zamanlı fiil yüklemdir." }
    ]
  },
  {
    id: 43,
    difficulty: "Orta",
    text: "Tiyatro oyununu izlemek için erkenden salona geldiler.",
    analysis: [
      { text: "Tiyatro oyununu izlemek için", role: "zarf_tumleci", question: "Ne amaçla?", explanation: "Amaç bildiren edat tümleci / zarf tümleci grubudur." },
      { text: "erkenden", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarftır." },
      { text: "salona", role: "dolayli_tumlec", question: "Nereye?", explanation: "Yönelme durumu eki almış dolaylı tümleçtir." },
      { text: "geldiler", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 44,
    difficulty: "Orta",
    text: "Ankara'ya gitmek üzere sabah saatlerinde yola çıktı.",
    analysis: [
      { text: "Ankara'ya gitmek üzere", role: "zarf_tumleci", question: "Ne amaçla / Nasıl?", explanation: "Amaç bildiren edat öbeğidir (Zarf tümleci)." },
      { text: "sabah saatlerinde", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren isim tamlaması öbeğidir." },
      { text: "yola çıktı", role: "yuklem", question: "-", explanation: "Deyimleşmiş anlamca kaynaşmış yüklemdir." }
    ]
  },
  {
    id: 45,
    difficulty: "Orta",
    text: "Karşı kıyıdan gelen balıkçı tekneleri limana birer birer yanaştı.",
    analysis: [
      { text: "Karşı kıyıdan gelen balıkçı tekneleri", role: "ozne", question: "Ne?", explanation: "Yanaşan varlıkları bildiren karma sıfat-isim tamlaması grubudur." },
      { text: "limana", role: "dolayli_tumlec", question: "Nereye?", explanation: "-e yönelme eki alan dolaylı tümleçtir." },
      { text: "birer birer", role: "zarf_tumleci", question: "Nasıl?", explanation: "İkileme biçimindeki durum zarfıdır." },
      { text: "yanaştı", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 46,
    difficulty: "Orta",
    text: "Bizimle geziye gelmek isteyen öğrenciler buraya imza atsın.",
    analysis: [
      { text: "Bizimle geziye gelmek isteyen öğrenciler", role: "ozne", question: "Kim?", explanation: "İmza atması istenen sıfat-fiil grubu (Özne)." },
      { text: "buraya", role: "dolayli_tumlec", question: "Nereye?", explanation: "Yönelme eki almış işaret zamiridir (Yer tamlayıcısı)." },
      { text: "imza atsın", role: "yuklem", question: "-", explanation: "Etmek/olmak dışı birleşik eylem biçimindeki yüklemdir." }
    ]
  },
  {
    id: 47,
    difficulty: "Zor",
    text: "Sınav sonuçlarının açıklanacağını duyan veliler okulun bahçesinde toplandı.",
    analysis: [
      { text: "Sınav sonuçlarının açıklanacağını duyan veliler", role: "ozne", question: "Kim?", explanation: "Toplanan insanları niteleyen sıfat-fiil öbeğidir (Özne)." },
      { text: "okulun bahçesinde", role: "dolayli_tumlec", question: "Nerede?", explanation: "Belirtili isim tamlaması biçimindeki dolaylı tümleçtir." },
      { text: "toplandı", role: "yuklem", question: "-", explanation: "Dönüşlü/edilgen eki almış fiil yüklemdir." }
    ]
  },
  {
    id: 48,
    difficulty: "Orta",
    text: "Doğanın kucağında geçirilen bir gün insana huzur verir.",
    analysis: [
      { text: "Doğanın kucağında geçirilen bir gün", role: "ozne", question: "Ne?", explanation: "Huzur veren durumdur (Sıfat-fiil grubu yapısında özne)." },
      { text: "insana", role: "dolayli_tumlec", question: "Kime?", explanation: "Yönelme durumu almış dolaylı tümleçtir." },
      { text: "huzur verir", role: "yuklem", question: "-", explanation: "Birleşik fiil yapısındaki yüklemdir." }
    ]
  },
  {
    id: 49,
    difficulty: "Orta",
    text: "Çocukluğumun geçtiği o eski evi dün gibi hatırlıyorum.",
    analysis: [
      { text: "Çocukluğumun geçtiği o eski evi", role: "belirtili_nesne", question: "Neyi?", explanation: "Belirtme durumu eki almış sıfat-fiil grubudur (Nesne)." },
      { text: "dün gibi", role: "zarf_tumleci", question: "Nasıl?", explanation: "Edat grubu biçimindeki durum zarfıdır." },
      { text: "hatırlıyorum", role: "yuklem", question: "-", explanation: "Şimdiki zaman 1. tekil şahıs eylemdir." }
    ]
  },
  {
    id: 50,
    difficulty: "Zor",
    text: "Yalın ayak koşuyordu küçük kız buz gibi soğuk derede.",
    analysis: [
      { text: "Yalın ayak", role: "zarf_tumleci", question: "Nasıl?", explanation: "Koşmanın durumunu belirten zarf öbeğidir." },
      { text: "koşuyordu", role: "yuklem", question: "-", explanation: "Şimdiki zamanın hikayesiyle çekimli devrik yüklemdir." },
      { text: "küçük kız", role: "ozne", question: "Kim?", explanation: "Koşan özneyi oluşturan sıfat tamlamasıdır." },
      { text: "buz gibi soğuk derede", role: "dolayli_tumlec", question: "Nerede?", explanation: "Sıfat tamlaması ve edat grubu yapısındaki dolaylı tümleçtir." }
    ]
  },
  {
    id: 51,
    difficulty: "Kolay",
    text: "Annem akşam yemeği için taze ekmek aldı.",
    analysis: [
      { text: "Annem", role: "ozne", question: "Kim?", explanation: "Alma eylemini yapan kişidir." },
      { text: "akşam yemeği için", role: "zarf_tumleci", question: "Niçin / Ne amaçla?", explanation: "Eylemin amacını belirtir." },
      { text: "taze ekmek", role: "belirtisiz_nesne", question: "Ne?", explanation: "Özneden sonra yükleme sorulan 'Ne?' sorusuna cevap verir." },
      { text: "aldı", role: "yuklem", question: "-", explanation: "Cümlenin yargı bildiren eylemidir." }
    ]
  },
  {
    id: 52,
    difficulty: "Kolay",
    text: "Büyük kara köpek bahçede heyecanla koşuyordu.",
    analysis: [
      { text: "Büyük kara köpek", role: "ozne", question: "Kim/Ne?", explanation: "Koşma eylemini gerçekleştiren sıfat tamlaması yapısındaki öznedir." },
      { text: "bahçede", role: "dolayli_tumlec", question: "Nerede?", explanation: "Eylemin gerçekleştiği yeri bildiren yer tamlayıcısıdır." },
      { text: "heyecanla", role: "zarf_tumleci", question: "Nasıl?", explanation: "Koşmanın durumunu belirten zarftır." },
      { text: "koşuyordu", role: "yuklem", question: "-", explanation: "Şimdiki zamanın hikayesiyle çekimlenmiş fiil yüklemdir." }
    ]
  },
  {
    id: 53,
    difficulty: "Kolay",
    text: "Küçük kediler sıcacık yataklarında deliksiz uyudu.",
    analysis: [
      { text: "Küçük kediler", role: "ozne", question: "Kim/Ne?", explanation: "Uyuma eylemini gerçekleştiren sıfat tamlaması yapısındaki öznedir." },
      { text: "sıcacık yataklarında", role: "dolayli_tumlec", question: "Nerede?", explanation: "Bulunma durumundaki dolaylı tümleçtir." },
      { text: "deliksiz", role: "zarf_tumleci", question: "Nasıl?", explanation: "Eylemin yapılma şeklini belirten durum zarfıdır." },
      { text: "uyudu", role: "yuklem", question: "-", explanation: "Görülen geçmiş zamanla çekimlenmiş fiil yüklemdir." }
    ]
  },
  {
    id: 54,
    difficulty: "Kolay",
    text: "Öğretmenimiz tahtaya çok güzel resimler çizdi.",
    analysis: [
      { text: "Öğretmenimiz", role: "ozne", question: "Kim?", explanation: "Eylemi gerçekleştiren öznedir." },
      { text: "tahtaya", role: "dolayli_tumlec", question: "Nereye?", explanation: "Yönelme durumu eki almış dolaylı tümleçtir." },
      { text: "çok güzel resimler", role: "belirtisiz_nesne", question: "Ne?", explanation: "Özneden sonra sorulan 'Ne?' sorusuna cevap veren belirtisiz nesnedir." },
      { text: "chizdi", role: "yuklem", question: "-", explanation: "Yargıyı bildiren çekimli fiildir." }
    ]
  },
  {
    id: 55,
    difficulty: "Kolay",
    text: "Babam bozulan bisikletimi dün hemen tamir etti.",
    analysis: [
      { text: "Babam", role: "ozne", question: "Kim?", explanation: "Tamir etme eylemini yapan öznedir." },
      { text: "bozulan bisikletimi", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen belirtili nesnedir." },
      { text: "dün", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zaman bildiren zarftır." },
      { text: "hemen", role: "zarf_tumleci", question: "Ne zaman / Nasıl?", explanation: "Eylemin zamanını ve tezliğini belirtir." },
      { text: "tamir etti", role: "yuklem", question: "-", explanation: "Yardımcı eylemle kurulmuş birleşik yüklemdir." }
    ]
  },
  {
    id: 56,
    difficulty: "Kolay",
    text: "En sevdiğim arkadaşım bana güzel bir kitap hediye etti.",
    analysis: [
      { text: "En sevdiğim arkadaşım", role: "ozne", question: "Kim?", explanation: "Hediye eden kişidir (Sıfat-fiil grubuyla oluşmuş özne)." },
      { text: "bana", role: "dolayli_tumlec", question: "Kime?", explanation: "Eylemin yöneldiği kişiyi belirten yer tamlayıcısıdır." },
      { text: "güzel bir kitap", role: "belirtisiz_nesne", question: "Ne?", explanation: "Özneden sonra sorulan 'Ne?' sorusunun cevabıdır." },
      { text: "hediye etti", role: "yuklem", question: "-", explanation: "Yardımcı eylemle kurulmuş birleşik yüklemdir." }
    ]
  },
  {
    id: 57,
    difficulty: "Kolay",
    text: "Küçük kız annesinin hazırladığı pastayı iştahla yedi.",
    analysis: [
      { text: "Küçük kız", role: "ozne", question: "Kim?", explanation: "Yeme eylemini gerçekleştiren öznedir." },
      { text: "annesinin hazırladığı pastayı", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen sıfat-fiil ve isim tamlaması grubundaki belirtili nesnedir." },
      { text: "iştahla", role: "zarf_tumleci", question: "Nasıl?", explanation: "Durum bildiren zarftır." },
      { text: "yedi", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 58,
    difficulty: "Kolay",
    text: "Yeni aldığım kırmızı kalemi sınıfta kaybettim.",
    analysis: [
      { text: "Yeni aldığım kırmızı kalemi", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen belirtili nesnedir." },
      { text: "sınıfta", role: "dolayli_tumlec", question: "Nerede?", explanation: "Bulunma durumundaki dolaylı tümleçtir." },
      { text: "kaybettim", role: "yuklem", question: "-", explanation: "Birleşik yapıda çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 59,
    difficulty: "Zor",
    text: "İnsanlığın ortak mirası olan sanat eserlerini korumak her bireyin en kutsal görevidir.",
    analysis: [
      { text: "İnsanlığın ortak mirası olan sanat eserlerini korumak", role: "ozne", question: "Ne?", explanation: "Yargıya konu olan isim-fiil grubu yapısındaki öznedir." },
      { text: "her bireyin en kutsal görevidir", role: "yuklem", question: "-", explanation: "Ek fiil alarak yüklem olmuş isim tamlaması grubudur." }
    ]
  },
  {
    id: 60,
    difficulty: "Zor",
    text: "Güneşin batışını izlemek için çıktığımız bu yüksek tepeden bütün şehir bir masal ülkesi gibi görünüyordu.",
    analysis: [
      { text: "Güneşin batışını izlemek için çıktığımız bu yüksek tepeden", role: "dolayli_tumlec", question: "Nereden?", explanation: "Çıkış yönünü bildiren sıfat-fiil grubu yapısındaki yer tamlayıcısıdır." },
      { text: "bütün şehir", role: "ozne", question: "Ne?", explanation: "Görünen varlıktır (Sıfat tamlaması yapısındaki özne)." },
      { text: "bir masal ülkesi gibi", role: "zarf_tumleci", question: "Nasıl?", explanation: "Benzerlik bildiren edat tümleci / durum zarfı grubudur." },
      { text: "görünüyordu", role: "yuklem", question: "-", explanation: "Şimdiki zamanın hikayesiyle çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 61,
    difficulty: "Zor",
    text: "Uzun süredir üzerinde çalıştığımız bu karmaşık projenin başarıyla tamamlanması hepimizi derinden rahatlattı.",
    analysis: [
      { text: "Uzun süredir üzerinde çalıştığımız bu karmaşık projenin başarıyla tamamlanması", role: "ozne", question: "Ne?", explanation: "Rahatlatan şeydir (İsim-fiil grubuyla kurulmuş özne grubu)." },
      { text: "hepimizi", role: "belirtili_nesne", question: "Kimi?", explanation: "-i hali eki almış zamir yapısındaki belirtili nesnedir." },
      { text: "derinden", role: "zarf_tumleci", question: "Nasıl?", explanation: "Derecelendirme ve durum bildiren zarftır." },
      { text: "rahatlattı", role: "yuklem", question: "-", explanation: "Geçişli çekimli eylem yüklemdir." }
    ]
  },
  {
    id: 62,
    difficulty: "Zor",
    text: "Zamanın akıp giden nehrinde kaybolan eski anıları taze tutmak oldukça zordur.",
    analysis: [
      { text: "Zamanın akıp giden nehrinde kaybolan eski anıları taze tutmak", role: "ozne", question: "Ne?", explanation: "İsim-fiil grubuyla kurulmuş özne grubudur." },
      { text: "oldukça", role: "zarf_tumleci", question: "Ne kadar?", explanation: "Derecelendirme bildiren miktar zarfıdır." },
      { text: "zordur", role: "yuklem", question: "-", explanation: "Ek eylem alarak yüklem olmuş isim soylu kelimedir." }
    ]
  },
  {
    id: 63,
    difficulty: "Zor",
    text: "Yıllar önce kaybettiği eski günlüğün sararmış sayfalarında gezinirken gözyaşlarını tutamadı yaşlı adam.",
    analysis: [
      { text: "Yıllar önce kaybettiği eski günlüğün sararmış sayfalarında gezinirken", role: "zarf_tumleci", question: "Ne zaman?", explanation: "Zarf-fiil öbeğiyle kurulmuş zaman zarfıdır." },
      { text: "gözyaşlarını", role: "belirtili_nesne", question: "Neyi?", explanation: "Eylemden etkilenen nesnedir." },
      { text: "tutamadı", role: "yuklem", question: "-", explanation: "Kurallı birleşik fiilin olumsuzu biçimindeki devrik yüklemdir." },
      { text: "yaşlı adam", role: "ozne", question: "Kim?", explanation: "Tutamama eylemini yapan sıfat tamlaması yapısındaki öznedir." }
    ]
  },
  {
    id: 64,
    difficulty: "Zor",
    text: "Modern insanın en büyük çıkmazı olan yalnızlık duygusu birçok edebi esere konu olmuştur.",
    analysis: [
      { text: "Modern insanın en büyük çıkmazı olan yalnızlık duygusu", role: "ozne", question: "Ne?", explanation: "Sıfat-fiil grubuyla nitelenmiş isim tamlaması yapısındaki öznedir." },
      { text: "birçok edebi esere", role: "dolayli_tumlec", question: "Neye?", explanation: "Yönelme durumu eki almış yer tamlayıcısıdır." },
      { text: "konu olmuştur", role: "yuklem", question: "-", explanation: "Birleşik yapıda çekimlenmiş eylem yüklemdir." }
    ]
  },
  {
    id: 65,
    difficulty: "Zor",
    text: "Fırtınada savrulan küçük teknenin dev dalgalarla mücadelesini sahildeki insanlar korkuyla izlediler.",
    analysis: [
      { text: "Fırtınada savrulan küçük teknenin dev dalgalarla mücadelesini", role: "belirtili_nesne", question: "Neyi?", explanation: "İsim tamlaması yapısındaki karma nesne grubudur." },
      { text: "sahildeki insanlar", role: "ozne", question: "Kim?", explanation: "İzleme eylemini yapan sıfat tamlaması biçimindeki öznedir." },
      { text: "korkuyla", role: "zarf_tumleci", question: "Nasıl?", explanation: "Durum bildiren zarftır." },
      { text: "izlediler", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 66,
    difficulty: "Zor",
    text: "Doğanın kucağında geçirilen her an insanı şehir hayatının stresinden bir nebze olsun uzaklaştırır.",
    analysis: [
      { text: "Doğanın kucağında geçirilen her an", role: "ozne", question: "Ne?", explanation: "Sıfat-fiil grubuyla kurulmuş özne grubudur." },
      { text: "insanı", role: "belirtili_nesne", question: "Kimi?", explanation: "-i hali almış belirtili nesnedir." },
      { text: "şehir hayatının stresinden", role: "dolayli_tumlec", question: "Neyden?", explanation: "Ayrılma durumundaki dolaylı tümleçtir (İsim tamlaması)." },
      { text: "bir nebze olsun", role: "zarf_tumleci", question: "Ne kadar?", explanation: "Miktar bildiren zarf grubudur." },
      { text: "uzaklaştırır", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 67,
    difficulty: "Zor",
    text: "Bir sanatçının kendi toplumunun sorunlarına kulak tıkaması düşünülemez.",
    analysis: [
      { text: "Bir sanatçının kendi toplumunun sorunlarına kulak tıkaması", role: "ozne", question: "Ne?", explanation: "İsim-fiil grubu yapısındaki öznedir." },
      { text: "düşünülemez", role: "yuklem", question: "-", explanation: "Edilgen çekimli fiil yüklemdir." }
    ]
  },
  {
    id: 68,
    difficulty: "Zor",
    text: "Yolculuk esnasında pencereden süzülen ılık rüzgâr içimde tarifsiz bir huzur uyandırdı.",
    analysis: [
      { text: "Yolculuk esnasında pencereden süzülen ılık rüzgâr", role: "ozne", question: "Ne?", explanation: "Sıfat-fiil yapısındaki özne grubudur." },
      { text: "içimde", role: "dolayli_tumlec", question: "Nerede?", explanation: "-de durum eki almış yer tamlayıcısıdır." },
      { text: "tarifsiz bir huzur", role: "belirtisiz_nesne", question: "Ne?", explanation: "Özneden sonra sorulan 'Ne?' sorusuna cevap veren nesnedir." },
      { text: "uyandırdı", role: "yuklem", question: "-", explanation: "Çekimli fiil yüklemdir." }
    ]
  }
];
