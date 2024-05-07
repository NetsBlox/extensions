const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const EXTENSIONS_DIR = path.join(__dirname, 'extensions');
const TEMPLATES_DIR = path.join(__dirname, 'templates');

const extensions = fs.readdirSync(EXTENSIONS_DIR).map(readExtension);
const templates = fs.readdirSync(TEMPLATES_DIR);

for (const template of templates) {
    fs.writeFileSync(template, renderTemplate(path.join(TEMPLATES_DIR, template), { extensions }));
}

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
