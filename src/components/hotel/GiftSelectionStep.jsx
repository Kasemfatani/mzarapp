"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import Loading from "@/app/loading";
import { set } from "date-fns";

export default function GiftSelectionStep({
	lang = "ar",
	partner,
	client_name,
	country_code,
	mobile,
	onSuccess,
	onBack,
	setGiftName,
	setGiftDescription,
	onExistPhone,
}) {
	const isAr = lang === "ar";
	const t = {
		submit: isAr ? "استخدم هديتك الآن" : "Use your gift now",
		back: isAr ? "رجوع" : "Back",
		pickOne: isAr ? "يرجى اختيار هدية واحدة" : "Please choose one gift",
		loadFailed: isAr ? "فشل في تحميل الهدايا" : "Failed to load gifts",
		loading: isAr ? "جاري التحميل..." : "Loading...",
	};

	const [items, setItems] = useState([]);
	const [itemsLoading, setItemsLoading] = useState(false);
	const [selected, setSelected] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;
		const fetchItems = async () => {
			setItemsLoading(true);
			setError("");
			try {
				const res = await fetch(`${API_BASE_URL_NEW}/landing/wheels/list`, {
					headers: { lang },
				});
				const json = await res.json();
				if (!cancelled) {
					if (res.ok && json?.status !== false && Array.isArray(json.data)) {
						setItems(json.data);
					} else {
						setError(json?.message || t.loadFailed);
					}
				}
			} catch (e) {
				console.error("Wheels list fetch error:", e);
				if (!cancelled) setError(t.loadFailed);
			} finally {
				if (!cancelled) setItemsLoading(false);
			}
		};

		fetchItems();
		return () => {
			cancelled = true;
		};
	}, []);

	const submitSelection = async () => {
		if (!selected) {
			setError(t.pickOne);
			return;
		}
		setError("");
		// onSuccess?.(); /// temporary bypass until API is ready
		setLoading(true);
		console.log("Submitting gift selection:", {
			selected,
			client_name,
			country_code,
			mobile,
			partner_id: partner?.id,
		});
		try {
			const res = await fetch(`${API_BASE_URL_NEW}/landing/wheels/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json", lang },
				body: JSON.stringify({
					mobile,
					country_code,
					client_name,
					wheel_id: selected,
					partner_id: partner?.id,
				}),
			});

			const json = await res.json();

			if (res.ok && json?.status !== false) {
				onSuccess?.(json.data?.coupon_code || "-");
				if (json.data?.coupon_code) {
					localStorage.setItem("partnerPromoCode", json.data.coupon_code);
					// Set expiry to 24 hours from now
					const expiry = Date.now() + 24 * 60 * 60 * 1000;
					localStorage.setItem("partnerPromoCodeExpiry", expiry.toString());
				}
			} else {
				setError(json?.message || (isAr ? "حدث خطأ" : "An error occurred"));
				if (json?.data?.number_exists) {
					onExistPhone?.(json?.message);
				}
			}
		} catch (e) {
			console.error("Gift submit error:", e);
			setError(isAr ? "حدث خطأ" : "An error occurred");
			// Soft success while API is WIP
			// onSuccess?.();
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className=" container mx-auto w-full relative z-10 bg-white p-3 rounded-2xl shadow-2xl py-6 -mt-[18px] md:-mt-[300px] mb-12 md:mb-16">
			<div className=" px-4 py-2 text-white">
				{items.length > 0 && (
					<div className={`mb-4`}>
						<h2 className="text-[#5B6474] text-lg mt-2">
							{isAr ? "اختر هدية واحدة" : "Pick one gift"}
						</h2>
					</div>
				)}

				{error && (
					<div className="mb-4 text-black bg-red-200 border border-red-500/40 rounded-lg px-4 py-2">
						{error}
					</div>
				)}

				{itemsLoading ? (
					// <div className="mb-4 text-black">{t.loading}</div>
					<Loading />
				) : items.length === 0 ? (
					<div className="mb-4 text-black text-center">{t.loadFailed}</div>
				) : (
					<div className="grid md:grid-cols-3 gap-6">
						{items.map((item) => (
							<label
								key={item.id}
								onClick={() => {
									setSelected(item.id);
									setGiftName(item.name);
									setGiftDescription(item.description);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setSelected(item.id);
										setGiftName(item.name);
										setGiftDescription(item.description);
									}
								}}
								tabIndex={0}
								role="radio"
								aria-checked={selected === item.id}
								className="bg-white shadow-2xl  rounded-2xl overflow-hidden border border-white/20 cursor-pointer hover:bg-white/15 transition select-none focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
							>
								<div className="h-auto w-full relative">
									<img
										src={item.image || "/hotel/Hero2.webp"}
										alt={item.name || ""}
										className="w-full h-full object-cover"
									/>
									{item.category && (
										<span className="absolute top-3 left-3 bg-white/80 text-xs px-2 py-1 rounded-md font-semibold text-black">
											{item.category}
										</span>
									)}
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
									<span className="font-semibold text-black">{item.name}</span>
								</div>
								<p className=" border-t text-black py-8 px-4">
									{item.description}
								</p>
							</label>
						))}
					</div>
				)}

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
