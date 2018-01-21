var mongoose = require('mongoose');
var schema = mongoose.Schema({
	cpf: {
		type: Number,
		required:true
	},
	nome: {
		type: String,
		required:true
	},
	agencia: {
		type: Number,
		required: true

	},
	contaCorrente: {
		type: Number,
		required: true
	},
	senha:{
		type: String,
		required:true
	},
	transferencias:[{
		id: String,
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
		}
	}]
});
mongoose.model('Correntista', schema, 'correntistas');

