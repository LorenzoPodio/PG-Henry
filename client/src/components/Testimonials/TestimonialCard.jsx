import React from "react";

export const TestimonialCard = ({ props }) => {
  return (
    <div className="bg-white border-2 my-4 overflow-y-auto rounded-md h-11/12 w-11/12 block p-4 max-h-72">
      <div className="block">
        <h3 className="float-right text-sm">Fecha: {props.date}</h3>
        <h1 className="mb-2 float-left text-base font-medium underline decoration-solid decoration-black">
          {props.user.name} {props.user.lastName} compartió su experiencia:
        </h1>
      </div>
      <div className="block">
        <h3 className="float-left text-sm">{props.description}</h3>
        <h4 className="float-right font-medium">Puntuación: {props.rating}</h4>
      </div>
    </div>
  );
};
