import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

export function NavBar() {

    return (
        <div className="navBar-container">

            <div className='landing-link'>
                <div className='logotipo'></div>
                <Link
                    style={{ textDecoration: "none", color: "white", paddingLeft: "10px" }} to={"/Home"}>
                    ExcursionApp
                </Link>
            </div>

            <div className='links-nav' >

                <div className='link-home'>
                    <Link
                        style={{ textDecoration: "none", color: "white" }} to={"/Excursiones"}>
                        Excursiones
                    </Link>
                </div>
                
                <div className='link-tarifas'>
                    <Link
                        style={{ textDecoration: "none", color: "white" }} to={"/Tarifas"}>
                        Tarifas
                    </Link>
                </div>
                
                <div className='link-about'>
                    <Link
                        style={{ textDecoration: "none", color: "white" }} to="/About">
                        Sobre Nosotros
                    </Link>
                </div>
                <div className='link-mis-compras'>
                    <Link
                        style={{ textDecoration: "none", color: "white" }} to={"/Compras"}>
                        Mis Compras
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

{/* <a href="https://icons8.com/icon/SJCdlyRdIqKV/airplane">Airplane icon by Icons8</a> */}