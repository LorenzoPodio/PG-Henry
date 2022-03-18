import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./input.css";
import { ExcursionsProvider } from "./context/ExcursionsContext";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./Auth0Provider/auth0Provider";
import { CartProvider } from "./context/CartContext";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "";


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
