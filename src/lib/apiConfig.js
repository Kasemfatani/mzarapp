const API_BASE_URL = 'https://dash.mzarapp.com/api';
const API_BASE_URL_NEW = 'https://app.mzarapp.com/api';
const API_BETA_URL = 'https://beta.mzarapp.com/api';
const BLOG_URL = 'https://app.mzarapp.com';

const API_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  USER_PROFILE: '/user/profile',
  // Add more endpoints as needed
};

export async function getIsSaudiFromHeaders(headersObj) {
	const IPINFO_TOKEN = process.env.IPINFO_TOKEN || "";
	let isSaudi = true;
	let countryCode = null;

	try {
		const ip = headersObj?.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
		const MOCK_IP_FOR_USD = "8.8.8.8";
    const MOCK_IP_FOR_SAR = "37.106.0.1";
		// const requestIp =
		// 	process.env.NODE_ENV === "development" ? MOCK_IP_FOR_USD : ip;
    // console.log("Determining currency for IP:", ip);
    const requestIp =  ip;

		if (IPINFO_TOKEN) {
			const res = await fetch(
				`https://ipinfo.io/${requestIp}?token=${IPINFO_TOKEN}`,
				{
					next: { revalidate: 3600 },
				}
			);
			if (res.ok) {
				const geo = await res.json();
				// ipinfo returns country code in `country` (e.g. "SA"); accept other fields if present
				countryCode =
					(geo.country || geo.country_code || geo.countryCode || null)
						?.toString?.()
						.toUpperCase?.() ?? null;
				isSaudi = countryCode === "SA";
				isSaudi = true;
			}
		}
	} catch (e) {
		console.error("IP Geolocation failed:", e);
	}

	return { isSaudi, countryCode };
}

export { API_BASE_URL, API_ENDPOINTS , API_BASE_URL_NEW  , API_BETA_URL , BLOG_URL};