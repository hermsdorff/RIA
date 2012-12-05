var connect = require('connect');
var login = require('./login.js');
var banco = require('./banco.js');

var servidor = connect.createServer();
servidor.use(connect.static(__dirname + '/../'));

servidor.use("/backend/login", function(req, res, next){
  var query = require('url').parse(req.url, true).query;

  res.writeHeader(200, { 'Content-Type' : 'application/json' });

  login.login(query, banco, 
    { 
      sucesso : function(){
	res.write('{ "success" : true }');
      },
      falha : function(erro){
	res.write('{ "success" : false, "erro" : { "motivo" : ' + erro + '}}');
      }
    }
  
  res.end(); 
});

servidor.listen(3000);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        