import UmrahHero from "@/components/umrah/UmrahHero";

export function generateMetadata() {
	return {
		title: "Umrah | Mzar",
		description:
			"Plan your Umrah trip with Mzar. Find the best packages, hotels, and services for a seamless pilgrimage experience.",
	};
}

export default async function UmrahPage() {
	return (
		<div className="bg-[#FAF8F2]">
			<UmrahHero />

			<section
				id="plan-journey"
				className="mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8"
			>
				<h2 className="text-2xl font-semibold text-[#2E4A3E] sm:text-4xl">
					Plan Journey Section
				</h2>
				<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6B665F] sm:text-base">
					Next sections will be added here component by component. This anchor
					is used by the hero button for smooth scrolling.
				</p>
			</section>
		</div>
	);
}
