"use client";
import { useState } from "react";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export default function GiftSelectionStep({
	lang = "ar",
	partner,
	client_name,
	country_code,
	mobile,
	onSuccess,
	onBack,
}) {
	const isAr = lang === "ar";
	const t = {
		submit: isAr ? "استخدم هديتك الآن" : "Use your gift now",
		back: isAr ? "رجوع" : "Back",
		pickOne: isAr ? "يرجى اختيار هدية واحدة" : "Please choose one gift",
	};

	// Placeholder items (IDs will be used for API)
	const items = [
		{
			id: 101,
			title: isAr ? "خصم على الجولات" : "Discount on tours",
			img: "/hotel/Hero2.webp",
			desc: isAr
				? "احصل على خصم 20% على جميع الجولات السياحية."
				: "Get a 20% discount on all tours.",
		},
		{
			id: 102,
			title: isAr ? "خصم على الرحلات" : "Discount on trips",
			img: "/hotel/Hero2.webp",
			desc: isAr
				? "استمتع بخصم 15% على جميع الرحلات."
				: "Enjoy a 15% discount on all trips.",
		},
		{
			id: 103,
			title: isAr ? "رحله مجانية بالباص السياحية" : "Free tour bus ride",
			img: "/hotel/Hero2.webp",
			desc: isAr
				? "احصل على رحلة مجانية إلى المعالم السياحية المحلية."
				: "Get a free ride to local attractions.",
		},
	];

	const [selected, setSelected] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const submitSelection = async () => {
		if (!selected) {
			setError(t.pickOne);
			return;
		}
		setError("");
		onSuccess?.(); /// temporary bypass until API is ready
		setLoading(true);
		console.log("Submitting gift selection:", {
			selected,
			client_name,
			country_code,
			mobile,
			partner_id: partner?.id,
		});
		try {
			// API similar to wheels/register, but with item_id (not wheel_id)
			const res = await fetch(`${API_BASE_URL_NEW}/landing/wheels/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json", lang },
				body: JSON.stringify({
					mobile,
					country_code,
					client_name,
					item_id: selected, // <— using item_id as requested
					partner_id: partner?.id,
				}),
			});

			const json = await res.json().catch(() => ({}));

			// If API not ready, treat non-200 as soft success for now
			if ((res.ok && json?.status !== false) || (!res.ok && !json?.status)) {
				onSuccess?.();
			} else {
				setError(json?.message || (isAr ? "حدث خطأ" : "An error occurred"));
			}
		} catch (e) {
			console.error("Gift submit error:", e);
			// Soft success while API is WIP
			onSuccess?.();
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className=" container mx-auto w-full relative z-10 bg-white p-3 rounded-2xl shadow-2xl py-6 -mt-[18px] md:-mt-[300px] mb-12 md:mb-16">
			<div className=" px-4 py-2 text-white">
				<div className={`mb-4`}>
					<h2 className="text-[#5B6474] text-lg mt-2">
						{isAr ? "اختر هدية واحدة" : "Pick one gift"}
					</h2>
				</div>

				{error && (
					<div className="mb-4 text-black bg-red-200 border border-red-500/40 rounded-lg px-4 py-2">
						{error}
					</div>
				)}

				<div className="grid md:grid-cols-3 gap-6">
					{items.map((item) => (
						<label
							key={item.id}
							// clicking anywhere selects the item; keyboard accessible via Enter/Space
							onClick={() => setSelected(item.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									setSelected(item.id);
								}
							}}
							tabIndex={0}
							role="radio"
							aria-checked={selected === item.id}
							className="bg-white shadow-2xl  rounded-2xl overflow-hidden border border-white/20 cursor-pointer hover:bg-white/15 transition select-none focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
						>
							<div className="h-40 w-full">
								<img
									src={item.img}
									alt={item.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="py-8 px-4 flex items-center gap-4">
								<input
									type="radio"
									name="gift"
									checked={selected === item.id}
									onChange={() => setSelected(item.id)}
									className="w-5 h-5 accent-[var(--main-color)]"
									aria-hidden="true"
								/>
								<span className="font-semibold text-black">{item.title}</span>
							</div>
							<p className=" border-t text-black py-8 px-4">{item.desc}</p>
						</label>
					))}
				</div>

				<div className=" mt-8">
					<button
						type="button"
						onClick={submitSelection}
						disabled={loading}
						className={`px-8 py-3 rounded-full font-semibold text-white transition w-full
              ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[var(--main-color)] hover:bg-[var(--sec-color)] hover:text-black"}`}
					>
						{loading ? (isAr ? "جاري الإرسال..." : "Submitting...") : t.submit}
					</button>
				</div>
			</div>
		</section>
	);
}
