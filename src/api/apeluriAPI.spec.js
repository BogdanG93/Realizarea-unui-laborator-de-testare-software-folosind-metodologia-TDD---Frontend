import axios from "axios";
import * as apeluriAPI from "./apeluriAPI";

describe("Apeluri API", () => {

    describe("Înregistrare", () => {

        it("1. Apelează calea /api/1.0/utilizatori.", () => {
            const mockInregistrare = jest.fn();
            axios.post = mockInregistrare;
            apeluriAPI.inregistrare();

            const cale = mockInregistrare.mock.calls[0][0];
            expect(cale).toBe("/api/1.0/utilizatori");
        });
    });

});