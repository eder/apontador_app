#!/usr/bin/env node

'use strict';
/**
 * Serves static pages with the app/css from the localapps.
 * It takes a few cli arguments to configure it well.
 */

var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var express = require('express');
var request = require('request');
var myUtils = require('./util');

var app = express(),
    server,
    webpageUrl = '',
    io = null,
    staticDir = '',
    watchDir = '',
    useSocket = false,
    args = process.argv.slice(2);

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
            break;

        case '--watch':
            useSocket = true;
            watchDir = path.resolve(watchDir);
            break;

        default:
            console.log("Invalid arg.");
            process.exit(1);
        }
    });
} else {
    console.error("Error: no args specified.");
    console.error("Specify a webpage (--webpage=WEBPAGE) and a static dir " +
                "(--dir=DIRECTORY) to proceed.");
    process.exit(1);
}

/**
 * Express specific stuff
 */
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.compress());

/**
 * Proxying logic. If it takes .css or .js files, don't do a thing, just
 * stop and send the request to the next middleware - which knows how to
 * deal greatly with them, otherwise, let the magic happen!
 */
app.use(function (req, res, next) {

    var requestUrl = req.url;
    var pl = url.parse(requestUrl).path.split('/');
    var fileServed = pl[pl.length - 1];


    if (fileServed.match(/\.js/) || fileServed.match(/\.css/)) {
        next();
        return;
    }

    request(url.resolve(webpageUrl, requestUrl), function (err, resp, body) {

        if (err || resp.statusCode !== 200) {
            next(err);
        } else {
            if (useSocket) {
                res.end(body +
                        myUtils.genLoadScript('app.js', 'style.css',
                                              'http://localhost:' +
                                               app.get('port')));
            } else {
                res.end(body +
                        myUtils.genLoadScript(path.join(staticDir, 'app.js'),
                                              path.join(staticDir, 'style.css')));
            }
        }
    });
});

if (staticDir) {
    app.use(staticDir, express.static(staticDir));
}

// Server Initialization

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


/**
 * Socket.io stuff
 */

if (useSocket) {
    io = require('socket.io').listen(server);
    io.sockets.on('connection', socketsConnectionHandler);
}

/**
 * Handles the connection of a socket into the sockets.io server.
 */
function socketsConnectionHandler (socket) {
    if (watchDir) {
        fs.watch(watchDir, function (ev, filename) {
            if (ev === 'rename') {
                // do something if it was just a rename
            } else if (ev === 'change') {
                socket.emit('reload', {data: 'reload the browser'});
            }
        });
    }
};
