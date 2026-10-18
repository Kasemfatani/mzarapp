"use client";

import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { trackViewItem, trackBeginCheckout } from "@/lib/analytics";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PrivateTourLayout from "./PrivateTourLayout";
import { copy } from "./private-tour-copy";

const STORAGE_KEY = "path.selection";
const SAR_PER_USD = 3.75;

const localDate = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Riyadh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

export default function PrivateTourPage({ lang = "en", trip, bookingData }) {
  const t = copy[lang === "ar" ? "ar" : "en"];
  const isAr = lang === "ar";
  const [date, setDate] = useState("");
  const [timeId, setTimeId] = useState("");
  const [people, setPeople] = useState(Number(trip.min_people_count) || 4);
  const addons = [143];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("online");
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [availability, setAvailability] = useState("idle");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const minGuests = Number(trip.min_people_count) || 4;
  const maxGuests = Number(trip.max_people_count) || 7;
  const priceWithTicket = Number(bookingData?.price_per_person ?? trip.price_with_ticket);
  const cars = useMemo(() => (bookingData?.cars || []).filter(car => car.is_enabled && Number(car.number_of_seats) >= people && Number(car.number_of_seats) <= maxGuests).sort((a, b) => Number(a.number_of_seats) - Number(b.number_of_seats)), [bookingData, people, maxGuests]);
  const vehicle = cars[0];
  const vehicleOptions = useMemo(() => (bookingData?.cars || []).filter(car => car.is_enabled && Number(car.number_of_seats) <= maxGuests && Number(car.number_of_seats) >= minGuests).sort((a, b) => Number(a.number_of_seats) - Number(b.number_of_seats)).filter((car, index, all) => all.findIndex(item => Number(item.number_of_seats) === Number(car.number_of_seats)) === index).map(car => ({ id: car.id, capacity: car.number_of_seats, name: [Number(car.number_of_seats) === 4 ? "سيدان" : car.name, Number(car.number_of_seats) === 4 ? "Sedan" : car.name] })), [bookingData, maxGuests, minGuests]);
  const ticketAddon = (bookingData?.add_ons || []).find(addon => Number(addon.id) === 143);
  const time = (bookingData?.times || []).find(slot => String(slot.id) === String(timeId));
  const minDate = bookingData?.min_date && bookingData.min_date > localDate() ? bookingData.min_date : localDate();
  const maxDate = bookingData?.max_date || undefined;

  useEffect(() => {
    trackViewItem({ id: trip.id, type: trip.type, city: trip.city, name: trip.name, rating: trip.rating, start_price: trip.start_price, currency: "SAR" });
  }, [trip.id]);

  useEffect(() => {
    if (!date || !timeId) { setAvailability("idle"); return; }
    const controller = new AbortController();
    const params = new URLSearchParams({ package_id: "45", date, time_id: timeId });
    setAvailability("checking");
    fetch(`${API_BASE_URL_NEW}/landing/trip/check-availability?${params}`, { headers: { lang }, signal: controller.signal })
      .then(async response => {
        const json = await response.json();
        if (!response.ok || json.status !== true) throw new Error(json.message || "Unavailable");
        setAvailability("available");
      })
      .catch(() => { if (!controller.signal.aborted) setAvailability("unavailable"); });
    return () => controller.abort();
  }, [date, timeId, lang]);

  const pricing = useMemo(() => {
    const subtotal = Number((priceWithTicket * people).toFixed(2));
    const discount = Number(((Number(promo?.discountPercent || 0) / 100) * subtotal).toFixed(2));
    const fee = payment === "cash" ? 5 : 0;
    return { subtotal, discount, fee, total: Number((subtotal - discount + fee).toFixed(2)), tax: 0 };
  }, [priceWithTicket, people, promo, payment]);
  const displayMoney = value => isAr
    ? `${new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 2 }).format(Number(value || 0))} ريال`
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(value || 0) / SAR_PER_USD);
  const startingPrice = Number.isFinite(priceWithTicket) && priceWithTicket > 0 ? priceWithTicket : 0;

  async function applyPromo() {
    if (!promoCode.trim()) return;
    setPromo(null); setPromoMessage("");
    try {
      const url = `${API_BASE_URL_NEW}/landing/coupons/check?promo_code=${encodeURIComponent(promoCode.trim())}&promo_type=trip`;
      const response = await fetch(url, { headers: { lang } });
      const json = await response.json();
      if (!response.ok || !json.status || !json.data) throw new Error(json.message || t.promoInvalid);
      setPromo({ code: promoCode.trim(), discountPercent: Number(json.data.discount_value || 0) });
      setPromoMessage(t.promoApplied);
    } catch (cause) { setPromoMessage(cause.message || t.promoInvalid); }
  }

  async function submit(event) {
    event.preventDefault(); setError("");
    if (!bookingData || availability !== "available" || !vehicle || !time || !Number.isInteger(people) || people < minGuests || people > maxGuests || date < minDate || (maxDate && date > maxDate)) { setError(t.minDate); return; }
    const normalized = phone.replace(/[\s()-]/g, "");
    const parsed = parsePhoneNumberFromString(normalized, "SA");
    const whatsapp = parsed?.nationalNumber || normalized.replace(/^0/, "");
    const countryCode = parsed?.countryCallingCode || "966";
    if (name.trim().length < 2 || !/^\d{7,12}$/.test(whatsapp)) { setError(t.error); return; }
    setBusy(true);
    try {
      const selection = { date, time, vehicle, tour_id: 45, people, add_ons: addons, is_express: false };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
      const payload = { name: name.trim(), phone: null, whatsapp, phone_country_code: null, whatsapp_country_code: countryCode, package_id: 45, date, time_id: time.id, transportation_type_id: vehicle.id, people_count: people, payment_type: payment === "cash" ? "cash" : "online", promo_code: promo?.code || null, add_ons: addons, is_express: false };
      const response = await fetch(`${API_BASE_URL_NEW}/landing/trip/booking`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", lang }, body: JSON.stringify(payload) });
      const json = await response.json();
      if (!response.ok || !json.status || !json.data?.trip_id || !json.data?.customer_id || !json.data?.ref_no) throw new Error(json.message || t.error);
      const { trip_id, customer_id, ref_no } = json.data;
      const bookedTotal = Number(json.data.grand_total);
      if (!Number.isFinite(bookedTotal) || Math.abs(bookedTotal - pricing.total) > 0.01) {
        throw new Error(isAr ? "تغير السعر أثناء الحجز. يرجى تحديث الصفحة والمحاولة مجددًا." : "The booking price changed. Please refresh and try again.");
      }
      const cartId = `${ref_no}_${Date.now()}`;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...selection, trip_id, customer_id, ref_no, cart_id: cartId, customer_name: name.trim(), customer_whatsapp: countryCode + whatsapp, bus_id: 45, bus_name: bookingData.name, finalTotal: bookedTotal, promoCode: promo?.code || "", tax: Number(json.data.tax_amount || 0) }));
      try { trackBeginCheckout({ busData: bookingData, finalTotal: pricing.total, promoCode: promo?.code || "", quantity: people, currency: "SAR" }); } catch {}
      if (pricing.total === 0 || payment === "cash") {
        window.location.assign(`/book-path-success?status=success&tranRef=${pricing.total === 0 ? "free" : "cash"}`);
        return;
      }
      const payResponse = await fetch("/api/pay/clickpay/init", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: bookedTotal, lang, cart_id: cartId, customer_details: { name: name.trim(), email: "customer@gmail.com", whatsapp: countryCode + whatsapp }, successPath: "/book-path-success", failPath: `/${lang}/trip-detail/45#booking` }) });
      const payJson = await payResponse.json();
      if (!payResponse.ok || !payJson.paymentUrl) throw new Error(payJson.error || t.error);
      window.location.assign(payJson.paymentUrl);
    } catch (cause) { setError(cause.message || t.error); setBusy(false); }
  }

  const faqItems = [
    [isAr ? "هل الجولة خاصة بمجموعتي؟" : "Is the tour private?", isAr ? `نعم، المركبة مخصصة لمجموعتك. عدد المشاركين من ${minGuests} إلى ${maxGuests} أشخاص.` : `Yes. The vehicle is reserved for your group of ${minGuests}–${maxGuests} guests.`],
    [isAr ? "ماذا يشمل السعر؟" : "What does the price include?", isAr ? `يشمل سعر ${displayMoney(startingPrice)} للفرد الضريبة وتذكرة معرض الوحي لكل مشارك.` : `${displayMoney(startingPrice)} per guest, including VAT and a Revelation Exhibition ticket for each guest. Payment is processed in SAR.`],
    [isAr ? "كيف أدفع؟ وهل توجد رسوم إضافية؟" : "How can I pay? Are there extra fees?", isAr ? "الدفع الإلكتروني دون رسوم إضافية. الدفع النقدي يضيف ٥ ريالات مرة واحدة على الحجز." : "Online payment has no extra fee. Cash adds SAR 5 once per booking."],
    [isAr ? "كيف أستخدم الإرشاد الصوتي؟" : "How do I access the audio guidance?", isAr ? "استخدم تطبيق مزار للإرشاد الصوتي والنصي بست لغات." : "Use the Mzar app for smart audio and text guidance in six languages."],
    [isAr ? "من أين تبدأ الجولة؟" : "Where does the tour start?", isAr ? "الاستقبال والعودة من مقر إقامتكم المتفق عليه في مكة. مدة الجولة أربع ساعات." : "Pickup and return are at your agreed accommodation in Makkah. The tour lasts four hours."],
  ];
  const booking = <>
    <div className="book-head">
      <span className="eyebrow">{isAr ? "تجربتك تبدأ هنا" : "YOUR EXPERIENCE STARTS HERE"}</span>
      <h2>{t.book}</h2>
      <div className="price"><small>{t.from}</small><strong>{displayMoney(startingPrice)} <span>{isAr ? "/ للفرد" : "/ person"}</span></strong></div>
      <div className="ticket-line">✦ {isAr ? "تذكرة معرض الوحي مشمولة لكل مشارك" : "Revelation Exhibition ticket for every guest"}</div>
      <p className="muted compact">{isAr ? `الحجز من ${minGuests} إلى ${maxGuests} أشخاص. الأسعار تشمل ضريبة القيمة المضافة.` : `${minGuests}–${maxGuests} guests. Prices include VAT.`}</p>
      {!isAr && <p className="note">{t.usdNote}</p>}
    </div>
    {bookingData && startingPrice > 0 && ticketAddon ? <form onSubmit={submit}>
      <fieldset disabled={busy}>
        <div className="date-time">
          <label>{t.chooseDate}<input id="date" type="date" required min={minDate} max={maxDate} value={date} onChange={event => setDate(event.target.value)} /></label>
          <label>{t.chooseTime}<select id="time" required value={timeId} onChange={event => setTimeId(event.target.value)}><option value="">{t.select}</option>{(bookingData.times || []).map(slot => <option key={slot.id} value={slot.id}>{slot.name}</option>)}</select></label>
        </div>
        <p className="min-note">{isAr ? "جميع المواعيد بتوقيت مكة المكرمة (UTC+3)." : "All departures use Makkah time (UTC+3)."}</p>
        <div className="availability" role="status">{date && timeId ? availability === "checking" ? t.checking : availability === "available" ? t.available : t.unavailable : ""}</div>
        <label className="field" htmlFor="name">{t.name}</label>
        <input id="name" required autoComplete="name" minLength={2} maxLength={100} value={name} onChange={event => setName(event.target.value)} placeholder={isAr ? "اسم صاحب الحجز" : "Booking name"} />
        <label className="field" htmlFor="phone">{t.phone}</label>
        <input id="phone" required type="tel" autoComplete="tel" dir="ltr" placeholder="+966 5X XXX XXXX" value={phone} onChange={event => setPhone(event.target.value)} />
        <div className="count-row"><label htmlFor="count">{t.guests}</label><div className="counter"><button type="button" aria-label={isAr ? "تقليل عدد الأشخاص" : "Fewer guests"} disabled={people <= minGuests} onClick={() => setPeople(current => current - 1)}>−</button><input id="count" required type="number" min={minGuests} max={maxGuests} step="1" value={people} onChange={event => setPeople(Number(event.target.value))} /><button type="button" aria-label={isAr ? "زيادة عدد الأشخاص" : "More guests"} disabled={people >= maxGuests} onClick={() => setPeople(current => current + 1)}>+</button></div></div>
        <p className="min-note">{vehicle ? `${vehicle.name} · ${vehicle.number_of_seats} ${t.seats}` : t.noVehicles}</p>
        <details className="promo-details"><summary>{isAr ? "هل لديك رمز خصم؟" : "Have a promo code?"}</summary><label className="field" htmlFor="promo">{t.promo}</label><div className="promo"><input id="promo" value={promoCode} onChange={event => { setPromoCode(event.target.value); setPromo(null); setPromoMessage(""); }} autoCapitalize="characters" maxLength={40} /><button type="button" onClick={applyPromo}>{t.apply}</button></div></details>
        <div className="promo-message" role="status">{promoMessage}</div>
        <div className="payment"><span className="field">{isAr ? "طريقة الدفع" : "Payment method"}</span><label className={payment === "online" ? "selected" : ""}><input type="radio" name="payment" checked={payment === "online"} onChange={() => setPayment("online")} /><span><b>{t.online}</b><small>{isAr ? "دون رسوم إضافية" : "No additional fee"}</small></span></label><label className={payment === "cash" ? "selected" : ""}><input type="radio" name="payment" checked={payment === "cash"} onChange={() => setPayment("cash")} /><span><b>{t.cash}</b><small>+{displayMoney(5)} {isAr ? "لكل حجز" : "per booking"}</small></span></label></div>
        <div className="bill" aria-live="polite"><div><span>{people} × {displayMoney(startingPrice)}</span><span>{displayMoney(pricing.subtotal)}</span></div>{promo && <div className="discount"><span>{isAr ? "خصم الرمز الترويجي" : "Promo discount"}</span><span>−{displayMoney(pricing.discount)}</span></div>}<div><span>{isAr ? "رسوم الدفع" : "Payment fee"}</span><span>{displayMoney(pricing.fee)}</span></div><div className="total"><div>{t.total}<small>{isAr ? "يشمل الضريبة وتذاكر المعرض" : "Includes VAT & exhibition tickets"}</small></div><strong>{displayMoney(pricing.total)}</strong></div></div>
        <p className="booking-detail">⌖ {isAr ? "الاستقبال والعودة من مقر إقامتكم المتفق عليه في مكة." : "Pickup and return at your agreed accommodation in Makkah."}</p>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn submit" type="submit" disabled={busy || availability !== "available" || !vehicle}>{busy ? t.checking : payment === "online" ? t.pay : t.payCash} ←</button>
        <p className="trust">{isAr ? "إلغاء مجاني حتى ٢٤ ساعة قبل الجولة · تأكيد فوري" : "Free cancellation up to 24 hours · Instant confirmation"}</p>
        <p className="note">{isAr ? "بالمتابعة، توافق على" : "By continuing, you agree to the"} <a href={`/${lang}/terms-and-conditions`}>{isAr ? "شروط الحجز" : "booking terms"}</a> {isAr ? "و" : "and"} <a href={`/${lang}/cancellation-policy`}>{isAr ? "سياسة الإلغاء" : "cancellation policy"}</a>.</p>
      </fieldset>
    </form> : <p className="error">{t.unavailableBooking}</p>}
  </>;
  return <PrivateTourLayout locale={lang} vehicle={vehicle} vehicleOptions={vehicleOptions} faqItems={faqItems} booking={booking} priceWithTicket={startingPrice} people={people} total={pricing.total} />;
}
