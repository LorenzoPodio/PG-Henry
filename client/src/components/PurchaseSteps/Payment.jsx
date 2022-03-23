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
      .post("http://localhost:3001/mercadopago", { email: user.email, cartItems: cartItems })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='pb-4' style={{ backgroundColor: '#EEEEEE' }}>
      <div className="flex justify-center text-center mx-auto py-5" style={{ backgroundColor: '#D8D2CB' }}>
          <div className="w-72">
            <h1 className="grid rounded-md shadow-lg shadow-gray-500 px-3 py-3 text-white bg-sky-600 font-bold text-xl">
              METODOS DE PAGO
            </h1>
          </div>
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
      <div className="text-center pb-2 pt-6">
        <div className="flex justify-around">
          <button onClick={() => handleClick("OrderReview")} type="button"
            className="px-7 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Volver a revisar orden
          </button>
          <button onClick={() => handleClick("PersonalDetails")} type="button"
            className="px-4 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Modificar datos personales
          </button>
        </div>
      </div>
    </div>


  );
}
