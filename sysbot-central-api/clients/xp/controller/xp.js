function Xp() { }

var WSHttpBinding = require('wcf.js').WSHttpBinding;
var Proxy = require('wcf.js').Proxy;
var binding = new WSHttpBinding({
    SecurityMode: "None",
    TransportClientCredentialType: "None"
});
var urlAuthentication = process.env.URL_AUTHENTICATION;
var proxy = new Proxy(binding,urlAuthentication);
var applicationName = process.env.APPLICATION_NAME;
var parse = require('xml-parser');


Xp.prototype.TDReportBasket = function (req, res, next) {
    console.log('api tesouro')

    var body = {
        "OperatorAction": req.body.iduser
    };

    var endPoint = process.env.API_TD + '/api/reportBasket?operatorAction=' + req.body.iduser + '&basketType=' + req.body.operacao;

    if(req.body.operacao){
        if(req.body.opt < 5 ){
            console.log('buscar por status')
            ///api/ReportBasket?OperatorAction=35542&BasketSituation=2&TraderCpf=03441726944
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
                response.result.count = -1;
            }
            Log.Add('info', req.originalUrl, 'Xp.TDReportBasket', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            next();
        }
    });
};

Xp.prototype.investmentfunds = function (req, res, next) {

    var body = {
        "customerTradingAccount": req.body.iduser
    };

    var endpoint = process.env.API_FUNDOS;


    if(req.body.operacao){
        if(req.body.opt > 15 ){
            endpoint += '/api/v1/order/' + req.body.opt
        } else if(req.body.opt < 15){
            endpoint += '/api/v1/order?customerTradingAccount='+req.body.iduser + '&operationType=' + req.body.operacao + '&status=' + req.body.opt;
        } else {

            endpoint += '/api/v1/order?customerTradingAccount='+req.body.iduser + '&operationType=' + req.body.operacao;
        }
    }

    var options = {
        method: "GET",
        //url: 'http://investmentfunds-api-dsv.xpi.com.br:5134/api/v1/order?customerTradingAccount=321099',
        url: endpoint,
        json: body,
        timeout: 10000
    };

    request(options, function (err, response, body) {

        var result;
        if (req.body.operacao == 'R') {
            var endpoint = process.env.API_FUNDOS;
            if(req.body.operacao) {
                if (req.body.opt > 15) {
                    endpoint += '/api/v1/order/' + req.body.opt
                } else if (req.body.opt < 15) {
                    endpoint += '/api/v1/order?customerTradingAccount=' + req.body.iduser + '&operationType=T&status=' + req.body.opt;
                } else {

                    endpoint += '/api/v1/order?customerTradingAccount=' + req.body.iduser + '&operationType=T';
                }
            }


            var optionsT = {
                method: "GET",
                url: endpoint,
                json: body,
                timeout: 10000
            };
            if(req.body.opt < 15 || !req.body.opt) {
                request(optionsT, function (err, responseT, body) {
                    if (err) {
                        Log.Add('error', req.originalUrl, 'Xp.investmentfunds', 'Erro ao retornar request.', req.ip, {err: err}, false);
                        var result = {result: {count: -1}};
                        res = result;
                        next();
                    } else {
                        if (responseT.statusCode == 200 || response.body) {
                            var retorno = {orders: []};
                            if (response.body && response.body.orders) {
                                retorno = response.body;
                            }

                            if (retorno.orders) {
                                if (responseT.body) {
                                    var jsonT = responseT.body;
                                    if (typeof responseT.body === 'string') {
                                        jsonT = JSON.parse(jsonT);
                                    }
                                    if (jsonT.orders) {
                                        jsonT.orders.forEach(function (value) {
                                            retorno.orders.push(value);
                                        });
                                    }
                                }
                            }

                            if (req.body.filter) {
                                console.log(retorno)
                                retorno = filterFounds(retorno);
                            }
                            res.result = retorno;
                        } else if (responseT.statusCode == 412) {
                            var result = {result: {count: -1}};
                            res.result = result;
                        } else if (responseT.statusCode == 204 && !response.body) {
                            var result = {result: {count: 0}};
                            res.result = result;
                        } else {
                            var result = {result: {count: -1}};
                            res.result = result;
                            Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, {err: err}, false);
                        }
                        Log.Add('info', req.originalUrl, 'Xp.investmentfunds', 'Request efetuado com sucesso.', req.ip, {response: response}, false);
                        next();
                    }
                });
            }else{
                if (req.body.filter) {
                    console.log(body)
                    var retorno = filterFounds(body);
                    res.result = retorno;
                    Log.Add('info', req.originalUrl, 'Xp.investmentfunds', 'Request efetuado com sucesso.', req.ip, {response: response}, false);
                    next();
                }
            }
        } else {
            if (err) {

                // retorno.valido = false;
                Log.Add('error', req.originalUrl, 'Xp.investmentfunds', 'Erro ao retornar request.', req.ip, {err: err}, false);
                var result = {result: {count: -1}};
                res = result;
                next();
            } else {
                if (response.statusCode == 200) {
                    var retorno = response.body;
                    if (req.body.filter) {
                        console.log(retorno)
                        retorno = filterFounds(retorno);
                    }
                    res.result = retorno;


                } else if (response.statusCode == 412) {
                    var result = {result: {count: -1}};
                    res.result = result;
                } else if (response.statusCode == 204) {
                    var result = {result: {count: 0}};
                    res.result = result;
                } else {
                    var result = {result: {count: -1}};
                    res.result = result;
                    Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, {err: err}, false);
                }
                Log.Add('info', req.originalUrl, 'Xp.investmentfunds', 'Request efetuado com sucesso.', req.ip, {response: response}, false);
                next();
            }
        }

    });


};

