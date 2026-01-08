const API_BASE_URL = "https://dash.mzarapp.com/api";
const API_BASE_URL_NEW = "https://app.mzarapp.com/api";
const API_BETA_URL = "https://beta.mzarapp.com/api";
const BLOG_URL = "https://app.mzarapp.com";

const API_ENDPOINTS = {
	REGISTER: "/auth/register",
	LOGIN: "/auth/login",
	USER_PROFILE: "/user/profile",
	// Add more endpoints as needed
};

export async function getIsSaudiFromHeaders(headersObj) {
	const IPINFO_TOKEN = process.env.IPINFO_TOKEN || "";
	let isSaudi = true;
	let countryCode = null;
	let ipUsed = null;

	try {
		// 1) Platform / CDN country headers (most reliable on Vercel, Cloudflare, etc.)
		const headerCandidates = [
			"x-vercel-ip-country",
			"x-edge-country",
			"cf-ipcountry",
			"x-client-country",
			"x-country",
		];
		for (const h of headerCandidates) {
			const val = headersObj?.get?.(h);
			if (val) {
				countryCode = String(val).slice(0, 2).toUpperCase();
				isSaudi = countryCode === "SA";
				return { isSaudi, countryCode, ipUsed: null };
			}
		}

		// 2) Extract candidate IPs from common headers
		const xff = headersObj?.get("x-forwarded-for") || "";
		const xreal = headersObj?.get("x-real-ip") || "";
		const candidates = []
			.concat(xff ? xff.split(",").map((s) => s.trim()) : [])
			.concat(xreal ? [xreal.trim()] : [])
			.filter(Boolean);

		// Helper: detect private/local IPs
		const isPrivateIp = (ip) => {
			if (!ip) return true;
			// strip port if present
			const clean = ip.split(":")[0];
			// IPv4 private ranges and localhost
			if (
				clean === "127.0.0.1" ||
				clean === "0.0.0.0" ||
				/^10\./.test(clean) ||
				/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(clean) ||
				/^192\.168\./.test(clean)
			)
				return true;
			// IPv6 localhost / unique-local
			if (/^::1$/.test(clean) || /^fc00:/i.test(clean) || /^fe80:/i.test(clean))
				return true;
			return false;
		};

		// pick the first public candidate IP
		const publicIp = candidates.find((ip) => !isPrivateIp(ip));
		ipUsed = publicIp || null;

		// 3) If we have a public IP and an IPINFO token, query ipinfo for that IP
		if (ipUsed && IPINFO_TOKEN) {
			const res = await fetch(
				`https://ipinfo.io/${ipUsed}?token=${IPINFO_TOKEN}`,
				{
					next: { revalidate: 3600 },
				}
			);
			 console.log("Determining currency for IP:", ipUsed);
			if (res.ok) {
				const geo = await res.json();
				countryCode =
					geo?.country || geo?.country_code || null
						? String(geo.country).toUpperCase()
						: null;
				isSaudi = countryCode === "SA";

				console.log("IP Geolocation:", geo);
				console.log("CountryCode:", countryCode);
				console.log("IsSaudi:", isSaudi);

				return { isSaudi, countryCode, ipUsed };
			}
		}

		// 4) Fallbacks:
		// - If we couldn't resolve a public IP or ipinfo not available, try accept-language header
		const acceptLang = headersObj?.get("accept-language") || "";
		if (acceptLang && acceptLang.startsWith("ar")) {
			// heuristic: assume Arabic-language visitors are likely in region (best-effort)
			countryCode = "SA";
			isSaudi = true;
			return { isSaudi, countryCode, ipUsed };
		}
	} catch (e) {
		// swallow errors, keep defaults
		console.error("IP Geolocation failed:", e);
	}

	// default: assume Saudi to keep prices in SAR unless we know otherwise
	return { isSaudi, countryCode, ipUsed };
}

export {
	API_BASE_URL,
	API_ENDPOINTS,
	API_BASE_URL_NEW,
	API_BETA_URL,
	BLOG_URL,
};
