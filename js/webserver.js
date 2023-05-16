const express = require('express');
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require("fs");
const config = require("../js/config");
const { proxy, scriptUrl } = require('rtsp-relay')(app);
const pjson = require('../package.json');
var pm2 = require('pm2');

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
    app.use('/js', express.static(path.join(__dirname, '../node_modules/@popperjs/core/dist/cjs')));
    app.use('/js', express.static(path.join(__dirname, '../node_modules/panzoom/dist/')));
    app.use('/assets', express.static(path.join(__dirname, '../assets')));
    app.use('/favicon-32x32.png', express.static(path.join(__dirname, '../assets/favicon-32x32.png')));
    app.use('/favicon-16x16.png', express.static(path.join(__dirname, '../assets/favicon-16x16.png')));
    app.use('/favicon.ico', express.static(path.join(__dirname, '../assets/favicon.ico')));


    app.get('/', async (req, res) => {
        let freshConfig = await config.get();
        let availableGrids = await config.getGrids();
        let gridName = freshConfig.settings.gridType + "-grid";
        res.render(gridName, {
            streamPort: configData.settings.streamPort,
            scriptUrl: "/assets/jsmpeg.min.js",
            availableGrids: availableGrids,
            thisGrid: freshConfig.settings.gridType,
            version: pjson.version,
            keepAwake: freshConfig.settings.keepAwake,
            kioskMode: false,
            transportProtocol: freshConfig.settings.transportProtocol,
            quality: freshConfig.settings.quality
        });
    });

    app.get('/kiosk', async (req, res) => {
        let freshConfig = await config.get();
        let availableGrids = await config.getGrids();
        let gridName = freshConfig.settings.gridType + "-grid";
        res.render(gridName, {
            streamPort: configData.settings.streamPort,
            scriptUrl: "/assets/jsmpeg.min.js",
            availableGrids: availableGrids,
            thisGrid: freshConfig.settings.gridType,
            version: pjson.version,
            keepAwake: freshConfig.settings.keepAwake,
            kioskMode: true,
            transportProtocol: freshConfig.settings.transportProtocol,
            quality: freshConfig.settings.quality
        });
    });

    app.get('/setConfig/:option/:value', async (req, res) => {
        let option = req.params.option;
        let value = req.params.value;
        if (option === "gridType") {
            config.setGridType(value);
        } else if (option === "keepAwake") {
            config.setKeepAwake(value);
        } else if (option === "transportProtocol") {
            config.setTransportProtocol(value);
        } else if (option === "quality") {
            config.setQuality(value);
        }
        res.redirect("/#settings");
    });

    app.get("/restartService", (req, res)=> {
        pm2.connect(function(err) {
            if (err) {
              console.error(err);
              process.exit(2);
            }
          
            pm2.restart('camviewer', function(err) {
              pm2.disconnect();   // Disconnects from PM2
              if (err) throw err
            });
          });
          res.redirect("/#settings");     
    })

    app.listen(configData.settings.uiPort, () => {
        console.log(`Web server listening on port ${configData.settings.uiPort}`);
    });

    //404 route - MUST COME LAST
    app.get('*', function (req, res) {
        res.render('404', { layout: 'error', errorCode: '404', errorShortDesc: 'Page not found.', errorDesc: 'The page you’re looking for doesn’t exist.' });
    });
}

module.exports = { start }