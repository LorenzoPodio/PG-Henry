import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import swal from "sweetalert";

export default function PersonalDetails({ handleClick }) {
  const { user } = useAuth0();
  const { submitDates, users } = useExcursionsContext();
  // eslint-disable-next-line
  const [errors, setErrors] = useState({});
  let usuario = {}
  usuario = users?.find((u) => u.email === user?.email)
  const [input, setInput] = useState({
    name: usuario?.name,
    lastName: usuario?.lastName,
    dni: usuario?.dni ? usuario?.dni : "",
    email: usuario?.email,
    adress: usuario?.adress ? usuario.adress : ""
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
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    if (input.dni.length === 0
      ||
      input.dni.length > 8 ||
      input.adress.length <= 0
    ) {
      e.preventDefault();
      swal(
        {
          icon: "error",
          text: "Complete todos los campos para continuar"
        }
      )
    } else {
      e.preventDefault();
      submitDates(input);
      handleClick("Payment")
    }
  }
  if (check) {
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
      <div style={{ backgroundColor: '#D8D2CB' }}>
        <div className="flex justify-center text-center mx-auto py-5">
          <div className="w-96">
            <h1 className="grid rounded-md shadow-lg shadow-gray-500 px-3 py-3 text-white bg-sky-600 font-bold text-xl">
              COMPLETE EL FORMULARIO PARA CONTINUAR SU COMPRA
            </h1>
          </div>
        </div>
        <div className="flex justify-center py-5" style={{ backgroundColor: '#D8D2CB' }}>
          <div className="flex flex-col w-1/3">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
              <div className="py-6  inline-block sm:px-6 lg:px-8 w-full text-center">
                <div className="shadow-lg shadow-gray-500 overflow-hidden border-b border-gray-200 sm:rounded-lg w-full">
                  <form style={{ backgroundColor: '#EEEEEE' }} onSubmit={(e) => handleSubmit(e)}
                    className='w-full py-2'
                  >
                    <h1 className="font-semibold text-lg">
                      DATOS PERSONALES:
                    </h1>
                    <div>
                      <div>
                        <input id="inpt_reg_new" type="text" placeholder="Nombre" value={input.name} name="name" disabled
                          className="bg-white m-2 w-3/5 h-10 p-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black font-semibold"
                        />
                      </div>
                      <input id="inpt_reg_new2" type="text" placeholder="Apellido" value={input.lastName} name="lastName" disabled
                        className="bg-white m-2 w-3/5 h-10 p-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black font-semibold"
                      />
                    </div>
                    <div>
                      <input id="inpt_reg_new3" type="text" maxLength="10" placeholder="DNI (Solo Numeros)" value={input.dni} name="dni" onChange={(e) => handleChange(e)}
                        className="bg-white m-2 w-3/5 h-10 p-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black font-semibold"
                      />
                    </div>
                    {errors.dni && <p className="errorMsg">{errors.dni}</p>}
                    <div>
                      <input id="inpt_reg_new4" type="text" placeholder="Mail" value={input.email} name="email" readOnly disabled
                        className="bg-white m-2 w-3/5 h-10 p-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black font-semibold"
                      />
                    </div>
                    <div>
                      <input id="inpt_reg_new5" type="text" placeholder="Direccion" value={input.adress} name="adress" onChange={(e) => handleChange(e)}
                        className="bg-white m-2 w-3/5 h-10 p-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black font-semibold"
                      />
                    </div>
                    {errors.adress && <p className="errorMsg">{errors.adress}</p>}
                    <div className="text-center py-2">
                      <div className="flex justify-around">
                        <button onClick={() => handleClick("OrderReview")} type="button"
                          className="px-7 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Volver
                        </button>
                        <button value="Submit" type="submit"
                          className="px-4 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}