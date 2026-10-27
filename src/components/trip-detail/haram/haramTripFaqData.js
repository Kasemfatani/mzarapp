import { formatHaramMoney, getHaramOfferPrices } from "./haramTripPricing";
import { formatHaramDate, formatHaramTime } from "./haramTripSchedule";
import { haramTripCopy } from "./haramTripContent";

export function getHaramTripFaqItems({ bookingData, schedule, lang }) {
	const locale = lang === "ar" ? "ar" : "en";
	const copy = haramTripCopy[locale];
	const time = formatHaramTime(schedule?.time?.time || "20:30:00", locale, { longPeriod: true });
	const dateText = schedule?.date ? formatHaramDate(schedule.date, locale) : copy.scheduleUnavailable;
	const endTime = formatHaramTime("22:15", locale, { longPeriod: true });
	const { currentPrice } = getHaramOfferPrices({
		price: bookingData?.price,
		taxRate: bookingData?.tax,
	});
	const personPrice = formatHaramMoney(currentPrice, locale);
	const answerDetails = { dateText, time, endTime, personPrice };

	return copy.faq.map(([question, answer]) => [
		question,
		typeof answer === "function" ? answer(answerDetails) : answer,
	]);
}
