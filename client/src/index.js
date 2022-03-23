import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./input.css";
import { ExcursionsProvider } from "./context/ExcursionsContext";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./Auth0Provider/auth0Provider";
import 'mapbox-gl/dist/mapbox-gl.css';
import { CartProvider } from "./context/CartContext";
import axios from "axios";

// import dotenv from "dotenv";
// dotenv.config();

axios.defaults.baseURL = "https://excursionapp-pg.herokuapp.com" || "http://localhost:3001";


ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <CartProvider>
        <ExcursionsProvider>
          <App />
        </ExcursionsProvider>
      </CartProvider>
    </Auth0ProviderWithHistory>
  </Router>,

  document.getElementById("root")
);
