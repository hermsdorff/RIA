var connect = require('connect');
var login = require('./login.js');
var banco = require('./infra/banco.js');
var repUsuario = require('./repositorios/usuario.js');
var repConta = require('./repositorios/conta.js');
var repFluxo = require('./repositorios/fluxo.js');

var servidor = connect.createServer();
servidor.use(connect.static(__dirname + '/../'));

servidor.use("/backend/login", function(req, res, next){
	var query = require('url').parse(req.url, true).query;
	res.writeHeader(200, { 'Content-Type' : 'application/json' });
	login.login(query, repUsuario, 
	{ 
		sucesso : function(){
			console.log('{ "success" : true }');
			res.write('{ "success" : true }');
			res.end(); 
		},
		falha : function(erro){
			console.log('{ "success" : false, "erro" : { "motivo" : ' + erro + ' }}');
			res.write('{ "success" : false, "erro" : { "motivo" : "' + erro + '" }}');
			res.end();
		}
	});
});

servidor.use("/backend/logout", function(req, res, next){
	login.logout();
	res.writeHeader(302, { 'Location' : '/index.html' });
	res.end();
});

servidor.use("/backend/menu", function(req, res, next){
	res.writeHeader(200, { 'Content-Type' : 'application/json' });
	var menu = {
		children: 
		[
			{
				text:'Clientes Cadastros',
				expanded: true,
				children:
				[
					{
						text:'Usuarios cadastrados',
						leaf: true,
						itemMenu: 'usuarioList'
					},
					{
						text:'Contas cadastradas',
						leaf: true,
						itemMenu: 'contaList'
					},
					{
						text:'Fluxos Cadastrados',
						leaf: true,
						itemMenu: 'fluxoList'
					},
				]
			}
			,
			{
				text:'Relatorios',
				expanded: true,
				children:
				[
					{
						text:'Grafico Fluxo de Caixa',
						leaf:true,
						itemMenu: 'graficoConta'
					},
					{
						text:'Volume por Conta',
						leaf:true,
						itemMenu: 'graficoVolume'
					}
				]
			}
		]
	}
	res.write(JSON.stringify(menu));
	res.end();
});

servidor.use("/backend/logado", function(req, res, next){
	res.writeHeader(200, { 'Content-Type' : 'application/json' });
	res.write("{ logado : " + login.logado() + " }");
	res.end();
});

servidor.use("/backend/user/list", function(req, res, next){
	var query = require('url').parse(req.url, true).query;
	console.log(query);
	var coluna = (query.sort != undefined)? query.sort : 1;
	var direcao = (query.dir != undefined)? query.dir : 'ASC';
	var limite = (query.limit != undefined)? ((query.limit != 'limit')? query.limit: 20) : 20;
	var pagina = (query.page != undefined)? query.page: 1;
	var inicio = (pagina - 1) * limite;
	repUsuario.list(coluna, direcao, limite, inicio, pagina, function(resultado){
		res.writeHeader(200, { 'Content-Type' : 'application/json' });
		res.write(JSON.stringify(resultado));
		res.end();
	});
});

servidor.use("/backend/user/insert", function(req, res, next){
	var query = require("url").parse(req.url, true).query;
	var registros = JSON.parse(query.data);
	if(registros instanceof Array){
		var registro = registros[registros.length - 1];
	} else {
		var registro = registros;
	}
	
	console.log(registro);
	repUsuario.insert(registro, function(resultado){
		if(resultado) { console.log("registro inserido com sucesso"); }
		else { console.log("falha ao inserir o registro"); }
	});
});

servidor.use("/backend/user/delete", function(req, res, next){
	var query = require("url").parse(req.url, true).query;
	var registros = JSON.parse(query.data);
	while(registros.length > 0){
		registro = registros[0];
		console.log(registro);
		if(registro.id != 0){
			repUsuario.remove(registro, function(resultado){
				if(resultado) { console.log("registro exclu�do com sucesso"); }
				else { console.log("falha ao excluir o registro"); }
			});
		} else {
			console.log("n�o � poss�vel excluir registro sem o identificador");
		}
		registros.splice(0, 1);
	}
});

servidor.use("/backend/user/update", function(req, res, next){
	var query = require("url").parse(req.url, true).query;
	var registro = JSON.parse(query.data);
	console.log(registro);
	if(registro.id != 0){
		repUsuario.update(registro, function(resultado){
			if(resultado) { console.log("registro alterado com sucesso"); }
			else { console.log("falha ao alterar o registro"); }
		});
	} else {
		console.log("n�o � poss�vel editar registro sem o identificador");
	}
});

servidor.use("/backend/conta/list", function(req, res, next){
	var query = require('url').parse(req.url, true).query;
	console.log(query);
	var coluna = (query.sort != undefined)? query.sort : 1;
	var direcao = (query.dir != undefined)? query.dir : 'ASC';
	var limite = (query.limit != undefined)? ((query.limit != 'limit')? query.limit: 20) : 20;
	var pagina = (query.page != undefined)? query.page: 1;
	var inicio = (pagina - 1) * limite;
	repConta.list(coluna, direcao, limite, inicio, pagina, function(resultado){
		res.writeHeader(200, { 'Content-Type' : 'application/json' });
		res.write(JSON.stringify(resultado));
		res.end();
	});
});

