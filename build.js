const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const EXTENSIONS_DIR = path.join(__dirname, 'extensions');
const OUT_DIR = path.join(__dirname, 'build');

const extensions = fs.readdirSync(EXTENSIONS_DIR).map(readExtension);

try { fs.mkdirSync(OUT_DIR); } catch {}

fs.writeFileSync(path.join(OUT_DIR, 'index.html'), renderTemplate('index.html', { extensions }));
fs.copyFileSync('index.js', path.join(OUT_DIR, 'index.js'));

// ------------------------------------------

function readExtension(name) {
    const dirpath = path.join(EXTENSIONS_DIR, name);
    const settings = JSON.parse(fs.readFileSync(path.join(dirpath, 'extension.json'), 'utf8'));
    const description = settings['description'];
    let linkUrl = "";
    let scriptUrl = `https://extensions.netsblox.org/extensions/${name}/index.js`;

    if (!settings['useDev']) {
        linkUrl = `https://editor.netsblox.org/?extensions=[%22${scriptUrl}%22]#`;
    } else {
        linkUrl = `https://dev.netsblox.org/?extensions=[%22${scriptUrl}%22]#`;
    }

    return {
        name,
        displayName : settings['customName'] ?? name,
        description,
        linkUrl,
        scriptUrl,
    };
}

function renderTemplate(name, data) {
    return _.template(fs.readFileSync(name, 'utf8'))(data).trim();
}
