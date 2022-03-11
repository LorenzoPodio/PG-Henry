import React from 'react';
import { useExcursionsContext } from "../../../context/ExcursionsContext";
import { ExclamationIcon, PlusCircleIcon } from "@heroicons/react/solid";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const purchases = [
  {
    id: 1,
    detail: 'detalle 1',
    totalPrice: 1500,
    date: '10/03/2022',
  },
  {
    id: 2,
    detail: 'detalle 2',
    totalPrice: 2000,
    date: '10/03/2022',
  },
  {
    id: 3,
    detail: 'detalle 3',
    totalPrice: 2500,
    date: '10/03/2022',
  },
  {
    id: 4,
    detail: 'detalle 4',
    totalPrice: 3000,
    date: '10/03/2022',
  }
]

export const PurchasesManagment = () => {
  // const { userAdmins, deleteExcursion } = useExcursionsContext();

  function handleBan(e) {
    swal({
      title: "Bloquear Usuario!",
      text: "Esta Seguro que quiere bloquear al usuario " + e.target.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value === true) {
        swal(`Usuario ${e.target.name} bloqueado con exito`, {
          icon: "success",
        });
        // deleteExcursion(e.target.value);
      } else swal(`La excursion ${e.target.name} no ha sido eliminada!`);
    });
  }

  return (

    <div className="grid place-content-center bg-emerald-700" id="top">
      <div className="flex flex-col w-fit m-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detalle
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchases &&
                    purchases.map((e) => {
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
                            {e.detail}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${e.totalPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="hidden sm:block">
                              <button onClick={(e) => handleBan(e)}
                                type="button"
                                value={e.id}
                                name={e.name}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <ExclamationIcon className="-ml-1 mr-2 h-5 w-5 text-white-500" aria-hidden="true" />
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
    </div>
  );
}
