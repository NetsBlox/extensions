/**
 * Module containing all musical notation constants in the various formats expected by the
 * {@link WebAudioAPI} library.
 * 
 * @module Constants
 */

/**
 * Object representing a mapping between the notational name of a musical note and its MIDI value.
 * @constant {Object.<string, number>}
 */
const Note = {
    C0: 12, D0bb: 12, C0s: 13, D0b: 13, D0: 14, C0ss: 14, E0bb: 14,
    D0s: 15, E0b: 15, F0bb: 15, E0: 16, D0ss: 16, F0b: 16, F0: 17, E0s: 17, G0bb: 17,
    F0s: 18, E0ss: 18, G0b: 18, G0: 19, F0ss: 19, A0bb: 19, G0s: 20, A0b: 20,
    A0: 21, G0ss: 21, B0bb: 21, A0s: 22, B0b: 22, C1bb: 22, B0: 23, A0ss: 23, C1b: 23,
    C1: 24, B0s: 24, D1bb: 24, C1s: 25, B0ss: 25, D1b: 25, D1: 26, C1ss: 26, E1bb: 26,
    D1s: 27, E1b: 27, F1bb: 27, E1: 28, D1ss: 28, F1b: 28, F1: 29, E1s: 29, G1bb: 29,
    F1s: 30, E1ss: 30, G1b: 30, G1: 31, F1ss: 31, A1bb: 31, G1s: 32, A1b: 32,
    A1: 33, G1ss: 33, B1bb: 33, A1s: 34, B1b: 34, C2bb: 34, B1: 35, A1ss: 35, C2b: 35,
    C2: 36, B1s: 36, D2bb: 36, C2s: 37, B1ss: 37, D2b: 37, D2: 38, C2ss: 38, E2bb: 38,
    D2s: 39, E2b: 39, F2bb: 39, E2: 40, D2ss: 40, F2b: 40, F2: 41, E2s: 41, G2bb: 41,
    F2s: 42, E2ss: 42, G2b: 42, G2: 43, F2ss: 43, A2bb: 43, G2s: 44, A2b: 44,
    A2: 45, G2ss: 45, B2bb: 45, A2s: 46, B2b: 46, C3bb: 46, B2: 47, A2ss: 47, C3b: 47,
    C3: 48, B2s: 48, D3bb: 48, C3s: 49, B2ss: 49, D3b: 49, D3: 50, C3ss: 50, E3bb: 50,
    D3s: 51, E3b: 51, F3bb: 51, E3: 52, D3ss: 52, F3b: 52, F3: 53, E3s: 53, G3bb: 53,
    F3s: 54, E3ss: 54, G3b: 54, G3: 55, F3ss: 55, A3bb: 55, G3s: 56, A3b: 56,
    A3: 57, G3ss: 57, B3bb: 57, A3s: 58, B3b: 58, C4bb: 58, B3: 59, A3ss: 59, C4b: 59,
    C4: 60, B3s: 60, D4bb: 60, C4s: 61, B3ss: 61, D4b: 61, D4: 62, C4ss: 62, E4bb: 62,
    D4s: 63, E4b: 63, F4bb: 63, E4: 64, D4ss: 64, F4b: 64, F4: 65, E4s: 65, G4bb: 65,
    F4s: 66, E4ss: 66, G4b: 66, G4: 67, F4ss: 67, A4bb: 67, G4s: 68, A4b: 68,
    A4: 69, G4ss: 69, B4bb: 69, A4s: 70, B4b: 70, C5bb: 70, B4: 71, A4ss: 71, C5b: 71,
    C5: 72, B4s: 72, D5bb: 72, C5s: 73, B4ss: 73, D5b: 73, D5: 74, C5ss: 74, E5bb: 74,
    D5s: 75, E5b: 75, F5bb: 75, E5: 76, D5ss: 76, F5b: 76, F5: 77, E5s: 77, G5bb: 77,
    F5s: 78, E5ss: 78, G5b: 78, G5: 79, F5ss: 79, A5bb: 79, G5s: 80, A5b: 80,
    A5: 81, G5ss: 81, B5bb: 81, A5s: 82, B5b: 82, C6bb: 82, B5: 83, A5ss: 83, C6b: 83,
    C6: 84, B5s: 84, D6bb: 84, C6s: 85, B5ss: 85, D6b: 85, D6: 86, C6ss: 86, E6bb: 86,
    D6s: 87, E6b: 87, F6bb: 87, E6: 88, D6ss: 88, F6b: 88, F6: 89, E6s: 89, G6bb: 89,
    F6s: 90, E6ss: 90, G6b: 90, G6: 91, F6ss: 91, A6bb: 91, G6s: 92, A6b: 92,
    A6: 93, G6ss: 93, B6bb: 93, A6s: 94, B6b: 94, C7bb: 94, B6: 95, A6ss: 95, C7b: 95,
    C7: 96, B6s: 96, D7bb: 96, C7s: 97, B6ss: 97, D7b: 97, D7: 98, C7ss: 98, E7bb: 98,
    D7s: 99, E7b: 99, F7bb: 99, E7: 100, D7ss: 100, F7b: 100, F7: 101, E7s: 101, G7bb: 101,
    F7s: 102, E7ss: 102, G7b: 102, G7: 103, F7ss: 103, A7bb: 103, G7s: 104, A7b: 104,
    A7: 105, G7ss: 105, B7bb: 105, A7s: 106, B7b: 106, C8bb: 106, B7: 107, A7ss: 107, C8b: 107,
    C8: 108, B7s: 108, D8bb: 108, C8s: 109, B7ss: 109, D8b: 109, D8: 110, C8ss: 110, E8bb: 110,
    D8s: 111, E8b: 111, F8bb: 111, E8: 112, D8ss: 112, F8b: 112, F8: 113, E8s: 113, G8bb: 113,
    F8s: 114, E8ss: 114, G8b: 114, G8: 115, F8ss: 115, A8bb: 115, G8s: 116, A8b: 116,
    A8: 117, G8ss: 117, B8bb: 117, A8s: 118, B8b: 118, C9bb: 118, B8: 119, A8ss: 119, C9b: 119,
    C9: 120, B8s: 120, D9bb: 120, C9s: 121, B8ss: 121, D9b: 121, D9: 122, C9ss: 122, E9bb: 122,
    D9s: 123, E9b: 123, F9bb: 123, E9: 124, D9ss: 124, F9b: 124, F9: 125, E9s: 125, G9bb: 125,
    F9s: 126, E9ss: 126, G9b: 126, G9: 127, F9ss: 127, A9bb: 127, G9s: 128, A9b: 128,
    A9: 129, G9ss: 129, B9bb: 129, A9s: 130, B9b: 130, B9: 131, A9ss: 131
};

/**
 * Array containing the frequency (in Hz) of the MIDI value at the corresponding array index.
 * @constant {number[]}
 */
