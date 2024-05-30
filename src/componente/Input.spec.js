import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Input from "./Input";

// definim un set de teste pentru componenta Aspect
describe("Aspect", () => {

    // testam daca input-ul este prezent in document
    it("1. Are item de input", () => {
        const {container} = render(<Input />);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input).toBeInTheDocument(); // verificam daca input-ul este prezent
    });

    // testam daca afiseaza eticheta prevazuta in proprietati
    it("2. Afișează eticheta prevăzută în proprietăți.", () => {
        const {queryByText} = render(<Input label ="Test eticheta" />);
        const eticheta = queryByText("Test eticheta"); // cautam eticheta
        expect(eticheta).toBeInTheDocument(); // verificam daca eticheta este prezenta
    });

    // testam daca nu se afiseaza eticheta atunci cand aceasta nu este prevazuta in proprietati
    it("3. Nu afișează eticheta atunci când eticheta nu este prevăzută în proprietăți.", () => {
        const {container} = render(<Input />);
        const eticheta = container.querySelector("label"); // cautam eticheta
        expect(eticheta).not.toBeInTheDocument(); // verificam daca eticheta nu este prezenta
    });

    // testam daca tipul implicit al input-ului este text atunci cand nu este specificat
    it("4. Este implicit de tip text atunci când tipul nu este prevăzut ca proprietate.", () => {
        const {container} = render(<Input />);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input.type).toBe("text"); // verificam daca tipul este text
    });

    // testam daca tipul input-ului este parola atunci cand este prevazut ca proprietate
    it("5. Este de tip parolă atunci când tipul parolă este prevăzut ca proprietate.", () => {
        const {container} = render(<Input type="password"/>);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input.type).toBe("password"); // verificam daca tipul este password
    });

    // testam daca afiseaza placeholder-ul prevazut in proprietati
    it("6. Afișează placeholder atunci când placeholder este prevăzut ca proprietate.", () => {
        const {container} = render(<Input placeholder="Test placeholder"/>);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input.placeholder).toBe("Test placeholder"); // verificam placeholder-ul
    });

    // testam daca valoarea input-ului este cea prevazuta in proprietati
    it("7. Are valoare în input atunci când valoarea este prevăzută ca proprietate.", () => {
        const {container} = render(<Input value="Test valoare"/>);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input.value).toBe("Test valoare"); // verificam valoarea input-ului
    });

    // testam daca functia onChange este apelata atunci cand este prevazuta in proprietati
    it("8. Are onChange callback atunci când este prevăzut ca proprietate.", () => {
        const inSchimbare = jest.fn(); // cream un mock function pentru onChange
        const {container} = render(<Input onChange={inSchimbare} />);
        const input = container.querySelector("input"); // cautam elementul input
        fireEvent.change(input, {target: {value: "input-nou"}}); // simulam schimbarea valorii input-ului
        expect(inSchimbare).toHaveBeenCalledTimes(1); // verificam daca functia onChange a fost apelata o data
    });

    // testam daca input-ul are stilul implicit atunci cand nu exista erori sau validari
    it("9. Are stilul implicit atunci când nu este o eroare sau un succes în validare.", () => {
        const {container} = render(<Input />);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input.className).toBe("form-control"); // verificam clasa CSS
    });

    // testam daca input-ul are stilul de succes atunci cand nu exista erori
    it("10. Are stilul de tip succes atunci când proprietatea hasError este falsă.", () => {
        const {container} = render(<Input hasError={false} />);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input.className).toBe("form-control is-valid"); // verificam clasa CSS
    });

    // testam daca input-ul are stilul de eroare atunci cand exista o eroare
    it("11. Are stilul de tip eroare atunci când este o eroare.", () => {
        const {container} = render(<Input hasError={true} />);
        const input = container.querySelector("input"); // cautam elementul input
        expect(input.className).toBe("form-control is-invalid"); // verificam clasa CSS
    });

    // testam daca mesajul de eroare este afisat atunci cand este prevazut
    it("12. Afișează mesajul de eroare atunci când este prevăzut.", () => {
        const {queryByText} = render(
            <Input hasError={true} error="Nu poate fi null" />
        );
        expect(queryByText("Nu poate fi null")).toBeInTheDocument(); // verificam daca mesajul de eroare este afisat
    });

    // testam daca mesajul de eroare nu este afisat atunci cand hasError nu este prevazut
    it("13. Nu afișează mesajul de eroare atunci când hasError nu este prevăzut.", () => {
        const {queryByText} = render(<Input error="Nu poate fi null" />);
        expect(queryByText("Nu poate fi null")).not.toBeInTheDocument(); // verificam daca mesajul de eroare nu este afisat
    });
});

// ignoram erorile in consola
console.error = () => {};
