const config = require("./js/config");
const streams = require("./js/streams");
const webserver = require("./js/webserver");
const process = require('node:process');

process.setMaxListeners(0);

streams.start();
webserver.start();