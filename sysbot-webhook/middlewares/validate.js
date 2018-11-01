
function Validate() { }

Validate.prototype.SendFromWebAppToBot = function (req, res, next) {
    console.log('Validate SendFromWebAppToBot')
    if (req.params.token == process.env.TOKEN_WEBAPP)
        next();
    else {
        console.log('erro');
        Log.Add('error', req.originalUrl, 'Validate.SendFromWebAppToBot', 'Erro ao validar o token: ' + req.params.token, req.ip, { body: req.body }, true);
        return res.sendStatus(404);
    }
};

module.exports = new Validate();
