const DashboardLogica = {
    procesarResumen: (datos) => {
        // 1. Validación de seguridad
        if (!datos || !Array.isArray(datos)) {
            return { gastos: 0, ganancias: 0, balance: 0 };
        }

        // 2. Función interna para limpiar y convertir el valor
        const limpiarValor = (val) => {
            const num = parseFloat(val);
            return isNaN(num) ? 0 : num;
        };

        // 3. Calculamos los totales
        // Gastos son los valores negativos
        const gastos = datos
            .filter(item => limpiarValor(item.valor) < 0)
            .reduce((sum, item) => sum + Math.abs(limpiarValor(item.valor)), 0);
            
        // Ganancias son los valores positivos
        const ganancias = datos
            .filter(item => limpiarValor(item.valor) >= 0)
            .reduce((sum, item) => sum + limpiarValor(item.valor), 0);

        // Balance Neto = Ganancias - Gastos
        const balance = ganancias - gastos;

        return { 
            gastos: Math.round(gastos), 
            ganancias: Math.round(ganancias), 
            balance: Math.round(balance) 
        };
    }
};
