(function(){
    'use strict';

    /**
     * Generates the script which will get the resources to be injected.
     * @param  {'string'} jsFile  path to the js file relative to the static
     *                            dir
     * @param  {'string'} cssFile path to the css file relative to the
     *                            static dir
     * @return {'string'}         the final script.
     */
    var genLoadScript = function (jsFile, cssFile) {

        var onLoadEventScript =
            "<script>" +
                "window.onload = function () {" +
                    "var d=document," +
                        "h = d.getElementsByTagName('head')[0]," +
                        "s = d.createElement('script');" +

                    "s.type='text/javascript';" +
                    "s.async=true;" +
                    "s.src='" + jsFile + "';" +
                    "h.appendChild(s);" +

                    "s = d.createElement('link');" +
                    "s.href = '" + cssFile + "';" +
                    "s.rel = 'stylesheet';" +
                    "s.type = 'text/css';" +
                    "h.appendChild(s);" +
                "};" +
            "</script>";

        return onLoadEventScript;
    };

    module.exports = {
        genLoadScript: genLoadScript
    };
})();