// Repositorio de contas
var banco = require('../infra/banco.js');
	require("../infra/string.js");
	
exports.list = function(coluna, direcao, limite, inicio, pagina, callback){
	var strSQL = "SELECT idContas as id, teContas_idContas as conta_id, NmConta as nome, FgTipo FROM teContas" + 
		" ORDER BY " + coluna + " " + direcao +
		" LIMIT " + limite * (pagina - 1) + "," + limite;

	banco.consultaBanco(strSQL, function(err, info){

		var strQt = "SELECT COUNT(*) AS total FROM teContas";
		
		banco.consultaBanco(strQt, function(qt_err, qt_info){
			var resultado = { data : info, success : true, inicio : limite * (pagina - 1), total : qt_info[0].total };
			
			callback(resultado);
		});
	});
};

exports.insert = function(registro, callback){
	var strSQL = "INSERT INTO teContas (teContas_idContas, NmConta, FgTipo) VALUES ('{0}','{1}','{2}')".format(registro.conta_id, registro.nome, registro.flag_tipo);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.update = function(registro, callback){
	var strSQL = "UPDATE teContas SET teContas_idContas = '{0}', NmConta = '{1}', FgTipo = '{2}' WHERE idContas = {3}".format(registro.conta_id, registro.nome, registro.flag_tipo, registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.remove = function(registro, callback){
	var strSQL = "DELETE FROM teContas WHERE idContas = {0}".format(registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.graficoTrans = function(callback){
	var strSQL = 	"SELECT COUNT(f.idFluxo) as total, c.NmConta as conta " + 
			"FROM teContas c INNER JOIN teFluxo f ON f.teContas_idContas = c.idContas " +
			"GROUP BY c.NmConta ORDER BY c.NmConta desc";
	banco.consultaBanco(strSQL, function(err, info){
		callback(info);
	});
}

exports.graficoVolume = function(callback){
	var strSQL = 	"SELECT SUM(f.NuValor) as total, c.NmConta as conta " + 
			"FROM teContas c INNER JOIN teFluxo f ON f.teContas_idContas = c.idContas " +
			"GROUP BY c.NmConta ORDER BY c.NmConta desc";
	banco.consultaBanco(strSQL, function(err, info){
		callback(info);
	});
}