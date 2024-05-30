import React from "react";
import Input from "../componente/Input";

// definim clasa PaginaInregistrareUtilizator care extinde React.Component
export class PaginaInregistrareUtilizator extends React.Component {

    // initializam starea componentelor
    state = {
        numeAfisare: "", // camp pentru numele afisat
        numeUtilizator: "", // camp pentru numele utilizatorului
        parola: "", // camp pentru parola
        repetareParola: "", // camp pentru repetarea parolei
        apelApiInAsteptare: false, // indicator pentru apelul api in curs
        erori: {}, // obiect pentru erorile de validare
        repetareParolaConfirmat: true // indicator pentru confirmarea parolei
    };

    // metoda pentru schimbarea numelui afisat
    laSchimbareNumeAfisare = (event) => {
        const valoare = event.target.value; // obtinem valoarea din input
        const erori = {...this.state.erori}; // copiem erorile existente
        delete erori.numeAfisare; // stergem eroarea pentru numele afisat
        this.setState({numeAfisare: valoare, erori}); // actualizam starea
    }

    // metoda pentru schimbarea numelui utilizatorului
    laSchimbareNumeUtilizator = (event) => {
        const valoare = event.target.value; // obtinem valoarea din input
        const erori = {...this.state.erori}; // copiem erorile existente
        delete erori.numeUtilizator; // stergem eroarea pentru numele utilizatorului
        this.setState({numeUtilizator: valoare, erori}); // actualizam starea
    }

    // metoda pentru schimbarea parolei
    laSchimbareParola = (event) => {
        const valoare = event.target.value; // obtinem valoarea din input
        const repetareParolaConfirmat = this.state.repetareParola === valoare; // verificam daca parola coincide cu repetarea parolei
        const erori = {...this.state.erori} // copiem erorile existente
        delete erori.parola; // stergem eroarea pentru parola  
        erori.repetareParola = repetareParolaConfirmat ? "": "Parolele nu corespund"; // setam eroarea pentru repetarea parolei daca nu corespunde
        this.setState({parola: valoare, repetareParolaConfirmat, erori}); // actualizam starea
    }

    // metoda pentru schimbarea repetarii parolei
    laSchimbareRepetareParola = (event) => {
        const valoare = event.target.value; // obtinem valoarea din input
        const repetareParolaConfirmat = this.state.parola === valoare; // verificam daca repetarea parolei coincide cu parola 
        const erori = {...this.state.erori} // copiem erorile existente
        erori.repetareParola = repetareParolaConfirmat ? "": "Parolele nu corespund"; // setam eroarea pentru repetarea parolei daca nu corespunde
        this.setState({repetareParola: valoare, repetareParolaConfirmat, erori}); // actualizam starea
    }

    // metoda la apasarea butonului de inregistrare
    laApasareaButonuluiInregistrare = () => {
        const utilizator = {
            numeAfisare: this.state.numeAfisare, // preluam numele afisat
            numeUtilizator: this.state.numeUtilizator, // preluam numele utilizatorului
            parola: this.state.parola // preluam parola
        }
        this.setState({apelApiInAsteptare: true}); // setam indicatorul pentru apelul api in asteptare
        this.props.actiuni.postInregistrare(utilizator).then(response => { // apelam functia de inregistrare
            this.setState({apelApiInAsteptare: false}); // resetam indicatorul dupa raspuns
        })
        .catch((eroareApi) => { // gestionam erorile de la api
            let erori = {...this.state.erori} // copiem erorile existente
            if(eroareApi.response.data && eroareApi.response.data.eroriValidare) {  // verificam daca avem erori de validare
                erori = {...eroareApi.response.data.eroriValidare} // preluam erorile de validare
            }
            this.setState({apelApiInAsteptare: false, erori}); // actualizam starea cu noile erori
        })
    }

    // metoda render pentru a afisa componenta
    render() {
        return (
            <div className="container">
                <h1 className="text-center">Inregistrare</h1> {/* titlu pentru pagina de inregistrare */}
                <div className="col-12 mb-3">
                    <Input 
                        label="Nume afisat" // eticheta pentru campul nume afisat
                        placeholder="Numele care va fi afisat" // placeholder pentru campul nume afisat
                        value={this.state.numeAfisare} // valoarea curenta a campului nume afisat
                        onChange={this.laSchimbareNumeAfisare} // functia apelata la schimbarea valorii campului
                        hasError={this.state.erori.numeAfisare && true} // daca exista o eroare pentru acest camp
                        error={this.state.erori.numeAfisare} // mesajul de eroare pentru acest camp
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
                    className="btn btn-primary" // clasa pentru stilizarea butonului
                    onClick={this.laApasareaButonuluiInregistrare} // functia apelata la apasarea butonului
                    disabled={this.state.apelApiInAsteptare || !this.state.repetareParolaConfirmat} // dezactivam butonul daca apelul api este in asteptare sau daca parolele nu corespund
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

// definim valorile implicite pentru props
PaginaInregistrareUtilizator.defaultProps = {
    actiuni: {
        postInregistrare: () => 
            new Promise((resolve, reject) => {
                resolve({});
            })
    }
};

export default PaginaInregistrareUtilizator; // exportam componenta pentru a putea fi utilizata in alte parti ale aplicatiei