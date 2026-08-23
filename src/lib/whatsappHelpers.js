export const DEFAULT_WHATSAPP_NUMBER = "966580121025";

/**
 * Generates a WhatsApp booking URL with a localized, prefilled message.
 *
 * @param {Object} params
 * @param {number|string} [params.id] - Package / Tour / Path ID (e.g. 88 for Haram, 87 for Madinah)
 * @param {string} [params.name] - Path / Tour / Package Name
 * @param {number|string} [params.type] - Type of trip (1=path, 2=experience, 3=tour)
 * @param {string} [params.lang='ar'] - Language ('ar' or 'en')
 * @param {string} [params.phone] - Custom WhatsApp phone number
 * @returns {string} WhatsApp URL
 */
export function getBookingWhatsAppUrl({
  id,
  name = "",
  type,
  lang = "ar",
  phone = DEFAULT_WHATSAPP_NUMBER,
}) {
  const isAr = lang === "ar";
  const numId = Number(id);
  const cleanName = typeof name === "string" ? name.trim() : "";

  let message = "";

  if (numId === 88) {
    // 1. Book Haram (Al-Haram Grand Mosque Tour)
    message = isAr
      ? "السلام عليكم، أرغب بحجز جولة المسجد الحرام الإثرائية"
      : "Hello, I would like to book the Grand Mosque Tour";
  } else if (numId === 87) {
    // 2. Book Madinah (Al-Masjid An-Nabawi Tour)
    message = isAr
      ? "السلام عليكم، أرغب بحجز جولة المسجد النبوي الإثرائية"
      : "Hello, I would like to book the Prophet's Mosque Tour";
  } else if (type === 3 || String(type) === "3") {
    // 3. Book Tour (/book-tour/{id})
    message = isAr
      ? cleanName
        ? `السلام عليكم، أرغب بحجز جولة ${cleanName}`
        : "السلام عليكم، أرغب بحجز جولة سياحية"
      : cleanName
      ? `Hello, I would like to book the ${cleanName} tour`
      : "Hello, I would like to book a tour";
  } else {
    // 4. Book Path (/book-path/{id})
    message = isAr
      ? cleanName
        ? `السلام عليكم، أرغب بحجز مسار ${cleanName}`
        : "السلام عليكم، أرغب بحجز مسار إثرائي"
      : cleanName
      ? `Hello, I would like to book the ${cleanName} trail`
      : "Hello, I would like to book a trail experience";
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
