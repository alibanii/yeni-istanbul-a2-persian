(() => {
  "use strict";

  function q(prompt, options, answer, note, direction = "tr") {
    return { kind: "choice", prompt, options, answer, note, direction };
  }

  function qi(prompt, answer, note, answers = [answer.toLocaleLowerCase("tr-TR")]) {
    return { kind: "input", prompt, answer, answers, note, direction: "tr" };
  }

  const unit1Vocab = [
    {
      id: "u1-dogramak", group: "hazirlik", term: "doğramak", fa: "خرد کردن؛ تکه‌تکه بریدن", type: "verb",
      form: "fiil · doğrar · doğradı · doğrayın", source: "Yeni İstanbul A2 · 1A hazırlık ve kebap tarifi",
      example: "Domatesleri küp küp doğrayın.", exampleFa: "گوجه‌فرنگی‌ها را مکعبی خرد کنید.",
      cloze: "Soğanları ince ince ____.", clozeFa: "پیازها را ریز خرد کنید.", answer: "doğrayın", distractors: ["çırpın", "rendeleyin", "süzün"],
      typeAnswers: ["doğra"]
    },
    {
      id: "u1-cirpmak", group: "hazirlik", term: "çırpmak", fa: "هم زدن؛ زدنِ تخم‌مرغ", type: "verb",
      form: "fiil · çırpar · çırptı · çırpın", source: "Yeni İstanbul A2 · 1A mutfak fiilleri",
      example: "İki yumurtayı bir kâsede çırpın.", exampleFa: "دو تخم‌مرغ را در یک کاسه هم بزنید.",
      cloze: "Yumurtaları iyice ____.", clozeFa: "تخم‌مرغ‌ها را خوب هم بزنید.", answer: "çırpın", distractors: ["haşlayın", "doğrayın", "kızartın"],
      typeAnswers: ["çırp"]
    },
    {
      id: "u1-haslamak", group: "hazirlik", term: "haşlamak", fa: "آب‌پز کردن؛ جوشاندن در آب", type: "verb",
      form: "fiil · haşlar · haşladı · haşlayın", source: "Yeni İstanbul A2 · 1A mutfak fiilleri",
      example: "Patatesleri on dakika haşlayın.", exampleFa: "سیب‌زمینی‌ها را ده دقیقه آب‌پز کنید.",
      cloze: "Makarnayı sıcak suda ____.", clozeFa: "ماکارونی را در آب داغ بپزید.", answer: "haşlayın", distractors: ["rendeleyin", "süsleyin", "çırpın"],
      typeAnswers: ["haşla"]
    },
    {
      id: "u1-kizartmak", group: "hazirlik", term: "kızartmak", fa: "سرخ کردن", type: "verb",
      form: "fiil · kızartır · kızarttı · kızartın", source: "Yeni İstanbul A2 · 1A mutfak fiilleri",
      example: "Patatesleri kızgın yağda kızartın.", exampleFa: "سیب‌زمینی‌ها را در روغن داغ سرخ کنید.",
      cloze: "Balıkları tavada ____.", clozeFa: "ماهی‌ها را در ماهیتابه سرخ کنید.", answer: "kızartın", distractors: ["haşlayın", "süzün", "rendeleyin"],
      typeAnswers: ["kızart"]
    },
    {
      id: "u1-rendelemek", group: "hazirlik", term: "rendelemek", fa: "رنده کردن", type: "verb",
      form: "fiil · rendeler · rendeledi · rendeleyin", source: "Yeni İstanbul A2 · 1A mutfak fiilleri",
      example: "Peyniri salatanın üstüne rendeleyin.", exampleFa: "پنیر را روی سالاد رنده کنید.",
      cloze: "Havuçları yıkayın ve ____.", clozeFa: "هویج‌ها را بشویید و رنده کنید.", answer: "rendeleyin", distractors: ["doğrayın", "çırpın", "haşlayın"],
      typeAnswers: ["rendele"]
    },
    {
      id: "u1-eklemek", group: "tarif", term: "eklemek", fa: "اضافه کردن", type: "verb",
      form: "fiil · ekler · ekledi · ekleyin", source: "Yeni İstanbul A2 · 1A yönerge ve yemek tarifi",
      example: "Çorbaya biraz tuz ekleyin.", exampleFa: "کمی نمک به سوپ اضافه کنید.",
      cloze: "Sosun içine bir kaşık yağ ____.", clozeFa: "یک قاشق روغن داخل سس اضافه کنید.", answer: "ekleyin", distractors: ["süsleyin", "pişirin", "karıştırın"],
      typeAnswers: ["ekle"]
    },
    {
      id: "u1-karistirmak", group: "tarif", term: "karıştırmak", fa: "مخلوط کردن؛ هم زدن", type: "verb",
      form: "fiil · karıştırır · karıştırdı · karıştırın", source: "Yeni İstanbul A2 · 1A şiş kebap tarifi",
      example: "Eti baharatlarla iyice karıştırın.", exampleFa: "گوشت را با ادویه‌ها خوب مخلوط کنید.",
      cloze: "Bütün malzemeleri bir kapta ____.", clozeFa: "همهٔ مواد را در یک ظرف مخلوط کنید.", answer: "karıştırın", distractors: ["ekleyin", "süsleyin", "rendeleyin"],
      typeAnswers: ["karıştır"]
    },
    {
      id: "u1-pisirmek", group: "tarif", term: "pişirmek", fa: "پختن", type: "verb",
      form: "fiil · pişirir · pişirdi · pişirin", source: "Yeni İstanbul A2 · 1A şiş kebap tarifi",
      example: "Kebabı yüksek ateşte pişirin.", exampleFa: "کباب را روی حرارت زیاد بپزید.",
      cloze: "Yemeği yirmi dakika ____.", clozeFa: "غذا را بیست دقیقه بپزید.", answer: "pişirin", distractors: ["ekleyin", "doğrayın", "süsleyin"],
      typeAnswers: ["pişir"]
    },
    {
      id: "u1-suslemek", group: "tarif", term: "süslemek", fa: "تزیین کردن", type: "verb",
      form: "fiil · süsler · süsledi · süsleyin", source: "Yeni İstanbul A2 · 1A şiş kebap tarifi",
      example: "Yemeği maydanozla süsleyin.", exampleFa: "غذا را با جعفری تزیین کنید.",
      cloze: "Pastayı meyvelerle ____.", clozeFa: "کیک را با میوه‌ها تزیین کنید.", answer: "süsleyin", distractors: ["karıştırın", "haşlayın", "ekleyin"],
      typeAnswers: ["süsle"]
    },
    {
      id: "u1-tarif-etmek", group: "tarif", term: "tarif etmek", fa: "شرح دادن؛ دستور یا مسیر را توضیح دادن", type: "phrase",
      form: "kalıp fiil · tarif eder · tarif etti", source: "Yeni İstanbul A2 · 1A beceri, yemek ve yol tarifi",
      example: "Bana spor salonunun yolunu tarif eder misin?", exampleFa: "می‌شود مسیر سالن ورزشی را برایم توضیح بدهی؟",
      cloze: "Lütfen bu yemeği nasıl yaptığını ____.", clozeFa: "لطفاً توضیح بده این غذا را چگونه درست کردی.", answer: "tarif et", distractors: ["sipariş ver", "tavsiye et", "ilave et"],
      typeAnswers: ["tarif et"]
    },
    {
      id: "u1-siparis-vermek", group: "lokanta", term: "sipariş vermek", fa: "سفارش دادن", type: "phrase",
      form: "kalıp fiil · sipariş verir · sipariş verdi", source: "Yeni İstanbul A2 · 1B yemek siparişi",
      example: "Garsona iki çorba sipariş verdik.", exampleFa: "به پیشخدمت دو سوپ سفارش دادیم.",
      cloze: "Hazırsanız şimdi ____.", clozeFa: "اگر آماده‌اید حالا سفارش بدهید.", answer: "sipariş verin", distractors: ["tarif edin", "tavsiye edin", "süsleyin"],
      typeAnswers: ["sipariş ver"]
    },
    {
      id: "u1-porsiyon", group: "lokanta", term: "porsiyon", fa: "پُرس؛ سهم یک‌نفرهٔ غذا", type: "noun",
      form: "isim · bir porsiyon / iki porsiyon", source: "Yeni İstanbul A2 · 1B menü ve sipariş",
      example: "Bir porsiyon baklava alayım.", exampleFa: "یک پرس باقلوا می‌گیرم.",
      cloze: "Bize iki ____ köfte getirir misiniz?", clozeFa: "می‌شود برای ما دو پرس کوفته بیاورید؟", answer: "porsiyon", distractors: ["dilim", "avuç", "kâse"],
      typeAnswers: ["bir porsiyon"]
    },
    {
      id: "u1-ana-yemek", group: "lokanta", term: "ana yemek", fa: "غذای اصلی", type: "phrase",
      form: "isim tamlaması · ana yemekler", source: "Yeni İstanbul A2 · 1B menü",
      example: "Ana yemek olarak ızgara balık istiyorum.", exampleFa: "برای غذای اصلی ماهی کبابی می‌خواهم.",
      cloze: "Bugün ____ olarak ne var?", clozeFa: "امروز برای غذای اصلی چه دارید؟", answer: "ana yemek", distractors: ["tatlı", "içecek", "çorba"],
      typeAnswers: ["ana yemekler"]
    },
    {
      id: "u1-tatli", group: "lokanta", term: "tatlı", fa: "دسر؛ شیرینی", type: "noun",
      form: "isim · tatlılar · tatlı olarak", source: "Yeni İstanbul A2 · 1B menü ve diyalog",
      example: "Tatlı olarak sütlaç alalım.", exampleFa: "برای دسر شیربرنج بگیریم.",
      cloze: "Yemekten sonra hangi ____ istersiniz?", clozeFa: "بعد از غذا چه دسری می‌خواهید؟", answer: "tatlıyı", distractors: ["salatayı", "çorbayı", "içeceği"],
      typeAnswers: ["tatlılar"]
    },
    {
      id: "u1-onermek", group: "lokanta", term: "önermek", fa: "پیشنهاد یا توصیه کردن", type: "verb",
      form: "fiil · önerir · önerdi · neyi öneriyorsunuz?", source: "Yeni İstanbul A2 · 1B yemek siparişi",
      example: "Tatlı olarak neyi öneriyorsunuz?", exampleFa: "برای دسر چه چیزی پیشنهاد می‌کنید؟",
      cloze: "Bu lokantada hangi yemeği ____?", clozeFa: "در این رستوران کدام غذا را پیشنهاد می‌کنید؟", answer: "öneriyorsunuz", distractors: ["pişiriyorsunuz", "süslüyorsunuz", "doğruyorsunuz"],
      typeAnswers: ["öner", "tavsiye etmek"]
    },
    {
      id: "u1-guler-yuzlu", group: "profil", term: "güler yüzlü", fa: "خوش‌رو؛ گشاده‌رو", type: "adjective",
      form: "sıfat · yüz + -lü", source: "Yeni İstanbul A2 · 1C internet profilleri",
      example: "Güler yüzlü insanlarla konuşmak kolaydır.", exampleFa: "صحبت کردن با آدم‌های خوش‌رو آسان است.",
      cloze: "Yeni garson çok ____ ve kibar.", clozeFa: "پیشخدمت جدید خیلی خوش‌رو و مؤدب است.", answer: "güler yüzlü", distractors: ["düşünceli", "sağlıklı", "çalışkan"]
    },
    {
      id: "u1-caliskan", group: "profil", term: "çalışkan", fa: "سخت‌کوش؛ کوشا", type: "adjective",
      form: "sıfat · çalışkan bir öğrenci", source: "Yeni İstanbul A2 · 1C profil sıfatları",
      example: "Nesrin çalışkan bir doktordur.", exampleFa: "نسرین پزشکی سخت‌کوش است.",
      cloze: "Her gün düzenli çalışan ____ bir öğrencidir.", clozeFa: "کسی که هر روز منظم کار می‌کند دانش‌آموزی کوشاست.", answer: "çalışkan", distractors: ["dürüst", "enerjik", "güler yüzlü"]
    },
    {
      id: "u1-durust", group: "profil", term: "dürüst", fa: "صادق؛ درستکار", type: "adjective",
      form: "sıfat · dürüst insan", source: "Yeni İstanbul A2 · 1C profil sıfatları",
      example: "Dürüst insanlar yalan söylemez.", exampleFa: "آدم‌های صادق دروغ نمی‌گویند.",
      cloze: "O her zaman doğruyu söyler; çok ____ biridir.", clozeFa: "او همیشه حقیقت را می‌گوید؛ آدم بسیار صادقی است.", answer: "dürüst", distractors: ["komik", "hareketli", "düşünceli"]
    },
    {
      id: "u1-dusunceli", group: "profil", term: "düşünceli", fa: "باملاحظه؛ متفکر", type: "adjective",
      form: "sıfat · düşünce + -li", source: "Yeni İstanbul A2 · 1C profil ve kelime listesi",
      example: "Düşünceli arkadaşım bana yardım etti.", exampleFa: "دوست باملاحظه‌ام به من کمک کرد.",
      cloze: "Doğum günümü hatırlaması çok ____ bir davranıştı.", clozeFa: "به یاد داشتن تولدم رفتار بسیار باملاحظه‌ای بود.", answer: "düşünceli", distractors: ["sağlıksız", "dürüst", "çalışkan"]
    },
    {
      id: "u1-saglikli", group: "profil", term: "sağlıklı", fa: "سالم؛ مفید برای سلامتی", type: "adjective",
      form: "sıfat · sağlık + -lı · karşıtı: sağlıksız", source: "Yeni İstanbul A2 · 1A tavsiyeler ve 1C yapım ekleri",
      example: "Sağlıklı beslenin ve düzenli hareket edin.", exampleFa: "سالم غذا بخورید و منظم تحرک داشته باشید.",
      cloze: "Sebze yemek ____ bir alışkanlıktır.", clozeFa: "سبزی خوردن عادتی سالم است.", answer: "sağlıklı", distractors: ["lezzetsiz", "dikkatsiz", "şekersiz"]
    },
    {
      id: "u1-eritmek", group: "workbook_food", term: "eritmek", fa: "آب کردن؛ ذوب کردن", type: "verb",
      form: "fiil · eritir · eritti · eritin", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1A, s. 4 · Menemen Yapalım",
      example: "Tavada bir kaşık tereyağı eritin.", exampleFa: "یک قاشق کره را در ماهیتابه آب کنید.",
      cloze: "Önce tereyağını tavada ____.", clozeFa: "ابتدا کره را در ماهیتابه آب کنید.", answer: "eritin", distractors: ["serpin", "doğrayın", "çırpın"],
      typeAnswers: ["erit"]
    },
    {
      id: "u1-serpmek", group: "workbook_food", term: "serpmek", fa: "پاشیدن؛ روی چیزی ریختن", type: "verb",
      form: "fiil · serper · serpti · serpin", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1A, s. 4 · Menemen Yapalım",
      example: "Menemenin üzerine tuz ve karabiber serpin.", exampleFa: "روی منمن نمک و فلفل سیاه بپاشید.",
      cloze: "Salatanın üzerine biraz kekik ____.", clozeFa: "کمی آویشن روی سالاد بپاشید.", answer: "serpin", distractors: ["eritin", "süzün", "yıkayın"],
      typeAnswers: ["serp"]
    },
    {
      id: "u1-servis-elemani", group: "workbook_food", term: "servis elemanı", fa: "کارمند خدمات؛ مسئول تحویل سفارش", type: "phrase",
      form: "isim tamlaması · servis elemanları", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1B, s. 6 · Telefonda Sipariş",
      example: "Servis elemanı siparişi yarım saatte getirecek.", exampleFa: "مسئول تحویل، سفارش را در نیم ساعت می‌آورد.",
      cloze: "Müşteri telefonda ____ ile konuşuyor.", clozeFa: "مشتری تلفنی با مسئول خدمات صحبت می‌کند.", answer: "servis elemanı", distractors: ["müşteri", "aşçı", "kasiyer"],
      typeAnswers: ["servis elemanı"]
    },
    {
      id: "u1-mercimek-corbasi", group: "workbook_food", term: "mercimek çorbası", fa: "سوپ عدس", type: "phrase",
      form: "isim tamlaması · bir kâse mercimek çorbası", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1B, s. 6 · Telefonda Sipariş",
      example: "İki kâse mercimek çorbası istiyorum.", exampleFa: "دو کاسه سوپ عدس می‌خواهم.",
      cloze: "Başlangıç olarak bir kâse ____ alayım.", clozeFa: "برای پیش‌غذا یک کاسه سوپ عدس می‌گیرم.", answer: "mercimek çorbası", distractors: ["vişne suyu", "tavuk dürüm", "mevsim salatası"],
      typeAnswers: ["mercimek çorbası"]
    },
    {
      id: "u1-visne-suyu", group: "workbook_food", term: "vişne suyu", fa: "آب آلبالو", type: "phrase",
      form: "isim tamlaması · bir bardak vişne suyu", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1B, s. 6 · Telefonda Sipariş",
      example: "Arkadaşıma da vişne suyu getirir misiniz?", exampleFa: "برای دوستم هم آب آلبالو می‌آورید؟",
      cloze: "Ayran yoksa bir bardak ____ alayım.", clozeFa: "اگر دوغ نیست، یک لیوان آب آلبالو می‌گیرم.", answer: "vişne suyu", distractors: ["mercimek çorbası", "tavuk dürüm", "et döner"],
      typeAnswers: ["vişne suyu"]
    },
    {
      id: "u1-cocukluk-arkadasi", group: "workbook_people", term: "çocukluk arkadaşı", fa: "دوست دوران کودکی", type: "phrase",
      form: "isim tamlaması · çocukluk arkadaşım", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1C, s. 9 · Heyecanlı Bekleyiş",
      example: "Cumartesi çocukluk arkadaşımla buluşuyorum.", exampleFa: "شنبه با دوست دوران کودکی‌ام دیدار می‌کنم.",
      cloze: "Ezgi on beş yıldır görmediği ____ bekliyor.", clozeFa: "ازگی منتظر دوست دوران کودکی‌اش است که پانزده سال ندیده.", answer: "çocukluk arkadaşını", distractors: ["servis elemanını", "sınıf öğretmenini", "iş arkadaşını"],
      typeAnswers: ["çocukluk arkadaşı", "çocukluk arkadaşını"]
    },
    {
      id: "u1-heyecanli", group: "workbook_people", term: "heyecanlı", fa: "هیجان‌زده؛ پرشور", type: "adjective",
      form: "sıfat · heyecan + -lı · karşıtı: heyecansız", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1C, s. 9 · Heyecanlı Bekleyiş",
      example: "Eski arkadaşını göreceği için çok heyecanlı.", exampleFa: "چون قرار است دوست قدیمی‌اش را ببیند، خیلی هیجان‌زده است.",
      cloze: "Yarınki buluşma için çok ____ görünüyor.", clozeFa: "برای دیدار فردا خیلی هیجان‌زده به نظر می‌رسد.", answer: "heyecanlı", distractors: ["gözlüksüz", "dürüst", "sakalsız"],
      typeAnswers: ["heyecanlı"]
    },
    {
      id: "u1-ortak-yon", group: "workbook_people", term: "ortak yön", fa: "ویژگی مشترک؛ وجه اشتراک", type: "phrase",
      form: "isim tamlaması · ortak yönümüz / ortak yönleri", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1C, s. 9 · Heyecanlı Bekleyiş",
      example: "İkimizin birçok ortak yönü var.", exampleFa: "ما دو نفر وجوه مشترک زیادی داریم.",
      cloze: "Aynı müzikleri seviyoruz; bu bizim bir ____.", clozeFa: "ما موسیقی‌های یکسانی دوست داریم؛ این یک ویژگی مشترک ماست.", answer: "ortak yönümüz", distractors: ["çocukluk arkadaşımız", "uzun saçımız", "servis elemanımız"],
      typeAnswers: ["ortak yön", "ortak yönümüz"]
    },
    {
      id: "u1-gozluksuz", group: "workbook_people", term: "gözlüksüz", fa: "بدون عینک", type: "adjective",
      form: "sıfat · gözlük + -süz · karşıtı: gözlüklü", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1C, s. 9-10 · görünüş çalışmaları",
      example: "Uzun siyah saçlı, kahverengi gözlü ve gözlüksüz bir kadın.", exampleFa: "زنی با موهای بلند سیاه، چشم‌های قهوه‌ای و بدون عینک.",
      cloze: "Bugün lens taktığı için ____ geldi.", clozeFa: "امروز چون لنز گذاشته، بدون عینک آمد.", answer: "gözlüksüz", distractors: ["gözlüklü", "şapkalı", "kapüşonlu"],
      typeAnswers: ["gözlüksüz"]
    },
    {
      id: "u1-durustluk", group: "workbook_people", term: "dürüstlük", fa: "صداقت؛ درستکاری", type: "noun",
      form: "isim · dürüst + -lük", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 1C, s. 9 · Heyecanlı Bekleyiş",
      example: "İkimiz için de dürüstlük çok önemli.", exampleFa: "برای هر دوی ما صداقت بسیار مهم است.",
      cloze: "İyi bir arkadaşlıkta ____ önemlidir.", clozeFa: "در یک دوستی خوب، صداقت مهم است.", answer: "dürüstlük", distractors: ["tembellik", "gözlük", "çocukluk"],
      typeAnswers: ["dürüstlük"]
    }
  ];

  const unit1Groups = [
    { id: "hazirlik", icon: "1", title: "Mutfak hazırlığı", fa: "آماده‌سازی در آشپزخانه", subtitle: "از خرد کردن و هم زدن تا آب‌پز و سرخ کردن" },
    { id: "tarif", icon: "2", title: "Tarif adımları", fa: "مراحل دستور غذا", subtitle: "مواد را اضافه، مخلوط، پخته و تزیین کن" },
    { id: "lokanta", icon: "3", title: "Lokantada", fa: "در رستوران", subtitle: "غذا سفارش بده و دربارهٔ منو پیشنهاد بخواه" },
    { id: "profil", icon: "4", title: "Profil ve özellikler", fa: "پروفایل و ویژگی‌ها", subtitle: "آدم‌ها را با صفت‌های کاربردی توصیف کن" },
    { id: "workbook_food", icon: "5", title: "Menemen ve telefonda sipariş", fa: "تمرین غذا و سفارش تلفنی", subtitle: "تمرین‌های کتاب کار: دستور منمن و سفارش غذا با تلفن" },
    { id: "workbook_people", icon: "6", title: "Görünüş ve arkadaşlık", fa: "تمرین ظاهر و دوستی", subtitle: "تمرین‌های کتاب کار: توصیف ظاهر و پیدا کردن ویژگی‌های مشترک" }
  ];

  const unit1GrammarTeach = [
    {
      title: "Emir kipi: دستور مستقیم",
      body: "برای «sen» از ریشهٔ فعل استفاده می‌کنیم: gel, doğra. منفی با -ma/-me ساخته می‌شود: gelme. برای «siz» پسوند هماهنگ -ın/-in/-un/-ün می‌آید و پس از واکه y اضافه می‌شود: gelin, doğrayın.",
      example: "Domatesleri doğrayın; buraya park etmeyin.", emphasis: ["doğrayın", "etmeyin"]
    },
    {
      title: "سوم‌شخص در امر",
      body: "برای «o» از -sın/-sin/-sun/-sün استفاده می‌کنیم: gelsin, yapmasın. برای «onlar» می‌توان -lar/-ler را هم افزود: gelsinler. این ساخت برای خواستن انجام کاری توسط شخص دیگر رایج است.",
      example: "Ayşe de partiye gelsin; çocuklar geç kalmasınlar.", emphasis: ["gelsin", "kalmasınlar"]
    },
    {
      title: "İstek kipi: پیشنهاد و خواسته",
      body: "در ترکی امروز، این ساخت بیشتر برای «ben» و «biz» است. ben: -ayım/-eyim مثل alayım؛ biz: -alım/-elim مثل gidelim. برای منفی -ma/-me پیش از این پسوند می‌آید: almayayım, gitmeyelim.",
      example: "Ben köfte alayım; haydi lokantaya gidelim.", emphasis: ["alayım", "gidelim"]
    },
    {
      title: "پسوندهای -lı، -sız و -lık",
      body: "-lı/-li/-lu/-lü معنی «دارایِ» می‌دهد: tuzlu. -sız/-siz/-suz/-süz نبودن چیزی را می‌رساند: şekersiz. -lık/-lik/-luk/-lük اسم، شغل، مکان یا ویژگی می‌سازد: öğretmenlik, kitaplık. واکهٔ پسوند با آخرین واکهٔ واژه هماهنگ می‌شود.",
      example: "Şekersiz çay sağlıklıdır; öğretmenlik önemli bir meslektir.", emphasis: ["Şekersiz", "sağlıklıdır", "öğretmenlik"]
    }
  ];

  const unit1GrammarQuestions = [
    q("Domatesleri küp küp ____.", ["doğrayın", "doğrayalım", "doğrasın"], "doğrayın", "خطاب محترمانه یا جمع «siz» است؛ doğra + yın → doğrayın."),
    q("Lütfen çorbayı iyice ____.", ["karıştırın", "karıştıralım", "karıştırsın"], "karıştırın", "درخواست مستقیم از «siz» با -ın/-in ساخته می‌شود."),
    q("Buraya park ____!", ["etmeyin", "etmeyelim", "etmesin"], "etmeyin", "امر منفی برای «siz»: et + me + yin."),
    q("Ayşe de bizimle ____.", ["gelsin", "gelin", "gelelim"], "gelsin", "برای سوم‌شخص مفرد از -sin استفاده می‌کنیم: gelsin."),
    q("Çayına çok şeker ____.", ["ekleme", "eklemeyin", "eklemeyelim"], "ekleme", "امر منفی برای «sen» فقط ریشه + -ma/-me است."),
    q("Sağlıklı ____ ve bol su için.", ["beslenin", "beslenelim", "beslensin"], "beslenin", "هر دو فعل خطاب به «siz» هستند: beslenin, için."),
    q("Yolun sonunda sola ____.", ["dönün", "dönelim", "dönsün"], "dönün", "امر «siz» با هماهنگی واکه: dön + ün."),
    q("Ben bir porsiyon köfte ____.", ["alayım", "alalım", "alsın"], "alayım", "خواستۀ اول‌شخص مفرد: al + ayım."),
    q("Akşam lokantaya ____ mi?", ["gidelim", "gideyim", "gidin"], "gidelim", "پیشنهاد برای «ما»: git → gidelim."),
    q("Bu akşam evde yemek ____.", ["yapalım", "yapayım", "yapın"], "yapalım", "برای پیشنهاد مشترک از -alım/-elim استفاده می‌شود."),
    q("Haydi acele edelim; geç ____.", ["kalmayalım", "kalmayayım", "kalmasın"], "kalmayalım", "خواستۀ منفی برای «biz»: kal + ma + yalım."),
    q("Sana baklava ____ mı?", ["ısmarlayayım", "ısmarlayalım", "ısmarlayın"], "ısmarlayayım", "گوینده برای انجام کار توسط خودش اجازه می‌خواهد: -ayım/-eyim."),
    qi("Haydi dans ____!", "edelim", "ترکیب dans etmek برای پیشنهاد جمع به شکل dans edelim می‌آید.", ["edelim", "dans edelim"]),
    q("Ben çayı ____ içiyorum. (şeker yok)", ["şekersiz", "şekerli", "şekerlik"], "şekersiz", "-siz نبودن شکر را بیان می‌کند."),
    q("Bu çorba çok ____. (tuz var)", ["tuzlu", "tuzsuz", "tuzluk"], "tuzlu", "-lu معنی «دارای نمک» می‌دهد."),
    q("Düzenli spor yapmak ____ bir alışkanlıktır.", ["sağlıklı", "sağlıksız", "sağlık"], "sağlıklı", "sağlık + -lı → sağlıklı، یعنی سالم."),
    q("____ çok önemli bir meslektir. (öğretmen)", ["Öğretmenlik", "Öğretmenlı", "Öğretmensiz"], "Öğretmenlik", "-lik از نام شغل، مفهوم آن حرفه را می‌سازد."),
    q("Kitapları yeni ____ koyun.", ["kitaplığa", "kitapsıza", "kitaplıya"], "kitaplığa", "kitap + lık → kitaplık؛ با حالت جهتی به شکل kitaplığa می‌آید."),
    q("İstanbul'da ____ bir ev arıyoruz.", ["kiralık", "kiralı", "kirasız"], "kiralık", "kira + lık → kiralık، یعنی برای اجاره."),
    q("Bize iki ____ bir masa lazım.", ["kişilik", "kişili", "kişisiz"], "kişilik", "عدد + kişi + -lik ظرفیت را می‌سازد: iki kişilik."),
    q("پسوند -sız/-siz معمولاً چه معنایی می‌دهد؟", ["نبودن یا نداشتن", "شغل و حرفه", "دستور مستقیم"], "نبودن یا نداشتن", "مثل şekersiz: بدون شکر.", "fa"),
    q("کدام گزینه با پسوند -lık/-lik ساخته شده است؟", ["güzellik", "tuzlu", "sabırsız"], "güzellik", "güzel + lik یک اسم انتزاعی به معنی زیبایی می‌سازد.", "fa")
  ];

  const units = [
    {
      id: 1,
      code: "Ünite 01",
      title: "Gezelim Görelim",
      subtitle: "آشپزی، سفارش غذا، توضیح مسیر و معرفی ویژگی‌های آدم‌ها",
      pathTitle: "واژه‌ها را در موقعیت واقعی یاد بگیر و با دستورهای واحد به‌کار ببر",
      image: "assets/unit-1-gezelim-gorelim.png",
      imageAlt: "تصویر کاغذبری از زبان‌آموزان در استانبول کنار آشپزخانه، رستوران و غذاهای ترکی",
      criteriaNote: "منبع انتخاب: تمام بخش‌های واحد ۱ در Yeni İstanbul A2 (صفحات چاپی ۶ تا ۲۶)، و دو تمرین تکمیلی از Yeni İstanbul A2 Çalışma Kitabı (صفحات ۴ تا ۱۰): دستور منمن، سفارش تلفنی غذا، توصیف ظاهر و متن دوستی. هر بخش تکمیلی دقیقاً ۲۲ تمرین دارد و پنج تمرین پایانی آن واژه‌های پیشین را مرور می‌کند.",
      vocab: unit1Vocab,
      groups: unit1Groups,
      grammar: {
        id: "grammar",
        icon: "G",
        title: "Emir, istek ve yapım ekleri",
        fa: "دستور زبان پایانی",
        subtitle: "امر، پیشنهاد و خواسته، همراه با پسوندهای -lı / -sız / -lık",
        placeholder: "پاسخ را به ترکی بنویس",
        teach: unit1GrammarTeach,
        questions: unit1GrammarQuestions
      }
    }
  ];

  window.YENI_ISTANBUL_DATA = { lessons: units };
})();
