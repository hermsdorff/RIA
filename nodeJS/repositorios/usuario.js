// Repositorio de usuarios
var banco = require('../infra/banco.js');
	require("../infra/string.js");

exports.login = function(email, senha, callback){
	console.log("Consulta dados no banco");
	var consulta = "SELECT COUNT(*) as ocorrencias FROM usuario WHERE " + 
							"email = '" + email + 	"' and senha = '" + senha + "'";

	banco.consultaBanco(consulta, function(err, info){
		if(err == null){
			var ocorrencias = info[0].ocorrencias;
			if(ocorrencias == 0){
				consulta = "SELECT COUNT(*) as total FROM usuario";
				banco.consultaBanco(consulta, function(err, info){
					var total = info[0].total;
					console.log(total);
					if(total == 0) { 
						console.log("não existem registros de usuário");
						callback(true); 
					} else { 
						callback(false);
					}
				});
			} else {
				callback(true);
			}
		} else {
			callback(false);
		}
	});
};

exports.list = function(coluna, direcao, limite, inicio, pagina, callback){
	var strSQL = "SELECT id, nome, email, senha FROM usuario" + 
		" ORDER BY " + coluna + " " + direcao +
		" LIMIT " + limite * (pagina - 1) + "," + limite;
	console.log("lista usuario: " + strSQL);

	banco.consultaBanco(strSQL, function(err, info){
		console.log(err);

		var strQt = "SELECT COUNT(*) AS total FROM usuario";
		
		banco.consultaBanco(strQt, function(qt_err, qt_info){
			var resultado = { data : info, success : true, inicio : limite * (pagina - 1), total : qt_info[0].total };
			
			callback(resultado);
		});
	});
};

exports.insert = function(registro, callback){
	var strSQL = "INSERT INTO usuario (nome, email, senha) VALUES ('{0}','{1}','{2}')".format(registro.nome, registro.email, registro.senha);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.update = function(registro, callback){
	var strSQL = "UPDATE usuario SET nome = '{0}', email = '{1}', senha = '{2}' WHERE id = {3}".format(registro.nome, registro.email, registro.senha, registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}

exports.remove = function(registro, callback){
	var strSQL = "DELETE FROM usuario WHERE id = {0}".format(registro.id);
	banco.consultaBanco(strSQL, function(err, info){
		callback(err == null);
	});
}