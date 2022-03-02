import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ExcursionsProvider } from './context/ExcursionsContext';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ExcursionsProvider>
    <Router>
      <App />
    </Router>
  </ExcursionsProvider>,
  document.getElementById('root')
);

