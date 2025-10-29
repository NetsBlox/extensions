import init, { InstrumentSource } from '../wasm/beatblox_audio_tools.js';

await init();

const PARAM_OPTIONS = ['source', 'amplitude', 'filter', 'amplitude-lfo-speed'];

function validateInstrumentParam(input) {
    if (!(input instanceof List)) throw Error("must input a list");
    let sourceFound = false;
    input.contents.forEach(element => {
        if (!(element instanceof List)) throw Error("invalid param list");
        if (element.length() !== 2) throw Error("invalid param list");
        const option = element.contents[0];
        if (PARAM_OPTIONS.indexOf(option) === -1) throw Error(`invalid param option: ${option}`);
        if (option === 'source' && !sourceFound) sourceFound = true;
        else if (option === 'source' && sourceFound) throw Error(`cannot have multiple sources`);
    });
}

function parseInstrumentParams(input) {
    validateInstrumentParam(input);
    const params = {};
    input.contents.forEach(element => params[element.contents[0]] = element.contents[1]);
    return params;
}

function createAmplitudeText(amplitude) {
    console.log(amplitude);
    if (typeof amplitude === 'string') {
        const magnitude = parseFloat(amplitude);
        return `scalar-${magnitude}`
    } else if (amplitude instanceof Oscillator) {
        const lfoType = amplitude.type;
        return `lfo-${lfoType}-1`;
    } else if (amplitude instanceof List) {
        const args = amplitude.contents;
        if (args[0] instanceof Oscillator && typeof args[1] === 'string') {
            const lfoType = args[0].type;
            const frequency = parseFloat(args[1]);
            return `lfo-${lfoType}-${frequency}`;
        }
    }
    throw Error('invalid amplitude argument');
}

function loadInstumentFromSource(instrumentSource) {
    const data = instrumentSource.get_data();
    return new Instrument(data)
}

function createInstrument(input) {
    const params = parseInstrumentParams(input);
    if (params['source'] instanceof Oscillator) {
        const oscillatorType = params['source'].type;
        const amplitudeText = createAmplitudeText(params['amplitude']);
        const instrumentSource = InstrumentSource.from_oscillator(oscillatorType, amplitudeText);
        const instrument = loadInstumentFromSource(instrumentSource);
        return instrument;
    }
    return "instrument not created";
}

window.BeatBlox = {};
window.BeatBlox.createInstrument = createInstrument;