import React from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";

export const Prices = () => {
  const { allExcursions } = useExcursionsContext();

  
  return (
    <div>
      {allExcursions &&
        allExcursions.map((e) => {
          return (
              <div key={e.id}>
                <h1>Tarifa de todas las excursiones</h1>
              <p>{e.name} </p>
              <p>{e.location}</p>
              <p>{e.excursionType}</p>
              <p>$ {e.price}</p>

              <br />
              <br />
            </div>
          );
        })}
    </div>
  );
};
