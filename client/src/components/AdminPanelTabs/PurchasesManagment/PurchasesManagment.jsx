import React, { useEffect } from 'react';
import { useExcursionsContext } from "../../../context/ExcursionsContext";
import { ExclamationIcon } from "@heroicons/react/solid";
import swal from "sweetalert";


export const PurchasesManagment = () => {
  const { cancelledOrder, allOrders, getAllOrders} = useExcursionsContext();
  console.log('ALLORDERS :>> ', allOrders);
  let totalPurchase = 0;
  let productNames = [];

  useEffect(() => {
    getAllOrders();
  }, [])
  

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
                      Fecha Compra
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detalle
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estatus
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            Excursiones: {e.products.forEach(p => productNames.push(p.name))}{productNames.join(', ')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${e.order_details.forEach(od => totalPurchase += od.totalPrice)}{totalPurchase}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 ${conditionalStyle(e.status)}`}>
                            {e.status.toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.user.name} - {e.user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="hidden sm:block">
                              <button onClick={(e) => handleCancelled(e)}
                                disabled={e.status.toUpperCase()==='COMPLETED'? false : true}
                                type="button"
                                value={e.id}
                                name={e.name}
                                className="inline-flex px-4 py-2 border rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
