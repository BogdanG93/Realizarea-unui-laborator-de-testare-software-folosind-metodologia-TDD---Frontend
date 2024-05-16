import axios from "axios";

export const inregistrare = (utilizator) => {
    return axios.post("/api/1.0/utilizatori", utilizator);
}