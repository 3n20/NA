var SubnetworkModel = require('../db/models/subnetwork');

function SubnetworkController() { }

SubnetworkController.prototype.SubnetworkMemory = function () {
    SubnetworkModel.find({}, function (err, Subnetwork) {
        if (err || !Subnetwork) {
            Log.Add('error', req.originalUrl, 'SubnetworkController.SubnetworkMemory', 'Erro ao carregar dados de subnetwork.', req.ip, { err: err }, true);
            return res.sendStatus(403);
        }
        _Subnetwork = Subnetwork;
        console.log("carregou memoria Subnetwork")
        Log.Add('info', null, 'SubnetworkController.SubnetworkMemory', 'Memoria subnetwork carregada.', null, { Subnetwork: _Subnetwork }, true);
    });
}

module.exports = new SubnetworkController();