import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line
import ReactMapGL, {NavigationControl , Marker, Popup } from "react-map-gl";
// eslint-disable-next-line
import Geocoder from 'react-map-gl-geocoder';
// eslint-disable-next-line
import geoJson from './coordinates.json';
import './Map.css';

export const Mapa = ({lat, long}) => {
let latitud = lat? lat : -30
let longitud = long? long : -60

  const [viewport, setViewport] = useState({
    latitude: latitud,
    longitude: longitud,
    width: "40vw",
    height: "40vh",
    zoom: 3.1,
  });

  // eslint-disable-next-line
  const [selected, setSelected] = useState(null);
  const mapRef = useRef()

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", listener);
    // CleanUp function >>> unmount comp
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const markerClicked = (title) => {
    window.alert(title);
  };

// eslint-disable-next-line
  function handleResult(result) {
    setViewport({
     name:result?.place_name,
     latitude:result?.latitude,
     longitude:result?.longitude,
    });
  };

  function handleCoordinates(e) {
    console.log(e.lngLat);
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        maxZoom={18}
        mapboxApiAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={newViewport => {
          setViewport({...newViewport});
        }}
        ref={mapRef}
        onClick={handleCoordinates}
      >
        {/*   MARKERS   */}
          <Marker
            key={"33"}
            latitude={latitud}
            longitude={longitud}
            onClick={markerClicked}  feature={""} 
          >
            <button
              className="marker"
              onClick={e => {
                e.preventDefault();
                setSelected("");
              }}
            ></button>
          </Marker>
      </ReactMapGL>
    </div>
  );
};