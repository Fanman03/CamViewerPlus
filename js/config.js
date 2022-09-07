const fs = require('fs');

function get() {
    let data;
    try {
        let rawFile = fs.readFileSync('./config.json');
        data = JSON.parse(rawFile);
    } catch {
        let rawFile = fs.readFileSync('./config.default.json');
        fs.copyFileSync('./config.default.json','./config.json')
        data = JSON.parse(rawFile);
    }
    return data;
}

module.exports = { get }