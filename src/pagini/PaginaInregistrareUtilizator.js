import React from "react";
import Input from "../componente/Input";

export class PaginaInregistrareUtilizator extends React.Component {

    state = {
        numeAfisare: "",
        numeUtilizator: "",
        parola: "",
        repetareParola: "",
        apelApiInAsteptare: false,
        erori: {},
        repetareParolaConfirmat: true
    };

    laSchimbareNumeAfisare = (event) => {
        const valoare = event.target.value;
        const erori = {...this.state.erori};
        delete erori.numeAfisare;
        this.setState({numeAfisare: valoare, erori});
    }

    laSchimbareNumeUtilizator = (event) => {
        const valoare = event.target.value;
        const erori = {...this.state.erori};
        delete erori.numeUtilizator;
        this.setState({numeUtilizator: valoare, erori});
    }

    laSchimbareParola = (event) => {
        const valoare = event.target.value;
        const repetareParolaConfirmat = this.state.repetareParola === valoare;
        const erori = {...this.state.erori}
        delete erori.parola;    
        erori.repetareParola = repetareParolaConfirmat ? "": "Parolele nu corespund";
        this.setState({parola: valoare, repetareParolaConfirmat, erori});
    }

    laSchimbareRepetareParola = (event) => {
        const valoare = event.target.value;
        const repetareParolaConfirmat = this.state.parola === valoare;
        const erori = {...this.state.erori}
        erori.repetareParola = repetareParolaConfirmat ? "": "Parolele nu corespund";
        this.setState({repetareParola: valoare, repetareParolaConfirmat, erori});
    }

    laApasareaButonuluiInregistrare = () => {
        const utilizator = {
            numeAfisare: this.state.numeAfisare,
            numeUtilizator: this.state.numeUtilizator,
            parola: this.state.parola
        }
        this.setState({apelApiInAsteptare: true});
        this.props.actiuni.postInregistrare(utilizator).then(response => {
            this.setState({apelApiInAsteptare: false});
        })
        .catch((eroareApi) => {
            let erori = {...this.state.erori}
            if(eroareApi.response.data && eroareApi.response.data.eroriValidare) {
                erori = {...eroareApi.response.data.eroriValidare}
            }
            this.setState({apelApiInAsteptare: false, erori});
        })
    }


    render() {
        return (
            <div className="container">
                <h1 className="text-center">Inregistrare</h1>
                <div className="col-12 mb-3">
                    <Input 
                        label="Nume afisat"
                        placeholder="Numele care va fi afisat" 
                        value={this.state.numeAfisare}
                        onChange={this.laSchimbareNumeAfisare} 
                        hasError={this.state.erori.numeAfisare && true}
                        error={this.state.erori.numeAfisare}  
                    />

                </div>
                <div className="col-12 mb-3">
                <Input 
                        label="Nume utilizator"
                        placeholder="Numele utilizatorului" 
                        value={this.state.numeUtilizator}
                        onChange={this.laSchimbareNumeUtilizator}
                        hasError={this.state.erori.numeUtilizator && true}
                        error={this.state.erori.numeUtilizator} 
                    />
                </div>

                <div className="col-12 mb-3">
                    <Input 
                        label="Parola"
                        placeholder="Parola aleasa" 
                        type="password" 
                        value={this.state.parola} 
                        onChange={this.laSchimbareParola}
                        hasError={this.state.erori.parola && true}
                        error={this.state.erori.parola} 
                    />

                </div>
                <div className="col-12 mb-3">
                    <Input 
                        label="Repeta parola"
                        placeholder="Repeta parola aleasa" 
                        type="password" 
                        value={this.state.repetareParola} 
                        onChange={this.laSchimbareRepetareParola}
                        hasError={this.state.erori.repetareParola && true}
                        error={this.state.erori.repetareParola} 
                    />
                </div>

                <div className="text-center">
                    <button 
                    className="btn btn-primary" 
                    onClick={this.laApasareaButonuluiInregistrare} 
                    disabled={this.state.apelApiInAsteptare || !this.state.repetareParolaConfirmat}
                    >
                    {this.state.apelApiInAsteptare && (
                        <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    Inregistrare 
                    </button>
                </div>
            </div>
        )
    }

}

PaginaInregistrareUtilizator.defaultProps = {
    actiuni: {
        postInregistrare: () => 
            new Promise((resolve, reject) => {
                resolve({});
            })
    }
};

export default PaginaInregistrareUtilizator;