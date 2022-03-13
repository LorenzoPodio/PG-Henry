import React, { useContext, useEffect, useState } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { useParams } from "react-router-dom";
import InputSelect from "../InputSelect/InputSelect";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { CartContext } from "../../context/CartContext";

export const ExcursionDetail = () => {
  const { id } = useParams();
  const { excursionByid, getExcursionById } = useExcursionsContext();
  const { addItemToCart, cartItems } = useContext(CartContext);
  useEffect(() => {
    getExcursionById(id);
  }, []);
  let a = { ...excursionByid };
  // const {Images, createdInDb, date, description, excursionType, extra, location, name, price, time} = excursionByid;
  const [vars, setVars] = useState({
    date: [],
    time: [],
  });

  return (
    <div className="md:flex items-start justify-center py-2 px-2">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img
          className="w-11/12"
          alt="img excursion"
          src={excursionByid?.Images[0]}
        />
        <img
          className="mt-2 w-11/12"
          alt="img excursion"
          src={excursionByid?.Images[1]}
        />
      </div>
      <div className="md:hidden">
        <img
          className="w-full"
          alt="img excursion"
          src={excursionByid?.Images[0]}
        />
        <img
          className="mt-6 w-full"
          alt="img excursion"
          src={excursionByid?.Images[1]}
        />
      </div>
      <div className="md:w-3/5 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-3">
          <p className="text-sm leading-none text-gray-600">
            {excursionByid?.location}
          </p>
          <h1
            className="
            lg:text-2xl
            text-xl
            font-semibold
            lg:leading-6
            leading-7
            text-gray-800
            mt-2
						"
          >
            {excursionByid?.name}
          </h1>
        </div>
        <div className="inline-flex w-full mb-2 border-b border-gray-200 items-center justify-start">
          <div className="py-2 border-r border-l border-gray-200 flex items-center justify-around w-1/2">
            <p className="text-base leading-4 text-gray-800">Dia:</p>
            {excursionByid?.date && (
              <InputSelect options={excursionByid?.date} />
            )}
          </div>
          <div className="py-2 border-r border-gray-200 flex items-center justify-around w-1/2">
            <p className="text-base leading-4 text-gray-800">Hora:</p>
            {excursionByid?.time && (
              <InputSelect options={excursionByid?.time} />
            )}
          </div>
        </div>
        <div>
          <p className="max-h-72 overflow-y-scroll text-sm lg:leading-tight leading-normal text-gray-600 mt-0">
            {excursionByid?.description}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            Tipo de Excursión: {excursionByid?.excursionType}
          </p>
          <p className="text-base leading-4 mt-3 text-gray-600">
            Extra: {excursionByid?.extra}
          </p>
          <p className="text-base font-bold leading-4 mt-3 mb-3 text-gray-600">
            $ {excursionByid?.price}
          </p>
        </div>
        <button
          className="
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
          text-base
          flex
          items-center
          justify-center
          leading-none
          text-white
          bg-gray-800
          w-full
          py-4
          hover:bg-gray-700
					"
          onClick={(e) => addItemToCart({ ...excursionByid })}
        >
          Agregar al Carrito
          <ShoppingCartIcon className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
