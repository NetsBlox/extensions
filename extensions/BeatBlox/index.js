(function () {

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://hedgecrw.github.io/WebAudioAPI/lib/webAudioAPI.js';
    script.async = false;
    script.onload = () => {
        const audioAPI = new window.WebAudioAPI();
        const I32_MAX = 2147483647;
        const SCHEDULING_WINDOW = 0.02; // seconds
        let midiDevices = [], midiInstruments = [], audioDevices = [];
        let lastRecordedClip = null, recordingInProgress = false, currentDeviceType;
        let appliedEffects = [];
        audioAPI.start();
        const availableEffects = audioAPI.getAvailableEffects();
        const availableNoteDurations = audioAPI.getAvailableNoteDurations();
        const availableNotes = audioAPI.getAvailableNotes();
        audioAPI.getAvailableMidiDevices().then(returnMidiDevice, fail);
        audioAPI.getAvailableAudioInputDevices().then(returnAudioDevice, fail);

        const devRoot = 'http://localhost:9090/extensions/BeatBlox/instruments/';
        const releaseRoot = 'https://extensions.netsblox.org/extensions/BeatBlox/instruments/';
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
                ['cutoffFrequency']: 1800,
                ['resonance']: 10,
            }],
            'Cave': ['Echo', {
                ['feedback']: 0.5,
                ['intensity']: 0.4,
            }],
            'Fan Blade': ['Tremolo', {
                ['tremeloFrequency']: 18,
            }],
        };

        const CHORD_PATTERNS = {
            'Major': [0, 4, 7],
            'Minor': [0, 3, 7],
            'Diminished': [0, 3, 6],
            'Augmented': [0, 4, 8],
            'Major 7th': [0, 4, 7, 11],
            'Dominant 7th': [0, 4, 7, 10],
            'Minor 7th': [0, 3, 7, 10],
            'Diminished 7th': [0, 3, 6, 9],
        };
        const SCALE_PATTERNS = {
            'Major': [0, 2, 4, 5, 7, 9, 11, 12],
            'Minor': [0, 2, 3, 5, 7, 8, 10, 12],
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
        function audioConnect(trackName, device) {
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
         *
         * */
        async function changeInstrument(trackName, instrument) {
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
            const binaryString = window.atob(base64.split(',')[1]);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        }

        async function playClip(trackName, clip, startTime, duration = undefined) {
            const buffer = clip.audioBuffer || base64toArrayBuffer(clip.audio.src);
            return audioAPI.playClip(trackName, buffer, startTime, duration);
        }

        /**
        * Plays an audio clip
        * @param {String} trackName - name of CurrentTrack
        * @param {List} notes - notes to be played
        * @param {Number} startTime - API time at which to start playback
        * @param {Number} noteDuration - duration of note to be played
        * @param {Number} velocity - volume of note to be played
        * @returns An Array Buffer
        */
        async function playChord(trackName, notes, startTime, noteDuration, velocity = undefined) {
            if (notes.length === 0) return 0;

            let ret = Infinity;
            for (const note of notes) {
                ret = Math.min(ret, await audioAPI.playNote(trackName, note, startTime, noteDuration, velocity));
            }
            return ret;
        }

        const NOTE_REGEX = new RegExp('^([a-g][0-9]+)([bs]*)$', 'i');
        function parseNote(note) {
            if (Array.isArray(note)) return note.map((x) => parseNote(x));
            if (note.contents !== undefined) return note.contents.map((x) => parseNote(x));
            if (typeof (note) === 'number') return note;

            if (typeof (note) !== 'string') throw Error(`expected a note, got ${note}`);
            if(note === 'Rest') return availableNotes[note];
    
            const match = note.match(NOTE_REGEX);
            if (!match) throw Error(`expected a note, got ${note}`)

            let base = availableNotes[match[1].toUpperCase()];
            for (const c of match[2]) {
                if (c === 's') base++;
                else if (c === 'b') base--;
                else throw Error('Internal Error');
            }
            console.log(base);
            return base;
        }



        async function setTrackEffect(trackName, effectName, level) {
            const effectType = availableEffects[effectName];
            if (!appliedEffects.includes(effectName)) {
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

        function getEffectValues(trackName,appliedEffects){
            var values = [];
            var twoD = []

            for(let i = 0; i <appliedEffects.length; i++){
                var objectOfParameters = audioAPI.getCurrentTrackEffectParameters(trackName,appliedEffects[i]);
                var valueOfFirstElement = objectOfParameters[Object.keys(objectOfParameters)[0]]
                twoD.push([appliedEffects[i],(valueOfFirstElement*100)]);

            }

            twoD = new List(twoD.map(a => new List(a)));
            return twoD;
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
            appliedEffects.push(effectName);
            const effectOptions = EffectsPreset[effect][1];
            await audioAPI.updateTrackEffect(track, effectName, effectOptions);
        }
        function setupTrack(name) {
            createTrack(name);
            for (const inst of midiInstruments) {
                changeInstrument(name, inst);
            }
            changeInstrument(name, "Synthesizer");
        }
        function setupProcess(proc) {
            if (proc.musicInfo) return;
            proc.musicInfo = {
                t: audioAPI.getCurrentTime(),
            };
        }

        async function wait(duration) {
            return new Promise(resolve => {
                setTimeout(resolve, duration * 1000);
            })
        }
        async function waitUntil(t) {
            await wait(t - audioAPI.getCurrentTime());
        }


        // ----------------------------------------------------------------------
        class MusicApp extends Extension {
            constructor(ide) {
                super('MusicApp');

                this.ide = ide;

                appliedEffects = [];

                const oldStopAllActiveSounds = StageMorph.prototype.runStopScripts;
                StageMorph.prototype.runStopScripts = function () {
                    oldStopAllActiveSounds.call(this);
                    stopAudio();
                };

                ide.hideCategory("sound");
            }

            onOpenRole() {
                //Create Tracks for all sprites
                for (const sprite of this.ide.sprites.contents) {
                    setupTrack(sprite.id);
                }

                //Create Track for the stage
                setupTrack(this.ide.stage.id);
            }

            onNewSprite(sprite) {
                setupTrack(sprite.id);
            }

            getMenu() { return {}; }

            getCategories() {
                return [
                    new Extension.Category('music', new Color(148, 0, 211)),
                ];
            }

            getPalette() {
                const blocks = [
                    new Extension.Palette.Block('setInstrument'),
                    new Extension.Palette.Block('playNote'),
                    new Extension.Palette.Block('playNoteWithAmp'),
                    new Extension.Palette.Block('rest'),
                    '-',
                    new Extension.Palette.Block('playAudioClip'),
                    new Extension.Palette.Block('playAudioClipForDuration'),
                    new Extension.Palette.Block('playSampleForDuration'),
                    new Extension.Palette.Block('stopClips'),
                    '-',
                    new Extension.Palette.Block('presetEffect'),
                    new Extension.Palette.Block('setTrackEffect'),
                    new Extension.Palette.Block('clearTrackEffects'),
                    '-',
                    new Extension.Palette.Block('makeTempo'),
                    '-',
                    new Extension.Palette.Block('appliedEffects').withWatcherToggle(),
                    new Extension.Palette.Block('tempo').withWatcherToggle(),
                    '-',
                    new Extension.Palette.Block('setInputDevice'),
                    new Extension.Palette.Block('startRecordingInput'),
                    new Extension.Palette.Block('startRecordingOutput'),
                    new Extension.Palette.Block('recordOutputForDuration'),
                    new Extension.Palette.Block('stopRecording'),
                    new Extension.Palette.Block('lastRecordedClip'),
                    '-',
                    new Extension.Palette.Block('noteNew'),
                    new Extension.Palette.Block('notes'),
                    new Extension.Palette.Block('chords'),
                    new Extension.Palette.Block('scales'),
                ];
                return [
                    new Extension.PaletteCategory('music', blocks, SpriteMorph),
                    new Extension.PaletteCategory('music', blocks, StageMorph),
                ];
            }

            getBlocks() {
                function playNoteCommon(duration, notes, amp = 100) {
                    if (duration === '') throw Error("Please select a valid note duration");
                    duration = availableNoteDurations[duration];
                    if (!duration) throw Error('unknown note duration');

                    notes = parseNote(notes);
                    if (!Array.isArray(notes)) notes = [notes];
                    if (notes.length === 0) return;

                    amp = parseFloat(amp) / 100;
                    if (!amp || amp < 0 || amp > 1) throw Error('amp must be a number between 0 and 100');

                    setupProcess(this);
                    this.runAsyncFn(async () => {
                        const trackName = this.receiver.id;
                        const t = await playChord(trackName, notes, this.musicInfo.t, duration, amp);
                        this.musicInfo.t += t;
                        await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                    }, { args: [], timeout: I32_MAX });
                }
                return [
                    new Extension.Block('setInstrument', 'command', 'music', 'set instrument %webMidiInstrument', ['Synthesizer'], function (instrument) {
                        if(instrument === '') throw Error(`instrument cannot be empty`);
                        const trackName = this.receiver.id;
                        this.runAsyncFn(async () => {
                            await changeInstrument(trackName, instrument);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playNote', 'command', 'music', 'play %noteDurations %noteDurationsSpecial note(s) %s', ['Quarter','', 'C3'], function (duration,durationSpecial, notes) {
                        playNoteCommon.apply(this, [durationSpecial+duration, notes]);
                    }),
                    new Extension.Block('playNoteWithAmp', 'command', 'music', 'play %noteDurations %noteDurationsSpecial note(s) %s amp %n %', ['Quarter', '', 'C3', '100'], function (duration,durationSpecial, notes, amp) {
                        playNoteCommon.apply(this, [durationSpecial+duration, notes, amp]);
                    }),
                    new Extension.Block('playAudioClip', 'command', 'music', 'play sound %snd', [null], function (clip) {
                        setupProcess(this);
                        if(clip === "") throw Error(`sound cannot be empty`);
                        if(this.receiver.sounds.contents.length){
                            for(let i = 0; i< this.receiver.sounds.contents.length; i++){
                                if(clip === this.receiver.sounds.contents[i].name){
                                    clip = this.receiver.sounds.contents[i];
                                    break;
                                }
                            }

                        }
                        this.runAsyncFn(async () => {
                            const trackName = this.receiver.id;
                            const t = await playClip(trackName, clip, this.musicInfo.t);
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playAudioClipForDuration', 'command', 'music', 'play sound %snd duration %n', [null, 0], function (clip, duration) {
                        setupProcess(this);
                        if(clip === "") throw Error(`sound cannot be empty`);
                        if(this.receiver.sounds.contents.length){
                            for(let i = 0; i< this.receiver.sounds.contents.length; i++){
                                if(clip === this.receiver.sounds.contents[i].name){
                                    clip = this.receiver.sounds.contents[i];
                                    break;
                                }
                            }

                        }
                        this.runAsyncFn(async () => {
                            const trackName = this.receiver.id;
                            const t = await playClip(trackName, clip, this.musicInfo.t, duration);
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playSampleForDuration', 'command', 'music', 'play sound %snd duration %noteDurations %noteDurationsSpecial', [null, 'Quarter', ''], function (clip, duration,durationSpecial) {
                        //Work in Progess..............
                        setupProcess(this);
                        duration = availableNoteDurations[duration];
                        durationSpecial = availableNoteDurations[durationSpecial];
                        console.log(`HERE ARE THE DURATIONS ${duration}`);
                        if(clip === "") throw Error(`sound cannot be empty`);
                        if(this.receiver.sounds.contents.length){
                            for(let i = 0; i< this.receiver.sounds.contents.length; i++){
                                if(clip === this.receiver.sounds.contents[i].name){
                                    clip = this.receiver.sounds.contents[i];
                                    break;
                                }
                            }

                        }
                        this.runAsyncFn(async () => {
                            const trackName = this.receiver.id;
                            const t = await playClip(trackName, clip, this.musicInfo.t, duration+durationSpecial);
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('rest', 'command', 'music', 'rest %noteDurations %noteDurationsSpecial', ['Quarter',''], function (duration,durationSpecial) {
                        playNoteCommon.apply(this, [durationSpecial+duration, 'Rest']);
                    }),
                    new Extension.Block('stopClips', 'command', 'music', 'stop all clips', [], function () {
                        stopAudio();
                        this.doStopAll();
                    }),
                    new Extension.Block('noteNew', 'reporter', 'music', 'note %note', [60], parseNote),
                    new Extension.Block('notes', 'reporter', 'music', 'note %noteNames %octaves %accidentals', ['C', '3', ''], function (noteName, octave, accidental) {
                        var note = noteName+octave;
                        if(accidental === '\u266F') note = noteName+octave+'s';
                        if(accidental === '\u266D') note = noteName+octave+'b';
                        return parseNote(note);

                    }),
                    new Extension.Block('scales', 'reporter', 'music', 'scale %midiNote type %scaleTypes', ['C3', 'Major'], function (rootNote, type) {
                        rootNote = parseNote(rootNote);

                        const pattern = SCALE_PATTERNS[type];
                        if (!pattern) throw Error(`invalid chord type: '${type}'`);

                        return new List(pattern.map((x) => rootNote + x));
                    }),
                    new Extension.Block('chords', 'reporter', 'music', 'chord %midiNote type %chordTypes', ['C3', 'Major'], function (rootNote, type) {
                        rootNote = parseNote(rootNote);

                        const pattern = CHORD_PATTERNS[type];
                        if (!pattern) throw Error(`invalid chord type: '${type}'`);

                        return new List(pattern.map((x) => rootNote + x));
                    }),
                    new Extension.Block('setTrackEffect', 'command', 'music', 'track %supportedEffects effect to %n %', ['Volume', '50'], function (effectName, level) {

                        if (parseInt(level) > 100) level = 100
                        if (parseInt(level) < 0) level = 0
                        if (effectName == "Echo" && level > 95) level = 95
                        if (effectName == "Reverb" && level < 10) level = 10
                        this.runAsyncFn(async () => {
                            const trackName = this.receiver.id;
                            await setTrackEffect(trackName, effectName, parseInt(level) / 100);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('clearTrackEffects', 'command', 'music', 'clear track effects', [], function () {
                        this.runAsyncFn(async () => {
                            const trackName = this.receiver.id;
                            for (const effectName in availableEffects) {
                                await audioAPI.removeTrackEffect(trackName, effectName);
                            }
                            appliedEffects = [];
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('makeTempo','command','music','set tempo %n', [120], function(tempo){
                        audioAPI.updateTempo(4,tempo,4,4)
                    }),
                    new Extension.Block('appliedEffects', 'reporter', 'music', 'applied effects', [], function () {
                        if(appliedEffects.length === 0) {
                            var twoD = []        
                            twoD = new List(twoD.map(a => new List(a)));
                            return twoD;}
                        
                        const trackName = this.id;     
                        return getEffectValues(trackName,appliedEffects);
                    }).for(SpriteMorph,StageMorph),
                    new Extension.Block('tempo', 'reporter', 'music', 'tempo', [], function () {
                        var tempoObject = audioAPI.getTempo();
                        return tempoObject.beatsPerMinute + ' BPM';
                    }).for(SpriteMorph,StageMorph),
                    new Extension.Block('presetEffect', 'command', 'music', 'preset effects %fxPreset %onOff', ['', 'on'], function (effect, status) {
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
                    new Extension.Block('setInputDevice', 'command', 'music', 'set input device: %inputDevice', [''], function (device) {
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
                    new Extension.Block('startRecordingInput', 'command', 'music', 'start recording input', [], function () {
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
                    new Extension.Block('recordInputForDuration', 'command', 'music', 'record input for %n seconds', [0], function (time) {
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
                        while (recordingInProgress = true);
                    }),
                    new Extension.Block('stopRecording', 'command', 'music', 'stop recording', [], function () {
                        this.runAsyncFn(async () => {
                            await lastRecordedClip.finalize();
                        }, { args: [], timeout: I32_MAX });
                        recordingInProgress = false;
                    }),
                    new Extension.Block('startRecordingOutput', 'command', 'music', 'start recording output', [], function () {
                        lastRecordedClip = audioAPI.recordOutput();
                        recordingInProgress = true;
                    }),
                    new Extension.Block('recordOutputForDuration', 'command', 'music', 'record output for %n seconds', [0], function (time) {
                        lastRecordedClip = audioAPI.recordOutput(null, null, time);
                        recordingInProgress = true;
                    }),
                    new Extension.Block('lastRecordedClip', 'reporter', 'music', 'last recorded clip', [], function () {
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
                    new Extension.LabelPart('noteNames', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        identityMap(['C', 'D', 'E', 'F', 'G', 'A', 'B']),
                        true, //readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('octaves', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        identityMap(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
                        true, //readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('accidentals', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        identityMap(['\u266F', '\u266D',]),
                        true, //readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('midiNote', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        {
                            'Rest': 'Rest',
                            'C': {
                                '0': identityMap(['C0bb', 'C0b', 'C0', 'C0s', 'C0ss']),
                                '1': identityMap(['C1bb', 'C1b', 'C1', 'C1s', 'C1ss']),
                                '2': identityMap(['C2bb', 'C2b', 'C2', 'C2s', 'C2ss']),
                                '3': identityMap(['C3bb', 'C3b', 'C3', 'C3s', 'C3ss']),
                                '4': identityMap(['C4bb', 'C4b', 'C4', 'C4s', 'C4ss']),
                                '5': identityMap(['C5bb', 'C5b', 'C5', 'C5s', 'C5ss']),
                                '6': identityMap(['C6bb', 'C6b', 'C6', 'C6s', 'C6ss']),
                                '7': identityMap(['C7bb', 'C7b', 'C7', 'C7s', 'C7ss']),
                                '8': identityMap(['C8bb', 'C8b', 'C8', 'C8s', 'C8ss']),
                                '9': identityMap(['C9bb', 'C9b', 'C9', 'C9s', 'C9ss']),
                            }, 'D': {
                                '0': identityMap(['D0bb', 'D0b', 'D0', 'D0s', 'D0ss']),
                                '1': identityMap(['D1bb', 'D1b', 'D1', 'D1s', 'D1ss']),
                                '2': identityMap(['D2bb', 'D2b', 'D2', 'D2s', 'D2ss']),
                                '3': identityMap(['D3bb', 'D3b', 'D3', 'D3s', 'D3ss']),
                                '4': identityMap(['D4bb', 'D4b', 'D4', 'D4s', 'D4ss']),
                                '5': identityMap(['D5bb', 'D5b', 'D5', 'D5s', 'D5ss']),
                                '6': identityMap(['D6bb', 'D6b', 'D6', 'D6s', 'D6ss']),
                                '7': identityMap(['D7bb', 'D7b', 'D7', 'D7s', 'D7ss']),
                                '8': identityMap(['D8bb', 'D8b', 'D8', 'D8s', 'D8ss']),
                                '9': identityMap(['D9bb', 'D9b', 'D9', 'D9s', 'D9ss']),
                            }, 'E': {
                                '0': identityMap(['E0bb', 'E0b', 'E0', 'E0s', 'E0ss']),
                                '1': identityMap(['E1bb', 'E1b', 'E1', 'E1s', 'E1ss']),
                                '2': identityMap(['E2bb', 'E2b', 'E2', 'E2s', 'E2ss']),
                                '3': identityMap(['E3bb', 'E3b', 'E3', 'E3s', 'E3ss']),
                                '4': identityMap(['E4bb', 'E4b', 'E4', 'E4s', 'E4ss']),
                                '5': identityMap(['E5bb', 'E5b', 'E5', 'E5s', 'E5ss']),
                                '6': identityMap(['E6bb', 'E6b', 'E6', 'E6s', 'E6ss']),
                                '7': identityMap(['E7bb', 'E7b', 'E7', 'E7s', 'E7ss']),
                                '8': identityMap(['E8bb', 'E8b', 'E8', 'E8s', 'E8ss']),
                                '9': identityMap(['E9bb', 'E9b', 'E9', 'E9s', 'E9ss']),
                            }, 'F': {
                                '0': identityMap(['F0bb', 'F0b', 'F0', 'F0s', 'F0ss']),
                                '1': identityMap(['F1bb', 'F1b', 'F1', 'F1s', 'F1ss']),
                                '2': identityMap(['F2bb', 'F2b', 'F2', 'F2s', 'F2ss']),
                                '3': identityMap(['F3bb', 'F3b', 'F3', 'F3s', 'F3ss']),
                                '4': identityMap(['F4bb', 'F4b', 'F4', 'F4s', 'F4ss']),
                                '5': identityMap(['F5bb', 'F5b', 'F5', 'F5s', 'F5ss']),
                                '6': identityMap(['F6bb', 'F6b', 'F6', 'F6s', 'F6ss']),
                                '7': identityMap(['F7bb', 'F7b', 'F7', 'F7s', 'F7ss']),
                                '8': identityMap(['F8bb', 'F8b', 'F8', 'F8s', 'F8ss']),
                                '9': identityMap(['F9bb', 'F9b', 'F9', 'F9s', 'F9ss']),
                            }, 'G': {
                                '0': identityMap(['G0bb', 'G0b', 'G0', 'G0s', 'G0ss']),
                                '1': identityMap(['G1bb', 'G1b', 'G1', 'G1s', 'G1ss']),
                                '2': identityMap(['G2bb', 'G2b', 'G2', 'G2s', 'G2ss']),
                                '3': identityMap(['G3bb', 'G3b', 'G3', 'G3s', 'G3ss']),
                                '4': identityMap(['G4bb', 'G4b', 'G4', 'G4s', 'G4ss']),
                                '5': identityMap(['G5bb', 'G5b', 'G5', 'G5s', 'G5ss']),
                                '6': identityMap(['G6bb', 'G6b', 'G6', 'G6s', 'G6ss']),
                                '7': identityMap(['G7bb', 'G7b', 'G7', 'G7s', 'G7ss']),
                                '8': identityMap(['G8bb', 'G8b', 'G8', 'G8s', 'G8ss']),
                                '9': identityMap(['G9bb', 'G9b', 'G9', 'G9s', 'G9ss']),
                            }, 'A': {
                                '0': identityMap(['A0bb', 'A0b', 'A0', 'A0s', 'A0ss']),
                                '1': identityMap(['A1bb', 'A1b', 'A1', 'A1s', 'A1ss']),
                                '2': identityMap(['A2bb', 'A2b', 'A2', 'A2s', 'A2ss']),
                                '3': identityMap(['A3bb', 'A3b', 'A3', 'A3s', 'A3ss']),
                                '4': identityMap(['A4bb', 'A4b', 'A4', 'A4s', 'A4ss']),
                                '5': identityMap(['A5bb', 'A5b', 'A5', 'A5s', 'A5ss']),
                                '6': identityMap(['A6bb', 'A6b', 'A6', 'A6s', 'A6ss']),
                                '7': identityMap(['A7bb', 'A7b', 'A7', 'A7s', 'A7ss']),
                                '8': identityMap(['A8bb', 'A8b', 'A8', 'A8s', 'A8ss']),
                                '9': identityMap(['A9bb', 'A9b', 'A9', 'A9s', 'A9ss']),
                            }, 'B': {
                                '0': identityMap(['B0bb', 'B0b', 'B0', 'B0s', 'B0ss']),
                                '1': identityMap(['B1bb', 'B1b', 'B1', 'B1s', 'B1ss']),
                                '2': identityMap(['B2bb', 'B2b', 'B2', 'B2s', 'B2ss']),
                                '3': identityMap(['B3bb', 'B3b', 'B3', 'B3s', 'B3ss']),
                                '4': identityMap(['B4bb', 'B4b', 'B4', 'B4s', 'B4ss']),
                                '5': identityMap(['B5bb', 'B5b', 'B5', 'B5s', 'B5ss']),
                                '6': identityMap(['B6bb', 'B6b', 'B6', 'B6s', 'B6ss']),
                                '7': identityMap(['B7bb', 'B7b', 'B7', 'B7s', 'B7ss']),
                                '8': identityMap(['B8bb', 'B8b', 'B8', 'B8s', 'B8ss']),
                                '9': identityMap(['B9bb', 'B9b', 'B9', 'B9s', 'B9ss']),
                            },
                        },
                        false, //readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('noteDurations', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        identityMap(['Whole','Half','Quarter','Eighth','Sixteenth','ThirtySecond','SixtyFourth']),
                        true, //readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('noteDurationsSpecial', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        identityMap(['Dotted','DottedDotted']),
                        true, //readonly (no arbitrary text)
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
        NetsBloxExtensions.register(MusicApp);
    };
    document.body.appendChild(script);

})();