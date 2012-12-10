var mysql = require('mysql');

var client = mysql.createConnection({
	user: 'root',
	password: ''
});

client.query("USE fluxo", function(err, info){
	if(err == null){
		console.log("Conecta ao banco");
	} else {
		console.log("Falha de acesso ao banco de dados");
	}
});

exports.consultaBanco = function(consulta, resultado){
	client.query(consulta, function(err, info){
		resultado(err, info);
	});
};