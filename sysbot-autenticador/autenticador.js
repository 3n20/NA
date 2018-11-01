var express = require('express');
var app = express();
var bodyParser = require('body-parser');
request = require('request');
linq = require('linq');
async = require("async");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}


require('./db/connection');
Log = require('./controller/Log');
var Subnetwork = require('./middlewares/subnetwork');
var User = require('./middlewares/user');
var Message = require('./middlewares/message');

app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT;

var router = express.Router();

router.post('/webhook/:token', Subnetwork.ValidateFromWebhookToBot, User.ValidateFromWebhookToBot, Message.SendFromWebhookToBot, function (req, res) {
    //, User.ValidateFromBotToWebhook
    //Log.Add('info', req.originalUrl, 'router/webhook', 'Request finalizado.', req.ip, { body: req.body }, false);
    res.send(req.body)

});


app.use('/', router);

app.listen(port, function () {
    console.log(port)
   Log.Add('info', null, 'app.listen', 'Servidor express foi iniciado com sucesso.', null, { port: port }, false);
});