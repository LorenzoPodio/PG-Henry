import React from 'react';
import { useExcursionsContext } from "../../../context/ExcursionsContext";
import { XCircleIcon, CheckCircleIcon, BanIcon } from "@heroicons/react/solid";
import swal from "sweetalert";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from 'react';

export const UsersManagment = () => {

  const { users, banUser, UnbanUser } = useExcursionsContext();

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
        banUser(e.target.value);
      } else swal(`El usuario ${e.target.name} no ha sido bloqueado!`);
    });
  }

  function handleUnban(e) {
    swal({
      title: "Desbloquear Usuario!",
      text: "Esta Seguro que quiere desbloquear al usuario " + e.target.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value === true) {
        swal(`Usuario ${e.target.name} desbloqueado con exito`, {
          icon: "success",
        });
        UnbanUser(e.target.value);
      } else swal(`El usuario ${e.target.name} no ha sido desbloqueado!`);
    });
  }

  return (
    <div className="grid place-content-center" id="top">
      <div className="flex flex-col w-fit m-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="pb-6 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow-lg shadow-gray-500 overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-sky-600 text-white">
                  <tr>
                    <th scope="col" className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Direcci??n
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Dni
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Es admin?
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Est?? bloqueado?
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users &&
                    users.map((e) => {
                      return (
                        <tr key={e.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {e.name + ' ' + e.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {e.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.adress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.dni}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.isAdmin ?
                              <CheckCircleIcon className='h-10 w-10 text-green-600'/> :
                              <XCircleIcon className='h-10 w-10 text-red-600'/>
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.isBanned ?
                              <CheckCircleIcon className='h-10 w-10 text-green-600'/> :
                              <XCircleIcon className='h-10 w-10 text-red-600'/>
                            }
                          </td>
                          {e.isBanned ?
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="hidden sm:block">
                              <button onClick={(e) => handleUnban(e)}
                                type="button"
                                value={e.id}
                                name={e.name}
                                className="inline-flex items-center px-4 py-2 border rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                              >
                                <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 text-white-500" aria-hidden="true" />
                                Desbloquear
                              </button>
                            </span>
                          </td> :
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="hidden sm:block">
                            <button onClick={(e) => handleBan(e)}
                              type="button"
                              value={e.id}
                              name={e.name}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <BanIcon className="-ml-1 mr-2 h-5 w-5 text-white-500" aria-hidden="true" />
                              Bloquear
                            </button>
                          </span>
                        </td>
                          }
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
