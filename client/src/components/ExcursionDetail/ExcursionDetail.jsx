import React, { useEffect, useState } from "react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import { useCartContext } from "../../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import InputSelect from "../InputSelect/InputSelect";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { DetailDatePicker } from "./DetailDatePicker/DetailDatePicker";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Carousel from "../Carousel/Carousel";
import swal from "sweetalert";
// eslint-disable-next-line
import  {Mapa}  from "../MapBoxGL/MapBox"


export const ExcursionDetail = () => {
  const [item, setItem] = useState({}); //Estado para construir item y agregarlo al carrito
  const [stock, setStock] = useState("0");
  const { id } = useParams();

  const { user } = useAuth0();

  const [disabled, setDisabled] = useState(true);
  // eslint-disable-next-line
  const { excursionByid, getExcursionById, getAllOrders } = useExcursionsContext();
  const { addItemToCart } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    getExcursionById(id);
    return () => {
      //componentWillUnmount, para resetear el item cuando se fueran del detalle de la excursión.
      setItem((prevState) => {
        return {};
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        .then((resp) => {
          if (resp.data > 0) {
            return setStock(resp.data);
          } else {
            return setStock(0);
          }
        })
        .catch((e) => {
          return (setStock(0), setDisabled(true))
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  //Handles que construyen el item que se enviara a la ruta del back addCart
  const handleQuantity = (e) => {
    setItem((prevState) => {
      if (e.target.value <= stock && e.target.value > 0) {
        setDisabled(false);
      }
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
    if (!user) {
      swal({
        title: "Inicie Sesión",
        text: "Por favor inicie sesión para poder comprar",
        icon: "warning",
      });
    } else {
      addItemToCart({
        ...item,
        name: excursionByid.name,
        price: excursionByid.price,
        email: user?.email, //Aca en realidad iría el id del usuario
      });
      navigate("/excursiones");
    }
  };
  
  return (
    <div className="md:flex items-start justify-center py-2 px-2">
      <div
        className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden"
        style={{ display: "flex" }}
      >
        {excursionByid && <Carousel Images={excursionByid.Images} />}
      </div>

      <div className="md:w-3/5 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-3">
          <p className="text-sm leading-none text-gray-600">
            {excursionByid?.location}
          </p>
          <h1 className=" lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
            {excursionByid?.name}
          </h1>
        </div>
        <div className="inline-flex w-full mb-2 border-b border-gray-200 items-center justify-start">
          <div className="py-2 border-r border-l border-gray-200 flex items-center justify-around w-1/3">
            <p className="text-base leading-4 text-gray-800">Dia:</p>
            <DetailDatePicker
              handleDate={handleDate}
              excursionDays={excursionByid?.date}
            />
          </div>
          <div className="py-2 border-r border-gray-200 flex items-center justify-around w-1/3">
            <p className="text-base leading-4 text-gray-800">Hora:</p>
            {excursionByid?.time && (
              <InputSelect
                handleTime={handleTime}
                options={excursionByid?.time}
              />
            )}
          </div>
          <div className="py-2 border-r border-gray-200 flex items-center justify-around w-1/3">
            <p className="text-base leading-4 text-gray-800">Personas:</p>
            <input
              onChange={(e) => handleQuantity(e)}
              type="number"
              name="quantity"
              min={0}
              max={6}
              className="shadow-md text-center rounded-md h-9 w-1/3"
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <div>
          <p className="max-h-72 overflow-y-scroll text-sm lg:leading-tight leading-normal text-gray-600 mt-0">
            {excursionByid?.description}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            Tipo de Excursión: {excursionByid?.excursionType}
          </p>
          <p className="text-base leading-4 mt-3 text-gray-600">
            Extra: {excursionByid?.extra}
          </p>
          <p className="text-base font-bold leading-4 mt-3 mb-3 text-gray-600">
            $ {excursionByid?.price}
          </p>
          <p className="text-base font-bold leading-4 mt-3 mb-3 text-gray-600">
            Stock: {stock}
          </p>
        </div>
        <button
          className="
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
          text-base flex items-center justify-center leading-none text-white
          bg-gray-800 w-full py-4 hover:bg-gray-700"
          //Disabled, deshabilita el botón cuando el stock es 0.
          disabled={disabled}
          onClick={() => handleClick()}
        >
          Agregar al Carrito
          <ShoppingCartIcon className="w-5 h-5 ml-1" />
        </button>
      </div>
      
      <Mapa
       lat={excursionByid?.lat}
       long= {excursionByid?.long}
      />
    </div>
  );
};
