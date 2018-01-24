var mongoose = require('mongoose');
var schema = mongoose.Schema({
    origem: String,
    destino: String,
    valor: Number,
    situacao: String,
    updated_at: Date,
    created_at: Date
})

mongoose.model('Transferencia', schema, 'transferencias')