const Frequency = [
    8.18, 8.66, 9.18, 9.72, 10.30, 10.91, 11.56, 12.25, 12.98, 13.75, 14.57, 15.43,
    16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87,
    32.70, 34.65, 36.71, 38.89, 41.20, 43.65, 46.25, 49.00, 51.91, 55.00, 58.27, 61.74,
    65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98.00, 103.83, 110.00, 116.54, 123.47,
    130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94,
    261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88,
    523.25, 554.37, 587.33, 622.25, 659.26, 698.46, 739.99, 783.99, 830.61, 880.00, 932.33, 987.77,
    1046.50, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760.00, 1864.66, 1975.53,
    2093.00, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520.00, 3729.31, 3951.07,
    4186.01, 4434.92, 4698.64, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.00, 7458.62, 7902.13,
    8372.02, 8869.84, 9397.27, 9956.06, 10548.08, 11175.30, 11839.82, 12534.86, 13289.75, 14080.00, 14917.24, 15804.26
];

/**
 * Object representing a mapping between the notational name of a musical duration and its associated beat scaling factor.
 * @constant {Object.<string, number>}
 */
const Duration = {
    Whole: 1.0, DottedWhole: 2.0 / 3.0, DottedDottedWhole: 4.0 / 7.0,
    Half: 2.0, DottedHalf: 4.0 / 3.0, DottedDottedHalf: 8.0 / 7.0,
    Quarter: 4.0, DottedQuarter: 8.0 / 3.0, DottedDottedQuarter: 16.0 / 7.0,
    Eighth: 8.0, DottedEighth: 16.0 / 3.0, DottedDottedEighth: 32.0 / 7.0,
    Sixteenth: 16.0, DottedSixteenth: 32.0 / 3.0, DottedDottedSixteenth: 64.0 / 7.0,
    ThirtySecond: 32.0, DottedThirtySecond: 64.0 / 3.0, DottedDottedThirtySecond: 128.0 / 7.0,
    SixtyFourth: 64.0, DottedSixtyFourth: 128.0 / 3.0, DottedDottedSixtyFourth: 256.0 / 7.0
};

/**
 * Module containing all MIDI constants and functionality available in the {@link WebAudioAPI} library.
 * 
 * @module Midi
 */

/**
 * Object representing a mapping between a General MIDI command and its protocol value.
 * @constant {Object.<string, number>}
 */
const MidiCommand = {
    Unknown: 0x00, NoteOff: 0x80, NoteOn: 0x90, Aftertouch: 0xA0, ContinuousController: 0xB0,
    ProgramChange: 0xC0, ChannelPressure: 0xD0, PitchBend: 0xE0, SystemMessage: 0xF0
};

/**
 * Returns a value representing the MIDI command in the specified `midiData`.
 * 
 * @param {number[]} midiData - Data array containing raw MIDI event data
 * @returns {number} MIDI command specified in the corresponding `midiData`
 * @see {@link module:Midi.MidiCommand MidiCommand}
 */
function getMidiCommand(midiData) {
    return midiData[0] & 0xF0;
}

/**
 * Returns the MIDI note corresponding to the `NoteOn` or `NoteOff` command in the specified
 * `midiData` parameter.
 * 
 * @param {number[]} midiData - Data array containing raw MIDI event data
 * @returns {number} MIDI note corresponding to the relevant `midiData` command
 */
function getMidiNote(midiData) {
    return midiData[1] & 0x7F;
}

/**
 * Returns the note velocity corresponding to the `NoteOn` or `NoteOff` command in the
 * specified `midiData` parameter. This velocity will be in the range from [0.0, 1.0].
 * 
 * @param {number[]} midiData - Data array containing raw MIDI event data
 * @returns {number} Note velocity for a MIDI note in the range [0.0, 1.0]
 */
function getMidiVelocity(midiData) {
    return (midiData[2] & 0x7F) / 127.0;
}

/**
 * Module containing functionality to create new {@link WebAudioAPI} tracks.
 * @module Track
 */


/**
 * Creates a new audio {@link Track} object capable of playing sequential audio.
 * 
 * @param {string} name - Name of the track to create
 * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @param {Tempo} tempo - Reference to the {@link Tempo} object stored in the global {@link WebAudioAPI} object
 * @param {AudioNode} trackAudioSink - Reference to the {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode} to which the output of this track should be connected
 * @returns {Track} Newly created audio {@link Track}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
 * @see {@link Track}
 * @see {@link Tempo}
 */
