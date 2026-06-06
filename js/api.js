const API_URL = "https://script.google.com/macros/s/AKfycbzI7RVfl58yAo65ZdzjY3Oc04qjuqdkBF4-sR-i3sX6qoDam3LIkSpQNV7rX4OyoQt_Lg/exec";

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
