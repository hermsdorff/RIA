Ext.define('FM.view.Viewport', {
    extend: 'Ext.container.Viewport',
    title: 'Sistema FLUXO DE CAIXA',
    layout: 'border',
    itemId: 'viewPortPrincipal',
    items: [
    {
        xtype: 'box',
        id: 'header',
        region: 'north',
        html: '<h1 align="center">SISTEMA FLUXO DE CAIXA <P align="Right"><a id="logout" href="php/logout.php">Sair</a></P></h1>',
		
        height: 55
    }
    ,{
        region:'west',
        border: false,
        split: true,
        margins: '0 0 5 5',
        width: 275,
        minWidth: 150,
        maxWidth: 400,
        xtype: 'treepanel',
        title: 'Menu',
        rootVisible: false,
        autoScroll: true,
        collapsible: true,
        animate: true,
        useArrows: true,
        itemId: 'treePanelPrincipal',
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Expandir',
                iconCls: 'expand',
                handler: function(){
                    this.up('#treePanelPrincipal').expandAll();
                }
            }, {
                text: 'Esconder',
                iconCls: 'collapse',
                handler: function(){
                    this.up('#treePanelPrincipal').collapseAll();
                }
            }]
        }],
        listeners: {
            itemclick: function(view, record, item, index, evt, options) {
                if (record.get('leaf')) {

                    var abaAberta = this.ownerCt.down('#tabCenter').items.findBy(function( aba ){
                        return aba.title === record.get('text');
                    });

                    if(!abaAberta){
                        this.ownerCt.down('#tabCenter').add({
                            title: record.get('text') || 'Tela do sistema FLUXO DE CAIXA',
                            closable: true,
                            layout: 'fit',
                            autoDestroy: true,
                            items: {
                                xtype: record.raw['itemMenu']
                            }
                        }).show();
                    }else{
                        this.ownerCt.down('#tabCenter').setActiveTab(abaAberta);
                    }

                }
            }
        },
        store: Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: 'php/menu.php',
                noCache : false,
                actionMethods: {
                    read: 'POST'
                }
            }
        })
    }
    ,{
        xtype: 'tabpanel',
        region: 'center',
        margins: '0 15 15 0',
        border: false,
        itemId: 'tabCenter'
    }
    ]

});
