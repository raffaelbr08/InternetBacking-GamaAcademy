module.exports = function(app){
	var api = app.api.login;

	app.post('/v1/login', api.autentica);
	app.use('/*', api.verificatoken);
}