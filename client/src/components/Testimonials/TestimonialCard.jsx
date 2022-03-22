import React from "react";

export const TestimonialCard = ({ description, rating, user, date }) => {
  return (
    <div>
      <div>
        <h1>
          {user.name} {user.lastName} compartió su experiencia:
        </h1>
        <h3>Date:{date}</h3>
      </div>
      <div>
        <h3>{description}</h3>
        <h4>Puntuación:{rating}</h4>
      </div>
    </div>
  );
};
