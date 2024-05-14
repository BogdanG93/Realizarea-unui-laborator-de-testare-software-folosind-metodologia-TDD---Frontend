import React from "react";
import { fireEvent, queryByPlaceholderText, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PaginaInregistrareUtilizator } from "./PaginaInregistrareUtilizator";

describe("PaginaInregistrareUtilizator", () =>{

    describe("Aspect", () => {

        it("1. Are antet de înregistrare.", () => {
            const { container } = render(<PaginaInregistrareUtilizator />);
            const header = container.querySelector("h1");
            expect(header).toHaveTextContent("Inregistrare");
        });

        it("2. Are câmp pentru introducerea numelui de afișat.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campNumeAfisat = queryByPlaceholderText("Numele care va fi afisat");
            expect(campNumeAfisat).toBeInTheDocument();
        });

        it("3. Are câmp pentru introducerea numelui de utilizator.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campNumeUtilizator = queryByPlaceholderText("Numele utilizatorului");
            expect(campNumeUtilizator).toBeInTheDocument();
        });
        
        it("4. Are câmp pentru introducerea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParola = queryByPlaceholderText("Parola aleasa");
            expect(campParola).toBeInTheDocument();
        });
         
        it("5. Are câmp de tip parolă pentru introducerea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParola = queryByPlaceholderText("Parola aleasa");
            expect(campParola.type).toBe("password");
        });

        it("6. Are câmp pentru repetarea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParolaRepetata = queryByPlaceholderText("Repeta parola aleasa");
            expect(campParolaRepetata).toBeInTheDocument();
        });

        it("7. Are câmp de tip parolă pentru repetarea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParolaRepetata = queryByPlaceholderText("Repeta parola aleasa");
            expect(campParolaRepetata.type).toBe("password");
        });

        it("8. Are buton de înregistrare.", () => {
            const { container } = render(<PaginaInregistrareUtilizator />);
            const butonInregistrare = container.querySelector("button");
            expect(butonInregistrare).toBeInTheDocument();
        });

    });

    describe("Interacțiuni", () => {

        const modifica = (continut) => {
            return {
                target: {
                    value: continut
                }
            };
        };
        
        let buton, campNumeAfisat, campNumeUtilizator, campParola, campParolaRepetata;

        const setarePentruInregistrare = (props) => {
            const redat = render(
                <PaginaInregistrareUtilizator {...props} />
            );
            const { container, queryByPlaceholderText } = redat;
            campNumeAfisat = queryByPlaceholderText("Numele care va fi afisat");
            campNumeUtilizator = queryByPlaceholderText("Numele utilizatorului");
            campParola = queryByPlaceholderText("Parola aleasa");
            campParolaRepetata = queryByPlaceholderText("Repeta parola aleasa");

            fireEvent.change(campNumeAfisat, modifica("nume-afisat"));
            fireEvent.change(campNumeUtilizator, modifica("nume-utilizator"));
            fireEvent.change(campParola, modifica("Parola01"));
            fireEvent.change(campParolaRepetata, modifica("Parola01"));

            buton = container.querySelector("button");
            return redat;
        }

        it("1. Setează valoarea numelui de afișare în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campNumeAfisat = queryByPlaceholderText("Numele care va fi afisat");
            fireEvent.change(campNumeAfisat, modifica("nume-afisat"));
            expect(campNumeAfisat).toHaveValue("nume-afisat");
        });
        
        it("2. Setează valoarea numelui de utilizator în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campNumeUtilizator = queryByPlaceholderText("Numele utilizatorului");
            fireEvent.change(campNumeUtilizator, modifica("nume-utilizator"));
            expect(campNumeUtilizator).toHaveValue("nume-utilizator");
        });

        it("3. Setează valoarea parolei în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParola = queryByPlaceholderText("Parola aleasa");
            fireEvent.change(campParola, modifica("Parola01"));
            expect(campParola).toHaveValue("Parola01");
        });
        
        it("4. Setează valoarea parolei repetată în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParolaRepetata = queryByPlaceholderText("Repeta parola aleasa");
            fireEvent.change(campParolaRepetata, modifica("Parola01"));
            expect(campParolaRepetata).toHaveValue("Parola01");
        });

        it("5. Apelează postInregistrare când câmpurile sunt valide și acțiunile sunt furnizate în proprietăți.", () => {
            const actiuni = {
                postInregistrare: jest.fn().mockResolvedValueOnce({})
            };
            setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            expect(actiuni.postInregistrare).toHaveBeenCalledTimes(1);
        });

        it("6. Nu aruncă excepție când se face clic pe butonul de înregistrare, iar acțiunile nu sunt furnizate în proprietăți.", () => {
            const { container, queryByPlaceholderText } = setarePentruInregistrare();
            expect(() => fireEvent.click(buton)).not.toThrow();
        });

        it("7. Apelează POST cu corpul utilizatorului înregistrat atunci când câmpurile sunt valide.", () => {
            const actiuni = {
                postInregistrare: jest.fn().mockResolvedValueOnce({})
            };
            setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const obiectUtilizatorAsteptat = {
                numeAfisare: "nume-afisat",
                numeUtilizator: "nume-utilizator",
                parola: "Parola01"
            }
            expect(actiuni.postInregistrare).toHaveBeenCalledWith(obiectUtilizatorAsteptat);
        });
    });
});