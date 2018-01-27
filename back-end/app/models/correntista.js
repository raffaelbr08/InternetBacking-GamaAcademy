var mongoose = require('mongoose');
var schema = mongoose.Schema({
	
	cpf: {
		type: String,
		required: true
	},
	nome: String,
	agencia: String,
	contaCorrente:  String,
	senha: {
		type: String,
		select: false
	},
	saldo: Number,
	transacaoPendente: {
		type: Array
	} ,
	favorecidos: {
		type: Array
	},
	updated_at: Date,
	created_at: {
		type: Date
	}
});
mongoose.model('Correntista', schema, 'correntistas');

