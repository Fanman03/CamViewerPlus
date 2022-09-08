const express = require('express');
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require("fs");
const config = require("../js/config");
const { proxy, scriptUrl } = require('rtsp-relay')(app);
const pjson = require('../package.json');

function start() {
    let configData = config.get();

    app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
    app.set('view engine', 'hbs');

    app.use(cors());

    app.use('/css', express.static(path.join(__dirname, '../css')));
    app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
    app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font')));
    app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
    app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

    app.get('/', async (req, res) => {
        let freshConfig = await config.get();
        let availableGrids = await config.getGrids();
        let gridName = freshConfig.settings.gridType + "-grid";
        res.render(gridName, {
            streamPort: configData.settings.streamPort,
            scriptUrl: scriptUrl,
            availableGrids: availableGrids,
            thisGrid: freshConfig.settings.gridType,
            version: pjson.version
        });
    });

    app.get('/setConfig/:option/:value', async (req, res) => {
        let option = req.params.option;
        let value = req.params.value;
        if(option === "gridType") {
            config.setGridType(value);
        }
        res.redirect("/");
    });

    app.listen(configData.settings.uiPort, () => {
        console.log(`Web server listening on port ${configData.settings.uiPort}`);
    });
}

module.exports = { start }