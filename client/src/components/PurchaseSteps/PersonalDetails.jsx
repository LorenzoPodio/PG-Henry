import "./PersonalDetails.css"
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import swal from "sweetalert";

export default function PersonalDetails({ handleClick }) {
  const { user } = useAuth0();
  const { submitDates, users} = useExcursionsContext();
  // eslint-disable-next-line
  const [errors, setErrors] = useState({});
  let usuario = {}
  usuario = users?.find((u) => u.email === user?.email)
  const [input, setInput] = useState({
    name: usuario?.name,
    lastName: usuario?.lastName,
    dni: usuario?.dni? usuario?.dni : "",
    email: usuario?.email,
    adress: usuario?.adress? usuario.adress : ""
  });

  function isObjEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
  
    return true;
  }
  
  let check = isObjEmpty(usuario)

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name] : e.target.value,
    })
  }

  function handleSubmit (e) {
    if(input.dni.length === 0 
      ||
      input.dni.length > 8 ||
      input.adress.length <= 0
      ){
        e.preventDefault();
        swal(
          {
            icon: "error",
            text: "Complete todos los campos para continuar"
          }
        )
      }else{
        e.preventDefault();
        submitDates(input);        
        handleClick("Payment")
      }
  }
  if(check){
    isObjEmpty(usuario)
    return (
      <div className="flex justify-around">
        <img
          src="https://images-ext-2.discordapp.net/external/S7R7Qin6kKgo0g7H0nWwPt_d14InMHmmfDpGpMnh27M/https/res.cloudinary.com/dkdioyppw/image/upload/v1647458886/trekking-adventure-himachal_vp0rka.gif"
          alt="loading"
        />
      </div>
    );
    
  }
  else {
  return (
    <div>
      <div className="container1">
        <div className="card">
          {/* {<div>
          <img src={"/"} alt="nf" />
        </div>} */}
          <div className="bienvenidos">
            <h2 className="h2-reg">Complete los datos para su compra </h2>
          </div>
          <form className="formR" onSubmit={(e) => handleSubmit(e)}>
            <div>
              
              <div>
                <input
                  id="inpt_reg_new"
                  type="text"
                  placeholder="Nombre"
                  value={input.name}
                  name="name"                  
                  className="bg-black-100 border border-black-100 text-blackk-100 text-blackounded-lg focus:ring-black-100 focus:border-black-100 block w-full p-2.5 cursor-not-allowed dark:bg-black-100 dark:border-black-100 dark:placeholder-black-100 dark:text-black-100 dark:focus:ring-black-100 dark:focus:border-black-100"
                  disabled
                />
              </div>
              <input
              className="bg-black-100 border border-black-100 text-blackk-100 text-blackounded-lg focus:ring-black-100 focus:border-black-100 block w-full p-2.5 cursor-not-allowed dark:bg-black-100 dark:border-black-100 dark:placeholder-black-100 dark:text-black-100 dark:focus:ring-black-100 dark:focus:border-black-100"
                id="inpt_reg_new2"
                type="text"
                placeholder="Apellido"
                value={input.lastName}
                name="lastName"                
                disabled
              />
            </div>
            <div className=" py-2">
              <input
              className="bg-black-100 border border-black-100 text-blackk-100 focus:ring-black-100 focus:border-black-100 block w-full p-2.5 dark:bg-black-100 dark:border-black-100 dark:placeholder-black-100 dark:text-black-100 dark:focus:ring-black-100 dark:focus:border-black-100"
                id="inpt_reg_new3"
                type="text"
                maxlength="10"
                placeholder="DNI (Solo Numeros)"
                value={input.dni}
                name="dni"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.dni && <p className="errorMsg">{errors.dni}</p>}
            <div className=" py-2">
              <input
                id="inpt_reg_new4"
                type="text"
                placeholder="Mail"
                value={input.email}
                name="email"
                readOnly
                className="bg-black-100 border border-black-100 text-blackk-100 text-blackounded-lg focus:ring-black-100 focus:border-black-100 block w-full p-2.5 cursor-not-allowed dark:bg-black-100 dark:border-black-100 dark:placeholder-black-100 dark:text-black-100 dark:focus:ring-black-100 dark:focus:border-black-100"
                  disabled
              />
            </div>

            <div className=" py-2">
              <input
                id="inpt_reg_new5"
                type="text"
                placeholder="Direccion"
                value={input.adress}
                name="adress"
                onChange={(e) => handleChange(e)}
                className="bg-black-100 border border-black-100 text-blackk-100 focus:ring-black-100 focus:border-black-100 block w-full p-2.5 dark:bg-black-100 dark:border-black-100 dark:placeholder-black-100 dark:text-black-100 dark:focus:ring-black-100 dark:focus:border-black-100"
              />
            </div>
            {errors.adress && <p className="errorMsg">{errors.adress}</p>}
            <div className="botonesReg py-4">
              <div className="flex flex-row w-fit m-1">
                <span className=" px-6  hidden content-end sm:block mb-10 mt-5">
                  <button
                    onClick={() => handleClick("OrderReview")}
                    type="button"
                    className="inline-flex items-center px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Volver
                  </button>
                </span>
                <span className="hidden content-end sm:block mb-10 mt-5">
                  <button
                    value="Submit"
                    type="submit"                   
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Continuar
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
}