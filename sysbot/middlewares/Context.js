var Log = require('../controllers/Log');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sysbot";
function Context(){}
Context.prototype.getContext = function (req, res, next) {
    if(req.body.meta.iduser == '0000000'){
        req.body.context = {};
        next();
    }else{
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db.collection("user").findOne({'iduser':req.body.meta.iduser.toString()}, function (err, result) {
                if (err){
                    Log.Add('error', req.originalUrl, 'getContext', 'Erro ao recuperar contexto da base: '+err, req.ip, { body: req.body }, false);
                }
                if(!result){
                    console.log('NAO ENCONTRADO')
                }
                else if(result.context.value){
                    var context = result.context.value;
                    req.body.context = context
                    req.body.status = 'andamento'
                    Log.Add('info', req.originalUrl, 'getContext', 'Contexto recuperado com sucesso', req.ip, { body: req.body }, false);
                }
                else{
                    req.body.context = {}
                    req.body.status = 'inicio'
                    Log.Add('info', req.originalUrl, 'getContext', 'Contexto inicial gerado com sucesso', req.ip, { body: req.body }, false);
                } 
                db.close();
                next();
            });
        });
    }
}

Context.prototype.setContext = function (req, res, next) {
    if(req.body.meta.iduser == '0000000'){
        req.body.context = {};
        next();
    }else{
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db.collection("user").findOne({ "idsubnetwork": req.body.meta.idsubnetwork.toString(), "iduser": req.body.meta.iduser.toString() }, function (err, result) {
                if(result){
                    result.context = { dt_created: new Date(), value: req.body.user.context };
                    var myquery = { "idsubnetwork": req.body.meta.idsubnetwork.toString(), "iduser": req.body.meta.iduser.toString()};
                    db.collection("user").updateOne(myquery, result, function(err, res) {
                    if (err) {
                        Log.Add('error', req.originalUrl, 'setContext', 'Erro ao atualizar contexto na base de dados', req.ip, { body: req.body }, false);
                    } else {
                        Log.Add('info', req.originalUrl, 'getContext', 'Contexto atualizado com sucesso', req.ip, { body: req.body }, false);
                        delete req.body.user;
                        delete req.body.meta.iduser;
                        delete req.body.meta.idsubnetwork;
                        db.close();
                        next()
                    }
                    
                    }); 

                } 
                db.close();
            });
        }); 
    }
}

module.exports = new Context()