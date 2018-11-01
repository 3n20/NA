let request = require('request');
let Log     = require('../controllers/Log');
class CentralApiService{
    constructor(){}
    centralApiWatson(dadosWatson, req){
        let dados      = dadosWatson.output.api;
        dados.iduser   = req.body.meta.iduser;
        dados.operacao = dadosWatson.output.operacao;
        dados.tipo     = dadosWatson.output.tipo;
        if(req.body.meta.codeBound){
            dados.codeBound = req.body.meta.codeBound;
        }
        if(req.body.meta.opt){
            dados.opt = req.body.meta.opt;
        }
        let options = {
            method: "POST",
            url: dados.endpoint,
            json: dados
        }
        return new Promise(function(accept, reject){
            request(options, function(err, resp, body){
                if(err){
                    Log.Add('error', req.originalUrl, 'api', 'Erro na chamada da API('+ dados.endpoint +'): '+err, req.ip, { body: req.body }, false);
                    reject(err);
                }else{
                    accept(body);
                }
            });
        });
    }
}
module.exports = CentralApiService;