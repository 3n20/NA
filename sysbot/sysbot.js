'use strict';
require('dotenv').config({ silent: true });
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');

require('./model/connection');


var Log = require('./controllers/Log');
var Context = require('./middlewares/Context');
var Message = require('./middlewares/Message');
var Chat = require('./middlewares/Chat');
var Template = require('./middlewares/Template');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/send', Context.getContext, Message.sendFromOrchestratorToNlp, Chat.Add, Template.toAuthenticator, Context.setContext, function (req, res) {
    res.send(req.body)
    //Log.Add('info', req.originalUrl, 'post', 'mensagem prestes a ser enviada', req.ip, { body: req.body }, false); //log inicial
});



var port = process.env.PORT;
app.listen(port, function () {
    console.log('SYSBOT on na porta: ' + port);
    Log.Add('info', null, 'app.listen', 'Servidor express foi iniciado com sucesso.', null, { port: port }, false);
});



