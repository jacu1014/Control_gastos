const API_URL = "https://script.google.com/macros/s/AKfycbzI7RVfl58yAo65ZdzjY3Oc04qjuqdkBF4-sR-i3sX6qoDam3LIkSpQNV7rX4OyoQt_Lg/exec";

async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return [];
    }
}
