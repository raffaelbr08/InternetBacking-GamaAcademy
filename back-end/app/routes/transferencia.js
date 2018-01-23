
module.exports = function(app){
    var api = app.api.transferencia;
    
    app.get('/v1/transferencias', api.lista)
    app.post('/v1/transferencias', api.adiciona)
}