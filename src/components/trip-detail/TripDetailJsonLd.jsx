import { buildTripDetailStructuredData, serializeTripDetailStructuredData } from "./tripDetailStructuredData";

export default function TripDetailJsonLd(props) {
	const structuredData = buildTripDetailStructuredData(props);

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: serializeTripDetailStructuredData(structuredData) }}
		/>
	);
}
