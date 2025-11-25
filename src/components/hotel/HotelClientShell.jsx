"use client";
import { useState } from "react";
import Hero from "./Hero";
import LazyBottomSections from "./LazyBottomSections";

export default function HotelClientShell({ lang, partner, children }) {
	const [forceLoadBottom, setForceLoadBottom] = useState(false);

	return (
		<>
			<Hero
				initialLang={lang}
				partner_id={partner.id}
				hotelLogoSrc={partner.logo}
				promo_code={partner.promo_code}
				onWhyClick={() => setForceLoadBottom(true)}
			/>
			{children}
			<LazyBottomSections
				lang={lang}
				hotelLogoSrc={partner.logo}
				forceLoad={forceLoadBottom}
			/>
		</>
	);
}
