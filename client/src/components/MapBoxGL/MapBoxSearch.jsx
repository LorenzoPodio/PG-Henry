import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import './Map.css';

export default function MapaSearch(props){
    
  const [viewport, setViewport] = useState({
    latitude: -34.594777103140565,
    longitude: -58.449974583869974,
    width: "40vw",
    height: "40vh",
    zoom: 3.1,

  });
  const [selected, setSelected] = useState({
        latitude: 0,
        longitude: 0
    })
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


  useEffect(() => {
    setSelected({
        latitude: selected.longitude,
        longitude: selected.latitude,
    })
    // eslint-disable-next-line
  }, []);

  const mapRef = useRef()

  function handleCoordinates(e) {
     console.log(e.lngLat)
    setSelected({
        latitude: e.lngLat[1] -0.0005,
        longitude: e.lngLat[0]
    })
    props.changeCoordenadas ({
      lat: selected.latitude,
      long: selected.longitude
      })
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
            key={"marker"}
            latitude={selected.latitude}
            longitude={selected.longitude}
            onClick={""}
          >
            <button disabled className="marker">

            </button>
          </Marker>
          
      {/*  GET GEO-LOCATIONS  >> busca por nombre, hacer que lea el cursor las coordenadas para guardarlas y crear nuevos markers, no se como... */}
      
      </ReactMapGL>
      
    </div>
  );
};
