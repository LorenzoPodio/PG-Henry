import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ExcursionesProvider } from './context/ExcursionesContext';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ExcursionesProvider>
    <Router>
      <App />
    </Router>
  </ExcursionesProvider>,
  document.getElementById('root')
);

