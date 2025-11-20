const INSTRUMENT_SOURCE_OPTIONS = ['sine', 'sawtooth', 'triangle', 'square'];
const INSTRUMENT_OPTIONS = ['amplitude', 'filter', 'amplitude-lfo-speed'];
const FILTER_OPTIONS = ['frequency', 'Q', 'gain'];
const OSCILLATOR_OPTIONS = ['frequency', 'value'];

function validateInstrumentParameters(parameters) {
    if (!(parameters instanceof List)) throw Error("parameters must be a list");
    let sourceFound = false;
    parameters.contents.forEach(element => {
        if (!(element instanceof List)) throw Error("invalid param list");
        if (element.length() !== 2) throw Error("invalid param list");
        const option = element.contents[0];
        if (INSTRUMENT_OPTIONS.indexOf(option) === -1) throw Error(`invalid param option: ${option}`);
        if (option === 'source' && !sourceFound) sourceFound = true;
        else if (option === 'source' && sourceFound) throw Error(`cannot have multiple sources`);
    });
}

function validateOscillatorParameters(parameters) {
    if (!(parameters instanceof List)) throw Error("parameters must be a list");
    parameters.contents.forEach(element => {
        if (!(element instanceof List)) throw Error("invalid param list");
        if (element.length() !== 2) throw Error("invalid param list");
        const option = element.contents[0];
        if (OSCILLATOR_OPTIONS.indexOf(option) === -1) throw Error(`invalid param option: ${option}`);
    });
}

function validateFilterParameters(parameters) {
    if (!(parameters instanceof List)) throw Error("parameters must be a list");
    parameters.contents.forEach(element => {
        if (!(element instanceof List)) throw Error("invalid param list");
        if (element.length() !== 2) throw Error("invalid param list");
        const option = element.contents[0];
        if (FILTER_OPTIONS.indexOf(option) === -1) throw Error(`invalid param option: ${option}`);
    });
}

function parseParameters(parameters, validateFunction) {
    validateFunction(parameters);
    const params = {};
    parameters.contents.forEach(element => params[element.contents[0]] = element.contents[1]);
    return params;
}

window.BeatBlox = {};

window.BeatBlox.createInstrument = function (source, _options)  {
    const options = parseParameters(_options, validateInstrumentParameters);
    if (INSTRUMENT_SOURCE_OPTIONS.indexOf(source) >= -1) {
        const src = {
            'type': source,
            'gain': options.amplitude,
            'filter': options.filter.parameters
        }
        return new Instrument(src);
    }
    else { 
        throw Error('error: upsuported source type')
    }
}

window.BeatBlox.createOscillator = function (type, parameters) {
    const params = parseParameters(parameters, validateOscillatorParameters);
    params.type = type;
    return new Oscillator(type, parameters);
}

window.BeatBlox.createFilter = function (type, parameters) {
    const params = parseParameters(parameters, validateFilterParameters);
    params.type = type;
    return new Filter(type, params);
}