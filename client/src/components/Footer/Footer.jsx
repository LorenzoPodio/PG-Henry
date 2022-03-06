
import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
import "./Footer.css";


export const Footer = () => {
  


    return (
        <div className="footer-container bg-sky-600">
          <div className="social-container">
          
          <p className="text">Realizado por Henry´s Students. Todos los derechos reservados</p>
          </div>
          <div className="social-container">
          <div className="social"><SocialIcon url="https://facebook.com" /></div>
          <div className="social"><SocialIcon  url="https://twitter.com" /></div>
          <div className="social"><SocialIcon url="https://google.com" /></div>
          <div className="social"><SocialIcon url="instagram.com" /></div>
          <div className="social"><SocialIcon url="https://www.linkedin.com/" /></div>
          <div className="social"><SocialIcon url="https://github.com/LorenzoPodio/PG-Henry" /></div>
          </div>
        </div>
    );
};
