Ext.define('FM.store.GraficoFluxoUsuario', {
    extend		: 'Ext.data.Store',
    autoLoad	: false,
    fields		: ['total', 'Usuario'],
    remoteSort	: false,
    proxy: {
        type: 'ajax',
        url: 'php/graficoUsuario.php?acao=grafico',
        reader: {
            type			: 'json',
            root			: 'data',
            successProperty	: 'success'
        }
    }
});