function createTrack(name, audioContext, tempo, trackAudioSink) {

    // Track-local variable definitions
    let instrument = null, midiDevice = null;
    const audioSources = [], asyncAudioSources = [], effects = {};
    const audioSink = new GainNode(audioContext), volumeNode = new GainNode(audioContext);
    audioSink.connect(volumeNode).connect(trackAudioSink);

    // Private internal Track functions
    function createAsyncNote(noteValue, sourceNode, volumeNode) {
        return { noteValue, sourceNode, volumeNode };
    }

    function midiEventReceived(event) {
        const command = getMidiCommand(event.data);
        if (command === MidiCommand.NoteOff) {
            for (const asyncSource of asyncAudioSources)
                if (asyncSource.noteValue == getMidiNote(event.data)) {
                    stopNoteAsync(asyncSource);
                    break;
                }
        }
        else if ((command === MidiCommand.NoteOn) && (getMidiVelocity(event.data) > 0))
            playNoteAsync(getMidiNote(event.data), getMidiVelocity(event.data));
    }

    function sourceEnded(source, sourceVolume) {
        if (sourceVolume == null)
            sourceVolume = source;
        sourceVolume.disconnect();
        audioSources.splice(audioSources.indexOf(source), 1);
    }

    /**
     * Updates the instrument used to play back audio on the current track.
     * 
     * @param {Instrument} instrumentData - Instrument object to use when generating audio on the current track
     * @memberof Track
     * @instance
     */
    function updateInstrument(instrumentObject) {
        instrument = instrumentObject;
    }

    /**
     * Removes the instrument used to play back audio on the current track.
     * 
     * @memberof Track
     * @instance
     */
    function removeInstrument() {
        instrument = null;
    }

    /**
     * Updates the playback volume for the current track at the specified time.
     * 
     * Note that the `updateTime` parameter can be omitted to immediately cause the level
     * change to take effect.
     * 
     * @param {number} percent - Track volume percentage between [0.0, 1.0]
     * @param {number} [updateTime] - Global API time at which to update the volume
     * @memberof Track
     * @instance
     */
    function updateVolume(percent, updateTime) {
        volumeNode.gain.setValueAtTime(percent, updateTime == null ? audioContext.currentTime : updateTime);
    }

    /**
     * Updates the intensity of the effect for the current track at the specified time.
     * 
     * Note that the `updateTime` parameter can be omitted to immediately cause the change
     * to take effect.
     * 
     * @param {string} effectName - Name of the track effect to be updated
     * @param {Object} effectOptions - Effect-specific options (TODO)
     * @param {number} percent - Intensity of the effect as a percentage between [0.0, 1.0]
     * @param {number} [updateTime] - Global API time at which to update the effect
     * @memberof Track
     * @instance
     */
    function updateEffect(effectName, effectOptions, percent, updateTime) {
        // TODO: Implement (add if non-existent, else update, if no trackName, then master, effectType = reverb, effectOptions = impulse url)
        // effectOptions = null just updates percent
        // percent = null removes effect
        console.log(name, effectName, effectOptions, percent, updateTime);
    }

    /**
     * Removes the specified effect from being utilized on the current track.
     * 
     * @param {string} effectName - Name of the track effect to be removed
     * @memberof Track
     * @instance
     */
    function removeEffectByName(effectName) {
        if (effectName in effects) {
            // TODO: Disconnect from effects graph
            delete effects[effectName];
        }
    }

    /**
     * Removes the specified effect type from being utilized on the current track.
     * 
     * @param {EffectType} effectType - Type of track effect to be removed
     * @memberof Track
     * @instance
     * @see {@link module:Constants.EffectType EffectType}
     */
    function removeEffectByType(effectType) {
        for (const effectName in effects)
            if (effects[effectName].type == effectType) {
                // TODO: Disconnect from effects graph
                delete effects[effectName];
            }
    }

    /**
     * Immediately stop playing a note on the current track. The note to be stopped must be a
     * reference to an actively playing note that was previously returned from the
     * {@link Track#playNoteAsync playNoteAsync()} function.
     * 
     * @param {Object} noteObject - Reference to an active note that was started using {@link Track#playNoteAsync playNoteAsync()}
     * @memberof Track
     * @instance
     */
    function stopNoteAsync(noteObject) {
        noteObject.sourceNode.onended = null;
        asyncAudioSources.splice(asyncAudioSources.indexOf(noteObject), 1);
        noteObject.volumeNode.gain.setTargetAtTime(0.0, audioContext.currentTime, 0.03);
        setTimeout(() => {
            noteObject.sourceNode.stop();
            noteObject.volumeNode.disconnect();
        }, 200);
    }

    /**
     * Immediately begins playing a note on the current track. Playback continues until the note
     * is explicitly stopped using the {@link Track#stopNoteAsync stopNoteAsync()} function.
     * 
     * Note that the `note` parameter should correspond to a valid MIDI note number.
     * 
     * @param {number} note -  MIDI {@link module:Constants.Note Note} number to be played
     * @param {number} velocity - Intensity of the note to play between [0.0, 1.0]
     * @returns {Object} Reference to the newly scheduled note
     * @memberof Track
     * @instance
     */
    function playNoteAsync(note, velocity) {
        if (instrument) {
            const noteSource = instrument.getNote(note); // TODO: Method to getNoteContinuous so it loops
            const noteVolume = new GainNode(audioContext);
            noteSource.connect(noteVolume).connect(audioSink);
            noteVolume.gain.setValueAtTime(velocity, 0.0);
            const noteStorage = createAsyncNote(note, noteSource, noteVolume);
            noteSource.onended = stopNoteAsync.bind(this, noteStorage); // TODO: Don't need this if continuous instrument
            asyncAudioSources.push(noteStorage);
            noteSource.start(audioContext.currentTime);
            return noteStorage;
        }
        return null;
    }

    /**
     * Schedules a note to be played on the current track for some duration of time.
     * 
     * Note that the `duration` parameter should correspond to the beat scaling factor
     * associated with one of the note durations from
     * {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()}.
     * Likewise, the `note` parameter should correspond to a valid MIDI note number.
     * 
     * @param {number} note - MIDI {@link module:Constants.Note Note} number to be played
     * @param {number} velocity - Intensity of the note being played between [0.0, 1.0]
     * @param {number} startTime - Global API time at which to start playing the note
     * @param {number} duration - {@link module:Constants.Duration Duration} for which to continue playing the note
     * @returns {number} Duration (in seconds) of the note being played
     * @memberof Track
     * @instance
     */
    function playNote(note, velocity, startTime, duration) {
        if (instrument) {
            const durationSeconds = 60.0 / ((duration / tempo.beatBase) * tempo.beatsPerMinute);
            const noteSource = instrument.getNote(note);
            const noteVolume = new GainNode(audioContext);
            noteSource.connect(noteVolume).connect(audioSink);
            noteVolume.gain.setValueAtTime(velocity, 0.0);
            noteVolume.gain.setTargetAtTime(0.0, startTime + durationSeconds - 0.03, 0.03);
            noteSource.onended = sourceEnded.bind(this, noteSource, noteVolume);
            audioSources.push(noteSource);
            noteSource.start(startTime);
            noteSource.stop(startTime + durationSeconds);
            return durationSeconds;
        }
        return 0;
    }

    /**
     * Schedules an audio clip to be played on the current track for some duration of time.
     * 
     * If the `duration` parameter is not specified or is set to `null`, the audio clip will
     * play to completion.
     * 
     * @param {ArrayBuffer} buffer - Buffer containing raw, audio-encoded data
     * @param {number} startTime - Global API time at which to start playing the clip
     * @param {number|null} [duration] -  Number of seconds for which to continue playing the clip
     * @returns {Promise<number>} Duration (in seconds) of the clip being played
     * @memberof Track
     * @instance
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}
     */
    async function playClip(buffer, startTime, duration) {
        const audioBuffer = await audioContext.decodeAudioData(buffer);
        const clipSource = new AudioBufferSourceNode(audioContext, { buffer: audioBuffer });
        audioSources.push(clipSource);
        if (duration) {
            const clipVolume = new GainNode(audioContext);
            clipSource.connect(clipVolume).connect(audioSink);
            clipVolume.gain.setTargetAtTime(0.0, startTime + duration - 0.03, 0.03);
            clipSource.onended = sourceEnded.bind(this, clipSource, clipVolume);
            clipSource.start(startTime, 0, duration);
        }
        else {
            clipSource.connect(audioSink);
            clipSource.onended = sourceEnded.bind(this, clipSource, null);
            clipSource.start(startTime);
        }
        return (duration && (duration < audioBuffer.duration)) ? duration : audioBuffer.duration;
    }

    /**
     * Schedules an audio file to be played on the current track for some duration of time.
     * 
     * If the `duration` parameter is not specified or is set to `null`, the audio file will
     * play to completion.
     * 
     * @param {string} fileURL - URL location pointing to an audio file
     * @param {number} startTime - Global API time at which to start playing the file
     * @param {number|null} [duration] - Number of seconds for which to continue playing the file
     * @returns {Promise<number>} Duration (in seconds) of the file being played
     * @memberof Track
     * @instance
     */
    async function playFile(fileURL, startTime, duration) {
        const response = await fetch(fileURL);
        const arrayBuffer = await response.arrayBuffer();
        return await playClip(arrayBuffer, startTime, duration);
    }

    /**
     * Disconnects the current track from the specified MIDI device so that no further MIDI events
     * will be received.
     * 
     * @memberof Track
     * @instance
     */
    function disconnectFromMidiDevice() {
        if (midiDevice != null)
            midiDevice.removeEventListener('midimessage', midiEventReceived);
        midiDevice = null;
    }

    /**
     * Connects the current track to the specified MIDI device so that any incoming events will be
     * automatically played in real-time.
     * 
     * @param {MIDIInput} midiInput - MIDI device to which to connect the current track
     * @returns {boolean}  Whether connection to the MIDI device was successful
     * @memberof Track
     * @instance
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIInput MIDIInput}
     */
    function connectToMidiDevice(midiInput) {
        disconnectFromMidiDevice();
        midiInput.addEventListener('midimessage', midiEventReceived);
        midiDevice = midiInput;
        return true;
    }

    /**
     * Deletes the current track and cancels any scheduled audio from playing or from starting
     * to play in the future.
     * 
     * @memberof Track
     * @instance
     */
    function deleteTrack() {
        for (const source of audioSources)
            source.stop();
        for (const source of asyncAudioSources)
            source.sourceNode.stop();
        volumeNode.disconnect();
    }

    // Returns an object containing functions and attributes within the public Track namespace
    return {
        /**
         * Name of the {@link Track}.
         * @memberof Track
         * @instance
         */
        name,
        updateInstrument, removeInstrument, updateVolume, updateEffect, removeEffectByName, removeEffectByType,
        stopNoteAsync, playNoteAsync, playNote, playClip, playFile, connectToMidiDevice, disconnectFromMidiDevice, deleteTrack
    };
}

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:js
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).

