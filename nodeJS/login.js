modules.exports = {
  login = function(query, banco, resposta){
    var email = query.email;
    var senha = query.senha;
    
    if(banco.login(email, senha)){
      logado = true;
      resposta.sucesso();
    } else {
      logado = false;
      resposta.fracasso("Não foi possível autenticar")
  },
  logout = function() {
    logado = false;
  },
  logado = false;
};