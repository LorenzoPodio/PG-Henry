import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, {NavigationControl , Marker, Popup } from "react-map-gl";
import geoJson from './coordinates.json';
import './Map.css';

const Mapa = () => {
  const [viewport, setViewport] = useState({
    latitude: -40.4211,
    longitude: -50.6903,
    width: "100vw",
    height: "80vh",
    zoom: 3.1
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
      <div className="navigation">
        <NavigationControl />
      </div>
      </ReactMapGL>
    </div>
  );
};

export default Mapa;