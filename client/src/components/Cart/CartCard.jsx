import { TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { useCartContext } from "../../context/CartContext";

export const CartCard = ({ detailId, name, images, date, time, price, quantity, orderId}) => {
  const { removeItemFromCart } = useCartContext();
  const handelRemove = () => {
    removeItemFromCart({
      detailId: detailId,
      orderId: orderId
    })
  }

  return (
    <div className="flex px-2 py-1 content-center justify-evenly border border-black bg-slate-200 sm:grid-rows-3">
      {/* <NavLink
        // key={id}
        // to={`/excursion/detalle/${id}`}
        className="group w-1/5 h-50"
      > */}
      <div className="content-center justify-center">
        <img
          src={images[0]}
          alt={`Fotografía`}
          className="w-24 h-24 object-center object-cover group-hover:opacity-75 rounded-lg"
        />
      </div>
      {/* </NavLink> */}
      <div className="w-3/5 h-max text-center">
        <div>
          {/* <NavLink key={id} to={`/excursion/detalle/${id}`} className="group"> */}
          <h3 className="text-md text-center underline decoration-solid decoration-black font-bold text-black">
            {name}
          </h3>
          {/* </NavLink> */}
        </div>
        <div className="flex content-around w-full">
          <div className="w-1/4 px-1 mx-1">
            <h4 className="mt-3 text-xs font-bold text-black">Fecha:</h4>
            <h4 className="mt-3 text-xs text-black">{date.slice(1, 11).split('-').reverse().join('/')}</h4>
          </div>
          <div className="w-1/4 px-1 ml-1 border-l border-slate-400">
            <h4 className="mt-3 text-xs font-bold text-black">Hora:</h4>
            <h4 className="mt-3 text-xs text-black">{time}hs</h4>
          </div>
          <div className="w-1/4 px-1 mr-1 border-x border-slate-400">
            <h4 className="mt-3 text-xs font-bold text-black">Precio:</h4>
            <h4 className="mt-3 text-xs text-black">${price}</h4>
          </div>
          <div className="w-1/4 px-1 mx-1">
            <h4 className="mt-3 text-xs font-bold text-black">Personas:</h4>
            <h4 className="mt-3 text-xs text-black">{quantity}</h4>
          </div>
        </div>
      </div>
      <div className="w-2/12 h-50 text-center">
        <p className="mt-1 text-sm font-medium text-black">
          {"Subtotal: $" + (price * quantity)}
        </p>

        <button
          onClick={handelRemove}
          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          <TrashIcon className="h-5 w-5 text-white-500" aria-hidden="true" />
        </button>
      </div>
      <br />
    </div>
  );
};
