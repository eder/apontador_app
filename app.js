  // Include the Node HTTP library
var http = require('http');
  // Include the Express module
var express = require('express');
  // Create an instance of Express
var app = express();
  // Start the app
var request = require('request');
http.createServer(app).listen(3000, function() {
  console.log('Express app started');
});
var html;
app.use(express.static('./apps/'));


var showPoi = function(poi) {
  request('http://www.apontador.com.br/'+ poi + '', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      html = body; 
    }
  });

};

var addSources = function(app) {
  var css = '<link href="../'+ app +'/style.css" media="screen" rel="stylesheet" type="text/css">\n';
  var js = '<script src="../'+ app +'/app.js" type="text/javascript"></script>';
  return css + js ;
};



app.get('/', function(req, res) {
  showPoi(req.query.poi);
  res.send(html + addSources(req.query.app)); 
});


