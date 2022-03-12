import React from "react";

export default function PersonalDetails({ handleClick }) {
  return (
    <div>
      <h2>Detalles personales</h2>
      <div>
        Pequeño Cart con excursion su cantidad y precio, y el precio total +
        boton de volver al step 1
        <button onClick={() => handleClick("OrderReview")}>
          Modificar carrito
        </button>
      </div>
      <div>
        Inputs para introducir datos si es que no nos logeamos, sino deberian
        completarse automaticamente
      </div>
      <button onClick={()=>handleClick("Payment")}>Continuar</button>
    </div>
  );
}
