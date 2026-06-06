const API_URL = "https://script.google.com/macros/s/AKfycbwcK9HjYt2HMnGnpw0KesMoGN3stzH14N0f_WaxrT2FYfEa-_h0ErUpc_v20w0bHSkOfg/exec";

// Función para obtener los datos (GET)
async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return [];
    }
}

// Función para guardar nuevos datos (POST)
async function guardarDato(datos) {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            mode: "no-cors", // Requerido para Google Apps Script
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        return true;
    } catch (error) {
        console.error("Error al guardar dato:", error);
        return false;
    }
}
