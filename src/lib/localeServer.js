import { cookies, headers } from "next/headers";

const LOCALE_PREFIX_REGEX = /^\/(en|ar)(\/|$)/;
const DEFAULT_LOCALE = "en";

function isSupportedLocale(value) {
	return value === "en" || value === "ar";
}

export function stripLocalePrefix(pathname) {
	if (!pathname) {
		return "/";
	}

	return pathname.replace(LOCALE_PREFIX_REGEX, "/").replace(/\/$/, "") || "/";
}

export function getServerLocale() {
	const reqHeaders = headers();
	const headerLocale = reqHeaders.get("x-locale");
	if (isSupportedLocale(headerLocale)) {
		return headerLocale;
	}

	const cookieLang = cookies().get("lang")?.value;
	if (isSupportedLocale(cookieLang)) {
		return cookieLang;
	}

	const acceptLanguage = reqHeaders.get("accept-language") ?? "";
	return acceptLanguage.toLowerCase().startsWith("ar") ? "ar" : DEFAULT_LOCALE;
}
