var _logado = false;

exports.login = function(query, repositorio, resposta){
	var email = query.email;
	var senha = query.senha;

	console.log(email);
	console.log(senha);

	repositorio.login(email, senha, function(resultado){
		if(resultado){
			console.log("login com sucesso");
			_logado = true;
			resposta.sucesso();
		} else {
			console.log("login falhou");
			_logado = false;
			resposta.falha("Não foi possível autenticar");
		}
	});
};
  
exports.logout = function() {
	_logado = false;
};

exports.logado = function() {
	return _logado;
};