// aliases for shorter compressed code (most minifers don't do this)
let u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
let fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
// see fleb note
let fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
let clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
let freb = function (eb, start) {
    let b = new u16(31);
    for (let i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    let r = new u32(b[30]);
    for (let i = 1; i < 30; ++i) {
        for (let j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return [b, r];
};
let _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258;
revfl[258] = 28;
let _b = freb(fdeb, 0), fd = _b[0];
// map of value to reverse (assuming 16 bits)
let rev = new u16(32768);
for (let i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    let x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
let hMap = (function (cd, mb, r) {
    let s = cd.length;
    // index
    let i = 0;
    // u16 "map": index -> # of codes with bit length = index
    let l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i) {
        if (cd[i])
            ++l[cd[i] - 1];
    }
    // u16 "map": index -> minimum code for bit length = index
    let le = new u16(mb);
    for (i = 0; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    let co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        let rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                let sv = (i << 4) | cd[i];
                // free bits
                let r_1 = mb - cd[i];
                // start value
                let v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (let m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
            }
        }
    }
    return co;
});
// fixed length tree
let flt = new u8(288);
for (let i = 0; i < 144; ++i)
    flt[i] = 8;
for (let i = 144; i < 256; ++i)
    flt[i] = 9;
for (let i = 256; i < 280; ++i)
    flt[i] = 7;
for (let i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
let fdt = new u8(32);
for (let i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
let flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
let fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
let max = function (a) {
    let m = a[0];
    for (let i = 1; i < a.length; ++i) {
        if (a[i] > m)
            m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
let bits = function (d, p, m) {
    let o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
};
// read d, starting at bit p continuing for at least 16 bits
let bits16 = function (d, p) {
    let o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
};
// get end of byte
let shft = function (p) { return ((p + 7) / 8) | 0; };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
let slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    let n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
// error codes
let ec = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    'invalid header',
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data'
    // determined by unknown compression method
];

let err = function (ind, msg, nt) {
    let e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
    if (!nt)
        throw e;
    return e;
};
// expands raw DEFLATE data
let inflt = function (dat, buf, st) {
    // source length
    let sl = dat.length;
    if (!sl || (st?.f && !st?.l))
        return buf || new u8(0);
    // have to estimate size
    let noBuf = !buf || st;
    // no state
    let noSt = !st || st.i;
    if (!st)
        st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf)
        buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    let cbuf = function (l) {
        let bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            let nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    let final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    let tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            let type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                let s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                if (t > sl) {
                    if (noSt)
                        err(0);
                    break;
                }
                // ensure size
                if (noBuf)
                    cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l;
                st.p = pos = t * 8;
                st.f = final;
                continue;
            }
            else if (type == 1) {
                lm = flrm;
                dm = fdrm;
                lbt = 9;
                dbt = 5;
            }
            else if (type == 2) {
                //  literal                            lengths
                let hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                let tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                let ldt = new u8(tl);
                // code length tree
                let clt = new u8(19);
                for (let i = 0; i < hcLen; ++i) {
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                let clb = max(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                let clm = hMap(clt, clb, 1);
                for (let i = 0; i < tl;) {
                    let r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    let s = r >>> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    }
                    else {
                        //  copy   count
                        let c = 0, n = 0;
                        if (s == 16) {
                            n = 3 + bits(dat, pos, 3);
                            pos += 2;
                            c = ldt[i - 1];
                        }
                        else if (s == 17) {
                            n = 3 + bits(dat, pos, 7);
                            pos += 3;
                        }
                        else if (s == 18) {
                            n = 11 + bits(dat, pos, 127);
                            pos += 7;
                        }
                        while (n--)
                            ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                let lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            }
            else
                err(1);
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf)
            cbuf(bt + 131072);
        let lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        let lpos = pos;
        for (; ; lpos = pos) {
            // bits read, code
            let c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
            if (!c)
                err(2);
            if (sym < 256)
                buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos;
                lm = null;
                break;
            }
            else {
                let add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    let i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                let d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d)
                    err(3);
                pos += d & 15;
                let dt = fd[dsym];
                if (dsym > 3) {
                    let b = fdeb[dsym];
                    dt += bits16(dat, pos) & ((1 << b) - 1);
                    pos += b;
                }
                if (pos > tbts) {
                    if (noSt)
                        err(0);
                    break;
                }
                if (noBuf)
                    cbuf(bt + 131072);
                let end = bt + add;
                for (; bt < end; bt += 4) {
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm;
        st.p = lpos;
        st.b = bt;
        st.f = final;
        if (lm) {
            final = 1;
            st.m = lbt;
            st.d = dm;
            st.n = dbt;
        }
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// empty
let et = /*#__PURE__*/ new u8(0);
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
let gzs = function (d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, 'invalid gzip data');
    let flg = d[3];
    let st = 10;
    if (flg & 4)
        st += d[10] | (d[11] << 8) + 2;
    for (let zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
    return st + (flg & 2);
};
// gzip length
let gzl = function (d) {
    let l = d.length;
    return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
};
// zlib valid
let zlv = function (d) {
    if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
        err(6, 'invalid zlib data');
    if (d[1] & 32)
        err(6, 'invalid zlib data: preset dictionaries not supported');
};
/**
 * Expands DEFLATE data with no wrapper
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function inflateSync(data, out) {
    return inflt(data, out);
}
/**
 * Expands GZIP data
 * @param data The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */
function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
/**
 * Expands Zlib data
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function decompressSync(data, out) {
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzipSync(data, out)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflateSync(data, out)
            : unzlibSync(data, out);
}
// text decoder
let td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
let tds = 0;
try {
    td.decode(et, { stream: true });
    tds = 1;
}
catch (e) { console.log(e); }

/**
 * Module containing all instrument-specific {@link WebAudioAPI} functionality.
 * @module Instrument
 */


/**
 * Loads an existing {@link Instrument} object capable of mapping audio data to musical output.
 * 
 * If the `url` parameter is set to `null`, a sine-wave oscillator will be used to generate
 * all audio output.
 * 
 * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @param {string} name - Name of the instrument to load
 * @param {string|null} url - URL pointing to the instrument data to load or `null`
 * @returns {Instrument} Newly loaded {@link Instrument}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @see {@link Instrument}
 * @async
 */
async function loadInstrument(audioContext, name, url) {

    // Private internal Instrument functions
    function loadNumberFromArray(array, numBytes, offset) {
        let number = 0;
        for (let i = numBytes - 1; i >= 0; --i)
            number = (number * 256) + array[offset + i];
        return number;
    }

    function findClosestValidNote(noteData, noteIndex) {
        let nearestLowerNote = -10000, nearestHigherNote = 10000;
        for (let i = noteIndex - 1; i >= 0; --i)
            if (noteData[i] !== undefined) {
                nearestLowerNote = i;
                break;
            }
        for (let i = noteIndex + 1; i < noteData.length; ++i)
            if (noteData[i] !== undefined) {
                nearestHigherNote = i;
                break;
            }
        return ((noteIndex - nearestLowerNote) > (nearestHigherNote - noteIndex)) ? nearestHigherNote : nearestLowerNote;
    }

    function fillInMissingNotes(noteData, missingData) {
        for (let note = 0; note < noteData.length; ++note)
            if (noteData[note] === undefined) {
                const closestValidNote = findClosestValidNote(noteData, note);
                missingData[note] = {
                    'buffer': noteData[closestValidNote].buffer,
                    'detune': 100 * (note - closestValidNote)
                };
            }
    }

    async function loadNotesAndInterpolate(instrumentData, noteData, missingData) {
        let noteIndex = 2;
        noteData.length = missingData.length = 1 + Note['B9'];
        const numValidNotes = loadNumberFromArray(instrumentData, 2, 0);
        for (let i = 0; i < numValidNotes; ++i) {
            const note = loadNumberFromArray(instrumentData, 2, noteIndex);
            noteIndex += 2;
            const noteOffset = loadNumberFromArray(instrumentData, 4, noteIndex);
            noteIndex += 4;
            const noteOffsetEnd = loadNumberFromArray(instrumentData, 4, noteIndex);
            noteIndex += 4;
            noteData[note] = {
                'buffer': await audioContext.decodeAudioData(decompressSync(instrumentData.slice(noteOffset, noteOffsetEnd)).buffer),
                'detune': 0
            };
        }
        fillInMissingNotes(noteData, missingData);
    }

    async function loadInstrument(url) {
        const noteData = [], foundData = [], missingData = [];
        const response = await fetch(url);
        const resource = await response.arrayBuffer();
        const instrumentData = new Uint8Array(resource);
        await loadNotesAndInterpolate(instrumentData, foundData, missingData);
        for (let i = 0; i < foundData.length; ++i)
            noteData[i] = (foundData[i] === undefined) ? missingData[i] : foundData[i];
        return noteData;
    }

    // Create an instance of the Instrument object
    const instrumentInstance = {
        /**
         * Name of the {@link Instrument}.
         * @memberof Instrument
         * @instance
         */
        name,

        /**
         * Returns an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
         * that can be used to play back the specified MIDI `note`.
         * 
         * @function
         * @param {number} note - MIDI note number for which to generate a playable note
         * @memberof Instrument
         * @instance
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
         */
        getNote: null
    };

    // Actually load and return the instrment
    console.log('Loading instrument:', name + '...');
    if (url == null) {
        instrumentInstance.getNote = function (note) {
            return new OscillatorNode(audioContext, { frequency: Frequency[note] });
        };
    }
    else {
        const noteData = await loadInstrument(url);
        instrumentInstance.getNote = function (note) {
            return new AudioBufferSourceNode(audioContext, noteData[note]);
        };
    }
    return instrumentInstance;
}

/**
 * Module containing all {@link WebAudioAPI} error functionality.
 * 
 * @module Errors
 */

class MidiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MidiError';
    }
}

var version = "0.1.0";

/**
 * Required function prototype to use when registering a MIDI device callback.
 * 
 * @callback MidiEventCallback
 * @param {MIDIMessageEvent} event - Object containing the detected MIDI event
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIMessageEvent MIDIMessageEvent}
 */

/**
 * Composite object type for holding all tempo-related information.
 * 
 * @typedef {Object} Tempo
 * @property {number} beatBase - Note {@link module:Constants.Duration Duration} corresponding to a global beat
 * @property {number} beatsPerMinute - Number of global beats per minute
 * @property {number} timeSignatureNumerator - Number of beats per measure
 * @property {number} timeSignatureDenominator - Note {@link module:Constants.Duration Duration} corresponding to a measure beat
 * @property {number} measureLengthSeconds - Length (in seconds) of a measure
 */

/** Contains all WebAudioAPI top-level functionality. */
class WebAudioAPI {

    async getInstrument(instrumentName, offlineCtx) {
        return await loadInstrument(offlineCtx, instrumentName, this.#instrumentListing[instrumentName]);
    }

    // Singleton instance of the WebAudioAPI class
    static #instance = null;

    // WebAudioAPI private variable definitions
    #audioContext = new AudioContext(); #started = false; #masterVolume = 1.0;
    #tracks = {}; #effects = {}; #effectListing = {}; #instrumentListing = {}; #loadedInstruments = {}; #midiCallbacks = {};
    #tempo = { measureLengthSeconds: (4 * 60.0 / 100.0), beatBase: 4, beatsPerMinute: 100, timeSignatureNumerator: 4, timeSignatureDenominator: 4 };

    // Required audio nodes
    /** @type {(null|MIDIAccess)} */
    #midiDeviceAccess = null;
    /** @type {DynamicsCompressorNode} */
    #compressorNode;
    /** @type {GainNode} */
    #sourceSinkNode;
    /** @type {GainNode} */
    #masterVolumeNode;

    /**
     * Returns a singleton instance of the WebAudioAPI interface.
     */
    constructor() {
        // Create or return the singleton instance if it already exists
        if (WebAudioAPI.#instance)
            return WebAudioAPI.#instance;
        WebAudioAPI.#instance = this;

        // Generate and connect all required audio nodes
        this.#compressorNode = new DynamicsCompressorNode(this.#audioContext);
        this.#sourceSinkNode = new GainNode(this.#audioContext), this.#masterVolumeNode = new GainNode(this.#audioContext);
        this.#sourceSinkNode.connect(this.#masterVolumeNode).connect(this.#compressorNode).connect(this.#audioContext.destination);
    }

    /**
     * Returns the current {@link WebAudioAPI} library version number.
     * 
     * @returns {string} Current library version number
     */
    getVersion() {
        return version;
    }

    /**
     * Returns the current global time since the {@link WebAudioAPI} library was started or
     * resumed using the {@link WebAudioAPI#start start()} function.
     * 
     * @returns {number} Current global time since the {@link WebAudioAPI} library was started
     */
    getCurrentTime() {
        return this.#audioContext.currentTime;
    }

    /**
     * Returns a full listing of recognized musical notes by the {@link WebAudioAPI} library.
     * 
     * This function can be used to enumerate available note options for displaying on a web page.
     * Note, however, that the `note` parameter passed to the {@link WebAudioAPI#playNote playNote()}
     * function must be the **numeric MIDI value** associated with a certain
     * {@link module:Constants.Note Note}, not a string-based key.
     * 
     * @returns {Object.<string, number>} Listing of recognized musical notes by the {@link WebAudioAPI} library
     * @see {@link module:Constants.Note Note}
     */
    getAvailableNotes() {
        return Note;
    }

    /**
     * Returns a full listing of recognized note durations by the {@link WebAudioAPI} library.
     * 
     * This function can be used to enumerate available duration options for displaying on a
     * web page. Note, however, that the `duration` parameter passed to the
     * {@link WebAudioAPI#playNote playNote()} function must be the **numeric value** associated
     * with a certain {@link module:Constants.Duration Duration}, not a string-based key.
     * 
     * @returns {Object.<string, number>} Listing of recognized note durations by the {@link WebAudioAPI} library
     * @see {@link module:Constants.Duration Duration}
     */
    getAvailableNoteDurations() {
        return Duration;
    }

    /**
     * Returns a listing of the available instruments located in the specified asset library.
     * 
     * Individual results from this function call can be passed directly to the
     * {@link WebAudioAPI#updateInstrument updateInstrument()} function to load a specific
     * instrument into an audio track.
     * 
     * @param {string} instrumentLibraryLocation - Absolute or relative URL pointing to a {@link WebAudioAPI} instrument library
     * @returns {Promise<string[]>} Listing of all available instrument names
     */
    async getAvailableInstruments(instrumentLibraryLocation) {
        if (Object.keys(this.#instrumentListing).length === 0) {
            this.#instrumentListing['Synthesizer'] = null;
            const cleanLocation = instrumentLibraryLocation.replace(/\/$/, '');
            const response = await fetch(cleanLocation + '/instrumentLibrary.json', {
                headers: { 'Accept': 'application/json' }
            });
            const instrumentData = await response.json();
            Object.keys(instrumentData).forEach(instrumentName => {
                this.#instrumentListing[instrumentName] = cleanLocation + instrumentData[instrumentName];
            });
        }
        return Object.keys(this.#instrumentListing);
    }

    /**
     * Returns a listing of the available effects located in the specified asset library.
     * 
     * @param {string} effectLibraryLocation - Absolute or relative URL pointing to a {@link WebAudioAPI} effects library
     * @returns {Promise<string[]>} Listing of all available effect names
     */
    async getAvailableEffects(effectLibraryLocation) {
        if (Object.keys(this.#effectListing).length === 0) {
            const cleanLocation = effectLibraryLocation.replace(/\/$/, '');
            const response = await fetch(cleanLocation + '/effectLibrary.json', {
                headers: { 'Accept': 'application/json' }
            });
            const effectData = await response.json();
            Object.keys(effectData).forEach(effectName => {
                this.#effectListing[effectName] = cleanLocation + effectData[effectName];
            });
        }
        return Object.keys(this.#effectListing);
    }

    /**
     * Returns a listing of the available MIDI devices connected to the client device.
     * 
     * Individual results from this function call can be passed directly to the
     * {@link connectMidiDeviceToTrack()} function to attach a MIDI device to a specified audio track.
     * 
     * @returns {Promise<string[]>} Listing of all available MIDI devices connected to the client device
     */
    async getAvailableMidiDevices() {
        let midiDevices = [];
        if (navigator.requestMIDIAccess && this.#midiDeviceAccess === null) {
            try {
                this.#midiDeviceAccess = await navigator.requestMIDIAccess();
                for (const midiDevice of this.#midiDeviceAccess.inputs.values())
                    midiDevices.push(midiDevice.name);
            } catch (err) {
                this.#midiDeviceAccess = null;
                throw MidiError('MIDI permissions are required in order to enumerate available MIDI devices!');
            }
        }
        return midiDevices;
    }

    /**
     * Creates a track capable of playing sequential audio. A single track can only utilize a
     * single instrument at a time.
     * 
     * @param {string} name - Name of the newly created track
     */
    createTrack(name) {
        this.removeTrack(name);
        this.#tracks[name] = createTrack(name, this.#audioContext, this.#tempo, this.#sourceSinkNode);
    }

    /**
     * Removes the specified audio track and cancels any audio scheduled for playback on this
     * track from playing or starting to play in the future.
     * 
     * @param {string} name - Name of the track to remove
     */
    removeTrack(name) {
        if (name in this.#tracks) {
            this.#tracks[name].deleteTrack();
            delete this.#tracks[name];
        }
    }

    /**
     * Removes all existing audio tracks and cancels all current and scheduled audio.
     */
    removeAllTracks() {
        for (const name in this.#tracks)
            this.removeTrack(name);
    }

    /**
     * Updates the instrument used to play back audio on the specified track.
     * 
     * The instrument name must refer to a valid instrument as returned by the
     * {@link WebAudioAPI#getAvailableInstruments getAvailableInstruments()} function.
     * 
     * @param {string} trackName - Name of the track for which to update the instrument
     * @param {string} instrumentName - Name of the instrument to assign to the track
     */
    async updateInstrument(trackName, instrumentName) {
        if (trackName in this.#tracks && instrumentName in this.#instrumentListing) {
            if (!(instrumentName in this.#loadedInstruments))
                this.#loadedInstruments[instrumentName] = await loadInstrument(this.#audioContext, instrumentName, this.#instrumentListing[instrumentName]);
            this.#tracks[trackName].updateInstrument(this.#loadedInstruments[instrumentName]);
        }
    }

    /**
     * Removes the instrument used to play back audio on the specified track.
     * 
     * @param {string} trackName - Name of the track from which to remove the current instrument
     */
    async removeInstrument(trackName) {
        if (trackName in this.#tracks)
            this.#tracks[trackName].removeInstrument();
    }

    /**
     * Updates the global tempo parameters for all audio tracks.
     * 
     * The `beatBase` parameter should correspond to the beat scaling factor associated with one of
     * the note durations from {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()}.
     * 
     * Any parameter may be set to `null` to keep it unchanged between consecutive function calls.
     * 
     * @param {(number|null)} beatBase - Note {@link module:Constants.Duration Duration} corresponding to a global beat
     * @param {(number|null)} beatsPerMinute - Number of global beats per minute
     * @param {(number|null)} timeSignatureNumerator - Number of beats per measure
     * @param {(number|null)} timeSignatureDenominator - Note {@link module:Constants.Duration Duration} corresponding to a measure beat
     */
    updateTempo(beatBase, beatsPerMinute, timeSignatureNumerator, timeSignatureDenominator) {
        this.#tempo.beatBase = beatBase ? beatBase : this.#tempo.beatBase;
        this.#tempo.beatsPerMinute = beatsPerMinute ? beatsPerMinute : this.#tempo.beatsPerMinute;
        this.#tempo.timeSignatureNumerator = timeSignatureNumerator ? timeSignatureNumerator : this.#tempo.timeSignatureNumerator;
        this.#tempo.timeSignatureDenominator = timeSignatureDenominator ? timeSignatureDenominator : this.#tempo.timeSignatureDenominator;
        this.#tempo.measureLengthSeconds = (60.0 / this.#tempo.beatsPerMinute) * this.#tempo.beatBase * this.#tempo.timeSignatureNumerator / this.#tempo.timeSignatureDenominator;
    }

    /**
     * Updates the master volume for all tracks at the specified time.
     * 
     * Note that the `updateTime` parameter can be omitted to immediately cause the level
     * change to take effect.
     * 
     * @param {number} percent - Master volume percentage between [0.0, 1.0]
     * @param {number} [updateTime] - Global API time at which to update the volume
     */
    updateMasterVolume(percent, updateTime) {
        this.#masterVolume = percent;
        this.#masterVolumeNode.gain.setValueAtTime(percent, updateTime == null ? this.#audioContext.currentTime : updateTime);
    }

    /**
     * Updates the volume for the specified track at the specified time.
     * 
     * Note that the `updateTime` parameter can be omitted to immediately cause the level
     * change to take effect.
     * 
     * @param {string} trackName - Name of the track for which to update the volume
     * @param {number} percent - Track volume percentage between [0.0, 1.0]
     * @param {number} [updateTime] - Global API time at which to update the volume
     */
    updateTrackVolume(trackName, percent, updateTime) {
        if (trackName in this.#tracks)
            this.#tracks[trackName].updateVolume(percent, updateTime);
    }

    /**
     * Updates the intensity of the master effect for all tracks at the specified time.
     * 
     * Note that the `updateTime` parameter can be omitted to immediately cause the change
     * to take effect.
     * 
     * @param {string} effectName - Name of the master effect to be updated
     * @param {Object} effectOptions - Effect-specific options (TODO)
     * @param {number} percent - Intensity of the effect as a percentage between [0.0, 1.0]
     * @param {number} [updateTime] - Global API time at which to update the effect
     */
    async updateMasterEffect(effectName, effectOptions, percent, updateTime) {
        // TODO: Implement (add if non-existent, else update, if no trackName, then master, effectType = reverb, effectOptions = impulse url)
        // effectOptions = null just updates percent
        // percent = null removes effect
        console.log(effectName, effectOptions, percent, updateTime);
    }

    /**
     * Updates the intensity of the effect for the specified track at the specified time.
     * 
     * Note that the `updateTime` parameter can be omitted to immediately cause the change
     * to take effect.
     * 
     * @param {string} trackName - Name of the track for which to update the effect
     * @param {string} effectName - Name of the track effect to be updated
     * @param {Object} effectOptions - Effect-specific options (TODO)
     * @param {number} percent - Intensity of the effect as a percentage between [0.0, 1.0]
     * @param {number} [updateTime] - Global API time at which to update the effect
     */
    async updateTrackEffect(trackName, effectName, effectOptions, percent, updateTime) {
        if (trackName in this.#tracks)
            this.#tracks[trackName].updateEffect(effectName, effectOptions, percent, updateTime);
    }

    /**
     * Removes the specified master effect from being utilized.
     * 
     * @param {string} effectName - Name of the master effect to be removed
     */
    async removeMasterEffectByName(effectName) {
        if (effectName in this.#effects) {
            // TODO: Disconnect from effects graph
            delete this.#effects[effectName];
        }
    }

    /**
     * Removes the specified master effect type from being utilized.
     * 
     * @param {EffectType} effectType - Type of master effect to be removed
     * @see {@link module:Constants.EffectType EffectType}
     */
    async removeMasterEffectByType(effectType) {
        for (const effectName in this.#effects)
            if (this.#effects[effectName].type == effectType) {
                // TODO: Disconnect from effects graph
                delete this.#effects[effectName];
            }
    }

    /**
     * Removes the specified effect from being utilized on the corresponding track.
     * 
     * @param {string} trackName - Name of the track from which to remove the effect
     * @param {string} effectName - Name of the track effect to be removed
     */
    async removeTrackEffectByName(trackName, effectName) {
        if (trackName in this.#tracks)
            this.#tracks[trackName].removeEffectByName(effectName);
    }

    /**
     * Removes the specified effect type from being utilized on the corresponding track.
     * 
     * @param {string} trackName - Name of the track from which to remove the effect
     * @param {EffectType} effectType - Type of track effect to be removed
     * @see {@link module:Constants.EffectType EffectType}
     */
    async removeTrackEffectByType(trackName, effectType) {
        if (trackName in this.#tracks)
            this.#tracks[trackName].removeEffectByType(effectType);
    }

    /**
     * Registers a callback function to receive incoming events from the specified MIDI device.
     * 
     * The `midiEventCallback` parameter should be a function that receives one parameter of type
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIMessageEvent MIDIMessageEvent}.
     * 
     * **Note:** A callback may be registered for a MIDI device that is also connected to an audio
     * track; however, only one top-level event callback can be registered to a MIDI device at
     * a time.
     * 
     * @param {string} midiDeviceName - Name of the MIDI device for which to receive events
     * @param {MidiEventCallback} midiEventCallback - Callback to fire when a MIDI event is received
     * @returns {boolean} Whether the event callback registration was successful
     */
    registerMidiDeviceCallback(midiDeviceName, midiEventCallback) {
        this.deregisterMidiDeviceCallback(midiDeviceName);
        if (this.#midiDeviceAccess) {
            for (const midiDevice of this.#midiDeviceAccess.inputs.values())
                if (midiDeviceName == midiDevice.name) {
                    midiDevice.addEventListener('midimessage', midiEventCallback);
                    this.#midiCallbacks[midiDeviceName] = { device: midiDevice, callback: midiEventCallback };
                    return true;
                }
        }
        return false;
    }

    /**
     * Removes a user-registered callback from the specified MIDI device so that it will no
     * longer fire upon reception of a MIDI event.
     * 
     * @param {string} midiDeviceName - Name of the MIDI device for which to stop receiving events
     */
    deregisterMidiDeviceCallback(midiDeviceName) {
        if (midiDeviceName in this.#midiCallbacks) {
            const midiObject = this.#midiCallbacks[midiDeviceName];
            midiObject.device.removeEventListener('midimessage', midiObject.callback);
            delete this.#midiCallbacks[midiDeviceName];
        }
    }

    /**
     * Connects a MIDI device to the specified audio track.
     * 
     * **Note:** A single MIDI device can be connected to multiple audio tracks, but an audio track
     * can only be connected to a single MIDI device.
     * 
     * @param {string} trackName - Name of the track to which to connect the MIDI device
     * @param {string} midiDeviceName - Name of the MIDI device to connect to the track
     * @returns {Promise<boolean>} Whether connecting the MIDI device to the track was successful
     */
    async connectMidiDeviceToTrack(trackName, midiDeviceName) {
        if (this.#midiDeviceAccess && trackName in this.#tracks) {
            for (const midiDevice of this.#midiDeviceAccess.inputs.values())
                if (midiDeviceName == midiDevice.name)
                    return this.#tracks[trackName].connectToMidiDevice(midiDevice);
        }
        return false;
    }

    /**
     * Disconnects all MIDI devices from the specified audio track.
     * 
     * @param {string} trackName - Name of the track from which to disconnect the MIDI device
     */
    async disconnectMidiDeviceFromTrack(trackName) {
        if (trackName in this.#tracks)
            this.#tracks[trackName].disconnectFromMidiDevice();
    }

    /**
     * Schedules a note to be played on a specific track for some duration of time.
     * 
     * Note that the `duration` parameter should correspond to the beat scaling factor
     * associated with one of the note durations from
     * {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()}.
     * Likewise, the `note` parameter should correspond to a MIDI note number as
     * associated with one of the notes returned from
     * {@link WebAudioAPI#getAvailableNotes getAvailableNotes()}.
     * 
     * @param {string} trackName - Name of the track on which to play the note
     * @param {number} note - MIDI {@link module:Constants.Note Note} number to be played
     * @param {number} startTime - Global API time at which to start playing the note
     * @param {number} duration - {@link module:Constants.Duration Duration} for which to continue playing the note
     * @param {number} [velocity=0.75] - Intensity of the note being played between [0.0, 1.0]
     * @returns {Promise<number>} Duration (in seconds) of the note being played
     * @see {@link module:Constants.Note Note}
     * @see {@link module:Constants.Duration Duration}
     */
    async playNote(trackName, note, startTime, duration, velocity = 0.75) {
        return (trackName in this.#tracks) ? await this.#tracks[trackName].playNote(note, velocity, startTime, duration) : 0;
    }

    /**
     * Schedules an audio clip to be played on a specific track for some duration of time.
     * 
     * If the `duration` parameter is not specified or is set to `null`, the audio clip will
     * play to completion.
     * 
     * @param {string} trackName - Name of the track on which to play the clip
     * @param {ArrayBuffer} buffer - Buffer containing raw, audio-encoded data
     * @param {number} startTime - Global API time at which to start playing the clip
     * @param {number|null} [duration] - Number of seconds for which to continue playing the clip
     * @returns {Promise<number>} Duration (in seconds) of the clip being played
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}
     */
    async playClip(trackName, buffer, startTime, duration) {
        return (trackName in this.#tracks) ? await this.#tracks[trackName].playClip(buffer, startTime, duration) : 0;
    }

    /**
     * Schedules an audio file to be played on a specific track for some duration of time.
     * 
     * If the `duration` parameter is not specified or is set to `null`, the audio file will
     * play to completion.
     * 
     * @param {string} trackName - Name of the track on which to play the file
     * @param {string} fileURL - URL location pointing to an audio file
     * @param {string} startTime - Global API time at which to start playing the file
     * @param {number|null} [duration] - Number of seconds for which to continue playing the file
     * @returns {Promise<number>} Duration (in seconds) of the file being played
     */
    async playFile(trackName, fileURL, startTime, duration) {
        return (trackName in this.#tracks) ? await this.#tracks[trackName].playFile(fileURL, startTime, duration) : 0;
    }

    /**
     * Immediately begins playing a note on the specified track. Playback continues until the note
     * is explicitly stopped using the {@link WebAudioAPI#stopNote stopNote()} function.
     * 
     * Note that the `note` parameter should correspond to a MIDI note number as associated
     * with one of the notes returned from {@link WebAudioAPI#getAvailableNotes getAvailableNotes()}.
     * 
     * @param {string} trackName - Name of the track on which to start playing the note
     * @param {number} note - MIDI {@link module:Constants.Note Note} number to be played
     * @param {number} [velocity=0.75] - Intensity of the note to play between [0.0, 1.0]
     * @returns {Promise<Object>} Reference to the newly scheduled note
     * @see {@link module:Constants.Note Note}
     */
    async startNote(trackName, note, velocity = 0.75) {
        return (trackName in this.#tracks) ? await this.#tracks[trackName].playNoteAsync(note, velocity) : {};
    }

    /**
     * Immediately stop playing a note on the specified track. The note to be stopped must be a
     * reference to an actively playing note that was previously returned from the
     * {@link WebAudioAPI#startNote startNote()} function.
     * 
     * @param {string} trackName - Name of the track on which to stop playing the note
     * @param {Object} note - Reference to an active note that was started using {@link WebAudioAPI#startNote startNote()}
     */
    async stopNote(trackName, note) {
        if (trackName in this.#tracks)
            this.#tracks[trackName].stopNoteAsync(note);
    }

    /**
     * Starts the {@link WebAudioAPI} library and allows audio playback to resume.
     */
    async start() {
        this.#started = true;
        this.#masterVolumeNode.gain.setValueAtTime(this.#masterVolume, this.#audioContext.currentTime);
        await this.#audioContext.resume();
    }

    /**
     * Stops the {@link WebAudioAPI} library and pauses any currently playing audio.
     */
    stop() {
        this.#started = false;
        this.#masterVolumeNode.gain.setTargetAtTime(0.0, this.#audioContext.currentTime, 0.03);
        setTimeout(async () => { if (!this.#started) await this.#audioContext.suspend(); }, 200);
    }
}

// Attach a WebAudioAPI reference to "window" so that it can be accessed from non-module Javascript files
window.WebAudioAPI = WebAudioAPI;

export { WebAudioAPI };