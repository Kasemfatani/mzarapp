import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const EXCLUDED_PREFIXES = ["/_next", "/api"];

function isExcludedPath(pathname: string): boolean {
	if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return true;
	}

	// Skip static/public files like .png, .xml, .ico, etc.
	const lastSegment = pathname.split("/").pop() ?? "";
	if (lastSegment.includes(".")) {
		return true;
	}

	return false;
}

function detectLocale(request: NextRequest): "en" | "ar" {
	const cookieLang = request.cookies.get("lang")?.value;
	if (cookieLang === "en" || cookieLang === "ar") {
		return cookieLang;
	}

	const acceptLanguage = request.headers.get("accept-language") ?? "";
	return acceptLanguage.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (isExcludedPath(pathname)) {
		return NextResponse.next();
	}

	const localeMatch = pathname.match(/^\/(en|ar)(\/|$)/);

	if (localeMatch) {
		const locale = localeMatch[1] as "en" | "ar";
		if (/^\/(en|ar)\/book-haram\/?$/.test(pathname)) {
			const redirectUrl = request.nextUrl.clone();
			redirectUrl.pathname = `/${locale}/trip-detail/88`;
			redirectUrl.hash = "booking";
			return NextResponse.redirect(redirectUrl, 307);
		}
		if (/^\/(en|ar)\/book-path\/45\/?$/.test(pathname)) {
			const redirectUrl = request.nextUrl.clone();
			redirectUrl.pathname = `/${locale}/trip-detail/45`;
			redirectUrl.hash = "booking";
			return NextResponse.redirect(redirectUrl, 307);
		}
		const rewrittenPath = pathname.replace(/^\/(en|ar)/, "") || "/";
		const rewriteUrl = request.nextUrl.clone();
		rewriteUrl.pathname = /^\/mzar-hajjexpo2026\/?$/.test(rewrittenPath)
			? "/mzar-hajjexpo2026-exhibition.html"
			: rewrittenPath;
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("x-locale", locale);

		const response = NextResponse.rewrite(rewriteUrl, {
			request: {
				headers: requestHeaders,
			},
		});
		response.cookies.set("lang", locale, {
			path: "/",
			maxAge: 60 * 60 * 24 * 365,
			sameSite: "lax",
			secure: request.nextUrl.protocol === "https:",
		});
		return response;
	}

	const locale = detectLocale(request);
	const redirectUrl = request.nextUrl.clone();
	if (/^\/book-haram\/?$/.test(pathname)) {
		redirectUrl.pathname = `/${locale}/trip-detail/88`;
		redirectUrl.hash = "booking";
	} else {
		redirectUrl.pathname =
			pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
	}

	const response = NextResponse.redirect(redirectUrl, 307);
	response.cookies.set("lang", locale, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		sameSite: "lax",
		secure: request.nextUrl.protocol === "https:",
	});
	return response;
}

export const config = {
	matcher: ["/:path*"],
};
