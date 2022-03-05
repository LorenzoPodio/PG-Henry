import React from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import {PencilIcon, TrashIcon, PlusCircleIcon} from '@heroicons/react/solid';
import swal from "sweetalert";

export const AdminPanel = () => {
  const { allExcursions, deleteExcursion } = useExcursionsContext();

  function handleEdit(e){

  }

  function handleDelete(e){
    swal({
      title: "Eliminar Excursion!",
      text: "Esta Seguro que quiere eliminar la excursion " + e.target.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((value) => {
        if(value === true){
          swal(`Excursion ${e.target.name} eliminada con exito`, {icon: "success"});
          deleteExcursion(e.target.value)
        }else swal(`La excursion ${e.target.name} no ha sido eliminada!`);
});    
}


  return (
          <div className="grid place-content-center" id="top">
            <h1 className="grid place-content-center mt-10">PANEL DE CONTROL</h1>
            <div className="flex flex-col w-fit m-10">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            nombre
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            locacion
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            tipo
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            precio
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            editar
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            borrar
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {allExcursions &&
                      allExcursions.map((e) => {
                      return (
                          <tr key={e.name}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{e.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{e.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.excursionType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="hidden sm:block">
                            <button
                            onClick={(e) => handleEdit(e)}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-white-500" aria-hidden="true" />
                            Editar
                            </button>
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="hidden sm:block">
                            <button
                            onClick={(e) => handleDelete(e)}
                            type="button"
                            value={e.id}
                            name={e.name}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                            <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-white-500" aria-hidden="true" />
                            Borrar
                            </button>
                            </span>
                            
                            </td>
                          </tr>
                      )})}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <span className="hidden sm:block my-10">
                            <a href="/crearExcursion#">
                            <button
                            onClick={(e) => handleEdit(e)}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                            <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5 text-white-500" aria-hidden="true" />
                            Agregar Excursion
                            </button>
                            </a>
                            </span>
            </div>
          </div>
            )
        }



