import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import "./Map.css";

export const Mapa = ({ lat, long }) => {
  let latitud = lat ? lat : -30;
  let longitud = long ? long : -60;

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    width: "37vw",
    height: "40vh",
    zoom: 6,
  });

  // eslint-disable-next-line
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };
    setViewport({
      latitude: lat,
      longitude: long,
      width: "37vw",
      height: "40vh",
      zoom: 6,
    })
    window.addEventListener("keydown", listener);
    // CleanUp function >>> unmount comp
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [lat,long]);

  const markerClicked = (title) => {
    window.alert(title);
  };

  function handleCoordinates(e) {
    console.log(e.lngLat);
  }

  return (
    <div className="rounded-md">
      <ReactMapGL
        className="rounded-md"
        {...viewport}
        maxZoom={18}
        mapboxApiAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
        onClick={handleCoordinates}
      >
        {/*   MARKERS   */}
        <Marker
          key={"33"}
          latitude={latitud}
          longitude={longitud}
          onClick={markerClicked}
          feature={""}
        >
          <button
            className="marker"
            onClick={(e) => {
              e.preventDefault();
              setSelected("");
            }}
          ></button>
        </Marker>
      </ReactMapGL>
    </div>
  );
};
