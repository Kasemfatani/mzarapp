import type { MetadataRoute } from "next";
import { API_BASE_URL_NEW, BLOG_URL } from "@/lib/apiConfig";

export const revalidate = 3600;

const SITE_URL = "https://www.mzarapp.com".replace(/\/$/, "");
const LOCALES = ["en", "ar"] as const;

type ChangeFrequency =
	| "always"
	| "hourly"
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly"
	| "never";

const staticRoutes: Array<{
	path: string;
	priority: number;
	changeFrequency: ChangeFrequency;
}> = [
	{ path: "/", priority: 1, changeFrequency: "daily" },
	{ path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
	{ path: "/all-trips", priority: 0.9, changeFrequency: "daily" },
	{ path: "/blogs", priority: 0.9, changeFrequency: "daily" },
	{ path: "/book-haram", priority: 0.8, changeFrequency: "weekly" },
	{ path: "/book-madinah", priority: 0.8, changeFrequency: "weekly" },
	{ path: "/contact-us", priority: 0.7, changeFrequency: "monthly" },
	{ path: "/faq", priority: 0.7, changeFrequency: "monthly" },
	{ path: "/gallary", priority: 0.7, changeFrequency: "monthly" },
	{ path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
	{ path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
	{
		path: "/terms-and-conditions",
		priority: 0.3,
		changeFrequency: "yearly",
	},
	{
		path: "/cancellation-policy",
		priority: 0.3,
		changeFrequency: "yearly",
	},
];

type BlogItem = {
	slug?: string;
	updatedAt?: string;
	createdAt?: string;
};

type PackageItem = {
	id?: number;
	type?: number;
	is_available?: number;
};

async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
	const seen = new Set<string>();
	const entries: MetadataRoute.Sitemap = [];

	for (const lang of LOCALES) {
		try {
			const res = await fetch(`${BLOG_URL}/api/blogs`, {
				headers: { lang },
				next: { revalidate: 3600 },
			});

			if (!res.ok) {
				continue;
			}

			const json = await res.json();
			const blogs: BlogItem[] = Array.isArray(json?.data?.blogs)
				? json.data.blogs
				: [];

			for (const blog of blogs) {
				const rawSlug = String(blog?.slug ?? "").trim();

				if (!rawSlug) {
					continue;
				}

				const encodedSlug = rawSlug
					.split("/")
					.map((part) => encodeURIComponent(part))
					.join("/");

				const path = `/${lang}/blog/${encodedSlug}`;

				if (seen.has(path)) {
					continue;
				}

				seen.add(path);

				entries.push({
					url: `${SITE_URL}${path}`,
					lastModified: blog?.updatedAt || blog?.createdAt || new Date(),
					changeFrequency: "weekly",
					priority: 0.7,
				});
			}
		} catch {
			continue;
		}
	}

	return entries;
}

async function getPackageEntries(): Promise<MetadataRoute.Sitemap> {
	try {
		const res = await fetch(`${API_BASE_URL_NEW}/landing/packages/list`, {
			headers: { lang: "ar" },
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			return [];
		}

		const json = await res.json();
		const packages: PackageItem[] = Array.isArray(json?.data) ? json.data : [];
		const entries: MetadataRoute.Sitemap = [];
		const seenUrls = new Set<string>();

		for (const pkg of packages) {
			const id = Number(pkg?.id);
			const type = Number(pkg?.type);
			const isAvailable = Number(pkg?.is_available) === 1;

			if (!id || Number.isNaN(id) || !isAvailable) {
				continue;
			}

			const basePaths = [`/trip-detail/${id}`];

			if (type === 1) {
				basePaths.push(`/book-path/${id}`);
			}

			if (type === 3) {
				basePaths.push(`/book-tour/${id}`);
			}

			for (const locale of LOCALES) {
				for (const basePath of basePaths) {
					const path = `/${locale}${basePath}`;
					if (seenUrls.has(path)) {
						continue;
					}

					seenUrls.add(path);

					entries.push({
						url: `${SITE_URL}${path}`,
						lastModified: new Date(),
						changeFrequency: "weekly",
						priority: basePath.startsWith("/trip-detail/") ? 0.8 : 0.6,
					});
				}
			}
		}

		return entries;
	} catch {
		return [];
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
		staticRoutes.map((route) => {
			const localizedPath =
				route.path === "/" ? `/${locale}` : `/${locale}${route.path}`;
			return {
				url: `${SITE_URL}${localizedPath}`,
				lastModified: new Date(),
				changeFrequency: route.changeFrequency,
				priority: route.priority,
			};
		}),
	);

	const [blogEntries, packageEntries] = await Promise.all([
		getBlogEntries(),
		getPackageEntries(),
	]);

	return [...staticEntries, ...blogEntries, ...packageEntries];
}
