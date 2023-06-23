class MidiTrack {

    #startTime;
    #midiLog;

    constructor() {
        this.#midiLog = new Map();
    }

    addNote(midiMessage, time) {
        this.#midiLog.set(time, midiMessage);
    }

    startRecord(startTime) {
        this.#startTime = startTime;
    }

    async playTrack() {
        let notes = {};

        for (let [key, value] of this.#midiLog) {
            if (value.getCommand() == 144) {
                setTimeout(async function() {
                    notes[value.getNote()] = 
                        await window.audioAPI.startNote('defaultTrack', value.getNote());
                }, (key - this.#startTime) * 1000);
                
            } else {
                setTimeout(async function () {
                    await window.audioAPI.stopNote('defaultTrack', notes[value.getNote()]);
                }, (key - this.#startTime) * 1000);
            }       
        }
    }

    clearTrack() {
        for (let [key, value] of this.#midiLog) {
            this.#midiLog.delete(key);
        }
    }
}