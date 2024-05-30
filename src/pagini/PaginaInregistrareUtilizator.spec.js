import React from "react"; // importul bibliotecii react
import { fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react"; // importul functiilor necesare pentru testare
import { PaginaInregistrareUtilizator } from "./PaginaInregistrareUtilizator"; // importul componentei PaginaInregistrareUtilizator

describe("PaginaInregistrareUtilizator", () => {

    // grupa de teste pentru aspectul vizual
    describe("Aspect", () => { // descrierea subgrupului de teste pentru Aspect

        // test pentru a verifica daca antetul de inregistrare exista
        it("1. Are antet de inregistrare.", () => {
            const { container } = render(<PaginaInregistrareUtilizator />); // randarea componentei
            const header = container.querySelector("h1"); // selectarea elementului h1
            expect(header).toHaveTextContent("Inregistrare"); // verificarea continutului
        });

        // test pentru a verifica daca exista campul pentru introducerea numelui de afisare
        it("2. Are camp pentru introducerea numelui de afisat.", () => { 
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const numeAfisareInput = queryByPlaceholderText("Numele care va fi afisat"); // selectarea inputului cu placeholder-ul specificat
            expect(numeAfisareInput).toBeInTheDocument(); // verificarea prezentei inputului in document
        });

        // test pentru a verifica daca exista campul pentru introducerea numelui de utilizator
        it("3. Are camp pentru introducerea numelui de utilizator.", () => { 
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const numeUtilizator = queryByPlaceholderText("Numele utilizatorului"); // selectarea inputului cu placeholder-ul specificat
            expect(numeUtilizator).toBeInTheDocument(); // verificarea prezentei inputului in document
        });

        // test pentru a verifica daca exista campul pentru introducerea parolei
        it("4. Are camp pentru introducerea parolei.", () => { 
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const parolaInput = queryByPlaceholderText("Parola aleasa"); // selectarea inputului cu placeholder-ul specificat
            expect(parolaInput).toBeInTheDocument(); // verificarea prezentei inputului in document
        });

        // test pentru a verifica daca este de tip password campul pentru parola 
        it("5. Are camp de tip parola pentru introducerea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const parolaInput = queryByPlaceholderText("Parola aleasa"); // selectarea inputului cu placeholder-ul specificat
            expect(parolaInput.type).toBe("password"); // verificarea tipului inputului
        });

        // test pentru a verifica daca exista campul pentru repetarea parolei
        it("6. Are camp pentru repetarea parolei.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const parolaRepetata = queryByPlaceholderText("Repeta parola aleasa"); // selectarea inputului cu placeholder-ul specificat
            expect(parolaRepetata).toBeInTheDocument(); // verificarea prezentei inputului in document
        });

        // test pentru a verifica daca este de tip password campul pentru repetarea parolei
        it("7. Are camp de tip parola pentru repetarea parolei.", () => { // descrierea testului 7
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const parolaRepetata = queryByPlaceholderText("Repeta parola aleasa"); // selectarea inputului cu placeholder-ul specificat
            expect(parolaRepetata.type).toBe("password"); // verificarea tipului inputului
        });

        // test pentru a verifica daca exista butonul pentru inregistrare
        it("8. Are buton pentru inregistrare.", () => {
            const { container } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea containerului
            const buton = container.querySelector("button"); // selectarea elementului button
            expect(buton).toBeInTheDocument(); // verificarea prezentei butonului in document
        });

    });

    // grupa de teste pentru interactiuni
    describe("Interactiuni", () => { // descrierea subgrupului de teste pentru Interactiuni

        // functie pentru a simula evenimentul de modificare
        const modifica = (continut) => {
            return {
                target: {
                    value: continut
                }
            };
        };

        // functie pentru a simula o functie asincrona mock
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

        // functie pentru setarea componentei pentru inregistrare
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

        // test pentru a verifica setarea valorii numelui de afisare in stare
        it("1. Setează valoarea numelui de afișare în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const numeAfisareInput = queryByPlaceholderText("Numele care va fi afisat"); // selectarea inputului cu placeholder-ul specificat
            fireEvent.change(numeAfisareInput, modifica("nume-afisat")); // simularea schimbarii valorii inputului
            expect(numeAfisareInput).toHaveValue("nume-afisat"); // verificarea valorii inputului
        });
        
        // test pentru a verifica setarea valorii numelui de utilizator in stare
        it("2. Setează valoarea numelui de utilizator în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const numeUtilizatorInput = queryByPlaceholderText("Numele utilizatorului"); // selectarea inputului cu placeholder-ul specificat
            fireEvent.change(numeUtilizatorInput, modifica("nume-utilizator")); // simularea schimbarii valorii inputului
            expect(numeUtilizatorInput).toHaveValue("nume-utilizator"); // verificarea valorii inputului
        });

        // test pentru a verifica setarea valorii parolei in stare
        it("3. Setează valoarea parolei în stare.", () => { 
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const parolaInput = queryByPlaceholderText("Parola aleasa"); // selectarea inputului cu placeholder-ul specificat
            fireEvent.change(parolaInput, modifica("Parola01")); // simularea schimbarii valorii inputului
            expect(parolaInput).toHaveValue("Parola01"); // verificarea valorii inputului
        });
        
        // test pentru a verifica setarea valorii parolei repetate in stare
        it("4. Setează valoarea parolei repetate în stare.", () => {
            const { queryByPlaceholderText } = render(<PaginaInregistrareUtilizator />); // randarea componentei si salvarea ei
            const parolaRepetata = queryByPlaceholderText("Repeta parola aleasa"); // selectarea inputului cu placeholder-ul specificat
            fireEvent.change(parolaRepetata, modifica("Parola01")); // simularea schimbarii valorii inputului
            expect(parolaRepetata).toHaveValue("Parola01"); // verificarea valorii inputului
        });

        // test pentru a verifica apelarea functiei postInregistrare cand campurile sunt valide si actiunile sunt furnizate in proprietati
        it("5. Apelează postInregistrare când câmpurile sunt valide și acțiunile sunt furnizate în proprietăți.", () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: jest.fn().mockResolvedValueOnce({}) // simularea functiei postInregistrare
            };
            setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate
            fireEvent.click(buton); // simularea unui click pe buton
            expect(actiuni.postInregistrare).toHaveBeenCalledTimes(1); // verificarea apelului functiei postInregistrare
        });

        // test pentru a verifica faptul ca nu arunca exceptie cand se face click pe butonul de inregistrare si actiunile nu sunt furnizate in proprietati
        it("6. Nu aruncă excepție când se face clic pe butonul de înregistrare, iar acțiunile nu sunt furnizate în proprietăți.", () => {
            const { container, queryByPlaceholderText } = setarePentruInregistrare(); // setarea componentei pentru inregistrare si salvarea containerului si functiei queryByPlaceholderText
            expect(() => fireEvent.click(buton)).not.toThrow(); // verificarea lipsei exceptiei la simularea unui click pe buton
        });

        // test pentru a verifica apelarea POST cu corpul utilizatorului inregistrat atunci cand campurile sunt valide
        it("7. Apelează POST cu corpul utilizatorului înregistrat atunci când câmpurile sunt valide.", () => { 
            const actiuni = { // definirea actiunilor
                postInregistrare: jest.fn().mockResolvedValueOnce({}) // simularea functiei postInregistrare
            };
            setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate
            fireEvent.click(buton); // simularea unui click pe buton
            const obiectUtilizatorAsteptat = { // definirea obiectului utilizator asteptat
                numeAfisare: "nume-afisat",
                numeUtilizator: "nume-utilizator",
                parola: "Parola01"
            }
            expect(actiuni.postInregistrare).toHaveBeenCalledWith(obiectUtilizatorAsteptat); // verificarea apelului functiei postInregistrare cu obiectul utilizator asteptat
        });
        
        // test pentru a verifica daca butonul de inregistrare este inactiv cat timp exista un apel API in desfasurare
        it("8. Butonul de înregistrare este inactiv cât timp există un apel API în desfășurare.", () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: mockAsyncIntarziat() // simularea unei functii asincrone mock
            };
            setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate
            fireEvent.click(buton); // simularea unui click pe buton
            fireEvent.click(buton); 
            expect(actiuni.postInregistrare).toHaveBeenCalledTimes(1); // verificarea numarului de apeluri ale functiei postInregistrare
        });

        // test pentru a verifica afisarea spinner-ului cat timp exista un apel API in desfasurare
        it("9. Afișează spinner cât timp există un apel API în desfășurare.", () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: mockAsyncIntarziat() // simularea unei functii asincrone mock
            };
            const { queryByText } = setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate si salvarea ei
            fireEvent.click(buton); // simularea unui click pe buton
            const spinner = queryByText("Loading..."); // selectarea elementului cu textul "Loading..."
            expect(spinner).toBeInTheDocument(); // verificarea prezentei spinner-ului in document
        });
        
        // test pentru a verifica ascunderea spinner-ului dupa ce apelul API se termina cu succes
        it("10. Ascunde spinner cât timp există un apel API în desfășurare.", async () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: mockAsyncIntarziat() // simularea unei functii asincrone mock
            };
            const { queryByText } = setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate si salvarea ei
            fireEvent.click(buton); // simularea unui click pe buton
            const spinner = queryByText("Loading..."); // selectarea elementului cu textul "Loading..."
            await waitForElementToBeRemoved(spinner); // asteptarea eliminarii spinner-ului
            expect(spinner).not.toBeInTheDocument(); // verificarea absentei spinner-ului in document
        });
          
        // test pentru a verifica ascunderea spinner-ului dupa ce apelul API se termina cu o eroare
        it("11. Ascunde spinner cât timp există un apel API în desfășurare.", async () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: jest.fn().mockImplementation(() => { // simularea unei functii care arunca o eroare
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: {data: {}}
                            });
                        }, 300);
                    });
                })
            };
            const { queryByText } = setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate si salvarea ei
            fireEvent.click(buton); // simularea unui click pe buton
            const spinner = queryByText("Loading..."); // selectarea elementului cu textul "Loading..."
            await waitForElementToBeRemoved(spinner); // asteptarea eliminarii spinner-ului
            expect(spinner).not.toBeInTheDocument(); // verificarea absentei spinner-ului in document
        });

        
        it("12. Afișează eroarea de validare pentru numele utilizatorului atunci când primește eroare pentru acest câmp.", async () => { 
            const actiuni = { // definirea actiunilor
                postInregistrare: jest.fn().mockRejectedValue({ // simularea unei functii care arunca o eroare
                    response: {
                        data: {
                            eroriValidare: {
                                numeAfisare: "Nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate si salvarea ei
            fireEvent.click(buton); // simularea unui click pe buton
            const mesajEroare = await findByText("Nu poate fi null"); // cautarea mesajului de eroare in document
            expect(mesajEroare).toBeInTheDocument(); // verificarea prezentei mesajului de eroare in document
        });

        // test pentru a verifica activarea butonului de inregistrare atunci cand campurile pentru parola si repetarea parolei au aceeasi valoare
        it("13. Activează butonul de înregistrare atunci când câmpurile pentru parolă și repetă parola au aceeași valoare.", () => { 
            setarePentruInregistrare(); // setarea componentei pentru inregistrare
            expect(buton).not.toBeDisabled(); // verificarea lipsei atributului disabled la buton
        });
        
        // test pentru a verifica dezactivarea butonului de inregistrare daca valoarea din campul de repetare a parolei difera de cea din campul pentru parola
        it("14. Dezactivează butonul de înregistrare dacă valoarea din câmpul de repetare a parolei diferă de cea din câmpul pentru parolă.", () => { 
            setarePentruInregistrare(); // setarea componentei pentru inregistrare
            fireEvent.change(parolaRepetata, modifica("parola-noua")); // simularea schimbarii valorii inputului parolaRepetata
            expect(buton).toBeDisabled(); // verificarea atributului disabled la buton
        });
        
        // test pentru a verifica dezactivarea butonului de inregistrare daca valoarea din campul parola difera de cea din campul pentru de repetare a parolei
        it("15. Dezactivează butonul de înregistrare dacă valoarea din câmpul parolă diferă de cea din câmpul pentru de repetare a parolei.", () => {
            setarePentruInregistrare(); // setarea componentei pentru inregistrare
            fireEvent.change(parolaInput, modifica("parola-noua")); // simularea schimbarii valorii inputului parolaInput
            expect(buton).toBeDisabled(); // verificarea atributului disabled la buton
        });

        // test pentru a verifica afisarea stilului de tip eroare pentru campul de repetare a parolei daca valoarea acestuia difera de cea din campul pentru parola
        it("16. Afișează stilul de tip eroare pentru câmpul de repetare a parolei dacă valoarea acestuia diferă de cea din câmpul pentru parolă.", () => {
            const {queryByText} = setarePentruInregistrare(); // setarea componentei pentru inregistrare si salvarea ei
            fireEvent.change(parolaRepetata, modifica("parola-noua")); // simularea schimbarii valorii inputului parolaRepetata
            const avertismentDiscrepanta = queryByText("Parolele nu corespund"); // cautarea mesajului de avertisment in document
            expect(avertismentDiscrepanta).toBeInTheDocument(); // verificarea prezentei mesajului de avertisment in document
        });
        
        // test pentru a verifica afisarea stilului de tip eroare pentru campul parola daca valoarea acestuia difera de cea din campul pentru repetarea parolei
        it("17. Afișează stilul de tip eroare pentru câmpul parolă dacă valoarea acestuia diferă de cea din câmpul pentru repetarea parolei.", () => {
            const {queryByText} = setarePentruInregistrare(); // setarea componentei pentru inregistrare si salvarea ei
            fireEvent.change(parolaInput, modifica("parola-noua")); // simularea schimbarii valorii inputului parolaInput
            const avertismentDiscrepanta = queryByText("Parolele nu corespund"); // cautarea mesajului de avertisment in document
            expect(avertismentDiscrepanta).toBeInTheDocument(); // verificarea prezentei mesajului de avertisment in document
        });

        // test pentru a verifica ascunderea erorii de validare pentru numele afisat atunci cand se schimba valoarea pentru acest camp
        it("18. Ascunde eroarea de validare pentru numele afișat atunci când se schimbă valoarea pentru acest câmp.", async () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: jest.fn().mockRejectedValue({ // simularea unei functii care arunca o eroare
                    response: {
                        data: {
                            eroriValidare: {
                                numeAfisare: "Nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate si salvarea ei
            fireEvent.click(buton); // simularea unui click pe buton
            const mesajEroare = await findByText("Nu poate fi null"); // cautarea mesajului de eroare in document
            fireEvent.change(numeAfisareInput, modifica("nume afisare schimbat")); // simularea schimbarii valorii inputului numeAfisareInput
            expect(mesajEroare).not.toBeInTheDocument(); // verificarea absentei mesajului de eroare in document
        });

        // test pentru a verifica ascunderea erorii de validare pentru numele utilizatorului atunci cand se schimba valoarea pentru acest camp
        it("19. Ascunde eroarea de validare pentru numele utilizatorului atunci când se schimbă valoarea pentru acest câmp.", async () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: jest.fn().mockRejectedValue({ // simularea unei functii care arunca o eroare
                    response: {
                        data: {
                            eroriValidare: {
                                numeUtilizator: "Numele utilizatorului nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate si salvarea ei
            fireEvent.click(buton); // simularea unui click pe buton
            const mesajEroare = await findByText("Numele utilizatorului nu poate fi null"); // cautarea mesajului de eroare in document
            fireEvent.change(numeUtilizatorInput, modifica("nume utilizator schimbat")); // simularea schimbarii valorii inputului numeUtilizatorInput
            expect(mesajEroare).not.toBeInTheDocument(); // verificarea absentei mesajului de eroare in document
        });

        // test pentru a verifica ascunderea erorii de validare pentru parola atunci cand se schimba valoarea pentru acest camp
        it("20. Ascunde eroarea de validare pentru parolă atunci când se schimbă valoarea pentru acest câmp.", async () => {
            const actiuni = { // definirea actiunilor
                postInregistrare: jest.fn().mockRejectedValue({ // simularea unei functii care arunca o eroare
                    response: {
                        data: {
                            eroriValidare: {
                                parola: "Nu poate fi null",
                            },
                        },
                    },
                }),
            };
            const { findByText } = setarePentruInregistrare({actiuni}); // setarea componentei pentru inregistrare cu actiunile specificate si salvarea ei
            fireEvent.click(buton); // simularea unui click pe buton
            const mesajEroare = await findByText("Nu poate fi null"); // cautarea mesajului de eroare in document
            fireEvent.change(parolaInput, modifica("parola schimbata")); // simularea schimbarii valorii inputului  parolaInput
            expect(mesajEroare).not.toBeInTheDocument(); // verificarea absentei mesajului de eroare in document
        });
    });
});

console.error = () => {};