"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const errorMessages = {
	failed: {
		en: {
			title: "Payment Failed",
			message:
				"Your payment could not be processed. Please try again or use a different payment method.",
		},
		ar: {
			title: "فشل الدفع",
			message:
				"تعذر معالجة دفعتك. يرجى المحاولة مرة أخرى أو استخدام طريقة دفع مختلفة.",
		},
	},
	expired: {
		en: {
			title: "Session Expired",
			message:
				"Your booking session has expired. Please start your booking again.",
		},
		ar: {
			title: "انتهت الجلسة",
			message: "انتهت صلاحية جلسة الحجز الخاصة بك. يرجى بدء الحجز من جديد.",
		},
	},
	"processing-issue": {
		en: {
			title: "Processing Issue",
			message: (ref) =>
				`Your payment was received, but we could not complete your booking due to a technical issue. Please save or screenshot your reference number below and contact customer service. Reference: ${ref}`,
		},
		ar: {
			title: "مشكلة في المعالجة",
			message: (ref) =>
				`تم استلام دفعتك، ولكن لم نتمكن من إكمال الحجز بسبب مشكلة تقنية. يرجى حفظ أو تصوير رقم المرجع أدناه والتواصل مع خدمة العملاء. رقم المرجع: ${ref}`,
		},
	},
};

export default function PaymentErrorPage() {
	const [language, setLanguage] = useState(null);
	const [status, setStatus] = useState(null);
	const [ref, setRef] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
			const params = new URLSearchParams(window.location.search);
			setStatus(params.get("status"));
			setRef(params.get("ref") || "");
		}
	}, []);

	// Wait until language is loaded on client to avoid hydration mismatch
	if (!language) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-gray-500 text-lg">Loading...</div>
			</div>
		);
	}

	let error;
	if (status === "processing-issue" && errorMessages[status]?.[language]) {
		error = {
			title: errorMessages[status][language].title,
			message: errorMessages[status][language].message(ref),
		};
	} else if (status && errorMessages[status]?.[language]) {
		error = errorMessages[status][language];
	} else {
		error =
			language === "ar"
				? {
						title: "خطأ غير معروف",
						message:
							"حدث خطأ غير معروف. يرجى التواصل مع الدعم أو المحاولة مرة أخرى.",
				  }
				: {
						title: "Unknown Error",
						message:
							"An unknown error occurred. Please contact support or try again.",
				  };
	}

	return (
		<div
			className="my-24 flex flex-col items-center justify-center bg-gray-50 px-4"
			dir={language === "ar" ? "rtl" : "ltr"}
		>
			<div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
				<h1 className="text-2xl font-bold text-red-600 mb-4">{error.title}</h1>
				<p className="text-gray-700 mb-6 whitespace-pre-line">
					{error.message}
				</p>
				{status === "processing-issue" && ref && (
					<div className="mb-4">
						<span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
							{ref}
						</span>
					</div>
				)}
				<a
					href="/"
					className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					{language === "ar" ? "العودة للرئيسية" : "Back to Home"}
				</a>
			</div>
		</div>
	);
}
