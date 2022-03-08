import "./Register.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useExcursionsContext } from "../../context/ExcursionsContext";
import validate from "./validate";

export default function Register() {
  const { addAdmin, userAdmins } = useExcursionsContext();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    password: "",
    adress: "",
  });

  const [pass, setPass] = useState({
    pass1: "",
    pass2: "",
  });

  const admins = userAdmins; //traerme userAdmins

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
    } else {
      setInput((prevState) => {
        return { ...prevState, password: pass.pass1 };
      });

      if (Object.values(validate(input, pass)).length === 0) {
        addAdmin(input);
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
    if (pass.pass1 !== "" && pass.pass2 !== "") {
      if (pass.pass1 === pass.pass2) {
        setInput({ ...input, passowrd: pass.pass1 });
      }
    }
  }, [pass]);

  return (
    <div>
      <div className="container1">
        <div className="card">
          {/* {<div>
          <img src={"/"} alt="nf" />
        </div>} */}
          <div className="bienvenidos">
            <h2 className="h2-reg">Bienvenido</h2>
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

            <div>

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
            <div>

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
            <div>

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
            <div>
              <div>
                <input
                  onChange={(e) => handleChango(e)}
                  type="password"
                  placeholder="Contraseña"
                  name="pass1"
                  value={pass.pass1}
                />
              </div>
            </div>
            {errors.pass1 && <p className="errorMsg">{errors.pass1}</p>}
            <div>
              <div>
                <input
                  onChange={(e) => handleChango(e)}
                  type="password"
                  placeholder="Confirme la contraseña"
                  name="pass2"
                  value={pass.pass2}
                />
              </div>
            </div>
            {errors.pass && <p className="errorMsg">{errors.pass}</p>}
            <div>

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
            <div className="botonesReg">
              <button className="botonRegistrar" value="Submit" type="submit">
                Registrarse
              </button>
              <button className="botonInicio">
                <Link to={"/"}>Volver a inicio</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
