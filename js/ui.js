let datosGlobales = {};

document.addEventListener('DOMContentLoaded', async () => {
    datosGlobales = await obtenerDatos(); 
    
    if (datosGlobales.transacciones) {
        renderizarTabla(datosGlobales.transacciones);
        // Si el dashboard no carga, al menos no rompemos el resto de la UI
        if (typeof DashboardLogica !== 'undefined') {
            renderizarResumen(datosGlobales.transacciones);
        }
    }

    const tipoSelect = document.getElementById('tipoMovimiento');
    if (tipoSelect) {
        tipoSelect.addEventListener('change', actualizarCategorias);
        actualizarCategorias(); 
    }

    if (datosGlobales.metodos) {
        poblarMetodos(datosGlobales.metodos);
    }

    const form = document.getElementById('form-gastos');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const tipo = document.getElementById('tipoMovimiento').value;
            let valor = parseFloat(document.getElementById('valor').value);
            
            if (tipo === 'gasto') valor = Math.abs(valor) * -1;
            else valor = Math.abs(valor);
            
            const nuevoMovimiento = {
                fecha: document.getElementById('fecha').value,
                descripcion: document.getElementById('descripcion').value,
                valor: valor,
                categoria: document.getElementById('categoria').value,
                metodoPago: document.getElementById('metodoPago').value,
                estado: document.getElementById('estado').value
            };
            
            const guardado = await guardarDato(nuevoMovimiento);
            if (guardado) location.reload();
            else alert("Error al guardar.");
        });
    }
});

function actualizarCategorias() {
    const tipo = document.getElementById('tipoMovimiento').value;
    const catSelect = document.getElementById('categoria');
    if (!catSelect) return;
    
    catSelect.innerHTML = '<option value="">Categoría</option>';
    
    // Si 'tipo' es 'ganancia', buscamos 'catGanancias'
    // Si 'tipo' es 'gasto', buscamos 'catGastos'
    const key = (tipo === 'gasto') ? 'catGastos' : 'catGanancias';
    const categorias = datosGlobales[key];
    
    if (categorias && Array.isArray(categorias)) {
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            catSelect.appendChild(option);
        });
    } else {
        console.warn("Categorías no disponibles para:", tipo);
    }
}

function poblarMetodos(metodos) {
    const metSelect = document.getElementById('metodoPago');
    if (!metSelect) return;
    metodos.forEach(met => {
        metSelect.innerHTML += `<option value="${met}">${met}</option>`;
    });
}

function renderizarTabla(datos) {
    const tbody = document.getElementById('tabla-datos');
    if (!tbody) return;
    tbody.innerHTML = ''; 
    
    datos.forEach(item => {
        const val = parseFloat(item.valor || 0);
        const esGasto = val < 0;
        const colorValor = esGasto ? 'text-red-600' : 'text-green-600';
        const colorEstado = item.estado === 'Pagado' ? 'text-green-600 font-bold' : 'text-red-600 font-bold';
        
        tbody.innerHTML += `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-2">${item.fecha || '-'}</td>
                <td class="p-2">${item.descripcion || '-'}</td>
                <td class="p-2">${item.categoria || '-'}</td>
                <td class="p-2 ${colorValor}">$${Math.abs(val).toLocaleString()}</td>
                <td class="p-2 ${colorEstado}">${item.estado || 'Pendiente'}</td>
            </tr>`;
    });
}

function renderizarResumen(datos) {
    const resumen = DashboardLogica.procesarResumen(datos);
    const divResumen = document.getElementById('resumen');
    if (!divResumen) return;
    
    // Validamos que los datos existan antes de llamar a toLocaleString
    const g = resumen.gastos || 0;
    const gn = resumen.ganancias || 0;
    const b = resumen.balance || 0;
    
    divResumen.innerHTML = `
        <div class="bg-white p-6 rounded shadow border-l-4 border-red-500">
            <h3 class="text-gray-500 text-sm">Total Gastos</h3>
            <p class="text-2xl font-bold text-red-600">$${g.toLocaleString()}</p>
        </div>
        <div class="bg-white p-6 rounded shadow border-l-4 border-green-500">
            <h3 class="text-gray-500 text-sm">Total Ganancias</h3>
            <p class="text-2xl font-bold text-green-600">$${gn.toLocaleString()}</p>
        </div>
        <div class="bg-white p-6 rounded shadow border-l-4 border-blue-500">
            <h3 class="text-gray-500 text-sm">Balance Neto</h3>
            <p class="text-2xl font-bold">$${b.toLocaleString()}</p>
        </div>
    `;
}
