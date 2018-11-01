function Authenticate() { }

Authenticate.prototype.Internal = function (req, res, next) {
    if (req.headers.token == process.env.TOKEN) {
        next();
    } else {
        Log.Add('info', req.originalUrl, 'Authenticate.Internal', 'Autenticação interna não permitida.', req.ip, { obj: req.headers }, false);
        res.sendStatus(404);
    }
};

Authenticate.prototype.External = function (req, res, next) {
    
};

module.exports = new Authenticate();