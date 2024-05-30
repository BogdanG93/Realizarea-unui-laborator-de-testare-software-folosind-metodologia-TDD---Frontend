import React from 'react'; // importam biblioteca react
import ReactDOM from 'react-dom/client'; // importam reactdom pentru randarea aplicatiei
import './index.css'; // importam fisierul css pentru stiluri globale
import reportWebVitals from './reportWebVitals'; // importam functia pentru raportarea performantelor aplicatiei
import { PaginaInregistrareUtilizator } from "./pagini/PaginaInregistrareUtilizator"; // importam componenta paginainregistrareutilizator
import * as apeluriAPI from "./api/apeluriAPI"; // importam toate functiile din modulul apeluriapi

// definim un obiect de actiuni care contine functia postinregistrare
const actiuni = {
  postInregistrare: apeluriAPI.inregistrare // mapam functia de inregistrare din apeluriapi la postinregistrare
}

// obtinem radacina (root) aplicatiei si o legam de elementul html cu id-ul 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// randam componenta paginainregistrareutilizator in modul strict pentru a activa verificarile suplimentare
root.render(
  <React.StrictMode>
    <PaginaInregistrareUtilizator actiuni={actiuni} />
  </React.StrictMode>
);

// apelam functia reportwebvitals pentru a incepe masurarea performantelor aplicatiei
reportWebVitals();
