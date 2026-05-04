import { Share2, Link2, Bookmark, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ShareSave({ isAr }) {
	const [saved, setSaved] = useState(false);
	const [copied, setCopied] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef();

	useEffect(() => {
		const onClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpen(false);
			}
		};
		window.addEventListener("click", onClickOutside);
		return () => window.removeEventListener("click", onClickOutside);
	}, []);

	const currentUrl = typeof window !== "undefined" ? window.location.href : "";
	const shareText = isAr
		? "اقرأ هذا المقال الرائع من مزار"
		: "Read this amazing article from Mzar";

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(currentUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
		setMenuOpen(false);
	};

	const handleSave = () => {
		setSaved(!saved);
	};

	const handleWhatsAppShare = () => {
		const url = encodeURIComponent(currentUrl);
		const text = encodeURIComponent(shareText);
		window.open(
			`https://wa.me/?text=${text}%20${url}`,
			"_blank",
			"noopener,noreferrer"
		);
		setMenuOpen(false);
	};

	const handleShareWebAPI = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: document.title,
					text: shareText,
					url: currentUrl,
				});
			} catch {
				// ignore
			}
		} else {
			setMenuOpen(true);
		}
	};

	const openShareWindow = (platform) => {
		const url = encodeURIComponent(currentUrl);
		const text = encodeURIComponent(shareText);
		let shareUrl = "";

		switch (platform) {
			case "facebook":
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
				break;
			case "twitter":
				shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
				break;
			case "linkedin":
				shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
				break;
			case "telegram":
				shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
				break;
			case "email":
				shareUrl = `mailto:?subject=${text}&body=${url}`;
				break;
			default:
				return;
		}

		window.open(shareUrl, "_blank", "noopener,noreferrer");
		setMenuOpen(false);
	};

	return (
		<section className="bg-[#f5f2ed] py-12 md:py-16">
			<div className="container mx-auto max-w-3xl px-6 lg:px-8">
				<div className="rounded-3xl bg-white p-8 shadow-md">
					<div className="mb-6 text-center">
						<h3 className="text-2xl text-[#3C6652]">
							{isAr ? "شارك المقال أو احفظه" : "Share or Save the Article"}
						</h3>
					</div>

					<div className="flex flex-wrap justify-center gap-4 relative">
						{/* Main Share Button (uses Web Share API when available) */}
						<div ref={menuRef} className="relative inline-block">
							<button
								onClick={() => {
									if (navigator.share) {
										handleShareWebAPI();
									} else {
										setMenuOpen((s) => !s);
									}
								}}
								aria-haspopup="true"
								aria-expanded={menuOpen}
								className="group flex items-center gap-3 rounded-full bg-[#e8f2ed] px-6 py-3 transition-all hover:bg-[#3C6652] hover:text-white hover:shadow-lg"
							>
								<Share2 className="h-5 w-5" strokeWidth={2.5} />
								<span className="text-lg">{isAr ? "مشاركة" : "Share"}</span>
							</button>

							{/* Fallback share menu */}
							{menuOpen && (
								<div className="absolute left-0 top-full mt-3 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 z-50">
									<div className="p-2">
										<button
											onClick={() => openShareWindow("facebook")}
											className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50"
										>
											{isAr ? "مشاركة على فيسبوك" : "Share on Facebook"}
										</button>
										<button
											onClick={() => openShareWindow("twitter")}
											className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50"
										>
											{isAr ? "مشاركة على تويتر" : "Share on X"}
										</button>
										<button
											onClick={() => openShareWindow("linkedin")}
											className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50"
										>
											{isAr ? "مشاركة على لينكدإن" : "Share on LinkedIn"}
										</button>
										<button
											onClick={() => openShareWindow("telegram")}
											className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50"
										>
											{isAr ? "مشاركة على تيليجرام" : "Share on Telegram"}
										</button>
										<button
											onClick={() => openShareWindow("email")}
											className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50"
										>
											{isAr ? "مشاركة عبر البريد" : "Share via Email"}
										</button>
										<div className="my-1 border-t"></div>
										<button
											onClick={handleCopyLink}
											className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
										>
											<Link2 className="h-4 w-4" />
											<span>
												{copied
													? isAr
														? "تم النسخ!"
														: "Copied!"
													: isAr
													? "نسخ الرابط"
													: "Copy Link"}
											</span>
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Copy Link Button (quick) */}
						<button
							onClick={handleCopyLink}
							className="group flex items-center gap-3 rounded-full bg-[#e8f2ed] px-6 py-3 transition-all hover:bg-[#3C6652] hover:text-white hover:shadow-lg"
						>
							<Link2 className="h-5 w-5" strokeWidth={2.5} />
							<span className="text-lg">
								{copied
									? isAr
										? "تم النسخ!"
										: "Copied!"
									: isAr
									? "نسخ الرابط"
									: "Copy Link"}
							</span>
						</button>

						{/* Save Button */}
						{/* <button
              onClick={handleSave}
              className={`group flex items-center gap-3 rounded-full px-6 py-3 transition-all hover:shadow-lg ${
                saved
                  ? 'bg-[#3C6652] text-white'
                  : 'bg-[#e8f2ed] text-[#3C6652] hover:bg-[#3C6652] hover:text-white'
              }`}
            >
              <Bookmark
                className="h-5 w-5"
                strokeWidth={2.5}
                fill={saved ? 'currentColor' : 'none'}
              />
              <span className="text-lg">
                  {saved ? (isAr ? 'تم الحفظ' : 'Saved') : (isAr ? 'حفظ للقراءة لاحقاً' : 'Save for Later')}
              </span>
            </button> */}

						{/* WhatsApp Button */}
						<button
							onClick={handleWhatsAppShare}
							className="group flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-white transition-all hover:bg-[#1da851] hover:shadow-lg"
						>
							<MessageCircle className="h-5 w-5" strokeWidth={2.5} />
							<span className="text-lg">{isAr ? "واتساب" : "WhatsApp"}</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
