// Repositorio de fluxos
var banco = require('../infra/banco.js');
	require("../infra/string.js");
	
exports.list = function(coluna, direcao, limite, inicio, pagina, callback){
	var strSQL = "SELECT idFluxo as id, teContas_idContas as conta_id, DsDescricao as descricao, DATE_FORMAT(DtFluxo, '%Y-%m-%d') as dt_fluxo, NuValor as valor FROM teFluxo" + 
		" ORDER BY " + coluna + " " + direcao +
		" LIMIT " + limite * (pagina - 1) + "," + limite;

	banco.consultaBanco(strSQL, function(err, info){
		var strQt = "SELECT COUNT(*) AS total FROM teFluxo";
		
		banco.consultaBanco(strQt, function(qt_err, qt_info){
			var resultado = { data : info, success : true, inicio : limite * (pagina - 1), total : qt_info[0].total };
			callback(resultado);
		});
	});
};

exports.insert = function(registro, callback){
	var strSQL = "INSERT INTO teFluxo (teContas_idContas, DsDescricao, DtFluxo, NuValor) VALUES ('{0}','{1}','{2}','{3}')".format(registro.conta_id, registro.descricao, registro.dt_fluxo, registro.valor);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.update = function(registro, callback){
	var strSQL = "UPDATE teFluxo SET teContas_idContas = '{0}', DsDescricao = '{1}', DtFluxo = '{2}', NuValor = '{3}' WHERE idFluxo = {4}".format(registro.conta_id, registro.descricao, registro.dt_fluxo, registro.valor, registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.remove = function(registro, callback){
	var strSQL = "DELETE FROM teFluxo WHERE idFluxo = {0}".format(registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}