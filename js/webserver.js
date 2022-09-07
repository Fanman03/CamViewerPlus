const express = require('express');
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require("fs");
const config = require("../js/config");

function start() {
    let configData = config.get();

    app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
    app.set('view engine', 'hbs');

    app.use(cors());

    app.use('/js', express.static(path.join(__dirname, '../js/lib/')));
    app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
    app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font')));
    app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
    app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

    app.get('/', (req, res) => {

        res.render(configData.settings.gridType, {
            streamPortStart: configData.settings.streamPortStart
        });
    });

    app.listen(configData.settings.uiPort, () => {
        console.log(`Web server listening on port ${configData.settings.uiPort}`);
    });
}

module.exports = { start }