import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { PaginaInregistrareUtilizator } 
  from "./pagini/PaginaInregistrareUtilizator"
import * as apeluriAPI from "./api/apeluriAPI";

const actiuni = {
  postInregistrare: apeluriAPI.inregistrare
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PaginaInregistrareUtilizator actiuni = {actiuni} />
  </React.StrictMode>
);

reportWebVitals();
