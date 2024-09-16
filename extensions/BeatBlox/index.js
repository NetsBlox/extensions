(function () {
    const I32_MAX = 2147483647;
    const SCHEDULING_WINDOW = 0.02; // seconds

    const PRESET_EFFECTS = {
        'Under Water': ['LowPassFilter',  { 'cutoffFrequency':  500,  'resonance': 12  }],
        'Telephone':   ['HighPassFilter', { 'cutoffFrequency':  1800, 'resonance': 10  }],
        'Cave':        ['Echo',           { 'intensity':        0.4,  'feedback':  0.5 }],
        'Fan Blade':   ['Tremolo',        { 'tremeloFrequency': 18                     }],
    };

    const DRUM_TO_NOTE = {
        'kick': 'A1',
        'kick #2': 'C2',
        'snare': 'G1',
        'side stick snare': 'C#2',
        'open snare': 'E2',
        'closed hi-hat': 'F#2',
        'clap': 'Eb2',
        'tom': 'C3',
        'rack tom': 'B2',
        'floor tom': 'F2',
        'crash': 'Bb2',
        'crash #2': 'E3',
        'ride': 'Eb3',
        'ride #2': 'F3',
        'tamborine': 'F#3',
    };

    function absoluteUrl(relative) {
        const defaultSrc = 'https://extensions.netsblox.org/extensions/BeatBlox/webAudioAPI.js';
        const src = JSON.parse(new URLSearchParams(window.location.search).get('extensions') || '[]').find(x => x.includes('BeatBlox/index.js')) || defaultSrc;
        const res = `${src.substring(0, src.lastIndexOf('/'))}/${relative}`;
        console.log(`resolved ${relative} to ${res}`);
        return res;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.async = false;
    script.src = absoluteUrl('webAudioAPI.js');
    script.onload = () => {
        const audio = new window.WebAudioAPI();

        const availableEffects = audio.getAvailableEffects();
        const availableNoteDurations = audio.getAvailableNoteDurations();
        const availableNotes = audio.getAvailableNotes();
        const availableAnalysisTypes = audio.getAvailableAnalysisTypes();
        const availableKeySignatures = audio.getAvailableKeySignatures();
        const availableEncoders = audio.getAvailableEncoders();
        const availableNoteModifiers = audio.getAvailableNoteModifications()

        let lastRecordedClip = null;
        let currentDeviceType = null;
        let appliedEffects = [];
        let midiDevices = [];
        let audioDevices = [];
        let midiInstruments = [];

        audio.start();

        const instrumentPrefetch = (async () => {
            try {
                midiDevices = (await audio.getAvailableMidiDevices()).map((x) => `${x}---(midi)`);
            } catch (e) {
                console.error('failed to load midi devices', e);
            }

            try {
                audioDevices = await audio.getAvailableAudioInputDevices();
            } catch (e) {
                console.error('failed to load audio input devices', e);
            }

            try {
                midiInstruments = await audio.getAvailableInstruments(absoluteUrl('instruments'));

                const indexOfDrumKit = midiInstruments.indexOf('Drum Kit');
                midiInstruments.splice(indexOfDrumKit, 1);

                console.log('beginning instrument pre-fetch...');
                const tempTrack = '<<<temp-track>>>';
                audio.createTrack(tempTrack);
                await Promise.all(midiInstruments.map((x) => audio.updateInstrument(tempTrack, x)));
                audio.removeTrack(tempTrack);
                console.log('instrument pre-fetch completed');
            } catch (e) {
                console.error('failed to load instruments', e);
            }
        })();

        function connectMidi(trackName, device) {
            if (device !== '') {
                const mDevice = device.replace('---(midi)', '');
                audio.connectMidiDeviceToTrack(trackName, mDevice).then(() => {
                    console.log('Connected to MIDI device!');
                });
                currentDeviceType = 'midi';
            }
        }

        function connectAudioInput(trackName, device) {
            if (device != '') {
                audio.connectAudioInputDeviceToTrack(trackName, device).then(() => {
                    console.log('Connected to audio device!');
                });
                currentDeviceType = 'audio';
            }
        }

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
            } else {
                return value;
            }
        }

        async function disconnectDevices(trackName) {
            console.log('device disconnected');
            if (audioDevices.length > 0)
                await audio.disconnectAudioInputDeviceFromTrack(trackName);
            if (midiDevices.length > 0)
                await audio.disconnectMidiDeviceFromTrack(trackName);
        }

        function decodeBase64(base64) {
            const bin = atob(base64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) {
                bytes[i] = bin.charCodeAt(i);
            }
            return bytes.buffer;
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

        function parseDrumNote(note) {
            if (Array.isArray(note)) return note.map((x) => parseDrumNote(x));
            if (note.contents !== undefined) return note.contents.map((x) => parseDrumNote(x));
            if (typeof (note) === 'number' && Number.isInteger(note)) return note;
            if (typeof (note) !== 'string' || note === '') throw Error(`expected a drum note, got '${note}'`);
            if (note === 'Rest') return availableNotes[note];

            const res = DRUM_TO_NOTE[note.toLowerCase()];
            if (res === undefined) throw Error(`unknown drum sound: "${note}"`);
            return parseNote(res);
        }

        async function setTrackEffect(trackName, effectName, level) {
            const effectType = availableEffects[effectName];
            if (!appliedEffects.includes(trackName + effectName)) {
                await audio.applyTrackEffect(trackName, effectName, effectType);
                appliedEffects.push(trackName + effectName);
            }

            const parameters = audio.getAvailableEffectParameters(effectType);
            const effectOptions = {};
            for (let i = 0; i < parameters.length; i++) {
                effectOptions[parameters[i].name] = level;
            }
            await audio.updateTrackEffect(trackName, effectName, effectOptions);
        }

        function getBPM() {
            var tempoObject = audio.getTempo();
            var bpm = tempoObject.beatsPerMinute
            return bpm;
        }

        function secondsToBeats(seconds, bpm) {
            if (bpm <= 0 || seconds < 0) {
                throw new Error('BPM must be greater than 0 and seconds must be non-negative.');
            }
            return (seconds * bpm) / 60;
        }

        async function arrayBufferToTimeSeries(arrayBuffer) {
            const audioBuffer = await audio.decodeAudioClip(arrayBuffer);
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
                    resolve(audioElement.duration);
                } else {
                    audioElement.addEventListener('loadedmetadata', () => {
                        resolve(audioElement.duration);
                    }, { once: true });
                    audioElement.addEventListener('error', (err) => {
                        reject('Error loading audio metadata');
                    }, { once: true });
                }
            });
        }

        function getEffectValues(trackName, appliedEffects) {
            const res = [];
            for (let i = 0; i < appliedEffects.length; i++) {
                const objectOfParameters = audio.getCurrentTrackEffectParameters(trackName, appliedEffects[i].replace(trackName, ''));
                const valueOfFirstElement = objectOfParameters[Object.keys(objectOfParameters)[0]]
                res.push([appliedEffects[i].replace(trackName, ''), valueOfFirstElement * 100]);

            }
            return snapify(res);
        }

        function setupTrack(name) {
            instrumentPrefetch.then(() => {
                audio.createTrack(name);
                audio.createTrack(name + 'Drum');
                audio.updateInstrument(name, 'Grand Piano');
                audio.updateInstrument(name + 'Drum', 'Drum Kit');
            });
        }
        function setupProcess(proc) {
            if (proc.musicInfo) return;
            proc.musicInfo = {
                t: audio.getCurrentTime() + 0.001,
                mods: [],
            };
        }

        async function wait(duration) {
            return new Promise(resolve => {
                setTimeout(resolve, duration * 1000);
            })
        }
        async function waitUntil(t) {
            await wait(t - audio.getCurrentTime());
        }

        // ----------------------------------------------------------------------

        class MusicApp extends Extension {
            constructor(ide) {
                super('MusicApp');

                this.ide = ide;
                ide.hideCategory('sound');

                const _runStopScripts = StageMorph.prototype.runStopScripts;
                StageMorph.prototype.runStopScripts = function () {
                    _runStopScripts.call(this);
                    audio.clearAllTracks();
                };
            }

            onOpenRole() {
                for (const sprite of this.ide.sprites.contents) {
                    setupTrack(sprite.id);
                }
                setupTrack(this.ide.stage.id);

                audio.updateTempo(4, this.ide.stage.tempo);
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
                    new Extension.Palette.Block('setKey'),
                    new Extension.Palette.Block('setBPM'),
                    '-',
                    new Extension.Palette.Block('playNotes'),
                    new Extension.Palette.Block('playDrums'),
                    new Extension.Palette.Block('rest'),
                    '-',
                    new Extension.Palette.Block('playClip'),
                    '-',
                    new Extension.Palette.Block('noteModifierC'),
                    '-',
                    new Extension.Palette.Block('presetEffect'),
                    new Extension.Palette.Block('setTrackEffect'),
                    new Extension.Palette.Block('clearTrackEffects'),
                    '-',
                    new Extension.Palette.Block('audioAnalysis'),
                    new Extension.Palette.Block('soundMetaData'),
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
                    new Extension.Palette.Block('noteNumber'),
                ];
                return [
                    new Extension.PaletteCategory('music', blocks, SpriteMorph),
                    new Extension.PaletteCategory('music', blocks, StageMorph),
                ];
            }

            getBlocks() {
                return [
                    new Extension.Block('setInstrument', 'command', 'music', 'set instrument %instrument', ['Grand Piano'], function (instrument) {
                        this.runAsyncFn(async () => {
                            setupProcess(this);
                            await instrumentPrefetch;

                            if (midiInstruments.indexOf(instrument) < 0) throw Error(`unknown instrument: "${instrument}"`);

                            await audio.updateInstrument(this.receiver.id, instrument);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('setKey', 'command', 'music', 'set key %keys', ['CMajor'], function (key) {
                        if (availableKeySignatures[key] === undefined) throw Error(`unknown key: '${key}'`);

                        audio.updateKeySignature(availableKeySignatures[key]);
                    }),
                    new Extension.Block('setBPM', 'command', 'music', 'set tempo %n bpm', [60], function (tempo) {
                        tempo = Math.max(tempo, 1);
                        audio.updateTempo(4, tempo, 4, 4);
                        world.children[0].stage.tempo = tempo;
                    }),
                    new Extension.Block('playNotes', 'command', 'music', 'play %newDuration notes %mult%s', ['Quarter', ['C4']], function (durationName, notes) {
                        this.runAsyncFn(async () => {
                            setupProcess(this);
                            await instrumentPrefetch;

                            const duration = availableNoteDurations[durationName];
                            if (!duration) throw Error(`unknown note duration: "${durationName}"`);

                            notes = parseNote(notes);
                            if (!Array.isArray(notes)) notes = [notes];
                            if (notes.length === 0) notes = [parseNote('Rest')];

                            const mods = this.musicInfo.mods.map(x => audio.getModification(availableNoteModifiers[x]));

                            let t = Infinity;
                            for (const note of notes) {
                                t = Math.min(t, await audio.playNote(this.receiver.id, note, this.musicInfo.t, duration, mods));
                            }
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playDrums', 'command', 'music', 'hit %newDuration note drums %mult%drums', ['Quarter', ['Kick']], function (durationName, notes) {
                        this.runAsyncFn(async () => {
                            setupProcess(this);
                            await instrumentPrefetch;

                            const duration = availableNoteDurations[durationName];
                            if (!duration) throw Error(`unknown note duration: "${durationName}"`);

                            notes = parseDrumNote(notes);
                            if (!Array.isArray(notes)) notes = [notes];
                            if (notes.length === 0) notes = [parseDrumNote('Rest')];

                            const mods = this.musicInfo.mods.map(x => audio.getModification(availableNoteModifiers[x]));

                            const t = await audio.playNote(this.receiver.id + 'Drum', parseDrumNote('Rest'), this.musicInfo.t, duration, mods);
                            for (let i = 0; i < notes.length; ++i) {
                                await audio.playNote(this.receiver.id + 'Drum', notes[i], this.musicInfo.t + t * (i / notes.length), duration, mods, true);
                            }
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('rest', 'command', 'music', 'rest %newDuration', ['Quarter'], function (durationName) {
                        this.playNotes(durationName, 'Rest');
                    }),
                    new Extension.Block('playClip', 'command', 'music', 'play sound %snd', [], function (name) {
                        this.runAsyncFn(async () => {
                            setupProcess(this);
                            await instrumentPrefetch;

                            const sound = this.receiver.sounds.contents.find(x => x.name === name);
                            if (!sound) throw Error(`unknown sound: "${name}"`);

                            const buffer = sound.audioBuffer || decodeBase64(sound.audio.src.split(',')[1]);
                            const t = await audio.playClip(this.receiver.id, buffer, this.musicInfo.t);
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),









                    




                    new Extension.Block('noteNumber', 'reporter', 'music', 'note# %s', ['C4'], parseNote),








                    new Extension.Block('presetEffect', 'command', 'music', 'preset %fxPreset effect %b', [], function (effectName, enable) {
                        this.runAsyncFn(async () => {
                            setupProcess(this);
                            await instrumentPrefetch;

                            const [effect, params] = PRESET_EFFECTS[effectName] || [null, null];
                            if (!effect) throw Error(`unknown effect: "${effectName}"`);

                            for (const target of [this.receiver.id, this.receiver.id + 'Drum']) {
                                if (enable) {
                                    await audio.applyTrackEffect(target, effect, availableEffects[effect]);
                                    await audio.updateTrackEffect(target, effect, params);
                                } else {
                                    await audio.removeTrackEffect(target, effect);
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
                                    var buffer = decodeBase64(sound.audio.src.split(',')[1]);
                                    var timeSeries = await arrayBufferToTimeSeries(buffer);
                                    return snapify(timeSeries);
                               }, { args: [], timeout: I32_MAX });
                        }
                        return 'OK';
                    }),
                    new Extension.Block('noteModifierC', 'command', 'music', 'modifier %modifier %c', ['Forte'], function (mod, raw_block) {
                        setupProcess(this);
                        if (!this.context.modFlag) {
                            this.context.modFlag = true;
                            this.musicInfo.mods.push(mod);
                            this.pushContext(raw_block.blockSequence());
                            this.pushContext();
                        } else {
                            this.musicInfo.mods.pop();
                        }
                    }),
                    new Extension.Block('setTrackEffect', 'command', 'music', 'track %effects effect to %n %', ['Delay', '50'], function (effectName, level) {
                        if (parseInt(level) > 100) level = 100
                        if (parseInt(level) < 0) level = 0
                        if (effectName == 'Echo' && level > 95) level = 95
                        if (effectName == 'Reverb' && level < 10) level = 10
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch;
                            const trackName = this.receiver.id;
                            const drumTrackName = trackName+'Drum';
                            await setTrackEffect(trackName, effectName, parseInt(level) / 100);
                            await setTrackEffect(drumTrackName, effectName, parseInt(level) / 100);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('clearTrackEffects', 'command', 'music', 'clear track effects', [], function () {
                        this.runAsyncFn(async () => {
                            await instrumentPrefetch;
                            const trackName = this.receiver.id;
                            const drumTrackName = trackName+'Drum';
                            for (const effectName in availableEffects) {
                                await audio.removeTrackEffect(trackName, effectName);
                                await audio.removeTrackEffect(drumTrackName, effectName);
                            }
                            appliedEffects = [];
                        }, { args: [], timeout: I32_MAX });
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
                    new Extension.Block('setInputDevice', 'command', 'music', 'set input device: %inputDevice', [''], function (device) {
                        const trackName = this.receiver.id;

                        if (device === '')
                            this.runAsyncFn(async () => {
                                disconnectDevices(trackName);
                            }, { args: [], timeout: I32_MAX });
                        else if (midiDevices.indexOf(device) != -1)
                            connectMidi(trackName, device);
                        else if (audioDevices.indexOf(device != -1))
                            connectAudioInput(trackName, device);
                        else
                            throw Error('device not found');

                        if (midiInstruments.length > 0) {
                            audio.updateInstrument(trackName, midiInstruments[0]).then(() => {
                                console.log('default instrument set');
                            });
                        } else {
                            console.log('no default instruments');
                        }
                    }),
                    new Extension.Block('startRecordingInput', 'command', 'music', 'start recording input', [], function () {
                        const trackName = this.receiver.id;
                        switch (currentDeviceType) {
                            case 'midi':
                                lastRecordedClip = audio.recordMidiClip(
                                    trackName, audio.getCurrentTime()
                                );
                                break;
                            case 'audio':
                                lastRecordedClip = audio.recordAudioClip(
                                    trackName, audio.getCurrentTime()
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
                        lastRecordedClip = audio.recordOutput();
                    }),
                    new Extension.Block('recordOutputForDuration', 'command', 'music', 'record output for %n seconds', [0], function (time) {
                        lastRecordedClip = audio.recordOutput(null, null, time);
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
                        return snapify(audio.analyzeAudio(availableAnalysisTypes[ty]));
                    }),
                ];
            }

            getLabelParts() {
                function identityMap(s) {
                    const res = {};
                    for (const x of s) {
                        if (Array.isArray(x)) {
                            res[x[0]] = x[1];
                        } else {
                            res[x] = x;
                        }
                    }
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
                    new Extension.LabelPart('newDuration', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        ((base) => unionMaps([
                            identityMap(base),
                            {
                                'Dotted': identityMap(base.map(x => [x, 'Dotted' + x])),
                                'DottedDotted': identityMap(base.map(x => [x, 'DottedDotted' + x])),
                            },
                        ]))(['Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'ThirtySecond', 'SixtyFourth']),
                        true, // readonly (no arbitrary text)
                    )),





                    new Extension.LabelPart('modifier', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['Piano', 'Forte', 'Accent', 'Staccato', 'Triplet', 'TurnUpper', 'TurnLower']),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('effects', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['Volume','Delay', 'Reverb', 'Echo', 'Panning']),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('duration', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'ThirtySecond', 'SixtyFourth']),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('durationMod', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['Dotted', 'DottedDotted']),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('fxPreset', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['Under Water', 'Telephone', 'Cave', 'Fan Blade']),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('soundMetaData', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(['name', 'duration', 'beats', 'samples']),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('instrument', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(midiInstruments),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('inputDevice', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap([...midiDevices, ...audioDevices]),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('analysisType', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(Object.keys(availableAnalysisTypes)),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('keys', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(Object.keys(availableKeySignatures)),
                        true, // readonly (no arbitrary text)
                    )),
                    new Extension.LabelPart('drums', () => new InputSlotMorph(
                        null, // text
                        false, // numeric
                        identityMap(Object.keys(DRUM_TO_NOTE)),
                        true, // readonly (no arbitrary text)
                    )),
                ];
            }
        }
        NetsBloxExtensions.register(MusicApp);
    };
    document.body.appendChild(script);

})();
