document.addEventListener('DOMContentLoaded', async () => {
    const datos = await obtenerDatos();
    const tbody = document.getElementById('tabla-datos');
    
    tbody.innerHTML = ''; // Limpiamos antes de pintar
    
    datos.forEach(item => {
        // Aplicamos color según estado
        const colorEstado = item.estado === 'Pagado' ? 'text-green-600 font-bold' : 'text-red-600 font-bold';
        
        const fila = `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-2">${item.fecha}</td>
                <td class="p-2">${item.descripcion}</td>
                <td class="p-2">$${Number(item.valor).toLocaleString()}</td>
                <td class="p-2 ${colorEstado}">${item.estado}</td>
            </tr>`;
        tbody.innerHTML += fila;
    });
});