servidor.use("/backend/conta/insert", function(req, res, next){
	var query = require("url").parse(req.url, true).query;
	var registros = JSON.parse(query.data);
	if(registros instanceof Array){
		var registro = registros[registros.length - 1];
	} else {
		var registro = registros;
	}
	
	console.log(registro);
	repConta.insert(registro, function(resultado){
		if(resultado) { console.log("registro inserido com sucesso"); }
		else { console.log("falha ao inserir o registro"); }
	});
});

servidor.use("/backend/conta/delete", function(req, res, next){
	console.log(req);
	var query = require("url").parse(req.url, true).query;
	var registros = JSON.parse(query.data);
	console.log(registros);
	while(registros.length > 0){
		registro = registros[0];
		console.log(registro);
		if(registro.id != 0){
			repConta.remove(registro, function(resultado){
				if(resultado) { console.log("registro exclu�do com sucesso"); }
				else { console.log("falha ao excluir o registro"); }
			});
		} else {
			console.log("n�o � poss�vel excluir registro sem o identificador");
		}
		registros.splice(0, 1);
	}
});

servidor.use("/backend/conta/update", function(req, res, next){
	var query = require("url").parse(req.url, true).query;
	var registro = JSON.parse(query.data);
	console.log(registro);
	if(registro.id != 0){
		repConta.update(registro, function(resultado){
			if(resultado) { console.log("registro alterado com sucesso"); }
			else { console.log("falha ao alterar o registro"); }
		});
	} else {
		console.log("n�o � poss�vel editar registro sem o identificador");
	}
});

servidor.use("/backend/fluxo/list", function(req, res, next){
	var query = require('url').parse(req.url, true).query;
	// console.log(query);
	var coluna = (query.sort != undefined)? query.sort : 1;
	var direcao = (query.dir != undefined)? query.dir : 'ASC';
	var limite = (query.limit != undefined)? ((query.limit != 'limit')? query.limit: 20) : 20;
	var pagina = (query.page != undefined)? query.page: 1;
	var inicio = (pagina - 1) * limite;
	repFluxo.list(coluna, direcao, limite, inicio, pagina, function(resultado){
		res.writeHeader(200, { 'Content-Type' : 'application/json' });
		res.write(JSON.stringify(resultado));
		res.end();
	});
});

servidor.use("/backend/fluxo/insert", function(req, res, next){
	var query = require("url").parse(req.url, true).query;
	var registros = JSON.parse(query.data);
	if(registros instanceof Array){
		var registro = registros[registros.length - 1];
	} else {
		var registro = registros;
	}
	
	console.log(registro);
	repFluxo.insert(registro, function(resultado){
		if(resultado) { console.log("registro inserido com sucesso"); }
		else { console.log("falha ao inserir o registro"); }
	});
});

servidor.use("/backend/fluxo/delete", function(req, res, next){
	// console.log(req);
	var query = require("url").parse(req.url, true).query;
	var registros = JSON.parse(query.data);
	// console.log(registros);
	while(registros.length > 0){
		registro = registros[0];
		console.log(registro);
		if(registro.id != 0){
			repFluxo.remove(registro, function(resultado){
				if(resultado) { console.log("registro exclu�do com sucesso"); }
				else { console.log("falha ao excluir o registro"); }
			});
		} else {
			console.log("n�o � poss�vel excluir registro sem o identificador");
		}
		registros.splice(0, 1);
	}
});

servidor.use("/backend/fluxo/update", function(req, res, next){
	var query = require("url").parse(req.url, true).query;
	var registro = JSON.parse(query.data);
	console.log(registro);
	if(registro.id != 0){
		repFluxo.update(registro, function(resultado){
			if(resultado) { console.log("registro alterado com sucesso"); }
			else { console.log("falha ao alterar o registro"); }
		});
	} else {
		console.log("n�o � poss�vel editar registro sem o identificador");
	}
});

servidor.use("/backend/conta/grafico/transacoes", function(req, res, next){
	repConta.graficoTrans(function(resultado){
		var dadosGrafico = { data : resultado, success: true };
		res.writeHeader(200, { 'Content-Type' : 'application/json' });
		res.write(JSON.stringify(dadosGrafico));
		res.end();
	});
});

servidor.use("/backend/conta/grafico/volume", function(req, res, next){
	repConta.graficoVolume(function(resultado){
		var dadosGrafico = { data : resultado, success: true };
		res.writeHeader(200, { 'Content-Type' : 'application/json' });
		res.write(JSON.stringify(dadosGrafico));
		res.end();
	});
});

servidor.listen(3000);

require("./infra/string.js");
console.log("Escutando porta {0}".format(3000));
