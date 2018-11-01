function Message(){}
Message.prototype.SendFromWebAppToBot = function(req, res, next){
    if(req.body){
        let options = {
            method: "POST",
            url: process.env.URL_AUTENTICADOR + process.env.TOKEN_AUTENTICADOR,
            headers: {"token": process.env.TOKEN_AUTENTICADOR},
            json: req.body
        };
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                Log.Add('error', req.originalUrl, 'Message.SendFromWebAppToBot', 'Erro ao realizar request para o autenticador', req.ip, {erro:err}, true);
            }else{
                Log.Add('info', req.originalUrl, 'Message.SendFromWebAppToBot', 'Enviado para o autenticador', req.ip, {body: body.response}, true);
                req.body = body;
                console.log(response.body);
                next();
            }
        });
    }
};
Message.prototype.SendFromBotToWebApp = function(req, res, next){};
module.exports = new Message();