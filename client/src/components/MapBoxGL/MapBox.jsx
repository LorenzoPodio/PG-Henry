import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, {NavigationControl , Marker, Popup } from "react-map-gl";
import Geocoder from 'react-map-gl-geocoder';
import geoJson from './coordinates.json';
import './Map.css';

export const Mapa = ({lat, long}) => {
console.log(lat)
console.log(long)

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    width: "100vw",
    height: "80vh",
    zoom: 3.1,

  });
  const [selected, setSelected] = useState(null);

  console.log(viewport)
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


  const mapRef = useRef()


  function handleResult(result) {
    setViewport({
     name:result.place_name,
     latitude:result.latitude,
     longitude:result.longitude,
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
            latitude={lat}
            longitude={long}
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