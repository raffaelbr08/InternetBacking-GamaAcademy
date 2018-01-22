var mongoose = require('mongoose');
var schema = mongoose.Schema({
    valor: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    debito: {
        type: Boolean,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    origem: [{
        cpf:Number,
        agencia: Number,
        contaCorrente: Number
    }],
    destino: [{
        cpf: Number,
        agencia: Number,
        contaCorrente: Number
    }]
})

mongoose.model('Transferencia', schema, 'transferencias')
