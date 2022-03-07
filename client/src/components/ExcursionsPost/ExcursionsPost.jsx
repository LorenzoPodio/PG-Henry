import React, { useEffect, useState } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { useNavigate } from "react-router-dom";

export const ExcursionsPost = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    Images: [],
    description: "",
    location: "",
    date: [],
    time: [],
    price: 0,
    extra: "",
    excursionType: "",
  });

  function handleChange(e) {
    setInput(() => {
      console.log(e.target.value);
      console.log(input);
      return {
        ...input,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleCheckbox = (e) => {
    console.log(input);
    if (e.target.checked) {
      console.log(e.target.checked);
      setInput((prevState) => {
        return {
          ...prevState,
          date: [...prevState.date, e.target.value],
        };
      });
    }
    if (!e.target.checked) {
      console.log(e.target.checked);
      input.date.splice(input.date.indexOf(e.target.value), 1);
      setInput((prevState) => {
        return { ...prevState };
      });
    }
  };

  function handleArray(e) {
    setInput(() => {
      console.log(e.target.value);
      console.log(e);
      console.log(input);
      return {
        ...input,
        [e.target.name]: input[e.target.name].concat(e.target.value),
      };
    });
  }

  function handleNewImage(e) {
    e.preventDefault();
    console.log("e.target", e.target.firstChild.value);
    console.log("soy el evento", e);
    console.log("soy el input", input);
    e.target.firstChild.value
      ? setInput(() => {
          return {
            ...input,
            Images: input.Images.concat(e.target.firstChild.value),
          };
        })
      : console.log("evento vacio");
  }

  const handleSubmit = (e) => {
    // promesa de envio de data aca
    setInput({
      name: "",
      Images: [],
      description: "",
      location: "",
      date: [],
      time: [],
      price: 0,
      extra: "",
      excursionType: "",
    });
    alert("Excursión creada exitosamente");
  };

  return (
    <div>
      {/* Name */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Nombre de la excursión
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega un nombre claro y fácil de entender
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="name"
                        name="name"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Ejemplo de nombre"
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Images */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Imagenes de muestra
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Agrega el link de las imagenes que quieras mostrar.
                  </label>
                  <div>
                    <div className="mt-1">
                      <div>
                        <form onSubmit={(e) => handleNewImage(e)}>
                          <input
                            type={"text"}
                            id="Images"
                            name="Images"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="https://imagenDeMuestra.jpg"
                          />
                          <button type="submit|reset">Cargar Imagen</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Agrega imagenes que sean del lugar donde vas a realizar la
                    excursión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Descripción de la excursión
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega una descripción de tu excursión.
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Descripción..."
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Detalla claramente las actividades a realizar.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Location */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Ubicación de la excursión.
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el lugar donde se realizará tu excursión.
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="location"
                        name="location"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="País,Provincia,Ciudad..."
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Agregar referencias puede ser una buena opción.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Date */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Fecha de la excursión.
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega la fecha de salida de tu excursión.
                    </label>
                    <div className="mt-1">
                      <input
                        type={"checkbox"}
                        id="monday"
                        value={"Lunes"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="monday">Lunes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="tuesday"
                        value={"Martes"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="tuesday">Martes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="wednesday"
                        value={"Miercoles"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="wednesday">Miercoles</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="thursday"
                        value={"Jueves"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="thursday">Jueves</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="friday"
                        value={"Viernes"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="friday">Viernes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="saturday"
                        value={"Sabado"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="saturday">Sabado</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="sunday"
                        value={"Domingo"}
                        name="date"
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label htmlFor="sunday">Domingo</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Time */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Horario de salida.
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el horario de salida de tu excursión.
                    </label>
                    <div className="mt-1">
                      <input
                        type={"time"}
                        id="time"
                        name="time"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder=""
                        defaultValue={""}
                        onChange={(e) => handleArray(e)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Tener en cuenta un margen de retraso por imprevistos.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Price */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Precio de la excursión.
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el costo total de tu excursión.
                    </label>
                    <div className="mt-1">
                      <input
                        type={"number"}
                        id="price"
                        name="price"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Precio"
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Extra */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Información extra sobre la excursión.
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega toda la información necesaria para la excursión
                      como equipamento y duración de la misma.
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="extra"
                        name="extra"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Ingresa información extra"
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Excursion Type */}
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Tipo de excursión ofrecida.
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Agrega el tipo de excursión.
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="excursionType"
                        name="excursionType"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Tipo de excursión"
                        defaultValue={""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Boton */}
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
