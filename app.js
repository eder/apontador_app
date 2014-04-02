#!/usr/bin/env node

'use strict';
/**
 * Serves static pages with the app/css from the apps.
 */

var http = require('http');
var express = require('express');
var request = require('request');
var args = process.argv.slice(2);
var path = require('path');


var app = express(),
    basePath = '',
    staticDir = '';

/**
 * Configure server settings based on cli args.
 */
if (args.length) {
    args.forEach(function (arg) {
        var flag = arg.split('=')[0];

        switch (flag) {
        case '--local':

            break;
        case '--static-dir'

            break;
        default:

            break;
        }
    });
}


app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.static(path.join(__dirname, staticDir)));

app.get('/', function (req, res) {
    getPoiBody(req.query.poi);
    res.send(html + generatesSources(req.query.app));
});

var getPoiBody = function (poi) {
    request('http://www.apontador.com.br/' + poi + '', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            return body;
        }
    });
};

var generatesSources = function (path) {
    var css = '<link href="' + path + '/style.css" media="screen" rel="stylesheet" type="text/css">\n';
    var js = '<script src="' + path + '/app.js" type="text/javascript"></script>';
    return css + js;
};

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
