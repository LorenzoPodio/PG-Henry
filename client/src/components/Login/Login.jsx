import React from "react";
import { Link } from "react-router-dom";
//import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
//import { useAuth0 } from "@auth0/auth0-react";
//import { login_validate } from '../../actions'
//import Cookies from 'universal-cookie';
//import swal from 'sweetalert';
import './Login.css'


export default function Login() {

    //const cookies = new Cookies();
    //const dispatch = useDispatch();
    //const cliente = useSelector((state) => state.cliente);
    const regExEmail = /^\S+@\S+$/i;
    const [errors, setErrors] = useState({});
    //const { loginWithRedirect, user } = useAuth0();
    //const [loggeado, setLoggeado] = useState({ "logged": false });
    const [input, setInput] = useState({
        email: '',
        password: '',
    });


   function handleSubmit(e){
       e.preventDefault(e)
    console.log(input)
   }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function validate(input) {
        const errors = {};
        if (!input.email || !regExEmail.test(input.email)) {
            errors.email = '*E-mail requerido (ejemplo@ejemplo.com)';
        }
        if (!input.password) {
            errors.password = '*Contrasena requerida ';
        }
        return errors;
    }

    function handleCheckbox(e) {
        const pwd = document.getElementById('password');
        if (e.target.checked) {
            pwd.type = "text";
        }
        else pwd.type = "password";

    }

    return (
        <div className="cont">
                <form className="cont2" onSubmit={(e) => handleSubmit(e)}>

                    <div>
                        {/* {<div>
                            <Link to='/'>
                                <img className="imglogin" src={""} alt="nf" />
                            </Link>
                        </div>} */}
                    </div>

                    <div>
                        <div>
                            <h2>Bienvenido</h2>
                            <p className="desclogin">Inicie sesion para continuar..</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <input
                                type='text'
                                placeholder="Dirección de email"
                                id="username"
                                className={errors.email ? "inptwr" : "inpt"}
                                value={input.email}
                                name='email'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.email && (
                                <p className='errorNotWrtd' >{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div>
                            <input
                                type='password'
                                placeholder="Contraseña"
                                name='password'
                                id="password"
                                className={errors.password ? "inptwr" : "inpt"}
                                value={input.password}
                                onChange={(e) => handleChange(e)}
                            />
                            <br></br>
                            <input className="checkbocshowpass" type='checkbox' onChange={(e) => handleCheckbox(e)} />
                            <p className="showpass">Mostrar Contraseña</p>
                            {errors.password && (
                                <p className='errorNotWrtd' >{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div>
                            <a className="noaccreg" href="/forgotpassword">Olvidaste tu contraseña?</a>
                        </div>
                    </div>

                    <div>
                        <div>
                            <button
                                type="submit"
                                className={errors.username || errors.password ? "btnlogincontinueBlocked" : "btnlogincontinue"}
                            >Continuar
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="contflex">
                            <p className="noaccreg">No tienes cuenta? </p>
                            <a className="noaccreg" href="/registro">Regístrate</a>
                            <p className="noaccreg"> ━ o ━ </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Link to={'/'}>
                                <button className="btnloginback">Volver a inicio</button>
                            </Link>
                        </div>
                    </div>
                </form>
        </div>
    )
}



