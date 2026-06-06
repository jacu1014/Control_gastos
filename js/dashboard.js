const DashboardLogica = {
    procesarResumen: (datos) => {
        const totalGastos = datos.reduce((sum, item) => sum + Number(item.valor), 0);
        const pendientes = datos.filter(item => item.estado === 'Pendiente')
                                .reduce((sum, item) => sum + Number(item.valor), 0);
        const pagados = totalGastos - pendientes;

        return {
            totalGastos,
            pendientes,
            pagados
        };
    }
};
