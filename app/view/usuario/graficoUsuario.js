Ext.define('FM.view.usuario.graficoUsuario' ,{
    extend	: 'Ext.chart.Chart',
    alias 	: 'widget.graficoUsuario',
    style	: 'background:#fff',
    animate	: true,
	theme	: 'Green',
	//'Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow'
	//'Category1' ate 'Category6'.
    shadow	: true,
    store	: 'GraficoFluxoUsuario',
	//legend	: false,
	legend	: { position: 'right'},
    axes: [{
        type	: 'Numeric',
        position: 'bottom',
        fields	: ['total'],
        label	: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title	: 'Fluxo de Usuarios',
        grid	: false,
        minimum	: 0
    },
    {
        type		: 'Category',
        position	: 'left',
        fields		: ['Usuario'],
        title		: 'Usuario'
    }],
    series: [{
        type		: 'Bar',
		// Bar, Column, Line, Radar, Scatter
		//Area, Bar, Cartesian, Column, Gauge, Line, Pie, Radar, Scatter
        axis		: 'bottom',
        highlight	: true,
        tips		: {
            trackMouse: true,
            width	: 300,
            height	: 30,
            renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('total') + ' fluxos de Usuario ' + storeItem.get('Usuario') );
            }
        },
        label: {
            display: 'insideEnd',
            'text-anchor': 'middle',
            field: 'total',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333'
        },
        xField: 'categoria',
        yField: 'total'
    }
    ],
    initComponent: function(){
        this.callParent();
        this.store.load();
    }
});
