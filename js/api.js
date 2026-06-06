// Asegúrate de que esta URL sea la más reciente que desplegaste
const API_URL = "https://script.google.com/macros/s/AKfycbx0Gd6IBQ27SAWpOoo-chBmH5z25-O6ki0Xo3VF7OTkK3VBJBgaGneD4IqLq3mdHn8Lwg/exec";

// Función para obtener los datos (GET)
// Ahora retorna el objeto completo con {transacciones, categorias, metodos}
async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL);
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return { transacciones: [], categorias: [], metodos: [] };
    }
}

// Función para guardar nuevos datos (POST)
async function guardarDato(datos) {
    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors", 
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
