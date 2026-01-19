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

	const goToStep2 = ({ name, cc, phone }) => {
		setClientName(name);
		setCountryCode(cc);
		setMobile(phone);
		setStep(2);
	};

	const handleSelectionSuccess = () => {
		// TODO: show step 3 (congrats + instructions)
		setStep(3);
		// alert(lang === "ar" ? "تم الاختيار بنجاح!" : "Selection submitted!");
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
					/>
				</>
			)}

			{step === 3 && (
				<>
					<HeroWin lang={lang} />
					<GiftInstructions lang={lang} />
				</>
			)}
		</>
	);
}
