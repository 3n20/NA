var express = require('express');
var app = express();
var bodyParser = require('body-parser');
request = require('request');


linq = require('linq');
apicache = require('apicache');
apicache.options({
    appendKey: ['body'],
    stringify: true,
    statusCodes: {
        include: [200, 201, 202, 203, 204, 205, 206, 207]
    }
})
cache = apicache.middleware;
http = require('http');
async = require("async");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

Log = require('./config/log');

filterResult = require('./config/filterResult');
filterTD = require('./config/filterTD');
filterFounds = require('./config/filterFounds');
Logger = require('./config/logger');
Authenticate = require('./config/authenticate');

app.enable('trust proxy');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT;

app.use(require('./clients/watson/router/routes'));
app.use(require('./clients/xp/router/routes'));
app.use(require('./clients/salesforce/router/routes'));




app.listen(port, function () {
    Log.Add('info', null, 'app.listen', 'Servidor express foi iniciado com sucesso.', null, { port: port }, false);
});