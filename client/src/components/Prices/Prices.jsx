import React from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";

export const Prices = () => {
  const { allExcursions } = useExcursionsContext();

  return (
            <div className="flex flex-col">
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
                          </tr>
                      )})}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            )
        }



