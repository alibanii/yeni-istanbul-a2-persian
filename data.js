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

  const unit2Vocab = [
    {
      id: "u2-dogmak", group: "hayat", term: "doğmak", fa: "به دنیا آمدن؛ متولد شدن", type: "verb",
      form: "fiil · doğar · doğdu · nerede doğdun?", source: "Yeni İstanbul A2 · Ünite 2A, s. 28 · Küçük Hayatlar, Büyük Başarılar",
      example: "Ahmet 1974 yılında İstanbul'da doğdu.", exampleFa: "احمد در سال ۱۹۷۴ در استانبول به دنیا آمد.",
      cloze: "Siz nerede ve ne zaman ____?", clozeFa: "شما کجا و چه زمانی به دنیا آمدید؟", answer: "doğdunuz", distractors: ["okudunuz", "atandınız", "başvurdunuz"],
      typeAnswers: ["doğdu", "doğdun", "doğdunuz"]
    },
    {
      id: "u2-mezun-olmak", group: "hayat", term: "mezun olmak", fa: "فارغ‌التحصیل شدن", type: "phrase",
      form: "kalıp fiil · mezun olur · mezun oldu", source: "Yeni İstanbul A2 · Ünite 2A, s. 28-30 · hayat hikâyeleri",
      example: "Seda 2013'te üniversiteden mezun oldu.", exampleFa: "صدا در سال ۲۰۱۳ از دانشگاه فارغ‌التحصیل شد.",
      cloze: "Kardeşim geçen yıl liseden ____.", clozeFa: "خواهر/برادرم سال گذشته از دبیرستان فارغ‌التحصیل شد.", answer: "mezun oldu", distractors: ["ünlü oldu", "emekli oldu", "gönüllü oldu"],
      typeAnswers: ["mezun oldu", "mezunum"]
    },
    {
      id: "u2-atanmak", group: "hayat", term: "atanmak", fa: "منصوب شدن؛ به محل خدمت گماشته شدن", type: "verb",
      form: "fiil · atanır · atandı · nereye atandı?", source: "Yeni İstanbul A2 · Ünite 2A, s. 28 · Köy Okullarına Yardım",
      example: "Seda 2014 yılında Ağrı'da bir köye atandı.", exampleFa: "صدا در سال ۲۰۱۴ به روستایی در آغری منصوب شد.",
      cloze: "Yeni öğretmen küçük bir köye ____.", clozeFa: "معلم جدید به روستایی کوچک منصوب شد.", answer: "atandı", distractors: ["başvurdu", "yerleşti", "mezun oldu"],
      typeAnswers: ["atandı", "atan"]
    },
    {
      id: "u2-basvurmak", group: "hayat", term: "başvurmak", fa: "درخواست دادن؛ تقاضا کردن", type: "verb",
      form: "fiil · başvurur · başvurdu · -e başvurmak", source: "Yeni İstanbul A2 · Ünite 2A, s. 28 · Yeryüzü Doktorları",
      example: "Bir vakfa gönüllü olmak için başvuru yaptım.", exampleFa: "برای داوطلب شدن در یک بنیاد درخواست دادم.",
      cloze: "Bu işe internetten ____.", clozeFa: "برای این شغل از اینترنت درخواست دادم.", answer: "başvurdum", distractors: ["atandım", "keşfettim", "seyrettim"],
      typeAnswers: ["başvur", "başvurdu", "başvurdum"]
    },
    {
      id: "u2-gonullu-olmak", group: "hayat", term: "gönüllü olmak", fa: "داوطلب شدن؛ داوطلب بودن", type: "phrase",
      form: "kalıp fiil · gönüllü olur · gönüllü oldu", source: "Yeni İstanbul A2 · Ünite 2A, s. 28 · Yeryüzü Doktorları",
      example: "İnsanlara yardım etmek için vakıfta gönüllü oldum.", exampleFa: "برای کمک به مردم در بنیاد داوطلب شدم.",
      cloze: "Köy okuluna yardım projesinde ____.", clozeFa: "در پروژهٔ کمک به مدرسهٔ روستا داوطلب شدم.", answer: "gönüllü oldum", distractors: ["mezun oldum", "ünlü oldum", "emekli oldum"],
      typeAnswers: ["gönüllü", "gönüllü oldum"]
    },
    {
      id: "u2-basari", group: "basari", term: "başarı", fa: "موفقیت؛ دستاورد", type: "noun",
      form: "isim · başarılar · büyük başarı", source: "Yeni İstanbul A2 · Ünite 2A, s. 28 · Küçük Hayatlar, Büyük Başarılar",
      example: "Her insanın başarı hikâyesi farklıdır.", exampleFa: "داستان موفقیت هر انسان متفاوت است.",
      cloze: "Sizin hayatınızdaki en büyük ____ nedir?", clozeFa: "بزرگ‌ترین موفقیت زندگی شما چیست؟", answer: "başarı", distractors: ["başrol", "ödül", "haber"],
      typeAnswers: ["başarılar", "başarım"]
    },
    {
      id: "u2-unlu-olmak", group: "basari", term: "ünlü olmak", fa: "مشهور شدن؛ معروف بودن", type: "phrase",
      form: "kalıp fiil · ünlü olur · ünlü oldu", source: "Yeni İstanbul A2 · Ünite 2A, s. 30 · önemli kişiler",
      example: "Orhan Pamuk romanlarıyla ünlü oldu.", exampleFa: "اورهان پاموک با رمان‌هایش مشهور شد.",
      cloze: "Bu bilim insanı çalışmalarıyla ____.", clozeFa: "این دانشمند با پژوهش‌هایش مشهور شد.", answer: "ünlü oldu", distractors: ["mezun oldu", "gönüllü oldu", "hasta oldu"],
      typeAnswers: ["ünlü", "ünlü oldu"]
    },
    {
      id: "u2-mucit", group: "basari", term: "mucit", fa: "مخترع", type: "noun",
      form: "isim · mucitler · ünlü mucit", source: "Yeni İstanbul A2 · Ünite 2, s. 42-44 · kültür ve kelime listesi",
      example: "Hezarfen Ahmet Çelebi ünlü bir mucitti.", exampleFa: "هزارفن احمد چلبی مخترعی مشهور بود.",
      cloze: "Yeni bir araç yapan kişiye ____ denir.", clozeFa: "به کسی که وسیله‌ای تازه می‌سازد مخترع می‌گویند.", answer: "mucit", distractors: ["romancı", "gazeteci", "başrol"],
      typeAnswers: ["mucitler"]
    },
    {
      id: "u2-kesfetmek", group: "basari", term: "keşfetmek", fa: "کشف کردن", type: "verb",
      form: "fiil · keşfeder · keşfetti", source: "Yeni İstanbul A2 · Ünite 2, s. 42-44 · buluşlar ve kelime listesi",
      example: "Bilim insanları yeni bir yöntem keşfettiler.", exampleFa: "دانشمندان روشی تازه کشف کردند.",
      cloze: "Araştırmacılar önemli bir bilgi ____.", clozeFa: "پژوهشگران اطلاعات مهمی کشف کردند.", answer: "keşfettiler", distractors: ["seyrettiler", "tükettiler", "başvurdular"],
      typeAnswers: ["keşfet", "keşfetti", "keşfettiler"]
    },
    {
      id: "u2-odul", group: "basari", term: "ödül", fa: "جایزه", type: "noun",
      form: "isim · ödüller · ödül almak", source: "Yeni İstanbul A2 · Ünite 2A, s. 30 · Orhan Pamuk",
      example: "Orhan Pamuk 2006 yılında Nobel Edebiyat Ödülü'nü aldı.", exampleFa: "اورهان پاموک در سال ۲۰۰۶ جایزهٔ نوبل ادبیات را گرفت.",
      cloze: "Başarılı yazar birçok ____ aldı.", clozeFa: "نویسندهٔ موفق جایزه‌های زیادی گرفت.", answer: "ödül", distractors: ["sinyal", "haber", "başrol"],
      typeAnswers: ["ödüller", "ödül almak"]
    },
    {
      id: "u2-basrol", group: "sinema", term: "başrol", fa: "نقش اصلی؛ بازیگر نقش اصلی", type: "noun",
      form: "isim · başrolde · başrol oyuncusu", source: "Yeni İstanbul A2 · Ünite 2B, s. 31 · Sinemada Hangi Film Vardı?",
      example: "Filmin başrolünde iki genç oyuncu vardı.", exampleFa: "در نقش‌های اصلی فیلم دو بازیگر جوان حضور داشتند.",
      cloze: "Bu filmin ____ kim oynuyor?", clozeFa: "چه کسی در نقش اصلی این فیلم بازی می‌کند؟", answer: "başrolünde", distractors: ["türünde", "manşetinde", "ödülünde"],
      typeAnswers: ["başrolde", "başrolünde"]
    },
    {
      id: "u2-film-turu", group: "sinema", term: "film türü", fa: "ژانر یا گونهٔ فیلم", type: "phrase",
      form: "isim tamlaması · film türleri", source: "Yeni İstanbul A2 · Ünite 2B, s. 31 · film afişleri",
      example: "En çok hangi tür filmleri seviyorsunuz?", exampleFa: "بیشتر از همه چه نوع فیلم‌هایی را دوست دارید؟",
      cloze: "Komedi ve belgesel iki farklı ____.", clozeFa: "کمدی و مستند دو ژانر متفاوت فیلم‌اند.", answer: "film türüdür", distractors: ["haber türüdür", "başroldür", "ödüldür"],
      typeAnswers: ["film türleri", "tür"]
    },
    {
      id: "u2-gerilim", group: "sinema", term: "gerilim", fa: "دلهره؛ ژانر مهیج", type: "noun",
      form: "isim · gerilim filmi", source: "Yeni İstanbul A2 · Ünite 2B, s. 31 · film türleri",
      example: "Dün akşam bir gerilim filmi seyrettik.", exampleFa: "دیشب یک فیلم دلهره‌آور تماشا کردیم.",
      cloze: "Korku ve ____ filmlerini sevmiyorum.", clozeFa: "فیلم‌های ترسناک و دلهره‌آور را دوست ندارم.", answer: "gerilim", distractors: ["belgesel", "animasyon", "komedi"],
      typeAnswers: ["gerilim filmi"]
    },
    {
      id: "u2-belgesel", group: "sinema", term: "belgesel", fa: "مستند؛ فیلم مستند", type: "noun",
      form: "isim · belgeseller · belgesel film", source: "Yeni İstanbul A2 · Ünite 2B, s. 31 · film türleri",
      example: "Doğa hakkında güzel bir belgesel izledim.", exampleFa: "یک مستند زیبا دربارهٔ طبیعت دیدم.",
      cloze: "Gerçek olayları anlatan bu film bir ____.", clozeFa: "این فیلم که رویدادهای واقعی را روایت می‌کند یک مستند است.", answer: "belgesel", distractors: ["gerilim", "animasyon", "romantik"],
      typeAnswers: ["belgeseller", "belgesel film"]
    },
    {
      id: "u2-seyretmek", group: "sinema", term: "seyretmek", fa: "تماشا کردن", type: "verb",
      form: "fiil · seyreder · seyretti", source: "Yeni İstanbul A2 · Ünite 2A-2B, s. 29-34 · hafta sonu etkinlikleri",
      example: "Geçen hafta sonu sinemada film seyrettim.", exampleFa: "آخر هفتهٔ گذشته در سینما فیلم تماشا کردم.",
      cloze: "Dün akşam televizyonda haberleri ____.", clozeFa: "دیشب اخبار را در تلویزیون تماشا کردم.", answer: "seyrettim", distractors: ["keşfettim", "başvurdum", "tükettim"],
      typeAnswers: ["seyret", "seyretti", "seyrettim"]
    },
    {
      id: "u2-haber", group: "haber", term: "haber", fa: "خبر؛ گزارش خبری", type: "noun",
      form: "isim · haberler · haber vermek", source: "Yeni İstanbul A2 · Ünite 2C, s. 36-39 · Haberler",
      example: "Bu sabah sağlık haberlerini okudum.", exampleFa: "امروز صبح خبرهای سلامت را خواندم.",
      cloze: "Gazetede ilginç bir ____ okudum.", clozeFa: "در روزنامه خبر جالبی خواندم.", answer: "haber", distractors: ["başarı", "ödül", "gerilim"],
      typeAnswers: ["haberler", "haberi"]
    },
    {
      id: "u2-manset", group: "haber", term: "manşet", fa: "تیتر اصلی؛ سرخط خبر", type: "noun",
      form: "isim · manşetler · manşete çıkmak", source: "Yeni İstanbul A2 · Ünite 2C, s. 39 · sağlık manşetleri",
      example: "Gazetenin manşeti sağlıkla ilgiliydi.", exampleFa: "تیتر اصلی روزنامه دربارهٔ سلامت بود.",
      cloze: "Bu haber bugün bütün gazetelerde ____ oldu.", clozeFa: "این خبر امروز تیتر اصلی همهٔ روزنامه‌ها شد.", answer: "manşet", distractors: ["başrol", "belgesel", "turnuva"],
      typeAnswers: ["manşetler", "manşeti"]
    },
    {
      id: "u2-tuketmek", group: "haber", term: "tüketmek", fa: "مصرف کردن؛ خوردن یا به‌کار بردن", type: "verb",
      form: "fiil · tüketir · tüketti · tüketin", source: "Yeni İstanbul A2 · Ünite 2C, s. 36 · Sağlıklı Bir Hayat İçin On Altın Kural",
      example: "Her gün bir avuç çiğ kuru yemiş tüketin.", exampleFa: "هر روز یک مشت آجیل خام مصرف کنید.",
      cloze: "Aşırı yağlı yiyecekleri az ____.", clozeFa: "غذاهای بسیار چرب را کمتر مصرف کنید.", answer: "tüketin", distractors: ["keşfedin", "seyredin", "başvurun"],
      typeAnswers: ["tüket", "tüketti", "tüketin"]
    },
    {
      id: "u2-beslenmek", group: "haber", term: "beslenmek", fa: "تغذیه کردن؛ غذا خوردن", type: "verb",
      form: "fiil · beslenir · beslendi · düzenli beslenmek", source: "Yeni İstanbul A2 · Ünite 2C, s. 36 · sağlıklı hayat",
      example: "Sağlıklı ve düzenli beslenmek çok önemlidir.", exampleFa: "تغذیهٔ سالم و منظم بسیار مهم است.",
      cloze: "Uzun yaşamak için düzenli ____.", clozeFa: "برای عمر طولانی منظم غذا بخورید.", answer: "beslenin", distractors: ["seyredin", "başvurun", "keşfedin"],
      typeAnswers: ["beslen", "beslenin", "beslendi"]
    },
    {
      id: "u2-kuru-yemis", group: "haber", term: "kuru yemiş", fa: "آجیل؛ خشکبار", type: "phrase",
      form: "isim · bir avuç kuru yemiş", source: "Yeni İstanbul A2 · Ünite 2C, s. 36 · sağlıklı beslenme",
      example: "Çiğ badem ve fındık sağlıklı kuru yemişlerdir.", exampleFa: "بادام و فندق خام از آجیل‌های سالم‌اند.",
      cloze: "Ara öğünde bir avuç ____ yedim.", clozeFa: "در میان‌وعده یک مشت آجیل خوردم.", answer: "kuru yemiş", distractors: ["beyaz et", "meyve suyu", "kamp ateşi"],
      typeAnswers: ["kuru yemişler", "kuruyemiş"]
    },
    {
      id: "u2-ciglik", group: "workbook_penicillin", term: "çığlık", fa: "فریاد؛ جیغ", type: "noun",
      form: "isim · çığlık atmak / çığlık duymak", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2A, s. 11 · Penisilin",
      example: "Çiftçi tarlada çalışırken bir çığlık duydu.", exampleFa: "کشاورز هنگام کار در مزرعه فریادی شنید.",
      cloze: "Bataklıktan bir çocuğun ____ duyuldu.", clozeFa: "فریاد کودکی از مرداب شنیده شد.", answer: "çığlığı", distractors: ["ödülü", "manşeti", "başrolü"],
      typeAnswers: ["çığlığı", "çığlık atmak"]
    },
    {
      id: "u2-bataklik", group: "workbook_penicillin", term: "bataklık", fa: "مرداب؛ باتلاق", type: "noun",
      form: "isim · bataklıkta / bataklıktan", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2A, s. 11 · Penisilin",
      example: "Çiftçi çocuğu bataklıktan çıkardı.", exampleFa: "کشاورز کودک را از باتلاق بیرون آورد.",
      cloze: "Çocuk ____ yardım istedi.", clozeFa: "کودک در باتلاق کمک خواست.", answer: "bataklıkta", distractors: ["turnuvada", "manşette", "başrolde"],
      typeAnswers: ["bataklıkta", "bataklıktan"]
    },
    {
      id: "u2-kurtarmak", group: "workbook_penicillin", term: "kurtarmak", fa: "نجات دادن", type: "verb",
      form: "fiil · kurtarır · kurtardı · kimi kurtardı?", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2A, s. 11 · Penisilin",
      example: "Fleming çocuğu ölümden kurtardı.", exampleFa: "فلمینگ کودک را از مرگ نجات داد.",
      cloze: "Doktor hastayı zatürreden ____.", clozeFa: "پزشک بیمار را از ذات‌الریه نجات داد.", answer: "kurtardı", distractors: ["keşfetti", "seyretti", "atandı"],
      typeAnswers: ["kurtar", "kurtardı", "kurtarın"]
    },
    {
      id: "u2-egitim-gormek", group: "workbook_penicillin", term: "eğitim görmek", fa: "آموزش دیدن؛ تحصیل کردن", type: "phrase",
      form: "kalıp fiil · eğitim görür · eğitim gördü", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2A, s. 11 · Penisilin",
      example: "Fleming'in oğlu iyi bir eğitim gördü.", exampleFa: "پسر فلمینگ آموزش خوبی دید.",
      cloze: "Genç bilim insanı Londra'da ____.", clozeFa: "دانشمند جوان در لندن تحصیل کرد.", answer: "eğitim gördü", distractors: ["film seyretti", "haber okudu", "kamp yaptı"],
      typeAnswers: ["eğitim gördü", "eğitim aldım"]
    },
    {
      id: "u2-projeye-katilmak", group: "workbook_penicillin", term: "projeye katılmak", fa: "به پروژه پیوستن؛ در پروژه شرکت کردن", type: "phrase",
      form: "kalıp fiil · projeye katılır · katıldı", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2A, s. 12 · Yeni Bir Proje",
      example: "Dört öğrenci sokak hayvanları projesine katıldı.", exampleFa: "چهار دانش‌آموز به پروژهٔ حیوانات خیابانی پیوستند.",
      cloze: "Jinhao bu projeye neden ____?", clozeFa: "جین‌هائو چرا به این پروژه پیوست؟", answer: "katıldı", distractors: ["atandı", "mezun oldu", "seyretti"],
      typeAnswers: ["projeye katıl", "katıldı", "katılmak"]
    },
    {
      id: "u2-cadir-kurmak", group: "workbook_camp", term: "çadır kurmak", fa: "چادر برپا کردن", type: "phrase",
      form: "kalıp fiil · çadır kurar · çadır kurdu", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2B, s. 13 · Bolu'da Kamp",
      example: "Kerem babasına çadır kurmak için yardım etti.", exampleFa: "کرم برای برپا کردن چادر به پدرش کمک کرد.",
      cloze: "Gölün yanında büyük bir ____.", clozeFa: "کنار دریاچه یک چادر بزرگ برپا کردیم.", answer: "çadır kurduk", distractors: ["haber okuduk", "film seyrettik", "ödül aldık"],
      typeAnswers: ["çadır kur", "çadır kurduk", "çadır kurdu"]
    },
    {
      id: "u2-cali-toplamak", group: "workbook_camp", term: "çalı toplamak", fa: "بوته و هیزم جمع کردن", type: "phrase",
      form: "kalıp fiil · çalı toplar · çalı topladı", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2B, s. 13 · Bolu'da Kamp",
      example: "Çocuklar ateş için çalı topladılar.", exampleFa: "بچه‌ها برای آتش بوته و هیزم جمع کردند.",
      cloze: "Kamp ateşini yakmadan önce ____.", clozeFa: "پیش از روشن کردن آتش اردو هیزم جمع کردیم.", answer: "çalı topladık", distractors: ["kuru yemiş yedik", "haber yazdık", "film seyrettik"],
      typeAnswers: ["çalı topla", "çalı topladı", "çalı topladık"]
    },
    {
      id: "u2-kamp-atesi", group: "workbook_camp", term: "kamp ateşi", fa: "آتش اردو", type: "phrase",
      form: "isim tamlaması · kamp ateşini yakmak", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2B, s. 13 · Bolu'da Kamp",
      example: "Geceleyin kamp ateşiyle ısındık.", exampleFa: "شب با آتش اردو گرم شدیم.",
      cloze: "Hava soğuktu ama ____ yanında oturduk.", clozeFa: "هوا سرد بود اما کنار آتش اردو نشستیم.", answer: "kamp ateşinin", distractors: ["film türünün", "gazete manşetinin", "başrolün"],
      typeAnswers: ["kamp ateşini", "kamp ateşinin"]
    },
    {
      id: "u2-turnuva", group: "workbook_camp", term: "turnuva", fa: "مسابقات؛ تورنمنت", type: "noun",
      form: "isim · turnuvalar · turnuvayı kazanmak", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2C, s. 15 · Bu Yıl da Böyle Geçti",
      example: "Naomi Osaka tenis turnuvasında şampiyon oldu.", exampleFa: "نائومی اوساکا در مسابقات تنیس قهرمان شد.",
      cloze: "Türkiye Bisiklet ____ bir spor haberiydi.", clozeFa: "تور دوچرخه‌سواری ترکیه یک خبر ورزشی بود.", answer: "Turnuvası", distractors: ["Manşeti", "Belgeseli", "Başrolü"],
      typeAnswers: ["turnuvası", "turnuvalar"]
    },
    {
      id: "u2-sampiyon-olmak", group: "workbook_camp", term: "şampiyon olmak", fa: "قهرمان شدن", type: "phrase",
      form: "kalıp fiil · şampiyon olur · şampiyon oldu", source: "Yeni İstanbul A2 Çalışma Kitabı · Ünite 2C, s. 15 · spor haberleri",
      example: "Liverpool finali kazandı ve şampiyon oldu.", exampleFa: "لیورپول فینال را برد و قهرمان شد.",
      cloze: "Takım final maçından sonra ____.", clozeFa: "تیم پس از مسابقهٔ فینال قهرمان شد.", answer: "şampiyon oldu", distractors: ["gönüllü oldu", "mezun oldu", "ünlü oldu"],
      typeAnswers: ["şampiyon", "şampiyon oldu"]
    }
  ];

  const unit2Groups = [
    { id: "hayat", icon: "1", title: "Hayatın dönüm noktaları", fa: "رویدادهای مهم زندگی", subtitle: "از تولد و فارغ‌التحصیلی تا کار و فعالیت داوطلبانه" },
    { id: "basari", icon: "2", title: "Başarı ve önemli kişiler", fa: "موفقیت و چهره‌های مهم", subtitle: "دستاورد، شهرت، اختراع، کشف و جایزه" },
    { id: "sinema", icon: "3", title: "Sinema ve hafta sonu", fa: "سینما و آخر هفته", subtitle: "ژانرها، نقش اصلی و گفتن آنچه تماشا کردی" },
    { id: "haber", icon: "4", title: "Haberler ve sağlıklı hayat", fa: "خبرها و زندگی سالم", subtitle: "تیتر خبر و توصیه‌های تغذیه‌ای کتاب" },
    { id: "workbook_penicillin", icon: "5", title: "Penisilin ve yeni proje", fa: "پنی‌سیلین و پروژهٔ تازه", subtitle: "تمرین‌های دفتر کار: نجات، آموزش و کار داوطلبانه" },
    { id: "workbook_camp", icon: "6", title: "Bolu'da kamp ve spor", fa: "اردوی بولو و خبرهای ورزشی", subtitle: "تمرین‌های دفتر کار: چادر، آتش اردو و قهرمانی" }
  ];

  const unit2GrammarTeach = [
    {
      title: "Belirli geçmiş zaman: -DI",
      body: "برای رویدادی که در گذشته تمام شده از -dı/-di/-du/-dü یا پس از صامت بی‌صدا از -tı/-ti/-tu/-tü استفاده می‌کنیم. سپس شناسهٔ شخص می‌آید: geldim، geldin، geldi، geldik، geldiniz، geldiler. در فارسی معمولاً با گذشتهٔ ساده ترجمه می‌شود.",
      example: "Dün sinemaya gittim; Seda 2013'te mezun oldu.", emphasis: ["gittim", "mezun", "oldu"]
    },
    {
      title: "منفی و پرسشیِ گذشته",
      body: "منفی با -ma/-me پیش از -DI ساخته می‌شود: gelmedim. برای پرسش، mı/mi/mu/mü جدا نوشته می‌شود و شناسه به آن می‌چسبد: geldin mi؟ در پرسش منفی می‌گوییم gelmedin mi؟",
      example: "Dün ders çalışmadım. Filmi seyrettin mi?", emphasis: ["çalışmadım", "seyrettin", "mi"]
    },
    {
      title: "İsim cümlelerinde geçmiş: -(y)DI",
      body: "برای «بودن» در گذشته، -ydı/-ydi/-ydu/-ydü را به اسم یا صفت می‌افزاییم: hastaydım. پس از صامت شکل i- حذف می‌شود: öğrenciydi. منفی با değil بود: mutlu değildik. پرسش با mıydı ساخته می‌شود: evde miydin؟",
      example: "Geçen hafta hastaydım ama evde değildim.", emphasis: ["hastaydım", "değildim"]
    },
    {
      title: "Sebep ve sonuç bağlaçları",
      body: "çünkü جملهٔ دلیل را معرفی می‌کند: Gitmedim çünkü hastaydım. اما bu sebeple، bu nedenle، bu yüzden و bunun için معمولاً پیش از نتیجه می‌آیند: Hastaydım, bu yüzden gitmedim. جای دلیل و نتیجه را دقیق نگه دار.",
      example: "Hava soğuktu; bu nedenle dışarı çıkmadık.", emphasis: ["bu", "nedenle"]
    },
    {
      title: "ile و شکل‌های -la/-le",
      body: "ile همراهی، ابزار یا پیوند میان دو اسم را نشان می‌دهد: annem ile، uçak ile، Ayşe ile Mehmet. در گفتار و نوشتار به شکل پسوند -la/-le می‌آید؛ پس از واکه y میانجی می‌گیرد: arabayla، annemle، diş fırçasıyla.",
      example: "Annemle geldim; dişlerimi diş fırçasıyla fırçaladım.", emphasis: ["Annemle", "fırçasıyla"]
    }
  ];

  const unit2GrammarQuestions = [
    q("Ben dün sinemaya ____.", ["gittim", "gittin", "gitti"], "gittim", "فاعل ben است؛ git + ti + m → gittim."),
    q("Seda 2013'te üniversiteden mezun ____.", ["oldu", "oldum", "oldunuz"], "oldu", "فاعل سوم‌شخص مفرد است؛ olmak در گذشته oldu می‌شود."),
    q("Biz geçen yıl İstanbul'a ____.", ["geldik", "geldiniz", "geldiler"], "geldik", "شناسهٔ biz در گذشته -k است: gel-di-k."),
    q("Onlar geçen hafta projeye ____.", ["katılmadılar", "katılmadınız", "katılmadık"], "katılmadılar", "منفیِ onlar: katıl + ma + dı + lar."),
    q("Sen bu filmi daha önce ____ mi?", ["seyrettin", "seyretti", "seyrettiniz"], "seyrettin", "در پرسش، فعل گذشته صرف می‌شود و mi جدا می‌آید."),
    q("O dün okula ____ mi?", ["gelmedi", "gelmedin", "gelmedik"], "gelmedi", "پرسش منفی برای o: gelmedi mi؟"),
    q("Geçen hafta çok ____; bu yüzden dinlendim.", ["yorgundum", "yorgundun", "yorgundu"], "yorgundum", "برای ben، صفت + ydı + m: yorgundum."),
    q("Dün hava soğuk ____.", ["değildi", "değildim", "değildiniz"], "değildi", "منفیِ جملهٔ اسمی با değil + گذشته: değildi."),
    q("Siz geçen yıl öğrenci ____?", ["miydiniz", "miydin", "miydik"], "miydiniz", "پرسش گذشته برای siz: öğrenci miydiniz؟"),
    q("Çocuklar kampta çok ____.", ["mutluydular", "mutluydum", "mutluydunuz"], "mutluydular", "فاعل جمع است؛ mutlu + ydu + lar."),
    q("Okula gitmedim ____ hastaydım.", ["çünkü", "bu yüzden", "bunun için"], "çünkü", "پس از çünkü علت می‌آید: نرفتم چون بیمار بودم."),
    q("Hava çok soğuktu; ____ dışarı çıkmadık.", ["bu nedenle", "çünkü", "ama"], "bu nedenle", "پس از bu nedenle نتیجه می‌آید: بیرون نرفتیم."),
    q("Sınavdan az puan aldım; ____ annem bana kızdı.", ["bu yüzden", "çünkü", "ile"], "bu yüzden", "نمرهٔ کم علت و عصبانیت مادر نتیجه است."),
    q("Yarın erken kalkacağım; ____ şimdi uyuyorum.", ["bunun için", "çünkü", "ama"], "bunun için", "bunun için نتیجه یا اقدام ناشی از جملهٔ قبل را معرفی می‌کند."),
    q("Sinemaya annem____ gittim.", ["le", "la", "yle"], "le", "annem + le → annemle؛ همراهی را بیان می‌کند."),
    q("İstanbul'a uçak____ geldik.", ["la", "le", "yla"], "la", "uçak با صامت تمام می‌شود و واکهٔ آخر ı است: uçakla."),
    q("Dişlerimi diş fırçası____ fırçalıyorum.", ["yla", "la", "le"], "yla", "پس از واکهٔ ı، y میانجی می‌آید: fırçasıyla."),
    q("Lütfen haberleri dikkatle ____.", ["okuyun", "okuyalım", "okusun"], "okuyun", "مرور واحد ۱: امر محترمانه یا جمع برای siz با -yın/-yin/-yun/-yün."),
    q("Haydi bu akşam bir belgesel ____.", ["seyredelim", "seyredeyim", "seyredin"], "seyredelim", "مرور واحد ۱: پیشنهاد مشترک برای biz با -alım/-elim."),
    q("Bu gece çok geç ____.", ["kalmayın", "kalmayalım", "kalmasın"], "kalmayın", "مرور واحد ۱: امر منفی برای siz، kal + ma + yın."),
    q("Ben çayı ____ içiyorum. (şeker yok)", ["şekersiz", "şekerli", "şekerlik"], "şekersiz", "مرور واحد ۱: -siz معنی نبودن یا نداشتن می‌دهد."),
    q("Bu salon yüz ____.", ["kişilik", "kişili", "kişisiz"], "kişilik", "مرور واحد ۱: عدد + kişi + -lik ظرفیت را می‌سازد.")
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
    },
    {
      id: 2,
      code: "Ünite 02",
      title: "Haberiniz Olsun",
      subtitle: "روایت گذشته، آخر هفته و سینما، خبرها و زندگی سالم",
      pathTitle: "رویدادهای گذشته را دقیق تعریف کن و خبر و تجربه را به ترکی بازگو کن",
      image: "assets/unit-2-haberiniz-olsun.jpg",
      imageAlt: "تصویر کاغذبری از سه زبان‌آموز در استانبول کنار روزنامه، دوربین سینما و وسایل سفر",
      criteriaNote: "منبع انتخاب: تمام بخش‌های واحد ۲ در Yeni İstanbul A2 (صفحات چاپی ۲۷ تا ۴۴) و تمرین‌های کامل واحد ۲ در Yeni İstanbul A2 Çalışma Kitabı (صفحات ۱۱ تا ۱۶). چهار بخش نخست واژگان پرتکرار زندگی‌نامه، موفقیت، سینما و خبر/سلامت را پوشش می‌دهند؛ دو بخش پایانی مستقیماً از متن‌های «Penisilin»، «Yeni Bir Proje»، «Bolu'da Kamp» و خبرهای ورزشی دفتر کار ساخته شده‌اند. هر بخش دقیقاً ۲۲ تمرین دارد و پنج تمرین پایانی واژه‌های قبلی را مرور می‌کند.",
      vocab: unit2Vocab,
      groups: unit2Groups,
      grammar: {
        id: "grammar",
        icon: "G",
        title: "Geçmiş zaman, bağlaçlar ve ile",
        fa: "دستور زبان پایانی",
        subtitle: "گذشتهٔ معین، جمله‌های اسمی در گذشته، علت و نتیجه، و ile",
        placeholder: "پاسخ را به ترکی بنویس",
        teach: unit2GrammarTeach,
        questions: unit2GrammarQuestions
      }
    }
  ];

  window.YENI_ISTANBUL_DATA = { lessons: units };
})();
