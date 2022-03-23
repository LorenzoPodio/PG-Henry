import React, { useState, useEffect } from "react";
import { useExcursionsContext } from "../../../context/ExcursionsContext";
import InputSelect from "../../InputSelect/InputSelect";
import { DetailDatePicker } from "../../ExcursionDetail/DetailDatePicker/DetailDatePicker";
import axios from "axios";
import swal from "sweetalert";
import validate from "./validate";

export const AdminMailer = () => {
  const [item, setItem] = useState({
    content: "",
    subject: "",
    date: undefined,
    name: "",
    time: "",
  }); //Estado para construir item y agregarlo al carrito
  const [errors, setErrors] = useState({}); //Estado para manejar los errores del formulario
  const [disabled, setDisabled] = useState(true); //Habilitador del botón submit cuando no haya ningun error en el formulario
  const { allExcursions, allOrders } = useExcursionsContext();

  useEffect(() => {
    //useEffect para habilitar o deshabilitar el boton create, cuando se cumplan ciertas condiciones
    if (
      item.name?.length > 0 &&
      typeof item?.date !== "undefined" &&
      item.time?.length > 0 &&
      item.subject?.length > 0 &&
      item.content?.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [item, disabled, errors]);

  const getExcursionsNames = () => {
    return allExcursions?.map((exc) => exc.name);
  };

  const excursionsNames = getExcursionsNames();

  //Handles que construyen el item que se enviara a la ruta del back addCart
  const handleChange = (value) => {
    setErrors(validate({ ...item, name: value }));
    setItem((prevState) => {
      return { ...prevState, name: value };
    });
  };
  const handleTime = (time) => {
    setErrors(validate({ ...item, time }));
    setItem((prevState) => {
      return { ...prevState, time };
    });
  };
  const handleDate = (date) => {
    let dateJson = JSON.stringify(date);
    setErrors(validate({ ...item, date: dateJson }));
    setItem((prevState) => {
      return { ...prevState, date: dateJson };
    });
  };
  const handleMail = (e) => {
    setErrors(validate({ ...item, [e.target.name]: e.target.value }));
    setItem((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    swal({
      title: "Enviar email",
      text: "¿Esta seguro que desea enviarle un email a todos los usuarios que compraron la excursión?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value === true) {
        swal(`El email fue enviado`, {
          icon: "success",
        });
        setItem((prevState) => {
          return {
            ...prevState,
            content: "",
            subject: "",
          };
        });
        setErrors(validate({ ...item, content: "", subject: "" }));
        axios.post("http://localhost:3001/setmail", item);
      } else swal(`El email no ha sido enviado!`);
    });
  };

  let verified = false;
  let productsCompleted = allOrders.filter((e) => e.status === "completed");
  const result = productsCompleted.map((e) => e.products);
  result.forEach((e) =>
    e.forEach((prod) => {
      if (
        item.name === prod.name &&
        item.date === prod.date &&
        item.time === prod.time
      ) {
        return (verified = true);
      }
    })
  );
  return (
    <div className="md:flex justify-center py-20 px-2 font-medium">
      <div className="md:w-3/5 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="inline-flex w-full mb-2 border-b border-gray-200 items-center justify-start">
          <div className="py-2 px-2 border-r border-gray-200 flex items-center flex-col w-1/2">
            <p className="text-base leading-4 text-gray-800">Excursión:</p>
            {excursionsNames && (
              <InputSelect
                options={excursionsNames}
                handleTime={handleChange}
              />
            )}
            {errors.name?.length > 0 && <p>{errors?.name}</p>}
          </div>
          <div className="py-2 px-4 border-r border-l border-gray-200 flex flex-col items-center justify-around w-1/4">
            <p className="text-base px-2 leading-4 text-gray-800 mb-1">Dia:</p>
            {/* {excursionByid?.date && <InputSelect options={excursionByid?.date}/>} */}
            <DetailDatePicker
              handleDate={handleDate}
              excursionDays={[
                "Lunes",
                "Martes",
                "Miercoles",
                "Jueves",
                "Viernes",
                "Sabado",
                "Domingo",
              ]}
            />
            {errors?.date && <p>{errors?.date}</p>}
          </div>
          <div className="py-2 px-4 border-r border-gray-200 flex flex-col items-center justify-around w-1/4">
            <p className="text-base leading-4 text-gray-800">Hora:</p>

            <InputSelect
              handleTime={handleTime}
              options={[
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
              ]}
            />
            {errors.time?.length > 0 && <p>{errors?.time}</p>}
          </div>
        </div>

        <div>
          {verified === true ? (
            <div>
              Tienes excursiones vendidas relacionadas a esta búsqueda, contáctalos !
            </div>
          ) : (
            <div>No se encontraron ventas que coincidan con esta fecha</div>
          )}
        </div>
        <div className="block mb-6 border-gray-200 items-center justify-around ">
          <p className=" py-3 text-gray-800">Asunto:</p>
          <input
            onChange={(e) => handleMail(e)}
            type="text"
            name="subject"
            value={item.subject}
            className="shadow-lg hover:shadow-black shadow-gray-500 rounded-md h-10 w-full px-2"
          />
          {errors.subject?.length > 0 && <p>{errors?.subject}</p>}
        </div>
        <div className=" block border-gray-200 justify-around ">
          <p className="text-base py-3 text-gray-800">Contenido del Mensaje:</p>
          <textarea
            onChange={(e) => handleMail(e)}
            type=""
            name="content"
            value={item.content}
            className="shadow-lg hover:shadow-black shadow-gray-500 rounded-md w-full h-60 p-2"
          />
          {errors.content?.length > 0 && <p>{errors?.content}</p>}
        </div>
        <span className="hidden text-right sm:block mb-10 mt-5">
          <button
            onClick={() => handleClick("PersonalDetails")}
            type="button"
            className="px-4 py-2 rounded-md shadow-lg hover:shadow-black shadow-gray-500 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={disabled}
          >
            Enviar Mensaje
          </button>
        </span>
      </div>
    </div>
  );
};
