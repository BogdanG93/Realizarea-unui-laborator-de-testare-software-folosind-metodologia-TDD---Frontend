import React from "react";

export class PaginaInregistrareUtilizator extends React.Component {

    state = {
        numeAfisare: "",
        numeUtilizator: "",
        parola: "",
        repetareParola: ""
    };

    laSchimbareNumeAfisare = (event) => {
        const valoare = event.target.value;
        this.setState({numeAfisare: valoare});
    }

    laSchimbareNumeUtilizator = (event) => {
        const valoare = event.target.value;
        this.setState({numeUtilizator: valoare});
    }

    laSchimbareParola = (event) => {
        const valoare = event.target.value;
        this.setState({parola: valoare});
    }

    laSchimbareRepetareParola = (event) => {
        const valoare = event.target.value;
        this.setState({repetareParola: valoare});
    }

    laApasareaButonuluiInregistrare = () => {
        const utilizator = {
            numeAfisare: this.state.numeAfisare,
            numeUtilizator: this.state.numeUtilizator,
            parola: this.state.parola
        }
        this.props.actiuni.postInregistrare(utilizator);
    }


    render() {
        return (
            <div className="container">
                <h1 className="text-center">Inregistrare</h1>
                <div className="col-12 mb-3">
                    <label>Nume afisat</label>
                    <input 
                        className="form-control"
                        placeholder="Numele care va fi afisat" 
                        value={this.state.numeAfisare}
                        onChange={this.laSchimbareNumeAfisare}    
                    />
                </div>
                <div className="col-12 mb-3">
                    <label>Nume utilizator</label>
                    <input 
                        className="form-control"
                        placeholder="Numele utilizatorului" 
                        value={this.state.numeUtilizator}
                        onChange={this.laSchimbareNumeUtilizator}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label>Parola</label>
                    <input 
                        className="form-control"
                        placeholder="Parola aleasa" 
                        type="password" 
                        value={this.state.parola} 
                        onChange={this.laSchimbareParola}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label>Repeta parola</label>
                    <input 
                        className="form-control"
                        placeholder="Repeta parola aleasa" 
                        type="password" 
                        value={this.state.repetareParola} 
                        onChange={this.laSchimbareRepetareParola}
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.laApasareaButonuluiInregistrare}> Inregistrare </button>
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