// Repositorio de contas
var banco = require('../infra/banco.js');
	require("../infra/string.js");
	
exports.list = function(coluna, direcao, limite, inicio, pagina, callback){
	var strSQL = "SELECT id, conta_id, nome, flag_tipo FROM conta" + 
		" ORDER BY " + coluna + " " + direcao +
		" LIMIT " + limite * (pagina - 1) + "," + limite;
	console.log("lista conta: " + strSQL);

	banco.consultaBanco(strSQL, function(err, info){
		console.log(err);

		var strQt = "SELECT COUNT(*) AS total FROM conta";
		
		banco.consultaBanco(strQt, function(qt_err, qt_info){
			var resultado = { data : info, success : true, inicio : limite * (pagina - 1), total : qt_info[0].total };
			
			callback(resultado);
		});
	});
};

exports.insert = function(registro, callback){
	var strSQL = "INSERT INTO conta (conta_id, nome, flag_tipo) VALUES ('{0}','{1}','{2}')".format(registro.conta_id, registro.nome, registro.flag_tipo);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.update = function(registro, callback){
	var strSQL = "UPDATE conta SET conta_id = '{0}', nome = '{1}', flag_tipo = '{2}' WHERE id = {3}".format(registro.conta_id, registro.nome, registro.flag_tipo, registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.remove = function(registro, callback){
	var strSQL = "DELETE FROM conta WHERE id = {0}".format(registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}