const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const EXTENSIONS_DIR = path.join(__dirname, '..', 'extensions');
const TEMPLATES_DIR = path.join(__dirname, 'templates');

const extensions = fs.readdirSync(EXTENSIONS_DIR)
    .map(readExtension);
const templateData = {extensions};

const updateCount = fs.readdirSync(TEMPLATES_DIR)
    .reduce((updateCount, name) => renderTemplate(name, templateData) + updateCount, 0)

if (updateCount > 0) {
    console.log('Files have been updated. Please review and commit.')
    process.exit(1);
}

function readExtension(name) {

    const dirpath = path.join(EXTENSIONS_DIR, name);
    const settings = JSON.parse(fs.readFileSync(path.join(dirpath, 'extension.json'), 'utf8'));
    const description = settings['description'];
    let url = "";
    
    if (!settings['useDev']) {
        url = `https://editor.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/${name}/index.js%22]#`;
    } else {
        url = `https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/${name}/index.js%22]#`;
    }

    return {
        name : name,
        displayName : settings['customName'] ?? name,
        description,
        url,
    };
}

function renderTemplate(name, data) {
    const template = fs.readFileSync(path.join(TEMPLATES_DIR, name), 'utf8');
    const outpath = path.join(__dirname, '..', name);
    const newContent = _.template(template)(data).trim();
    const content = fs.readFileSync(outpath, 'utf8').trim()
    if (newContent !== content) {
        fs.writeFileSync(outpath, newContent);
        console.log('updated', name);
        return 1;
    }
    return 0;
}
