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

        it("2. Are câmp pentru introducerea numelui de afișare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campNumeAfisat = queryByPlaceholderText("Numele afisat");
            expect(campNumeAfisat).toBeInTheDocument();
        });

        it("3. Are câmp pentru introducerea numelui de utilizator.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campNumeUtilizator = queryByPlaceholderText("Numele utilizatorului");
            expect(campNumeUtilizator).toBeInTheDocument();
        });
        
        it("4. Are câmp pentru introducerea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParola = queryByPlaceholderText("Parola");
            expect(campParola).toBeInTheDocument();
        });
         
        it("5. Are câmp de tip parolă pentru introducerea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParola = queryByPlaceholderText("Parola");
            expect(campParola.type).toBe("password");
        });

        it("6. Are câmp pentru repetarea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParolaRepetata = queryByPlaceholderText("Repeta parola");
            expect(campParolaRepetata).toBeInTheDocument();
        });

        it("7. Are câmp de tip parolă pentru repetarea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campParolaRepetata = queryByPlaceholderText("Repeta parola");
            expect(campParolaRepetata.type).toBe("password");
        });

        it("8. Are buton de înregistrare.", () => {
            const { container } = render(<PaginaInregistrareUtilizator />);
            const butonInregistrare = container.querySelector("button");
            expect(butonInregistrare).toBeInTheDocument();
        });

    });

    describe("Interacțiuni", () => {
        it("1. Setează valoarea numelui de afișare în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const campNumeAfisat = queryByPlaceholderText("Numele afisat");

            const modifica = {
                target: {
                    value: "nume-afisat"
                }
            };

            fireEvent.change(campNumeAfisat, modifica);

            expect(campNumeAfisat).toHaveValue("nume-afisat");
        });
    });
});