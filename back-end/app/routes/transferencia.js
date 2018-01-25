
module.exports = function(app){
    var api = app.api.transferencia;
    
    app.post('/v1/extrato', api.listaPorUsuario)
    app.post('/v1/transferencias', api.adiciona)
}