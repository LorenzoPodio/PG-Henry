import React, { useState, useEffect } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import {Image} from 'cloudinary-react';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import MapaSearch from '../MapBoxGL/MapBoxSearch'
import axios from "axios";

export const EditExcursion = () => {
  //get params info

  
  const { editExcursion, getExcursionById, excursionByid } =
    useExcursionsContext();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const name = urlParams.get("name");

  // const [imagesUrls, setImagesUrls] = useState([])
  const navigate = useNavigate();


  const [coordenadas, setCoordenadas] = useState({})
  
  const [input, setInput] = useState({
    name: "",
    // Images: [],
    description: "",
    location: "",
    date: [],
    time: [],
    price: 0,
    extra: "",
    excursionType: "",
    stock:"",
    lat: "",
    long: ""
  });

  
  const type =["Trekking", "Bus", "Lacustre"]
  

  useEffect(() => {
    getExcursionById(id);
    // eslint-disable-next-line
  }, []);

  function handleChange(e) {
    setInput(() => {
      return {
        ...input,
        [e.target.name]: e.target.value,
      };
    });
  }


  /// HANDLE CHECKBOX DE DATE
  const handleCheckboxDate = (e) => {
    if (e.target.checked) {
      setInput((prevState) => {
        return {
          ...prevState,
          date: [...prevState.date, e.target.value],
        };
      });
    }
    if (!e.target.checked) {
      input.date.splice(input.date.indexOf(e.target.value), 1);
      setInput((prevState) => {
        return { ...prevState };
      });
    }
  };

   /// HANDLE CHECKBOX DE TIME
  const handleCheckboxTime = (e) => {
    if (e.target.checked) {
      setInput((prevState) => {
        return {
          ...prevState,
          time: [...prevState.time, e.target.value],
        };
      });
    }
    if (!e.target.checked) {
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

    //HANDLE COORDENADAS

  function handleCoor(coor){
    setCoordenadas(coor)
  setInput({
    ...input,
    long: coordenadas.long,
    lat: coordenadas.lat
})
  }

  ///HANDLE DE IMAGENES
  // function handleImage(files) {
    
  //   const formData = new FormData()
  //   formData.append("file", files[0])
  //   formData.append("upload_preset", "excursion")

  //   axios.post("https://api.cloudinary.com/v1_1/excursionesapp/image/upload", formData)
  //   .then((response) => {
     
  //     setImagesUrls((prevState) => {
  //       return [
  //       ...prevState, response.data.secure_url
  //       ]})
     
  //   })
  // }
  
  // function deleteImage(e){
  //   setImagesUrls((prevState) => {
  //     return [
  //     ...prevState.filter(img => img !== e.target.value)
  //     ]})

  // }

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
    e.preventDefault();
    editExcursion(input, id);
    setInput({
      name: "",
      // Images: []
      description: "",
      location: "",
      date: [],
      time: [],
      price: 0,
      extra: "",
      excursionType: "",
      stock: "",
      lat: "",
      long: ""
    });
    swal("Excursión modificada exitosamente");
    setTimeout(() => navigate("/panelAdmin"), 3000);
  };

  return (
    <div className="grid place-content-center">
       <h1 className="xl:text-4xl text-5xl text-center text-black font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto mt-5">
        Panel De Edicion
      </h1>
      <h3 className="grid place-content-center font-bold text-2xl text-center pb-1">
        Estas editando la excursion : {name}
      </h3>
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
                          placeholder={excursionByid?.name}
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
  
        {/* {Mapa} */}
        
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
                  Locacion en el mapa
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
                        Agrega el nombre de la ciudad correctamente
                      </label>
                      <div className="mt-1">
                        <label
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={excursionByid?.lat}
                          defaultValue={""}
                        >{
                          coordenadas.lat && coordenadas.long ?
                        `latitud: ${coordenadas.lat}`
                        :
                        `latitud: ${excursionByid?.lat}`
                        }</label>
                        <label
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={excursionByid?.long}
                          defaultValue={""}
                        >{
                          coordenadas.lat && coordenadas.long ?
                        `longitud: ${coordenadas.long}`
                        :
                        `longitud: ${excursionByid?.long}`
                        }</label>
                      </div>
                    </div>
                  </div>
                </div>
                <br/>
                <MapaSearch
                changeCoordenadas={(coor) => handleCoor(coor)}/>
            </div>
          </div>
        </div>
        {/* Images */}
        {/* <div>
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
                    <div key={excursionByid?.Image}>
                      
                      <div key="asdasd"className="mt-1">
                      
  
                          <input type="file" onChange={(e) => handleImage(e.target.files)}></input>
  
                        
                      </div>
                    </div>
                    <div key="aslasdl" className="photopost">
                   
                      {
                       imagesUrls.length < 1 ? 

                       excursionByid?.Images?.map((images) => (
                        
                        <div key="aslkasbfhfhasdl">
                        <Image
                        style={{width: 200, margin: 10}}
                        cloudName="excursion" 
                        publicId={images}/>
                        <button type="button" key="aslkdjl"value={images} onClick={(e) => deleteImage(e)}>X</button>
                        </div>
                      ))

                      :
  
                        imagesUrls?.map((images) => (
                        
                          <div key="asdasdasdkljlkj">
                          <Image
                          style={{width: 200, margin: 10}}
                          cloudName="excursion" 
                          publicId={images}/>
                          <button key="aslkdjhasdl" type="button" value={images} onClick={(e) => deleteImage(e)}>X</button>
                          </div>
                        ))
                      }
                      
                    </div>
                    <p className="mt-2 text-sm text-gray-500" key="asdasdasdads">
                      Agrega imagenes que sean del lugar donde vas a realizar la
                      excursión.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
  
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
                          placeholder={excursionByid?.description}
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
                    
                    <textarea
                        id="location"
                        name="location"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder={excursionByid?.location}
                        defaultValue={""}
                        onChange={(e) => handleLocation(e)}
                      />
                  
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
                      <div className="mt-1 flex">
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="monday"
                          value={"Lunes"}
                          name="date"
                          onChange={(e) => handleCheckboxDate(e)}
                        />
                        <label htmlFor="monday">Lunes</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="tuesday"
                          value={"Martes"}
                          name="date"
                          onChange={(e) => handleCheckboxDate(e)}
                        />
                        <label htmlFor="tuesday">Martes</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="wednesday"
                          value={"Miercoles"}
                          name="date"
                          onChange={(e) => handleCheckboxDate(e)}
                        />
                        <label htmlFor="wednesday">Miercoles</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="thursday"
                          value={"Jueves"}
                          name="date"
                          onChange={(e) => handleCheckboxDate(e)}
                        />
                        <label htmlFor="thursday">Jueves</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="friday"
                          value={"Viernes"}
                          name="date"
                          onChange={(e) => handleCheckboxDate(e)}
                        />
                        <label htmlFor="friday">Viernes</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="saturday"
                          value={"Sabado"}
                          name="date"
                          onChange={(e) => handleCheckboxDate(e)}
                        />
                        <label htmlFor="saturday">Sabado</label>
                        </div>
                        <div style={{margin: 10}}>
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
                      <div className="mt-1 flex">
                      <div style={{margin: 10}}>
                      <input
                          type={"checkbox"}
                          id="8"
                          value={"8"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >08 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="9"
                          value={"9"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >09 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="10"
                          value={"10"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >10 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="11"
                          value={"11"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >11 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="12"
                          value={"12"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >12 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="13"
                          value={"13"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >13 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="14"
                          value={"14"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >14 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="15"
                          value={"15"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >15 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="16"
                          value={"16"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >16 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="17"
                          value={"17"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >17 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="18"
                          value={"18"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >18 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="19"
                          value={"19"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >19 hs</label>
                        </div>
                        <div style={{margin: 10}}>
                        <input
                          type={"checkbox"}
                          id="20"
                          value={"20"}
                          name="time"
                          onChange={(e) => handleCheckboxTime(e)}
                        />
                        <label >20 hs</label>
                        </div>
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
                      <div className="mt-1 flex">
                      <label>$</label>
                      <input
                          type="number"
                          id="price"
                          name="price"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={excursionByid?.price}
                          defaultValue={""}
                          onChange={(e) => handlePrice(e)}
                        />
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
                          placeholder={excursionByid?.extra}
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
          {/* Excursion stock */}
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
                  Cantidad de lugares disponibles
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
                        Agrega la cantidad de pasajeros que pueden participar de esta excursion.
                      </label>
                      <div className="mt-1">
                      <input
                          type="number"
                          id="stock"
                          name="stock"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder={excursionByid?.stock}
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