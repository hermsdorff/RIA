modules.exports = {
  login = function(query, banco, resposta){
    var email = query.email;
    var senha = query.senha;
    
    if(banco.login(email, senha)){
      logado = true;
      resposta.sucesso();
    } else {
      logado = false;
      resposta.fracasso("N�o foi poss�vel autenticar")
  },
  logout = function() {
    logado = false;
  },
  logado = false;
};