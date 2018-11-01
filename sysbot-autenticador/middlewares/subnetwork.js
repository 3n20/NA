var SubnetworkController = require('../controller/subnetwork');
SubnetworkController.SubnetworkMemory();
function Subnetwork(){}
Subnetwork.prototype.ValidateFromWebhookToBot = function(req, res, next){
    console.log('Subnetwork ValidateFromWebhookToBot')
    if(req.params.token !== process.env.TOKEN_WEBHOOK){
        Log.Add('error', req.originalUrl, 'Subnetwork.ValidateFromWebhookToBot', 'Erro ao validar token', req.ip, {token: req.params.token}, true);
        return res.sendStatus(404);
    }
    if(!_Subnetwork)
        SubnetworkController.SubnetworkMemory();
    var _result = linq.from(_Subnetwork).where("$._id == '" + req.body.meta.idsubnetwork + "' ").toArray();
    if(_result.length > 0){
        req.subnetwork   = _result[0];
        req.body.idagent = _result[0].idagent;
        next();
    }else{
        console.log('nao valido')
        Log.Add('error', req.originalUrl, 'Subnetwork.ValidateFromWebhookToBot', 'Subnetwork não valida', req.ip, { body: req.body }, true);
        return res.sendStatus(404);
    }
};
Subnetwork.prototype.ValidateFromBotToWebhook = function (req, res, next){
    console.log('Subnetwork ValidateFromBotToWebhook')    
};
module.exports = new Subnetwork();