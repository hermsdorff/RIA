var connect = require('connect');

var servidor = connect.createServer();
servidor.use(connect.static(__dirname + '/../'));

servidor.use("/backend/login", function(req, res, next){
  res.writeHeader(200, { 'Content-Type' : 'text/html' });

  var query = require('url').parse(req.url, true).query;
  
  console.log(query.email);
  console.log(query.senha);

  res.write("{ 'sucess' : true }");
  res.end();
  
//  next();
});

servidor.listen(3000);