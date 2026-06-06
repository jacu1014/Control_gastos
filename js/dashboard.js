const DashboardLogica = {
    procesarResumen: (datos) => {
        // 1. Validación de seguridad: si no hay datos, retornamos ceros directamente
        if (!datos || !Array.isArray(datos)) {
            return { totalGastos: 0, pendientes: 0, pagados: 0 };
        }

        // 2. Función interna para limpiar el valor
        const limpiarValor = (val) => {
            if (typeof val === 'number') return val;
            if (!val) return 0;
            
            // Elimina cualquier carácter que no sea un número, punto o guion
            const limpio = String(val).replace(/[^0-9.-]+/g, '');
            return parseFloat(limpio) || 0;
        };

        // 3. Calculamos los totales
        const totalGastos = datos.reduce((sum, item) => sum + limpiarValor(item.valor), 0);
        
        const pendientes = datos
            .filter(item => item && item.estado === 'Pendiente')
            .reduce((sum, item) => sum + limpiarValor(item.valor), 0);
            
        const pagados = totalGastos - pendientes;

        return { 
            totalGastos: Math.round(totalGastos), 
            pendientes: Math.round(pendientes), 
            pagados: Math.round(pagados) 
        };
    }
};
