import React, { Fragment } from 'react';
import { useExcursionsContext } from "../../../context/ExcursionsContext";
import { ExclamationIcon } from "@heroicons/react/solid";
import swal from "sweetalert";
import { Menu, Transition } from '@headlessui/react';
import { PurchasesDetail } from './PurchasesDetail';


export const PurchasesManagment = () => {
  const { cancelledOrder, allOrders } = useExcursionsContext();


  function handleCancelled(e) {
    swal({
      title: "Cancelar carrito",
      text: "Esta Seguro que quiere cancelar este carrito? " + e.target.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value === true) {
        swal(`Orden eliminada, se envió un email con el detalle de la cancelacion`, {
          icon: "success",
        });
        cancelledOrder(e.target.value);
      } else swal(`La orden no ha sido eliminada!`);
    });
  }

  const conditionalStyle = (purchaseStatus) => {
    switch (purchaseStatus) {
      case 'buying':
        return 'text-sky-500';
      case 'completed':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-amber-400';
    }
  }

  const sumSubTotals = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i].totalPrice
    }
    return total;
  }

  return (

    <div className="grid place-content-center" id="top">
      {!allOrders.length ? (
        <div className="flex flex-col w-fit m-10">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="pb-6 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg shadow-gray-500 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <h1 className="grid rounded-md shadow-lg shadow-gray-500 w-70 px-5 py-6 text-white bg-slate-700 mt-0 mb-0 font-bold text-xl">
                  Aun no tienes ventas realizadas, realiza una primer venta !
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-fit h-screen m-10 ">
          <div className="-my-2 overflow-x-auto h-full sm:-mx-6 lg:-mx-8 rounded-lg">
            <div className="pb-6 align-middle inline-block min-w-full h-fit sm:px-6 lg:px-8 rounded-lg">
              <div className="shadow-lg shadow-gray-500 border-b h-full border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 h-full">
                  <thead className="bg-sky-600 text-white">
                    <tr>
                      <th scope="col" className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Fecha Compra
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Detalle
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Precio Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Estatus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Cliente
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allOrders &&
                      allOrders.map((e) => {
                        return (
                          <tr key={e.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {e.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {e.date}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {/* ------------------------------ DETALLE COMPRAAAAA -------------------------------- */}
                              <Menu as="div" className="relative inline-block text-left">
                                <div>
                                  <Menu.Button
                                    className="px-4 py-2 rounded-md shadow-lg hover:shadow-black shadow-gray-500 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    Ver Detalle
                                  </Menu.Button>
                                </div>
                                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="z-10 origin-top-right absolute mt-1 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {() => (
                                          <PurchasesDetail products={e.products}/>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                              {/* --------------------------------------------------------------------------------- */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${sumSubTotals(e.order_details)}
                            </td>
                            <td
                              className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 ${conditionalStyle(
                                e.status
                              )}`}
                            >
                              {e.status.toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.user.name} - {e.user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="hidden sm:block">
                                <button
                                  onClick={(e) => handleCancelled(e)}
                                  disabled={
                                    e.status.toUpperCase() === "COMPLETED"
                                      ? false
                                      : true
                                  }
                                  type="button"
                                  value={e.id}
                                  name={e.name}
                                  className="inline-flex px-4 py-2 shadow-lg shadow-gray-500 hover:shadow-black rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <ExclamationIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-white-500"
                                    aria-hidden="true"
                                  />
                                  Cancelar
                                </button>
                              </span>
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
      )}
    </div>
  );
}
