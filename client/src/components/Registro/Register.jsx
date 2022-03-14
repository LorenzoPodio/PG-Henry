import "./Register.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import validate from "./validate";

export default function Register({handleClick}) {
  const { addUser, users } = useExcursionsContext();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    adress: "",
  });

  const [pass, setPass] = useState({
    pass1: "",
    pass2: "",
  });

  const admins = users; //traerme users

  function handleSubmit(e) {
    e.preventDefault();


     setErrors(validate({
       ...input,
       [e.target.name]: e.target.value
     }));
    const arr = admins.filter(
      (d) => d.email === input.email || d.dni === input.dni
    );
    if (arr.length !== 0) {
      swal(
        "Error",
        "El mail o Dni ya corresponde a un usuario registrado",
        "warning"
      );
 

      if (Object.values(validate(input, pass)).length === 0) {
        addUser(input);
        swal(
          "Usuario Creado con exito",
          "En instantes seras redirigido para iniciar sesion",
          "success"
        );
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        swal("Error", "Revisa los errores antes de continuar", "error");
      }
    }
  }

  function handleChange(e) {
    setErrors((prevState) =>
      validate({ ...input, [e.target.name]: e.target.value }, { ...pass })
    );
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleChango(e) {
    setErrors((prevState) =>
      validate(
        { ...input, password: pass.pass1 },
        { ...pass, [e.target.name]: e.target.value }
      )
    );
    setInput((prevState) => {
      return {
        ...prevState,
        password: pass.pass1,
      };
    });
    setPass((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    
  }, );

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
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Nombre"
                  value={input.name}
                  name="name"
                />
              </div>
            </div>
            {errors.name && <p className="errorMsg">{errors.name}</p>}

            <div >

              <input
                id="inpt_reg_new2"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Apellido"
                value={input.lastName}
                name="lastName"
              />
            </div>
            {errors.lastName && <p className="errorMsg">{errors.lastName}</p>}
            <div className=" py-2">

              <input
                id="inpt_reg_new3"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="DNI  (Solo Numeros)"
                value={input.dni}
                name="dni"
              />
            </div>
            {errors.dni && <p className="errorMsg">{errors.dni}</p>}
            <div className=" py-2">

              <input
                id="inpt_reg_new4"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Mail"
                value={input.email}
                name="email"
              />
            </div>
            {errors.email && <p className="errorMsg">{errors.email}</p>}
          
        
            
            <div className=" py-2">

              <input
                id="inpt_reg_new5"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Direccion"
                value={input.adress}
                name="adress"
              />
            </div>
            {errors.adress && <p className="errorMsg">{errors.adress}</p>}
            <div className="botonesReg py-4">
            <div className="flex flex-row w-fit m-1">
      <span className=" px-6  hidden content-end sm:block mb-10 mt-5">
            <button onClick={()=>handleClick("OrderReview")}
              type="button"
              className="inline-flex items-center px-7 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Volver 
            </button>
        </span>
      <span className="hidden content-end sm:block mb-10 mt-5">
            <button value="Submit" type="submit" onClick={()=>handleClick("Payment")}
              
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
