import React from "react";

export const TestimonialCard = ({ props }) => {
  return (
    <div className="bg-white border-2 rounded-md h-11/12 w-11/12 flex flex-col">
      <div className="block">
        <h1 className="float-left">
          {props.user.name} {props.user.lastName} compartió su experiencia:
        </h1>
        <h3 className="float-right ">Fecha: {props.date}</h3>
      </div>
      <div className="block">
        <h3 className="float-left">{props.description}</h3>
        <h4 className="float-right">Puntuación: {props.rating}</h4>
      </div>
    </div>
  );
};
