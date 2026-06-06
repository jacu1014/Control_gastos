// Añade al final de la URL: ?v=1 (o cualquier número que cambies cada vez)
const URL_API = "https://script.google.com/macros/s/AKfycbzNHPFE6eDhpUFCxLf9Kw335dsYf8sXLPLg1VnNHCaOUX5ll2kZ8E76DSAGgzg4NFf4Cg/exec";
// Función para obtener los datos (GET)
async function obtenerDatos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Error en la respuesta de red");
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return { transacciones: [], categorias: [], metodos: [] };
    }
}

// Función para guardar nuevos datos (POST)
async function guardarDato(datos) {
    try {
        // Al quitar 'mode: "no-cors"', el navegador enviará una solicitud de verificación (preflight)
        // la cual será aprobada por el encabezado Access-Control-Allow-Origin que pusimos en Google Apps Script
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
