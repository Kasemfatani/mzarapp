"use client";
import { useState } from "react";
import HotelHero from "./HotelHero";
import UserForm from "./UserForm";
import GiftSelectionStep from "./GiftSelectionStep";
import HeroSelection from "./HeroSelection";
import HeroWin from "./HeroWin";
import GiftInstructions from "./GiftInstructions";

export default function HotelWrapper({ lang = "ar", partner }) {
	const [step, setStep] = useState(1);

	// collected from step 1
	const [clientName, setClientName] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [mobile, setMobile] = useState("");
	const [coupons, setCoupons] = useState("");
	const [giftName, setGiftName] = useState("");
	const [giftDescription, setGiftDescription] = useState("");

	const goToStep2 = ({ name, cc, phone }) => {
		setClientName(name);
		setCountryCode(cc);
		setMobile(phone);
		setStep(2);
	};

	const handleSelectionSuccess = (coupons) => {
		// TODO: show step 3 (congrats + instructions)
		setCoupons(coupons);
		setStep(3);
		if (typeof window !== "undefined") {
            requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
      }
		
	};

	return (
		<>
			{step === 1 && (
				<>
					<HotelHero lang={lang} partner={partner} />
					<UserForm lang={lang} onNext={goToStep2} />
				</>
			)}

			{step === 2 && (
				<>
					<HeroSelection lang={lang} />
					<GiftSelectionStep
						lang={lang}
						partner={partner}
						client_name={clientName}
						country_code={countryCode}
						mobile={mobile}
						onSuccess={handleSelectionSuccess}
						onBack={() => setStep(1)}
						setGiftName={setGiftName}
						setGiftDescription={setGiftDescription}
					/>
				</>
			)}

			{step === 3 && (
				<>
					<HeroWin lang={lang} giftName={giftName} giftDescription={giftDescription} />
					<GiftInstructions lang={lang} code={coupons}  />
				</>
			)}
		</>
	);
}
