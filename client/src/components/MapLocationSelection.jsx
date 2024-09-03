import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXZpc2hrYXIzMiIsImEiOiJjbTBldnZodjEwcmp5MmxzMTk3NzNzN3BsIn0._c8Gq1mXBlJv_XxGBFd6Rg";

const MapboxMap = ({ onLocationSelect }) => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const zoom = 2;
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    markerRef.current = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(map);

    markerRef.current.on("dragend", () => {
      const { lng, lat } = markerRef.current.getLngLat();
      setLng(lng);
      setLat(lat);
    });

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setLng(lng);
      setLat(lat);
      markerRef.current.setLngLat([lng, lat]);
    });

    return () => map.remove();
  }, [lng, lat]);

  const handleSelectLocation = () => {
    onLocationSelect(lat, lng);
  };

  return (
    <div>
      <div
        className="map-container"
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      />
      <div className="coordinates">
        Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)}
      </div>
      <button
        onClick={handleSelectLocation}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Select Location
      </button>
    </div>
  );
};

export default MapboxMap;
