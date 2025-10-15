import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import SingleBlog from "@/components/blog/SingleBlog";
import Content from "@/components/home/Content";
import { API_BASE_URL } from "@/lib/apiConfig";

// 1. Import 'cache' from 'react'
import { cache } from "react"; 

// 2. Wrap the fetch function with cache()
const getBlogData = cache(async (slug, lang) => { 
    // Remove the redundant 'cache: "no-store"' unless you explicitly
    // need to revalidate on every request (which would prevent caching/deduplication).
    // If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
    const res = await fetch(`${API_BASE_URL}/landing/home/blogs/${slug}`, {
        headers: { lang },
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
});

// Helper to determine language (keep this logic centralized)
function determineLang() {
    const cookieLang = cookies().get("lang")?.value;
    const acceptLang = headers().get("accept-language");
    return cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");
}


// Add canonical tag only if data exists
export async function generateMetadata({ params }) {
    const { slug } = params;
    const lang = determineLang(); // Call the helper
    
    // Call the cached function
    const data = await getBlogData(slug, lang); 

    if (!data) return {};

    return {
        alternates: {
            canonical: `https://www.mzarapp.com/${slug}`,
        },
    };
}

export default async function BlogSlugPage({ params }) {
    const { slug } = params;
    const lang = determineLang(); // Call the helper

    // Call the cached function again—it will reuse the result from generateMetadata
    const data = await getBlogData(slug, lang); 
    
    if (!data) notFound();

    return (
        <div className="blog">
            <SingleBlog data={data} lang={lang} />
            <Content />
        </div>
    );
}