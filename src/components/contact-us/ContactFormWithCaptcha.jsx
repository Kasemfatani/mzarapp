"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ContactForm } from "./ContactForm";

export default function ContactFormWithCaptcha({ isAr, InquiryType }) {
	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
			scriptProps={{ async: true, defer: true }}
		>
			<ContactForm isAr={isAr} InquiryType={InquiryType} />
		</GoogleReCaptchaProvider>
	);
}
