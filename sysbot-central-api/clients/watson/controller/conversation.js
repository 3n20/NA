function Conversation() { }

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
    username: process.env.USERNAME_WATSON,
    password: process.env.PASSWORD_WATSON,
    version_date: ConversationV1.VERSION_DATE_2017_05_26
});


Conversation.prototype.IntentsList = function (req, res, next) {
    conversation.getIntents({
        workspace_id: req.body.idagent
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            Log.Add('error', req.originalUrl, 'Conversation.IntentsList', 'Erro ao retornar request.', req.ip, { err: err }, false);
        } else {
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            Log.Add('info', req.originalUrl, 'Conversation.IntentsList', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
        }
        res.result = retorno;
        next();
    });
}

Conversation.prototype.IntentsCreate = function (req, res, next) {
    conversation.createIntent({
        workspace_id: req.body.idagent,
        intent: req.body.intent,
        description: req.body.description
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            Log.Add('error', req.originalUrl, 'Conversation.IntentsCreate', 'Erro ao retornar request.', req.ip, { err: err }, false);
        } else {
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            Log.Add('info', req.originalUrl, 'Conversation.IntentsCreate', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
        }
        res.result = retorno;
        next();
    });
}

Conversation.prototype.IntentsDelete = function (req, res, next) {
    conversation.deleteIntent({
        workspace_id: req.body.idagent,
        intent: req.body.intent
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            Log.Add('error', req.originalUrl, 'Conversation.IntentsDelete', 'Erro ao retornar request.', req.ip, { err: err }, false);
        } else {
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            Log.Add('info', req.originalUrl, 'Conversation.IntentsDelete', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
        }
        res.result = retorno;
        next();
    });
}

Conversation.prototype.ExamplesList = function (req, res, next) {
    conversation.getExamples({
        workspace_id: req.body.idagent,
        intent: req.body.intent
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            Log.Add('erro', req.originalUrl, 'Conversation.ExamplesList', 'Erro ao retornar request.', req.ip, { err: err }, false);
        } else {
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            Log.Add('info', req.originalUrl, 'Conversation.ExamplesList', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
        }
        res.result = retorno;
        next();
    });
}

Conversation.prototype.ExamplesCreate = function (req, res, next) {
    conversation.createExample({
        workspace_id: req.body.idagent,
        intent: req.body.intent,
        text: req.body.text
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            Log.Add('erro', req.originalUrl, 'Conversation.ExamplesCreate', 'Erro ao retornar request.', req.ip, { err: err }, false);
        } else {
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            Log.Add('info', req.originalUrl, 'Conversation.ExamplesCreate', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
        }
        res.result = retorno;
        next();
    });
}

Conversation.prototype.ExamplesDelete = function (req, res, next) {
    conversation.deleteExample({
        workspace_id: req.body.idagent,
        intent: req.body.intent,
        text: req.body.text
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            Log.Add('error', req.originalUrl, 'Conversation.ExamplesDelete', 'Erro ao retornar request.', req.ip, { err: err }, false);
        } else {
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            Log.Add('info', req.originalUrl, 'Conversation.ExamplesDelete', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
        }
        res.result = retorno;
        next();
    });
}

Conversation.prototype.Log = function (req, res, next) {
    conversation.getLogs({
        workspace_id: req.body.idagent
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            Log.Add('error', req.originalUrl, 'Conversation.Log', 'Erro ao retornar request.', req.ip, { err: err }, false);
        } else {
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            Log.Add('info', req.originalUrl, 'Conversation.Log', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
        }
        res.result = retorno;
        next();
    });
}

module.exports = new Conversation();