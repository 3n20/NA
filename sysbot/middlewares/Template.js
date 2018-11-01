var request = require('request');
var Log = require('../controllers/Log');
function Template() { }

Template.prototype.toAuthenticator = function(req,res,next){

    var uboundEl = req.body.response.output.nodes_visited.length - 1;
    var body = {
        "user":{
            "context":req.body.response.context,
            "particulary":{}
        },
        "meta":{
            "idsubnetwork":req.body.meta.idsubnetwork,
            "iduser":req.body.meta.iduser,
            "text":req.body.response.output.text[0],
            "idnode": req.body.response.output.nodes_visited[uboundEl],
            "multipart":[],
            "aval":false,
            "conversation_id": req.body.response.context.conversation_id,
            "timestamp":req.body.meta.timestamp,
            "idInteration": req.body.meta.idInteration,
            "tituloDasOpcoes": req.body.response.output.title,
            "opcoes": req.body.response.output.opcoes
      }
    };


    if(req.body.response.output.multipart){
        body.meta.multipart = req.body.response.output.multipart
    }
    if(req.body.response.output.aval == true){
        body.meta.aval = true
    }

    req.body = body;
    console.log('template ok')
    Log.Add('info', req.originalUrl, 'template', 'Template aplicado com sucesso', req.ip, { body: req.body }, false);
    next()

}

module.exports = new Template()