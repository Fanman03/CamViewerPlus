const config = require("./js/config");
const streams = require("./js/streams");
const webserver = require("./js/webserver");

streams.start();
webserver.start();