const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const model = mongoose.model('Correntista');
const isObjectEmpty = require('../services/isObjectEmpty');
const logger = require('../services/logger');
const api = {};
const crypto = require('crypto');


module.exports = function (app) {

	api.autentica = function (req, res) {

		// Gera o Hash com a senha passada
		const hash = crypto.createHash(app.get('hashType'), app.get('secretHash'))
			.update(req.body.senha)
			.digest('base64');

		// Verifica se tem um object no body
		// E depois gera um usuario padrão para logar
		if (isObjectEmpty(req.body)) {
			req.body.cpf = 1,
			req.body.senha = "teste123"
		}
		// Seta o hash do body
		req.body.senha = hash

		// Procura pelo usuario no banco
		// Comparando o CPF e a Senha(hash)
		// TODO: Remover senha da consulta
		return model
			.findOne({ cpf: req.body.cpf, senha: req.body.senha })
			.then(function (user) {

				// Checa se realmente trouxe um usuário
				if (!user) {
					console.log("Login e senha são invalidos");

					// Envia response de não autorizado
					res.status(401).send({
						success: false,
						message: 'Usuario e senha são invalidos'
					});
				}
				else {
					console.log("user:", user.admin)

					// Gera o token com o jwt e um secret
					const token = jwt.sign({ Id: user._id, login: user.cpf, admin: user.admin }, app.get('secret'), {
						expiresIn: 1000
					});

					//Devolve o token pelo header da resposta e no body
					res.set('x-access-token', token);
					res.send({
						success: true,
						message: 'Token Criado!',
						token: token
					});
				}

			},
			function (error) {
				
				console.log(error, "Usuario e senha são invalidos");

				// Em caso de erro devolve uma resposta
				res.status(401).send({
					success: false,
					message: 'Usuario e senha são invalidos'
				})
			});
	}
	api.verificatoken = function (req, res, next) {
		const token = req.headers['x-access-token'];

		// Verifica se tem um token na requisição
		if (token) {

			// Verifica se o token passo é valido
			jwt.verify(token, app.get('secret'), function (err, decoded) {
				if (err) {
					
					// Em caso de não ser valido devolve uma resposta de não autorizado
					res.status(401).send({
						success: false,
						message: 'Falha ao tentar autenticar o token!'
					});
					return
				}

				// Se o token for Valido passa para as outras rotas na aplicação
				req.usuario = decoded;
				// console.log(req.usuario);
				next();
			});
		} else {

			console.log('token não enviado');

			// Em caso de não ser valido devolve uma resposta de não autorizado
			res.status(401).send({
				success: false,
				message: 'Token não enviado!'
			})
		}

	}
	
	api.criaCorrentista = function (req, res) {
		const usuario = req.usuario
		const body = req.body
		console.log("criaCorrentista", usuario)
		
		//Verifica se usuario é admin
		if (usuario.admin) {

			// Gera um hash para a senha passada
			const hash = crypto.createHash(app.get('hashType'), app.get('secretHash'))
			.update(req.body.senha)
			.digest('base64');
			body.senha = hash

			// Gera o usuário no Banco
			model.create(req.body)
				.then(
					(correntista) => {
						res.send(correntista)
					},
					(erro) => {
						res.status(403).send({
							success: false,
							message: 'Token não enviado!'
						})
				})
		}else{
			res.status(401).send({
				success: false,
				message: 'Usuario não é admin'
			})
		}

	}

	return api;
}