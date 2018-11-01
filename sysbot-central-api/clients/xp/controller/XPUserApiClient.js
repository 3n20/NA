function XPUserApiClient() { }
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

XPUserApiClient.prototype.userSendSignature = function (req,res,next) {
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
        if(response) {
            str = response;
            var obj = parse(str);
            var resxml = obj.root.children[1].children[0].children[0].content
            if (resxml == "true")

                res.result = "sucesso"
            else{
                res.result = "falha"
            }
        }else{
            res.result = "vazio"
        };
        console.log("Retorno API de assinatura: " + res.result)
        next();
    });
};


//XPUserApiClient.prototype.userSendPassword = function (req,res,next) {
//    var res;
//    var iduser = req.body.iduser;
//    var message =  "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:tem='http://tempuri.org/'>" +
//        "<soap:Header />" +
//        "<soap:Body>" +
//        "<tem:UserSendPassword>" +
//        "<tem:applicationName>"+applicationName+"</tem:applicationName>" +
//        "<tem:userName>"+iduser+"</tem:userName>" +
//        "<tem:generateNewPassword>1</tem:generateNewPassword>" +
//        "</tem:UserSendPassword>" +
//        "</soap:Body>" +
//         "</soap:Envelope>";
//     proxy.send(message, process.env.URL_USERPASSWORD, function(response, ctx) {
//         if (response){
//             str = response;
//             var obj = parse(str);
//             var res = obj.root.children[1].children[0].children[0].content
//             console.log(res);
//             next();
//         }else {
//             var result = response;
//             result.body = {result: 'erro'};
//            next();
//         }
//     });
// };

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

XPUserApiClient.prototype.userSendPassword = function (req,res,next) {
    var res;
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
        if(response) {
            str = response;
            var obj = parse(str);
            var resxml = obj.root.children[1].children[0].children[0].content
            console.log("+++++++++++dentro do XML de senha: " + resxml)
            if (resxml == "true")
                res.result = "sucesso"
            else{
                res.result = "falha"
            }
        }else{
            res.result = "vazio"

        };
        console.log("Retorno API de senha: " + res.result)
        next();
    });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

XPUserApiClient.prototype.userInfoByCode = function (req, res, next){
    try{
        var userCode = req.query.iduser;
        var endpoint = process.env.API_USER_INFO + userCode;

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
            if(response) {
                res.result = response.body;
            }else{
                var result = {result: {count: -1}};
                res = result;
            }
            next();
        });
    }catch(e){
        Log.Add('Error', req.originalUrl, 'XPUserApiClient.userInfoByCode', 'Ocorreu um erro fatal. .', req.ip, { err: e }, false);
        next();
    }
};
module.exports = new XPUserApiClient();