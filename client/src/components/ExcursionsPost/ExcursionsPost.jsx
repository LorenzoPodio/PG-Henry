import React, { useState } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { useNavigate, Link} from "react-router-dom";
import swal from "sweetalert";

export const ExcursionsPost = () => {

  const { addExcursion, allExcursions } = useExcursionsContext();

  const nameExcursions = allExcursions && allExcursions.map((e) => {
    return e.name
  }); 
  console.log(nameExcursions)

  
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

  const locations = ["Bariloche", "Tucuman", "La Plata", "Villa Gesel"]
  const price = [500, 1000, 1500, 2000, 2500]
  const type =["Trekking", "Bus", "Lacustre"]

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

  /// HANDLE CHECKBOX DE DATE
  const handleCheckboxDate = (e) => {
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

   /// HANDLE CHECKBOX DE TIME
  const handleCheckboxTime = (e) => {
    console.log(input);
    if (e.target.checked) {
      console.log(e.target.checked);
      setInput((prevState) => {
        return {
          ...prevState,
          time: [...prevState.time, e.target.value],
        };
      });
    }
    if (!e.target.checked) {
      console.log(e.target.checked);
      input.time.splice(input.time.indexOf(e.target.value), 1);
      setInput((prevState) => {
        return { ...prevState };
      });
    }
  };

   /// HANDLE DE EXCURSIONTYPE
    function handleType(e) {
      setInput({
        ...input,
        excursionType: e.target.value
    })
    }

  ///HANDLE DE IMAGENES
  function handleArray(e) {
    setInput({
      ...input,
      Images: input.Images.includes(e.target.value) ? [...input.Images] : [...input.Images, e.target.value]
  })
  console.log(input)
  }

  ///HANDLE DE LOCATION
  function handleLocation(e) {
    setInput({
      ...input,
      location: e.target.value
  })
  }

  ///HANDLE DE PRICE
  function handlePrice(e) {
    setInput({
      ...input,
      price: e.target.value
  })
  }

  ///SUBMIT
  const handleSubmit = (e) => {
     
      if (nameExcursions && nameExcursions.includes(input.name)) {
        e.preventDefault();
        swal({
          title: "Ooops..",
          icon: "error",
          text: "Ya existe una excursion con este nombre, intente con otro"
        }) 
      } else if(input.Images.length <= 0 || 
        input.date.length <= 0 ||
        input.time.length <= 0 ||
        !input.description ||
        !input.excursionType ||
        !input.name || 
        !input.price ||
        !input.location){
          e.preventDefault();
          swal({
            title: "Ooops..",
            icon: "error",
            text: "Debe completar todos los campos para continuar"
          })
        }
       else {
    e.preventDefault()
    console.log(input)
    addExcursion(input)
    swal("Excursión creada exitosamente");
    setTimeout(() => (window.location.href = "/panelAdmin"), 3000);
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
    })
  }};

  return (
  <div className="grid place-content-center">
    <form onSubmit={(e) => handleSubmit(e)}>

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
                        
                          <input
                            onChange={(e) => handleArray(e)}
                            type="text"
                            id="Images"
                            name="Images"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="https://imagenDeMuestra1.jpg"
                          />

                          <input
                            onChange={(e) => handleArray(e)}
                            type="text"
                            id="Images"
                            name="Images"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="https://imagenDeMuestra2.jpg"
                          />

                          <input
                            onChange={(e) => handleArray(e)}
                            type="text"
                            id="Images"
                            name="Images"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="https://imagenDeMuestra3.jpg"
                          />
                        
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
                    <select className="" onChange={(e) => handleLocation(e)}>
                        <option name='location' value=''>Seleccione Ubicacion</option>
                        {locations?.map(locat =>
                            <option key={locat} name='location' value={locat}>{locat}</option>
                        )}
                    </select>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Agregar referencias puede ser una buena opción.
                    </p>
                  </div>
                </div>
              </div>
    
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
                        onChange={(e) => handleCheckboxDate(e)}
                      />
                      <label htmlFor="monday">Lunes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="tuesday"
                        value={"Martes"}
                        name="date"
                        onChange={(e) => handleCheckboxDate(e)}
                      />
                      <label htmlFor="tuesday">Martes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="wednesday"
                        value={"Miercoles"}
                        name="date"
                        onChange={(e) => handleCheckboxDate(e)}
                      />
                      <label htmlFor="wednesday">Miercoles</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="thursday"
                        value={"Jueves"}
                        name="date"
                        onChange={(e) => handleCheckboxDate(e)}
                      />
                      <label htmlFor="thursday">Jueves</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="friday"
                        value={"Viernes"}
                        name="date"
                        onChange={(e) => handleCheckboxDate(e)}
                      />
                      <label htmlFor="friday">Viernes</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="saturday"
                        value={"Sabado"}
                        name="date"
                        onChange={(e) => handleCheckboxDate(e)}
                      />
                      <label htmlFor="saturday">Sabado</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="sunday"
                        value={"Domingo"}
                        name="date"
                        onChange={(e) => handleCheckboxDate(e)}
                      />
                      <label htmlFor="sunday">Domingo</label>
                    </div>
                  </div>
                </div>
              </div>
          
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
                        type={"checkbox"}
                        id="8"
                        value={"8"}
                        name="time"
                        onChange={(e) => handleCheckboxTime(e)}
                      />
                      <label htmlFor="monday">08 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="10"
                        value={"10"}
                        name="time"
                        onChange={(e) => handleCheckboxTime(e)}
                      />
                      <label htmlFor="tuesday">10 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="12"
                        value={"12"}
                        name="time"
                        onChange={(e) => handleCheckboxTime(e)}
                      />
                      <label htmlFor="wednesday">12 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="14"
                        value={"14"}
                        name="time"
                        onChange={(e) => handleCheckboxTime(e)}
                      />
                      <label htmlFor="thursday">14 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="16"
                        value={"16"}
                        name="time"
                        onChange={(e) => handleCheckboxTime(e)}
                      />
                      <label htmlFor="friday">16 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="18"
                        value={"18"}
                        name="time"
                        onChange={(e) => handleCheckboxTime(e)}
                      />
                      <label htmlFor="saturday">18 hs</label>
                      <br />
                      <input
                        type={"checkbox"}
                        id="20"
                        value={"20"}
                        name="time"
                        onChange={(e) => handleCheckboxTime(e)}
                      />
                      <label htmlFor="sunday">20 hs</label>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Tener en cuenta un margen de retraso por imprevistos.
                    </p>
                  </div>
                </div>
              </div>
        
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
                    <select className="" onClick={(e) => handlePrice(e)}>
                        <option name='location' value=''>Seleccione Precio</option>
                        {price?.map(p =>
                            <option key={p} name='location' value={p}>$ {p}</option>
                        )}
                    </select>
                    </div>
                  </div>
                </div>
              </div>
      
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
                    <select className="" onChange={(e) => handleType(e)}>
                        <option name='location' value=''>Seleccione Tipo de Excursion</option>
                        {type?.map(t =>
                            <option key={t} name='location' value={t}>{t}</option>
                        )}
                    </select>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
      {/* Boton */}
      <div className="px-4 py-3 bg-white text-right sm:px-6 grid place-content-center">
        
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Registrar Excursion
        </button>
    
      </div>
    </form>
    </div>
  );
};
