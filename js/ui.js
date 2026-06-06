document.addEventListener('DOMContentLoaded', async () => {
    // 1. Obtener los datos desde la API
    // Usamos la función obtenerDatos() definida en api.js
    const data = await obtenerDatos(); 
    
    // 2. Renderizar la tabla y tarjetas con las transacciones
    if (data.transacciones) {
        renderizarTabla(data.transacciones);
        renderizarResumen(data.transacciones);
    }

    // 3. Poblar el formulario con datos dinámicos de Configuración
    if (data.categorias && data.metodos) {
        poblarFormulario(data.categorias, data.metodos);
    }

    // 4. Activar el evento del formulario
    const form = document.getElementById('form-gastos');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nuevoGasto = {
                fecha: document.getElementById('fecha').value,
                descripcion: document.getElementById('descripcion').value,
                valor: document.getElementById('valor').value,
                categoria: document.getElementById('categoria').value,
                metodoPago: document.getElementById('metodoPago').value,
                estado: document.getElementById('estado').value
            };
            
            // Enviamos el dato a Google Sheets
            await guardarDato(nuevoGasto);
            
            // Recargamos para refrescar la tabla
            location.reload();
        });
    }
});

// Función para llenar los selectores dinámicamente
function poblarFormulario(categorias, metodos) {
    const catSelect = document.getElementById('categoria');
    const metSelect = document.getElementById('metodoPago');
    
    // IMPORTANTE: Limpiamos las opciones actuales antes de cargar para evitar duplicados
    catSelect.innerHTML = '<option value="">Categoría</option>';
    metSelect.innerHTML = '<option value="">Método de Pago</option>';
    
    categorias.forEach(cat => {
        catSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
    
    metodos.forEach(met => {
        metSelect.innerHTML += `<option value="${met}">${met}</option>`;
    });
}

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
                <td class="p-2">${item.categoria || '-'}</td>
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
