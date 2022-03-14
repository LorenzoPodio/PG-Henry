import React from "react";
import { Link } from "react-router-dom";
import style from "./OrderReview.module.css";

export default function OrderReview({ handleClick }) {
  // Debería traerme de mi estado carrito la información para poner el detalle.
  // Estado cart de cartContext.

  //se Hardcodea info en variable compras
  const buy = [
    { name: "Navegacion calafate", price: "12500", quantity: "2" },
    { name: "Nueva excursion", price: "1500", quantity: "5" },
  ];
  const total = buy.map((e) => e.price * e.quantity);
  const reduc = (accumulator, curr) => accumulator + curr;
  const totalbuy = total.reduce(reduc);
  return (
    <div className={style.orderReviewContainer}>
      <div className="shadow overflow-hidden " id="top">
        <div className="flex flex-col w-fit m-1">
          <h1 className="grid place-content-center mt-0 mb-0 font-bold text-xl text-neutral-700">
            DETALLE DE COMPRA
          </h1>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-14 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cantidad
                    </th>

                    <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                   

                      Total
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {buy &&
                    buy.map((e) => {
                      return (
                        <tr key={e.name}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {e.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              $ {e.price}
                            </div>
                          </td>
                          <td className="px-14 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {e.quantity}
                            </div>
                          </td>
                          <td className="px-6 py- whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">
                              $ {e.quantity * e.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
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

      <div className="shadow overflow-hidden " id="top">
      <div className="flex flex-col w-fit m-1">
      <h1 className="grid place-content-center mt-0 mb-0 font-bold text-xl text-neutral-700">TOTAL DE LA COMPRA</h1>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
      <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <h1 className="grid place-content-center mt-0 mb-0 font-bold  text-grey-900">
                     $ {totalbuy}
                    </h1>
                  </tr>
                </thead>
              </table>

      

              </div>
            </div>
          </div>
        </div>

        <span className="hidden content-end sm:block mb-10 mt-5">
          <Link to="/excursiones">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar Excursion
            </button>
          </Link>
        </span>
        <span className="hidden content-end sm:block mb-10 mt-5">
          <button
            onClick={() => handleClick("PersonalDetails")}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Continuar
          </button>
        </span>
      </div>
    </div>
  );
}
