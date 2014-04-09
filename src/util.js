/**
 * Utils for generating the stuff to be appended to the last part of the
 * page.
 */

(function(){
    'use strict';

    var genSocketScript = function (serverUri) {
        var script =
            '<script src="http://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js"></script>' +
            '<script>' +
                "var socket = io.connect('" + serverUri + "');" +
                "socket.on('code', function (data) {" +
                    "eval(data);" +
                "});" +

                "socket.on('reload', function (data) {" +
                    "window.location.reload();" +
                "})" +
            '</script>';

        return script;
    };

    var genCssAndJsScript = function (jsFile, cssFile) {
        var script =
            "var d=document;var s;" +
            "var h = d.getElementsByTagName('head')[0];";

            if (jsFile) {
                script +=
                    "s = d.createElement('script');" +
                    "s.type='text/javascript';" +
                    "s.async=true;" +
                    "s.src='" + jsFile + "';" +
                    "h.appendChild(s);";
            }

            if (cssFile) {
                script +=
                    "s = d.createElement('link');" +
                    "s.href = '" + cssFile + "';" +
                    "s.rel = 'stylesheet';" +
                    "s.type = 'text/css';" +
                    "h.appendChild(s);";
            }

            return script;
    }


    var genLoadScript = function (jsFile, cssFile, socketIoUri) {

        var onLoadEventScript = "<script>window.onload = function () {" +
            genCssAndJsScript(jsFile, cssFile) + "};</script>";

        return socketIoUri
            ? onLoadEventScript + genSocketScript(socketIoUri)
            : onLoadEventScript;
    };

    module.exports = {
        genLoadScript: genLoadScript,
    };
})();