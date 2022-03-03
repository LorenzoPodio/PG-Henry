import "./Register.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { registrarCliente, getClients } from "../../actions/index";
import swal from "sweetalert";


export default function Register() {
  

  //const dispatch = useDispatch();
  //const clientes = useSelector((state) => state.clientes);
  const clientes = [{}]
  const regExName = /^[A-Za-z][a-zA-Z ]{2,40}$/;
  const regExEmail = /^\S+@\S+$/i;
  const [registrado, setregistrado] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    password: "",
    adress: "",
  });

  const [pass, setPass] = useState({
    pass1: "",
    pass2: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    // setErrors(validate({
    //   ...input,
    //   [e.target.name]: e.target.value
    // }));


    
    // for (let i = 0; i < clientes.length; i++) {
    //   if (clientes[i].email === input.email || clientes[i].dni === input.dni) {
    //     swal(
    //       "Error",
    //       "El mail ya corresponde a un usuario registrado",
    //       "warning"
    //     );
    //     setregistrado(true);
    //     break;
    //   }
    // }
    const arr = clientes.filter( d => d.email ===input.email || d.dni === input.dni)
    if(arr.length!==0){
      swal( "Error", "El mail o Dni ya corresponde a un usuario registrado", "warning" );
    }else{

      setInput({
        ...input,password:pass.pass1})
      if (Object.values(validate(input)).length === 0) {
          console.log(input);
        //dispatch(registrarCliente(input));
        swal( "Usuario Creado con exito", "En instantes seras redirigido para iniciar sesion", "success" );
        //setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        swal("Error", "Revisa los errores antes de continuar", "error");
      }
    }
  }

  function validate() {
    let errors = {};
    if (!input.name || input.name === "" || !regExName.test(input.name)) {
      errors.name = "Nombre requerido, hasta 40 caracteres";
    }
    if (
      !input.lastname ||
      input.lastname === "" ||
      !regExName.test(input.lastname)
    ) {
      errors.lastname = "Apellido requerido";
    }
    if (
      !input.dni ||
      input.dni === "" ||
      typeof input.dni === "number" ||
      input.dni.length < 7 ||
      input.dni.length > 9
    ) {
      errors.dni = "DNI requerido";
    }
    if (!input.email || input.email === "" || !regExEmail.test(input.email)) {
      errors.email = "Campo Requerido: ejemplo@mail.com";
    }
    if (
      !pass.pass1 ||
      pass.pass1 === "" ||
      pass.pass1.length < 7 ||
      pass.pass1.length > 30
    ) {
      errors.pass1 = "Contraseña mayor a 7 digitos";
    }
    if (
      !pass.pass2 ||
      pass.pass2 === "" ||
      pass.pass2.length < 7 ||
      pass.pass2.length > 30
    ) {
      errors.pass2 = "Contraseña mayor a 7 digitos";
    }
    if (
      !input.adress ||
      input.adress === "" ||
      input.adress.length < 3 ||
      input.adress.length > 50
    ) {
      errors.adress = "Direccion requerida";
    }
    if (pass.pass1 !== pass.pass2) {
      errors.pass = "Las contraseñas no coinciden";
    }
    return errors;
  }

  function handleChange(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChango(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      password: pass.pass1,
    });
    setPass({
      ...pass,
      [e.target.name]: e.target.value,
    });
  }
  // useEffect(() => {
  //   if(pass.pass1 !== "" && pass.pass2 !== ""){
  //   if(pass.pass1 === pass.pass2){
  //     setInput({...input, passowrd: pass.pass1})
  //   }}
  // }, [pass])
  return (
    <div>
      <div class="container1">
        <div>
          <img src={"/"} alt="nf" />
        </div>
        <div>
          <div>
            <h2>Bienvenido</h2>
            <p>
              Complete el formulario para continuar..
            </p>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div >
            <div >
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
          {errors.name && (
            <p className="errorMsg" id="error_en_reg">
              {errors.name}
            </p>
          )}

          <div>
            <div>
              <input
                id="inpt_reg_new"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Apellido"
                value={input.lastname}
                name="lastname"
              />
            </div>
          </div>
          {errors.lastname && (
            <p className="errorMsg" id="error_en_reg">
              {errors.lastname}
            </p>
          )}

          <div>
            <div>
              <input
                id="inpt_reg_new"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="DNI  (Solo Numeros)"
                value={input.dni}
                name="dni"
              />
            </div>
          </div>
          {errors.dni && (
            <p id="error_en_reg" className="errorMsg">
              {errors.dni}
            </p>
          )}
          <div>
            <div>
              <input
                id="inpt_reg_new"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Mail"
                value={input.email}
                name="email"
              />
            </div>
          </div>
          {errors.email && (
            <p className="errorMsg" id="error_en_reg">
              {errors.email}
            </p>
          )}

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
          {errors.pass1 && (
            <p className="errorMsg" id="error_en_reg">
              {errors.pass1}
            </p>
          )}
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
          {errors.pass && (
            <p className="errorMsg" id="error_en_reg">
              {errors.pass}
            </p>
          )}
          <div>
            <div>
              <input
                id="inpt_reg_new"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Direccion"
                value={input.adress}
                name="adress"
              />
            </div>
          </div>
          {errors.adress && (
            <p className="errorMsg" id="error_en_reg">
              {errors.adress}
            </p>
          )}
          <button
            id="reg_cont_lg"
            value="Submit"
            type="submit"
          >
            Registrarse
          </button>
          <div>
            <div>
              <Link to={"/"}>
                <button>Volver a inicio</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
