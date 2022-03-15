import React, { useEffect, useState } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { useParams } from "react-router-dom";
import InputSelect from "../InputSelect/InputSelect";
import { DetailDatePicker } from "../ExcursionDetail/DetailDatePicker/DetailDatePicker";
import axios from "axios";

export const AdminMailer = () => {
  const [item, setItem] = useState({}); //Estado para construir item y agregarlo al carrito
  const [stock, setStock] = useState("0");
  
  const [disabled, setDisabled] = useState(true);
  const { excursionByid, getExcursionById } = useExcursionsContext();


  useEffect(() => {
    
    
  }, []);

  //useEffect para llamar a la ruta del back selectProduct + setear el stock disponible.
  useEffect(() => {
    if (item.hasOwnProperty("time") && item.hasOwnProperty("date")) {
      return axios
        .post("http://localhost:3001/selectProduct", {
          ...item, //{date, time}
          name: excursionByid.name,
          price: excursionByid.price,
          id: excursionByid.id,
        })
        .then((resp) => setStock(resp.data), setDisabled(false))
        .catch((e) => {
          return setStock(0), setDisabled(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  //Handles que construyen el item que se enviara a la ruta del back addCart
  const handleChange = (e) => {
    setItem((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleTime = (time) => {
    setItem((prevState) => {
      return { ...prevState, time };
    });
  };
  const handleDate = (date) => {
    let dateJson = JSON.stringify(date);
    setItem((prevState) => {
      return { ...prevState, date: dateJson };
    });
  };
  // const {Images, createdInDb, date, description, excursionType, extra, location, name, price, time} = excursionByid;

  const handleClick = () => {
   
   
  };
  const time = ["9", "10","11","12", "13"];
  return (
    <div className="md:flex items-start justify-center py-20 px-2">
      <div className="md:w-3/5 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="inline-flex w-full mb-2 border-b border-gray-200 items-center justify-start">
        <div className="py-2 px-20 border-r border-gray-200 flex items-center justify-around w-1/3">
            <p className="text-base leading-4 text-gray-800">Excursión:</p>
            {excursionByid?.time && (
              <InputSelect
                handleTime={handleTime}
                options={excursionByid?.time}
              />
            )}
          </div>
          <div className="py-2 px-2 border-r border-l border-gray-200 flex items-center justify-around w-1/3">
            <p className="text-base px-2 leading-4 text-gray-800">Dia:</p>
            {/* {excursionByid?.date && <InputSelect options={excursionByid?.date}/>} */}
            <DetailDatePicker
              handleDate={handleDate}
              excursionDays={["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]}
            />
          </div>
          <div className="py-2 px-20 border-r border-gray-200 flex items-center justify-around w-1/3">
            <p className="text-base leading-4 text-gray-800">Hora:</p>
            {excursionByid?.time && (
              <InputSelect
                handleTime={handleTime}
                options={excursionByid?.time}
              />
            )}
          </div>
          
        </div>
        <p className=" py-4 text-gray-800">Asunto:</p>
        <div className="   border-gray-200 flex items-center justify-around ">
            
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="content"
              
              className="shadow-md px-80  rounded-md h-10 w-90 "
            />
          </div>
        <p className="text-base py-14 leading-4 text-gray-800">Contenido del Mensaje:</p>
        <div className="   border-gray-200 flex items-center justify-around ">
            
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="content"
              
              className="shadow-md px-80 text-center rounded-md h-60 w-70 "
            />
          </div>
          <span className="hidden content-end sm:block mb-10 mt-5">
          <button
            onClick={() => handleClick("PersonalDetails")}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Enviar Mensaje
          </button>
        </span>
      </div>
    </div>
  );
};
