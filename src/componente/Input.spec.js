import React from "react";
import { fireEvent, render, waitForElementToBeRemoved, findByText } from "@testing-library/react";
import Input from "./Input";

describe("Aspect", () => {
    it("1. Are item de input", () => {
        const {container} = render(<Input />);
        const input = container.querySelector("input");
        expect(input).toBeInTheDocument();
    });

    it("2. Afișează eticheta prevăzută în proprietăți.", () => {
        const {queryByText} = render(<Input label ="Test eticheta" />);
        const eticheta = queryByText("Test eticheta");
        expect(eticheta).toBeInTheDocument();
    });

    it("3. Nu afișează eticheta atunci când eticheta nu este prevăzută în proprietăți.", () => {
        const {container} = render(<Input />);
        const eticheta = container.querySelector("label")
        expect(eticheta).not.toBeInTheDocument();
    });
    
    it("4. Este de tip text atunci când tipul nu este prevăzut ca proprietate.", () => {
        const {container} = render(<Input />);
        const input = container.querySelector("input")
        expect(input.type).toBe("text");
    });
     
    it("5. Este de tip parolă atunci când tipul parolă este prevăzut ca proprietate.", () => {
        const {container} = render(<Input type="password"/>);
        const input = container.querySelector("input")
        expect(input.type).toBe("password");
    });
       
    it("6. Afișează placeholder atunci când placeholder este prevăzut ca proprietate.", () => {
        const {container} = render(<Input placeholder="Test placeholder"/>);
        const input = container.querySelector("input")
        expect(input.placeholder).toBe("Test placeholder");
    });
       
    it("7. Are valoare în input atunci când valoarea este prevăzută ca proprietate.", () => {
        const {container} = render(<Input value="Test valoare"/>);
        const input = container.querySelector("input")
        expect(input.value).toBe("Test valoare");
    });
        
    it("8. Are onChange callback atunci când este prevăzut ca proprietate.", () => {
        const inSchimbare = jest.fn()
        const {container} = render(<Input onChange={inSchimbare} />);
        const input = container.querySelector("input")
        fireEvent.change(input, {target: {value: "input-nou"}});
        expect(inSchimbare).toHaveBeenCalledTimes(1);
    });
    
    it("9. Are stilul implicit atunci când nu este o eroare sau un succes în validare.", () => {
        const {container} = render(<Input />);
        const input = container.querySelector("input")
        expect(input.className).toBe("form-control");
    });
      
    it("10. Are stilul de tip succes atunci când proprietatea hasError este falsă.", () => {
        const {container} = render(<Input hasError={false} />);
        const input = container.querySelector("input")
        expect(input.className).toBe("form-control is-valid");
    });
          
    it("11. Are stilul de tip eroare atunci când este o eroare.", () => {
        const {container} = render(<Input hasError={true} />);
        const input = container.querySelector("input")
        expect(input.className).toBe("form-control is-invalid");
    });

    it("12. Afișează mesajul de eroare atunci când este prevăzut.", () => {
        const {queryByText} = render(
            <Input hasError={true} error="Nu poate fi null" />
        );
        expect(queryByText("Nu poate fi null")).toBeInTheDocument();
    });

    it("13. Nu afișează mesajul de eroare atunci când hasError nu este prevăzut.", () => {
        const {queryByText} = render(<Input error="Nu poate fi null" />);
        expect(queryByText("Nu poate fi null")).not.toBeInTheDocument();
    });
});
