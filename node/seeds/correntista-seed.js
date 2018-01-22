var Correntista = require('../app/models/correntista');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var correntistas = [
    new Correntista({
        cpf: 11111111111,
        nome: "Renan",
        agencia: 111,
        contaCorrente: 123123,
        senha: "senha",
        transferencias:[{id: "xxx",
                        valor: 111,
                        descricao: "descrição",
                        data: "2016-05-22"}]
        
    }),
    new Correntista({
        cpf: 11111111111,
        nome: "Renan",
        agencia: 111,
        contaCorrente: 123123,
        senha: "senha",
        transferencias:[{id: "xxx",
                        valor: 111,
                        descricao: "descrição",
                        data: "2016-05-22"}]
        
    })
];

var done = 0
for (var i = 0; i<correntistas.length; i++){
    correntistas[i].save(function(err, result){
        done++;
        if (done === correntistas.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();    
}