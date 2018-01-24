var mongoose = require('mongoose');
var schema = mongoose.Schema({
	cpf: Number,
	nome: String,
	agencia: Number,
	contaCorrente:  Number,
	senha: String,
	saldo: Number,
	transacaoPendente: [],
	updated_at: Date,
	created_at: Date
});
mongoose.model('Correntista', schema, 'correntistas');

