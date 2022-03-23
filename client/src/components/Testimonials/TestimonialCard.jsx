import React from "react";

export const TestimonialCard = ({ props }) => {

  return (
    <div>
      <div>
        <h1>
          {props.user.name} {props.user.lastName} compartió su experiencia:
        </h1>
        <h3>Fecha: {props.date}</h3>
      </div>
      <div>
        <h3>{props.description}</h3>
        <h4>Puntuación: {props.rating}</h4>
      </div>
    </div>
  );
};
