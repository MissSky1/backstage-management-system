var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/lagou4');
mongoose.Promise = global.Promise;

module.exports = mongoose;