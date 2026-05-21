const INSTRUMENT_SOURCE_OPTIONS = ['sine', 'sawtooth', 'triangle', 'square'];
const INSTRUMENT_OPTIONS = ['type', 'gain', 'filter'];
const FILTER_OPTIONS = ['frequency', 'Q', 'gain'];
const OSCILLATOR_OPTIONS = ['frequency', 'value'];
const DELAY_OPTIONS = ['delayTime'];

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

function validateDelayParameters(parameters) {
    if (!(parameters instanceof List)) throw Error("parameters must be a list");
    parameters.contents.forEach(element => {
        if (!(element instanceof List)) throw Error("invalid param list");
        if (element.length() !== 2) throw Error("invalid param list");
        const option = element.contents[0];
        if (DELAY_OPTIONS.indexOf(option) === -1) throw Error(`invalid param option: ${option}`);
    });
}

function parseParameters(parameters, validateFunction) {
    validateFunction(parameters);
    const params = {};
    parameters.contents.forEach(element => params[element.contents[0]] = element.contents[1]);
    return params;
}

function validateAudioRoutingGraph(graph) {
    const contents = graph.contents.contents;
    if (graph.type !== 'directed flow') throw Error('instrument must have only one source');
    // TODO add other valid audio sources
    if (!(contents[0] instanceof Oscillator)) throw Error('invalid audio source');
    // TODO add a gain node check
    // TODO there must only be one destination
    // TODO check that only valid blocks are in the grahp
    return contents[0];
}

window.BeatBlox = {};
window.BeatBlox.instrumentCount = 0;

// TODO add information about the destination
window.BeatBlox.createInstrument = function (audioGraph)  {
    if (!(audioGraph instanceof Graph)) throw Error('error: instrument must be created from audio graph');
    const sourceNode = validateAudioRoutingGraph(audioGraph);
    const src = { 'source': sourceNode, 'graph': audioGraph };
    return new Instrument(window.BeatBlox.instrumentCount++, src);
}

window.BeatBlox.updateInstrument = function (instrument, updates) {
    const _updates = parseParameters(updates, validateInstrumentParameters);
    Object.keys(_updates).forEach(key => instrument.src[key] = key === 'gain' ? new Gain(_updates.gain) : _updates[key]);
    return instrument;
}

window.BeatBlox.createOscillator = function (type, parameters) {
    const params = parseParameters(parameters, validateOscillatorParameters);
    params.type = type;
    return new Oscillator(type, params);
}

window.BeatBlox.createFilter = function (type, parameters) {
    const params = parseParameters(parameters, validateFilterParameters);
    return new Filter(type, params);
}

// TODO implementation needed
window.BeatBlox.createEffect = function (type, parameters) {
    let params;
    switch (type) {
        case 'delay':
            params = parseParameters(parameters, validateDelayParameters);
            break;
    }
    return new AudioEffect(type, params);
}

window.BeatBlox.createGain = function (gain) {
    return new Gain(gain);
}
