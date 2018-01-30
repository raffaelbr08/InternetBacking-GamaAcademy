const mongoose = require('mongoose');

const modelCorrentista = mongoose.model('Correntista');
const modelTransferencia = mongoose.model('Transferencia');

const logger = require('../services/logger');
const isObjectEmpty = require('../services/isObjectEmpty');
const api = {};
const Transferencias = require('../services/transferencias');
var moment = require('moment');


const Async = require('async')

api.adiciona = function (req, res) {

    Async.series({
        userA: function (callback) {
            modelCorrentista.findOne({ contaCorrente: req.body.origem }).then(
                correntistaResult => {
                    if (correntistaResult) {
                        //console.log("pegou o correntista");
                        correntistaDestino = correntistaResult;
                        callback(null, correntistaResult);
                    } else {
                        const err = `Conta corrente do correntista origem não existe`
                        console.log(err, req.body.origem);
                        logger.log('error', err);
                        res.status(200).send({
                            "success": false
                            ,"message": err});
                    }
                }, error => {
                    console.log(error);
                    logger.log('error', error);
                    res.status(500).send({
                        "success": false
                        ,"message": error});
                }
            );
        },
        userB: function (callback) {
            modelCorrentista.findOne({ contaCorrente: req.body.destino }).then(
                correntistaResult => {
                    if (correntistaResult) {
                        //console.log("pegou o correntista");
                        correntistaDestino = correntistaResult;
                        callback(null, correntistaResult);
                    } else {
                        console.log("Conta corrente não existe");
                        const err = `Conta corrente do correntista destino não existe`
                        console.log(err, req.body.destino);
                        logger.log('error', err);
                        res.status(200).send({
                            "success": false
                            ,"message": err});
                    }
                }, error => {
                    console.log(error);
                    logger.log('error', error);
                    res.status(500).send({
                        "success": false
                        ,"message": error});
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
            //console.log("passou");

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
                    res.status(500).send({
                        "success": false
                        ,"message": error});
                } else {

                    //deu certo a transação, atualiza o saldo dos correntistas
                    Async.series({
                        //atualiza o saldo do usuário de origem
                        userAA: function (callback) {
                            if (req.body.salvarFavorecido) {

                                // verifica se o favorecido já existe pelo numero da conta
                                modelCorrentista.findOne(
                                    { contaCorrente: req.body.origem, 'favorecidos': { $elemMatch: { contaCorrente: req.body.destino } } },
                                    function (err, correntistaResult) {

                                        if (err) {
                                            console.log('[ERROR] ' + err);
                                        }
                                        // caso exista, atualiza o nome da conta corrente
                                        if (correntistaResult) {
                                            modelCorrentista.update(
                                                { contaCorrente: req.body.origem, 'favorecidos': { $elemMatch: { contaCorrente: req.body.destino } } },
                                                { $inc: { saldo: -req.body.valor }, $set: { "favorecidos.$.nome": req.body.nomeFavorecido, "favorecidos.$.agencia": req.body.agenciaFavorecido } },
                                                function (err, rowsAffected) {
                                                    if (err) { console.log('[ERROR] ' + err); }
                                                    if (rowsAffected) { 
                                                        //console.log('[INFO] user'+ req.body.origem + 'saldo -' + req.body.valor); 
                                                    }
                                                    callback(null, "Usuario Origem atualizado");
                                                }
                                            );
                                        // adiciona o favorecido na conta corrente
                                        } else {

                                            console.log("Não existe correntista");

                                            const favorecido = {
                                                nome: req.body.nomeFavorecido,
                                                contaCorrente: req.body.destino,
                                                agencia: req.body.agenciaFavorecido
                                            }

                                            modelCorrentista.update(
                                                { contaCorrente: req.body.origem },
                                                { $inc: { saldo: -req.body.valor }, $push: { favorecidos: favorecido } },
                                                function (err, rowsAffected) {
                                                    if (err) { console.log('[ERROR] ' + err); }
                                                    if (rowsAffected) { 
                                                        //console.log('[INFO] '+ req.body.origem + 'saldo -' + req.body.valor); 
                                                    }
                                                    callback(null, "Usuario Origem atualizado");
                                                }
                                            );
                                        }

                                    });


                            } else {
                                modelCorrentista.update(
                                    { contaCorrente: req.body.origem },
                                    { $inc: { saldo: -req.body.valor } },
                                    function (err, rowsAffected) {
                                        if (err) { console.log('[ERROR] ' + err); }
                                        if (rowsAffected) { 
                                            //console.log('[INFO] user saldo -' + req.body.valor); 
                                        }
                                        callback(null, "Usuario Origem atualizado");
                                    }
                                );
                            }
                        },

                        //atualiza o saldo do usuário de destino
                        userBB: function (callback) {
                            modelCorrentista.update(
                                { contaCorrente: req.body.destino },
                                { $inc: { saldo: req.body.valor } },
                                function (err, rowsAffected) {
                                    if (err) { console.log('[ERROR] ' + err); }
                                    if (rowsAffected) { 
                                        //console.log('[INFO] user saldo +' + req.body.valor); 
                                    }
                                    callback(null, "Usuario destino atualizado");
                                }
                            );
                        }
                    }, function (err, results) {
                        console.log(results)
                        if (err) {
                            console.log(error);
                            logger.log('error', error);
                            res.status(500).send({
                                "success": false
                                ,"message": error});
                        }
                        if (results) {
                            res.send({
                                "success": true,
                                "message": "Transferência concluída com sucesso!"
                            })
                        }
                    });
                }
            });
        } else {
            const error = "Saldo insulficiente!";
            console.log(error);
            logger.log('error', error);
            res.status(200).send({"success": false, "message": error });
        }
    });

}



module.exports = api;