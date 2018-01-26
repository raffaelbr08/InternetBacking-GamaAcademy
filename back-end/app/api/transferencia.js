const mongoose = require('mongoose');

const modelCorrentista = mongoose.model('Correntista');
const modelTransferencia = mongoose.model('Transferencia');

const logger = require('../services/logger');
const isObjectEmpty = require('../services/isObjectEmpty');
const api = {};
const Transferencias = require('../services/transferencias');

const Async = require('async')
//teste 2

api.listaPorUsuario = (req, res) => {

    Async.series({
        userA: function (callback) {

            modelTransferencia
                .find({ $or: [{ "origem": req.body.contacorrente }, { "destino": req.body.contacorrente }] })
                .sort({ created_at: -1 })
                .then((transferencias) => {

                    Async.map(transferencias, function (transferencia, callback2) {

                        Async.series({
                            origem: function (callback3) {
                                modelCorrentista.findOne({ "contaCorrente": transferencia.origem })
                                    .then((correntista) => {

                                        callback3(null, {nome: correntista.nome, contaCorrente: correntista.contaCorrente, cpf: correntista.cpf})
                                    }, (error) => {
                                        logger.log('error', error);
                                        res.status(500).json(error);
                                    })
                            },
                            destino: function (callback3) {
                                modelCorrentista.findOne({ "contaCorrente": transferencia.destino })
                                    .then((correntista) => {
                                        callback3(null, {nome: correntista.nome, contaCorrente: correntista.contaCorrente, cpf: correntista.cpf})
                                    }, (error) => {
                                        logger.log('error', error);
                                        res.status(500).json(error);
                                    })
                            }
                        }, function (err, results) {

                            let transf = {
                                origem: results.origem,
                                destino: results.destino,
                                descricao: transferencia.descricao,
                                valor: transferencia.valor,
                                updated_at: transferencia.updated_at,
                                created_at: transferencia.created_at
                            }
                            
                            if (req.body.contacorrente == transferencia.origem) {
                                transf.debito = true
                                //transf.descricao = "[Transf para]: c/c" + transferencia.destino
                            } else {
                                transf.debito = false

                                //transf.descricao = "[Transf de]: c/c" + transferencia.destino

                            }
                            
                            callback2(null, transf)

                        })

                    }, function (err, results) {
                        callback(null, results)
                    })

                }, (error) => {
                    logger.log('error', error);
                    res.status(500).json(error);
                });

        },
        userB: function (callback) {
            modelCorrentista.findOne({ "contaCorrente": req.body.contacorrente })
                .then((correntista) => {
                    callback(null, correntista.saldo)
                }, (error) => {
                    logger.log('error', error);
                    res.status(500).json(error);
                })
        }
    }, function (err, results) {
        //console.log(results.userA, results.userB)

        res.send({
            transferencias: results.userA,
            saldoAtualizado: results.userB
        })
    })

}

api.adiciona = function (req, res) {

    Async.series({
        userA: function (callback) {
            modelCorrentista.findOne({ contaCorrente: req.body.origem }).then(
                correntistaResult => {
                    if (correntistaResult) {
                        console.log("pegou o correntista");
                        correntistaDestino = correntistaResult;
                        callback(null, correntistaResult);
                    } else {
                        const err = "Conta corrente do correntista origem não existe"
                        console.log(err);
                        logger.log('error', err);
                        res.status(400).json(err);
                    }
                }, error => {
                    console.log(error);
                    logger.log('error', error);
                    res.status(500).json(error);
                }
            );
        },
        userB: function (callback) {
            modelCorrentista.findOne({ contaCorrente: req.body.destino }).then(
                correntistaResult => {
                    if (correntistaResult) {
                        console.log("pegou o correntista");
                        correntistaDestino = correntistaResult;
                        callback(null, correntistaResult);
                    } else {
                        console.log("Conta corrente não existe");
                        const err = "Conta corrente do correntista destino não existe"
                        console.log(err);
                        logger.log('error', err);
                        res.status(400).json(err);
                    }
                }, error => {
                    console.log(error);
                    logger.log('error', error);
                    res.status(500).json(error);
                }
            );
        }
    }, function (err, results) {
        if (err) {
            console.log(err);
            logger.log('error', err);
            res.status(500).json(err);
        }
        if (results.userA.saldo >= req.body.valor) {
            console.log("passou");

            //Instancia uma nova classe transferencia
            var transferencia = new modelTransferencia();

            // preenche os campos
            transferencia.descricao = req.body.descricao;
            transferencia.origem = req.body.origem;
            transferencia.destino = req.body.destino;
            transferencia.valor = req.body.valor;
            transferencia.situacao = "completado";
            transferencia.updated_at = new Date;
            transferencia.created_at = new Date;

            // adiciona a transação
            //salva no banco de dados
            transferencia.save(function (error) {
                if (error) {
                    console.log(error);
                    logger.log('error', error);
                    res.status(500).json(error);
                } else {
                    //deu certo a transação, atualiza o saldo dos correntistas
                    Async.series({
                        //atualiza o saldo do usuário de origem
                        userAA: function (callback) {
                            modelCorrentista.update(
                                { contaCorrente: req.body.origem },
                                { $inc: { saldo: -req.body.valor } },
                                function (err, rowsAffected) {
                                    if (err) { console.log('[ERROR] ' + err); }
                                    if (rowsAffected) { console.log('[INFO] user saldo -' + req.body.valor); }
                                    callback(null, "Usuario Origem atualizado");
                                }
                            );
                        },
                        //atualiza o saldo do usuário de destino
                        userBB: function (callback) {
                            modelCorrentista.update(
                                { contaCorrente: req.body.destino },
                                { $inc: { saldo: req.body.valor } },
                                function (err, rowsAffected) {
                                    if (err) { console.log('[ERROR] ' + err); }
                                    if (rowsAffected) { console.log('[INFO] user saldo +' + req.body.valor); }
                                    callback(null, "Usuario destino atualizado");
                                }
                            );
                        }
                    }, function (err, results) {
                        console.log(results)
                        if (err) {
                            console.log(error);
                            logger.log('error', error);
                            res.status(500).json(error);
                        }
                        if (results) {
                            res.send({
                                mensagem: "Transferência concluída com sucesso!"
                            })
                        }
                    });
                }
            });
        } else {
            const error = "Saldo insulficiente!";
            console.log(error);
            logger.log('error', error);
            res.status(400).send({mensagem: error});
        }
    });

}



module.exports = api;