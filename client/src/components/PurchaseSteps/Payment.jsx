import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkout from "../MercadoPago/Checkout";
import { useCartContext } from "../../context/CartContext";

export default function Payment({ handleClick }) {
  const [data, setData] = useState(""); //Estado para setear la respuesta de mercado pago
  const { cartItems, user } = useCartContext();
   

  //   //  IMPLEMENTACION DE MP
  useEffect(() => {
    axios
      .post("http://localhost:3001/mercadopago", {email: user.email, cartItems: cartItems})
      .then((data) => {
        setData(data.data);
        console.info("Contenido de data:", data);
      })
      .catch((err) => console.error(err));
  }, []);
  //Products ---> Serian los productos que estan en la tabla Order relacionadas al usuario.
  // const products = [
  //   { title: "Producto 1", quantity: 5, price: 10.52 },
  //   { title: "Producto 2", quantity: 15, price: 100.52 },
  //   { title: "Producto 3", quantity: 6, price: 200 },
  // ];
  //   ////////////////////

  return (
    <div>
      <div>
      <span className=" px-6  hidden content-end sm:block mb-10 mt-5">
            <button onClick={()=>handleClick("OrderReview")}
              type="button"
              className="inline-flex items-center px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Volver 
            </button>
        </span>
        Pequeño Cart con excursion su cantidad y precio, y el precio total +
        boton de volver al step 1
        <button onClick={() => handleClick("PersonalDetails")} type="button">
          Modificar datos personales
        </button >
      </div>
      Checkout para pagar, aca va mercado pago!
      {!data ? (
        <p>Aguarde un momento....</p>
      ) : (
        <Checkout products={cartItems} data={data} />
      )}
    </div>
  );
}
