var request = require('requestretry');
var filterTD = require('../filters/filterTD');


class TesouroDiretoService {

    constructor(){}

    pesquisarTesouroDiretoPorUsuario(idUser){
        var endpoint = process.env.API_TD;

        return new Promise(function(accept, reject){
            endpoint += '/api/reportBasket?operatorAction=' + idUser;

            var options = {
                method: 'GET',
                url: endpoint,
                timeout: 5000,
                json: true
            }

            request(options, function(err, result, body){
                if(err){
                    result = {result: {count: -1}};
                    accept(result);
                }
                switch (result.statusCode) {
                    case 200:
                        var filtrados = filterTD(body);
                        accept(filtrados);
                        break;
                    case 204:
                        result = {result: {count: 0}};
                        accept(result);
                        break;
                }

            });
        });
    };
}
module.exports = TesouroDiretoService;

