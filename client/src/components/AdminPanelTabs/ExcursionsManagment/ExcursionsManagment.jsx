import { useExcursionsContext } from "../../../context/ExcursionsContext";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/solid";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Checkout from "../../MercadoPago/Checkout";

export const ExcursionsManagment = () => {
  const [data, setData] = useState(""); //Estado para setear la respuesta de mercado pago
  const { allExcursions, deleteExcursion } = useExcursionsContext();
  const navigate = useNavigate();

  //  IMPLEMENTACION DE MP
  useEffect(() => {
    axios
      .post("http://localhost:3001/mercadopago")
      .then((data) => {
        setData(data.data);
        console.info("Contenido de data:", data);
      })
      .catch((err) => console.error(err));
  }, []);
  //Products ---> Serian los productos que estan en la tabla Order relacionadas al usuario.
  const products = [
    { title: "Producto 1", quantity: 5, price: 10.52 },
    { title: "Producto 2", quantity: 15, price: 100.52 },
    { title: "Producto 3", quantity: 6, price: 200 },
  ];
  ////////////////////

  function handleEdit(e) {
    navigate(`/editarExcursion?id=${e.target.value}&name=${e.target.name}`);
  }

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
    <div className="grid place-content-center bg-emerald-700" id="top">
      <h1 className="grid place-content-center mt-0">PANEL DE CONTROL</h1>
      {/* Implementacion de mercado pago, descomentar cuando se utilice */}
      <div>
        {!data ? (
          <p>Aguarde un momento....</p>
        ) : (
          <Checkout products={products} data={data} />
        )}
      </div>
      {/* ////////////////////////////////////////////////////////////// */}
      <div className="flex flex-col w-fit mb-10">
        <span className="hidden content-end sm:block mb-10 mt-5">
          <a href="/crearExcursion#">
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
          </a>
        </span>

        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      locacion
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      precio
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      editar
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="hidden sm:block">
                              <button onClick={(e) => handleEdit(e)}
                                value={e.id}
                                name={e.name}
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
                              <button onClick={(e) => handleDelete(e)}
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
