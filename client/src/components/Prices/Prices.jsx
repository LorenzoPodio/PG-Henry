import React from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { Link } from "react-router-dom";

export const Prices = () => {
  const { allExcursions } = useExcursionsContext();

  return (
    <div style={{ backgroundColor: '#D8D2CB' }}>
      <div className="flex justify-center text-center mx-auto py-9">
        <div className="w-72">
          <h1 className="grid rounded-md shadow-lg shadow-gray-500 px-3 py-3 text-white bg-sky-600 font-bold text-xl">
            TARIFAS
          </h1>
        </div>
      </div>
      <div className="flex justify-center py-5" style={{ backgroundColor: '#EEEEEE' }}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg shadow-gray-500 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-sky-600 text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        nombre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        locacion
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        tipo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        precio
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      ></th>
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
                                  <div className="text-sm font-medium text-gray-900">
                                    {e.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {e.location}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.excursionType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.price}
                            </td>
                            <td className="px-6 py-4 ">
                              <span>
                                <Link to={`/excursion/detalle/${e.id}`}>
                                  <button
                                    type="button"
                                    className="px-4 py-2 shadow-lg shadow-gray-500 hover:shadow-black rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    Comprar
                                  </button>
                                </Link>
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
    </div>
  );
};
