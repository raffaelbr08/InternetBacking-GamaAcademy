const mongoose = require('mongoose');

const modelCorrentista = mongoose.model('Correntista');
const modelTransferencia = mongoose.model('Transferencia');

const logger = require('../services/logger');
const isObjectEmpty = require('../services/isObjectEmpty');
const api = {};
const Transferencias = require('../services/transferencias');

const Async = require('async')

api.listaPorUsuario = (req, res) => {
    
    return modelTransferencia
        .find({$or: [{"origem":  req.body.contacorrente}, {"destino": req.body.contacorrente} ]})
        .sort({created_at: -1})
        .then((transferencias) => {

            const retornoTrans = transferencias.map(transferencia =>{
                                    let transf = {
                                        origem: transferencia.origem,
                                        destino: transferencia.destino,
                                        descricao: transferencia.descricao,
                                        valor: transferencia.valor,
                                        updated_at: transferencia.updated_at,
                                        created_at: transferencia.created_at
                                    }

                                    if(req.body.contacorrente == transferencia.origem){
                                        transf.debito = true
                                    }else{
                                        transf.debito = false
                                    }

                                    return transf
                                })

            modelCorrentista.findOne({"contaCorrente": req.body.contacorrente})
                            .then((correntista) => {

                                console.log(correntista.saldo)
                                res.send({
                                            transferencias: retornoTrans,
                                            saldoAtualizado: correntista.saldo
                                        })

                            }, (error) => {
                                logger.log('error', error);
                                res.status(500).json(error);
                            })
        }, (error) => {
            logger.log('error', error);
            res.status(500).json(error);
        });

}

api.adiciona = function (req, res) {

    // const Transferencias = new Bank({
    //     AccountModel: modelCorrentista,
    //     TransactionModel: modelTransferencia
    // });

    transfer = {
        origem: 1,
        destino: 2
    }
    
    console.log("teste")
    Async.series({
        userA: function(callback){
            modelCorrentista.findOne({ 'contaCorrente' : transfer.origem },null, null, function(err, result){
                    console.log("userA", result)
                    console.log("userA", err)
                        if(err){ callback(err)  }
                        if(result){ callback(null, result); }
                    });
                },
        userB: function(callback){
            modelCorrentista.findOne({ 'contaCorrente' : transfer.destino }, function(err, result){
                console.log("userB", result)
                
                        if(err){ callback(err)  }
                        if(result){ callback(null, result); }
                    });
                }
    },
        function(err, results) {
           console.log("results", results) 
           res.send(200)
        }
    );
    

    // modelCorrentista
    //     .findById(user.id)
    //     .then(res => {

    //         },
    //         error => {

    //     })

    // Transferencias.transfer(userA, userB, valor)



    // let transacao = req.body;
    // let Id = req.usuario.usuarioId;
    // //console.log(req.usuario.usuarioId)

    // modelCorrentista
    //     .findById(Id)
    //     .then((user) =>{
    //         console.log(user);

    //         if (isObjectEmpty(transacao)) {
    //             res.status(500).send({
    //                 success: false,
    //                 message: "O body não pode ser vazio"
    //             })
    //         } else {
    //             transacao.origem = {
    //                 "cpf": user.cpf,
    //                 "agencia": user.agencia,
    //                 "contaCorrente": user.contacorrente
    //             };

    //             model
    //                 .create(transacao)
    //                 .then(function (transferencia) {
    //                     logger.log('info', `item incluido na collection Fornecedores: `);
    //                     res.send(transferencia);

    //                 }, function (error) {
    //                     logger.log('error', error);
    //                     res.status(500).json(error);
    //                 }
    //                 );
    //         }
    //     }, (err) =>{
    //         logger.log('error', error);
    //         res.status(500).json(error);
    //     })

}



module.exports = api;