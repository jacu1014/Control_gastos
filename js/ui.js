document.addEventListener('DOMContentLoaded', async () => {
    // 1. Obtener datos
    const datos = await obtenerDatos();

    // 2. Renderizar componentes
    renderizarTabla(datos);
    renderizarResumen(datos);
});

// Función para pintar la tabla
function renderizarTabla(datos) {
    const tbody = document.getElementById('tabla-datos');
    tbody.innerHTML = '';
    
    datos.forEach(item => {
        const colorEstado = item.estado === 'Pagado' ? 'text-green-600' : 'text-red-600';
        tbody.innerHTML += `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-2">${item.fecha}</td>
                <td class="p-2">${item.descripcion}</td>
                <td class="p-2">$${Number(item.valor).toLocaleString()}</td>
                <td class="p-2 font-bold ${colorEstado}">${item.estado}</td>
            </tr>`;
    });
}

// Función para pintar las tarjetas de resumen
function renderizarResumen(datos) {
    const resumen = DashboardLogica.procesarResumen(datos);
    const divResumen = document.getElementById('resumen');
    
    divResumen.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 class="text-gray-500 text-sm uppercase">Total Gastos</h3>
            <p class="text-2xl font-bold text-gray-800">$${resumen.totalGastos.toLocaleString()}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 class="text-gray-500 text-sm uppercase">Pagado</h3>
            <p class="text-2xl font-bold text-gray-800">$${resumen.pagados.toLocaleString()}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <h3 class="text-gray-500 text-sm uppercase">Pendiente</h3>
            <p class="text-2xl font-bold text-gray-800">$${resumen.pendientes.toLocaleString()}</p>
        </div>
    `;
}
