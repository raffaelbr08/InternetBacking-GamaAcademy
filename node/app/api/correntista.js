var mongoose = require('mongoose');
var  model = mongoose.model('Correntista');
var logger = require('../services/logger');
var api = {};

api.lista = (req, res) => {
	return model
			.find({})
			.then((correntista) => {
				res.json(correntista);
			}, (error) => {
				logger.log('error', error);
				res.status(500).json(error);
			});
}
api.buscaPorCpf = (req, res) => {
	return model
			.find({"cpf": req.params.cpf})
			.then((correntista) => {
				if(correntista == null) {
					var msg = `${req._remoteAddress} [${req._startTime}] "${req.method} ${req.url} HTTP/${req.httpVersion}" ${req.statusCode} (erro: Nome == null)`;
					logger.log('error', msg);
					res.status(404).json(correntista);
				}
				else{
					res.status(404).json(correntista);
				}
			}, (error) => {
				logger.log('error', error);
				res.status(500).json(error);
			});
}
module.exports = api;