/* server.js*/
const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
const db = require('./utils/db');//needed?
const port = process.env.PORT || 3000;
const app = express();

/* homepage*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/* to other routes*/
app.use('/api', apiRouter);

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});