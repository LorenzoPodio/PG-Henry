import React, { useState } from "react";
import swal from "sweetalert";
import { useExcursionsContext } from "../../context/ExcursionsContext"



function ContactUs() {

  const { contactUs } = useExcursionsContext();
  const [input, setInput] = useState({
    name: "",
    emailUs: "",
    text: ""
  });

  function handleChange(e) {
    setInput(() => {
      return {
        ...input,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit (e) {
    if(!input.emailUs || !input.text || !input.name){
      e.preventDefault();
      swal({
        title: "Complete todos los campos",
        icon: "error"
      })
    } else{
      e.preventDefault();
      contactUs(input)
      swal({
        title:"Consulta enviada",
        icon: "success",
        text: "Gracias por su consulta, verifique su correo le enviamos una copia de la misma"
      })
     setInput({
      name: "",
      emailUs: "",
      text: ""
     })
    }
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md w-96 ">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-6">
          <input
            type="text"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="email"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="email"
            name="emailUs"
            placeholder="Correo"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mb-6">
          <textarea
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="text"
            name="text"
            rows="3"
            placeholder="Mensaje"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          type="submit"
          className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
export default ContactUs;
