import type { MetadataRoute } from "next";
import { API_BASE_URL_NEW, BLOG_URL } from "@/lib/apiConfig";

export const revalidate = 3600;

const SITE_URL = "https://www.mzarapp.com".replace(/\/$/, "");

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
	is_available?: number;
};

async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
	const langs = ["en", "ar"];
	const seen = new Set<string>();
	const entries: MetadataRoute.Sitemap = [];

	for (const lang of langs) {
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

				const path = `/blog/${encodedSlug}`;

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

async function getTripDetailEntries(): Promise<MetadataRoute.Sitemap> {
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
		const seenIds = new Set<number>();

		return packages
			.filter((pkg) => {
				const id = Number(pkg?.id);

				if (!id || Number.isNaN(id)) {
					return false;
				}

				if (seenIds.has(id)) {
					return false;
				}

				if (Number(pkg?.is_available) !== 1) {
					return false;
				}

				seenIds.add(id);
				return true;
			})
			.map((pkg) => ({
				url: `${SITE_URL}/trip-detail/${pkg.id}`,
				lastModified: new Date(),
				changeFrequency: "weekly" as const,
				priority: 0.8,
			}));
	} catch {
		return [];
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
		url: `${SITE_URL}${route.path}`,
		lastModified: new Date(),
		changeFrequency: route.changeFrequency,
		priority: route.priority,
	}));

	const [blogEntries, tripDetailEntries] = await Promise.all([
		getBlogEntries(),
		getTripDetailEntries(),
	]);

	return [...staticEntries, ...blogEntries, ...tripDetailEntries];
}
