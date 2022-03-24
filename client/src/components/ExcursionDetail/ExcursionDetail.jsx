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
import { Mapa } from "../MapBoxGL/MapBox";
import { Testimonials } from "../Testimonials/Testimonials";

export const ExcursionDetail = () => {
  const [item, setItem] = useState({}); //Estado para construir item y agregarlo al carrito
  const [stock, setStock] = useState("0");
  const { id } = useParams();

  const { user } = useAuth0();

  const [disabled, setDisabled] = useState(true);

  const { excursionByid, getExcursionById, isBanned } = useExcursionsContext();

  const { addItemToCart } = useCartContext();
  const navigate = useNavigate();
  console.log(excursionByid, "HOLAAAAAAAAAAAAAAA");
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
          return setStock(0), setDisabled(true);
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
    <div style={{ backgroundColor: "#D8D2CB" }}>
      <div className="flex justify-center text-center mx-auto py-7">
        <div className="w-auto">
          <h1 className="grid rounded-md shadow-lg shadow-gray-500 px-5 py-3 text-white bg-sky-600">
            <span className="text-sm font-medium tracking-wider">
              {excursionByid?.location}
            </span>
            <span className="text-2xl font-semibold">
              {excursionByid?.name}
            </span>
          </h1>
        </div>
      </div>
      <div
        className="md:flex m-8 mt-0 p-4 shadow-lg shadow-gray-500 rounded-lg"
        style={{ backgroundColor: "#EEEEEE" }}
      >
        <div className="flex flex-col justify-around items-center w-2/5">
          {excursionByid && <Carousel Images={excursionByid.Images} />}
          <div className="flex p-4 justify-center">
            <Mapa lat={excursionByid?.lat} long={excursionByid?.long} />
          </div>
        </div>
        <div className="md:w-3/5 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="inline-flex w-full mb-2 border-b border-gray-200 items-center justify-start">
            <div className="py-2 pr-2 border-r border-l border-gray-200 flex items-center w-1/3">
              <p className="text-base leading-4 text-gray-800 m-2">Dia:</p>
              <DetailDatePicker
                handleDate={handleDate}
                excursionDays={excursionByid?.date}
              />
            </div>
            <div className="py-2 pr-2 border-r border-gray-200 flex items-center w-1/3">
              <p className="text-base leading-4 text-gray-800 m-2">Hora:</p>
              {excursionByid?.time && (
                <InputSelect
                  handleTime={handleTime}
                  options={excursionByid?.time}
                />
              )}
            </div>
            <div className="py-2 pr-2 border-r border-gray-200 flex items-center w-1/3">
              <p className="text-base leading-4 text-gray-800 m-2">Personas:</p>
              <input
                onChange={(e) => handleQuantity(e)}
                type="number"
                name="quantity"
                min={0}
                max={6}
                className="shadow-lg shadow-gray-500 hover:shadow-black text-center rounded-md h-9 w-1/3"
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

          {!isBanned && (
            <button
              className=" rounded-md shadow-lg shadow-gray-500 hover:shadow-black
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
            text-base flex items-center justify-center leading-none text-white
            bg-gray-700 w-full py-4 hover:bg-gray-800 hover:cursor-pointer"
              //Disabled, deshabilita el botón cuando el stock es 0.
              disabled={disabled}
              onClick={() => handleClick()}
            >
              Agregar al Carrito
              <ShoppingCartIcon className="w-5 h-5 ml-1" />
            </button>
          )}
          <div className="flex pt-10">
            <Testimonials id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
