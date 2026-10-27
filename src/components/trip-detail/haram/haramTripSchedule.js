export const HARAM_TIME_ID = 141;
export const HARAM_TIME_ZONE = "Asia/Riyadh";

const WEEKDAY_INDEX = {
	Sun: 0,
	Mon: 1,
	Tue: 2,
	Wed: 3,
	Thu: 4,
	Fri: 5,
	Sat: 6,
};

function getPartsInRiyadh(now) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: HARAM_TIME_ZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	}).formatToParts(now);

	return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
}

function getTimeMinutes(timeValue) {
	const match = String(timeValue || "").match(/^(\d{1,2}):(\d{2})/);
	if (!match) return null;
	return Number(match[1]) * 60 + Number(match[2]);
}

export function getHaramSchedule(bookingData, now = new Date()) {
	const time = bookingData?.times?.find(
		(option) => Number(option?.id) === HARAM_TIME_ID,
	);
	const days = (Array.isArray(bookingData?.days) ? bookingData.days : [])
		.map(Number)
		.filter((day) => Number.isInteger(day) && day >= 1 && day <= 7)
		.map((day) => day % 7);
	const departureMinutes = getTimeMinutes(time?.time);

	if (!time || departureMinutes === null || days.length === 0) return null;

	const parts = getPartsInRiyadh(now);
	const todayIndex = WEEKDAY_INDEX[parts.weekday];
	if (typeof todayIndex !== "number") return null;

	const minutesNow = Number(parts.hour) * 60 + Number(parts.minute);
	const cutoffMinutes = departureMinutes - 60;
	const daysUntilTour = Math.min(...days.map((day) => {
		const offset = (day - todayIndex + 7) % 7;
		return offset === 0 && minutesNow >= cutoffMinutes ? 7 : offset;
	}));

	const date = new Date(
		Date.UTC(
			Number(parts.year),
			Number(parts.month) - 1,
			Number(parts.day) + daysUntilTour,
		),
	)
		.toISOString()
		.slice(0, 10);

	return {
		date,
		time: {
			...time,
			id: HARAM_TIME_ID,
			time: time.time,
		},
	};
}

export function formatHaramDate(date, lang = "en") {
	if (!date) return "";
	const value = new Date(`${date}T12:00:00.000Z`);
	return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-GB", {
		calendar: "gregory",
		timeZone: "UTC",
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(value);
}

export function formatHaramTime(timeValue, lang = "en", { longPeriod = false } = {}) {
	const minutes = getTimeMinutes(timeValue);
	if (minutes === null) return "";
	const value = new Date(Date.UTC(2020, 0, 1, Math.floor(minutes / 60), minutes % 60));
	const isAr = lang === "ar";
	const options = {
		timeZone: "UTC",
		hour: "numeric",
		minute: "2-digit",
	};
	if (longPeriod) {
		options.hour12 = true;
		if (isAr) options.dayPeriod = "long";
	}
	return new Intl.DateTimeFormat(
		longPeriod && !isAr ? "en-US" : isAr ? "ar-SA" : "en-GB",
		options,
	).format(value);
}

export function getHaramDurationMinutes(duration) {
	const value = String(duration || "");
	const hours = Number(value.match(/(\d+)\s*hours?/i)?.[1] || 0);
	const minutes = Number(value.match(/(\d+)\s*minutes?/i)?.[1] || 0);
	return hours * 60 + minutes || 90;
}

export function formatHaramEndTime(timeValue, duration, lang = "en", options = {}) {
	const startMinutes = getTimeMinutes(timeValue);
	if (startMinutes === null) return "";
	const endMinutes = (startMinutes + getHaramDurationMinutes(duration)) % (24 * 60);
	const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
	return formatHaramTime(endTime, lang, options);
}
