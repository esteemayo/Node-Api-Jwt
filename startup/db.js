const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    mongoose.connect(config.get('db'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log('MONGODB CONNECTED.....'))
        .catch(err => console.log(`COULD NOT CONNECT TO MONGODB.....${err}`));
}