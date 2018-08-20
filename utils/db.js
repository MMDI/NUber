/* db.js*/
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(connection => {
    module.exports = connection;
}).catch(err => {
    console.log(err);
});