import React from "react";
import { Link } from "react-router-dom";
import style from "./OrderReview.module.css"

export default function OrderReview({ handleClick }) {
  // Debería traerme de mi estado carrito la información para poner el detalle.
  // Estado cart de cartContext.

  return (
    <div className={style.orderReviewContainer}>
      <div>
        <p>Nombre de excursión</p>
        <p>Precio unitario</p>
        <p>Cantidad</p>
      </div>
      <div>
        <p>Aca va el precio total</p>
        <Link to="/excursiones">
          <button>Reservar mas actividades</button>
        </Link>
        <button onClick={() => handleClick("PersonalDetails")}>
          Continuar
        </button>
      </div>
    </div>
  );
}
