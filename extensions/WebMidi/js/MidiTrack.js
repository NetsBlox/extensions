class MidiTrack {

    #startTime;
    #endTime;
    #midiLog;
    #renderedTrack;

    /**
     * @constructor
     */
    constructor() {
        this.#midiLog = new Map();
        this.#startTime = 0;
        this.#endTime = 0;
        this.#renderedTrack = null;
    }

    /**
     * Caculates the track duration.
     * @returns The track duration.
     */
    getTrackDuration() {
        return this.#endTime - this.#startTime;
    }

    /**
     * @returns A map containing midi messages recorded.
     */
    getMidiLog() {
        return this.#midiLog;
    }

    /**
     * @returns An ArrayBuffer containing rendered audio.
     */
    getRenderedTrack() {
        return this.#renderedTrack;
    }

    /**
     * Adds a note to the midi log.
     * @param {MIDIMessage} midiMessage - The MIDI message being recorded.
     * @param {Number} time - The time this message was recorded.
     */
    addNote(midiMessage, time) {
        this.#midiLog.set((time - this.#startTime), midiMessage);
    }

    /**
     * Sets the start time.
     * @param {Number} startTime - The time the recording starts.
     */
    startRecord(startTime) {
        this.#startTime = startTime;
    }

    /**
     * Sets the end time.
     * @param {Number} endTime - The time the recording stops.
     */
    stopRecord(endTime) {
        this.#endTime = endTime;
    }

    /**
     * Converts the MIDI log into an audio file.
     * @async
     */
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

    /**
     * Resets a track.
     */
    clearTrack() {
        for (let [key, value] of this.#midiLog) {
            this.#midiLog.delete(key);
        }
        this.#startTime = 0;
        this.#endTime = 0;
        this.#renderedTrack = null;
    }
}