document.addEventListener('DOMContentLoaded', async () => {
    // 1. Obtener los datos desde la API
    const datos = await obtenerDatos();
    
    // 2. Renderizar la tabla y tarjetas iniciales
    renderizarTabla(datos);
    renderizarResumen(datos);

    // 3. Activar el evento del formulario para guardar nuevos gastos
    const form = document.getElementById('form-gastos');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nuevoGasto = {
                fecha: document.getElementById('fecha').value,
                descripcion: document.getElementById('descripcion').value,
                valor: document.getElementById('valor').value,
                estado: document.getElementById('estado').value
            };
            
            // Enviamos el dato a Google Sheets
            await guardarDato(nuevoGasto);
            
            // Recargamos la página para ver el dato nuevo
            location.reload();
        });
    }
});

// Función para pintar la tabla
function renderizarTabla(datos) {
    const tbody = document.getElementById('tabla-datos');
    tbody.innerHTML = ''; 
    
    datos.forEach(item => {
        const colorEstado = item.estado === 'Pagado' ? 'text-green-600 font-bold' : 'text-red-600 font-bold';
        tbody.innerHTML += `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-2">${item.fecha}</td>
                <td class="p-2">${item.descripcion}</td>
                <td class="p-2">$${Number(item.valor || 0).toLocaleString()}</td>
                <td class="p-2 ${colorEstado}">${item.estado}</td>
            </tr>`;
    });
}

// Función para pintar las tarjetas de resumen
function renderizarResumen(datos) {
    const resumen = DashboardLogica.procesarResumen(datos);
    const divResumen = document.getElementById('resumen');
    
    divResumen.innerHTML = `
        <div class="card bg-white p-6 rounded shadow border-l-4 border-blue-500">
            <h3 class="text-gray-500 text-sm">Total Gastos</h3>
            <p class="text-2xl font-bold">$${resumen.totalGastos.toLocaleString()}</p>
        </div>
        <div class="card bg-white p-6 rounded shadow border-l-4 border-green-500">
            <h3 class="text-gray-500 text-sm">Ya Pagado</h3>
            <p class="text-2xl font-bold">$${resumen.pagados.toLocaleString()}</p>
        </div>
        <div class="card bg-white p-6 rounded shadow border-l-4 border-red-500">
            <h3 class="text-gray-500 text-sm">Pendiente</h3>
            <p class="text-2xl font-bold">$${resumen.pendientes.toLocaleString()}</p>
        </div>
    `;
}
