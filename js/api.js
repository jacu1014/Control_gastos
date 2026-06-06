// Asegúrate de que este nombre sea consistente en todo el archivo
const API_URL = "https://script.google.com/macros/s/AKfycbzNHPFE6eDhpUFCxLf9Kw335dsYf8sXLPLg1VnNHCaOUX5ll2kZ8E76DSAGgzg4NFf4Cg/exec";

// Función para obtener los datos (GET)
async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error en la respuesta de red");
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener datos:", error);
        // Retornamos un objeto que coincida con lo que el backend envía
        return { transacciones: [], catGastos: [], catGanancias: [], metodos: [] };
    }
}

// Función para guardar nuevos datos (POST)
async function guardarDato(datos) {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        
        return respuesta.ok;
    } catch (error) {
        console.error("Error al guardar dato:", error);
        return false;
    }
}
