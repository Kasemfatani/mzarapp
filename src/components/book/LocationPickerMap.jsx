import { useEffect, useRef, useState } from "react";

export default function LocationPickerMap({ lat, lng, setLat, setLng }) {
	const mapRef = useRef(null);
	const markerRef = useRef(null);
	const googleMapRef = useRef(null);
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const lang = localStorage.getItem("lang") || "en";
			setLanguage(lang);
		}
	}, []);

	// Load Google Maps script only once
	useEffect(() => {
		// Only initialize map if ref is attached
		if (!mapRef.current) return;

		let scriptLoaded = !!window.google;
		if (!scriptLoaded) {
			const script = document.createElement("script");
			script.src =
				"https://maps.googleapis.com/maps/api/js?key=AIzaSyCuS6yzhdLKU-fiY7zfmGX1yDPrHDvfYIE&libraries=places";
			script.async = true;
			script.onload = () => {
				if (mapRef.current) initMap();
			};
			document.body.appendChild(script);
		} else {
			initMap();
		}

		function initMap() {
			if (!mapRef.current) return; // Ensure ref is attached
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

			// Add autocomplete input
			const input = document.getElementById("location-name");
			if (input) {
				const autocomplete = new window.google.maps.places.Autocomplete(input);
				autocomplete.addListener("place_changed", function () {
					const place = autocomplete.getPlace();
					if (!place.geometry) return;
					const newLat = place.geometry.location.lat();
					const newLng = place.geometry.location.lng();
					googleMapRef.current.setCenter(place.geometry.location);
					markerRef.current.setPosition(place.geometry.location);
					setLat(newLat);
					setLng(newLng);
				});
			}
		}
		// eslint-disable-next-line
	}, [mapRef.current]);

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

	const handleMyLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLat(position.coords.latitude);
					setLng(position.coords.longitude);
				},
				() => {
					alert(
						language === "ar"
							? "تعذر الحصول على موقعك"
							: "Unable to get your location"
					);
				}
			);
		} else {
			alert(
				language === "ar"
					? "المتصفح لا يدعم تحديد الموقع"
					: "Geolocation is not supported by your browser"
			);
		}
	};

	return (
		<div className="mt-2 relative">
			<input
				id="location-name"
				type="text"
				placeholder={
					language === "ar" ? "ابحث عن موقع" : "Search for a location"
				}
				style={{
					width: "100%",
					padding: "10px",
					marginBottom: "10px",
				}}
			/>
			<div
				ref={mapRef}
				className=""
				style={{
					height: "200px",
					borderRadius: "16px",
					width: "100%",
				}}
			/>
			<button
				type="button"
				onClick={handleMyLocation}
				className="absolute bottom-8 left-4 bg-white border border-gray-300 rounded-full shadow-lg p-2 flex items-center justify-center hover:bg-blue-100 transition"
				title={language === "ar" ? "اظهر موقعي الحالي" : "Show my location"}
			>
				<svg
					width="24"
					height="24"
					fill="none"
					stroke="#2196f3"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="3" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
				</svg>
			</button>
		</div>
	);
}
