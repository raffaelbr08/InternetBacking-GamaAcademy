var mongoose = require('mongoose');
var schema = mongoose.Schema({
	cpf: String,
	nome: String,
	agencia: String,
	contaCorrente:  String,
	senha: String,
	saldo: Number,
	transacaoPendente: [],
	updated_at: Date,
	created_at: Date
});
mongoose.model('Correntista', schema, 'correntistas');

