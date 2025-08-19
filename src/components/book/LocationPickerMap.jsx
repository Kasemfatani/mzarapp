import { useEffect, useRef } from "react";

export default function LocationPickerMap({ lat, lng, setLat, setLng }) {
	const mapRef = useRef(null);
	const markerRef = useRef(null);
	const googleMapRef = useRef(null);

	// Load Google Maps script only once
	useEffect(() => {
		let scriptLoaded = !!window.google;
		if (!scriptLoaded) {
			const script = document.createElement("script");
			script.src =
				"https://maps.googleapis.com/maps/api/js?key=AIzaSyCuS6yzhdLKU-fiY7zfmGX1yDPrHDvfYIE&libraries=places";
			script.async = true;
			script.onload = () => {
				initMap();
			};
			document.body.appendChild(script);
		} else {
			initMap();
		}

		function initMap() {
			googleMapRef.current = new window.google.maps.Map(mapRef.current, {
				center: { lat, lng },
				zoom: 12,
			});

			markerRef.current = new window.google.maps.Marker({
				map: googleMapRef.current,
				position: { lat, lng },
				draggable: true,
			});

			window.google.maps.event.addListener(
				markerRef.current,
				"dragend",
				function () {
					const newLat = this.getPosition().lat();
					const newLng = this.getPosition().lng();
					setLat(newLat);
					setLng(newLng);
					
				}
			);
		}
		// eslint-disable-next-line
	}, []);

	// Update marker position and map center when lat/lng change
	useEffect(() => {
		if (markerRef.current) {
			const position = { lat, lng };
			markerRef.current.setPosition(position);
			if (googleMapRef.current) {
				googleMapRef.current.setCenter(position);
			}
		}
	}, [lat, lng]);

	return (
		<div
			className="mt-4"
			ref={mapRef}
			style={{ height: "250px", borderRadius: "16px", width: "100%" }}
		/>
	);
}
