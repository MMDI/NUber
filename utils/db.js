// db.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(connection => {
    module.exports = connection;
}).catch(err => {
    console.log(err);
});