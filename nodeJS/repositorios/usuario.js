// Repositorio de usuarios
var banco = require('../infra/banco.js');

exports.login = function(email, senha, callback){
  console.log("Consulta dados no banco");
  var consulta = "SELECT COUNT(*) as ocorrencias FROM usuario WHERE email = '" + 
		email + 
		"' and senha = '" + senha + "'";

  banco.consultaBanco(consulta, function(err, info){
    var ocorrencias = info[0].ocorrencias;
    callback(ocorrencias > 0);
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

exports.insert = function(registro){
  require("../infra/string.js");
  var strSQL = "INSERT INTO usuario (nome, email, senha) VALUES ('{0}','{1}','{2}')".format(registro.nome, registro.email, registro.senha);
  banco.consultaBanco(strSQL, function(err, info){
    console.log(strSQL);
  });
}

exports.update = function(){
}

exports.delete = function(){
}