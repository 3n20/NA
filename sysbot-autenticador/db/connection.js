var Mongoose = require('mongoose').Mongoose;
mongoose = new Mongoose();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_STRING, { useMongoClient: true , connectTimeoutMS: 1000
});

var db = mongoose.connection;

db.on('error', function () {
  throw new Error('error');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

module.exports = mongoose;
