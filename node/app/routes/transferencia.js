
module.exports = function(app){
    var api = app.api.transferencia;
    console.log(api);
    app.get('v1/transferencias', api.listaPorConta )
}