import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function LocationPickerMap({ lat, lng, setLat, setLng }) {
	const mapRef = useRef(null);
	const markerRef = useRef(null);
	const googleMapRef = useRef(null);

	// read language synchronously so Loader gets correct language on first creation
	const initialLang =
		typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";
	const [language, setLanguage] = useState(initialLang);

	// single Loader instance
	const loaderRef = useRef(null);

	// Load Google Maps script only once
	useEffect(() => {
		if (!mapRef.current) return;
		let mounted = true;

		if (!loaderRef.current) {
			loaderRef.current = new Loader({
				apiKey: "AIzaSyCuS6yzhdLKU-fiY7zfmGX1yDPrHDvfYIE",
				libraries: ["places"],
				language: language === "ar" ? "ar" : "en",
			});
		}

		loaderRef.current.load().then(() => {
			if (!mounted || !mapRef.current) return;

			const map = new window.google.maps.Map(mapRef.current, {
				center: { lat, lng },
				zoom: 12,
			});
			googleMapRef.current = map;

			const marker = new window.google.maps.Marker({
				map,
				position: { lat, lng },
				draggable: true,
			});
			markerRef.current = marker;

			marker.addListener("dragend", () => {
				const pos = marker.getPosition();
				if (!pos) return;
				setLat(pos.lat());
				setLng(pos.lng());
			});

			const input = document.getElementById("location-name");
			if (input) {
				const autocomplete = new window.google.maps.places.Autocomplete(input);
				autocomplete.addListener("place_changed", () => {
					const place = autocomplete.getPlace();
					if (!place.geometry) return;
					const newLat = place.geometry.location.lat();
					const newLng = place.geometry.location.lng();
					map.setCenter(place.geometry.location);
					marker.setPosition(place.geometry.location);
					setLat(newLat);
					setLng(newLng);
				});
			}
		});

		return () => {
			mounted = false;
			try {
				markerRef.current?.setMap(null);
			} catch (e) {}
		};
		// do NOT include `language` here to avoid recreating Loader with different options
	}, [mapRef]);

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
