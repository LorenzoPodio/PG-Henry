import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./input.css";
import { ExcursionsProvider } from "./context/ExcursionsContext";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./Auth0Provider/auth0Provider";

import { CartProvider } from "./context/CartContext";

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
