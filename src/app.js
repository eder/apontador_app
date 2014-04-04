#!/usr/bin/env node

'use strict';
/**
 * Serves static pages with the app/css from the localapps.
 * It takes a few cli arguments to configure it well.
 *
 * --webpage : the webpage which will get the full
 */

var http = require('http');
var express = require('express');
var request = require('request');
var io = require('socket.io');
var args = process.argv.slice(2);
var path = require('path');
var myUtils = require('./util');

var app = express(),
    server,
    webpageUrl = '',
    staticDir = '',
    useSocket = false;


/**
 * Configures server settings based on cli args.
 */
if (args.length) {
    args.forEach(function (arg) {
        var thisArg = arg.split('=');
        var flag = thisArg[0];

        switch (flag) {
        case '--webpage':
            webpageUrl = thisArg[1];
            break;

        case '--dir':
            staticDir = path.resolve(thisArg[1]);
            console.log(staticDir);
            break;

        case '--pipe':
            useSocket = true;
            break;

        default:
            console.log("Invalid arg");
            process.exit(1);
        }
    });
} else {
    console.error("Error: no args specified.");
    console.log("Specify a webpage (--webpage=WEBPAGE) and a static dir " +
                "(--dir=DIRECTORY) to proceed.");
    process.exit(1);
}

/**
 * Express specific stuff
 */
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.compress());
app.use(app.router);
app.use(express.static(staticDir));

/**
 * Routing functions
 */
app.get('/', function (req, res) {
    console.log("Proxying " + webpageUrl);
    request(webpageUrl, function (err, resp, body) {
        if (!err && resp.statusCode === 200) {
            res.send(body + myUtils.genLoadScript('app.js', 'style.css'));
        }
    });
});


server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


/**
 * Socket.io
 */

if (useSocket) {
    io.listen(server);
}
