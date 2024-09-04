import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXZpc2hrYXIzMiIsImEiOiJjbTBldnZodjEwcmp5MmxzMTk3NzNzN3BsIn0._c8Gq1mXBlJv_XxGBFd6Rg";

const HeapMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const minLng = 73.8610736701197;
  const minLat = 18.467188963588196;
  const maxLng = 73.8714817120508;
  const maxLat = 18.47643436191937;

  const [showPopup, setShowPopup] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
      zoom: 14,
    });

    map.current.on("load", () => {
      // Add a source for the rectangle
      map.current.addSource("boundingBox", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [minLng, minLat],
                [maxLng, minLat],
                [maxLng, maxLat],
                [minLng, maxLat],
                [minLng, minLat],
              ],
            ],
          },
        },
      });

      // Add a layer to highlight the rectangle
      map.current.addLayer({
        id: "boundingBoxLayer",
        type: "line",
        source: "boundingBox",
        layout: {},
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
      });

      // Add a layer to highlight roads within the bounding box
      map.current.addLayer({
        id: "highlighted-roads",
        type: "line",
        source: "composite",
        "source-layer": "road",
        filter: [
          "all",
          [
            "within",
            {
              type: "Polygon",
              coordinates: [
                [
                  [minLng, minLat],
                  [maxLng, minLat],
                  [maxLng, maxLat],
                  [minLng, maxLat],
                  [minLng, minLat],
                ],
              ],
            },
          ],
        ],
        paint: {
          "line-color": "#000000",
          "line-width": 3,
        },
      });

      // Add a click event listener to the map
      map.current.on("click", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["boundingBoxLayer"],
        });

        if (features.length > 0) {
          setPopupCoordinates(e.point);
          setShowPopup(true);
        }
      });
    });
  }, [minLng, minLat, maxLng, maxLat]);

  return (
    <div ref={mapContainer} className="w-full h-screen relative">
      {showPopup && popupCoordinates && (
        <div
          className="absolute z-10 p-4 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${popupCoordinates.x}px`,
            top: `${popupCoordinates.y}px`,
          }}
        >
          <h3 className="text-lg font-semibold mb-2">5th stage:</h3>
          <h4 className="text-sm text-gray-700 mb-2">Asphalt layering</h4>
          <p className="text-sm text-gray-600">
            <strong>Location:</strong> Selected Area
          </p>
          <img
            src="https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?cs=srgb&dl=pexels-sevenstormphotography-439416.jpg&fm=jpg"
            alt="Asphalt layering"
            className="w-full h-24 object-cover rounded-lg mb-2"
          />
          <p className="text-sm text-gray-600">Start date: 4 Sept '24</p>
          <p className="text-sm text-gray-600 mb-4">
            Days passed since start: 30 days
          </p>
          <div className="flex space-x-1 mb-2">
            <div className="text-xs text-green-600">Stage 1 ✅</div>
            <div className="text-xs text-green-600">Stage 2 ✅</div>
            <div className="text-xs text-green-600">Stage 3 ✅</div>
            <div className="text-xs text-green-600">Stage 4 ✅</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-teal-500 h-2.5 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeapMap;
