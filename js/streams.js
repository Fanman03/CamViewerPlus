const config = require("../js/config");
const express = require('express');
const app = express();
const { proxy, scriptUrl } = require('rtsp-relay')(app);

function start() {
    let configData = config.get();
    for (let i = 0; i < configData.settings.cameras.length; i++) {
        let thisHandler = proxy({
            url: configData.settings.cameras[i].source,
            // if your RTSP stream need credentials, include them in the URL as above
            verbose: false,
            additionalFlags: ['-q', '5'],
        });
        app.ws('/api/stream/' + configData.settings.cameras[i].position, thisHandler);

    }
    app.listen(configData.settings.streamPort);
    console.log("started stream on port " + configData.settings.streamPort);
}

module.exports = { start }