Xp.prototype.userSendSignature = function (req,res,next) {
    var iduser = req.body.iduser;
    var message =  "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:tem='http://tempuri.org/'>" +
        "<soap:Header />" +
        "<soap:Body>" +
        "<tem:UserSendSignature>" +
        "<tem:applicationName>"+applicationName+"</tem:applicationName>" +
        "<tem:userName>"+iduser+"</tem:userName>" +
        "<tem:generateNewSignature>1</tem:generateNewSignature>" +
        "</tem:UserSendSignature>" +
        "</soap:Body>" +
        "</soap:Envelope>";
    proxy.send(message,process.env.URL_USERSIGNATURE, function(response, ctx) {
        str = response;
        //console.log(str);
        var obj = parse(str);
        var res = obj.root.children[1].children[0].children[0].content
        console.log(res);
        next();
    });
}

Xp.prototype.userSendPassword = function (req,res,next) {
    var iduser = req.body.iduser;
    var message =  "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:tem='http://tempuri.org/'>" +
        "<soap:Header />" +
        "<soap:Body>" +
        "<tem:UserSendPassword>" +
        "<tem:applicationName>"+applicationName+"</tem:applicationName>" +
        "<tem:userName>"+iduser+"</tem:userName>" +
        "<tem:generateNewPassword>1</tem:generateNewPassword>" +
        "</tem:UserSendPassword>" +
        "</soap:Body>" +
        "</soap:Envelope>";
    proxy.send(message, process.env.URL_USERPASSWORD, function(response, ctx) {
        str = response;
        //console.log(str);
        var obj = parse(str);
        var res = obj.root.children[1].children[0].children[0].content
        console.log(res);
        next();
    });
}

Xp.prototype.userInfoByCode = function (req, res, next){
    try{
        var userCode = req.body.iduser;
        var endpoint = process.env.API_USER_INFO + '/' + userCode;
        var options = {
            method: "GET",
            url: endpoint,
            timeout: 10000
        };
        request(options, function(err, response){
            if(err){
                Log.Add('Error', req.originalUrl, 'XPUserApiClient.userInfoByCode', 'Erro ao retornar request.', req.ip, { err: err }, false);
                var result = {result: {count: -1}};
                res = result;
                next();
            }
            res = response;
            next();
        });
    }catch(e){
        Log.Add('Error', req.originalUrl, 'XPUserApiClient.userInfoByCode', 'Ocorreu um erro fatal. .', req.ip, { err: e }, false);
        next();
    }
};

module.exports = new Xp();