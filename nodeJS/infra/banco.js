var mysql = require('mysql');

var client = mysql.createConnection({
	user: 'root',
	password: ''
});

client.query("USE fluxo", function(err, info){
	if(err == null){
		console.log("Conecta no banco");
	} else {
		console.log("Falha de acesso ao banco de dados");
	}
});

exports.consultaBanco = function(consulta, resultado){
	console.log("Consulta generica a banco de dados");
	client.query(consulta, function(err, info){
		console.log(err);
		console.log(info);
		resultado(err, info);
	});
};