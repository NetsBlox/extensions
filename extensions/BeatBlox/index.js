(function () {
    const script = document.createElement('script');
    const devRootScript = 'http://localhost:9090/extensions/BeatBlox/webAudioAPI.js';
    const releaseRootScript = 'https://extensions.netsblox.org/extensions/BeatBlox/webAudioAPI.js';
    script.type = 'module';
    script.src = window.origin.includes('localhost') ? devRootScript : releaseRootScript;
    script.async = false;
    script.onload = () => {
        let lastRecordedClip = null;
        let currentDeviceType = null;
        let appliedEffects = [];
        const audioAPI = new window.WebAudioAPI();
        const I32_MAX = 2147483647;
        const SCHEDULING_WINDOW = 0.02; // seconds

        const availableEffects = audioAPI.getAvailableEffects();
        const availableNoteDurations = audioAPI.getAvailableNoteDurations();
        const availableNotes = audioAPI.getAvailableNotes();
        const availableAnalysisTypes = audioAPI.getAvailableAnalysisTypes();
        const availableKeySignatures = audioAPI.getAvailableKeySignatures();
        const availableEncoders = audioAPI.getAvailableEncoders();
        const availableNoteModifiers = audioAPI.getAvailableNoteModifications()

        const devRoot = 'http://localhost:9090/extensions/BeatBlox/instruments/';
        const releaseRoot = 'https://extensions.netsblox.org/extensions/BeatBlox/instruments/';
        const instrumentLocation = window.origin.includes('localhost') ? devRoot : releaseRoot;



        let midiDevices = [];
        let audioDevices = [];
        let midiInstruments = [];

        audioAPI.start();

        const instrumentPrefetch = (async () => {
            try {
                midiDevices = (await audioAPI.getAvailableMidiDevices()).map((x) => `${x}---(midi)`);
            } catch (e) {
                console.error('failed to load midi devices', e);
            }

            try {
                audioDevices = await audioAPI.getAvailableAudioInputDevices();
            } catch (e) {
                console.error('failed to load audio input devices', e);
            }

            try {
                midiInstruments = await audioAPI.getAvailableInstruments(instrumentLocation);
                const indexOfDrumKit = midiInstruments.indexOf('Drum Kit');
                midiInstruments.splice(indexOfDrumKit,1);
                console.log('beginning instrument pre-fetch...');
                const tempTrack = '<<<temp-track>>>';
                audioAPI.createTrack(tempTrack);
                await Promise.all(midiInstruments.map((x) => audioAPI.updateInstrument(tempTrack, x)));
                audioAPI.removeTrack(tempTrack);
                console.log('instrument pre-fetch completed');
            } catch (e) {
                console.error('failed to load instruments', e);
            }
        })();

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
                ['tremeloFrequency'] : 18,
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
         * Connects a MIDI device to the WebAudioAPI
         * @param {String} trackName - Name of the Track 
         * @param {String} device - Name of the MIDI device being connected.
         */
        function midiConnect(trackName, device) {
            if (device !== '') {
                const mDevice = device.replace('---(midi)', '');
                audioAPI.connectMidiDeviceToTrack(trackName, mDevice).then(() => {
                    console.log('Connected to MIDI device!');
                });
                currentDeviceType = 'midi';
            }
        }

        /**
         * Connects and audio input device to NetsBlox
         * @param {String} trackName - Name of the Track 
         * @param {String} device - Name of the audio device being connected.
         */
        function audioConnect(trackName, device) {
            if (device != '') {
                audioAPI.connectAudioInputDeviceToTrack(trackName, device).then(() => {
                    console.log('Connected to audio device!');
                });
                currentDeviceType = 'audio';
            }
        }

        /**
         * Converts an AudioClip k to a Snap! Sound.
         * @async
         * @param {AudioClip} clip - The clip being rendered.
         * @returns A Snap! Sound.
         */
        async function clipToSnap(clip) {
            const blob = await clip.getEncodedData(availableEncoders['WAV']);
            const audio = new Audio(URL.createObjectURL(blob, { type: 'audio/wav' }));
            return new Sound(audio, 'netsblox-sound');
        }

        function snapify(value) {
            if (typeof (value.map) === 'function') {
                return new List(value.map((x) => snapify(x)));
            } else if (typeof (value) === 'object') {
                const res = [];
                for (const key in value) res.push(new List([key, snapify(value[key])]));
                return new List(res);
            } else return value;
        }

        function drumToMidiNote(drumName){
            switch (drumName.toLowerCase()) {
                case 'kick':
                    return "A1";
                case 'kick #2':
                    return "C2";
                case 'snare':
                    return "G1";
                case 'side stick snare':
                    return "C#2";
                case 'open snare':
                    return "E2";
                case 'closed hi-hat':
                    return "F#2";
                case 'clap':
                    return "Eb2";
                case 'tom':
                    return "C3";
                case 'rack tom':
                    return "B2";
                case 'floor tom':
                    return "F2";
                case 'crash':
                    return "Bb2";
                case 'crash #2':
                    return "E3";
                case 'ride':
                    return "Eb3";
                case 'ride #2':
                    return "F3";
                case 'tamborine':
                    return "F#3";
                case 'rest':
                    return "Rest";
                default:
                    return drumName;
            }
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
        function base64toArrayBuffer(base64) {
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
        * @returns An Array Buffer
        */
        async function playChord(trackName, notes, startTime, noteDuration, mod = undefined) {
            if (notes.length === 0) return 0;
            let ret = Infinity;
            for (const note of notes) {
                ret = Math.min(ret, await audioAPI.playNote(trackName, note, startTime, noteDuration, mod));
            }
            return ret;
        }

        /**
        * Plays an audio clip
        * @param {String} trackName - name of CurrentTrack
        * @param {List} notes - notes to be played
        * @param {Number} startTime - API time at which to start playback
        * @param {Number} beats - duration of note to be played
        * @returns An Array Buffer
        */
        async function playChordBeats(trackName, notes, startTime, beats, mod = undefined, isDrumNote = false) {
            if (notes.length === 0) return 0;
            let ret = Infinity;
            let beatMultiplier = 60 / getBPM();
            for (const note of notes) {
                ret = Math.min(ret, await audioAPI.playNote(trackName, note, startTime, -[beatMultiplier * beats], mod, isDrumNote));
            }
            return ret;
        }

        function parseNote(note) {
            if (Array.isArray(note)) return note.map((x) => parseNote(x));
            if (note.contents !== undefined) return note.contents.map((x) => parseNote(x));
            if (typeof (note) === 'number' && Number.isInteger(note)) return note;
            if (typeof (note) !== 'string' || note === '') throw Error(`expected a note, got '${note}'`);
            if (note === 'Rest') return availableNotes[note];

            const v = Number(note);
            if (Number.isInteger(v) && note == v) return v;

            const letter = note[0];
            let octave = null;
            let delta = 0;
            let natural = false;
            for (let i = 1; i < note.length; ++i) {
                let v = note[i];
                if (v === '+' || v === '-' || (v >= '0' && v <= '9')) {
                    if (octave != null) throw Error(`expected a note, got '${note}' (multiple octaves listed)`);
                    ++i;
                    for (; i < note.length && note[i] >= '0' && note[i] <= '9'; ++i) v += note[i];
                    --i;
                    octave = parseInt(v);
                } else if (v === 's' || v === '#' || v === '♯') {
                    delta += 1;
                } else if (v === 'b' || v === '♭') {
                    delta -= 1;
                } else if (v === 'n') {
                    natural = true;
                } else {
                    throw Error(`expected a note, got '${note}' (unknown character '${v}')`);
                }
            }
            if (octave == null) throw Error(`expected a note, got '${note}' (missing octave number)`);
            if (natural && delta != 0) throw Error(`naturals cannot be sharp/flat, got '${note}'`);

            const base = availableNotes[`${letter}${octave}`.toUpperCase()];
            if (base === undefined) throw Error(`expected a note, got '${note}'`);

            const off = base + delta;
            if (off <= 0 || off >= 128) throw Error(`Note outside of valid range, got ${note}`);

            return natural ? -off : off;
        }

        function durationToBeats(duration, durationSpecial = ''){
            let playDuration = availableNoteDurations[duration];

            // Regular durations
            if(!durationSpecial){
                return 4 / playDuration;
            } 
            else{
                //Special durations
                if(durationSpecial === 'Dotted') return (4 / playDuration) * 1.5;
                if(durationSpecial === 'DottedDotted') return (4 / playDuration) *1.75;
            }
        }
        
 

        async function setTrackEffect(trackName, effectName, level) {
            const effectType = availableEffects[effectName];
            if (!appliedEffects.includes(trackName + effectName)) {
                await audioAPI.applyTrackEffect(trackName, effectName, effectType);
                appliedEffects.push(trackName + effectName);
            }

            const parameters = audioAPI.getAvailableEffectParameters(effectType);
            const effectOptions = {};
            for (let i = 0; i < parameters.length; i++) {
                effectOptions[parameters[i].name] = level;
            }
            await audioAPI.updateTrackEffect(trackName, effectName, effectOptions);
        }

        function getBPM() {
            var tempoObject = audioAPI.getTempo();
            var bpm = tempoObject.beatsPerMinute
            return bpm;
        }

        /**
        * Convert seconds to beats given a BPM value.
        *
        * @param {number} seconds - The number of seconds to convert.
        * @param {number} bpm - The beats per minute (BPM).
        * @returns {number} - The equivalent number of beats.
        */
        function secondsToBeats(seconds, bpm) {
            if (bpm <= 0 || seconds < 0) {
                throw new Error("BPM must be greater than 0 and seconds must be non-negative.");
            }
            return (seconds * bpm) / 60;
        }

        async function arrayBufferToTimeSeries(arrayBuffer) {
            // Wrap decodeAudioData in a Promise
            const audioBuffer = await audioAPI.decodeAudioClip(arrayBuffer);
            console.log(audioBuffer);
            if (audioBuffer.numberOfChannels > 1) {
                const result = [];
                for (let i = 0; i < audioBuffer.numberOfChannels; i += 1) {
                    result.push(Array.from(audioBuffer.getChannelData(i)));
                }
                return result;
            }
            
            const result = Array.from(audioBuffer.getChannelData(0));
            return result;
        }

        function getAudioObjectDuration(audioElement) {
            return new Promise((resolve, reject) => {
                if (audioElement.readyState >= 1) {
                    // Metadata is already loaded
                    resolve(audioElement.duration);
                } else {
                    // Wait for the metadata to load
                    audioElement.addEventListener('loadedmetadata', () => {
                        resolve(audioElement.duration);
                    }, { once: true });
        
                    // Handle error case
                    audioElement.addEventListener('error', (err) => {
                        reject('Error loading audio metadata');
                    }, { once: true });
                }
            });
        }

        function getEffectValues(trackName, appliedEffects) {
            const res = [];
            for (let i = 0; i < appliedEffects.length; i++) {
                const objectOfParameters = audioAPI.getCurrentTrackEffectParameters(trackName, appliedEffects[i].replace(trackName, ''));
                const valueOfFirstElement = objectOfParameters[Object.keys(objectOfParameters)[0]]
                res.push([appliedEffects[i].replace(trackName, ''), valueOfFirstElement * 100]);

            }
            return snapify(res);
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
            await audioAPI.applyTrackEffect(track, effectName, availableEffects[effectName]);
            appliedEffects.push(effectName);
            const effectOptions = EffectsPreset[effect][1];
            await audioAPI.updateTrackEffect(track, effectName, effectOptions);
        }
        function setupTrack(name) {
            const drumTrackName = name+"Drum";
            instrumentPrefetch.then(() => {
                appliedEffects = [];
                createTrack(name);
                createTrack(drumTrackName);
                audioAPI.updateInstrument(name, 'Synthesizer');
                audioAPI.updateInstrument(drumTrackName,'Drum Kit');
            });
        }
        function setupProcess(proc) {
            if (proc.musicInfo) return;
            proc.musicInfo = {
                t: audioAPI.getCurrentTime() + 0.001,
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

                ide.hideCategory('sound');
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
                    new Extension.Palette.Block('setKeySignature'),
                    new Extension.Palette.Block('makeTempo'),
                    '-',
                    new Extension.Palette.Block('playNote'),
                    new Extension.Palette.Block('rest'),
                    '-',
                    new Extension.Palette.Block('hitDrumsOverDuration'),
                    '-',
                    new Extension.Palette.Block('playAudioClip'),
                    new Extension.Palette.Block('playAudioClipForDuration'),
                    new Extension.Palette.Block('playSampleForDuration'),
                    new Extension.Palette.Block('stopAudio'),
                    '-',
                    new Extension.Palette.Block('soundMetaData'),
                    '-',
                    new Extension.Palette.Block('noteModifierC'),
                    '-',
                    new Extension.Palette.Block('presetEffect'),
                    new Extension.Palette.Block('setTrackEffect'),
                    new Extension.Palette.Block('clearTrackEffects'),
                    '-',
                    new Extension.Palette.Block('audioAnalysis'),
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
                    new Extension.Palette.Block('chords'),
                    new Extension.Palette.Block('scales'),
                ];
                return [
                    new Extension.PaletteCategory('music', blocks, SpriteMorph),
                    new Extension.PaletteCategory('music', blocks, StageMorph),
                ];
            }

            getBlocks() {
                function playNoteCommon(duration, notes, mods = undefined, isDrumNote=false) {
                    setupProcess(this);
                    this.runAsyncFn(async () => {
                        if (duration === '') throw Error('Please select a valid note duration');
                        duration = availableNoteDurations[duration];
                        if (!duration) throw Error('unknown note duration');

                        notes = parseNote(notes);
                        if (!Array.isArray(notes)) notes = [notes];
                        if (notes.length === 0) return;

                        if (this.mods === undefined || this.mods.length == 0)
                            mods = undefined;
                        else {
                            mods = [];
                            for (let i = 0; i < this.mods.length; i++) {
                                mods.push(audioAPI.getModification(availableNoteModifiers[this.mods[i]]));
                            }
                        }
                        await instrumentPrefetch; // wait for all instruments to be loaded
                        const trackName = this.receiver.id;
                        const t = await playChord(trackName, notes, this.musicInfo.t, duration, mods, isDrumNote);
                        this.musicInfo.t += t;
                        await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                }, { args: [], timeout: I32_MAX });
                }
               async function playNoteCommonBeats(trackName,beats, notes, mod = undefined, isDrumNote=false) {
                    if (beats === '') throw Error('Please select a valid beat duration');
                    if(isDrumNote && notes.length > 1){
                        var drumNotes = []
                        for(const k of notes){
                            drumNotes.push(drumToMidiNote(k));
                        }
                        notes = drumNotes;
                    }
                    notes = parseNote(notes);
                    if (!Array.isArray(notes)) notes = [notes];
                    if (notes.length === 0) return;

                    setupProcess(this);
                    await instrumentPrefetch; // wait for all instruments to be loaded
                    const t = await playChordBeats(trackName, notes, this.musicInfo.t, beats, mod, isDrumNote);
                    this.musicInfo.t += t;
                    await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                }
                async function playClipForDuration(trackName,clip, duration){
                    const clipDuration = await getAudioObjectDuration(clip.audio);
                    if(duration > clipDuration) {
                        let remainingDuration = duration;
                        while (remainingDuration > 0){
                            const playingDuration = Math.min(remainingDuration, clipDuration);
                            const t = await playClip(trackName, clip, this.musicInfo.t, playingDuration);
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                            remainingDuration -= playingDuration;
                        } 
                    }
                    else{
                        const t = await playClip(trackName, clip, this.musicInfo.t, duration);
                        this.musicInfo.t += t;
                        await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                    }
                }
                return [
                    new Extension.Block('setInstrument', 'command', 'music', 'set instrument %webMidiInstrument', ['Synthesizer'], function (instrument) {
                        if (instrument === '') throw Error(`instrument cannot be empty`);
                        const trackName = this.receiver.id;
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch; // wait for all instruments to be loaded
                            await audioAPI.updateInstrument(trackName, instrument);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playNote', 'command', 'music', 'play note(s) %s %noteDurations %noteDurationsSpecial ', ['C3', 'Quarter', ''], function (notes,duration, durationSpecial) {
                        if (notes instanceof List) {
                            playNoteCommon.apply(this, [durationSpecial + duration, notes]);
                        } else if(typeof notes === 'object') {
                            var noteName = notes.noteName;
                            var modifier = notes.modifier;
                            playNoteCommon.apply(this, [durationSpecial + duration, noteName, audioAPI.getModification(modifier, 1)]);
                        } else {
                            playNoteCommon.apply(this, [durationSpecial + duration, notes]);
                        }
                    }),
                    new Extension.Block('rest', 'command', 'music', 'rest %noteDurations %noteDurationsSpecial', ['Quarter',''], function (duration, durationSpecial) {
                        playNoteCommon.apply(this, [durationSpecial + duration, 'Rest']);
                    }),
                    new Extension.Block('playAudioClip', 'command', 'music', 'play clip %snd', [null], function (clip) {
                        setupProcess(this);
                        if (clip === '') throw Error(`sound cannot be empty`);
                        if (this.receiver.sounds.contents.length) {
                            for (let i = 0; i < this.receiver.sounds.contents.length; i++) {
                                if (clip === this.receiver.sounds.contents[i].name) {
                                    clip = this.receiver.sounds.contents[i];
                                    break;
                                }
                            }
                        }
                        if(clip instanceof List){
                            const newClip = {}
                            const listArray = clip.contents;
                            const bytes = new Float32Array(listArray);
                            const buffer = ((new AudioContext()).createBuffer(1, listArray.length, 44100));
                            buffer.copyToChannel(bytes,0);
                            newClip.audioBuffer = buffer;
                            clip = newClip;
                        }
                        this.runAsyncFn(async () => {
                            
                            await instrumentPrefetch; // wait for all instruments to be loaded
                            const trackName = this.receiver.id;
                            const t = await playClip(trackName, clip, this.musicInfo.t);
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playAudioClipForDuration', 'command', 'music', 'play clip %snd for duration %n secs', [null, 0], function (clip, duration) {
                        setupProcess(this);
                        if (clip === '') throw Error(`sound cannot be empty`);
                        if (duration <= 0) throw Error(`duration must be greater than 0`);
                        if (this.receiver.sounds.contents.length) {
                            for (let i = 0; i < this.receiver.sounds.contents.length; i++) {
                                if (clip === this.receiver.sounds.contents[i].name) {
                                    clip = this.receiver.sounds.contents[i];
                                    break;
                                }
                            }

                        }
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch; // wait for all instruments to be loaded
                            const trackName = this.receiver.id;
                            await playClipForDuration.apply(this,[trackName,clip,duration]);
           
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playSampleForDuration', 'command', 'music', 'play clip %snd for duration %noteDurations %noteDurationsSpecial', [null, 'Quarter', ''], function (clip, duration, durationSpecial) {
                        setupProcess(this);
                        let playDuration = availableNoteDurations[duration];
                        if (durationSpecial != '') {
                            playDuration = availableNoteDurations[durationSpecial + duration];
                        }
                        if (clip === '') throw Error(`sound cannot be empty`);
                        if (this.receiver.sounds.contents.length) {
                            for (let i = 0; i < this.receiver.sounds.contents.length; i++) {
                                if (clip === this.receiver.sounds.contents[i].name) {
                                    clip = this.receiver.sounds.contents[i];
                                    break;
                                }
                            }
                        }
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch; // wait for all instruments to be loaded
                            const trackName = this.receiver.id;
                            const durationInSecs = audioAPI.convertNoteDurationToSeconds(playDuration);
                            await playClipForDuration.apply(this,[trackName,clip,durationInSecs]);
        
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('stopAudio', 'command', 'music', 'stop all audio', [], function () {
                        stopAudio();
                        this.doStopAll();
                    }),
                    new Extension.Block('hitDrumsOverDuration','command','music','for %noteDurations drum sequence %mult%drums',['Quarter', ['Kick']], function(duration,drum){
                        setupProcess(this);
                        if (drum.contents.length === 0) throw Error(`drum cannot be empty`);
                        if(duration == '') throw Error(`duration cannot be empty`);
                        const durationInBeats = durationToBeats(duration);
                        const numberOfNotes = drum.contents.length;
                        this.runAsyncFn(async () => {
                            const trackName = this.receiver.id;
                            const drumTrackName = trackName+"Drum";
                            for(const k of drum.contents){
                                if(k instanceof List){
                                    await playNoteCommonBeats.apply(this, [drumTrackName,(durationInBeats/numberOfNotes), k.contents,undefined,true]);
                                }
                                else{
                                const noteToPlay = drumToMidiNote(k);
                                const receivedNote = parseNote(noteToPlay);
                                await playNoteCommonBeats.apply(this, [drumTrackName,(durationInBeats/numberOfNotes), receivedNote,undefined,true]);
                                }
                            }
                        }, { args: [], timeout: I32_MAX });
                        
                    }),
                    new Extension.Block('soundMetaData', 'reporter', 'music', '%soundMetaData of sound %snd', ['duration', ''], function (option, sound) {
                        if (sound === '') throw Error(`sound cannot be empty`);
                        
                        for (const element of this.receiver.sounds.contents) {
                            if (sound === element.name) {
                                sound = element;
                                break;
                            }
                        }
                       
                        switch (option) {
                            case 'name':
                                return sound.name;
                            case 'duration':
                                return this.runAsyncFn(async () => {
                                    const duration = await getAudioObjectDuration(sound.audio);
                                    return duration;
                                }, { args: [], timeout: I32_MAX });
                            case 'beats':
                                return this.runAsyncFn(async () => {
                                    var currentBPM = getBPM();
                                    var clipDuration = await getAudioObjectDuration(sound.audio);
                                    return secondsToBeats(clipDuration,currentBPM);
                                }, { args: [], timeout: I32_MAX });
                            case 'samples':
                                return this.runAsyncFn(async () => {
                                    var buffer = base64toArrayBuffer(sound.audio.src);
                                    var timeSeries = await arrayBufferToTimeSeries(buffer);
                                    return snapify(timeSeries);
                               }, { args: [], timeout: I32_MAX });
                        }
                        return "OK";
                    }),
                    new Extension.Block('noteModifierC', 'command', 'music', 'modifier %noteModifiers %c', ['Piano'], function (mod, raw_block) {
                        if (this.mods === undefined)
                            this.mods = [];
                        if (!this.context.modFlag) {
                            this.context.modFlag = true;
                            this.mods.push(mod);
                            this.pushContext(raw_block.blockSequence());
                            this.pushContext();
                        } else {
                            this.mods.pop();
                        }
                    }),
                    new Extension.Block('noteNew', 'reporter', 'music', 'note %note', [60], parseNote),
                    new Extension.Block('scales', 'reporter', 'music', 'scale %midiNote type %scaleTypes', ['C3', 'Major'], function (rootNote, type) {
                        rootNote = parseNote(rootNote);

                        const pattern = SCALE_PATTERNS[type];
                        if (!pattern) throw Error(`invalid chord type: '${type}'`);

                        return snapify(pattern.map((x) => rootNote + x));
                    }),
                    new Extension.Block('chords', 'reporter', 'music', 'chord %midiNote type %chordTypes', ['C3', 'Major'], function (rootNote, type) {
                        rootNote = parseNote(rootNote);

                        const pattern = CHORD_PATTERNS[type];
                        if (!pattern) throw Error(`invalid chord type: '${type}'`);

                        return snapify(pattern.map((x) => rootNote + x));
                    }),
                    new Extension.Block('setTrackEffect', 'command', 'music', 'track %supportedEffects effect to %n %', ['Delay', '50'], function (effectName, level) {
                        if (parseInt(level) > 100) level = 100
                        if (parseInt(level) < 0) level = 0
                        if (effectName == 'Echo' && level > 95) level = 95
                        if (effectName == 'Reverb' && level < 10) level = 10
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch; // wait for all instruments to be loaded
                            const trackName = this.receiver.id;
                            const drumTrackName = trackName+"Drum";
                            await setTrackEffect(trackName, effectName, parseInt(level) / 100);
                            await setTrackEffect(drumTrackName, effectName, parseInt(level) / 100);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('clearTrackEffects', 'command', 'music', 'clear track effects', [], function () {
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch; // wait for all instruments to be loaded
                            const trackName = this.receiver.id;
                            const drumTrackName = trackName+"Drum";
                            for (const effectName in availableEffects) {
                                await audioAPI.removeTrackEffect(trackName, effectName);
                                await audioAPI.removeTrackEffect(drumTrackName, effectName);
                            }
                            appliedEffects = [];
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('makeTempo', 'command', 'music', 'set tempo %n bpm', [120], function (tempo) {
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch; // wait for all instruments to be loaded
                            audioAPI.updateTempo(4, tempo, 4, 4);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('setKeySignature', 'command', 'music', 'set key signature %keySignatures', ['DMajor'], function (key) {
                        if (availableKeySignatures[key] === undefined) throw Error(`unknown key signature: '${key}'`);
                        const currentKeySignature = audioAPI.getKeySignature();
                        if (currentKeySignature != key) {
                            audioAPI.updateKeySignature(availableKeySignatures[key]);
                        }
                        console.log(availableKeySignatures[key]);
                    }),
                    new Extension.Block('appliedEffects', 'reporter', 'music', 'applied effects', [], function () {
                        if (appliedEffects.length === 0) {
                            return new List();
                        }

                        const trackName = this.id;
                        return getEffectValues(trackName, appliedEffects);
                    }).for(SpriteMorph, StageMorph),
                    new Extension.Block('tempo', 'reporter', 'music', 'tempo', [], function () {
                        return getBPM();
                    }).for(SpriteMorph, StageMorph),
                    new Extension.Block('presetEffect', 'command', 'music', 'preset effects %fxPreset %onOff', ['', 'on'], function (effect, status) {
                        const trackName = this.receiver.id;
                        const drumTrackName = trackName+"Drum";
                        if (effect != '') {
                            if (status == 'on') {
                                this.runAsyncFn(async () => {
                                    await instrumentPrefetch; // wait for all instruments to be loaded
                                    await addFxPreset(trackName, effect);
                                    await addFxPreset(drumTrackName, effect);
                                });
                            } else {
                                const effectName = EffectsPreset[effect][0];
                                this.runAsyncFn(async () => {
                                    await instrumentPrefetch; // wait for all instruments to be loaded
                                    await audioAPI.removeTrackEffect(trackName, effectName);
                                    await audioAPI.removeTrackEffect(drumTrackName, effectName);
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
                    }),
                    new Extension.Block('stopRecording', 'command', 'music', 'stop recording', [], function () {
                        this.runAsyncFn(async () => {
                            await lastRecordedClip.finalize();
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('startRecordingOutput', 'command', 'music', 'start recording output', [], function () {
                        lastRecordedClip = audioAPI.recordOutput();
                    }),
                    new Extension.Block('recordOutputForDuration', 'command', 'music', 'record output for %n seconds', [0], function (time) {
                        lastRecordedClip = audioAPI.recordOutput(null, null, time);
                    }),
                    new Extension.Block('lastRecordedClip', 'reporter', 'music', 'last recorded clip', [], function () {
                        if (lastRecordedClip == null) throw Error('no recording found');

                        return this.runAsyncFn(async () => {
                            let temp = await clipToSnap(lastRecordedClip);
                            temp.audioBuffer = await lastRecordedClip.getEncodedData(availableEncoders['WAV']);
                            return temp;
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('audioAnalysis', 'reporter', 'music', 'get output %analysisType', ['TimeSeries'], function (ty) {
                        if (!availableAnalysisTypes[ty]) throw Error(`unknown audio analysis type: '${ty}'`);
                        return snapify(audioAPI.analyzeAudio(availableAnalysisTypes[ty]));
                    }),
                ];
            }

            getLabelParts() {
                function identityMap(s) {
                    const res = {};
                    for (const x of s) res[x] = x;
                    return res;
                }
                return [
                    new Extension.LabelPart('enabled', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        identityMap(['Enabled', 'Disabled']),
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
                        identityMap(['Volume','Delay', 'Reverb', 'Echo', 'Panning']),
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
                        identityMap(['\u266F', '\u266D']),
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
                        identityMap(['Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'ThirtySecond', 'SixtyFourth']),
                        true, //readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('noteDurationsSpecial', () => new InputSlotMorph(
                        null, //text
                        false, //numeric
                        identityMap(['Dotted', 'DottedDotted']),
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
                    new Extension.LabelPart('soundMetaData', () => new InputSlotMorph(
                        null, // text
                        false, //numeric
                        identityMap(['name', 'duration', 'beats', 'samples']),
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
                        identityMap([...midiDevices, ...audioDevices]),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('analysisType', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(Object.keys(availableAnalysisTypes)),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('keySignatures', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(Object.keys(availableKeySignatures)),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('noteModifiers', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['Piano', 'Forte', 'Accent', 'Staccato', 'Triplet', 'TurnUpper', 'TurnLower']),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('drums', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['Kick', 'Kick #2','Snare','Open Snare', 'Side Stick Snare','Closed Hi-Hat','Clap','Tom','Floor Tom','Rack Tom', 'Crash','Crash #2','Ride','Ride #2', 'Tamborine','Rest']),
                        true, // readonly (no arbitrary text)
                    )),
                ];
            }

        }
        NetsBloxExtensions.register(MusicApp);
    };
    document.body.appendChild(script);

})();
