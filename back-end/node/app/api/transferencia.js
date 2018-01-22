var mongoose = require('mongoose');
var model = mongoose.model('Transferencia');
var modelCorrentista = mongoose.model('Correntista');
var logger = require('../services/logger');
var isObjectEmpty = require('../services/isObjectEmpty');
var api = {};

api.lista = (req, res) => {
    console.log(req.usuario.usuarioId)
    return model
        .find({})
        .then((transferencia) => {
            res.json(transferencia);
        }, (error) => {
            logger.log('error', error);
            res.status(500).json(error);
        });
}

api.adiciona = function (req, res) {

    let transacao = req.body;
    let Id = req.usuario.usuarioId;
    //console.log(req.usuario.usuarioId)

    modelCorrentista
        .findById(Id)
        .then((user) =>{
            console.log(user);

            if (isObjectEmpty(transacao)) {
                res.status(500).send({
                    success: false,
                    message: "O body não pode ser vazio"
                })
            } else {
                transacao.origem = {
                    "cpf": user.cpf,
                    "agencia": user.agencia,
                    "contaCorrente": user.contacorrente
                };
        
                model
                    .create(transacao)
                    .then(function (transferencia) {
                        logger.log('info', `item incluido na collection Fornecedores: `);
                        res.send(transferencia);
        
                    }, function (error) {
                        logger.log('error', error);
                        res.status(500).json(error);
                    }
                    );
            }
        }, (err) =>{
            logger.log('error', error);
            res.status(500).json(error);
        })


}

module.exports = api;