function Log() { }

Log.prototype.Add = function (level, url, method, message, ip, meta, sendEmail) {

   // async.parallel([function (callback) {
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
                console.log('log nao ok')
                 //Log.Add('error', null, 'Log.Add', 'Erro ao enviar request para o LOG.', null, { body: null }, true);
             //if (response.statusCode == 200)
                console.log('log ok')
                 //Log.Add('info',null, 'Log.Add', 'Request enviado com sucesso para o LOG.', null, { body: null }, false);
        });
    //}]);

};

module.exports = new Log();