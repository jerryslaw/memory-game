var express = require('express');

var app = express();

app.use('/images', express.static(__dirname + '/src/assets'));

app.listen(3000, function() {
        console.log('App is alive. Listening on port 3000');
    }
);