/* 
    REQUISIÇÃO SÍNCRONA
*/
var request = require('request');
var Log = require('../controllers/log');
var resp = '';
function Api() { }
//var resp = { result: [ { situation: 2, traderId: 0 } ] };

/**
 * @return {string}
 */
Api.prototype.ChamaExterno = function (dados) {
 
    var options = {
        method: "POST",
        url: dados.endpoint,
        json: dados
    };

    request(options, function (err, response, body) {
        console.log(response);
        if (err) {
            //Log.Add('error', 'req.originalUrl', '', '', 'req.ip', { body: 'req.body' }, true);
        }
        else {
            //console.log(body); 
            //resp = body;         
        }
        
    });
    
    return resp;
    
}
module.exports = new Api();

