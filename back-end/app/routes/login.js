module.exports = function(app){
	var api = app.api.login;

	app.post('/v1/login', api.autentica);
	app.post('/v1/gera-hash', api.geraHash);
	
	//app.use('/*', api.verificatoken);
}