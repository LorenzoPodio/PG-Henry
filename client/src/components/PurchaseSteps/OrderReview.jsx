import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

export default function OrderReview({ handleClick }) {
  const { cartItems } = useCartContext();

  const total = cartItems.map((e) => e.totalPrice);
  const reduc = (accumulator, curr) => accumulator + curr;
  const totalbuy = total.reduce(reduc, 0)
  return (
    <div style={{ backgroundColor: '#D8D2CB' }}>
      <div className="flex justify-between text-center mx-60 py-5">
        <div className="w-72">
          <h1 className="grid rounded-md shadow-lg shadow-gray-500 px-3 py-3 text-white bg-sky-600 font-bold text-xl">
            DETALLE DE COMPRA
          </h1>
        </div>
        <div className="w-72">
          <h1 className="grid rounded-md shadow-lg shadow-gray-500 px-3 py-3 text-white bg-sky-600 font-bold text-xl">
            TOTAL DE LA COMPRA
          </h1>
        </div>
      </div>
      <div className="flex justify-between pl-28 pr-60 py-5 h-screen" style={{ backgroundColor: '#EEEEEE' }}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-6 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg shadow-gray-500 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-sky-600 text-white">
                    <tr>
                      <th scope="col" className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider" >
                        nombre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" >
                        precio
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" >
                        cantidad
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" >
                        total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems &&
                      cartItems.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {e.product.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {e.price}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                              {e.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              $ {e.quantity * e.price}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-72 text-center py-4">
            <h1 className="rounded-md shadow-lg shadow-gray-500 bg-white px-3 py-3 text-slate-800 font-semibold text-xl">
              $ {totalbuy}
            </h1>
          </div>
          <div className="flex justify-between">
            <span className="hidden content-end sm:block mb-10 mt-5">
              <Link to="/excursiones">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md hover:shadow-black shadow-lg shadow-gray-500 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Agregar Excursion
                </button>
              </Link>
            </span>
            <span className="hidden content-end sm:block mb-10 mt-5">
              <button
                onClick={() => handleClick("PersonalDetails")}
                type="button"
                className="px-4 py-2 rounded-md hover:shadow-black shadow-lg shadow-gray-500 text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continuar
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
