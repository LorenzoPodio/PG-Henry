import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkout from "../MercadoPago/Checkout";
import { useCartContext } from "../../context/CartContext";
import style from "./Payment.module.css"

export default function Payment({ handleClick }) {
  const [data, setData] = useState(""); //Estado para setear la respuesta de mercado pago
  const { cartItems, user } = useCartContext();
   

  //   //  IMPLEMENTACION DE MP
  useEffect(() => {
    axios
      .post("/mercadopago", {email: user.email, cartItems: cartItems})
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.error(err));
      // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={style.payment}>
      <span className=" px-6  hidden content-end sm:block mb-10 mt-5">
            <button onClick={()=>handleClick("OrderReview")}
              type="button"
              className="inline-flex items-center px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
              Volver a revisar orden
            </button>
        </span>

        <span className=" px-6  hidden content-end sm:block mb-10 mt-5">
            <button onClick={()=>handleClick("PersonalDetails")}
              type="button"
              className="inline-flex items-center px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
              Modificar datos personales
            </button>
        </span>
          </div>

      {!data ? (
        <div className="flex justify-around">
             <div>
        <img
          src="https://images-ext-2.discordapp.net/external/S7R7Qin6kKgo0g7H0nWwPt_d14InMHmmfDpGpMnh27M/https/res.cloudinary.com/dkdioyppw/image/upload/v1647458886/trekking-adventure-himachal_vp0rka.gif"
          alt="loading"
        />
      </div>
        </div>
        ) : (
          <Checkout products={cartItems} data={data} />
          )}
      
    </div>
  );
}
