const BUSINESS = {
  phoneE164: "+972539304168",
  email: "Wishclean.il@gmail.com",
  businessName: "Wishclean",
  whatsappDirectUrl: "https://wa.me/message/6EGSJPR7C4ZVP1",
  instagramUrl: "https://www.instagram.com/wishclean_il?igsh=MWs5Z2NidnBuanVmbw%3D%3D&utm_source=qr",
  facebookUrl: "https://www.facebook.com/share/1CG6tPFFZq/?mibextid=wwXIfr",
};

// פונקציית עזר למעקב אחרי המרות של גוגל
function trackWhatsAppConversion(location) {
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', {
      'event_category': 'Contact',
      'event_label': 'WhatsApp ' + location,
      'transport_type': 'beacon'
    });
    console.log('Conversion tracked: WhatsApp ' + location);
  }
}

function sanitizePhoneDigits(e164) {
  return (e164 || "").replace(/[^\d]/g, "");
}

function getFormData() {
  const type = document.getElementById("qType")?.value?.trim() || "";
  const city = document.getElementById("qCity")?.value?.trim() || "";
  const name = document.getElementById("qName")?.value?.trim() || "";
  const phone = document.getElementById("qPhone")?.value?.trim() || "";
  const notes = document.getElementById("qNotes")?.value?.trim() || "";
  return { type, city, name, phone, notes };
}

function buildMessage(lang, d) {
  if (lang === "ru") {
    return `Здравствуйте! Хочу получить цену на химчистку мягкой мебели.
Тип мебели: ${d.type || "-"}
Город: ${d.city || "-"}
Имя: ${d.name || "-"}
Телефон: ${d.phone || "-"}
Комментарий: ${d.notes || "-"}
(Можно прикрепить фото/видео в WhatsApp)`;
  }
  return `שלום! אני רוצה הצעת מחיר לניקוי ריפודים.
סוג רהיט: ${d.type || "-"}
עיר: ${d.city || "-"}
שם: ${d.name || "-"}
טלפון: ${d.phone || "-"}
הערות: ${d.notes || "-"}
(אפשר לצרף תמונה/וידיאו בוואטסאפ)`;
}

function whatsappLink(lang, data) {
  const text = encodeURIComponent(buildMessage(lang, data));
  const digits = sanitizePhoneDigits(BUSINESS.phoneE164);
  return `https://wa.me/${digits}?text=${text}`;
}

