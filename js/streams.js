rtspserver = require('node-rtsp-stream');
const config = require("../js/config");

function start() {
    let configData = config.get();
    for (let i = 0; i < configData.settings.cameras.length; i++) {
        const cam = configData.settings.cameras[i];
        let thisStream = new rtspserver({
            name: 'name',
            streamUrl: cam.source,
            wsPort: parseInt(configData.settings.streamPortStart) + parseInt(cam.position),
            ffmpegOptions: { // options ffmpeg flags
                '-r': 30 // options with required values specify the value after the key
            }
        })
        console.log("started stream on port " + (configData.settings.streamPortStart + parseInt(cam.position)));
    }
}

module.exports = { start }
