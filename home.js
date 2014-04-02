  // Include the Node HTTP library
var http = require('http');
  // Include the Express module
var express = require('express');
  // Create an instance of Express
var app = express();
  // Start the app
var request = require('request');
http.createServer(app).listen(8000, function () {
    'use strict';
    console.log('Express app started');
});
var html;
app.use(express.static('./apps/'));
var showHome = function () {
    'use strict';
    request('http://local.apontador.com.br:3001/home/', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            html = body;
        }
    });

};

var addSources = function (app) {
    'use strict';
    var css = '<link href="../' + app + '/style.css" media="screen" rel="stylesheet" type="text/css">\n',
        js = '<script src="../' + app + '/app.js" type="text/javascript"></script>';
    return css + js;
};

app.get('/', function (req, res) {
    'use strict';
    showHome();
    res.send(html + addSources(req.query.app));
});


