const DashboardLogica = {
    procesarResumen: (datos) => {
        // Función interna para limpiar el valor antes de sumar
        const limpiarValor = (val) => {
            if (typeof val === 'number') return val;
            // Elimina símbolos de moneda, puntos de miles y comas
            const limpio = String(val).replace(/[$,.]/g, '');
            return Number(limpio) || 0;
        };

        const totalGastos = datos.reduce((sum, item) => sum + limpiarValor(item.valor), 0);
        
        const pendientes = datos.filter(item => item.estado === 'Pendiente')
                                .reduce((sum, item) => sum + limpiarValor(item.valor), 0);
                                
        const pagados = totalGastos - pendientes;

        return { totalGastos, pendientes, pagados };
    }
};
