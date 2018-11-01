function Message() { }

Message.prototype.SendFromWebhookToBot = function (req, res, next) {
    console.log('Message SendFromWebhookToBot')

    var options = {
        method: "POST",
        url: process.env.URL_SYSBOT,
        headers: {
            "token": process.env.TOKEN_SYSBOT
        },
        json: req.body
    };
    request(options, function (err, response, body) {
        if (err){
            Log.Add('error', req.originalUrl, 'Message.SendFromBotToWebhook', 'Erro ao enviar request para o WEBHOOK.', req.ip, { body: req.body }, true);
        }           
        else {
            Log.Add('info', req.originalUrl, 'Message.SendFromBotToWebhook', 'Request enviado com sucesso para o WEBHOOK.', req.ip, { body: req.body }, false);
            req.body = body
            next();
        }
    });

    
};

Message.prototype.SendFromBotToWebhook = function (req, res, next) {
    console.log('Message SendFromBotToWebhook')

   
};

module.exports = new Message();
