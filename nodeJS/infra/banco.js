var mysql = require('mysql');

var client = mysql.createConnection({
    user: 'root',
    password: ''
});

console.log("Conecta no banco");
client.query("USE fluxo");

exports.consultaBanco = function(consulta, resultado){
  console.log("Consulta generica a banco de dados");
  client.query(consulta, function(err, info){
    resultado(err, info);
  });
};