import axios from "axios";  // importam biblioteca axios pentru a face cereri HTTP

// definim si exportam o functie numita inregistrare care primeste un obiect utilizator ca parametru
export const inregistrare = (utilizator) => {
    // folosim axios pentru a face o cerere POST catre calea /api/1.0/utilizatori, trimitand obiectul utilizator in corpul cererii
    return axios.post("/api/1.0/utilizatori", utilizator);
}
