import React from "react";
import { fireEvent, render, waitForElementToBeRemoved, findByText } from "@testing-library/react";
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
            const numeAfisareInput = queryByPlaceholderText("Numele care va fi afisat");
            expect(numeAfisareInput).toBeInTheDocument();
        });

        it("3. Are câmp pentru introducerea numelui de utilizator.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const numeUtilizator = queryByPlaceholderText("Numele utilizatorului");
            expect(numeUtilizator).toBeInTheDocument();
        });
        
        it("4. Are câmp pentru introducerea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const parolaInput = queryByPlaceholderText("Parola aleasa");
            expect(parolaInput).toBeInTheDocument();
        });
         
        it("5. Are câmp de tip parolă pentru introducerea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const parolaInput = queryByPlaceholderText("Parola aleasa");
            expect(parolaInput.type).toBe("password");
        });

        it("6. Are câmp pentru repetarea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const parolaRepetata = queryByPlaceholderText("Repeta parola aleasa");
            expect(parolaRepetata).toBeInTheDocument();
        });

        it("7. Are câmp de tip parolă pentru repetarea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const parolaRepetata = queryByPlaceholderText("Repeta parola aleasa");
            expect(parolaRepetata.type).toBe("password");
        });

        it("8. Are buton de înregistrare.", () => {
            const { container } = render(<PaginaInregistrareUtilizator />);
            const buton = container.querySelector("button");
            expect(buton).toBeInTheDocument();
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

        const mockAsyncIntarziat = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({});
                    }, 300);
                });
            });
        };
        
        let buton, numeAfisareInput, numeUtilizatorInput, parolaInput, parolaRepetata;

        const setarePentruInregistrare = (props) => {
            const redat = render(
                <PaginaInregistrareUtilizator {...props} />
            );
            const { container, queryByPlaceholderText } = redat;
            numeAfisareInput = queryByPlaceholderText("Numele care va fi afisat");
            numeUtilizatorInput = queryByPlaceholderText("Numele utilizatorului");
            parolaInput = queryByPlaceholderText("Parola aleasa");
            parolaRepetata = queryByPlaceholderText("Repeta parola aleasa");

            fireEvent.change(numeAfisareInput, modifica("nume-afisat"));
            fireEvent.change(numeUtilizatorInput, modifica("nume-utilizator"));
            fireEvent.change(parolaInput, modifica("Parola01"));
            fireEvent.change(parolaRepetata, modifica("Parola01"));

            buton = container.querySelector("button");
            return redat;
        }

        it("1. Setează valoarea numelui de afișare în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const numeAfisareInput = queryByPlaceholderText("Numele care va fi afisat");
            fireEvent.change(numeAfisareInput, modifica("nume-afisat"));
            expect(numeAfisareInput).toHaveValue("nume-afisat");
        });
        
        it("2. Setează valoarea numelui de utilizator în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const numeUtilizatorInput = queryByPlaceholderText("Numele utilizatorului");
            fireEvent.change(numeUtilizatorInput, modifica("nume-utilizator"));
            expect(numeUtilizatorInput).toHaveValue("nume-utilizator");
        });

        it("3. Setează valoarea parolei în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const parolaInput = queryByPlaceholderText("Parola aleasa");
            fireEvent.change(parolaInput, modifica("Parola01"));
            expect(parolaInput).toHaveValue("Parola01");
        });
        
        it("4. Setează valoarea parolei repetată în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />);
            const parolaRepetata = queryByPlaceholderText("Repeta parola aleasa");
            fireEvent.change(parolaRepetata, modifica("Parola01"));
            expect(parolaRepetata).toHaveValue("Parola01");
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
        
        it("8. Butonul de înregistrare este inactiv cât timp există un apel API în desfășurare.", () => {
            const actiuni = {
                postInregistrare: mockAsyncIntarziat()
            };
            setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            fireEvent.click(buton);
            expect(actiuni.postInregistrare).toHaveBeenCalledTimes(1);
        });

        it("9. Afișează spinner cât timp există un apel API în desfășurare.", () => {
            const actiuni = {
                postInregistrare: mockAsyncIntarziat()
            };
            const { queryByText } = setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const spinner = queryByText("Loading...");
            expect(spinner).toBeInTheDocument();
        });
        
        it("10. Ascunde spinner după ce apelul API se termină cu succes.", async () => {
            const actiuni = {
                postInregistrare: mockAsyncIntarziat()
            };
            const { queryByText } = setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const spinner = queryByText("Loading...");
            await waitForElementToBeRemoved(spinner);
            expect(spinner).not.toBeInTheDocument();
        });
          
        it("11. Ascunde spinner după ce apelul API se termină cu o eroare.", async () => {
            const actiuni = {
                postInregistrare: jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: {data: {}}
                            });
                        }, 300);
                    });
                })
            };
            const { queryByText } = setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const spinner = queryByText("Loading...");
            await waitForElementToBeRemoved(spinner);
            expect(spinner).not.toBeInTheDocument();
        });

        
        it("12. Afișează eroarea de validare pentru numele utilizatorului atunci când primește eroare pentru acest câmp.", async () => {
            const actiuni = {
                postInregistrare: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            eroriValidare: {
                                numeAfisare: "Nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const mesajEroare = await findByText("Nu poate fi null");
            expect(mesajEroare).toBeInTheDocument();
        });

        it("13. Activează butonul de înregistrare atunci când câmpurile pentru parolă și repetă parola au aceeași valoare.", () => {
            setarePentruInregistrare();
            expect(buton).not.toBeDisabled();
        });
        
        it("14. Dezactivează butonul de înregistrare dacă valoarea din câmpul de repetare a parolei diferă de cea din câmpul pentru parolă.", () => {
            setarePentruInregistrare();
            fireEvent.change(parolaRepetata, modifica("parola-noua"));
            expect(buton).toBeDisabled();
        });
        
        it("15. Dezactivează butonul de înregistrare dacă valoarea din câmpul parolă diferă de cea din câmpul pentru de repetare a parolei.", () => {
            setarePentruInregistrare();
            fireEvent.change(parolaInput, modifica("parola-noua"));
            expect(buton).toBeDisabled();
        });

        it("16. Afișează stilul de tip eroare pentru câmpul de repetare a parolei dacă valoarea acestuia diferă de cea din câmpul pentru parolă.", () => {
            const {queryByText} = setarePentruInregistrare();
            fireEvent.change(parolaRepetata, modifica("parola-noua"));
            const avertismentDiscrepanta = queryByText("Parolele nu corespund");
            expect(avertismentDiscrepanta).toBeInTheDocument();
        });
        
        it("17. Afișează stilul de tip eroare pentru câmpul parolă dacă valoarea acestuia diferă de cea din câmpul pentru repetarea parolei.", () => {
            const {queryByText} = setarePentruInregistrare();
            fireEvent.change(parolaInput, modifica("parola-noua"));
            const avertismentDiscrepanta = queryByText("Parolele nu corespund");
            expect(avertismentDiscrepanta).toBeInTheDocument();
        });

        it("18. Ascunde eroarea de validare pentru numele afișat atunci când se schimbă valoarea pentru acest câmp.", async () => {
            const actiuni = {
                postInregistrare: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            eroriValidare: {
                                numeAfisare: "Nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const mesajEroare = await findByText("Nu poate fi null");
            fireEvent.change(numeAfisareInput, modifica("nume afisare schimbat"));
            expect(mesajEroare).not.toBeInTheDocument();
        });

        it("19. Ascunde eroarea de validare pentru numele utilizatorului atunci când se schimbă valoarea pentru acest câmp.", async () => {
            const actiuni = {
                postInregistrare: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            eroriValidare: {
                                numeUtilizator: "Numele utilizatorului nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const mesajEroare = await findByText("Numele utilizatorului nu poate fi null");
            fireEvent.change(numeUtilizatorInput, modifica("nume utilizator schimbat"));
            expect(mesajEroare).not.toBeInTheDocument();
        });

        it("20. Ascunde eroarea de validare pentru parolă atunci când se schimbă valoarea pentru acest câmp.", async () => {
            const actiuni = {
                postInregistrare: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            eroriValidare: {
                                parola: "Nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni});
            fireEvent.click(buton);
            const mesajEroare = await findByText("Nu poate fi null");
            fireEvent.change(parolaInput, modifica("parola schimbata"));
            expect(mesajEroare).not.toBeInTheDocument();
        });
    });
});

console.error = () => {};