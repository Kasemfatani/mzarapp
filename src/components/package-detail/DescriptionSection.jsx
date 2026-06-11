export default function DescriptionSection({ isAr, data, sticky = false , mockData }) {
	const { t } = mockData;

	const sectionClasses = sticky
		? "rounded-2xl bg-[#f8f5ef] p-6 md:p-8 lg:sticky lg:top-28"
		: "rounded-2xl bg-[#f8f5ef] p-6 md:p-8";

	return (
		<section id="sticky-description-test" className={sectionClasses}>
			<h2 className="mb-3 text-2xl font-semibold text-[#1b4332]">
				{t.descriptionTitle}
			</h2>
			<p className="leading-8 text-[#414844]">{data.description}</p>
		</section>
	);
}
