Ext.define('FM.store.Fluxos', {
        extend     : 'Ext.data.Store',
        model      : 'FM.model.Fluxo',
        autoLoad   : false,
        remoteSort : false,
        //pageSize   : 3,
        proxy      : {
            simpleSortMode : true,
            type           : 'ajax',
            api            : {
                read    : 'backend/fluxo/list',
                create  : 'backend/fluxo/insert',
                update  : 'backend/fluxo/update',
                destroy : 'backend/fluxo/delete'
            },
        actionMethods : {
                create : 'GET',
                read   : 'GET',
                update : 'GET',
                destroy: 'GET'
        },
        reader : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success'
        },
        writer : {
            type            : 'json',
            writeAllFields  : true,
            encode          : true,
            root            : 'data'
        },
        extraParams :
        {
            limit : 'limit',
            sort  : 'id',
            dir   : 'ASC',
            total : 'total'
        },
        listeners : {
            exception : function(proxy, response, operation)
            {
                Ext.MessageBox.show({
                    title   : 'Erro no proxy',
                    msg     : operation.getError(),
                    icon    : Ext.MessageBox.ERROR,
                    buttons : Ext.Msg.OK

                });

            }
        }
    },
    listeners : {
        write : function(proxy, operation)
        {
            var obj = Ext.decode(operation.response.responseText);

            if(obj.success)
            {
                Ext.ux.Msg.flash({
                    msg  : obj.message,
                    type : 'success'
                });
            }
            else
            {
                    Ext.ux.Msg.flash({
                    msg  : obj.message,
                    type : 'error'
                });
            }
        }
    }
});
