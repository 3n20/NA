function XPTesoureReportBasket() { }


XPTesoureReportBasket.prototype.findTesoureReportBasket = function(req, res, next){

    console.log('api tesouro')

    var body = {
        "OperatorAction": req.body.iduser
    };

    var endPoint = process.env.API_TD + '/api/reportBasket?operatorAction=' + req.body.iduser + '&basketType=' + req.body.operacao;

    if(req.body.operacao){
        if(req.body.opt < 5 ){
            console.log('buscar por status');
            endPoint = endPoint + '&basketSituation=' + req.body.opt
        } else if(req.body.opt > 5){
            endPoint = endPoint + '&codeBasket=' + req.body.opt;
        }else if(req.body.opt){
            endPoint = endPoint + '&BasketSituation=' + req.body.opt;
        }
        if(req.body.codeBound){
            endPoint = endPoint + '&CodeBonds=' + req.body.codeBound;
        }
    }

    var options = {
        method: "GET",
        url: endPoint,
        json: body,
        timeout: 10000
    };

    request(options, function (err, response, body) {

        if (err) {
            Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, { err: err }, false);
            var result = {result: {count: -1}};
            res = result;
            next();
        } else {
            if (response.statusCode == 200) {
                var retorno = response.body;
                retorno = filterTD(retorno);
                res.result = retorno;
            } else if(response.statusCode == 204){
                var result = {result: {count: 0}};
                res.result = result;
            } else if(response.statusCode == 412){
                var result = {result: {count: -1}};
                res.result = result;
            }
            else {
                Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, { err: err }, false);
                var result = {result: {count: 0}};
                res.result = result;
            }
            Log.Add('info', req.originalUrl, 'Xp.TDReportBasket', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            next();
        }
    });
};

module.exports = new XPTesoureReportBasket();