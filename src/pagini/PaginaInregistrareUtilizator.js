import React from "react";

export class PaginaInregistrareUtilizator extends React.Component {

    render() {
        return (
            <div>
                <h1>Inregistrare</h1>
                <div>
                    <input placeholder="Numele afisat" />
                </div>
                <div>
                    <input placeholder="Numele utilizatorului" />
                </div>
                <div>
                    <input placeholder="Parola" type="password" />
                </div>
                <div>
                    <input placeholder="Repeta parola" type="password" />
                </div>
                <div>
                    <button> Inregistrare </button>
                </div>
            </div>
        )
    }

}

export default PaginaInregistrareUtilizator;