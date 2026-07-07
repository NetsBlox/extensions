window.BeatBlox = {};
window.BeatBlox.instrumentCount = 0;

window.BeatBlox.createInstrument = function (audioGraph)  {
    return new Instrument(audioGraph);
}

window.BeatBlox.createOscillator = function (type, parameters) {
    return new Oscillator(type, parameters);
}

window.BeatBlox.createFilter = function (type, parameters) {
    return new Filter(type, parameters);
}

window.BeatBlox.createEffect = function (type, parameters) {
    return new AudioEffect(type, parameters);
}

window.BeatBlox.createGain = function (gain) {
    return new Gain(gain);
}

window.BeatBlox.setInstrument = async function (instrument, instrumentOptions, audioCtx, receiverID) {
    if (typeof instrument === "string" && instrumentOptions.indexOf(instrument) >= 0)
        await audioCtx.updateInstrument(receiverID, instrument);
    else if (instrument instanceof Instrument) {
        const instrumentParameters = instrument.getParameters();
        await audioCtx.createInstrument(receiverID, 'temp', instrumentParameters);
    } 
    else 
        throw Error(`unknown instrument: "${instrument}"`);
}