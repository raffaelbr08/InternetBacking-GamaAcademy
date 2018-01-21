var mongoose = require("mongoose");
var model = mongoose.model("Transferencia");
var looger = require("../services/logger");
var api = {};

api.listaPorConta = (res, req) => {
    console.log("acessou");
}

module.exports = api;