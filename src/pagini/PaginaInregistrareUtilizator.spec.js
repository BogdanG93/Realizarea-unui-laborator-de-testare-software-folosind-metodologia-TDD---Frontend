import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PaginaInregistrareUtilizator } from "./PaginaInregistrareUtilizator";

describe("PaginaInregistrareUtilizator", () =>{

    describe("Aspect", () => {

        it("are antet de înregistrare", () => {
            
            const { container } = render(<PaginaInregistrareUtilizator />);
            const header = container.querySelector("h1");
            expect(header).toHaveTextContent("Inregistrare");
        })
    });
});