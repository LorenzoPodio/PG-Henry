import React from "react";
import "./Landing.css";
import fondo from "./pexels-lumn-167699.jpg";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="containerLanding h-full">
      <img
        className="fondoLanding h-screen w-full"
        alt="image not found"
        src={fondo}
      />
      <Link to="/excursiones">
        <button className="inline-block text-center bg-sky-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-sky-700 buttonlanding">
          Ver Excursiones
        </button>
      </Link>
    </div>
  );
};
