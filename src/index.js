import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { PaginaInregistrareUtilizator } 
  from "./pagini/PaginaInregistrareUtilizator"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PaginaInregistrareUtilizator />
  </React.StrictMode>
);

reportWebVitals();
