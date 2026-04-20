import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["en", "ar"] as const;
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
		const rewrittenPath = pathname.replace(/^\/(en|ar)/, "") || "/";
		const rewriteUrl = request.nextUrl.clone();
		rewriteUrl.pathname = rewrittenPath;

		const response = NextResponse.rewrite(rewriteUrl);
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
	redirectUrl.pathname =
		pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

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
