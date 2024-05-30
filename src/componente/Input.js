import React from "react";

// componenta Input primeste proprietati si afiseaza un camp de input
const Input = (props) => {

    // initializam clasa CSS pentru input
    let inputClassName = "form-control";
    
    // adaugam clasa de validare sau eroare daca proprietatea hasError este definita
    if(props.hasError !== undefined) {
        inputClassName += props.hasError ? " is-invalid" : " is-valid";
    }

    return (
        <div>
            {/* afisam eticheta daca proprietatea label este definita */}
            {props.label && <label>{props.label}</label>}
            <input
                className={inputClassName} // setam clasa CSS pentru input
                type={props.type || "text"} // setam tipul input-ului, implicit text
                placeholder={props.placeholder} // setam placeholder-ul daca este definit
                value={props.value} // setam valoarea input-ului
                onChange={props.onChange} // setam callback-ul pentru schimbarea valorii input-ului
             />
             {/* afisam mesajul de eroare daca exista eroare */}
             {props.hasError && (
             <span className="invalid-feedback">{props.error}</span>
            )}
        </div>
    );
};

// setam valoarea implicita pentru proprietatea onChange, in cazul in care nu este definita
Input.defaultProps = {
    onChange: () => {}
}

// exportam componenta Input pentru a putea fi utilizata in alte fisiere
export default Input;
