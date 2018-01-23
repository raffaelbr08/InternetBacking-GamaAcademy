var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var model = mongoose.model('Correntista');
var isObjectEmpty = require('../services/isObjectEmpty');
var logger = require('../services/logger');
var api = {};


module.exports = function(app) {

	api.autentica = function(req, res){
		//console.log("Body:", isEmpty(req.body))
		if(isObjectEmpty(req.body)){
			req.body.cpf = 1,
			req.body.senha = "teste123"
		}
		//console.log("Body2:", req.body);

		// //Procura pelo usuario no banco
		return model
		//remover senha da consulta
		.findOne({cpf: req.body.cpf, senha: req.body.senha})
		.then(function(user){
			//compara a senha com bcrypt
			//var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    		//if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

			
			if(!user){
				console.log("Login e senha são invalidos");
				
				res.sendStatus(401);
			}
			else{
				var token = jwt.sign({usuarioId:user._id, login:user.login}, app.get('secret'), {
					expiresIn: 84600
				});

				console.log('token cirado')
				res.set('x-access-token', token);
				res.send({
					success: true,
					message: 'Token Criado!',
					token: token
				});
			}

		},
		function(error){
			console.log("Usuario e senha são invalidos");
			res.status(403).send({ 
				success: false, 
				message: 'Usuario e senha são invalidos' 
			})
		});
	}
	api.verificatoken = function(req, res, next){
		var token = req.headers['x-access-token'];
		if(token){
			jwt.verify(token, app.get('secret'), function(err, decoded){
				if(err){
					res.status(403).send({ 
						success: false, 
						message: 'Falha ao tentar autenticar o token!' 
					});
				}
				console.log('token autorizado enviado para o next');
				req.usuario = decoded;
				next();
			});
		}else{
			console.log('token não enviado');
			res.status(403).send({ 
				success: false, 
				message: 'Token não enviado!' 
			})
		}
		
	}

	api.logout = function(req, res){
		res.status(200).send({
			success: true,
			message: 'Token Removido!',
			token: null 
		});
	}

	return api;
}