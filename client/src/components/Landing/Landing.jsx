import React from "react";
import "./Landing.css";

import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div classNameName="container">
    
    <main>
  <div className="fixed-bg bg-1">
    
    
  </div>
  <div className="fixed-bg bg-1-1">
  <div className="align">
    <img
                        className="logo"
                        src="https://img.icons8.com/color/48/000000/around-the-globe.png"
                        alt="Workflow1"
                      />
      <h2>ExcursionApp</h2>
      </div>
    <div className="text-box">
      
      
      <img alt="Workflow2" src="https://www.flatrockmusicfestival.com/wp-content/uploads/2021/06/9ik.jpg"/>
      <p>
      <br></br>
      <br></br>
      </p>
      <p >
      
      </p>
      <br></br>
      <p >
        Donde tu aventura comienza...
     
       
      </p>
      <br></br>
    </div>
  </div>
  <div className="fixed-bg bg-2">
    <h1 className="text-white font-semi-bold">Las Mejores experiencias</h1>
  </div>
  <div className="fixed-bg bg-2-1">
    <div className="text-box">
    <p>
        Descubrí
      </p>
      <br></br>
     
      <img src="https://royalenfieldcordoba.com.ar/wp-content/uploads/2021/01/ruta-40-moto1.jpg" alt="Workflow3"/>
      <br></br>
      <p className="ml-60">
        Nuevos horizontes
      </p>
      
    </div>
  </div>
  <div className="fixed-bg bg-3">
    <h1 className="text-white">Disfrutá</h1>
  </div>
  <div className="fixed-bg bg-3-1">
    <div className="text-box">
      <p>
        Conectá
      </p>
      <br></br>
      <img alt="Workflow4" src="https://st3.depositphotos.com/2931363/12516/i/600/depositphotos_125161482-stock-photo-beautiful-couple-kayaking-on-river.jpg"/>
      
      <p className="ml-60">
        con vos mismo.
      </p>
    </div>
  </div>
  <div className="fixed-bg bg-4">
    
  </div>
  <div className="fixed-bg flex flex-row py-20 bg-gray-50">
    <h2 className="  w-full">Descubri la experiencia perfecta para vos</h2>
    <div className="w-full flex w-80 flex-row-reverse  ">
      <Link to="/excursiones">
    <button
          type="reset"
          className="
          inset-y-0 right-0 
      px-8
      py-6
      bg-blue-600
      text-white
      text-2xl
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          Ingresa al Sitio
        </button>
        </Link>
        </div>
    <br></br>
    <br></br>
    
    
    <br></br>
    <br></br>
  </div>
</main>
    </div>
  );
};
