Ext.define('FM.store.GraficoVolumeContas', {
    extend		: 'Ext.data.Store',
    autoLoad	: false,
    fields		: ['total', 'conta'],
    remoteSort	: false,
    proxy: {
        type: 'ajax',
        url: 'backend/conta/grafico/volume',
        reader: {
            type			: 'json',
            root			: 'data',
            successProperty	: 'success'
        }
    }
});
