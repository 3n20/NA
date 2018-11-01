var express = require('express');
var app = express();
var bodyParser = require('body-parser');
request = require('request');
async = require("async");
require('dotenv').config();
var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store, {
    freeRetries: 200,
    minWait: 1 * 1000,
    maxWait: 1 * 1000,
    lifetime: 1
});

Log = require('./controllers/Log');
var Message = require('./middlewares/message');
var Validade = require('./middlewares/validate');

app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT;

var router = express.Router();

router.post('/webapp/:token', Validade.SendFromWebAppToBot, Message.SendFromWebAppToBot, function (req, res) {
    Log.Add('info', req.originalUrl, 'router.webapp', 'Mensagem enviada para o WEBAPP.', req.ip, { body: req.body}, false);
    res.send(req.body)
});


//app.use('/', bruteforce.prevent, router);
app.use('/', router);


app.listen(port, function () {
    console.log(port)
    Log.Add('info', null, 'app.listen', 'Serviço de LOGS foi iniciado com sucesso.', null, { port: port });
});