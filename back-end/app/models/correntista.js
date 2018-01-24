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
		type: Array,
		select: false
	} ,
	updated_at: Date,
	created_at: {
		type: Date,
		select: false
	}
});
mongoose.model('Correntista', schema, 'correntistas');

