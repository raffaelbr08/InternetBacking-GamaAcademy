var mongoose = require('mongoose');
var schema = mongoose.Schema({
    valor: {
        type: Number,
        required: false
    },
    descricao: {
        type: String,
        required: false
    },
    data: {
        type: Date,
        required: false
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
