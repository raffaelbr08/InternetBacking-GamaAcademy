const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const model = mongoose.model('Correntista');
const isObjectEmpty = require('../services/isObjectEmpty');
const logger = require('../services/logger');
const api = {};
const crypto = require('crypto');
const hash = require('../services/hash');


module.exports = function (app) {

	api.geraHash = function (req, res) {

		console.log("Senha: ", req.body.senha)
		console.log("Hash: ", hash.gerar(app, req.body.senha))
		res.status(200).send({"success": "Verificar token no pronpt do server"})
	}

	api.autentica = function (req, res) {

		// Verifica se tem um object no body
		// E depois gera um usuario padrão para logar
		if (isObjectEmpty(req.body)) {
			req.body.cpf = 1,
			req.body.senha = "123"
		}

		// Gera o Hash com a senha passada
		// Seta o hash do body
		//console.log("senha sem hash: ", req.body.senha)
		req.body.senha = hash.gerar(app, req.body.senha)
		//console.log("senha com hash: ",req.body.senha)

		// Procura pelo usuario no banco
		// Comparando o CPF e a Senha(hash)
		// TODO: Remover senha da consulta
		return model
			.findOne({ cpf: req.body.cpf, senha: req.body.senha })
			.then(function (correntista) {

				// Checa se realmente trouxe um usuário
				if (!correntista) {
					console.log("Login e senha são invalidos");

					// Envia response de não autorizado
					res.status(401).send({
						success: false,
						message: 'Usuario e senha são invalidos'
					});
				}
				else {
					console.log("user:", correntista.admin)

					// Gera o token com o jwt e um secret
					const token = jwt.sign({ id: correntista._id, login: correntista.cpf }, app.get('secret'), {
						expiresIn: 1000
					});

					//Devolve o token pelo header da resposta e no body
					res.set('x-access-token', token);
					
					delete correntista._id;

					res.send({correntista});
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
			body.senha = hash.gerar(app, req.body.senha)

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