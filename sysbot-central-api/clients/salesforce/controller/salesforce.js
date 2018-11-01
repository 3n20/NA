function Salesforce() { }

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var nodemailer = require('nodemailer');

Salesforce.prototype.getUser = function (req, res, next) {
    MongoClient.connect(url + 'sysbot', function (err, db) {
        if (err) {
            Log.Add('error', req.originalUrl, 'Salesforce.getConversation', 'Erro ao conectar na base: ' + err, req.ip, { body: req.body }, true);
        }

        if(req.body.meta.iduser) {
            db.collection("user").find({'iduser': req.body.meta.iduser}, function (err, result) {
                if (err) {
                    Log.Add('error', req.originalUrl, 'Salesforce.getUser', 'Erro ao recuperar usuário da base: ' + err, req.ip, {body: req.body}, true);
                }
                else {
                    req.body = result;
                    Log.Add('info', req.originalUrl, 'Salesforce.getUser', 'Usuário recuperado da base', req.ip, {body: req.body}, true);
                }
                next()
            });
        } else {
            res.statusCode = 400;
            res.send();
        }
    });
};

Salesforce.prototype.getConversation = function (req, res, next) {
    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) {
            Log.Add('error', req.originalUrl, 'Salesforce.getConversation', 'Erro ao conectar na base: ' + err, req.ip, { body: req.body }, true);
        }
        var query = { "iduser": req.body.iduser, "idsubnetwork": req.body.idsubnetwork };

        if(req.body.conversationId){
            query.conversation_id = req.body.conversationId;
        }


        db.collection("chat").find(query).toArray(function (err, result) {
            if (err) {
                Log.Add('error', req.originalUrl, 'Salesforce.getConversation', 'Erro ao recuperar conversa da base: ' + err, req.ip, { body: req.body }, true);
            }
            else {
                if(result && result.length > 0) {
                    Log.Add('info', req.originalUrl, 'Salesforce.getConversation', 'Conversa recuperada da base', req.ip, {body: req.body}, true);
                    req.body.logs = result[result.length - 1];
                    next();
                } else {
                    res.statusCode = 204;
                    res.send();
                }
            }
        });
    });
};

Salesforce.prototype.sendEmailToCase = function (req, res, next) {

    var logs = '';

    for (var i = 0; req.body.logs.length > i; i++) {
        if(req.body.logs[i].interations) {
            req.body.logs[i].interations.forEach(function (valor) {
                logs += 'Usuário: ' + valor.input + '\n';
                if (Array.isArray(valor.output)) {
                    logs += 'XP: ' + valor.output[0] + '\n';
                } else {
                    logs += 'XP: ' + valor.output.text[0] + '\n'
                }

            });
        }
    }
    var mail_body = logs + '\n\n#CONTAXP: ' + req.body.iduser;

    var transporter = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: process.env.PORT_EMAIL,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.LOGIN_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        },
        tls: {
            ciphers: 'SSLv3'
        }

    });

    var mailOptions = {
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: process.env.SUBJECT_EMAIL,
        text: mail_body
    };


    transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
            console.log('ERRO EMAIL: ' + err);
            Log.Add('error', req.originalUrl, 'Salesforce.sendEmailToCase', 'Erro ao enviar e-mail: ' + err, req.ip, { body: req.body }, true);
            next();
        } else {
            console.log(success)
            Log.Add('info', req.originalUrl, 'Salesforce.sendEmailToCase', 'E-mail enviado com sucesso', req.ip, { body: req.body }, true);
            next()
        }
    });
};



Salesforce.prototype.endConversation = function (req, res, next) {

    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) {
            Log.Add('error', req.originalUrl, 'Salesforce.endConversation', 'Erro ao conectar na base: ' + err, req.ip, { body: req.body }, true);
        }
        db.collection("chat").find({ 'iduser': req.body.iduser, 'idsubnetwork': req.body.idsubnetwork }).toArray(function (err, result) {
            if (err) {
                Log.Add('error', req.originalUrl, 'Salesforce.endConversation', 'Erro ao recuperar conversa da base ' + err, req.ip, { body: req.body }, true);
            }
            else {

                var last = result.length - 1;
                var dataini = new Date(result[0].timestamp);
                var datafim = new Date(result[last].timestamp);
                var tempo = Math.abs(datafim - dataini) / 1000;
                // calculando dias
                var days = Math.floor(tempo / 86400);
                tempo -= days * 86400;
                // calculando horas
                var hours = Math.floor(tempo / 3600) % 24;
                tempo -= hours * 3600;
                // calculando minutos
                var minutes = Math.floor(tempo / 60) % 60;
                tempo -= minutes * 60;
                // calculando segundos
                var seconds = tempo % 60;
                var str = seconds.toString();
                var res = str.substring(0, 2);
                var str = res;
                var res = str.replace(".", "");
                var seconds = res;
                //formatando 00:00:00
                if (hours.toString().length == 1) {
                    hours = "0" + hours.toString();
                }
                if (minutes.toString().length == 1) {
                    minutes = "0" + minutes.toString();
                }
                if (seconds.toString().length == 1) {
                    seconds = "0" + seconds.toString();
                }
                console.log(hours + ":" + minutes + ":" + seconds)
                var TimeDifference = hours + ":" + minutes + ":" + seconds


                var details = {
                    'TimeDifference': TimeDifference,
                    'NumberInteractions': result.length,
                    'dataini': dataini,
                    'datafim': datafim,
                    'ClassificaGeral':'5'
                }
                //var last = result.length - 1;
                var myquery = { 'iduser': req.body.iduser, 'idsubnetwork': req.body.idsubnetwork, 'timestamp': result[last].timestamp };
                var newvalues = { $set: { status_conversation: 'final', details } };

                db.collection("chat").updateOne(myquery, newvalues, function (err, result) {
                    if (err) {
                        Log.Add('error', req.originalUrl, 'Salesforce.endConversation', 'Erro ao ataualizar conversa da base ' + err, req.ip, { body: req.body }, true);
                    }
                    console.log("1 document updated");
                });
            }
            next()
        });
    });

}


Salesforce.prototype.updateUserContext = function (req, res, next) {
    MongoClient.connect(url + 'sysbot', function (err, db) {
        if (err) {
            Log.Add('error', req.originalUrl, 'Salesforce.updateUserContext', 'Erro ao conectar na base: ' + err, req.ip, { body: req.body }, true);
        }
        var myquery = { iduser: req.body.iduser };
        var newvalues = { idproject: req.body.idproject, idnetwork: req.body.idnetwork, idsubnetwork: req.body.idsubnetwork, iduser: req.body.iduser, context: { dt_created: new Date(), value: null }, particulary: {} };
        db.collection("user").updateOne(myquery, newvalues, function (err, res) {
            if (err) {
                Log.Add('error', req.originalUrl, 'Salesforce.updateUserContext', 'Erro ao atualizar contexto: ' + err, req.ip, { body: req.body }, true);
            } else {
                console.log('Contexto reiniciado')
                Log.Add('info', req.originalUrl, 'Salesforce.updateUserContext', 'Contexto reiniciado na base', req.ip, { body: req.body }, true);
                next()
            }
        });
    });

    next();
};

module.exports = new Salesforce();