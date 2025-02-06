'use client';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function MapSelector({ data, step, setStep, mainData, setMainData }) {
  const [language, setLanguage] = useState('en'); // Default language is 'en'
  const [lat, setLat] = useState(21.425893460537548); // Default to initial map center
  const [lng, setLng] = useState(39.82470840448206); // Default to initial map center

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    };

    window.initMap = () => {
      const map = new google.maps.Map(document.getElementById('gmaps-canvas'), {
        center: { lat, lng },
        zoom: 12,
      });

      const marker = new google.maps.Marker({
        map: map,
        position: { lat, lng },
        draggable: true,
      });

      // Update state when marker is dragged
      google.maps.event.addListener(marker, 'dragend', function () {
        const newLat = this.getPosition().lat();
        const newLng = this.getPosition().lng();
        setLat(newLat);
        setLng(newLng);
      });

      const input = document.getElementById('location-name');
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
        setLat(newLat);
        setLng(newLng);
      });
    };

    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCuS6yzhdLKU-fiY7zfmGX1yDPrHDvfYIE&libraries=places&callback=initMap'
    );
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('lang') || 'en';
      setLanguage(lang);
    }
  }, []);

  const handleNext = () => {
    const updatedData = { ...mainData, lat, lng };
    setMainData(updatedData);
    setStep(step + 1);
  };

  return (
    <div className="map-container">
      <input
        id="location-name"
        type="text"
        placeholder="Search for a location"
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <div
        id="gmaps-canvas"
        style={{ height: '500px', border: '1px solid #999', borderRadius: '8px' }}
      ></div>
      <Button className="submit" onClick={handleNext}>
        {language === 'ar' ? 'التالي' : 'Next'}
      </Button>
    </div>
  );
}