function mailtoLink(lang, data) {
  const subject = lang === "ru"
    ? encodeURIComponent(`Запрос цены | ${BUSINESS.businessName}`)
    : encodeURIComponent(`בקשת הצעת מחיר | ${BUSINESS.businessName}`);
  const body = encodeURIComponent(buildMessage(lang, data));
  return `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
}

/* -------------------- i18n -------------------- */
const I18N = {
  he: {
    skip: "דלג לתוכן", tagline: "ניקוי ריפודים מקצועי", nav_services: "שירותים", nav_process: "איך זה עובד", nav_gallery: "גלריה", nav_contact: "צור קשר", call: "התקשר",
    pill: "שירות עד הבית • בטוח לילדים וחיות מחמד • תוצאה עמוקה", h1: "ניקוי ריפודים מקצועי לרהיטים", lead: "טיפול יסודי בכתמים והסרת ריחות — תוצאה נקייה ובטוחה לבית שלכם!",
    cta_wa: "קבל הצעת מחיר בוואטסאפ", cta_email: "שלח בקשה במייל", mini1_t: "זמינות מהירה", mini1_s: "ניקוי בבית או במשרד", mini2_t: "ציוד מתקדם", mini2_s: "התאמה לסוג הבד/עור", mini3_t: "אחריות מלאה", mini3_s: "שמירה על שלמות הריפוד",
    why_title: "למה לבחור ב-Wishclean?", why_text: "אנו מספקת שירותי ניקוי יבש לרהיטים מרופד בבית הלקוח בישראל...",
    b1: "נוח", b2: "בטוח", b3: "יעיל", b4: "אחריות", note_photos: "טיפ: צילום אחד של הספה עוזר להצעת מחיר מדויקת.",
    services_title: "מה אנחנו עושים", services_sub: "ניקוי מקצועי בהתאמה לסוג הריפוד — בד ועור.", s1_t: "ניקוי ספות בד", s1_p: "ניקוי עמוק שמסיר כתמים וריחות.", s2_t: "ניקוי רהיטי עור", s2_p: "טיפול עדין לשמירה על המרקם.", s3_t: "ניקוי בבית הלקוח", s3_p: "ללא פירוק וללא הובלה.",
    f1_t: "נוח", f1_p: "ניקוי בבית הלקוח — ללא פירוק וללא הובלה.", f2_t: "בטוח", f2_p: "חומרים בטוחים לאדם, לילדים ולחיות מחמד.", f3_t: "יעיל", f3_p: "ניקוי עמוק להסרת כתמים וריחות.", f4_t: "אחריות מלאה", f4_p: "שמירה על שלמות הבד/העור.",
    p_title: "איך אנחנו מנקים ספות?", p_text: "ניקוי יסודי של כל הספה: בין כריות, משענות וחריצים.",
    st1_t: "אבחון קצר", st1_p: "סוג הבד והמלצה על שיטה מתאימה.", st2_t: "טיפול בכתמים", st2_p: "שימוש במסירי כתמים מקצועיים ובטוחים.", st3_t: "ניקוי עמוק", st3_p: "ניקוי מקיף של כל אזורי הספה.", st4_t: "יבוש מהיר", st4_p: "בדיקת תוצאה והנחיות ייבוש.",
    v_title: "סרטונים", v_text: "תהליך עבודה ותוצאות אמיתיות.", v_btn: "דברו איתנו עכשיו",
    g_title: "גלריית עבודות", g_sub: "לפני / אחרי — דוגמאות אמיתיות.",
    r_title: "לקוחות ממליצים", r_sub: "כמה מילים מלקוחות אמיתיים.", r_btn_google: "⭐ ביקורות וכתיבת חוות דעת בגוגל",
    r1_text: "שירות מעולה, מקצועי ויסודי. הספה נראית כמו חדשה!", r1_author: "דניאל, אשדוד", r2_text: "הגיע בזמן, עבד נקי ומסודר. ממליצה בחום.", r2_author: "אנה", r3_text: "ניקוי ברמה גבוהה מאוד, גם ריחות וגם כתמים קשים.", r3_author: "מיכאל",
    c_title: "קבלו הצעת מחיר עכשיו", c_text: "מלאו 20 שניות פרטים לוואטסאפ/מייל.", c_phone: "טלפון:", c_email: "מייל:", c_area: "אזור שירות:", c_area_v: "ישראל",
    c_hint_t: "מה לכתוב לנו?", c_hint_1: "איזה רהיט?", c_hint_2: "עיר + קומה", c_hint_3: "תיאור קצר", c_hint_4: "תמונה עוזרת", c_hint_note: "הכפתורים יכינו הודעה אוטומטית.",
    form_title: "מלאו פרטים", q_type: "סוג רהיט", q_pick: "בחר/י…", q_t1: "ספה", q_t2: "כורסה", q_t3: "מזרן/מיטה", q_t4: "רהיט עור", q_t5: "אחר",
    q_city: "עיר", q_city_ph: "אשדוד", q_name: "שם", q_name_ph: "שם פרטי", q_phone: "טלפון לחזרה", q_phone_ph: "05x-xxxxxxx",
    q_notes: "תיאור קצר", q_notes_ph: "כתם יין/ריח קל", q_send_wa: "שלח ל-WhatsApp", q_send_email: "שלח ל-Email", q_reset: "נקה",
    q_hint: "אחרי שהוואטסאפ ייפתח — אפשר לצרף תמונה בלחיצה על 📎.", f_services: "שירותים", f_gallery: "גלריה", f_contact: "צור קשר",
  },
  ru: {
    skip: "К форме",
    tagline: "профессиональная химчистка мягкой мебели",
    nav_services: "Услуги",
    nav_process: "Как это работает",
    nav_gallery: "Галерея",
    nav_contact: "Контакты",
    call: "☎",
    pill: "Выезд на дом • Безопасно для детей и животных • Глубокий результат",
    h1: "профессиональная химчистка мягкой мебели",
    lead: "Удаление пятен и запахов — чисто и безопасно для вашего дома!",
    cta_wa: "Получить цену в WhatsApp",
    cta_email: "Отправить на Email",
    mini1_t: "Быстро", mini1_s: "На дому или в офисе", mini2_t: "Оборудование", mini2_s: "Под ткань/кожу", mini3_t: "Гарантия", mini3_s: "Бережный подход",
    why_title: "Почему Wishclean?",
    why_text: "Wishclean предоставляет услуги химчистки мягкой мебели на дому в Израиле. Мы используем профессиональные средства...",
    b1: "Удобно", b2: "Безопасно", b3: "Эффективно", b4: "Гарантия", note_photos: "Совет: одно фото мебели помогает точнее оценить стоимость.",
    services_title: "Что мы делаем", services_sub: "Чистка под тип обивки — ткань и кожа.", s1_t: "Чистка тканевых диванов", s1_p: "Глубокая чистка: пятна, грязь ומחסלי ריחות.", s2_t: "Чистка кожаной мебели", s2_p: "Деликатно: сохраняем цвет ומראה.", s3_t: "У клиента", s3_p: "Без разборки и перевозки — дома или в офисе.",
    f1_t: "Удобно", f1_p: "У клиента — без перевозки. Быстро и комфортно.", f2_t: "Безопасно", f2_p: "Средства безопасны для людей, детей и животных.", f3_t: "Эффективно", f3_p: "Глубокий результат: пятна, запахи, грязь.", f4_t: "Гарантия", f4_p: "Бережно к ткани/коже — заметный результат.",
    p_title: "Как we чистим диваны?", p_text: "Мы подбираем метод под тип ткани. Чистим не только поверхность — но ומקומות נסתרים.",
    st1_t: "Диагностика", st1_p: "Тип обивки ומלצה על שיטה מתאימה.", st2_t: "Пятна и запахи", st2_p: "Проф. средства, безопасные для дома.", st3_t: "Глубокая чистка", st3_p: "Вся мебель + труднодоступные места.", st4_t: "Финиш и проверка", st4_p: "Проверка результата ומלצות ייבוש.",
    v_title: "Видео", v_text: "Здесь можно посмотреть процесс и результаты.", v_btn: "Связаться сейчас",
    g_title: "Галерея работ", g_sub: "До / после — реальные примеры.",
    r_title: "Отзывы клиентов", r_sub: "Несколько слов от реальных клиентов.", r_btn_google: "⭐ Отзывы и оценка в Google",
    r1_text: "Отличный сервис — профессионально. Диван как новый!", r1_author: "Даниэль, Ашдод", r2_text: "Приехали вовремя, работали аккуратно. Рекомендую!", r2_author: "Анна", r3_text: "Очень высокий уровень — убрали и запахи, и пятна.", r3_author: "Михаил",
    c_title: "Получите цену сейчас", c_text: "Заполните 20 секунд — сообщение для WhatsApp/Email.", c_phone: "Телефон:", c_email: "Email:", c_area: "Зона:", c_area_v: "Израиль",
    c_hint_t: "Что написать?", c_hint_1: "Какая мебель?", c_hint_2: "Город + этаж", c_hint_3: "Коротко", c_hint_4: "Фото помогает", c_hint_note: "Кнопки подготовят сообщение.",
    form_title: "Заполните данные", q_type: "Тип мебели", q_pick: "Выберите…", q_t1: "Диван", q_t2: "Кресло", q_t3: "Матрас", q_t4: "Кожа", q_t5: "Другое",
    q_city: "Город", q_city_ph: "Ashdod", q_name: "Имя", q_name_ph: "Имя", q_phone: "Телефон", q_phone_ph: "+972...",
    q_notes: "Комментарий", q_notes_ph: "пятно вина + запах", q_send_wa: "В WhatsApp", q_send_email: "На Email", q_reset: "Очистить",
    q_hint: "В WhatsApp можно прикрепить фото/видеו через 📎.", f_services: "Услуги", f_gallery: "Галерея", f_contact: "Контакты",
  },
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.he;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ru" ? "ltr" : "rtl";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });
  const toggleBtn = document.getElementById("langToggleBtn");
  if (toggleBtn) toggleBtn.textContent = lang === "he" ? "RU" : "HE";
  refreshQuickLinks(lang);
}

function refreshQuickLinks(lang) {
  const data = getFormData();
  const wa = whatsappLink(lang, data);
  const ml = mailtoLink(lang, data);
  const waTop = document.getElementById("whatsappQuoteBtn");
  if (waTop) waTop.setAttribute("href", wa);
  const mailTop = document.getElementById("emailQuoteBtn");
  if (mailTop) mailTop.setAttribute("href", ml);
}

/* Initialization - Runs after DOM is ready due to 'defer' */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  if (document.getElementById("phoneLink")) document.getElementById("phoneLink").setAttribute("href", `tel:${BUSINESS.phoneE164}`);
  if (document.getElementById("emailLink")) {
    document.getElementById("emailLink").setAttribute("href", `mailto:${BUSINESS.email}`);
    document.getElementById("emailLink").textContent = BUSINESS.email;
  }
  if (document.getElementById("callNowBtn")) document.getElementById("callNowBtn").setAttribute("href", `tel:${BUSINESS.phoneE164}`);
  if (document.getElementById("instagramLink")) document.getElementById("instagramLink").setAttribute("href", BUSINESS.instagramUrl);
  if (document.getElementById("facebookLink")) document.getElementById("facebookLink").setAttribute("href", BUSINESS.facebookUrl);

  let currentLang = (() => {
    const saved = localStorage.getItem("wishclean_lang");
    if (saved === "he" || saved === "ru") return saved;
    return (navigator.language || "he").toLowerCase().startsWith("ru") ? "ru" : "he";
  })();

  applyLang(currentLang);

  document.getElementById("langToggleBtn")?.addEventListener("click", () => {
    currentLang = currentLang === "he" ? "ru" : "he";
    localStorage.setItem("wishclean_lang", currentLang);
    applyLang(currentLang);
  });

  // הוספת מעקב המרה לכפתור הוואטסאפ הראשי (Top CTA)
  document.getElementById("whatsappQuoteBtn")?.addEventListener("click", () => {
    trackWhatsAppConversion('Top Button');
  });

  // הוספת מעקב המרה לכפתור השליחה מהטופס
  document.getElementById("sendWaFromForm")?.addEventListener("click", () => {
    trackWhatsAppConversion('Form');
    window.open(whatsappLink(currentLang, getFormData()), "_blank", "noopener,noreferrer");
  });

  document.getElementById("sendEmailFromForm")?.addEventListener("click", () => {
    window.location.href = mailtoLink(currentLang, getFormData());
  });

  ["qType","qCity","qName","qPhone","qNotes"].forEach((id) => {
    const el = document.getElementById(id);
    el?.addEventListener("input", () => refreshQuickLinks(currentLang));
  });

  // Share functionality
  document.getElementById('shareBtn')?.addEventListener('click', async () => {
    const shareData = { title: document.title, text: 'Wishclean – ניקוי ריפודים מקצועי', url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      try { await navigator.clipboard.writeText(shareData.url); alert('הקישור הועתק ללוח 📋'); } catch (err) { alert('לא ניתן להעתיק'); }
    }
  });

  refreshQuickLinks(currentLang);
});
