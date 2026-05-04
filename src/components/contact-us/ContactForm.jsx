"use client";

import { useState } from "react";
import { Send, Shield } from "lucide-react";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Image from "next/image";

export function ContactForm({ isAr, InquiryType }) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		inquiryType: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);

	// new: status message shown in the form (type: 'success' | 'error' | '')
	const [status, setStatus] = useState({ text: "", type: "" });
	const { executeRecaptcha } = useGoogleReCaptcha();

	const validate = () => {
		if (!formData.name.trim()) {
			setStatus({
				text: isAr
					? "الرجاء إدخال الاسم الكامل"
					: "Please enter your full name",
				type: "error",
			});
			return false;
		}
		if (!formData.email.trim()) {
			setStatus({
				text: isAr
					? "الرجاء إدخال البريد الإلكتروني"
					: "Please enter your email address",
				type: "error",
			});
			return false;
		}
		if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			setStatus({
				text: isAr
					? "الرجاء إدخال بريد إلكتروني صالح"
					: "Please enter a valid email",
				type: "error",
			});
			return false;
		}
		if (!formData.phone.trim()) {
			setStatus({
				text: isAr
					? "الرجاء إدخال رقم الجوال"
					: "Please enter your phone number",
				type: "error",
			});
			return false;
		}
		if (!formData.inquiryType) {
			setStatus({
				text: isAr
					? "الرجاء اختيار نوع الاستفسار"
					: "Please select an inquiry type",
				type: "error",
			});
			return false;
		}
		if (!formData.message.trim()) {
			setStatus({
				text: isAr ? "الرجاء كتابة الرسالة" : "Please write your message",
				type: "error",
			});
			return false;
		}
		// clear any previous error before submit
		setStatus({ text: "", type: "" });
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;

		if (!executeRecaptcha) {
			setStatus({
				text: isAr ? "خدمة الكابتشا غير متاحة حالياً" : "Captcha not available",
				type: "error",
			});
			return;
		}

		setLoading(true);
		try {
			const token = await executeRecaptcha("contact_form");
			if (!token) {
				setStatus({
					text: isAr ? "يرجى التحقق من الكابتشا" : "Please complete captcha",
					type: "error",
				});
				setLoading(false);
				return;
			}

			const res = await fetch("/api/contact-submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					inquiryType: formData.inquiryType,
					message: formData.message,
					lang: isAr ? "ar" : "en",
					captcha_token: token,
				}),
			});

			const json = await res.json();
			if (!res.ok || !json?.status) {
				setStatus({
					text: isAr
						? "فشل التحقق من الكابتشا أو الإرسال"
						: "Captcha verification or send failed",
					type: "error",
				});
				return;
			}

			setFormData({
				name: "",
				email: "",
				phone: "",
				inquiryType: "",
				message: "",
			});
			const successMsg =
				json?.message || (isAr ? "تم الإرسال بنجاح" : "Sent successfully");
			const ref = json?.data?.ref_no ? ` (${json.data.ref_no})` : "";
			let refText = isAr ? "المرجع" : "reference";
			setStatus({
				text: `${successMsg} ${ref ? `, ${refText} ${ref}` : ""}`,
				type: "success",
			});
		} catch (err) {
			setStatus({
				text: isAr ? "حدث خطأ في الاتصال" : "Network error",
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		// clear status on user change (helps remove old errors)
		if (status.type) setStatus({ text: "", type: "" });
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// console.log("InquiryType Data:", InquiryType);

	return (
		<section id="contact-us-form" className="bg-[#f5f2ed] py-20 md:py-28">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					{/* Right: Form */}
					<div className="order-2 lg:order-1">
						<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
							{isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
						</h2>
						<p className="mb-6 text-xl text-[#718096]">
							{isAr
								? "املأ النموذج وسنقوم بالرد عليك في أسرع وقت."
								: "Fill out the form, and we will respond as soon as possible"}
						</p>

						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Name */}
							<div>
								<label
									htmlFor="name"
									className="mb-2 block text-xl text-[#4a5568]"
								>
									{isAr ? "الاسم الكامل" : "Full Name"}
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
									placeholder={
										isAr ? "أدخل اسمك الكامل" : "Enter your full name"
									}
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-xl text-[#4a5568]"
								>
									{isAr ? "البريد الإلكتروني" : "Email Address"}
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
									placeholder="example@email.com"
								/>
							</div>

							{/* Phone */}
							<div>
								<label
									htmlFor="phone"
									className="mb-2 block text-xl text-[#4a5568]"
								>
									{isAr ? "رقم الجوال" : "Phone Number"}
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
									placeholder="+966 5XX XXX XXX"
								/>
							</div>

							{/* Inquiry Type */}
							<div>
								<label
									htmlFor="inquiryType"
									className="mb-2 block text-xl text-[#4a5568]"
								>
									{isAr ? "نوع الاستفسار" : "Inquiry Type"}
								</label>
								<select
									id="inquiryType"
									name="inquiryType"
									value={formData.inquiryType}
									onChange={handleChange}
									className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
								>
									<option value="">
										{isAr ? "اختر نوع الاستفسار" : "Select Inquiry Type"}
									</option>
									{Array.isArray(InquiryType) &&
										InquiryType.map((it) => (
											<option key={it.id} value={it.id}>
												{it.name}
											</option>
										))}
								</select>
							</div>

							{/* Message */}
							<div>
								<label
									htmlFor="message"
									className="mb-2 block text-xl text-[#4a5568]"
								>
									{isAr ? "الرسالة" : "Message"}
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									rows={6}
									className="w-full resize-none rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
									placeholder={
										isAr ? "اكتب رسالتك هنا..." : "Write your message here..."
									}
								/>
							</div>

							{/* Status message (replaces toast) */}
							{status.text && (
								<div
									className={`mb-6 rounded-lg px-4 py-3 text-sm ${
										status.type === "success"
											? "bg-green-50 text-green-800"
											: "bg-red-50 text-red-800"
									}`}
									role="status"
									aria-live="polite"
								>
									{status.text}
								</div>
							)}

							{/* Submit Button */}
							<button
								type="submit"
								disabled={loading}
								className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#0d5940] px-8 py-5 text-xl text-white transition-all duration-300 hover:bg-[#116149] hover:shadow-xl disabled:opacity-60"
							>
								<span>
									{isAr
										? "إرسال الرسالة"
										: loading
										? "Sending..."
										: "Send Message"}
								</span>
								<Send className="h-6 w-6 transition-transform group-hover:translate-x-1" />
							</button>

							{/* Privacy Note */}
							<div className="flex items-center justify-center gap-2 text-center">
								<Shield className="h-5 w-5 text-[#c9a961]" />
								<p className="text-lg text-[#718096]">
									{isAr
										? "جميع بياناتك محفوظة بسرية تامة"
										: "All your information is kept strictly confidential "}
								</p>
							</div>
						</form>
					</div>

					{/* Left: Illustration */}
					<div className="order-1 flex items-center justify-center lg:order-2">
						<div className="overflow-hidden rounded-3xl shadow-lg">
							<img
								src="/contact-us/contact-form.webp"
								alt={isAr ? "دعم العملاء" : "Customer Support"}
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
