import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [color, setColor] = useState("#ff69b4");
  const pathCounterRef = useRef(0);

  const minLng = 73.8610736701197;
  const minLat = 18.467188963588196;
  const maxLng = 73.8714817120508;
  const maxLat = 18.47643436191937;

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXZpc2hrYXIzMiIsImEiOiJjbTBldnZodjEwcmp5MmxzMTk3NzNzN3BsIn0._c8Gq1mXBlJv_XxGBFd6Rg";

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [(minLng + maxLng) / 2, (minLat + maxLat) / 2],
      zoom: 14,
    });

    const drawInstance = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        line_string: true,
        trash: true,
      },
      styles: [
        {
          id: "gl-draw-line",
          type: "line",
          filter: ["all", ["==", "$type", "LineString"]],
          paint: {
            "line-color": "#007cbf",
            "line-width": 10,
          },
        },
      ],
    });

    mapInstance.addControl(drawInstance, "top-left");

    // Add bounding box layer
    mapInstance.on("load", () => {
      mapInstance.addSource("boundingBox", {
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

      mapInstance.addLayer({
        id: "boundingBoxFill",
        type: "fill",
        source: "boundingBox",
        layout: {},
        paint: {
          "fill-color": "#00ff00",
          "fill-opacity": 0.4,
        },
      });

      mapInstance.addLayer({
        id: "boundingBoxBorder",
        type: "line",
        source: "boundingBox",
        layout: {},
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
      });

      const roadTypes = [
        "motorway",
        "primary",
        "secondary",
        "tertiary",
        "street",
      ];

      roadTypes.forEach((roadType) => {
        mapInstance.addLayer({
          id: ` highlighted-roads-${roadType}`,
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
            ["==", "class", roadType],
          ],
          paint: {
            "line-color": "#000000",
            "line-width": 3,
          },
        });
      });

      // Add click event listener for the bounding box
      mapInstance.on("click", "boundingBoxFill", (e) => {
        const coordinates = e.lngLat;

        const popupContent = `
          <div style="font-family: Arial, sans-serif; width: 200px; padding: 10px;">
            <h3 style="margin: 0;">5th stage: <br> Asphalt layering</h3>
            <img src="img.jpg" alt="Asphalt layering" style="width: 100%; height: auto; margin: 10px 0;">
            <p style="font-size: 12px; color: gray; text-align: right;">5 Oct '24</p>
            <p style="margin: 5px 0;">Start date: 4 Sept '24</p>
            <p style="margin: 5px 0;">Days passed since start: <i>30 days</i></p>
            <p style="margin: 5px 0;">Stage 1 ✅ Stage 2 ✅</p>
            <p style="margin: 5px 0;">Stage 3 ✅ Stage 4 ✅</p>
            <div style="background-color: #e0e0e0; border-radius: 5px; overflow: hidden; margin-top: 10px;">
              <div style="width: 80%; height: 10px; background-color: #76c7c0;"></div>
            </div>
          </div>
        `;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(mapInstance);
      });
    });

    setMap(mapInstance);
    setDraw(drawInstance);

    return () => mapInstance.remove(); // Clean up on unmount
  }, [minLng, minLat, maxLng, maxLat]);

  const savePath = async () => {
    const data = draw.getAll();

    if (data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates;
      const apiKey = mapboxgl.accessToken;
      const url = `https://api.mapbox.com/matching/v5/mapbox/cycling/${coordinates
        .map((coord) => coord.join(","))
        .join(";")}?geometries=geojson&radiuses=${coordinates
        .map(() => "10")
        .join(";")}&steps=true&access_token=${apiKey}`;

      const response = await fetch(url);
      const result = await response.json();

      if (result.matchings && result.matchings.length > 0) {
        const snappedCoordinates = result.matchings[0].geometry.coordinates;
        const pathId = `road-layer-${pathCounterRef.current++}`;

        map.addSource(pathId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: snappedCoordinates,
            },
          },
        });

        map.addLayer({
          id: pathId,
          type: "line",
          source: pathId,
          layout: {},
          paint: {
            "line-color": color,
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, // Minimum zoom level where the line width is larger
              1, // Line width at zoom level 10
              8, // Maximum zoom level where the line width is smaller
              15, // Line width at zoom level 15
            ],
          },
        });

        const markerCoordinates =
          snappedCoordinates[Math.floor(snappedCoordinates.length / 2)];

        const popupContent = `
          <div style="font-family: Arial, sans-serif; width: 200px; padding: 10px;">
            <h3 style="margin: 0;">5th stage: <br> Asphalt layering</h3>
            <img src="img.jpg" alt="Asphalt layering" style="width: 100%; height: auto; margin: 10px 0;">
            <p style="font-size: 12px; color: gray; text-align: right;">5 Oct '24</p>
            <p style="margin: 5px 0;">Start date: 4 Sept '24</p>
            <p style="margin: 5px 0;">Days passed since start: <i>30 days</i></p>
            <p style="margin: 5px 0;">Stage 1 ✅ Stage 2 ✅</p>
            <p style="margin: 5px 0;">Stage 3 ✅ Stage 4 ✅</p>
            <div style="background-color: #e0e0e0; border-radius: 5px; overflow: hidden; margin-top: 10px;">
              <div style="width: 80%; height: 10px; background-color: #76c7c0;"></div>
            </div>
          </div>
        `;

        const el = document.createElement("div");
        el.className = "emoji-marker";
        el.textContent = "🚧";

        new mapboxgl.Marker(el)
          .setLngLat(markerCoordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
          .addTo(map);

        alert("Path snapped to road and saved with selected color!");
        draw.deleteAll();
      } else {
        alert("No roads found for the given path.");
      }
    } else {
      alert("Please draw a path.");
    }
  };

  useEffect(() => {
    if (map) {
      map.on("zoom", () => {
        const zoom = map.getZoom();
        const roadLayers = map
          .getStyle()
          .layers.filter((layer) => layer.id.startsWith("highlighted-roads-"));
        roadLayers.forEach((layer) => {
          map.setLayoutProperty(
            layer.id,
            "visibility",
            zoom < 14 ? "none" : "visible"
          );
        });
      });
    }
  }, [map]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <div
        className="controls"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "white",
          padding: 10,
          zIndex: 1,
        }}
      >
        <label htmlFor="color">Color:</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={savePath}>Save Path</button>
      </div>
    </div>
  );
};

export default MapComponent;
