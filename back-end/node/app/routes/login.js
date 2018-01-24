//retorna o token
//let verifyToken = require('../middlewares/verifyToken');

module.exports = function(app){
	var api = app.api.login;

	app.post('/v1/login', api.autentica);
	//app.post('/v1/logout', api.logout);
	//verifytoken usa o middleware
	//app.use('/*', verifyToken ,api.verificatoken);
	app.use('/*', api.verificatoken);
}