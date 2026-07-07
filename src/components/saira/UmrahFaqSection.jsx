import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	style: ["normal", "italic"],
	display: "swap",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	display: "swap",
});

const whatsappLink =
	"https://wa.me/966580121025?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20MZAR%20Umrah%20Experiences.%20Promo%20code%3A%20SAIRA";

const faqs = [
  {
    question: "What is included in the package?",
    answer:
      "Each package includes a curated selection of guided experiences, transportation between destinations included in the itinerary, multilingual audio guidance, and access to MZAR's enrichment content. Package inclusions vary depending on the selected package.",
  },
  {
    question: "Does the package include hotel accommodation?",
    answer:
      "Some packages include accommodation, while others are experience-only packages. The package details page clearly indicates whether accommodation is included before booking.",
  },
  {
    question: "Are flights included?",
    answer:
      "No. Flights are not included unless specifically stated in the package description.",
  },
  {
    question: "What languages are available?",
    answer:
      "MZAR currently offers multilingual content and audio guidance in 7 languages, allowing guests to explore sites and stories in their preferred language.",
  },
  {
    question: "Can I book for one person only?",
    answer:
      "Our Umrah packages currently require a minimum of 2 guests per booking. If you are travelling alone, please contact our team and we will do our best to assist you with available options.",
  },
  {
    question: "Are the experiences suitable for families and elderly guests?",
    answer:
      "Yes. Many experiences are designed with comfort and accessibility in mind. Package details indicate the level of walking and physical activity required.",
  },
  {
    question: "Will I visit Al-Masjid Al-Haram and Al-Masjid Al-Nabawi?",
    answer:
      "Yes. Depending on the selected package, your journey may include guided experiences related to Al-Masjid Al-Haram, Al-Masjid Al-Nabawi, and other significant Islamic landmarks.",
  },
  {
    question: "Are transportation services included?",
    answer:
      "Yes. Transportation included in each package is clearly outlined in the package details.",
  },
  {
    question: "How do I receive my booking confirmation?",
    answer:
      "You will receive a confirmation immediately after your booking is completed, along with the relevant trip details and instructions.",
  },
  {
    question: "What happens if I need to cancel or change my booking?",
    answer:
      "Cancellation and modification policies vary depending on the package and booking conditions. Please refer to the booking terms or contact our support team for assistance.",
  },
];

export default function UmrahFaqSection() {
	return (
		<section
			className={`${dmSans.className} bg-[#FAF8F2] px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[820px]">
				<div className="mb-12 text-center">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						FREQUENTLY ASKED QUESTIONS
					</span>
					<h2
						className={`${cormorant.className} text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[48px]`}
					>
						Everything You Need to Know Before Your Journey
					</h2>
				</div>

				<div className="space-y-3">
					{faqs.map((item) => (
						<details
							key={item.question}
							className="group overflow-hidden rounded-[12px] border border-[#E6E1D7] bg-white"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-medium text-[#2E4A3E] marker:content-none">
								<span>{item.question}</span>
								<span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3EFE6] text-[#867957] transition-transform duration-300 group-open:rotate-45">
									+
								</span>
							</summary>
							<div className="border-t border-[#EDE9E0] px-5 py-4 text-[14px] leading-[1.7] text-[#6B665F]">
								{item.answer}
							</div>
						</details>
					))}
				</div>

				<div className="mt-10 rounded-[14px] border border-[#E6E1D7] bg-white px-6 py-7 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:px-8">
					<h3
						className={`${cormorant.className} text-[30px] leading-[1.12] text-[#2E4A3E]`}
					>
						Need Personal Assistance?
					</h3>
					<p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-[1.7] text-[#6B665F] sm:text-[15px]">
						Our Umrah specialists are ready to help you choose the right package
						and answer any questions about your journey.
					</p>
					<a
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-5 inline-flex items-center gap-2 rounded-[6px] bg-[#25D366] px-6 py-3 text-[14px] font-medium text-white shadow-[0_12px_30px_rgba(37,211,102,0.25)] transition hover:brightness-95"
					> 
          <i className="fa-brands fa-whatsapp"></i> {' '}
						Speak with an Umrah Advisor
					</a>
				</div>
			</div>
		</section>
	);
}
