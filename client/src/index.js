import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./input.css";
import { ExcursionsProvider } from "./context/ExcursionsContext";
import { BrowserRouter as Router } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

ReactDOM.render(
  <CartProvider>
    <ExcursionsProvider>
      <Router>
        <App />
      </Router>
    </ExcursionsProvider>
  </CartProvider>,

  document.getElementById("root")
);
