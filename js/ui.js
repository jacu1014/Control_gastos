// Variable para almacenar los datos de la API globalmente
let datosGlobales = {};

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Obtener los datos desde la API
    datosGlobales = await obtenerDatos(); 
    
    // 2. Renderizar la tabla y el resumen
    if (datosGlobales.transacciones) {
        renderizarTabla(datosGlobales.transacciones);
        renderizarResumen(datosGlobales.transacciones);
    }

    // 3. Inicializar el selector de categorías al cargar
    const tipoSelect = document.getElementById('tipoMovimiento');
    if (tipoSelect) {
        tipoSelect.addEventListener('change', actualizarCategorias);
        actualizarCategorias(); // Carga inicial
    }

    // 4. Poblar métodos de pago (se cargan una sola vez)
    poblarMetodos(datosGlobales.metodos);

    // 5. Activar el evento del formulario
    const form = document.getElementById('form-gastos');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const tipo = document.getElementById('tipoMovimiento').value;
            let valor = parseFloat(document.getElementById('valor').value);
            
            // Si es gasto, convertimos a negativo
            if (tipo === 'gasto') valor = valor * -1;
            
            const nuevoMovimiento = {
                fecha: document.getElementById('fecha').value,
                descripcion: document.getElementById('descripcion').value,
                valor: valor,
                categoria: document.getElementById('categoria').value,
                metodoPago: document.getElementById('metodoPago').value,
                estado: document.getElementById('estado').value
            };
            
            const guardado = await guardarDato(nuevoMovimiento);
            if (guardado) {
                location.reload();
            } else {
                alert("Hubo un error al guardar. Por favor, intenta de nuevo.");
            }
        });
    }
});

// Función para actualizar categorías dinámicamente según el tipo
function actualizarCategorias() {
    const tipo = document.getElementById('tipoMovimiento').value;
    const catSelect = document.getElementById('categoria');
    catSelect.innerHTML = '<option value="">Categoría</option>';
    
    const categorias = (tipo === 'gasto') ? datosGlobales.catGastos : datosGlobales.catGanancias;
    
    if (categorias) {
        categorias.forEach(cat => {
            catSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }
}

// Función para poblar métodos de pago
function poblarMetodos(metodos) {
    const metSelect = document.getElementById('metodoPago');
    if (!metSelect) return;
    metodos.forEach(met => {
        metSelect.innerHTML += `<option value="${met}">${met}</option>`;
    });
}

// Función para pintar la tabla
function renderizarTabla(datos) {
    const tbody = document.getElementById('tabla-datos');
    if (!tbody) return;
    tbody.innerHTML = ''; 
    
    datos.forEach(item => {
        const esGasto = parseFloat(item.valor) < 0;
        const colorValor = esGasto ? 'text-red-600' : 'text-green-600';
        const colorEstado = item.estado === 'Pagado' ? 'text-green-600 font-bold' : 'text-red-600 font-bold';
        
        tbody.innerHTML += `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-2">${item.fecha || '-'}</td>
                <td class="p-2">${item.descripcion || '-'}</td>
                <td class="p-2">${item.categoria || '-'}</td>
                <td class="p-2 ${colorValor}">$${Math.abs(Number(item.valor || 0)).toLocaleString()}</td>
                <td class="p-2 ${colorEstado}">${item.estado || 'Pendiente'}</td>
            </tr>`;
    });
}

// Función para pintar las tarjetas de resumen (requiere actualizar dashboard.js)
function renderizarResumen(datos) {
    const resumen = DashboardLogica.procesarResumen(datos);
    const divResumen = document.getElementById('resumen');
    if (!divResumen) return;
    
    divResumen.innerHTML = `
        <div class="bg-white p-6 rounded shadow border-l-4 border-red-500">
            <h3 class="text-gray-500 text-sm">Total Gastos</h3>
            <p class="text-2xl font-bold text-red-600">$${resumen.gastos.toLocaleString()}</p>
        </div>
        <div class="bg-white p-6 rounded shadow border-l-4 border-green-500">
            <h3 class="text-gray-500 text-sm">Total Ganancias</h3>
            <p class="text-2xl font-bold text-green-600">$${resumen.ganancias.toLocaleString()}</p>
        </div>
        <div class="bg-white p-6 rounded shadow border-l-4 border-blue-500">
            <h3 class="text-gray-500 text-sm">Balance Neto</h3>
            <p class="text-2xl font-bold">$${resumen.balance.toLocaleString()}</p>
        </div>
    `;
}
