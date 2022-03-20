import { useExcursionsContext } from "../../../context/ExcursionsContext";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/solid";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export const ExcursionsManagment = () => {
  const { allExcursions, deleteExcursion } = useExcursionsContext();

  function handleDelete(e) {
    swal({
      title: "Eliminar Excursion!",
      text: "Esta Seguro que quiere eliminar la excursion " + e.target.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value === true) {
        swal(`Excursion ${e.target.name} eliminada con exito`, {
          icon: "success",
        });
        deleteExcursion(e.target.value);
      } else swal(`La excursion ${e.target.name} no ha sido eliminada!`);
    });
  }

  return (
    <div className="grid place-content-center" id="top">
      <div className="flex flex-col mb-10">
        <div className="hidden content-end sm:block mb-10 mt-5 px-8">
          <Link to="/crearExcursion">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <PlusCircleIcon
                className="-ml-1 mr-2 h-5 w-5 text-white-500"
                aria-hidden="true"
              />
              Agregar Excursion
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="divide-y divide-gray-200">
                <thead className="bg-sky-600 text-white">
                  <tr className="">
                    <th scope="col" className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                      locacion
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                      tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                      precio
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                      acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allExcursions &&
                    allExcursions.map((e) => {
                      return (
                        <tr key={e.name}>
                          <td className="px-3 text-left py-3 whitespace-nowrap">
                            <div className="overflow-x-auto w-20 lg:text-sm text-xs font-medium text-gray-900 sm:w-32 md:w-44 lg:w-full xl:w-full 2xl:w-full">
                              {e.name}
                            </div>
                          </td>
                          <td className="px-3 text-center py-3 whitespace-nowrap">
                            <div className="lg:text-sm text-xs text-gray-900">
                              {e.location}
                            </div>
                          </td>
                          <td className="px-3 text-center py-3 whitespace-nowrap lg:text-sm text-xs text-gray-500">
                            {e.excursionType}
                          </td>
                          <td className="px-3 text-center py-3 whitespace-nowrap lg:text-sm text-xs text-gray-500">
                            {e.price}
                          </td>
                          <td className="inline-flex px-3 text-center py-3 whitespace-nowrap lg:text-sm text-xs text-gray-500">
                            <div className="hidden sm:block">
                              <Link
                                to={`/editarExcursion?id=${e.id}&name=${e.name}`}
                              >
                                <button
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm lg:text-sm text-xs font-medium text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                >
                                  <PencilIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-white-500"
                                    aria-hidden="true"
                                  />
                                  Editar
                                </button>
                              </Link>
                            </div>
                            <div className="hidden sm:block ml-3">
                              <button
                                onClick={(e) => handleDelete(e)}
                                type="button"
                                value={e.id}
                                name={e.name}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm lg:text-sm text-xs font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <TrashIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-white-500"
                                  aria-hidden="true"
                                />
                                Borrar
                              </button>
                            </div>
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
};
