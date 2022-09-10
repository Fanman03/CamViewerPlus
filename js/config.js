const fs = require('fs');
const path = require('path');

function get() {
    let data;
    try {
        let rawFile = fs.readFileSync('./conf/config.json');
        data = JSON.parse(rawFile);
    } catch {
        let rawFile = fs.readFileSync('./config.default.json');
        fs.copyFileSync('./config.default.json', './conf/config.json')
        data = JSON.parse(rawFile);
    }
    return data;
}

async function getAsync() {
    let data;
    try {
        let rawFile = await fs.readFile('./conf/config.json');
        data = JSON.parse(rawFile);
    } catch {
        let rawFile = await fs.readFile('./config.default.json');
        fs.copyFileSync('./config.default.json', './conf/config.json')
        data = JSON.parse(rawFile);
    }
    return data;
}

async function getGrids() {
    const gridsPath = path.join(__dirname, '../views');

    let availableGrids = [];

    await fs.readdir(gridsPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            if (file.includes("-grid.hbs")) {
                availableGrids.push(file.replace("-grid.hbs", ""));
            }
        });
    });

    return availableGrids;
}

function setGridType(grid) {
    let content = JSON.parse(fs.readFileSync('./conf/config.json', 'utf8'));

    content.settings.gridType = grid;

    fs.writeFileSync('./conf/config.json', JSON.stringify(content));
}

function setKeepAwake(state) {
    let content = JSON.parse(fs.readFileSync('./conf/config.json', 'utf8'));

    content.settings.keepAwake = state;

    fs.writeFileSync('./conf/config.json', JSON.stringify(content));
}

module.exports = { get, getAsync, getGrids, setGridType, setKeepAwake }