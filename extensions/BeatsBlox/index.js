(function () {
    'use strict';

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
     * Object representing a mapping between an effect type and its unique internal code.
     * @constant {Object.<string, number>}
     */
    const EffectType = {
        Reverb: 11, Delay: 12, Echo: 13, PitchShift: 14, Doppler: 15,                    // Time-Based Effects
        Chorus: 21, Tremolo: 22, Vibrato: 23, Flanger: 24, Phaser: 25,                   // Modulation Effects
        Panning: 31, Equalization: 32,                                                   // Spectral Effects
        Volume: 41, Compression: 42, Distortion: 43,                                     // Dynamic Effects
        LowPassFilter: 51, HighPassFilter: 52, BandPassFilter: 53, BandRejectFilter: 54  // Filter Effects
    };

    /**
     * Object representing a mapping between an acoustic analysis type and its unique internal code.
     * @constant {Object.<string, number>}
     */
    const AnalysisType = {
        TimeSeries: 1, PowerSpectrum: 2, TotalPower: 3
    };

    /**
     * Object representing a mapping between an encoding file type and its unique internal code.
     * @constant {Object.<string, number>}
     */
    const EncodingType = {
        WAV: 1
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
     * Module containing all {@link WebAudioAPI} error functionality.
     * 
     * @module Errors
     */

    class WebAudioMidiError extends Error {
        constructor(message) {
            super(message);
            this.name = 'WebAudioMidiError';
        }
    }

    class WebAudioDeviceError extends Error {
        constructor(message) {
            super(message);
            this.name = 'WebAudioDeviceError';
        }
    }

    class WebAudioTargetError extends Error {
        constructor(message) {
            super(message);
            this.name = 'WebAudioTargetError';
        }
    }

    class WebAudioValueError extends Error {
        constructor(message) {
            super(message);
            this.name = 'WebAudioValueError';
        }
    }

    class WebAudioTrackError extends Error {
        constructor(message) {
            super(message);
            this.name = 'WebAudioTrackError';
        }
    }

    class WebAudioRecordingError extends Error {
        constructor(message) {
            super(message);
            this.name = 'WebAudioRecordingError';
        }
    }

    /** Class representing all built-in {@link WebAudioAPI} audio encoders */
    class EncoderBase {

        /**
         * Called by a concrete encoder instance to initialize the inherited {@link EncoderBase} data
         * structure.
         */
        constructor() { /* Empty constructor */ }

        /**
         * Encodes the corresponding audio buffer, and returns a
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly
         * encoded data.
         * 
         * @param {AudioBuffer} audioData - {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer AudioBuffer} containing the data to encode
         * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer AudioBuffer}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
         */
        encode(audioData) { return undefined; }
    }

    /**
     * Class containing all WAV file encoding functionality.
     * @extends EncoderBase
     */
    class WavFileEncoder extends EncoderBase {

        /**
         * Constructs a new {@link WavFileEncoder} object.
         */
        constructor() {
            super();
        }

        encode(audioData) {
            // Code taken from https://russellgood.com/how-to-convert-audiobuffer-to-audio-file/
            const numChannels = audioData.numberOfChannels, length = audioData.length * numChannels * 2 + 44;
            const buffer = new ArrayBuffer(length), channels = [];
            const view = new DataView(buffer);
            let offset = 0, pos = 0;

            // Nested helper functions
            function setUint16(data) {
                view.setUint16(pos, data, true);
                pos += 2;
            }

            function setUint32(data) {
                view.setUint32(pos, data, true);
                pos += 4;
            }

            // Write WAVE header
            setUint32(0x46464952);                              // "RIFF"
            setUint32(length - 8);                              // file length - 8
            setUint32(0x45564157);                              // "WAVE"

            setUint32(0x20746d66);                              // "fmt " chunk
            setUint32(16);                                      // length = 16
            setUint16(1);                                       // PCM (uncompressed)
            setUint16(numChannels);
            setUint32(audioData.sampleRate);
            setUint32(audioData.sampleRate * 2 * numChannels);  // avg. bytes/sec
            setUint16(numChannels * 2);                         // block-align
            setUint16(16);                                      // 16-bit (hardcoded in this demo)

            setUint32(0x61746164);                              // "data" - chunk
            setUint32(length - pos - 4);                        // chunk length

            // Write interleaved data
            for (let i = 0; i < audioData.numberOfChannels; ++i)
                channels.push(audioData.getChannelData(i));
            while (pos < length) {
                for (let i = 0; i < numChannels; ++i) {
                    let sample = Math.max(-1, Math.min(1, channels[i][offset]));          // clamp
                    sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;    // scale to 16-bit signed int
                    view.setInt16(pos, sample, true);                                     // write 16-bit sample
                    pos += 2;
                }
                ++offset;                                                                // next source sample
            }
            return new Blob([view.buffer], { type: 'audio/wav' });
        }
    }

    /**
     * Module containing functionality to create and utilize {@link WebAudioAPI} data encoders.
     * @module Encoder
     */


    const EncoderClasses = {
        [EncodingType.WAV]: WavFileEncoder,
    };

    /**
     * Returns a concrete encoder implementation for the specified file type. The value passed
     * to the `fileType` parameter must be the **numeric value** associated with a certain
     * {@link module:Constants.EncodingType EncodingType}, not a string-based key.
     * 
     * @param {number} encodingType - Numeric value corresponding to the desired file {@link module:Constants.EncodingType EncodingType}
     * @returns {EncoderBase} Concrete encoder implementation for the specified {@link module:Constants.EncodingType EncodingType}
     * @see {@link module:Constants.EncodingType EncodingType}
     * @see {@link EncoderBase}
     */
    function getEncoderFor(encodingType) {
        return new EncoderClasses[encodingType]();
    }

    /** Class representing all base-level {@link WebAudioAPI} effects */
    class EffectBase {

        // Reference to the stored global AudioContext
        /** @type {AudioContext} */
        audioContext = null;

        /**
         * Called by a concrete effect instance to initialize the inherited {@link EffectBase} data
         * structure.
         * 
         * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
         */
        constructor(audioContext) {
            this.audioContext = audioContext;
        }

        /**
         * Loads the necessary data to implement the corresponding {@link Effect}, which can then be
         * applied to an individual {@link Track} or to the aggregate output of all tracks.
         */
        async load() { return; }

        /**
         * Updates the parameters of the effect at the specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update(effectOptions, updateTime, timeConstant) { return false; }

        /**
         * Returns a reference to the {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
         * to which all source {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNodes}
         * should be connected in order to activate this {@link Effect}.
         * 
         * @returns {AudioNode} Reference to the first {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode} in the effect sequencing pipeline
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
         */
        getInputNode() { return undefined; }

        /**
         * Returns a reference to the {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
         * from which all effect-modified output audio is produced.
         * 
         * @returns {AudioNode} Reference to the final {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode} in the effect sequencing pipeline
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
         */
        getOutputNode() { return undefined; }
    }

    /**
     * Class representing a Band-Pass Filter effect.
     * 
     * A Band-Pass Filter is defined by a lower and upper cutoff frequency between which audio
     * signals are allowed to pass, while all frequencies outside of this range are reduced or
     * eliminated completely.
     * 
     * @extends EffectBase
     */
    class BandPassFilter extends EffectBase {

        // Effect-specific private variables
        /** @type {BiquadFilterNode} */
        #filterNode;
        /** @type {number} */
        #lowerCutoffFrequency;
        /** @type {number} */
        #upperCutoffFrequency;

        // Parameter limits
        static minFrequency = 1;
        static maxFrequency = 22050;

        /**
         * Constructs a new {@link BandPassFilter} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#filterNode = new BiquadFilterNode(audioContext, { type: 'bandpass' });
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'lowerCutoffFrequency', type: 'number', validValues: [BandPassFilter.minFrequency, BandPassFilter.maxFrequency], defaultValue: BandPassFilter.minFrequency },
                { name: 'upperCutoffFrequency', type: 'number', validValues: [BandPassFilter.minFrequency, BandPassFilter.maxFrequency], defaultValue: BandPassFilter.maxFrequency }
            ];
        }

        async load() {
            this.#lowerCutoffFrequency = BandPassFilter.minFrequency;
            this.#upperCutoffFrequency = BandPassFilter.maxFrequency;
            this.#filterNode.frequency.value = 148.5;
            this.#filterNode.Q.value = 0.0001;
        }

        /**
         * Updates the {@link BandPassFilter} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} lowerCutoffFrequency - Frequency below which audio content will be reduced between [1, 22050]
         * @param {number} upperCutoffFrequency - Frequency above which audio content will be reduced between [1, 22050]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ lowerCutoffFrequency, upperCutoffFrequency }, updateTime, timeConstant) {
            if ((lowerCutoffFrequency == null) && (upperCutoffFrequency == null))
                throw new WebAudioValueError('Cannot update the BandPassFilter effect without at least one of the following parameters: "lowerCutoffFrequency, upperCutoffFrequency"');
            if (lowerCutoffFrequency != null) {
                if (((upperCutoffFrequency != null) && (lowerCutoffFrequency > upperCutoffFrequency)) || (lowerCutoffFrequency > this.#upperCutoffFrequency))
                    throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
            }
            else if (upperCutoffFrequency < this.#lowerCutoffFrequency)
                throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
            if ((lowerCutoffFrequency != null) && (lowerCutoffFrequency < BandPassFilter.minFrequency))
                throw new WebAudioValueError(`Lower cutoff frequency cannot be less than ${BandPassFilter.minFrequency}`);
            if ((upperCutoffFrequency != null) && (upperCutoffFrequency > BandPassFilter.maxFrequency))
                throw new WebAudioValueError(`Upper cutoff frequency cannot be greater than ${BandPassFilter.maxFrequency}`);
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (lowerCutoffFrequency != null)
                this.#lowerCutoffFrequency = lowerCutoffFrequency;
            if (upperCutoffFrequency != null)
                this.#upperCutoffFrequency = upperCutoffFrequency;
            const centerFrequency = Math.sqrt(this.#upperCutoffFrequency * this.#lowerCutoffFrequency);
            this.#filterNode.frequency.setTargetAtTime(centerFrequency, timeToUpdate, timeConstantTarget);
            this.#filterNode.Q.setTargetAtTime(centerFrequency / (0.0001 + this.#upperCutoffFrequency - this.#lowerCutoffFrequency), timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#filterNode;
        }

        getOutputNode() {
            return this.#filterNode;
        }
    }

    /**
     * Class representing a Band-Reject Filter effect.
     * 
     * A Band-Reject Filter is defined by a lower and upper cutoff frequency between which audio
     * signals are reduced or eliminated completely, while all frequencies outside of this range are
     * allowed to pass without alteration.
     * 
     * @extends EffectBase
     */
    class BandRejectFilter extends EffectBase {

        // Effect-specific private variables
        /** @type {BiquadFilterNode} */
        #filterNode;
        /** @type {number} */
        #lowerCutoffFrequency;
        /** @type {number} */
        #upperCutoffFrequency;

        // Parameter limits
        static minFrequency = 1;
        static maxFrequency = 22050;

        /**
         * Constructs a new {@link BandRejectFilter} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#filterNode = new BiquadFilterNode(audioContext, { type: 'notch' });
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'lowerCutoffFrequency', type: 'number', validValues: [BandRejectFilter.minFrequency, BandRejectFilter.maxFrequency], defaultValue: 148.5 },
                { name: 'upperCutoffFrequency', type: 'number', validValues: [BandRejectFilter.minFrequency, BandRejectFilter.maxFrequency], defaultValue: 148.5 }
            ];
        }

        async load() {
            this.#lowerCutoffFrequency = 148.5;
            this.#upperCutoffFrequency = 148.5;
            this.#filterNode.frequency.value = 148.5;
            this.#filterNode.Q.value = 1000.0;
        }

        /**
         * Updates the {@link BandRejectFilter} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} lowerCutoffFrequency - Frequency above which audio content will be reduced between [1, 22050]
         * @param {number} upperCutoffFrequency - Frequency below which audio content will be reduced between [1, 22050]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ lowerCutoffFrequency, upperCutoffFrequency }, updateTime, timeConstant) {
            if ((lowerCutoffFrequency == null) && (upperCutoffFrequency == null))
                throw new WebAudioValueError('Cannot update the BandRejectFilter effect without at least one of the following parameters: "lowerCutoffFrequency, upperCutoffFrequency"');
            if (lowerCutoffFrequency != null) {
                if (lowerCutoffFrequency < 20) {
                    lowerCutoffFrequency = 20;
                    if ((upperCutoffFrequency != null) && (upperCutoffFrequency < 20))
                        upperCutoffFrequency = 20;
                }
                if (((upperCutoffFrequency != null) && (lowerCutoffFrequency > upperCutoffFrequency)) || (lowerCutoffFrequency > this.#upperCutoffFrequency))
                    throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
            }
            else if (upperCutoffFrequency < this.#lowerCutoffFrequency)
                throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
            if ((lowerCutoffFrequency != null) && (lowerCutoffFrequency < BandRejectFilter.minFrequency))
                throw new WebAudioValueError(`Lower cutoff frequency cannot be less than ${BandRejectFilter.minFrequency}`);
            if ((upperCutoffFrequency != null) && (upperCutoffFrequency > BandRejectFilter.maxFrequency))
                throw new WebAudioValueError(`Upper cutoff frequency cannot be greater than ${BandRejectFilter.maxFrequency}`);
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (lowerCutoffFrequency != null)
                this.#lowerCutoffFrequency = lowerCutoffFrequency;
            if (upperCutoffFrequency != null)
                this.#upperCutoffFrequency = upperCutoffFrequency;
            const centerFrequency = Math.sqrt(this.#upperCutoffFrequency * this.#lowerCutoffFrequency);
            this.#filterNode.frequency.setTargetAtTime(centerFrequency, timeToUpdate, timeConstantTarget);
            this.#filterNode.Q.setTargetAtTime(centerFrequency / (0.0001 + this.#upperCutoffFrequency - this.#lowerCutoffFrequency), timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#filterNode;
        }

        getOutputNode() {
            return this.#filterNode;
        }
    }

    /**
     * Class representing a Chorus effect.
     * 
     * A Chorus effect is an audio modulation effect that replicates an audio signal and modulates
     * and delays the result, such that it comes directly after and alters the original signal's
     * pitch. This effect is used to thicken the tone of an audio signal and create an epic feeling.
     * 
     * @extends EffectBase
     */
    class Chorus extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #inputNode;
        /** @type {GainNode} */
        #outputNode;
        /** @type {DelayNode} */
        #wetDelayNode;
        /** @type {OscillatorNode} */
        #lfoNode;
        /** @type {GainNode} */
        #lfoGainNode;
        /** @type {DelayNode} */
        #delayLeft;
        /** @type {DelayNode} */
        #delayRight;
        /** @type {GainNode} */
        #feedbackLeft;
        /** @type {GainNode} */
        #feedbackRight;

        // Parameter limits
        static minRate = 0;
        static maxRate = 10;
        static minDelay = 0.0001;
        static maxDelay = 0.1;
        static minFeedback = 0;
        static maxFeedback = 0.95;
        static minIntensity = 0;
        static maxIntensity = 1;

        /**
         * Constructs a new {@link Chorus} effect object.
         */
        constructor(audioContext) {
            super(audioContext);

            this.#inputNode = new GainNode(audioContext);
            this.#outputNode = new GainNode(audioContext);
            const splitter = new ChannelSplitterNode(audioContext, { numberOfOutputs: 2 });
            this.#lfoNode = new OscillatorNode(audioContext);
            this.#delayLeft = new DelayNode(audioContext, { maxDelayTime: 1 });
            this.#delayRight = new DelayNode(audioContext, { maxDelayTime: 1 });
            this.#wetDelayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
            this.#lfoGainNode = new GainNode(audioContext);
            this.#feedbackLeft = new GainNode(audioContext);
            this.#feedbackRight = new GainNode(audioContext);
            const merger = new ChannelMergerNode(audioContext, { numberOfInputs: 2 });

            this.#lfoNode.connect(this.#lfoGainNode);
            this.#lfoGainNode.connect(this.#delayLeft.delayTime);
            this.#lfoGainNode.connect(this.#delayRight.delayTime);

            this.#inputNode.connect(this.#outputNode);
            this.#inputNode.connect(this.#wetDelayNode);
            this.#wetDelayNode.connect(splitter);
            splitter.connect(this.#delayLeft, 0);
            splitter.connect(this.#delayRight, 1);
            this.#delayLeft.connect(this.#feedbackLeft).connect(this.#delayRight).connect(merger, 0, 1);
            this.#delayRight.connect(this.#feedbackRight).connect(this.#delayLeft).connect(merger, 0, 0);
            merger.connect(this.#outputNode);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'rate', type: 'number', validValues: [Chorus.minRate, Chorus.maxRate], defaultValue: 0.8 },
                { name: 'shape', type: 'string', validValues: ['sine', 'square', 'sawtooth', 'triangle'], defaultValue: 'sine' },
                { name: 'delay', type: 'number', validValues: [Chorus.minDelay, Chorus.maxDelay], defaultValue: 0.03 },
                { name: 'feedback', type: 'number', validValues: [Chorus.minFeedback, Chorus.maxFeedback], defaultValue: 0 },
                { name: 'intensity', type: 'number', validValues: [Chorus.minIntensity, Chorus.maxIntensity], defaultValue: 0 },
            ];
        }

        async load() {
            this.#inputNode.gain.value = 0.5;
            this.#outputNode.gain.value = 1;
            this.#lfoGainNode.gain.value = 0;
            this.#wetDelayNode.delayTime.value = 0.03;
            this.#delayLeft.delayTime.value = this.#delayRight.delayTime.value = 0.01;
            this.#feedbackLeft.gain.value = this.#feedbackRight.gain.value = 0;
            this.#lfoNode.frequency.value = 0.8;
            this.#lfoNode.type = 'sine';
            this.#lfoNode.start();
        }

        /**
         * Updates the {@link Chorus} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} rate - Frequency at which an oscillator modulates the delayed chorus signal in Hertz between [0, 10]
         * @param {string} shape - Waveform shape used to modulate the delayed chorus signal from ['sine', 'square', 'sawtooth', 'triangle']
         * @param {number} delay - Number of seconds delay between the original signal and the modulated chorus signal between [0.0001, 0.1]
         * @param {number} feedback - Percentage of processed signal to be fed back into the chorus circuit between [0, 0.95]
         * @param {number} intensity - Amount of modulation to apply as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ rate, shape, delay, feedback, intensity }, updateTime, timeConstant) {
            if ((rate == null) && (shape == null) && (delay == null) && (feedback == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Chorus effect without at least one of the following parameters: "rate, shape, delay, feedback, intensity"');
            if (rate != null) {
                if (rate < Chorus.minRate)
                    throw new WebAudioValueError(`Rate value cannot be less than ${Chorus.minRate}`);
                else if (rate > Chorus.maxRate)
                    throw new WebAudioValueError(`Rate value cannot be greater than ${Chorus.maxRate}`);
            }
            if (shape != null) {
                if (!['sine', 'square', 'sawtooth', 'triangle'].includes(shape))
                    throw new WebAudioValueError('Shape value must be one of: ["sine", "square", "sawtooth", "triangle"]');
            }
            if (delay != null) {
                if (delay < Chorus.minDelay)
                    throw new WebAudioValueError(`Delay value cannot be less than ${Chorus.minDelay}`);
                else if (delay > Chorus.maxDelay)
                    throw new WebAudioValueError(`Delay value cannot be greater than ${Chorus.maxDelay}`);
            }
            if (feedback != null) {
                if (feedback < Chorus.minFeedback)
                    throw new WebAudioValueError(`Feedback value cannot be less than ${Chorus.minFeedback}`);
                else if (feedback > Chorus.maxFeedback)
                    throw new WebAudioValueError(`Feedback value cannot be greater than ${Chorus.maxFeedback}`);
            }
            if (intensity != null) {
                if (intensity < Chorus.minIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Chorus.minIntensity}`);
                else if (intensity > Chorus.maxIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Chorus.maxIntensity}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (rate != null)
                this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
            if (shape != null)
                this.#lfoNode.type = shape;
            if (delay != null)
                this.#wetDelayNode.delayTime.setTargetAtTime(delay, timeToUpdate, timeConstantTarget);
            if (feedback != null) {
                this.#feedbackLeft.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
                this.#feedbackRight.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
            }
            if (intensity != null)
                this.#lfoGainNode.gain.setTargetAtTime(0.001 * intensity, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#inputNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing a Compression effect.
     * 
     * A Compression effect, also known as Dynamic Range Compression, alters an audio signal such
     * that a steady volume is maintained throughout audio playback. This is achieved by amplifying
     * quieter sounds and attenuating louder sounds to help create signal homogeneity.
     * 
     * @extends EffectBase
     */
    class Compression extends EffectBase {

        // Effect-specific private variables
        /** @type {DynamicsCompressorNode} */
        #compressorNode;

        // Parameter limits
        static minThreshold = -100;
        static maxThreshold = 0;
        static minAttack = 0;
        static maxAttack = 1;
        static minRelease = 0;
        static maxRelease = 1;
        static minIntensity = 0;
        static maxIntensity = 1;

        /**
         * Constructs a new {@link Compression} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#compressorNode = new DynamicsCompressorNode(audioContext);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'threshold', type: 'number', validValues: [Compression.minThreshold, Compression.maxThreshold], defaultValue: -24 },
                { name: 'attack', type: 'number', validValues: [Compression.minAttack, Compression.maxAttack], defaultValue: 0.003 },
                { name: 'release', type: 'number', validValues: [Compression.minRelease, Compression.maxRelease], defaultValue: 0.25 },
                { name: 'intensity', type: 'number', validValues: [Compression.minIntensity, Compression.maxIntensity], defaultValue: 0 }
            ];
        }

        async load() {
            this.#compressorNode.threshold.value = -24;
            this.#compressorNode.attack.value = 0.003;
            this.#compressorNode.release.value = 0.25;
            this.#compressorNode.ratio.value = 1.0;
        }

        /**
         * Updates the {@link Compression} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} threshold - Decibel loudness of the input signal above which the compressor kicks in between [-100, 0]
         * @param {number} attack - Number of seconds required to reduce signal gain by 10 dB between [0, 1]
         * @param {number} release - Number of seconds required to increase signal gain by 10 dB between [0, 1]
         * @param {number} intensity - Amount of compression applied as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ threshold, attack, release, intensity }, updateTime, timeConstant) {
            if ((threshold == null) && (attack == null) && (release == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Compression effect without at least one of the following parameters: "threshold, attack, release, intensity"');
            if (threshold != null) {
                if (threshold < Compression.minThreshold)
                    throw new WebAudioValueError(`Threshold value cannot be less than ${Compression.minThreshold}`);
                else if (threshold > Compression.maxThreshold)
                    throw new WebAudioValueError(`Threshold value cannot be greater than ${Compression.maxThreshold}`);
            }
            if (attack != null) {
                if (attack < Compression.minAttack)
                    throw new WebAudioValueError(`Attack value cannot be less than ${Compression.minAttack}`);
                else if (attack > Compression.maxAttack)
                    throw new WebAudioValueError(`Attack value cannot be greater than ${Compression.maxAttack}`);
            }
            if (release != null) {
                if (release < Compression.minRelease)
                    throw new WebAudioValueError(`Release value cannot be less than ${Compression.minRelease}`);
                else if (release > Compression.maxRelease)
                    throw new WebAudioValueError(`Release value cannot be greater than ${Compression.maxRelease}`);
            }
            if (intensity != null) {
                if (intensity < Compression.minIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Compression.minIntensity}`);
                else if (intensity > Compression.maxIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Compression.maxIntensity}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (threshold != null)
                this.#compressorNode.threshold.setTargetAtTime(threshold, timeToUpdate, timeConstantTarget);
            if (attack != null)
                this.#compressorNode.attack.setTargetAtTime(attack, timeToUpdate, timeConstantTarget);
            if (release != null)
                this.#compressorNode.release.setTargetAtTime(release, timeToUpdate, timeConstantTarget);
            if (intensity != null) {
                const ratioValue = 1.0 + (intensity * 19.0);
                this.#compressorNode.ratio.setTargetAtTime(ratioValue, timeToUpdate, timeConstantTarget);
            }
            return true;
        }

        getInputNode() {
            return this.#compressorNode;
        }

        getOutputNode() {
            return this.#compressorNode;
        }
    }

    /**
     * Class representing a Delay effect.
     * 
     * A Delay effect replicates an audio signal and plays back one or more possibly attenuated
     * copies at a later, user-specified time.
     * 
     * @extends EffectBase
     */
    class Delay extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #inputNode;
        /** @type {GainNode} */
        #outputNode;
        /** @type {DelayNode} */
        #delayNode;
        /** @type {GainNode} */
        #gainNode;

        // Parameter limits
        static minDelay = 0;
        static maxDelay = 1;
        static minAttenuation = 0;
        static maxAttenuation = 1;

        /**
         * Constructs a new {@link Delay} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#inputNode = new GainNode(audioContext);
            this.#outputNode = new GainNode(audioContext);
            this.#delayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
            this.#gainNode = new GainNode(audioContext);
            this.#inputNode.connect(this.#outputNode);
            this.#inputNode.connect(this.#delayNode).connect(this.#gainNode).connect(this.#outputNode);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'delay', type: 'number', validValues: [Delay.minDelay, Delay.maxDelay], defaultValue: Delay.minDelay },
                { name: 'attenuation', type: 'number', validValues: [Delay.minAttenuation, Delay.maxAttenuation], defaultValue: Delay.minAttenuation }
            ];
        }

        async load() {
            this.#inputNode.gain.value = this.#outputNode.gain.value = 1;
            this.#delayNode.delayTime.value = Delay.minDelay;
            this.#gainNode.gain.value = 1.0 - Delay.minAttenuation;
        }

        /**
         * Updates the {@link Delay} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} delay - Number of seconds to delay outputting the audio signal between [0, 1]
         * @param {number} attenuation - Amount to attenuate the delayed signal as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ delay, attenuation }, updateTime, timeConstant) {
            if ((delay == null) && (attenuation == null))
                throw new WebAudioValueError('Cannot update the Delay effect without at least one of the following parameters: "delay, attenuation"');
            if (delay != null) {
                if (delay < Delay.minDelay)
                    throw new WebAudioValueError(`Delay value cannot be less than ${Delay.minDelay}`);
                else if (delay > Delay.maxDelay)
                    throw new WebAudioValueError(`Delay value cannot be greater than ${Delay.maxDelay}`);
            }
            if (attenuation != null) {
                if (attenuation < Delay.minAttenuation)
                    throw new WebAudioValueError(`Attenuation value cannot be less than ${Delay.minAttenuation}`);
                else if (attenuation > Delay.maxAttenuation)
                    throw new WebAudioValueError(`Attenuation value cannot be greater than ${Delay.maxAttenuation}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (delay != null)
                this.#delayNode.delayTime.setTargetAtTime(delay, timeToUpdate, timeConstantTarget);
            if (attenuation != null)
                this.#gainNode.gain.setTargetAtTime(1.0 - attenuation, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#inputNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing a Distortion effect.
     * 
     * A Distortion effect alters an audio waveform by adding a large amount of gain to the audio
     * signal, normally to the point of clipping the signal. This creates a distorted, gritty feeling,
     * most commonly used with electrical instruments.
     * 
     * @extends EffectBase
     */
    class Distortion extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #outputNode;
        /** @type {BiquadFilterNode} */
        #preBandpassNode;
        /** @type {WaveShaperNode} */
        #distortionNode;

        // Parameter limits
        static minTone = 0;
        static maxTone = 22050;
        static minIntensity = 0;
        static maxIntensity = 1;

        /**
         * Constructs a new {@link Distortion} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#outputNode = new GainNode(audioContext);
            this.#preBandpassNode = new BiquadFilterNode(audioContext, { type: 'lowpass' });
            this.#distortionNode = new WaveShaperNode(audioContext);
            this.#preBandpassNode.connect(this.#distortionNode).connect(this.#outputNode);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'tone', type: 'number', validValues: [Distortion.minTone, Distortion.maxTone], defaultValue: 3000 },
                { name: 'intensity', type: 'number', validValues: [Distortion.minIntensity, Distortion.maxIntensity], defaultValue: 0.5 }
            ];
        }

        async load() {
            const driveValue = 0.5, n = 22050, deg = Math.PI / 180;
            const k = driveValue * 100, curve = new Float32Array(n);
            this.#preBandpassNode.frequency.value = 3000;
            for (let i = 0; i < n; ++i) {
                const x = i * 2 / n - 1;
                curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }
            this.#distortionNode.curve = curve;
            this.#outputNode.gain.value = driveValue;
        }

        /**
         * Updates the {@link Distortion} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} tone - Low-pass cutoff frequency in Hz for filtering before distortion between [0, 22050]
         * @param {number} intensity - Ratio of distorted-to-original sound as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ tone, intensity }, updateTime, timeConstant) {
            if ((tone == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Distortion effect without at least one of the following parameters: "tone, intensity"');
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (tone != null)
                this.#preBandpassNode.frequency.setTargetAtTime(tone, timeToUpdate, timeConstantTarget);
            if (intensity != null) {
                const n = 22050, deg = Math.PI / 180;
                const k = intensity * 100, curve = new Float32Array(n);
                for (let i = 0; i < n; ++i) {
                    const x = i * 2 / n - 1;
                    curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
                }
                this.#distortionNode.curve = curve;
                const gainOffset = (intensity < 0.5) ? (Math.exp(2.3 * (0.5 - intensity)) - 0.5) : (0.5 + (0.2 * (0.5 - intensity)));
                this.#outputNode.gain.setTargetAtTime(gainOffset, timeToUpdate, timeConstantTarget);
            }
            return true;
        }

        getInputNode() {
            return this.#preBandpassNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing a Pitch Shift effect.
     * 
     * A Pitch Shift performs a permanent shift in frequency between an incoming and
     * outgoing audio signal.
     * 
     * @extends EffectBase
     */
    class PitchShift extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #inputNode; #outputNode;
        /** @type {GainNode} */
        #modGain1Node; #modGain2Node;
        /** @type {AudioBuffer} */
        #shiftDownBuffer; #shiftUpBuffer;
        /** @type {GainNode} */
        #mod1GainNode; #mod2GainNode; #mod3GainNode; #mod4GainNode;
        /** @type {AudioBufferSourceNode} */
        #mod1Node; #mod2Node; #mod3Node; #mod4Node;
        /** @type {AudioBufferSourceNode} */
        #fade1Node; #fade2Node;

        // Parameter limits
        static bufferTime = 0.250;
        static delayTime = 0.250;
        static fadeTime = 0.125;
        static minShift = -1200;
        static maxShift = 700;

        /**
         * Constructs a new {@link PitchShift} effect object.
         */
        constructor(audioContext) {
            super(audioContext);

            // Required audio nodes
            this.#inputNode = new GainNode(audioContext);
            this.#outputNode = new GainNode(audioContext);
            this.#mod1GainNode = new GainNode(audioContext, { gain: 1 });
            this.#mod2GainNode = new GainNode(audioContext, { gain: 1 });
            this.#mod3GainNode = new GainNode(audioContext, { gain: 0 });
            this.#mod4GainNode = new GainNode(audioContext, { gain: 0 });
            this.#modGain1Node = new GainNode(audioContext, { gain: 1 });
            this.#modGain2Node = new GainNode(audioContext, { gain: 1 });
            const delay1 = new DelayNode(audioContext, { maxDelayTime: 1 });
            const delay2 = new DelayNode(audioContext, { maxDelayTime: 1 });

            // Delay modulation
            const length1 = PitchShift.bufferTime * audioContext.sampleRate;
            const length = length1 + ((PitchShift.bufferTime - 2 * PitchShift.fadeTime) * audioContext.sampleRate);
            this.#shiftDownBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
            {
                const p = this.#shiftDownBuffer.getChannelData(0);
                for (let i = 0; i < length1; ++i)
                    p[i] = i / length1;
                for (let i = length1; i < length; ++i)
                    p[i] = 0;
            }
            this.#shiftUpBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
            {
                const p = this.#shiftUpBuffer.getChannelData(0);
                for (let i = 0; i < length1; ++i)
                    p[i] = (length1 - i) / length;
                for (let i = length1; i < length; ++i)
                    p[i] = 0;
            }
            this.#mod1Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftDownBuffer, loop: true });
            this.#mod2Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftDownBuffer, loop: true });
            this.#mod3Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftUpBuffer, loop: true });
            this.#mod4Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftUpBuffer, loop: true });

            // Delay amount for changing pitch
            this.#mod1Node.connect(this.#mod1GainNode);
            this.#mod2Node.connect(this.#mod2GainNode);
            this.#mod3Node.connect(this.#mod3GainNode);
            this.#mod4Node.connect(this.#mod4GainNode);
            this.#mod1GainNode.connect(this.#modGain1Node);
            this.#mod2GainNode.connect(this.#modGain2Node);
            this.#mod3GainNode.connect(this.#modGain1Node);
            this.#mod4GainNode.connect(this.#modGain2Node);
            this.#modGain1Node.connect(delay1.delayTime);
            this.#modGain2Node.connect(delay2.delayTime);

            // Crossfading
            const fadeBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
            {
                const p = fadeBuffer.getChannelData(0), fadeLength = PitchShift.fadeTime * audioContext.sampleRate;
                const fadeIndex1 = fadeLength, fadeIndex2 = length1 - fadeLength;
                for (let i = 0; i < length1; ++i)
                    p[i] = (i < fadeIndex1) ? Math.sqrt(i / fadeLength) :
                        ((i >= fadeIndex2) ? Math.sqrt(1 - (i - fadeIndex2) / fadeLength) : 1);
                for (let i = length1; i < length; ++i)
                    p[i] = 0;
            }
            this.#fade1Node = new AudioBufferSourceNode(audioContext, { buffer: fadeBuffer, loop: true });
            this.#fade2Node = new AudioBufferSourceNode(audioContext, { buffer: fadeBuffer, loop: true });
            const mix1 = new GainNode(audioContext, { gain: 0 });
            const mix2 = new GainNode(audioContext, { gain: 0 });
            this.#fade1Node.connect(mix1.gain);
            this.#fade2Node.connect(mix2.gain);

            // Connect processing graph
            this.#inputNode.connect(delay1);
            this.#inputNode.connect(delay2);
            delay1.connect(mix1);
            delay2.connect(mix2);
            mix1.connect(this.#outputNode);
            mix2.connect(this.#outputNode);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'shift', type: 'number', validValues: [PitchShift.minShift, PitchShift.maxShift], defaultValue: 0 }
            ];
        }

        async load() {
            const t = this.audioContext.currentTime + 0.050;
            const t2 = t + PitchShift.bufferTime - PitchShift.fadeTime;
            this.#modGain1Node.gain.value = 0;
            this.#modGain2Node.gain.value = 0;
            this.#mod1Node.start(t);
            this.#mod2Node.start(t2);
            this.#mod3Node.start(t);
            this.#mod4Node.start(t2);
            this.#fade1Node.start(t);
            this.#fade2Node.start(t2);
        }

        // Private update function for internal use only by Doppler effect
        async updatePrivate(shift, updateTime, timeWeights, duration) {
            const finalGain = 0.5 * PitchShift.delayTime * Math.abs(shift) / 1200;
            for (let i = 0; i < timeWeights.length; ++i)
                timeWeights[i] *= finalGain;
            this.#mod1GainNode.gain.cancelScheduledValues(updateTime);
            this.#mod2GainNode.gain.cancelScheduledValues(updateTime);
            this.#mod3GainNode.gain.cancelScheduledValues(updateTime);
            this.#mod4GainNode.gain.cancelScheduledValues(updateTime);
            if (shift > 0) {
                this.#mod1GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
                this.#mod2GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
                this.#mod3GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
                this.#mod4GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
            } else {
                this.#mod1GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
                this.#mod2GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
                this.#mod3GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
                this.#mod4GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
            }
            this.#modGain1Node.gain.cancelScheduledValues(updateTime);
            this.#modGain2Node.gain.cancelScheduledValues(updateTime);
            this.#modGain1Node.gain.setValueCurveAtTime(timeWeights, updateTime, duration);
            this.#modGain2Node.gain.setValueCurveAtTime(timeWeights, updateTime, duration);
            return true;
        }

        /* eslint no-empty-pattern: "off" */
        /**
         * Updates the {@link PitchShift} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} shift - Frequency shift in cents between [-1200, 1200]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ shift }, updateTime, timeConstant) {
            if (shift == null)
                throw new WebAudioValueError('Cannot update the PitchShift effect without at least one of the following parameters: "shift"');
            else if (shift < PitchShift.minShift)
                throw new WebAudioValueError(`Shift value cannot be less than ${PitchShift.minShift}`);
            else if (shift > PitchShift.maxShift)
                throw new WebAudioValueError(`Shift value cannot be greater than ${PitchShift.maxShift}`);
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            this.#mod1GainNode.gain.cancelScheduledValues(timeToUpdate);
            this.#mod2GainNode.gain.cancelScheduledValues(timeToUpdate);
            this.#mod3GainNode.gain.cancelScheduledValues(timeToUpdate);
            this.#mod4GainNode.gain.cancelScheduledValues(timeToUpdate);
            if (shift > 0) {
                this.#mod1GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
                this.#mod2GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
                this.#mod3GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
                this.#mod4GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
            } else {
                this.#mod1GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
                this.#mod2GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
                this.#mod3GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
                this.#mod4GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
            }
            this.#modGain1Node.gain.cancelScheduledValues(timeToUpdate);
            this.#modGain2Node.gain.cancelScheduledValues(timeToUpdate);
            this.#modGain1Node.gain.setTargetAtTime(0.5 * PitchShift.delayTime * Math.abs(shift) / 1200, timeToUpdate, timeConstantTarget);
            this.#modGain2Node.gain.setTargetAtTime(0.5 * PitchShift.delayTime * Math.abs(shift) / 1200, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#inputNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing a Doppler effect.
     * 
     * A Doppler effect performs a linear change in frequency over a specified period of time.
     * 
     * @extends EffectBase
     */
    class Doppler extends EffectBase {

        // Effect-specific private variables
        /** @type {PitchShift} */
        #pitchShifter;

        // Parameter limits
        static minDistance = 0;
        static maxDistance = 1000;
        static minDuration = 0;
        static maxDuration = 60;

        /**
         * Constructs a new {@link Doppler} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#pitchShifter = new PitchShift(audioContext);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'initDistance', type: 'number', validValues: [Doppler.minDistance, Doppler.maxDistance], defaultValue: 100 },
                { name: 'finalDistance', type: 'number', validValues: [Doppler.minDistance, Doppler.maxDistance], defaultValue: 100 },
                { name: 'missDistance', type: 'number', validValues: [Doppler.minDistance, Doppler.maxDistance], defaultValue: 14 },
                { name: 'duration', type: 'number', validValues: [Doppler.minDuration, Doppler.maxDuration], defaultValue: 10 }
            ];
        }

        async load() {
            await this.#pitchShifter.load();
        }

        /* eslint no-empty-pattern: "off" */
        /**
         * Updates the {@link Doppler} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} initDistance - Starting distance in meters between an audio source and an observer
         * @param {number} finalDistance - Final distance in meters between an audio source and an observer
         * @param {number} missDistance - Distance in meters by which the audio source misses the observer
         * @param {number} duration - Duration in seconds required for the audio source to travel from its starting to final location
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ initDistance, finalDistance, missDistance, duration }, updateTime) {
            if ((initDistance == null) || (finalDistance == null) || (missDistance == null) || (duration == null))
                throw new WebAudioValueError('Cannot update the Doppler effect without all of the following parameters: "initDistance, finalDistance, missDistance, duration"');
            else if (initDistance < Doppler.minDistance)
                throw new WebAudioValueError(`Distance value cannot be less than ${Doppler.minDistance}`);
            else if (initDistance > Doppler.maxDistance)
                throw new WebAudioValueError(`Distance value cannot be greater than ${Doppler.maxDistance}`);
            else if (finalDistance < Doppler.minDistance)
                throw new WebAudioValueError(`Distance value cannot be less than ${Doppler.minDistance}`);
            else if (finalDistance > Doppler.maxDistance)
                throw new WebAudioValueError(`Distance value cannot be greater than ${Doppler.maxDistance}`);
            else if (missDistance < Doppler.minDistance)
                throw new WebAudioValueError(`Distance value cannot be less than ${Doppler.minDistance}`);
            else if (missDistance > Doppler.maxDistance)
                throw new WebAudioValueError(`Distance value cannot be greater than ${Doppler.maxDistance}`);
            else if (duration < Doppler.minDuration)
                throw new WebAudioValueError(`Duration value cannot be less than ${Doppler.minDuration}`);
            else if (duration > Doppler.maxDuration)
                throw new WebAudioValueError(`Duration value cannot be greater than ${Doppler.maxDuration}`);
            else if (initDistance < missDistance)
                throw new WebAudioValueError('Initial distance cannot be less than the miss distance');
            else if (finalDistance < missDistance)
                throw new WebAudioValueError('Final distance cannot be less than the miss distance');
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const approachingDistance = Math.sqrt(initDistance ** 2 - missDistance ** 2);
            const departingDistance = Math.sqrt(finalDistance ** 2 - missDistance ** 2);
            const totalDistance = approachingDistance + departingDistance;
            const speedMetersPerCentisecond = totalDistance / (100 * duration);
            const approachingDuration = duration * (approachingDistance / totalDistance);
            const departingDuration = duration * (departingDistance / totalDistance);
            const approachingWeights = new Float32Array(approachingDuration * 100);
            const departingWeights = new Float32Array(departingDuration * 100);
            for (let i = 0; i < approachingWeights.length; ++i)
                approachingWeights[i] = Math.cos(Math.atan2(missDistance, approachingDistance - (i * speedMetersPerCentisecond)));
            for (let i = 0; i < departingWeights.length; ++i)
                departingWeights[i] = Math.cos(Math.atan2(missDistance, i * speedMetersPerCentisecond));
            const approachingFrequency = 1200 * Math.log2(343.0 / (343.0 - (100 * speedMetersPerCentisecond)));
            const departingFrequency = 1200 * Math.log2(343.0 / (343.0 + (100 * speedMetersPerCentisecond)));
            this.#pitchShifter.updatePrivate(approachingFrequency, timeToUpdate, approachingWeights, approachingDuration);
            this.#pitchShifter.updatePrivate(departingFrequency, timeToUpdate + approachingDuration, departingWeights, departingDuration);
            return true;
        }

        getInputNode() {
            return this.#pitchShifter.getInputNode();
        }

        getOutputNode() {
            return this.#pitchShifter.getOutputNode();
        }
    }

    /**
     * Class representing an Echo effect.
     * 
     * An Echo effect represents more or more reflections of an original audio signal. It is similar
     * to a Delay effect, except that echoes themselves can feed back into the audio processing loop,
     * resulting in additional, decaying echoes.
     * 
     * @extends EffectBase
     */
    class Echo extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #inputNode;
        /** @type {DelayNode} */
        #delayNode;
        /** @type {GainNode} */
        #feedbackNode;
        /** @type {GainNode} */
        #outputNode;

        // Parameter limits
        static minEchoTime = 0;
        static maxEchoTime = 1;
        static minFeedback = 0;
        static maxFeedback = 0.95;

        /**
         * Constructs a new {@link Echo} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#inputNode = new GainNode(audioContext);
            this.#outputNode = new GainNode(audioContext);
            this.#delayNode = new DelayNode(audioContext, { maxDelayTime: Echo.maxEchoTime });
            this.#feedbackNode = new GainNode(audioContext);
            this.#inputNode.connect(this.#outputNode);
            this.#inputNode.connect(this.#delayNode).connect(this.#feedbackNode).connect(this.#delayNode).connect(this.#outputNode);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'echoTime', type: 'number', validValues: [Echo.minEchoTime, Echo.maxEchoTime], defaultValue: Echo.minEchoTime },
                { name: 'intensity', type: 'number', validValues: [Echo.minFeedback, Echo.maxFeedback], defaultValue: Echo.minFeedback },
            ];
        }

        async load() {
            this.#inputNode.gain.value = this.#outputNode.gain.value = 1;
            this.#delayNode.delayTime.value = Echo.minEchoTime;
            this.#feedbackNode.gain.value = Echo.minFeedback;
        }

        /**
         * Updates the {@link Echo} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} echoTime - Number of seconds between the original audio and its first echo between [0, 1]
         * @param {number} intensity - Percentage of the original audio that will be present in each consecutive echo between [0, 0.95]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ echoTime, intensity }, updateTime, timeConstant) {
            if ((echoTime == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Echo effect without at least one of the following parameters: "echoTime, intensity"');
            if (echoTime != null) {
                if (echoTime < Echo.minEchoTime)
                    throw new WebAudioValueError(`EchoTime value cannot be less than ${Echo.minEchoTime}`);
                else if (echoTime > Echo.maxEchoTime)
                    throw new WebAudioValueError(`EchoTime value cannot be greater than ${Echo.maxEchoTime}`);
            }
            if (intensity != null) {
                if (intensity < Echo.minFeedback)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Echo.minFeedback}`);
                else if (intensity > Echo.maxFeedback)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Echo.maxFeedback}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (echoTime != null)
                this.#delayNode.delayTime.setTargetAtTime(echoTime, timeToUpdate, timeConstantTarget);
            if (intensity != null)
                this.#feedbackNode.gain.setTargetAtTime(intensity, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#inputNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing an Equalization effect.
     * 
     * An Equalizer allows for the volume of an audio signal to be adjusted piecewise according to
     * any number of discrete frequency ranges. Both the size and quantity of frequency ranges are
     * user-definable.
     * 
     * @extends EffectBase
     */
    class Equalization extends EffectBase {

        // Effect-specific private variables
        /** @type {BiquadFilterNode[]} */
        #equalizerNodes;

        // Parameter limits
        static minGain = -40;
        static maxGain = 40;
        static minCutoff = 1000;
        static maxCutoff = 22050;

        /**
         * Constructs a new {@link Equalization} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#equalizerNodes = [
                new BiquadFilterNode(audioContext, { type: 'lowshelf', frequency: audioContext.sampleRate / 4, gain: 0 }),
                new BiquadFilterNode(audioContext, { type: 'highshelf', frequency: audioContext.sampleRate / 4, gain: 0 })
            ];
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'frequencyBandUpperCutoffs', type: 'Array<number>', validValues: [Equalization.minCutoff, Equalization.maxCutoff], defaultValue: 0 },
                { name: 'frequencyBandGains', type: 'Array<number>', validValues: [Equalization.minGain, Equalization.maxGain], defaultValue: 0 },
            ];
        }

        async load() {
            this.#equalizerNodes[0].connect(this.#equalizerNodes[1]);
        }

        /**
         * Updates the {@link Equalization} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number[]} frequencyBandUpperCutoffs - Upper frequency cutoffs in Hz for each band in the equalizer between [0, 22050]
         * @param {number[]} frequencyBandGains - Gains in dB for each frequency band in the equalizer between [-40, 40]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ frequencyBandUpperCutoffs, frequencyBandGains }, updateTime, timeConstant) {
            if ((frequencyBandUpperCutoffs == null) || (frequencyBandGains == null))
                throw new WebAudioValueError('Cannot update the Equalization effect without both of the following parameters: "frequencyBandUpperCutoffs, frequencyBandGains"');
            if (frequencyBandUpperCutoffs.length != frequencyBandGains.length)
                throw new WebAudioValueError('Frequency cutoff array and frequency gain array must have the same size');
            for (const cutoff of frequencyBandUpperCutoffs) {
                if (cutoff < Equalization.minCutoff)
                    throw new WebAudioValueError(`Frequency upper cutoff value cannot be less than ${Equalization.minCutoff}`);
                else if (cutoff > Equalization.maxCutoff)
                    throw new WebAudioValueError(`Frequency upper cutoff value cannot be greater than ${Equalization.maxCutoff}`);
            }
            for (const gain of frequencyBandGains) {
                if (gain < Equalization.minGain)
                    throw new WebAudioValueError(`Gain value cannot be less than ${Equalization.minGain}`);
                else if (gain > Equalization.maxGain)
                    throw new WebAudioValueError(`Gain value cannot be greater than ${Equalization.maxGain}`);
            }
            for (let i = 1; i < frequencyBandUpperCutoffs.length; ++i) {
                if (frequencyBandUpperCutoffs[i] <= frequencyBandUpperCutoffs[i - 1])
                    throw new WebAudioValueError('Frequency band upper cutoffs must be monotonically increasing within the array');
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;

            // Ensure the correct number of equalization bands are present
            if (frequencyBandUpperCutoffs.length < this.#equalizerNodes.length) {
                this.#equalizerNodes[0].connect(this.#equalizerNodes[this.#equalizerNodes.length - frequencyBandUpperCutoffs.length + 1]);
                for (const removedNode of this.#equalizerNodes.splice(1, this.#equalizerNodes.length - frequencyBandUpperCutoffs.length))
                    removedNode.disconnect();
            }
            else if (frequencyBandUpperCutoffs.length > this.#equalizerNodes.length) {
                const lastNode = this.#equalizerNodes.splice(-1, 1)[0];
                this.#equalizerNodes[this.#equalizerNodes.length - 1].disconnect();
                while ((this.#equalizerNodes.length + 1) < frequencyBandUpperCutoffs.length) {
                    const newNode = new BiquadFilterNode(this.audioContext, { type: 'peaking' });
                    this.#equalizerNodes[this.#equalizerNodes.length - 1].connect(newNode);
                    this.#equalizerNodes.push(newNode);
                }
                this.#equalizerNodes[this.#equalizerNodes.length - 1].connect(lastNode);
                this.#equalizerNodes.push(lastNode);
            }

            // Update the parameters for each equalization band
            this.#equalizerNodes[0].frequency.setTargetAtTime(frequencyBandUpperCutoffs[0], timeToUpdate, timeConstantTarget);
            this.#equalizerNodes[0].gain.setTargetAtTime(frequencyBandGains[0], timeToUpdate, timeConstantTarget);
            this.#equalizerNodes[this.#equalizerNodes.length - 1].frequency.setTargetAtTime(frequencyBandUpperCutoffs[frequencyBandUpperCutoffs.length - 2], timeToUpdate, timeConstantTarget);
            this.#equalizerNodes[this.#equalizerNodes.length - 1].gain.setTargetAtTime(frequencyBandGains[frequencyBandGains.length - 1], timeToUpdate, timeConstantTarget);
            for (let i = 1; i < this.#equalizerNodes.length - 1; ++i) {
                const centerFrequency = 0.5 * (frequencyBandUpperCutoffs[i] + frequencyBandUpperCutoffs[i - 1]);
                this.#equalizerNodes[i].frequency.setTargetAtTime(centerFrequency, timeToUpdate, timeConstantTarget);
                this.#equalizerNodes[i].Q.setTargetAtTime(centerFrequency / (frequencyBandUpperCutoffs[i] - frequencyBandUpperCutoffs[i - 1]), timeToUpdate, timeConstantTarget);
                this.#equalizerNodes[i].gain.setTargetAtTime(frequencyBandGains[i], timeToUpdate, timeConstantTarget);
            }
            return true;
        }

        getInputNode() {
            return this.#equalizerNodes[0];
        }

        getOutputNode() {
            return this.#equalizerNodes[this.#equalizerNodes.length - 1];
        }
    }

    /**
     * Class representing a Flanger effect.
     * 
     * A Flanger effect generates a delayed, modulated version of an original audio signal which gets
     * played slightly out-of-phase and slower than the original.
     * 
     * @extends EffectBase
     */
    class Flanger extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #inputNode;
        /** @type {GainNode} */
        #outputNode;
        /** @type {DelayNode} */
        #delayNode;
        /** @type {OscillatorNode} */
        #lfoNode;
        /** @type {GainNode} */
        #lfoGainNode;
        /** @type {GainNode} */
        #feedbackNode;

        // Parameter limits
        static minRate = 0;
        static maxRate = 10;
        static minDelay = 0.0001;
        static maxDelay = 0.01;
        static minFeedback = 0;
        static maxFeedback = 0.95;
        static minIntensity = 0;
        static maxIntensity = 1;

        /**
         * Constructs a new {@link Flanger} effect object.
         */
        constructor(audioContext) {
            super(audioContext);

            this.#inputNode = new GainNode(audioContext);
            this.#outputNode = new GainNode(audioContext);
            this.#delayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
            this.#lfoNode = new OscillatorNode(audioContext);
            this.#lfoGainNode = new GainNode(audioContext);
            this.#feedbackNode = new GainNode(audioContext);

            this.#lfoNode.connect(this.#lfoGainNode).connect(this.#delayNode.delayTime);
            this.#inputNode.connect(this.#outputNode);
            this.#inputNode.connect(this.#delayNode).connect(this.#feedbackNode).connect(this.#delayNode).connect(this.#outputNode);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'rate', type: 'number', validValues: [Flanger.minRate, Flanger.maxRate], defaultValue: 0.8 },
                { name: 'shape', type: 'string', validValues: ['sine', 'square', 'sawtooth', 'triangle'], defaultValue: 'sine' },
                { name: 'delay', type: 'number', validValues: [Flanger.minDelay, Flanger.maxDelay], defaultValue: 0.0075 },
                { name: 'feedback', type: 'number', validValues: [Flanger.minFeedback, Flanger.maxFeedback], defaultValue: 0 },
                { name: 'intensity', type: 'number', validValues: [Flanger.minIntensity, Flanger.maxIntensity], defaultValue: 0 }
            ];
        }

        async load() {
            this.#inputNode.gain.value = 0.5;
            this.#outputNode.gain.value = 1;
            this.#lfoGainNode.gain.value = 0;
            this.#delayNode.delayTime.value = 0.0075;
            this.#feedbackNode.gain.value = 0;
            this.#lfoNode.frequency.value = 0.8;
            this.#lfoNode.type = 'sine';
            this.#lfoNode.start();
        }

        /**
         * Updates the {@link Flanger} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} rate - Frequency at which an oscillator modulates the delayed flanger signal in Hertz between [0, 10]
         * @param {string} shape - Waveform shape used to modulate the delayed flanger signal from ['sine', 'square', 'sawtooth', 'triangle']
         * @param {number} delay - Number of seconds delay between the original signal and the modulated flanger signal between [0.0001, 0.01]
         * @param {number} feedback - Percentage of processed signal to be fed back into the flanger circuit between [0, 0.95]
         * @param {number} intensity - Ratio of flangered-to-original sound as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ rate, shape, delay, feedback, intensity }, updateTime, timeConstant) {
            if ((rate == null) && (shape == null) && (delay == null) && (feedback == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Flanger effect without at least one of the following parameters: "rate, shape, delay, feedback, intensity"');
            if (rate != null) {
                if (rate < Flanger.minRate)
                    throw new WebAudioValueError(`Rate value cannot be less than ${Flanger.minRate}`);
                else if (rate > Flanger.maxRate)
                    throw new WebAudioValueError(`Rate value cannot be greater than ${Flanger.maxRate}`);
            }
            if (shape != null) {
                if (!['sine', 'square', 'sawtooth', 'triangle'].includes(shape))
                    throw new WebAudioValueError('Shape value must be one of: ["sine", "square", "sawtooth", "triangle"]');
            }
            if (delay != null) {
                if (delay < Flanger.minDelay)
                    throw new WebAudioValueError(`Delay value cannot be less than ${Flanger.minDelay}`);
                else if (delay > Flanger.maxDelay)
                    throw new WebAudioValueError(`Delay value cannot be greater than ${Flanger.maxDelay}`);
            }
            if (feedback != null) {
                if (feedback < Flanger.minFeedback)
                    throw new WebAudioValueError(`Feedback value cannot be less than ${Flanger.minFeedback}`);
                else if (feedback > Flanger.maxFeedback)
                    throw new WebAudioValueError(`Feedback value cannot be greater than ${Flanger.maxFeedback}`);
            }
            if (intensity != null) {
                if (intensity < Flanger.minIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Flanger.minIntensity}`);
                else if (intensity > Flanger.maxIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Flanger.maxIntensity}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (rate != null)
                this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
            if (shape != null)
                this.#lfoNode.type = shape;
            if (delay != null)
                this.#delayNode.delayTime.setTargetAtTime(delay, timeToUpdate, timeConstantTarget);
            if (feedback != null)
                this.#feedbackNode.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
            if (intensity != null)
                this.#lfoGainNode.gain.setTargetAtTime(this.#delayNode.delayTime.value * intensity, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#inputNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing a High-Pass Filter effect.
     * 
     * A High-Pass Filter is defined by a cutoff frequency above which audio signals are allowed to
     * pass and below which audio signals are reduced or eliminated completely.
     * 
     * @extends EffectBase
     */
    class HighPassFilter extends EffectBase {

        // Effect-specific private variables
        /** @type {BiquadFilterNode} */
        #filterNode;

        // Parameter limits
        static minFrequency = 0;
        static maxFrequency = 22050;
        static minResonance = 0.0001;
        static maxResonance = 1000;

        /**
         * Constructs a new {@link HighPassFilter} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#filterNode = new BiquadFilterNode(audioContext, { type: 'highpass' });
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'cutoffFrequency', type: 'number', validValues: [HighPassFilter.minFrequency, HighPassFilter.maxFrequency], defaultValue: HighPassFilter.minFrequency },
                { name: 'resonance', type: 'number', validValues: [HighPassFilter.minResonance, HighPassFilter.maxResonance], defaultValue: HighPassFilter.minResonance }
            ];
        }

        async load() {
            this.#filterNode.frequency.value = HighPassFilter.minFrequency;
            this.#filterNode.Q.value = HighPassFilter.minResonance;
        }

        /**
         * Updates the {@link HighPassFilter} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} cutoffFrequency - Frequency below which audio content will be reduced between [0, 22050]
         * @param {number} resonance - Amount of frequency exaggeration around the cutoff as a value between [0.0001, 1000.0]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ cutoffFrequency, resonance }, updateTime, timeConstant) {
            if ((cutoffFrequency == null) && (resonance == null))
                throw new WebAudioValueError('Cannot update the HighPassFilter effect without at least one of the following parameters: "cutoffFrequency, resonance"');
            if (cutoffFrequency != null) {
                if (cutoffFrequency < HighPassFilter.minFrequency)
                    throw new WebAudioValueError(`Cutoff frequency cannot be less than ${HighPassFilter.minFrequency}`);
                else if (cutoffFrequency > HighPassFilter.maxFrequency)
                    throw new WebAudioValueError(`Cutoff frequency cannot be greater than ${HighPassFilter.maxFrequency}`);
            }
            if (resonance != null) {
                if (resonance < HighPassFilter.minResonance)
                    throw new WebAudioValueError(`Resonance exaggeration cannot be less than ${HighPassFilter.minResonance}`);
                else if (resonance > HighPassFilter.maxResonance)
                    throw new WebAudioValueError(`Resonance exaggeration cannot be greater than ${HighPassFilter.maxResonance}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (cutoffFrequency != null)
                this.#filterNode.frequency.setTargetAtTime(cutoffFrequency, timeToUpdate, timeConstantTarget);
            if (resonance != null)
                this.#filterNode.Q.setTargetAtTime(resonance, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#filterNode;
        }

        getOutputNode() {
            return this.#filterNode;
        }
    }

    /**
     * Class representing a Low-Pass Filter effect.
     * 
     * A Low-Pass Filter is defined by a cutoff frequency below which audio signals are allowed to
     * pass and above which audio signals are reduced or eliminated completely.
     * 
     * @extends EffectBase
     */
    class LowPassFilter extends EffectBase {

        // Effect-specific private variables
        /** @type {BiquadFilterNode} */
        #filterNode;

        // Parameter limits
        static minFrequency = 0;
        static maxFrequency = 22050;
        static minResonance = 0.0001;
        static maxResonance = 1000;

        /**
         * Constructs a new {@link LowPassFilter} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#filterNode = new BiquadFilterNode(audioContext, { type: 'lowpass' });
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'cutoffFrequency', type: 'number', validValues: [LowPassFilter.minFrequency, LowPassFilter.maxFrequency], defaultValue: LowPassFilter.maxFrequency },
                { name: 'resonance', type: 'number', validValues: [LowPassFilter.minResonance, LowPassFilter.maxResonance], defaultValue: LowPassFilter.minResonance }
            ];
        }

        async load() {
            this.#filterNode.frequency.value = LowPassFilter.maxFrequency;
            this.#filterNode.Q.value = LowPassFilter.minResonance;
        }

        /**
         * Updates the {@link LowPassFilter} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} cutoffFrequency - Frequency above which audio content will be reduced between [0, 22050]
         * @param {number} resonance - Amount of frequency exaggeration around the cutoff as a value between [0.0001, 1000.0]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ cutoffFrequency, resonance }, updateTime, timeConstant) {
            if ((cutoffFrequency == null) && (resonance == null))
                throw new WebAudioValueError('Cannot update the LowPassFilter effect without at least one of the following parameters: "cutoffFrequency, resonance"');
            if (cutoffFrequency != null) {
                if (cutoffFrequency < LowPassFilter.minFrequency)
                    throw new WebAudioValueError(`Cutoff frequency cannot be less than ${LowPassFilter.minFrequency}`);
                else if (cutoffFrequency > LowPassFilter.maxFrequency)
                    throw new WebAudioValueError(`Cutoff frequency cannot be greater than ${LowPassFilter.maxFrequency}`);
            }
            if (resonance != null) {
                if (resonance < LowPassFilter.minResonance)
                    throw new WebAudioValueError(`Resonance exaggeration cannot be less than ${LowPassFilter.minResonance}`);
                else if (resonance > LowPassFilter.maxResonance)
                    throw new WebAudioValueError(`Resonance exaggeration cannot be greater than ${LowPassFilter.maxResonance}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (cutoffFrequency != null)
                this.#filterNode.frequency.setTargetAtTime(cutoffFrequency, timeToUpdate, timeConstantTarget);
            if (resonance != null)
                this.#filterNode.Q.setTargetAtTime(resonance, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#filterNode;
        }

        getOutputNode() {
            return this.#filterNode;
        }
    }

    /**
     * Class representing a Panning effect.
     * 
     * A Panning effect distributes an audio signal across a stereo field by making it appear to
     * originate from different places in the left-right audio spectrum, thereby creating more space
     * and width.
     * 
     * @extends EffectBase
     */
    class Panning extends EffectBase {

        // Effect-specific private variables
        /** @type {StereoPannerNode} */
        #panningNode;

        // Parameter limits
        static panningLeft = 0;
        static panningRight = 1;

        /**
         * Constructs a new {@link Panning} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#panningNode = new StereoPannerNode(audioContext);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'leftToRightRatio', type: 'number', validValues: [Panning.panningLeft, Panning.panningRight], defaultValue: 0.5 * (Panning.panningRight - Panning.panningLeft) }
            ];
        }

        async load() {
            this.#panningNode.pan.value = 0.0;
        }

        /* eslint no-empty-pattern: "off" */
        /**
         * Updates the {@link Panning} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} leftToRightRatio - Ratio of sound output from the left speaker to the right speaker as a percentage between [0.0, 1.0]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ leftToRightRatio }, updateTime, timeConstant) {
            if (leftToRightRatio == null)
                throw new WebAudioValueError('Cannot update the Panning effect without at least one of the following parameters: "leftToRightRatio"');
            if (leftToRightRatio < Panning.panningLeft)
                throw new WebAudioValueError(`Left-to-right-ratio value cannot be less than ${Panning.panningLeft}`);
            else if (leftToRightRatio > Panning.panningRight)
                throw new WebAudioValueError(`Left-to-right-ratio value cannot be greater than ${Panning.panningRight}`);
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            this.#panningNode.pan.setTargetAtTime(2.0 * (leftToRightRatio - 0.5), timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#panningNode;
        }

        getOutputNode() {
            return this.#panningNode;
        }
    }

    /**
     * Class representing a Phaser effect.
     * 
     * A Phaser effect manipulates an audio signal by generating high-pass filters in the form of
     * peaks in the frequency spectrum which are used to create cuts in the high-frequency ranges
     * of the original audio signal and modulate them up and down throughout the audio. This effect
     * is frequently used in funk music, and it adds character to individual notes to create a form
     * of swirling movement in the audio.
     * 
     * @extends EffectBase
     */
    class Phaser extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #inputNode;
        /** @type {GainNode} */
        #outputNode;
        /** @type {BiquadFilterNode[]} */
        #filterNodes = [];
        /** @type {OscillatorNode} */
        #lfoNode;
        /** @type {GainNode} */
        #lfoGainNode;
        /** @type {GainNode} */
        #feedbackNode;


        // Parameter limits
        static numPoles = 9;
        static minRate = 0;
        static maxRate = 10;
        static minFrequency = 1;
        static maxFrequency = 22050;
        static minFeedback = 0;
        static maxFeedback = 0.95;
        static minIntensity = 0;
        static maxIntensity = 1;

        /**
         * Constructs a new {@link Phaser} effect object.
         */
        constructor(audioContext) {
            super(audioContext);

            this.#inputNode = new GainNode(audioContext);
            this.#outputNode = new GainNode(audioContext);
            for (let i = 0; i < Phaser.numPoles; ++i)
                this.#filterNodes.push(new BiquadFilterNode(audioContext, { type: 'allpass', Q: 0.1 }));
            this.#lfoNode = new OscillatorNode(audioContext);
            this.#lfoGainNode = new GainNode(audioContext);
            this.#feedbackNode = new GainNode(audioContext);

            this.#outputNode.connect(this.#feedbackNode).connect(this.#inputNode);
            for (let i = 0; i < Phaser.numPoles; ++i) {
                this.#lfoNode.connect(this.#lfoGainNode).connect(this.#filterNodes[i].detune);
                this.#inputNode.connect(this.#filterNodes[i]).connect(this.#outputNode);
            }
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'rate', type: 'number', validValues: [Phaser.minRate, Phaser.maxRate], defaultValue: 8 },
                { name: 'shape', type: 'string', validValues: ['sine', 'square', 'sawtooth', 'triangle'], defaultValue: 'sine' },
                { name: 'frequency', type: 'number', validValues: [Phaser.minFrequency, Phaser.maxFrequency], defaultValue: 1500 },
                { name: 'feedback', type: 'number', validValues: [Phaser.minFeedback, Phaser.maxFeedback], defaultValue: 0 },
                { name: 'intensity', type: 'number', validValues: [Phaser.minIntensity, Phaser.maxIntensity], defaultValue: 0 }
            ];
        }

        async load() {
            this.#inputNode.gain.value = 0.5;
            this.#outputNode.gain.value = 0.2;
            this.#lfoGainNode.gain.value = 0;
            for (let i = 0; i < Phaser.numPoles; ++i)
                this.#filterNodes[i].frequency.value = 1500 + ((22050 - 1500) / (1 + Phaser.numPoles)) * i;
            this.#feedbackNode.gain.value = 0;
            this.#lfoNode.frequency.value = 8;
            this.#lfoNode.type = 'sine';
            this.#lfoNode.start();
        }

        /**
         * Updates the {@link Phaser} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} rate - Frequency at which an oscillator modulates the phaser signal in Hertz between [0, 10]
         * @param {string} shape - Waveform shape used to modulate the phaser signal from ['sine', 'square', 'sawtooth', 'triangle']
         * @param {number} frequency - Starting frequency of the all-pass filter between [1, 22050]
         * @param {number} feedback - Percentage of processed signal to be fed back into the phaser circuit between [0, 0.95]
         * @param {number} intensity - Ratio of processed-to-original sound as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ rate, shape, frequency, feedback, intensity }, updateTime, timeConstant) {
            if ((rate == null) && (shape == null) && (frequency == null) && (feedback == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Phaser effect without at least one of the following parameters: "rate, shape, frequency, feedback, intensity"');
            if (rate != null) {
                if (rate < Phaser.minRate)
                    throw new WebAudioValueError(`Rate value cannot be less than ${Phaser.minRate}`);
                else if (rate > Phaser.maxRate)
                    throw new WebAudioValueError(`Rate value cannot be greater than ${Phaser.maxRate}`);
            }
            if (shape != null) {
                if (!['sine', 'square', 'sawtooth', 'triangle'].includes(shape))
                    throw new WebAudioValueError('Shape value must be one of: ["sine", "square", "sawtooth", "triangle"]');
            }
            if (frequency != null) {
                if (frequency < Phaser.minFrequency)
                    throw new WebAudioValueError(`Frequency value cannot be less than ${Phaser.minFrequency}`);
                else if (frequency > Phaser.maxFrequency)
                    throw new WebAudioValueError(`Frequency value cannot be greater than ${Phaser.maxFrequency}`);
            }
            if (feedback != null) {
                if (feedback < Phaser.minFeedback)
                    throw new WebAudioValueError(`Feedback value cannot be less than ${Phaser.minFeedback}`);
                else if (feedback > Phaser.maxFeedback)
                    throw new WebAudioValueError(`Feedback value cannot be greater than ${Phaser.maxFeedback}`);
            }
            if (intensity != null) {
                if (intensity < Phaser.minIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Phaser.minIntensity}`);
                else if (intensity > Phaser.maxIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Phaser.maxIntensity}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (rate != null)
                this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
            if (shape != null)
                this.#lfoNode.type = shape;
            if (frequency != null)
                for (let i = 0; i < Phaser.numPoles; ++i)
                    this.#filterNodes[i].frequency.setTargetAtTime(frequency + ((22050 - frequency) / (1 + Phaser.numPoles)) * i, timeToUpdate, timeConstantTarget);
            if (feedback != null)
                this.#feedbackNode.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
            if (intensity != null)
                this.#lfoGainNode.gain.setTargetAtTime(1000 * intensity, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#inputNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing a Reverb effect.
     * 
     * A Reverb effect represents a complex echo resulting from the absorption of sound by various
     * surfaces in an environment, as well as from multiple echoes reflecting from hard surfaces
     * many times and with differing amplitudes. This effect is useful for creating a sense of
     * spaciousness and can help to unify multiple elements within a musical piece.
     * 
     * @extends EffectBase
     */
    class Reverb extends EffectBase {

        // Effect-specific private variables
        /** @type {ConvolverNode} */
        #convolutionNode;
        /** @type {GainNode} */
        #inputNode; #outputNode;
        /** @type {GainNode} */
        #dryGainNode; #wetGainNode;
        /** @type {number} */
        #relativeRoomSize; #decay;

        // Parameter limits
        static minDecay = 0;
        static maxDecay = 1;
        static minIntensity = 0;
        static maxIntensity = 1;
        static minRoomSize = 0.1;
        static maxRoomSize = 1;

        /**
         * Constructs a new {@link Reverb} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#convolutionNode = new ConvolverNode(audioContext);
            this.#dryGainNode = new GainNode(audioContext);
            this.#wetGainNode = new GainNode(audioContext);
            this.#inputNode = new GainNode(audioContext, { gain: 1 });
            this.#outputNode = new GainNode(audioContext, { gain: 1 });
            this.#inputNode.connect(this.#dryGainNode).connect(this.#outputNode);
            this.#inputNode.connect(this.#convolutionNode).connect(this.#wetGainNode).connect(this.#outputNode);
        }

        // Private function to generate an impulse response on-the-fly
        impulseResponse(duration, decay) {
            const sampleRate = this.audioContext.sampleRate;
            const length = sampleRate * 10 * duration;
            const impulse = this.audioContext.createBuffer(2, length, sampleRate);
            const impulseL = impulse.getChannelData(0), impulseR = impulse.getChannelData(1);
            for (let i = 0; i < length; ++i) {
                impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 10 * decay);
                impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 10 * decay);
            }
            return impulse;
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'decay', type: 'number', validValues: [Reverb.minDecay, Reverb.maxDecay], defaultValue: 0.3 },
                { name: 'roomSize', type: 'number', validValues: [Reverb.minRoomSize, Reverb.maxRoomSize], defaultValue: 0.1 },
                { name: 'intensity', type: 'number', validValues: [Reverb.minIntensity, Reverb.maxIntensity], defaultValue: 0 }
            ];
        }

        async load() {
            this.#decay = 0.3;
            this.#relativeRoomSize = 0.1;
            this.#dryGainNode.gain.value = 1;
            this.#wetGainNode.gain.value = 0;
            this.#convolutionNode.buffer = this.impulseResponse(this.#relativeRoomSize, this.#decay);
        }

        /**
         * Updates the {@link Reverb} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} decay - Number of seconds before reflections start to decay
         * @param {number} roomSize - Number of seconds before the first reflection occurs
         * @param {number} intensity - Ratio of reverbed-to-original sound as a percentage between [0.0, 1.0]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ decay, roomSize, intensity }, updateTime, timeConstant) {
            if ((decay == null) && (roomSize == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Reverb effect without at least one of the following parameters: "decay, roomSize, intensity"');
            if (decay != null) {
                if (decay < Reverb.minDecay)
                    throw new WebAudioValueError(`Rate value cannot be less than ${Reverb.minDecay}`);
                else if (decay > Reverb.maxDecay)
                    throw new WebAudioValueError(`Rate value cannot be greater than ${Reverb.maxDecay}`);
            }
            if (roomSize != null) {
                if (roomSize < Reverb.minRoomSize)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Reverb.minRoomSize}`);
                else if (roomSize > Reverb.maxRoomSize)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Reverb.maxRoomSize}`);
            }
            if (intensity != null) {
                if (intensity < Reverb.minIntensity)
                    throw new WebAudioValueError(`Rate value cannot be less than ${Reverb.minIntensity}`);
                else if (intensity > Reverb.maxIntensity)
                    throw new WebAudioValueError(`Rate value cannot be greater than ${Reverb.maxIntensity}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (decay != null)
                this.#decay = decay;
            if (roomSize != null)
                this.#relativeRoomSize = Math.max(roomSize, 0.01);
            if (intensity != null) {
                this.#wetGainNode.gain.setTargetAtTime(2.5 * intensity, timeToUpdate, timeConstantTarget);
                this.#dryGainNode.gain.setTargetAtTime(1 - intensity, timeToUpdate, timeConstantTarget);
            }
            this.#convolutionNode.buffer = this.impulseResponse(this.#relativeRoomSize, this.#decay);
            return true;
        }

        getInputNode() {
            return this.#inputNode;
        }

        getOutputNode() {
            return this.#outputNode;
        }
    }

    /**
     * Class representing a Tremolo effect.
     * 
     * A Tremolo effect modulates an audio signal to produce a wavering effect based on rapidly
     * varying the amplitude of the signal. Acoustically, it is created by rapidly reiterating
     * the same note over and over. Perceptually, it is similar to vibrato; however, vibrato is
     * achieved by altering pitch, whereas tremolo is achieved by altering volume.
     * 
     * @extends EffectBase
     */
    class Tremolo extends EffectBase {

        // Effect-specific private variables
        /** @type {OscillatorNode} */
        #lfoNode;
        /** @type {GainNode} */
        #normalizationNode;
        /** @type {GainNode} */
        #depthNode;

        // Parameter limits
        static minRate = 0;
        static maxRate = 20;
        static minIntensity = 0;
        static maxIntensity = 1;

        /**
         * Constructs a new {@link Tremolo} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#normalizationNode = new GainNode(audioContext);
            this.#depthNode = new GainNode(audioContext);
            this.#lfoNode = new OscillatorNode(audioContext);
            this.#lfoNode.connect(this.#depthNode).connect(this.#normalizationNode.gain);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'rate', type: 'number', validValues: [Tremolo.minRate, Tremolo.maxRate], defaultValue: 10 },
                { name: 'intensity', type: 'number', validValues: [Tremolo.minIntensity, Tremolo.maxIntensity], defaultValue: 0 }
            ];
        }

        async load() {
            this.#lfoNode.type = 'sine';
            this.#lfoNode.frequency.value = 10;
            this.#normalizationNode.gain.value = 1;
            this.#depthNode.gain.value = 0;
            this.#lfoNode.start();
        }

        /**
         * Updates the {@link Tremolo} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} rate - Frequency at which an oscillator modulates the tremolo signal in Hz between [0, 40]
         * @param {number} intensity - Intensity of the effect as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ rate, intensity }, updateTime, timeConstant) {
            if ((rate == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Tremolo effect without at least one of the following parameters: "rate, intensity"');
            if (rate != null) {
                if (rate < Tremolo.minRate)
                    throw new WebAudioValueError(`Rate value cannot be less than ${Tremolo.minRate}`);
                else if (rate > Tremolo.maxRate)
                    throw new WebAudioValueError(`Rate value cannot be greater than ${Tremolo.maxRate}`);
            }
            if (intensity != null) {
                if (intensity < Tremolo.minIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Tremolo.minIntensity}`);
                else if (intensity > Tremolo.maxIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Tremolo.maxIntensity}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (rate != null)
                this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
            if (intensity != null) {
                this.#depthNode.gain.setTargetAtTime(0.5 * intensity, timeToUpdate, timeConstantTarget);
                this.#normalizationNode.gain.setTargetAtTime(1.0 - (0.5 * intensity), timeToUpdate, timeConstantTarget);
            }
            return true;
        }

        getInputNode() {
            return this.#normalizationNode;
        }

        getOutputNode() {
            return this.#normalizationNode;
        }
    }

    /**
     * Class representing a Vibrato effect.
     * 
     * A Vibrato effect modulates an audio signal to produce a wavering effect based on rapidly
     * varying the pitch of the signal. Perceptually, it is similar to tremolo; however, tremolo is
     * achieved by altering volume, whereas vibrato is achieved by altering pitch.
     * 
     * @extends EffectBase
     */
    class Vibrato extends EffectBase {

        // Effect-specific private variables
        /** @type {OscillatorNode} */
        #lfoNode;
        /** @type {DelayNode} */
        #delayNode;
        /** @type {GainNode} */
        #gainNode;

        // Parameter limits
        static minRate = 0;
        static maxRate = 10;
        static minIntensity = 0;
        static maxIntensity = 1;

        /**
         * Constructs a new {@link Vibrato} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#lfoNode = new OscillatorNode(audioContext);
            this.#delayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
            this.#gainNode = new GainNode(audioContext);
            this.#lfoNode.connect(this.#gainNode).connect(this.#delayNode.delayTime);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'rate', type: 'number', validValues: [Vibrato.minRate, Vibrato.maxRate], defaultValue: 8 },
                { name: 'intensity', type: 'number', validValues: [Vibrato.minIntensity, Vibrato.maxIntensity], defaultValue: 0 }
            ];
        }

        async load() {
            this.#gainNode.gain.value = 0;
            this.#delayNode.delayTime.value = 0.01;
            this.#lfoNode.frequency.value = 8;
            this.#lfoNode.type = 'sine';
            this.#lfoNode.start();
        }

        /**
         * Updates the {@link Vibrato} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} rate - Frequency at which an oscillator modulates the vibrato signal in Hz between [0, 10]
         * @param {number} intensity - Intensity of the effect as a percentage between [0, 1]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ rate, intensity }, updateTime, timeConstant) {
            if ((rate == null) && (intensity == null))
                throw new WebAudioValueError('Cannot update the Vibrato effect without at least one of the following parameters: "rate, intensity"');
            if (rate != null) {
                if (rate < Vibrato.minRate)
                    throw new WebAudioValueError(`Rate value cannot be less than ${Vibrato.minRate}`);
                else if (rate > Vibrato.maxRate)
                    throw new WebAudioValueError(`Rate value cannot be greater than ${Vibrato.maxRate}`);
            }
            if (intensity != null) {
                if (intensity < Vibrato.minIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be less than ${Vibrato.minIntensity}`);
                else if (intensity > Vibrato.maxIntensity)
                    throw new WebAudioValueError(`Intensity value cannot be greater than ${Vibrato.maxIntensity}`);
            }
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            if (rate != null)
                this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
            if (intensity != null)
                this.#gainNode.gain.setTargetAtTime(0.001 * intensity, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#delayNode;
        }

        getOutputNode() {
            return this.#delayNode;
        }
    }

    /**
     * Class representing a Volume effect.
     * 
     * A Volume effect modulates the overall loudness of an audio signal.
     * 
     * @extends EffectBase
     */
    class Volume extends EffectBase {

        // Effect-specific private variables
        /** @type {GainNode} */
        #volumeNode;

        // Parameter limits
        static minVolume = 0;
        static maxVolume = 1;

        /**
         * Constructs a new {@link Volume} effect object.
         */
        constructor(audioContext) {
            super(audioContext);
            this.#volumeNode = new GainNode(audioContext);
        }

        /**
         * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
         * of the {@link EffectBase#update update()} function for this {@link Effect}.
         * 
         * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
         * @see {@link EffectParameter}
         */
        static getParameters() {
            return [
                { name: 'intensity', type: 'number', validValues: [Volume.minVolume, Volume.maxVolume], defaultValue: Volume.maxVolume }
            ];
        }

        async load() {
            this.#volumeNode.gain.value = Volume.maxVolume;
        }

        /* eslint no-empty-pattern: "off" */
        /**
         * Updates the {@link Volume} effect according to the specified parameters at the
         * specified time.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {number} intensity - Intensity of the volume as a percentage between [0.0, 1.0]
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
         * @returns {Promise<boolean>} Whether the effect update was successfully applied
         */
        async update({ intensity }, updateTime, timeConstant) {
            if (intensity == null)
                throw new WebAudioValueError('Cannot update the Volume effect without at least one of the following parameters: "intensity"');
            if (intensity < Volume.minVolume)
                throw new WebAudioValueError(`Intensity value cannot be less than ${Volume.minVolume}`);
            else if (intensity > Volume.maxVolume)
                throw new WebAudioValueError(`Intensity value cannot be greater than ${Volume.maxVolume}`);
            const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
            const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
            this.#volumeNode.gain.setTargetAtTime(intensity, timeToUpdate, timeConstantTarget);
            return true;
        }

        getInputNode() {
            return this.#volumeNode;
        }

        getOutputNode() {
            return this.#volumeNode;
        }
    }

    /**
     * Module containing functionality to apply and update {@link WebAudioAPI} effects.
     * @module Effect
     */


    const EffectClasses = {
        [EffectType.Reverb]: Reverb, [EffectType.Delay]: Delay, [EffectType.Echo]: Echo, [EffectType.Chorus]: Chorus, [EffectType.Doppler]: Doppler,
        [EffectType.Tremolo]: Tremolo, [EffectType.Vibrato]: Vibrato, [EffectType.Flanger]: Flanger, [EffectType.Phaser]: Phaser,
        [EffectType.Panning]: Panning, [EffectType.Equalization]: Equalization, [EffectType.Volume]: Volume, [EffectType.Compression]: Compression,
        [EffectType.Distortion]: Distortion, [EffectType.LowPassFilter]: LowPassFilter, [EffectType.HighPassFilter]: HighPassFilter,
        [EffectType.BandPassFilter]: BandPassFilter, [EffectType.BandRejectFilter]: BandRejectFilter, [EffectType.PitchShift]: PitchShift
    };


    /**
     * Returns a list of effect-specific {@link EffectParameter EffectParameters} for manipulation
     * in the corresponding {@link module:Constants.EffectType EffectType}.
     * 
     * Note that the `effectType` parameter must be the **numeric value** associated with a certain
     * {@link module:Constants.EffectType EffectType}, not a string-based key.
     * 
     * @param {number} effectType - {@link module:Constants.EffectType EffectType} for which to return a parameter list
     * @returns {EffectParameter[]} List of effect-specific parameters available for updating
     * @see {@link module:Constants.EffectType EffectType}
     * @see {@link EffectParameter}
     */
    function getEffectParameters(effectType) {
        return EffectClasses[effectType].getParameters();
    }


    /**
     * Loads a pre-defined {@link Effect} capable of being applied to an individual {@link Track} or
     * to the aggregate output of all tracks.
     * 
     * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
     * @param {string} effectName - User-defined name to assign to the newly loaded effect
     * @param {number} effectType - Numeric value corresponding to the desired {@link module:Constants.EffectType EffectType}
     * @returns {Promise<Effect>} Newly created audio {@link Effect}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
     * @see {@link module:Constants.EffectType EffectType}
     * @see {@link Effect}
     * @async
     */
    async function loadEffect(audioContext, effectName, effectType) {

        // Load the requested concrete effect type
        const effect = new EffectClasses[effectType](audioContext);
        await effect.load();

        // Returns an object containing functions and attributes within the public Effect namespace
        return {
            /**
             * User-defined name of the {@link Effect}.
             * @memberof Effect
             * @instance
             */
            name: effectName,

            /**
             * Numeric value corresponding to the {@link module:Constants.EffectType EffectType} of the {@link Effect}.
             * @memberof Effect
             * @instance
             */
            type: effectType,

            /**
             * Reference to an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
             * to which all source {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNodes}
             * should be connected.
             * @memberof Effect
             * @instance
             */
            input: effect.getInputNode(),

            /**
             * Reference to an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
             * from which all effect-modified output audio is produced, and which should be connected to all
             * destination {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNodes}.
             * @memberof Effect
             * @instance
             */
            output: effect.getOutputNode(),

            /**
             * List of effect-specific {@link EffectParameter EffectParameters} for manipulation in the
             * `effectOptions` parameter of the {@link Effect#update update()} function.
             * @memberof Effect
             * @instance
             */
            parameters: EffectClasses[effectType].getParameters(),

            /**
             * Updates the parameters of the effect at the specified time.
             * 
             * Note that the `updateTime` parameter can be omitted to immediately cause the requested
             * changes to take effect.
             * 
             * @function
             * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
             * @param {number} [updateTime] - Global API time at which to update the effect
             * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
             * @returns {Promise<boolean>} Whether the effect update was successfully applied
             * @memberof Effect
             * @instance
             * @async
             */
            update: effect.update.bind(effect)
        };
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
        let instrument = null, midiDevice = null, audioDeviceInput = null;
        const audioSources = [], asyncAudioSources = [], effects = [];
        const audioSink = new AnalyserNode(audioContext, { fftSize: 1024, maxDecibels: -10.0, smoothingTimeConstant: 0.5 });
        const analysisBuffer = new Uint8Array(audioSink.frequencyBinCount);
        audioSink.connect(trackAudioSink);

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
         * Returns a buffer containing the realtime frequency content of the audio being produced by
         * the current track.
         * 
         * @param {number} analysisType - Audio {@link module:Constants.AnalysisType AnalysisType} for which the buffer will be used
         * @returns {Uint8Array} Array containing time or frequency content of the track's current audio output
         * @memberof Track
         * @instance
         */
        function getAnalysisBuffer(analysisType) {
            if (analysisType == AnalysisType.TimeSeries)
                audioSink.getByteTimeDomainData(analysisBuffer);
            else
                audioSink.getByteFrequencyData(analysisBuffer);
            return analysisBuffer;
        }

        /**
         * Applies a new track effect at the specified time.
         * 
         * Calling this function affects the sequential ordering in which effects will be
         * processed, with each new call appending the corresponding effect to the *end* of the
         * processing sequence.
         * 
         * If an effect with the specified `effectName` has already been applied , then calling
         * this function will simply re-order the effect to move it to the very end of the effect
         * processing sequence, without changing its parameter values.
         * 
         * @param {string} effectName - User-defined name to associate with the track effect
         * @param {number} effectType - Track {@link module:Constants.EffectType EffectType} to apply
         * @see {@link module:Constants.EffectType EffectType}
         * @memberof Track
         * @instance
         */
        async function applyEffect(effectName, effectType) {
            const existingEffect = await this.removeEffect(effectName);
            const newEffect = existingEffect || await loadEffect(audioContext, effectName, effectType);
            newEffect.output.connect(trackAudioSink);
            if (effects.length) {
                const previousEffect = effects.slice(-1)[0];
                previousEffect.output.disconnect();
                previousEffect.output.connect(newEffect.input);
            }
            else {
                audioSink.disconnect();
                audioSink.connect(newEffect.input);
            }
            effects.push(newEffect);
        }

        /**
         * Updates the parameters of a track effect at the specified time.
         * 
         * Calling this function will **not** affect the sequential processing order of any applied
         * effects.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {string} effectName - Name of the track effect to be updated
         * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
         * @param {number} updateTime - Global API time at which to update the effect
         * @param {number} timeConstant - Time constant defining an exponential approach to the target
         * @memberof Track
         * @instance
         */
        async function updateEffect(effectName, effectOptions, updateTime, timeConstant) {
            for (const effect of effects)
                if (effect.name == effectName) {
                    await effect.update(effectOptions, updateTime, timeConstant);
                    return;
                }
            throw new WebAudioTargetError(`The target track effect (${effectName}) does not exist`);
        }

        /**
         * Removes the specified track effect from being applied.
         * 
         * @param {string} effectName - Name of the track effect to be removed
         * @returns {Effect|null} Existing effect or null
         * @memberof Track
         * @instance
         */
        async function removeEffect(effectName) {
            let existingEffect = null;
            for (const [index, effect] of effects.entries())
                if (effect.name == effectName) {
                    existingEffect = effects.splice(index, 1)[0];
                    if (index == 0) {
                        audioSink.disconnect();
                        audioSink.connect(effects.length ? effects[0].input : trackAudioSink);
                    }
                    else {
                        effects[index - 1].output.disconnect();
                        effects[index - 1].output.connect((effects.length > index) ? effects[index].input : trackAudioSink);
                    }
                    existingEffect.input.disconnect();
                    existingEffect.output.disconnect();
                    break;
                }
            return existingEffect;
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
            if (!instrument)
                throw new WebAudioTrackError(`The current track (${name}) cannot play a note without first setting up an instrument`);
            const noteSource = instrument.getNote(note); // TODO: Method to getNoteContinuous so it loops
            const noteVolume = new GainNode(audioContext, { gain: velocity });
            noteSource.connect(noteVolume).connect(audioSink);
            const noteStorage = createAsyncNote(note, noteSource, noteVolume);
            noteSource.onended = stopNoteAsync.bind(this, noteStorage); // TODO: Don't need this if continuous instrument
            asyncAudioSources.push(noteStorage);
            noteSource.start(audioContext.currentTime);
            return noteStorage;
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
            if (!instrument)
                throw new WebAudioTrackError(`The current track (${name}) cannot play a note without first setting up an instrument`);
            const durationSeconds = (duration < 0) ? -duration : (60.0 / ((duration / tempo.beatBase) * tempo.beatsPerMinute));
            const noteSource = instrument.getNote(note);
            const noteVolume = new GainNode(audioContext, { gain: velocity });
            noteSource.connect(noteVolume).connect(audioSink);
            noteVolume.gain.setTargetAtTime(0.0, startTime + durationSeconds, 0.03);
            noteSource.onended = sourceEnded.bind(this, noteSource, noteVolume);
            audioSources.push(noteSource);
            noteSource.start(startTime, 0, durationSeconds + 0.200);
            return durationSeconds;
        }

        /**
         * Schedules an audio clip to be played on the current track for some duration of time.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the audio clip will
         * play to completion.
         * 
         * @param {ArrayBuffer|Blob|MidiClip|AudioClip} audioClip - Object containing audio data to play
         * @param {number} startTime - Global API time at which to start playing the clip
         * @param {number} [duration] -  Number of seconds for which to continue playing the clip
         * @returns {Promise<number>} Duration (in seconds) of the clip being played
         * @memberof Track
         * @instance
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
         * @see {@link MidiClip}
         */
        async function playClip(audioClip, startTime, duration) {
            let expectedDuration = null;
            if (audioClip instanceof ArrayBuffer || audioClip instanceof Blob || audioClip.clipType == 'audio') {
                const audioBuffer = await audioContext.decodeAudioData(audioClip instanceof ArrayBuffer ? audioClip : (audioClip instanceof Blob ? await audioClip.arrayBuffer() : await audioClip.getRawData().arrayBuffer()));
                const clipSource = new AudioBufferSourceNode(audioContext, { buffer: audioBuffer });
                audioSources.push(clipSource);
                if (duration) {
                    const clipVolume = new GainNode(audioContext);
                    clipSource.connect(clipVolume).connect(audioSink);
                    clipVolume.gain.setTargetAtTime(0.0, startTime + duration, 0.03);
                    clipSource.onended = sourceEnded.bind(this, clipSource, clipVolume);
                    clipSource.start(startTime, 0, duration + 0.200);
                }
                else {
                    clipSource.connect(audioSink);
                    clipSource.onended = sourceEnded.bind(this, clipSource, null);
                    clipSource.start(startTime);
                }
                expectedDuration = (duration && (duration < audioBuffer.duration)) ? duration : audioBuffer.duration;
            }
            else {
                if (!instrument)
                    throw new WebAudioTrackError(`The current track (${name}) cannot play a MIDI clip without first setting up an instrument`);
                const unmatchedNotes = {};
                for (const [noteTime, midiData] of Object.entries(audioClip.getRawData()))
                    if (!duration || (Number(noteTime) < duration)) {
                        const command = getMidiCommand(midiData), note = getMidiNote(midiData);
                        if ((command === MidiCommand.NoteOn) && (getMidiVelocity(midiData) > 0))
                            unmatchedNotes[note] = [Number(noteTime), getMidiVelocity(midiData)];
                        else if ((command === MidiCommand.NoteOff) && (note in unmatchedNotes)) {
                            const noteDuration = ((!duration || (Number(noteTime) <= duration)) ? Number(noteTime) : duration) - unmatchedNotes[note][0];
                            playNote(note, unmatchedNotes[note][1], startTime + unmatchedNotes[note][0], -noteDuration);
                            delete unmatchedNotes[note];
                        }
                    }
                for (const [note, noteData] of Object.entries(unmatchedNotes)) {
                    const noteDuration = audioClip.getDuration() - noteData[0];
                    playNote(note, noteData[1], startTime + noteData[0], -noteDuration);
                }
                expectedDuration = (duration && (duration < audioClip.getDuration())) ? duration : audioClip.getDuration();
            }
            return expectedDuration;
        }

        /**
         * Schedules a MIDI clip to be recorded on the current track for some duration of time.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the MIDI clip will
         * continue to record until manually stopped by the {@link MidiClip#finalize finalize()}
         * function on the returned {@link MidiClip} object.
         * 
         * Note that the recorded MIDI clip will **not** include any effects that might exist on
         * the track. This is so that recording and then immediately playing back on the same track
         * will not cause any underlying effects to be doubled.
         * 
         * @param {number} startTime - Global API time at which to start recording the MIDI clip
         * @param {number} [duration] - Number of seconds for which to continue recording the MIDI clip
         * @returns {MidiClip} Reference to a {@link MidiClip} object representing the MIDI data to be recorded
         * @memberof Track
         * @instance
         * @see {@link MidiClip}
         */
        function recordMidiClip(startTime, duration) {

            /**
             * Object containing all data needed to record and render a MIDI audio clip.
             * @namespace MidiClip
             * @global
             */

            // MIDI clip-local variable definitions
            let thisMidiDevice = midiDevice, recordedDuration = null, completionCallback = null;
            const midiLog = {};

            // Ensure that a MIDI device is currently connected to this track
            if (!thisMidiDevice)
                throw new WebAudioRecordingError(`The current track (${name}) has no MIDI device associated with it from which to record`);

            // Private MIDI handling functions
            function midiEventToRecord(event) {
                if ((audioContext.currentTime >= startTime) && (!duration || (audioContext.currentTime < startTime + duration)))
                    midiLog[audioContext.currentTime - startTime] = event.data;
            }

            function playNoteOffline(offlineContext, note, velocity, startTime, duration) {
                const noteSource = instrument.getNoteOffline(offlineContext, note);
                const noteVolume = new GainNode(offlineContext, { gain: velocity });
                noteSource.connect(noteVolume).connect(offlineContext.destination);
                noteVolume.gain.setTargetAtTime(0.0, startTime + duration, 0.03);
                noteSource.start(startTime, 0, duration + 0.200);
            }

            /**
             * Returns a dictionary of all MIDI event data within the {@link MidiClip}, stored according
             * to the relative times (in seconds) that they were received.
             * 
             * @returns {Object} Dictionary containing MIDI event data stored according to their relative reception times
             * @memberof MidiClip
             * @instance
             */
            function getRawData() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve raw data from this MIDI clip because recording has not yet completed');
                return midiLog;
            }

            /**
             * Returns the total duration of the MIDI clip in seconds.
             * 
             * @returns {number} Duration of the MIDI clip in seconds
             * @memberof MidiClip
             * @instance
             */
            function getDuration() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve duration of this MIDI clip because recording has not yet completed');
                return recordedDuration;
            }

            /**
             * Stops recording any future MIDI data within the {@link MidiClip}, finalizes the internal
             * storage of all recorded data, and calls the user-completion notification callback, if
             * registered.
             * 
             * Note that this function is called automatically if the original call to
             * {@link Track#recordMidiClip recordMidiClip()} specified a concrete duration for the clip.
             * If no duration was specified, then this function **must** be called in order to stop
             * recording. A {@link MidiClip} is unable to be used or played back until this function
             * has been called.
             * 
             * @memberof MidiClip
             * @instance
             */
            async function finalize() {
                if (!recordedDuration) {
                    if (duration) {
                        while ((startTime + duration) > audioContext.currentTime)
                            await new Promise(r => setTimeout(r, 10));
                        recordedDuration = duration;
                    }
                    else
                        recordedDuration = audioContext.currentTime - startTime;
                    thisMidiDevice.removeEventListener('midimessage', midiEventToRecord);
                    thisMidiDevice = null;
                    if (completionCallback)
                        completionCallback(this);
                    completionCallback = null;
                }
            }

            /**
             * Allows a user to register a callback for notification when all MIDI recording activities
             * have been completed for this {@link MidiClip}. This corresponds to the time when the
             * {@link MidiClip#finalize finalize()} function gets called, either manually or
             * automatically.
             * 
             * A user-defined notification callback will be called with a single parameter which is a
             * reference to this {@link MidiClip}.
             * 
             * @param {RecordCompleteCallback} notificationCallback - Callback to fire when recording of this clip has completed
             * @memberof MidiClip
             * @instance
             */
            function notifyWhenComplete(notificationCallback) {
                if (!recordedDuration)
                    completionCallback = notificationCallback;
                else
                    notificationCallback(this);
            }

            /**
             * Encodes this {@link MidiClip} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
             * specified in the `encodingType` parameter.
             * 
             * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
             * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
             * @memberof MidiClip
             * @instance
             * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * @see {@link module:Constants.EncodingType EncodingType}
             */
            async function getEncodedData(encodingType) {
                if (!Object.values(EncodingType).includes(Number(encodingType)))
                    throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot render this MIDI clip because recording has not yet completed');
                if (!instrument)
                    throw new WebAudioTrackError(`The current track (${name}) cannot render a MIDI clip without first setting up an instrument`);
                const unmatchedNotes = {}, offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
                for (const [startTime, midiData] of Object.entries(midiLog)) {
                    const command = getMidiCommand(midiData), note = getMidiNote(midiData);
                    if ((command === MidiCommand.NoteOn) && (getMidiVelocity(midiData) > 0))
                        unmatchedNotes[note] = [Number(startTime), getMidiVelocity(midiData)];
                    else if ((command === MidiCommand.NoteOff) && (note in unmatchedNotes)) {
                        playNoteOffline(offlineContext, note, unmatchedNotes[note][1], unmatchedNotes[note][0], Number(startTime) - unmatchedNotes[note][0]);
                        delete unmatchedNotes[note];
                    }
                }
                for (const [note, noteData] of Object.entries(unmatchedNotes)) {
                    const noteDuration = recordedDuration - noteData[0];
                    playNoteOffline(offlineContext, note, noteData[1], noteData[0], noteDuration);
                }
                const renderedData = await offlineContext.startRendering();
                return getEncoderFor(Number(encodingType)).encode(renderedData);
            }

            // Begin listening for all incoming MIDI events and optionally set a timer to stop listening
            thisMidiDevice.addEventListener('midimessage', midiEventToRecord);
            if (duration)
                setTimeout(finalize, startTime + duration - audioContext.currentTime);

            // Returns an object containing functions and attributes within the MidiClip namespace
            return { clipType: 'midi', getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
        }

        /**
         * Schedules an audio clip to be recorded on the current track for some duration of time.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the audio clip will
         * continue to record until manually stopped by the {@link AudioClip#finalize finalize()}
         * function on the returned {@link AudioClip} object.
         * 
         * Note that the recorded audio clip will **not** include any effects that might exist on
         * the track. This is so that recording and then immediately playing back on the same track
         * will not cause any underlying effects to be doubled.
         * 
         * @param {number} startTime - Global API time at which to start recording the audio clip
         * @param {number} [duration] - Number of seconds for which to continue recording the audio clip
         * @returns {AudioClip} Reference to an {@link AudioClip} object representing the audio data to be recorded
         * @memberof Track
         * @instance
         * @see {@link AudioClip}
         */
        function recordAudioClip(startTime, duration) {

            /**
             * Object containing all data needed to record and render an audio clip.
             * @namespace AudioClip
             * @global
             */

            // Audio clip-local variable definitions
            let recorderDestination = audioContext.createMediaStreamDestination();
            let recorder = new MediaRecorder(recorderDestination.stream);
            let thisAudioInputDevice = audioDeviceInput, audioData = null;
            let recordedDuration = null, completionCallback = null;

            // Ensure that an audio input device is currently connected to this track
            if (!thisAudioInputDevice)
                throw new WebAudioRecordingError(`The current track (${name}) has no audio input device associated with it from which to record`);

            // Private audio data handling functions
            function startRecording() {
                if (startTime >= (audioContext.currentTime + 0.001))
                    setTimeout(startRecording, 1);
                else
                    recorder.start(duration ? (1000 * duration) : undefined);
            }

            recorder.ondataavailable = (event) => {
                if (!audioData) {
                    audioData = event.data;
                    recordedDuration = duration || (audioContext.currentTime - startTime);
                    finalize();
                }
            };

            recorder.onstop = async () => {
                thisAudioInputDevice.disconnect();
                thisAudioInputDevice = null;
                if (completionCallback)
                    completionCallback(this);
                completionCallback = null;
                recorderDestination = null;
                recorder = null;
            };

            /**
             * Returns a {@link Blob} containing all of the recorded audio data.
             * 
             * @returns {Blob} Buffer containing all recorded audio data
             * @memberof AudioClip
             * @instance
             */
            function getRawData() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve raw data from this audio clip because recording has not yet completed');
                return audioData;
            }

            /**
             * Returns the total duration of the audio clip in seconds.
             * 
             * @returns {number} Duration of the audio clip in seconds
             * @memberof AudioClip
             * @instance
             */
            function getDuration() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve duration of this audio clip because recording has not yet completed');
                return recordedDuration;
            }

            /**
             * Stops recording any future audio data within the {@link AudioClip}, finalizes the internal
             * storage of all recorded data, and calls the user-completion notification callback, if
             * registered.
             * 
             * Note that this function is called automatically if the original call to
             * {@link Track#recordAudioClip recordAudioClip()} specified a concrete duration for the
             * clip. If no duration was specified, then this function **must** be called in order to stop
             * recording. An {@link AudioClip} is unable to be used or played back until this function
             * has been called.
             * 
             * @memberof AudioClip
             * @instance
             */
            async function finalize() {
                if (duration) {
                    while ((startTime + duration) > audioContext.currentTime)
                        await new Promise(r => setTimeout(r, 10));
                }
                if (recorder.state != 'inactive')
                    recorder.stop();
            }

            /**
             * Allows a user to register a callback for notification when all audio recording activities
             * have been completed for this {@link AudioClip}. This corresponds to the time when the
             * {@link AudioClip#finalize finalize()} function gets called, either manually or
             * automatically.
             * 
             * A user-defined notification callback will be called with a single parameter which is a
             * reference to this {@link AudioClip}.
             * 
             * @param {RecordCompleteCallback} notificationCallback - Callback to fire when recording of this clip has completed
             * @memberof AudioClip
             * @instance
             */
            function notifyWhenComplete(notificationCallback) {
                if (!recordedDuration)
                    completionCallback = notificationCallback;
                else
                    notificationCallback(this);
            }

            /**
             * Encodes this {@link AudioClip} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
             * specified in the `encodingType` parameter.
             * 
             * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
             * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
             * @memberof AudioClip
             * @instance
             * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * @see {@link module:Constants.EncodingType EncodingType}
             */
            async function getEncodedData(encodingType) {
                if (!Object.values(EncodingType).includes(Number(encodingType)))
                    throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
                if (!recordedDuration || !(audioData instanceof Blob))
                    throw new WebAudioRecordingError('Cannot render this audio clip because recording has not yet completed');
                const offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
                const audioBuffer = await offlineContext.decodeAudioData(await audioData.arrayBuffer());
                const clipSource = new AudioBufferSourceNode(offlineContext, { buffer: audioBuffer });
                clipSource.connect(offlineContext.destination);
                clipSource.start();
                const renderedData = await offlineContext.startRendering();
                return getEncoderFor(Number(encodingType)).encode(renderedData);
            }

            // Begin listening for incoming audio data
            thisAudioInputDevice.connect(recorderDestination);
            startRecording();

            // Returns an object containing functions and attributes within the AudioClip namespace
            return { clipType: 'audio', getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
        }

        /**
         * Schedules an audio recording to be executed on the cumulative output of the current track
         * for some duration of time.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the audio recording will
         * continue until manually stopped by the {@link AudioRecording#finalize finalize()} function
         * on the returned {@link AudioRecording} object.
         * 
         * Note that the recorded audio **will** include **all** effects that exist on the track.
         * 
         * @param {number} startTime - Global API time at which to start recording the audio output
         * @param {number} [duration] - Number of seconds for which to continue recording the audio output
         * @returns {AudioRecording} Reference to an {@link AudioRecording} object representing the audio recording
         * @memberof Track
         * @instance
         * @see {@link AudioRecording}
         */
        function recordOutput(startTime, duration) {

            /**
             * Object containing all data needed to render a full audio recording.
             * @namespace AudioRecording
             * @global
             */

            // Audio recording-local variable definitions
            let recorderDestination = audioContext.createMediaStreamDestination();
            let recorder = new MediaRecorder(recorderDestination.stream), isRecording = true;
            let audioData = null, recordedDuration = null, completionCallback = null;

            // Private audio data handling functions
            function startRecording() {
                if (startTime >= (audioContext.currentTime + 0.001))
                    setTimeout(startRecording, 1);
                else {
                    startTime = audioContext.currentTime;
                    recorder.start(duration ? (1000 * duration) : undefined);
                }
            }

            recorder.ondataavailable = (event) => {
                if (!audioData) {
                    audioData = event.data;
                    recordedDuration = duration || (audioContext.currentTime - startTime);
                    finalize();
                }
                isRecording = false;
            };

            recorder.onstop = async () => {
                trackAudioSink.disconnect(recorderDestination);
                if (completionCallback)
                    completionCallback(this);
                completionCallback = null;
                recorderDestination = null;
                recorder = null;
            };

            /**
             * Returns a {@link Blob} containing all of the recorded audio data.
             * 
             * @returns {Blob} Buffer containing all recorded audio data
             * @memberof AudioRecording
             * @instance
             */
            function getRawData() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve raw data from this audio recording because recording has not yet completed');
                return audioData;
            }

            /**
             * Returns the total duration of the audio recording in seconds.
             * 
             * @returns {number} Duration of the audio recording in seconds
             * @memberof AudioRecording
             * @instance
             */
            function getDuration() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve duration of this audio recording because recording has not yet completed');
                return recordedDuration;
            }

            /**
             * Stops recording any future audio data within the {@link AudioRecording}, finalizes the
             * internal storage of all recorded data, and calls the user-completion notification
             * callback, if registered.
             * 
             * Note that this function is called automatically if the original call to
             * {@link Track#recordOutput recordOutput()} specified a concrete duration for the
             * recording. If no duration was specified, then this function **must** be called in order
             * to stop recording. An {@link AudioRecording} is unable to be used or played back until
             * this function has been called.
             * 
             * @memberof AudioRecording
             * @instance
             */
            async function finalize() {
                if (duration) {
                    while ((startTime + duration) > audioContext.currentTime)
                        await new Promise(r => setTimeout(r, 10));
                }
                if (recorder.state != 'inactive') {
                    recorder.stop();
                    while (isRecording)
                        await new Promise(r => setTimeout(r, 1));
                }
            }

            /**
             * Allows a user to register a callback for notification when all audio recording activities
             * have been completed for this {@link AudioRecording}. This corresponds to the time when the
             * {@link AudioRecording#finalize finalize()} function gets called, either manually or
             * automatically.
             * 
             * A user-defined notification callback will be called with a single parameter which is a
             * reference to this {@link AudioRecording}.
             * 
             * @param {RecordCompleteCallback} notificationCallback - Callback to fire when this recording has completed
             * @memberof AudioRecording
             * @instance
             */
            function notifyWhenComplete(notificationCallback) {
                if (!recordedDuration)
                    completionCallback = notificationCallback;
                else
                    notificationCallback(this);
            }

            /**
             * Encodes this {@link AudioRecording} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
             * specified in the `encodingType` parameter.
             * 
             * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
             * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
             * @memberof AudioRecording
             * @instance
             * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * @see {@link module:Constants.EncodingType EncodingType}
             */
            async function getEncodedData(encodingType) {
                if (!Object.values(EncodingType).includes(Number(encodingType)))
                    throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
                if (!recordedDuration || !(audioData instanceof Blob))
                    throw new WebAudioRecordingError('Cannot render this audio recording because recording has not yet completed');
                const offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
                const audioBuffer = await offlineContext.decodeAudioData(await audioData.arrayBuffer());
                const clipSource = new AudioBufferSourceNode(offlineContext, { buffer: audioBuffer });
                clipSource.connect(offlineContext.destination);
                clipSource.start();
                const renderedData = await offlineContext.startRendering();
                return getEncoderFor(Number(encodingType)).encode(renderedData);
            }

            // Begin listening for incoming audio data
            trackAudioSink.connect(recorderDestination);
            startRecording();

            // Returns an object containing functions and attributes within the AudioClip namespace
            return { getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
        }

        /**
         * Schedules an audio file to be played on the current track for some duration of time.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the audio file will
         * play to completion.
         * 
         * @param {string} fileURL - URL location pointing to an audio file
         * @param {number} startTime - Global API time at which to start playing the file
         * @param {number} [duration] - Number of seconds for which to continue playing the file
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
         * Disconnects the current track from the specified audio input device so that no further audio
         * events will be received.
         * 
         * @memberof Track
         * @instance
         */
        function disconnectFromAudioInputDevice() {
            if (audioDeviceInput != null)
                audioDeviceInput.disconnect();
            audioDeviceInput = null;
        }

        /**
         * Connects the current track to the specified MIDI device so that any incoming events will be
         * automatically played in real-time.
         * 
         * @param {MIDIInput} midiInput - MIDI device to which to connect the current track
         * @memberof Track
         * @instance
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIInput MIDIInput}
         */
        function connectToMidiDevice(midiInput) {
            disconnectFromMidiDevice();
            midiInput.addEventListener('midimessage', midiEventReceived);
            midiDevice = midiInput;
        }

        /**
         * Connects the current track to the specified audio input device so that any incoming audio
         * will be automatically played in real-time.
         * 
         * @param {string} audioDeviceID - ID of the audio input device to which to connect the current track
         * @memberof Track
         * @instance
         */
        async function connectToAudioInputDevice(audioDeviceID) {
            disconnectFromAudioInputDevice();
            try {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: { 'deviceId': audioDeviceID }, video: false });
                audioDeviceInput = audioContext.createMediaStreamSource(audioStream);
                audioDeviceInput.connect(audioSink);
            }
            catch (err) {
                throw WebAudioDeviceError('Unable to connect to the requested audio input device. Error was: ' + err);
            }
        }

        /**
         * Cancels any current or scheduled audio from playing on the current track.
         * 
         * @memberof Track
         * @instance
         */
        function clearTrack() {
            for (const source of audioSources)
                source.stop();
            for (const source of asyncAudioSources)
                source.sourceNode.stop();
        }

        /**
         * Deletes the current track and cancels any scheduled audio from playing or from starting
         * to play in the future.
         * 
         * @memberof Track
         * @instance
         */
        function deleteTrack() {
            disconnectFromMidiDevice();
            clearTrack();
            for (const effect of effects)
                effect.output.disconnect();
        }

        // Returns an object containing functions and attributes within the public Track namespace
        return {
            /**
             * Name of the {@link Track}.
             * @memberof Track
             * @instance
             */
            name,
            updateInstrument, removeInstrument, applyEffect, updateEffect, removeEffect, stopNoteAsync, playNoteAsync, playNote,
            playClip, playFile, recordMidiClip, recordAudioClip, recordOutput, connectToMidiDevice, disconnectFromMidiDevice,
            connectToAudioInputDevice, disconnectFromAudioInputDevice, deleteTrack, clearTrack, getAnalysisBuffer
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
     * @returns {Promise<Instrument>} Newly loaded {@link Instrument}
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
            getNote: null,

            /**
             * Returns an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
             * that can be used to play back the specified MIDI `note` from an {@link OfflineAudioContext}.
             * 
             * @function
             * @param {OfflineAudioContext} - Offline audio context whicih will be used to play back the note
             * @param {number} note - MIDI note number for which to generate a playable note
             * @memberof Instrument
             * @instance
             * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
             */
            getNoteOffline: null
        };

        // Actually load and return the instrment
        console.log('Loading instrument:', name + '...');
        if (url == null) {
            instrumentInstance.getNote = function (note) {
                return new OscillatorNode(audioContext, { frequency: Frequency[note] });
            };
            instrumentInstance.getNoteOffline = function (offlineContext, note) {
                return new OscillatorNode(offlineContext, { frequency: Frequency[note] });
            };
        }
        else {
            const noteData = await loadInstrument(url);
            instrumentInstance.getNote = function (note) {
                return new AudioBufferSourceNode(audioContext, noteData[note]);
            };
            instrumentInstance.getNoteOffline = function (offlineContext, note) {
                return new AudioBufferSourceNode(offlineContext, noteData[note]);
            };
        }
        return instrumentInstance;
    }

    /** Class representing all base-level {@link WebAudioAPI} audio analysis functions */
    class AnalysisBase {

        /**
         * Called by a concrete analysis instance to initialize the inherited {@link AnalysisBase} data
         * structure.
         */
        constructor() { /* Empty constructor */ }

        /**
         * Performs a spectral analysis corresponding to an underlying concrete class on the passed-in
         * buffer containing audio frequency content.
         * 
         * @param {Uint8Array} frequencyContent - {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array} containing audio frequency data
         * @returns {Object} Object containing the results of the specified acoustic analysis
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array}
         */
        static analyze(frequencyContent) { return undefined; }
    }

    /**
     * Class representing an acoustic "power spectrum" analysis algorithm.
     * 
     * A Power Spectrum is an array in which each bin contains the power attributed to a discrete
     * range of frequencies within an audio signal.
     * 
     * @extends AnalysisBase
     */
    class PowerSpectrum extends AnalysisBase {

        /**
         * Constructs a new {@link PowerSpectrum} analysis object.
         */
        constructor() {
            super();
        }

        /**
         * Performs a power spectrum analysis on the passed-in buffer containing audio
         * frequency content. The bins of the resulting power spectrum will contain values between
         * [0, 255], where 0 represents silence and 255 represents the maximum representable power.
         * 
         * @param {Uint8Array} frequencyContent - {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array} containing audio frequency data
         * @returns {Uint8Array} Array containing the power spectrum corresponding to the specified frequency data as values between [0, 255]
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array}
         */
        static analyze(frequencyContent) {
            return frequencyContent;
        }
    }

    /**
     * Class representing an acoustic "total power" analysis algorithm.
     * 
     * Total power analysis determines the total cumulative spectral power present across all
     * frequencies within an audio signal.
     * 
     * @extends AnalysisBase
     */
    class TotalPower extends AnalysisBase {

        /**
         * Constructs a new {@link TotalPower} analysis object.
         */
        constructor() {
            super();
        }

        /**
         * Performs a total power spectral analysis on the passed-in buffer containing audio
         * frequency content. The resulting value will be between [0, 1], where 0 represents
         * silence and 1 represents the maximum representable power.
         * 
         * @param {Uint8Array} frequencyContent - {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array} containing audio frequency data
         * @returns {number} Total power content across all frequencies in the specified frequency data as a value between [0, 1]
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array}
         */
        static analyze(frequencyContent) {
            const frequencyTotal = frequencyContent.reduce(function (a, b) { return a + b; });
            return frequencyTotal / (frequencyContent.length * 255);
        }
    }

    /**
     * Module containing functionality to create and utilize {@link WebAudioAPI} audio analyzers.
     * @module Analysis
     */


    const AnalysisClasses = {
        [AnalysisType.PowerSpectrum]: PowerSpectrum,
        [AnalysisType.TotalPower]: TotalPower
    };

    /**
     * Returns a concrete analyzer implementation for the specified analysis type. The value passed
     * to the `analysisType` parameter must be the **numeric value** associated with a certain
     * {@link module:Constants.AnalysisType AnalysisType}, not a string-based key.
     * 
     * @param {number} analysisType - Numeric value corresponding to the desired {@link module:Constants.AnalysisType AnalysisType}
     * @returns {AnalysisBase} Concrete analyzer implementation for the specified {@link module:Constants.AnalysisType AnalysisType}
     * @see {@link module:Constants.AnalysisType AnalysisType}
     * @see {@link AnalysisBase}
     */
    function getAnalyzerFor(analysisType) {
        return AnalysisClasses[analysisType];
    }

    var version = "0.3.0";

    /**
     * Required function prototype to use when registering a MIDI device callback.
     * 
     * @callback MidiEventCallback
     * @param {MIDIMessageEvent} event - Object containing the detected MIDI event
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIMessageEvent MIDIMessageEvent}
     */

    /**
     * Required function prototype to use when registering a recording completion callback.
     * 
     * @callback RecordCompleteCallback
     * @param {MidiClip|AudioClip} clip - Instance of the fully recorded clip
     * @see {@link AudioClip}
     * @see {@link MidiClip}
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

    /**
     * Composite object type for holding a set of concrete {@link Effect} parameter details.
     * 
     * @typedef {Object} EffectParameter
     * @property {string} name - Name of the effect parameter
     * @property {string} type - Type of effect parameter value (either "string" or "number")
     * @property {Array<string|number>} validValues - For "string" types, a listing of all valid values; for "number" types, the min/max values
     * @property {string|number} defaultValue - Default effect value before any updates
     */

    /** Contains all WebAudioAPI top-level functionality. */
    class WebAudioAPI {

        // Singleton instance of the WebAudioAPI class
        static #instance = null;

        // WebAudioAPI private variable definitions
        #started = false;
        #audioContext = new AudioContext({ latencyHint: 'interactive', sampleRate: 44100 });
        /** @type {Object.<string, Object>} */
        #midiCallbacks = {};
        /** @type {Object.<string, Track>} */
        #tracks = {};
        /** @type {Array<Effect>} */
        #effects = [];
        /** @type {Object.<string, string>} */
        #instrumentListing = {};
        /** @type {Object.<string, Instrument>} */
        #loadedInstruments = {};
        /** @type {Tempo} */
        #tempo = { measureLengthSeconds: (4 * 60.0 / 100.0), beatBase: 4, beatsPerMinute: 100, timeSignatureNumerator: 4, timeSignatureDenominator: 4 };
        /** @type {MIDIAccess|null} */
        #midiDeviceAccess = null;
        /** @type {Object.<string, string>} */
        #audioInputDevices = {};
        /** @type {Object.<string, string>} */
        #audioOutputDevices = {};
        /** @type {DynamicsCompressorNode} */
        #compressorNode;
        /** @type {AnalyserNode} */
        #analysisNode;
        /** @type {GainNode} */
        #sourceSinkNode;
        /** @type {Uint8Array} */
        #analysisBuffer;

        /**
         * Returns a singleton instance of the WebAudioAPI interface.
         */
        constructor() {
            // Create or return the singleton instance if it already exists
            if (WebAudioAPI.#instance)
                return WebAudioAPI.#instance;
            WebAudioAPI.#instance = this;

            // Generate and connect all required audio nodes
            this.#sourceSinkNode = new GainNode(this.#audioContext);
            this.#compressorNode = new DynamicsCompressorNode(this.#audioContext);
            this.#analysisNode = new AnalyserNode(this.#audioContext, { fftSize: 1024, maxDecibels: -10.0, smoothingTimeConstant: 0.5 });
            this.#analysisBuffer = new Uint8Array(this.#analysisNode.frequencyBinCount);
            this.#sourceSinkNode.connect(this.#compressorNode).connect(this.#analysisNode).connect(this.#audioContext.destination);
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
         * Returns a listing of all available effects in the {@link WebAudioAPI} library.
         * 
         * This function can be used to enumerate available effect options for displaying on a
         * web page. Note, however, that the `effectType` parameter passed to either the
         * {@link WebAudioAPI#applyMasterEffect applyMasterEffect()} or the
         * {@link WebAudioAPI#applyTrackEffect applyTrackEffect()} function must be the
         * **numeric value** associated with a certain {@link module:Constants.EffectType EffectType},
         * not a string-based key.
         * 
         * @returns {Object.<string, number>} Listing of all available effect types in the {@link WebAudioAPI} library
         * @see {@link module:Constants.EffectType EffectType}
         */
        getAvailableEffects() {
            return EffectType;
        }

        /**
         * Returns a list of effect-specific {@link EffectParameter EffectParameters} for manipulation
         * in the `effectOptions` parameter of the {@link WebAudioAPI#updateMasterEffect updateMasterEffect()}
         * or the {@link WebAudioAPI#updateTrackEffect updateTrackEffect()} function.
         * 
         * This function can be used to enumerate available effect parameters for displaying on a
         * web page. Note, however, that the `effectType` parameter must be the **numeric value**
         * associated with a certain {@link module:Constants.EffectType EffectType}, not a
         * string-based key.
         * 
         * @param {number} effectType - {@link module:Constants.EffectType EffectType} for which to return a parameter list
         * @returns {EffectParameter[]} List of effect-specific parameters available for updating
         * @see {@link module:Constants.EffectType EffectType}
         * @see {@link EffectParameter}
         */
        getAvailableEffectParameters(effectType) {
            if (!Object.values(EffectType).includes(Number(effectType)))
                throw new WebAudioTargetError(`The target effect type identifier (${effectType}) does not exist`);
            return getEffectParameters(effectType);
        }

        /**
         * Returns a listing of all available encoders in the {@link WebAudioAPI} library.
         * 
         * This function can be used to enumerate available encoding options for displaying on a
         * web page.
         * 
         * @returns {Object.<string, number>} Listing of all available encoding types in the {@link WebAudioAPI} library
         * @see {@link module:Constants.EncodingType EncodingType}
         */
        getAvailableEncoders() {
            return EncodingType;
        }

        /**
         * Returns a listing of all available audio analysis types in the {@link WebAudioAPI} library.
         * 
         * This function can be used to enumerate available analysis options for displaying on a
         * web page.
         * 
         * @returns {Object.<string, number>} Listing of all available audio analysis types in the {@link WebAudioAPI} library
         * @see {@link module:Constants.AnalysisType AnalysisType}
         */
        getAvailableAnalysisTypes() {
            return AnalysisType;
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
         * Returns a listing of the available MIDI devices connected to the client device.
         * 
         * Individual results from this function call can be passed directly to the
         * {@link connectMidiDeviceToTrack()} function to attach a MIDI device to a specified audio track.
         * 
         * @returns {Promise<string[]>} Listing of all available MIDI devices connected to the client device
         */
        async getAvailableMidiDevices() {
            const midiDevices = [];
            if (navigator.requestMIDIAccess && this.#midiDeviceAccess === null) {
                try {
                    this.#midiDeviceAccess = await navigator.requestMIDIAccess();
                    for (const midiDevice of this.#midiDeviceAccess.inputs.values())
                        midiDevices.push(midiDevice.name);
                } catch (err) {
                    this.#midiDeviceAccess = null;
                    throw new WebAudioMidiError('MIDI permissions are required in order to enumerate available MIDI devices!');
                }
            }
            return midiDevices;
        }

        /**
         * Returns a listing of the available audio input devices connected to the client device.
         * 
         * Individual results from this function call can be passed directly to the
         * {@link connectAudioInputDeviceToTrack()} function to attach an input device to a specified
         * audio track.
         * 
         * @returns {Promise<string[]>} Listing of all available audio input devices connected to the client
         */
        async getAvailableAudioInputDevices() {
            const inputDevices = [];
            for (const key in this.#audioInputDevices)
                delete this.#audioInputDevices[key];
            if (navigator.mediaDevices?.enumerateDevices) {
                try {
                    await navigator.mediaDevices.getUserMedia({ audio: true });
                    for (const device of await navigator.mediaDevices.enumerateDevices())
                        if (device.kind == 'audioinput') {
                            let alreadyFound = false;
                            for (const [i, existingDevice] of inputDevices.entries()) {
                                if (existingDevice.groupId == device.groupId) {
                                    if (device.deviceId.length > existingDevice.id.length) {
                                        inputDevices[i].id = device.deviceId;
                                        inputDevices[i].label = device.label;
                                    }
                                    alreadyFound = true;
                                    break;
                                }
                            }
                            if (!alreadyFound)
                                inputDevices.push({ id: device.deviceId, groupId: device.groupId, label: device.label });
                        }
                } catch (err) {
                    throw new WebAudioDeviceError('Microphone and audio input permissions are required in order to enumerate available devices!');
                }
            }
            inputDevices.forEach(device => this.#audioInputDevices[device.label] = device.id);
            return Object.keys(this.#audioInputDevices);
        }

        /**
         * Returns a listing of the available audio output devices connected to the client device.
         * 
         * Individual results from this function call can be passed directly to the
         * {@link selectAudioOutputDevice()} function to choose where to direct all audio output.
         * 
         * @returns {Promise<string[]>} Listing of all available audio output devices connected to the client
         */
        async getAvailableAudioOutputDevices() {
            const outputDevices = [];
            for (const key in this.#audioOutputDevices)
                delete this.#audioOutputDevices[key];
            if (navigator.mediaDevices?.enumerateDevices) {
                try {
                    await navigator.mediaDevices.getUserMedia({ audio: true });
                    for (const device of await navigator.mediaDevices.enumerateDevices())
                        if (device.kind == 'audiooutput') {
                            let alreadyFound = false;
                            for (const [i, existingDevice] of outputDevices.entries()) {
                                if (existingDevice.groupId == device.groupId) {
                                    if (device.deviceId.length > existingDevice.id.length) {
                                        outputDevices[i].id = device.deviceId;
                                        outputDevices[i].label = device.label;
                                    }
                                    alreadyFound = true;
                                    break;
                                }
                            }
                            if (!alreadyFound)
                                outputDevices.push({ id: device.deviceId, groupId: device.groupId, label: device.label });
                        }
                } catch (err) {
                    throw new WebAudioDeviceError('Audio permissions are required in order to enumerate available devices!');
                }
            }
            outputDevices.forEach(device => this.#audioOutputDevices[device.label] = device.id);
            return Object.keys(this.#audioOutputDevices);
        }

        /**
         * Analyzes the current realtime audio output according to the specified `analysisType`.
         * 
         * The `trackName` parameter is optional, and if left blank, will cause the analysis to be
         * carried out on the aggregate output over all tracks and all applied effects.
         * 
         * The type of return value from this function will depend on the analysis being carried out
         * and can be determined by examining the corresponding concrete definitions of the
         * {@link AnalysisBase} interface.
         * 
         * @param {number} analysisType - Audio {@link module:Constants.AnalysisType AnalysisType} to execute
         * @param {string} [trackName] - Name of the track whose audio should be analyzed
         * @returns {Any} Result of the specified analysis
         * @see {@link module:Constants.AnalysisType AnalysisType}
         */
        analyzeAudio(analysisType, trackName) {
            let analysisBuffer = null;
            if (!Object.values(AnalysisType).includes(Number(analysisType)))
                throw new WebAudioTargetError(`The target analysis type identifier (${analysisType}) does not exist`);
            if (trackName) {
                if (!(trackName in this.#tracks))
                    throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
                analysisBuffer = this.#tracks[trackName].getAnalysisBuffer(analysisType);
            }
            else {
                analysisBuffer = this.#analysisBuffer;
                if (analysisType == AnalysisType.TimeSeries)
                    this.#analysisNode.getByteTimeDomainData(analysisBuffer);
                else
                    this.#analysisNode.getByteFrequencyData(analysisBuffer);
            }
            return (analysisType == AnalysisType.TimeSeries) ? analysisBuffer : getAnalyzerFor(analysisType).analyze(analysisBuffer);
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
         * Cancels all current and scheduled audio from playing on the specified track.
         * 
         * @param {string} name - Name of the track to clear
         */
        clearTrack(name) {
            if (name in this.#tracks)
                this.#tracks[name].clearTrack();
        }

        /**
         * Cancels all current and scheduled audio from playing on all existing tracks.
         */
        clearAllTracks() {
            for (const name in this.#tracks)
                this.#tracks[name].clearTrack();
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
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            if (!(instrumentName in this.#instrumentListing))
                throw new WebAudioTargetError(`The target instrument name (${instrumentName}) does not exist`);
            if (!(instrumentName in this.#loadedInstruments))
                this.#loadedInstruments[instrumentName] = await loadInstrument(this.#audioContext, instrumentName, this.#instrumentListing[instrumentName]);
            this.#tracks[trackName].updateInstrument(this.#loadedInstruments[instrumentName]);
        }

        /**
         * Removes the instrument used to play back audio on the specified track.
         * 
         * @param {string} trackName - Name of the track from which to remove the current instrument
         */
        async removeInstrument(trackName) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
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
         * @param {number|null} beatBase - Note {@link module:Constants.Duration Duration} corresponding to a global beat
         * @param {number|null} beatsPerMinute - Number of global beats per minute
         * @param {number|null} timeSignatureNumerator - Number of beats per measure
         * @param {number|null} timeSignatureDenominator - Note {@link module:Constants.Duration Duration} corresponding to a measure beat
         */
        updateTempo(beatBase, beatsPerMinute, timeSignatureNumerator, timeSignatureDenominator) {
            this.#tempo.beatBase = beatBase ? Number(beatBase) : this.#tempo.beatBase;
            this.#tempo.beatsPerMinute = beatsPerMinute ? Number(beatsPerMinute) : this.#tempo.beatsPerMinute;
            this.#tempo.timeSignatureNumerator = timeSignatureNumerator ? Number(timeSignatureNumerator) : this.#tempo.timeSignatureNumerator;
            this.#tempo.timeSignatureDenominator = timeSignatureDenominator ? Number(timeSignatureDenominator) : this.#tempo.timeSignatureDenominator;
            this.#tempo.measureLengthSeconds = (60.0 / this.#tempo.beatsPerMinute) * this.#tempo.beatBase * this.#tempo.timeSignatureNumerator / this.#tempo.timeSignatureDenominator;
        }

        /**
         * Applies a new master effect to the aggregate output from all tracks at the specified time.
         * 
         * Calling this function affects the sequential ordering in which master effects will be
         * processed, with each new call appending the corresponding effect to the *end* of the
         * processing sequence.
         * 
         * The parameters of the added effect will be set to their default values such that the result
         * of adding the effect will not be audible. In order to manipulate and utilize this effect,
         * use the {@link WebAudioAPI#updateMasterEffect updateMasterEffect()} function.
         * 
         * If a master effect with the specified `effectName` has already been applied, then calling
         * this function will simply re-order the effect to move it to the very end of the effect
         * processing sequence, without changing its parameter values.
         * 
         * @param {string} effectName - User-defined name to associate with the master effect
         * @param {number} effectType - Master {@link module:Constants.EffectType EffectType} to apply
         * @see {@link module:Constants.EffectType EffectType}
         */
        async applyMasterEffect(effectName, effectType) {
            if (!Object.values(EffectType).includes(Number(effectType)))
                throw new WebAudioTargetError(`The target effect type identifier (${effectType}) does not exist`);
            const existingEffect = await this.removeMasterEffect(effectName);
            const newEffect = existingEffect || await loadEffect(this.#audioContext, effectName, Number(effectType));
            newEffect.output.connect(this.#compressorNode);
            if (this.#effects.length) {
                const previousEffect = this.#effects.slice(-1)[0];
                previousEffect.output.disconnect();
                previousEffect.output.connect(newEffect.input);
            }
            else {
                this.#sourceSinkNode.disconnect();
                this.#sourceSinkNode.connect(newEffect.input);
            }
            this.#effects.push(newEffect);
        }

        /**
         * Applies a new effect to the specified track at the specified time.
         * 
         * Calling this function affects the sequential ordering in which effects will be processed
         * within the specified track, with each new call appending the corresponding effect to the
         * *end* of the processing sequence.
         * 
         * The parameters of the added effect will be set to their default values such that the result
         * of adding the effect will not be audible. In order to manipulate and utilize this effect,
         * use the {@link WebAudioAPI#updateTrackEffect updateTrackEffect()} function.
         * 
         * If an effect with the specified `effectName` has already been applied to the specified
         * track, then calling this function will simply re-order the effect to move it to the very end
         * of the effect processing sequence, without changing its parameter values.
         * 
         * @param {string} trackName - Name of the track on which to apply the effect
         * @param {string} effectName - User-defined name to associate with the track effect
         * @param {number} effectType - Track-specific {@link module:Constants.EffectType EffectType} to apply
         * @see {@link module:Constants.EffectType EffectType}
         */
        async applyTrackEffect(trackName, effectName, effectType) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            if (!Object.values(EffectType).includes(Number(effectType)))
                throw new WebAudioTargetError(`The target effect type identifier (${effectType}) does not exist`);
            await this.#tracks[trackName].applyEffect(effectName, Number(effectType));
        }

        /**
         * Updates the parameters of a master effect at the specified time.
         * 
         * Calling this function will **not** affect the sequential processing order of any applied
         * effects.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {string} effectName - Name of the master effect to be updated
         * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [transitionLength] - Number of seconds over which to update the effect
         */
        async updateMasterEffect(effectName, effectOptions, updateTime, transitionLength) {
            for (const effect of this.#effects)
                if (effect.name == effectName) {
                    await effect.update(effectOptions, updateTime ? Number(updateTime) : undefined, transitionLength ? (0.333 * Number(transitionLength)) : undefined);
                    return;
                }
            throw new WebAudioTargetError(`The target master effect (${effectName}) does not exist`);
        }

        /**
         * Updates the parameters of a track-specific effect at the specified time.
         * 
         * Calling this function will **not** affect the sequential processing order of any applied
         * effects.
         * 
         * Note that the `updateTime` parameter can be omitted to immediately cause the requested
         * changes to take effect.
         * 
         * @param {string} trackName - Name of the track for which to update the effect
         * @param {string} effectName - Name of the track effect to be updated
         * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
         * @param {number} [updateTime] - Global API time at which to update the effect
         * @param {number} [transitionLength] - Number of seconds over which to update the effect
         */
        async updateTrackEffect(trackName, effectName, effectOptions, updateTime, transitionLength) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            await this.#tracks[trackName].updateEffect(effectName, effectOptions, updateTime ? Number(updateTime) : undefined, transitionLength ? (0.333 * Number(transitionLength)) : undefined);
        }

        /**
         * Removes the specified master effect from being applied.
         * 
         * @param {string} effectName - Name of the master effect to be removed
         * @returns {Promise<Effect|null>} The effect that was removed, if any
         * @see {@link Effect}
         */
        async removeMasterEffect(effectName) {
            let existingEffect = null;
            for (const [index, effect] of this.#effects.entries())
                if (effect.name == effectName) {
                    existingEffect = this.#effects.splice(index, 1)[0];
                    if (index == 0) {
                        this.#sourceSinkNode.disconnect();
                        this.#sourceSinkNode.connect(this.#effects.length ? this.#effects[0].input : this.#compressorNode);
                    }
                    else {
                        this.#effects[index - 1].output.disconnect();
                        this.#effects[index - 1].output.connect((this.#effects.length > index) ? this.#effects[index].input : this.#compressorNode);
                    }
                    existingEffect.input.disconnect();
                    existingEffect.output.disconnect();
                    break;
                }
            return existingEffect;
        }

        /**
         * Removes the specified effect from being applid on the corresponding track.
         * 
         * @param {string} trackName - Name of the track from which to remove the effect
         * @param {string} effectName - Name of the track effect to be removed
         */
        async removeTrackEffect(trackName, effectName) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            await this.#tracks[trackName].removeEffect(effectName);
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
         */
        registerMidiDeviceCallback(midiDeviceName, midiEventCallback) {
            this.deregisterMidiDeviceCallback(midiDeviceName);
            if (!this.#midiDeviceAccess)
                throw new WebAudioMidiError('MIDI access permissions have not yet been granted...first call getAvailableMidiDevices()');
            for (const midiDevice of this.#midiDeviceAccess.inputs.values())
                if (midiDeviceName == midiDevice.name) {
                    midiDevice.addEventListener('midimessage', midiEventCallback);
                    this.#midiCallbacks[midiDeviceName] = { device: midiDevice, callback: midiEventCallback };
                    return;
                }
            throw new WebAudioTargetError(`The target MIDI device (${midiDeviceName}) could not be located`);
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
         * Redirects all audio output to the specified device.
         * 
         * @param {string} audioOutputDeviceName - Name of the output device to which to direct all audio
         */
        async selectAudioOutputDevice(audioOutputDeviceName) {
            if (!(audioOutputDeviceName in this.#audioOutputDevices))
                throw new WebAudioTargetError(`The target audio output device (${audioOutputDeviceName}) does not exist`);
            await this.#audioContext.setSinkId(this.#audioOutputDevices[audioOutputDeviceName]);
        }

        /**
         * Connects a MIDI device to the specified audio track.
         * 
         * **Note:** A single MIDI device can be connected to multiple audio tracks, but an audio track
         * can only be connected to a single MIDI device.
         * 
         * @param {string} trackName - Name of the track to which to connect the MIDI device
         * @param {string} midiDeviceName - Name of the MIDI device to connect to the track
         */
        async connectMidiDeviceToTrack(trackName, midiDeviceName) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            if (!this.#midiDeviceAccess)
                throw new WebAudioMidiError('MIDI access permissions have not yet been granted...first call getAvailableMidiDevices()');
            for (const midiDevice of this.#midiDeviceAccess.inputs.values())
                if (midiDeviceName == midiDevice.name) {
                    this.#tracks[trackName].connectToMidiDevice(midiDevice);
                    return;
                }
            throw new WebAudioTargetError(`The target MIDI device (${midiDeviceName}) could not be located`);
        }

        /**
         * Connects an audio input device to the specified audio track.
         * 
         * **Note:** A single audio input device can be connected to multiple audio tracks, but an
         * audio track can only be connected to a single audio input device.
         * 
         * @param {string} trackName - Name of the track to which to connect the audio input device
         * @param {string} audioInputDeviceName - Name of the audio input device to connect to the track
         */
        async connectAudioInputDeviceToTrack(trackName, audioInputDeviceName) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            if (!(audioInputDeviceName in this.#audioInputDevices))
                throw new WebAudioTargetError(`The target audio input device (${audioInputDeviceName}) does not exist`);
            await this.#tracks[trackName].connectToAudioInputDevice(this.#audioInputDevices[audioInputDeviceName]);
        }

        /**
         * Disconnects all MIDI devices from the specified audio track.
         * 
         * @param {string} trackName - Name of the track from which to disconnect the MIDI devices
         */
        async disconnectMidiDeviceFromTrack(trackName) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            this.#tracks[trackName].disconnectFromMidiDevice();
        }

        /**
         * Disconnects all audio input devices from the specified audio track.
         * 
         * @param {string} trackName - Name of the track from which to disconnect the audio input devices
         */
        async disconnectAudioInputDeviceFromTrack(trackName) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            this.#tracks[trackName].disconnectFromAudioInputDevice();
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
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            if ((Number(velocity) < 0.0) || (Number(velocity) > 1.0))
                throw new WebAudioValueError(`The target velocity value (${velocity}) is outside of the available range: [0.0, 1.0]`);
            return await this.#tracks[trackName].playNote(Number(note), Number(velocity), Number(startTime), Number(duration));
        }

        /**
         * Schedules an audio clip to be played on a specific track for some duration of time.
         * 
         * The format of the audio clip in the `audioClip` parameter may be a data buffer containing
         * raw audio-encoded data (such as from a WAV file), a blob containing audio-encoded data, or
         * a {@link MidiClip} or {@link AudioClip} that was recorded using this library.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the audio clip will
         * play to completion.
         * 
         * @param {string} trackName - Name of the track on which to play the clip
         * @param {ArrayBuffer|Blob|MidiClip|AudioClip} audioClip - Object containing audio data to play
         * @param {number} startTime - Global API time at which to start playing the clip
         * @param {number} [duration] - Number of seconds for which to continue playing the clip
         * @returns {Promise<number>} Duration (in seconds) of the clip being played
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
         * @see {@link MidiClip}
         */
        async playClip(trackName, audioClip, startTime, duration) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            if (!(audioClip instanceof ArrayBuffer || audioClip instanceof Blob || (audioClip instanceof Object && Object.prototype.hasOwnProperty.call(audioClip, 'clipType'))))
                throw new WebAudioTrackError('The audio clip is not a known type (ArrayBuffer, Blob, MidiClip, AudioClip) and cannot be played');
            return await this.#tracks[trackName].playClip(audioClip, Number(startTime), duration ? Number(duration) : undefined);
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
         * @param {number} [duration] - Number of seconds for which to continue playing the file
         * @returns {Promise<number>} Duration (in seconds) of the file being played
         */
        async playFile(trackName, fileURL, startTime, duration) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            return await this.#tracks[trackName].playFile(fileURL, Number(startTime), duration ? Number(duration) : undefined);
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
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            if ((Number(velocity) < 0.0) || (Number(velocity) > 1.0))
                throw new WebAudioValueError(`The target velocity value (${velocity}) is outside of the available range: [0.0, 1.0]`);
            return await this.#tracks[trackName].playNoteAsync(note, Number(velocity));
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
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            this.#tracks[trackName].stopNoteAsync(note);
        }

        /**
         * Schedules an audio clip to be recorded on a specific track for some duration of time.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the audio clip will
         * continue to record until manually stopped by the {@link AudioClip#finalize finalize()}
         * function on the returned {@link AudioClip} object.
         * 
         * Note that the recorded audio clip will **not** include any effects that might exist on
         * the target track. This is so that recording on an effect-modified track and then
         * immediately playing back on the same track will not cause the effects to be doubled.
         * 
         * @param {string} trackName - Name of the track on which to record the audio clip
         * @param {number} startTime - Global API time at which to start recording the audio clip
         * @param {number} [duration] - Number of seconds for which to continue recording the audio clip
         * @returns {AudioClip} Reference to an {@link AudioClip} object representing the audio data to be recorded
         * @see {@link AudioClip}
         */
        recordAudioClip(trackName, startTime, duration) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            return this.#tracks[trackName].recordAudioClip(Number(startTime), duration ? Number(duration) : undefined);
        }

        /**
         * Schedules a MIDI clip to be recorded on a specific track for some duration of time.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the MIDI clip will
         * continue to record until manually stopped by the {@link MidiClip#finalize finalize()}
         * function on the returned {@link MidiClip} object.
         * 
         * Note that the recorded MIDI clip will **not** include any effects that might exist on
         * the target track. This is so that recording on an effect-modified track and then
         * immediately playing back on the same track will not cause the effects to be doubled.
         * 
         * @param {string} trackName - Name of the track on which to record the MIDI clip
         * @param {number} startTime - Global API time at which to start recording the MIDI clip
         * @param {number} [duration] - Number of seconds for which to continue recording the MIDI clip
         * @returns {MidiClip} Reference to a {@link MidiClip} object representing the MIDI data to be recorded
         * @see {@link MidiClip}
         */
        recordMidiClip(trackName, startTime, duration) {
            if (!(trackName in this.#tracks))
                throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
            return this.#tracks[trackName].recordMidiClip(Number(startTime), duration ? Number(duration) : undefined);
        }

        /**
         * Schedules an audio recording to be executed on the cumulative output of the specified audio
         * track for some duration of time.
         * 
         * If the `trackName` parameter is not specified or is set to `null`, the audio recording will
         * include the cumulative output of **all** audio tracks and effects.
         * 
         * If the `startTime` parameter is not specified or is set to `null`, the audio recording will
         * begin immediately.
         * 
         * If the `duration` parameter is not specified or is set to `null`, the audio recording will
         * continue until manually stopped by the {@link AudioRecording#finalize finalize()} function
         * on the returned {@link AudioRecording} object.
         * 
         * Note that the recorded audio **will** include **all** existing effects.
         * 
         * @param {string} [trackName] - Name of the track from which to record all audio output
         * @param {number} [startTime] - Global API time at which to start recording the audio output
         * @param {number} [duration] - Number of seconds for which to continue recording the audio output
         * @returns {AudioRecording} Reference to an {@link AudioRecording} object representing the audio recording
         * @see {@link AudioRecording}
         */
        recordOutput(trackName, startTime, duration) {

            /**
             * Object containing all data needed to render a full audio recording.
             * @namespace AudioRecording
             * @global
             */

            // Forward this request to the indicated track, if specified
            if (trackName) {
                if (!(trackName in this.#tracks))
                    throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
                return this.#tracks[trackName].recordOutput(startTime, duration);
            }

            // Audio recording-local variable definitions
            let recorderDestination = this.#audioContext.createMediaStreamDestination();
            let recorder = new MediaRecorder(recorderDestination.stream), isRecording = true;
            let audioData = null, recordedDuration = null, completionCallback = null;
            const audioContext = this.#audioContext, analysisNode = this.#analysisNode;

            // Private audio data handling functions
            function startRecording() {
                if (startTime >= (audioContext.currentTime + 0.001))
                    setTimeout(startRecording, 1);
                else {
                    startTime = audioContext.currentTime;
                    recorder.start(duration ? (1000 * duration) : undefined);
                }
            }

            recorder.ondataavailable = (event) => {
                if (!audioData) {
                    audioData = event.data;
                    recordedDuration = duration || (audioContext.currentTime - startTime);
                    finalize();
                }
                isRecording = false;
            };

            recorder.onstop = async () => {
                analysisNode.disconnect(recorderDestination);
                if (completionCallback)
                    completionCallback(this);
                completionCallback = null;
                recorderDestination = null;
                recorder = null;
            };

            /**
             * Returns a {@link Blob} containing all of the recorded audio data.
             * 
             * @returns {Blob} Buffer containing all recorded audio data
             * @memberof AudioRecording
             * @instance
             */
            function getRawData() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve raw data from this audio recording because recording has not yet completed');
                return audioData;
            }

            /**
             * Returns the total duration of the audio recording in seconds.
             * 
             * @returns {number} Duration of the audio recording in seconds
             * @memberof AudioRecording
             * @instance
             */
            function getDuration() {
                if (!recordedDuration)
                    throw new WebAudioRecordingError('Cannot retrieve duration of this audio recording because recording has not yet completed');
                return recordedDuration;
            }

            /**
             * Stops recording any future audio data within the {@link AudioRecording}, finalizes the
             * internal storage of all recorded data, and calls the user-completion notification
             * callback, if registered.
             * 
             * Note that this function is called automatically if the original call to
             * {@link Track#recordOutput recordOutput()} specified a concrete duration for the
             * recording. If no duration was specified, then this function **must** be called in order
             * to stop recording. An {@link AudioRecording} is unable to be used or played back until
             * this function has been called.
             * 
             * @memberof AudioRecording
             * @instance
             */
            async function finalize() {
                if (duration) {
                    while ((startTime + duration) > audioContext.currentTime)
                        await new Promise(r => setTimeout(r, 10));
                }
                if (recorder.state != 'inactive') {
                    recorder.stop();
                    while (isRecording)
                        await new Promise(r => setTimeout(r, 1));
                }
            }

            /**
             * Allows a user to register a callback for notification when all audio recording activities
             * have been completed for this {@link AudioRecording}. This corresponds to the time when the
             * {@link AudioRecording#finalize finalize()} function gets called, either manually or
             * automatically.
             * 
             * A user-defined notification callback will be called with a single parameter which is a
             * reference to this {@link AudioRecording}.
             * 
             * @param {RecordCompleteCallback} notificationCallback - Callback to fire when this recording has completed
             * @memberof AudioRecording
             * @instance
             */
            function notifyWhenComplete(notificationCallback) {
                if (!recordedDuration)
                    completionCallback = notificationCallback;
                else
                    notificationCallback(this);
            }

            /**
             * Encodes this {@link AudioRecording} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
             * specified in the `encodingType` parameter.
             * 
             * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
             * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
             * @memberof AudioRecording
             * @instance
             * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
             * @see {@link module:Constants.EncodingType EncodingType}
             */
            async function getEncodedData(encodingType) {
                if (!Object.values(EncodingType).includes(Number(encodingType)))
                    throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
                if (!recordedDuration || !(audioData instanceof Blob))
                    throw new WebAudioRecordingError('Cannot render this audio recording because recording has not yet completed');
                const offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
                const audioBuffer = await offlineContext.decodeAudioData(await audioData.arrayBuffer());
                const clipSource = new AudioBufferSourceNode(offlineContext, { buffer: audioBuffer });
                clipSource.connect(offlineContext.destination);
                clipSource.start();
                const renderedData = await offlineContext.startRendering();
                return getEncoderFor(Number(encodingType)).encode(renderedData);
            }

            // Begin listening for incoming audio data
            analysisNode.connect(recorderDestination);
            startRecording();

            // Returns an object containing functions and attributes within the AudioClip namespace
            return { getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
        }

        /**
         * Starts the {@link WebAudioAPI} library and allows audio playback to resume.
         */
        async start() {
            this.#started = true;
            await this.#audioContext.resume();
        }

        /**
         * Stops the {@link WebAudioAPI} library and pauses any currently playing audio.
         */
        stop() {
            this.#started = false;
            setTimeout(async () => { if (!this.#started) await this.#audioContext.suspend(); }, 200);
        }
    }

    // Attach a WebAudioAPI reference to "window" so that it can be accessed from non-module Javascript files
    window.WebAudioAPI = WebAudioAPI;

    (function () {
        const audioAPI = new WebAudioAPI();
        const I32_MAX = 2147483647;
        let syncStart = 0;
        let midiDevices = [], midiInstruments = [], audioDevices = [];
        let lastRecordedClip = null, recordingInProgress = false, currentDeviceType;
        let appliedEffects = [];
        audioAPI.start();
        const availableEffects = audioAPI.getAvailableEffects();
        const availableMidiNotes = audioAPI.getAvailableNotes();
        const availableNoteDurations = audioAPI.getAvailableNoteDurations();
        audioAPI.getAvailableMidiDevices().then(returnMidiDevice, fail);
        audioAPI.getAvailableAudioInputDevices().then(returnAudioDevice, fail);

        const devRoot = 'http://localhost:8000/extensions/BeatsBlox/instruments/';
        const releaseRoot = 'https://extensions.netsblox.org/extensions/BeatsBlox/instruments/';
        const instrumentLocation = window.origin.includes('localhost') ? devRoot : releaseRoot;

        audioAPI.getAvailableInstruments(instrumentLocation).then(
            instruments => instruments.forEach(
                instrument => midiInstruments.push(instrument)
            )
        );

       
         /**
          * Object representing a mapping between an encoding file type and its unique internal code.
          * @constant {Object.<string, number>}
          */
         const EncodingType = {
             WAV: 1
         };



         /**
          * Object representing a mapping between an effect type and its unique internal code.
          * @constant {Object.<string, number>}
          */
         const EffectType = {
             Reverb: 11, Delay: 12, Echo: 13,                                                 // Time-Based Effects
             Chorus: 21, Tremolo: 22, Vibrato: 23, Flanger: 24, Phaser: 25,                   // Modulation Effects
             Panning: 31, Equalization: 32,                                                   // Spectral Effects
             Volume: 41, Compression: 42, Distortion: 43,                                     // Dynamic Effects
             LowPassFilter: 51, HighPassFilter: 52, BandPassFilter: 53, BandRejectFilter: 54  // Filter Effects
         };

        const EffectsPreset = {
            'Under Water': ['LowPassFilter', {
                ['cutoffFrequency']: 500,
                ['resonance']: 12,
             }],
            'Telephone': ['HighPassFilter', {
                ['cutoffFrequency'] : 1800,
                ['resonance']: 10,
            }],
            'Cave': ['Echo', {
                ['feedback'] : 0.5,
                ['intensity'] : 0.4,
            }],
            'Fan Blade': ['Tremolo', {
                ['tremeloFrequency'] : 18,
            }],
        };

        /**
         * Creates a list of all available MIDI devices
         * @param {[String]} devices - available MIDI device.
         */
        function returnMidiDevice(devices) {
            for (let i = 0; i < devices.length; ++i) 
                midiDevices.push(devices[i] + "---(midi)");
        }  

        /**
         * Creates a list of all available audio-input devices
         * @param {[String]} devices - available audio-input devices.
         */
        function returnAudioDevice(devices) {
            audioDevices = audioDevices.concat(devices);
            console.log(devices);
        }

        /**
         * Runs when the audio API can't return a list of available devices.
         */
        function fail() {
            console.log('Could not return a list of available devices');
        }

        /**
         * Connects a MIDI device to the WebAudioAPI
         * @param {String} trackName - Name of the Track 
         * @param {String} device - Name of the MIDI device being connected.
         */
        function midiConnect(trackName, device) {
            if (device != "") {
                const mDevice = device.replace("---(midi)", "");
                audioAPI.connectMidiDeviceToTrack(trackName, mDevice).then(() => {
                    console.log('Connected to MIDI device!');
                });
                // audioAPI.registerMidiDeviceCallback(device, midiCallback);
                currentDeviceType = 'midi';
            }
        }

        /**
         * Connects and audio input device to NetsBlox
         * @param {String} trackName - Name of the Track 
         * @param {String} device - Name of the audio device being connected.
         */
        function audioConnect(trackName,device) {
            if (device != "") {
                audioAPI.connectAudioInputDeviceToTrack(trackName, device).then(() => {
                    console.log('Connected to audio device!');
                });
                currentDeviceType = 'audio';
            }
        }

        /**
         * Connects an instrument sample to the WebAudioAPI
         * @param {String} trackName - Name of the Track 
         * @param {String} instrument - Name of instrument being loaded.
         */
        async function changeInsturment(trackName,instrument) {
            await audioAPI.updateInstrument(trackName, instrument).then(() => {
                console.log('Instrument loading complete!');
            });
        }

        /**
         * Converts an AudioClip k to a Snap! Sound.
         * @asyn
         * @param {AudioClip} clip - The clip being rendered.
         * @returns A Snap! Sound.
         */
        async function clipToSnap(clip) {
            const blob = await clip.getEncodedData(EncodingType['WAV']);
            const audio = new Audio(URL.createObjectURL(blob, { type: "audio/wav" }));
            return new Sound(audio, 'netsblox-sound');
        }

        /**
         * Disconnects all audio and midi devices from NetsBlox
         * @param {String} trackName - name of the Track 
         * @async
         */
        async function disconnectDevices(trackName) {
            console.log('device disconnected');
            if (audioDevices.length > 0)
                await audioAPI.disconnectAudioInputDeviceFromTrack(trackName);
            if (midiDevices.length > 0)
               await audioAPI.disconnectMidiDeviceFromTrack(trackName);
        }

        /**
         * Converts base64 encoding to ArrayBuffer
         * @param {String} base64 - base64 encoded audio file
         * @returns An Array Buffer
         */
        function base64toArrayBuffer(base64){
            var binaryString = window.atob(base64.replace("data:audio/mpeg;base64,", ""));
            var bytes = new Uint8Array(binaryString.length);
            for (var i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
         }

        /**
         * Synchronizes all clips being loaded
         */

        async function synchronize(){
            let currentStart = syncStart++;
            await wait(.005);
            do {
                currentStart++;
                await wait(.005);
            } while (currentStart != syncStart);
            audioAPI.start();
        }

        /**
         * Plays an audio clip
         * @param {String} binaryString - binary string of audio file
         * @param {String} trackName - name of track
         * @returns An Array Buffer
         */
        async function playAudio(binaryString, trackName){
            await synchronize();  
            let buffer;
            if (binaryString.audio.src.includes('data:'))
                 buffer = base64toArrayBuffer(binaryString.audio.src);
            else 
                buffer = binaryString.audioBuffer;
            audioAPI.start();
            return audioAPI.playClip(trackName, buffer, audioAPI.getCurrentTime(), 0);
        }

        async function playAudioForDuration(binaryString, trackName, dur) {
            await synchronize();
            let buffer;
            if (binaryString.audio.src.includes('data:'))
                buffer = base64toArrayBuffer(binaryString.audio.src);
            else
                buffer = binaryString.audioBuffer;
            audioAPI.start();
            return audioAPI.playClip(trackName, buffer, audioAPI.getCurrentTime(), dur);
        }

         async function playChord(trackName, listOfNotes, noteDuration, velocity=.7){
            for (const note of listOfNotes){
                if(typeof note === "string" && (note in availableMidiNotes)){
                    audioAPI.playNote(trackName,availableMidiNotes[note], audioAPI.getCurrentTime(), noteDuration, velocity);
                }
                else if(typeof note === 'number'){
                    audioAPI.playNote(trackName,note, audioAPI.getCurrentTime(), noteDuration, velocity);
                
                }
                else {
                    throw Error('Please insert a valid MIDI note(s) name or value e.g C3 or 60');
                }
            }
        }


        async function setTrackEffect(trackName, effectName, level) {
            const effectType = availableEffects[effectName];
            if(!appliedEffects.includes(effectName)){
                await audioAPI.applyTrackEffect(trackName, effectName, effectType);
                appliedEffects.push(effectName);
            }
        
            const parameters = audioAPI.getAvailableEffectParameters(effectType);
            var effectOptions = {};
            for (let i = 0; i < parameters.length; i++) {
                // console.log(parameters[i].name);
                var parameterValue = parameters[i].name;
                effectOptions[parameterValue] = level;
            }
            // console.log(effectOptions);
            await audioAPI.updateTrackEffect(trackName, effectName, effectOptions);
        }

        function createTrack(trackName) {
            audioAPI.createTrack(trackName);
        }

        function stopAudio() {
            audioAPI.stop();
            audioAPI.clearAllTracks();
            audioAPI.start();
        }
        async function addFxPreset(track, effect) {
            const effectName = EffectsPreset[effect][0];
            await audioAPI.applyTrackEffect(track, effectName, EffectType[effectName]);
            const effectOptions = EffectsPreset[effect][1];
            await audioAPI.updateTrackEffect(track, effectName, effectOptions);
        }

        async function wait(duration) {
            return new Promise(resolve => {
                setTimeout(resolve, duration * 1000);
            })
        }
         // ----------------------------------------------------------------------
         class MusicApp extends Extension {
            constructor(ide) {
                super('MusicApp');
                this.ide = ide;
                const oldStopAllActiveSounds = StageMorph.prototype.runStopScripts;
                StageMorph.prototype.runStopScripts = function(){
                    oldStopAllActiveSounds.call(this);
                    stopAudio();
                };
                this.ide.hideCategory("sound");
            }


            onOpenRole() {
                for (var i =0; i <this.ide.sprites.contents.length; i++){
                    var trackName = this.ide.sprites.contents[i].id;
                    createTrack(trackName);
                    for(const inst of midiInstruments){
                        changeInsturment(trackName, inst);
                        wait(0.001);
                    }
                    changeInsturment(trackName, "Synthesizer");
                }

            }

            onNewSprite(sprite){
                createTrack(sprite.id);
                for(const inst of midiInstruments){
                    changeInsturment(sprite.id, inst);
                }
                changeInsturment(sprite.id, "Synthesizer");
            }

            getMenu() { return {}; }

            getCategories() {
                return [
                    new Extension.Category('music', new Color(148,0,211)),
                ];
            }

             getPalette() {
                 const blocks = [
                     new Extension.Palette.Block('playAudioClip'),
                     new Extension.Palette.Block('playAudioClipforDuration'),
                     new Extension.Palette.Block('stopClips'),
                     new Extension.Palette.Block('setTrackEffect'),
                     new Extension.Palette.Block('clearTrackEffects'),
                     new Extension.Palette.Block('presetEffect'),
                     new Extension.Palette.Block('setInputDevice'),
                     new Extension.Palette.Block('setInstrument'),
                     new Extension.Palette.Block('startRecordingInput'),
                     new Extension.Palette.Block('recordInputForDuration'),
                     new Extension.Palette.Block('stopRecording'),
                     //new Extension.Palette.Block('exportAudio'),
                     new Extension.Palette.Block('playNote'),
                     new Extension.Palette.Block('playNoteWithIntensity'),
                     new Extension.Palette.Block('scales'),
                     new Extension.Palette.Block('chords'),
                     new Extension.Palette.Block('note'),
                     new Extension.Palette.Block('lastRecordedClip'),
                 ];
                 return [
                     new Extension.PaletteCategory('music', blocks, SpriteMorph),
                     new Extension.PaletteCategory('music', blocks, StageMorph),
                 ];
             }

             getBlocks() {
                 function block(name, type, category, spec, defaults, action) {
                     return new Extension.Block(name, type, category, spec, defaults, action)
                 }
                 return [
                     block('playAudioClip', 'command', 'music', 'play audio clip %s', ['clip'], function (audioBuffer) {
                         this.runAsyncFn(async () => {
                             const trackName = this.receiver.id;
                             const duration = await playAudio(audioBuffer, trackName);
                             await wait(duration - .02);
                         }, { args: [], timeout: I32_MAX });
                     }),
                     block('playAudioClipforDuration', 'command', 'music', 'play audio clip for duration %n %s', ['1', 'clip'], function (dur, audioBuffer) {
                         this.runAsyncFn(async () => {
                             const trackName = this.receiver.id;
                             const duration = await playAudioForDuration(audioBuffer, trackName, dur);
                             await wait(duration - Math.max(.02, 0));
                         }, { args: [], timeout: I32_MAX });
                     }),
                     block('playNote', 'command', 'music', 'play %noteDurations note(s) %s', ['', 'C3'], function (noteDuration, input){
                        if(noteDuration === ''){
                            throw Error("Please select a valid note duration")
                        }
                         this.runAsyncFn(async () =>{
                             const trackName = this.receiver.id;
                             if (input.contents === undefined) {
                                 if (typeof input === "string" && (input in availableMidiNotes)) {
                                     const blockduration = await audioAPI.playNote(trackName, availableMidiNotes[input], audioAPI.getCurrentTime(), availableNoteDurations[noteDuration]);
                                     await wait(blockduration);
                                 }
                                 else if (typeof input === 'number') {
                                     const blockduration = await audioAPI.playNote(trackName, input, audioAPI.getCurrentTime(), availableNoteDurations[noteDuration]);
                                     await wait(blockduration);
                                 }
                                 else {
                                     throw Error('Please insert a valid MIDI note(s) name or value e.g C3 or 60');
                                 }
                             }
                             else {
                                 if (input.contents.length === 1) {
                                     const note = input.contents[0];
                                     if (typeof note === "string" && (note in availableMidiNotes)) {
                                         const blockduration = await audioAPI.playNote(trackName, availableMidiNotes[note], audioAPI.getCurrentTime(), availableNoteDurations[noteDuration]);
                                         await wait(blockduration);
                                     }
                                     else if (typeof note === 'number') {
                                         const blockduration = await audioAPI.playNote(trackName, note, audioAPI.getCurrentTime(), availableNoteDurations[noteDuration]);
                                         await wait(blockduration);
                                     }
                                     else {
                                         throw Error('Please insert a valid MIDI note(s) name or value e.g C3 or 60');
                                     }
                                 }
                                 else if (input.contents.length > 1) {
                                     const duration = await playChord(trackName, input.contents, availableNoteDurations[noteDuration]);
                                     await wait(duration);
                                 }
                                 // else if(input.contents.length > 5){
                                 //     const duration = await playScale(trackName, input.contents, availableNoteDurations[noteDuration]);
                                 //     await wait(duration);
                                 // }
                             }
                         }, { args: [], timeout: I32_MAX });
                     }),
                     block('playNoteWithIntensity', 'command', 'music', 'play %noteDurations note(s) %s amp %n', ['', 'C3', '75'], function (noteDuration, input, velocity){
                        if(parseInt(velocity) > 100){
                            throw Error('Amp must be a value between 0 and 100');
                        }
                        if(noteDuration === ''){
                            throw Error("Please select a valid note duration")
                        }
                         this.runAsyncFn(async () =>{
                             const trackName = this.receiver.id;
                             if(input.contents === undefined){
                                if(typeof input === "string" && (input in availableMidiNotes)){
                                    const blockduration = await audioAPI.playNote(trackName,availableMidiNotes[input], audioAPI.getCurrentTime(), availableNoteDurations[noteDuration], parseInt(velocity)/100);
                                    await wait(blockduration);
                                }
                                else if(typeof input === 'number'){
                                    const blockduration = await audioAPI.playNote(trackName,input, audioAPI.getCurrentTime(), availableNoteDurations[noteDuration], parseInt(velocity)/100);
                                    await wait(blockduration);
                                }
                                else {
                                    throw Error('Please insert a valid MIDI note(s) name or value e.g C3 or 60');
                                }
                             }
                             else {
                             if(input.contents.length === 1){
                                const note = input.contents[0];
                                if(typeof note === "string" && (note in availableMidiNotes)){
                                    const blockduration = await audioAPI.playNote(trackName,availableMidiNotes[note], audioAPI.getCurrentTime(), availableNoteDurations[noteDuration], parseInt(velocity)/100);
                                    await wait(blockduration);
                                }
                                else if(typeof note === 'number'){
                                    const blockduration = await audioAPI.playNote(trackName,note, audioAPI.getCurrentTime(), availableNoteDurations[noteDuration], parseInt(velocity)/100);
                                    await wait(blockduration);
                                }
                                else {
                                    throw Error('Please insert a valid MIDI note(s) name or value e.g C3 or 60');
                                }
                            }
                            else if(input.contents.length > 1){
                                const duration = await playChord(trackName, input.contents, availableNoteDurations[noteDuration], parseInt(velocity)/100);
                                await wait(duration);
                            }
                        }
                         },{ args: [], timeout: I32_MAX });
                     }),
                     block('stopClips', 'command', 'music', 'stop all clips', [], function (){
                         stopAudio();
                         this.doStopAll();
                     }),
                     block('note', 'reporter', 'music', 'note %midiNote', [], function (note){

                         if (note.includes('s')) {
                             const startingNote = note.split('s')[0];
                             var startingMidiNumber = availableMidiNotes[startingNote];
                             const reg = new RegExp('s', 'g');
                             const offsetSharp = (note.match(reg) || []).length;
                             return startingMidiNumber + offsetSharp;
                         }
                         else if (note.includes('b')) {
                             const startingNote = note.split('b')[0];
                             var startingMidiNumber = availableMidiNotes[startingNote];
                             const reg = new RegExp('b', 'g');
                             const offsetFlat = (note.match(reg) || []).length;
                             return startingMidiNumber + offsetFlat;
                         }
                         return availableMidiNotes[note];

                    }),
                     block('scales', 'reporter', 'music', 'note %n type %scaleTypes scale', ['', 'Major'], function (rootNote, type){
                        if(type === "Major"){
                            const majorScale = [0,2,4,5,7,9,11,12];
                            majorScale.forEach((element,index) => {
                                majorScale[index] = element + rootNote;
                            });

                             return new List(majorScale);
                         }
                         else if (type === "Minor") {
                             const minorScale = [0, 2, 3, 5, 7, 8, 10, 12];
                             minorScale.forEach((element, index) => {
                                 minorScale[index] = element + rootNote;
                             });
                             return new List(minorScale);
                         }
                         else {
                             throw Error('Please select a valid scale type');
                         }

                   }),
                   block('chords', 'reporter', 'music', 'note %n type %chordTypes chord', ['','Major'], function (rootNote, type){
                    if(type === "Major"){
                        const majorChord = [0,4,7];
                        majorChord.forEach((element,index) => {
                            majorChord[index] = element + rootNote;
                        });

                        return new List(majorChord);
                    }
                    else if (type === "Minor"){
                        const minorChord = [0,3,7];
                        minorChord.forEach((element,index) => {
                            minorChord[index] = element + rootNote;
                        });
                        return new List(minorChord);
                    }
                    else if (type === "Diminished"){
                        const dimChord = [0,3,6];
                        dimChord.forEach((element,index) => {
                            dimChord[index] = element + rootNote;
                        });
                        return new List(dimChord);
                    }
                    else if (type === "Augmented"){
                        const augChord = [0,4,8];
                        augChord.forEach((element,index) => {
                            augChord[index] = element + rootNote;
                        });
                        return new List(augChord);
                    }
                    else if (type === "Major 7th"){
                        const major7Chord = [0,4,7,11];
                        major7Chord.forEach((element,index) => {
                            major7Chord[index] = element + rootNote;
                        });
                        return new List(major7Chord);
                    }
                    else if (type === "Dominant 7th"){
                        const dom7Chord = [0,4,7,10];
                        dom7Chord.forEach((element,index) => {
                            dom7Chord[index] = element + rootNote;
                        });
                        return new List(dom7Chord);
                    }
                    else if (type === "Minor 7th"){
                        const minor7Chord = [0,3,7,10];
                        minor7Chord.forEach((element,index) => {
                            minor7Chord[index] = element + rootNote;
                        });
                        return new List(minor7Chord);
                    }
                    else if (type === "Diminished 7th"){
                        const diminished7Chord = [0,3,6,9];
                        diminished7Chord.forEach((element,index) => {
                            diminished7Chord[index] = element + rootNote;
                        });
                        return new List(diminished7Chord);
                    }
                    else {
                        throw Error( 'Please select a valid chord type');
                    }
                }),
                block('setTrackEffect', 'command', 'music','track %supportedEffects effect to %n %', ['Volume','50'], function (effectName, level){
                    if(parseInt(level) > 100 || level == ''){
                        throw Error('Level must be a value between 1 and 100');
                    }
                    if(effectName == "Echo" && level > 95){
                        throw Error("Echo: value cannot be greater than 95")
                    }
                    if(effectName == "Reverb" && level < 10){
                        throw Error("Reverb: value cannot be less than 10")
                    }
                         this.runAsyncFn(async () =>{
                             const trackName = this.receiver.id;
                             await setTrackEffect(trackName, effectName, parseInt(level)/100);
                         },{ args: [], timeout: I32_MAX });
                     }),
                     block('clearTrackEffects', 'command', 'music', 'clear track effects', [], function () {
                         this.runAsyncFn(async () => {
                             const trackName = this.receiver.id;
                             for (const effectName in availableEffects) {
                                 await audioAPI.removeTrackEffect(trackName, effectName);
                             }
                             appliedEffects = [];
                         }, { args: [], timeout: I32_MAX });
                     }),
                     block('presetEffect', 'command', 'music', 'preset effects %fxPreset %onOff', ['', 'on'], function (effect, status) {
                         const trackName = this.receiver.id;
                         if (effect != '') {
                             if (status == 'on') {
                                 this.runAsyncFn(async () => {
                                     await addFxPreset(trackName, effect);
                                 });
                             } else {
                                 const effectName = EffectsPreset[effect][0];
                                 this.runAsyncFn(async () => {
                                     await audioAPI.removeTrackEffect(trackName, effectName);
                                 });
                             }
                         } else {
                             throw Error('must select an effect');
                         }
                     }),
                     block('setInputDevice', 'command', 'music', 'set input device: %inputDevice', [''], function (device) {
                         const trackName = this.receiver.id;

                         if (device === '')
                             this.runAsyncFn(async () => {
                                 disconnectDevices(trackName);
                             }, { args: [], timeout: I32_MAX });
                         else if (midiDevices.indexOf(device) != -1)
                             midiConnect(trackName, device);
                         else if (audioDevices.indexOf(device != -1))
                             audioConnect(trackName, device);
                         else
                             throw Error('device not found');

                         if (midiInstruments.length > 0)
                             audioAPI.updateInstrument(trackName, midiInstruments[0]).then(() => {
                                 console.log('default instrument set');
                             });
                         else
                             console.log('no default instruments');
                     }),
                     block('startRecordingInput', 'command', 'music', 'start recording input', [], function () {
                         const trackName = this.receiver.id;
                         switch (currentDeviceType) {
                             case 'midi':
                                 lastRecordedClip = audioAPI.recordMidiClip(
                                     trackName, audioAPI.getCurrentTime()
                                 );
                                 break;
                             case 'audio':
                                 lastRecordedClip = audioAPI.recordAudioClip(
                                     trackName, audioAPI.getCurrentTime()
                                 );
                                 break;
                         }
                         recordingInProgress = true;
                         while (recordingInProgress = true);
                     }),
                     block('recordInputForDuration', 'command', 'music', 'record input for %n seconds', [0], function (time) {
                         const trackName = this.receiver.id;
                         switch (currentDeviceType) {
                             case 'midi':
                                 lastRecordedClip = audioAPI.recordMidiClip(
                                     trackName, audioAPI.getCurrentTime(), time
                                 );
                                 break;
                             case 'audio':
                                 lastRecordedClip = audioAPI.recordAudioClip(
                                     trackName, audioAPI.getCurrentTime(), time
                                 );
                                 break;
                         }
                         recordingInProgress = true;
                         while(recordingInProgress = true);
                     }),
                     block('setInstrument', 'command', 'music', 'set instrument %webMidiInstrument', ['Synthesizer'], function (instrument) {
                         const trackName = this.receiver.id;
                         this.runAsyncFn(async () => {
                             await changeInsturment(trackName, instrument);
                         }, { args: [], timeout: I32_MAX });
                     }),
                     block('stopRecording', 'command', 'music', 'stop recording', [], function () {
                         this.runAsyncFn(async () => {
                             await lastRecordedClip.finalize();
                         }, { args: [], timeout: I32_MAX });
                         recordingInProgress = false;
                     }),
                     // block('exportAudio', 'command', 'music', 'export %s as %fileFormats', ['clip'], function (clip, format) {
                     //     this.runAsyncFn(async () => {
                     //         await exportClip(clip, format);
                     //     }, { args: [], timeout: I32_MAX });
                     // }),
                     block('lastRecordedClip', 'reporter', 'music', 'last recorded clip', [], function () {
                         if (recordingInProgress)
                             throw Error('recording in progress');
                         else if (lastRecordedClip == null)
                             throw Error('no clip found');
                         else {
                             return this.runAsyncFn(async () => {
                                 let temp = await clipToSnap(lastRecordedClip);
                                 temp.audioBuffer = await lastRecordedClip.getEncodedData(EncodingType['WAV']);
                                 return temp;
                             }, { args: [], timeout: I32_MAX });
                         }
                         // return this.runAsyncFn(async () => {
                         //     return await clipToSnap(lastRecordedClip);
                         // }, { args: [], timeout: I32_MAX });
                     }),
                 ];
             }
             
            getLabelParts() { 
                function identityMap(s) {
                    const res = {};
                    for (const x of s) res[x] = x;
                    return res;
                }
                function unionMaps(maps) {
                    const res = {};
                    for (const map of maps) {
                        for (const key in map) res[key] = map[key];
                    }
                    return res;
                }
                return [
                new Extension.LabelPart('bpmNotes', () => new InputSlotMorph(
                    null, //text
                    false, // numeric
                    unionMaps([
                        identityMap([ 'Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'Thirtysecondth']),
                    ]),
                    true,
                )),
                new Extension.LabelPart('enabled', () => new InputSlotMorph(
                    null, //text
                    false, //numeric
                    unionMaps([
                        identityMap(['Enabled', 'Disabled']),
                    ]),
                    true,
                )),
                new Extension.LabelPart('effects', () => new InputSlotMorph(
                    null, //text
                    false, //numeric
                    identityMap(Object.keys(availableEffects)),
                    true, //readonly (no arbitrary text)
                )),
                new Extension.LabelPart('supportedEffects', () => new InputSlotMorph(
                    null, //text
                    false, //numeric
                    identityMap(['Volume', 'Delay', 'Reverb', 'Echo', 'Panning']),
                    true, //readonly (no arbitrary text)
                )),
                new Extension.LabelPart('midiNotes', () => new InputSlotMorph(
                    null, //text
                    false, //numeric
                    identityMap(Object.keys(availableMidiNotes)),
                    false, //readonly (no arbitrary text)
                )),
                new Extension.LabelPart('midiNote', () => new InputSlotMorph(
                   null, //text
                   false, //numeric
                   {
                       'C':{
                           '0': identityMap(['C0','C0s','C0b']),
                           '1': identityMap(['C1','C1s','C1b']),
                           '2': identityMap(['C2','C2s','C2b']),
                           '3': identityMap(['C3','C3s','C3b']),
                           '4': identityMap(['C4','C4s','C4b']),
                           '5': identityMap(['C5','C5s','C5b']),
                           '6': identityMap(['C6','C6s','C6b']),
                           '7': identityMap(['C7','C7s','C7b']),
                           '8': identityMap(['C8','C8s','C8b']),
                           '9': identityMap(['C9','C9s','C9b']),
                       },
                       'D':{
                           '0': identityMap(['D0','D0s','D0b']),
                           '1': identityMap(['D1','D1s','D1b']),
                           '2': identityMap(['D2','D2s','D2b']),
                           '3': identityMap(['D3','D3s','D3b']),
                           '4': identityMap(['D4','D4s','D4b']),
                           '5': identityMap(['D5','D5s','D5b']),
                           '6': identityMap(['D6','D6s','D6b']),
                           '7': identityMap(['D7','D7s','D7b']),
                           '8': identityMap(['D8','D8s','D8b']),
                           '9': identityMap(['D9','D9s','D9b']),
                       },
                       'E':{
                           '0': identityMap(['E0','E0s','E0b']),
                           '1': identityMap(['E1','E1s','E1b']),
                           '2': identityMap(['E2','E2s','E2b']),
                           '3': identityMap(['E3','E3s','E3b']),
                           '4': identityMap(['E4','E4s','E4b']),
                           '5': identityMap(['E5','E5s','E5b']),
                           '6': identityMap(['E6','E6s','E6b']),
                           '7': identityMap(['E7','E7s','E7b']),
                           '8': identityMap(['E8','E8s','E8b']),
                           '9': identityMap(['E9','E9s','E9b']),
                       },
                       'F':{
                           '0': identityMap(['F0','F0s','F0b']),
                           '1': identityMap(['F1','F1s','F1b']),
                           '2': identityMap(['F2','F2s','F2b']),
                           '3': identityMap(['F3','F3s','F3b']),
                           '4': identityMap(['F4','F4s','F4b']),
                           '5': identityMap(['F5','F5s','F5b']),
                           '6': identityMap(['F6','F6s','F6b']),
                           '7': identityMap(['F7','F7s','F7b']),
                           '8': identityMap(['F8','F8s','F8b']),
                           '9': identityMap(['F9','F9s','F9b']),
                       },
                       'G':{
                           '0': identityMap(['G0','G0s','G0b']),
                           '1': identityMap(['G1','G1s','G1b']),
                           '2': identityMap(['G2','G2s','G2b']),
                           '3': identityMap(['G3','G3s','G3b']),
                           '4': identityMap(['G4','G4s','G4b']),
                           '5': identityMap(['G5','G5s','G5b']),
                           '6': identityMap(['G6','G6s','G6b']),
                           '7': identityMap(['G7','G7s','G7b']),
                           '8': identityMap(['G8','G8s','G8b']),
                           '9': identityMap(['G9','G9s','G9b']),
                       },
                       'A':{
                           '0': identityMap(['A0','A0s','A0b']),
                           '1': identityMap(['A1','A1s','A1b']),
                           '2': identityMap(['A2','A2s','A2b']),
                           '3': identityMap(['A3','A3s','A3b']),
                           '4': identityMap(['A4','A4s','A4b']),
                           '5': identityMap(['A5','A5s','A5b']),
                           '6': identityMap(['A6','A6s','A6b']),
                           '7': identityMap(['A7','A7s','A7b']),
                           '8': identityMap(['A8','A8s','A8b']),
                           '9': identityMap(['A9','A9s','A9b']),
                       },
                       'B':{
                           '0': identityMap(['B0','B0s','B0b']),
                           '1': identityMap(['B1','B1s','B1b']),
                           '2': identityMap(['B2','B2s','B2b']),
                           '3': identityMap(['B3','B3s','B3b']),
                           '4': identityMap(['B4','B4s','B4b']),
                           '5': identityMap(['B5','B5s','B5b']),
                           '6': identityMap(['B6','B6s','B6b']),
                           '7': identityMap(['B7','B7s','B7b']),
                           '8': identityMap(['B8','B8s','B8b']),
                           '9': identityMap(['B9','B9s','B9b']),
                       },

                   },
                   true, //readonly (no arbitrary text)
               )),
                new Extension.LabelPart('noteDurations', () => new InputSlotMorph(
                    null, //text
                    false, //numeric
                    identityMap(Object.keys(availableNoteDurations)),
                    false, //readonly (no arbitrary text)
                )),
                 new Extension.LabelPart('chordTypes', () => new InputSlotMorph(
                    null, //text
                    false, //numeric
                    identityMap(['Major', 'Minor', 'Diminished', 'Augmented', 'Major 7th', 'Dominant 7th', 'Minor 7th', 'Diminished 7th']),
                    true, //readonly (no arbitrary text)
                )),
                new Extension.LabelPart('scaleTypes', () => new InputSlotMorph(
                    null, //text
                    false, //numeric
                    identityMap(['Major', 'Minor']),
                    true, //readonly (no arbitrary text)
                )),
                 new Extension.LabelPart('fxPreset', () => new InputSlotMorph(
                     null, // text
                     false, //numeric
                     identityMap(['Under Water', 'Telephone', 'Cave', 'Fan Blade']),
                     true, // readonly (no arbitrary text)
                 )),
                 new Extension.LabelPart('onOff', () => new InputSlotMorph(
                     null, // text
                     false, //numeric
                     identityMap(['on', 'off']),
                     true, // readonly (no arbitrary text)
                 )),
                 new Extension.LabelPart('webMidiInstrument', () => new InputSlotMorph(
                     null, // text
                     false, //numeric
                     identityMap(midiInstruments),
                     true, // readonly (no arbitrary text)
                 )),
                 new Extension.LabelPart('fileFormats', () => new InputSlotMorph(
                     null, // text
                     false, //numeric
                     identityMap(['WAV']),
                     true, // readonly (no arbitrary text)
                 )),
                 new Extension.LabelPart('inputDevice', () => new InputSlotMorph(
                     null, // text
                     false, //numeric
                     identityMap(midiDevices.concat(audioDevices)),
                     true, // readonly (no arbitrary text)
                 )),
             ];           
         }

         }
         var element = document.createElement('link');
        element.setAttribute('rel', 'stylesheet');
        element.setAttribute('type', 'text/css');
        element.setAttribute('href', 'https://gsteinltu.github.io/PseudoMorphic/style.css');
        document.head.appendChild(element);

        var scriptElement = document.createElement('script');

        scriptElement.onload = () => {
           var element = createDialog('MusicApp');
           // const canvas = document.createElement('canvas');
           // canvas.id = 'roboscape-canvas';
           // element.querySelector('content').appendChild(canvas);
             element.querySelector('content').innerHTML = 
                         '<div id="waveform"></div><script type="module">import WaveSurfer from \'https://unpkg.com/wavesurfer.js@beta\' const wavesurfer = WaveSurfer.create({container: \'#waveform\', waveColor: \'violet\', progressColor: \'purple\'});      wavesurfer.once(\'interaction\', () => {wavesurfer.play()})</script>';
             setupDialog(element);
           window.externalVariables['musicAppDialog'] = element;
        };
        scriptElement.setAttribute('src', 'https://gsteinltu.github.io/PseudoMorphic/script.js');
        document.head.appendChild(scriptElement);

         NetsBloxExtensions.register(MusicApp);
     })();

})();
