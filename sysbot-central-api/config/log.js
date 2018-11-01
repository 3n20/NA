function Log() { }

Log.prototype.Add = function (level, url, method, message, ip, meta, sendEmail) {

    //async.parallel([function (callback) {
        var body = {
            level: level,
            url: url,
            method: method,
            message: message,
            ip: ip,
            meta: meta,
            sendEmail: sendEmail
        }
        var options = {
            method: "POST",
            url: process.env.URL_LOGS,
            json: body
        };
        console.log(meta)
         request(options, function (err, response, body) {
             if (err)
                 //Log.Add('error', req.originalUrl, 'Log.Add', 'Erro ao enviar request para o LOG.', req.ip, { body: req.body }, true);
                console.log('log nao ok')
             //if (response.statusCode == 200)
                 //Log.Add('info', req.originalUrl, 'Log.Add', 'Request enviado com sucesso para o LOG.', req.ip, { body: req.body }, false);
         });
    //}]);

};

module.exports = new Log();