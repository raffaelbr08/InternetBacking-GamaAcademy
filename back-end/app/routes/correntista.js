
module.exports = function(app){
	var api = app.api.correntista;

	app.get('/v1/correntistas/', api.lista);
	app.get('/v1/correntistas/:cpf', api.buscaPorCpf);

}
