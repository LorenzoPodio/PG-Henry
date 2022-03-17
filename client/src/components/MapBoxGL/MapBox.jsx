import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, {NavigationControl , Marker, Popup } from "react-map-gl";
import Geocoder from 'react-map-gl-geocoder';
import geoJson from './coordinates.json';
import './Map.css';

const Mapa = () => {
  const [viewport, setViewport] = useState({
    latitude: -40.4211,
    longitude: -50.6903,
    width: "100vw",
    height: "80vh",
    zoom: 3.1,

  });
  const [selected, setSelected] = useState(null);
  // console.log('Soy selected: >>> ', selected);

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
        {geoJson.locations?.map(feature => (
          <Marker
            key={feature.properties.id}
            latitude={feature.geometry?.coordinates[0]}
            longitude={feature.geometry?.coordinates[1]}
            onClick={markerClicked}  feature={feature} 
          >
            <button
              className="marker"
              onClick={e => {
                e.preventDefault();
                setSelected(feature);
              }}
            ></button>
          </Marker>
        ))}

        {/* POP-UP INFO */}
        {selected ? (
          <Popup
            latitude={selected.geometry.coordinates[0]}
            longitude={selected.geometry.coordinates[1]}
            onClose={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.properties?.title}</h2>
              <p>{selected.properties?.description}</p>
            </div>
          </Popup>
        ) : null}
      
      {/*  NAVIGATION CONTROLS   */}
      <div className="navigation">
        <NavigationControl />
      </div>

      {/*  GET GEO-LOCATIONS  >> busca por nombre, hacer que lea el cursor las coordenadas para guardarlas y crear nuevos markers, no se como... */}
      <div className="geocoder">
        <Geocoder
            mapRef={mapRef}
            mapboxApiAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
            onSelected={handleResult}
            onViewportChange={newViewport => {
              setViewport({...newViewport});
            }}
            // countries="ar"
            position="top-right"
            placeholder="Buscar..."
          />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default Mapa;