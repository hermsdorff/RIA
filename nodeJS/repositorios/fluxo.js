// Repositorio de fluxos
var banco = require('../infra/banco.js');
	require("../infra/string.js");
	
exports.list = function(coluna, direcao, limite, inicio, pagina, callback){
	var strSQL = "SELECT id, conta_id, descricao, DATE_FORMAT(dt_fluxo, '%Y-%m-%d') as dt_fluxo, valor FROM fluxo" + 
		" ORDER BY " + coluna + " " + direcao +
		" LIMIT " + limite * (pagina - 1) + "," + limite;

	banco.consultaBanco(strSQL, function(err, info){
		var strQt = "SELECT COUNT(*) AS total FROM fluxo";
		
		banco.consultaBanco(strQt, function(qt_err, qt_info){
			var resultado = { data : info, success : true, inicio : limite * (pagina - 1), total : qt_info[0].total };
			callback(resultado);
		});
	});
};

exports.insert = function(registro, callback){
	var strSQL = "INSERT INTO fluxo (conta_id, descricao, dt_fluxo, valor) VALUES ('{0}','{1}','{2}','{3}')".format(registro.conta_id, registro.descricao, registro.dt_fluxo, registro.valor);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.update = function(registro, callback){
	var strSQL = "UPDATE fluxo SET conta_id = '{0}', descricao = '{1}', dt_fluxo = '{2}', valor = '{3}' WHERE id = {4}".format(registro.conta_id, registro.descricao, registro.dt_fluxo, registro.valor, registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.remove = function(registro, callback){
	var strSQL = "DELETE FROM fluxo WHERE id = {0}".format(registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}