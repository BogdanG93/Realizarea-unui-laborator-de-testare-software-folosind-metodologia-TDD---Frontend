import axios from "axios";  // importam biblioteca axios pentru a face cereri HTTP
import * as apeluriAPI from "./apeluriAPI";  // importam toate functiile exportate din fisierul apeluriAPI

// definim un grup de teste pentru functiile din apeluriAPI
describe("Apeluri API", () => {

    // definim un grup de teste pentru functia de inregistrare
    describe("Înregistrare", () => {

        // definim un test specific pentru verificarea apelului catre calea /api/1.0/utilizatori
        it("1. Apelează calea /api/1.0/utilizatori.", () => {
            const mockInregistrare = jest.fn();  // cream o functie mock folosind jest
            axios.post = mockInregistrare;  // inlocuim metoda post din axios cu functia mock
            apeluriAPI.inregistrare();  // apelam functia de inregistrare din apeluriAPI

            const cale = mockInregistrare.mock.calls[0][0];  // extragem primul argument al primei apelari a functiei mock
            expect(cale).toBe("/api/1.0/utilizatori");  // verificam daca primul argument este calea corecta
        });
    });

});

console.error = () => {};  // suprascriem functia console.error pentru a preveni afisarea erorilor in consola in timpul testelor
