const DashboardLogica = {
    procesarResumen: (datos) => {
        // Función para limpiar el valor de manera más segura
        const limpiarValor = (val) => {
            if (typeof val === 'number') return val;
            if (!val) return 0;
            
            // Elimina símbolos de moneda y separadores de miles
            // Solo dejamos dígitos y puntos decimales
            const limpio = String(val).replace(/[^0-9.-]+/g, '');
            return parseFloat(limpio) || 0;
        };

        // Calculamos los totales
        const totalGastos = datos.reduce((sum, item) => sum + limpiarValor(item.valor), 0);
        
        const pendientes = datos
            .filter(item => item.estado === 'Pendiente')
            .reduce((sum, item) => sum + limpiarValor(item.valor), 0);
            
        const pagados = totalGastos - pendientes;

        return { 
            totalGastos: Math.round(totalGastos), 
            pendientes: Math.round(pendientes), 
            pagados: Math.round(pagados) 
        };
    }
};
