const OPTIONS = ['source', 'amplitude', 'filter', 'amplitude-lfo-speed'];

function validateInstrumentOptions(options) {
    if (!(options instanceof List)) throw Error("must options a list");
    let sourceFound = false;
    options.contents.forEach(element => {
        if (!(element instanceof List)) throw Error("invalid param list");
        if (element.length() !== 2) throw Error("invalid param list");
        const option = element.contents[0];
        if (OPTIONS.indexOf(option) === -1) throw Error(`invalid param option: ${option}`);
        if (option === 'source' && !sourceFound) sourceFound = true;
        else if (option === 'source' && sourceFound) throw Error(`cannot have multiple sources`);
    });
}

function parseInstrumentOptions(options) {
    validateInstrumentOptions(options);
    const params = {};
    options.contents.forEach(element => params[element.contents[0]] = element.contents[1]);
    return params;
}

window.BeatBlox = {};

window.BeatBlox.createInstrument = function (_options)  {
    const options = parseInstrumentOptions(_options);
    if (options.source instanceof Oscillator) {
        const src = {
            'type': options.source.type,
            'gain': options.amplitude
        }
        return new Instrument(src);
    }
    else { 
        throw Error('error: upsuported source type')
    }
}

window.BeatBlox.createFilter = function (type, parameters) {
    return new Filter(type, parameters);
}