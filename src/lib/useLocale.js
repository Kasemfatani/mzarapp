"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

const LOCALE_PREFIX_REGEX = /^\/(en|ar)(\/|$)/;
const DEFAULT_LOCALE = "en";

export function stripLocalePrefix(pathname) {
	if (!pathname) {
		return "/";
	}

	return pathname.replace(LOCALE_PREFIX_REGEX, "/").replace(/\/$/, "") || "/";
}

function getLocaleFromPathname(pathname) {
	const localeMatch = pathname?.match(LOCALE_PREFIX_REGEX);
	return localeMatch ? localeMatch[1] : DEFAULT_LOCALE;
}

export function useCurrentLocale() {
	const pathname = usePathname() || "/";

	const locale = useMemo(() => getLocaleFromPathname(pathname), [pathname]);
	const barePath = useMemo(() => stripLocalePrefix(pathname), [pathname]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		localStorage.setItem("lang", locale);
		const oneYear = 60 * 60 * 24 * 365;
		const isHTTPS = window.location.protocol === "https:";
		document.cookie = `lang=${locale}; path=/; max-age=${oneYear}; samesite=lax${
			isHTTPS ? "; secure" : ""
		}`;
	}, [locale]);

	const localizedHref = (path) => {
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;
		return `/${locale}${normalizedPath}`;
	};

	const getSwitchPath = (nextLocale) => {
		return `/${nextLocale}${barePath === "/" ? "" : barePath}`;
	};

	return {
		locale,
		isAr: locale === "ar",
		barePath,
		localizedHref,
		getSwitchPath,
	};
}