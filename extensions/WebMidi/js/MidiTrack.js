class MidiTrack {

    #startTime;
    #endTime;
    #midiLog;
    #renderedTrack;

    constructor() {
        this.#midiLog = new Map();
        this.#startTime = 0;
        this.#endTime = 0;
        this.#renderedTrack = null;
    }

    getTrackDuration() {
        return this.#endTime - this.#startTime;
    }

    getMidiLog() {
        return this.#midiLog;
    }

    getRenderedTrack() {
        return this.#renderedTrack;
    }

    addNote(midiMessage, time) {
        this.#midiLog.set((time - this.#startTime), midiMessage);
    }

    startRecord(startTime) {
        this.#startTime = startTime;
    }

    stopRecord(endTime) {
        this.#endTime = endTime;
    }

    async renderTrack() {
        console.log("Rendering Track...");

        const oscillators = new Map();
        const offlineCtx = new OfflineAudioContext(
            1, 44100 * this.getTrackDuration(), 44100
        );
        console.log(offlineCtx);
        const instrument = await window.audioAPI.getInstrument(window.instrumentName, offlineCtx);

        for (let [key, value] of this.#midiLog) {
            if (value.getCommand() == 144) {
                const osc = instrument.getNote(value.getNote());
                oscillators.set(value.getNote(), osc);
                osc.connect(offlineCtx.destination);
                osc.start(key);
            } else {
                if (oscillators.has(value.getNote())) {
                    const osc = oscillators.get(value.getNote());
                    osc.stop(key);
                    oscillators.delete(value.getNote());
                }
            }
        }

        this.#renderedTrack = await offlineCtx.startRendering();

        console.log("...Render Complete");
    }

    playTrack() {
        const audioCtx = new AudioContext();
        const track = audioCtx.createBufferSource();
        track.buffer = this.#renderedTrack;
        track.connect(audioCtx.destination);
        track.start();
        console.log("track played");
    }

    clearTrack() {
        for (let [key, value] of this.#midiLog) {
            this.#midiLog.delete(key);
        }
        this.#startTime = 0;
        this.#endTime = 0;
        this.#renderedTrack = null;
    }
}