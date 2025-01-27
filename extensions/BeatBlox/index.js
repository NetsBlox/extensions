(function () {
    const I32_MAX = 2147483647;
    const SCHEDULING_WINDOW = 0.02; // seconds

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function lerp(x, a, b) { return (1 - x) * a + x * b; }

    const EFFECT_INFO = {
        'Volume':     { type: 'Volume' ,        identity: 1.0, params: x => ({ 'intensity': clamp(x, 0, 1) }) },
        'Delay':      { type: 'Delay',          identity: 0.0, params: x => ({ 'delay': clamp(x, 0, 1), 'attenuation': 0.5 }) },
        'Reverb':     { type: 'Reverb',         identity: 0.0, params: x => ({ 'decay': 0.3, 'roomSize': 0.1, 'intensity': clamp(x, 0, 1) }) },
        'Echo':       { type: 'Echo',           identity: 0.0, params: x => ({ 'echoTime': 0.5, 'intensity': clamp(x, 0, 1) * 0.4 }) },
        'Panning':    { type: 'Panning',        identity: 0.5, params: x => ({ 'leftToRightRatio': clamp(x, 0, 1) }) },
        'Underwater': { type: 'LowPassFilter',  identity: 0.0, params: x => ({ 'cutoffFrequency': lerp(Math.pow(clamp(x, 0, 1), 0.1666), 22050, 500), 'resonance': 12 }) },
        'Telephone':  { type: 'HighPassFilter', identity: 0.0, params: x => ({ 'cutoffFrequency': Math.pow(clamp(x, 0, 1), 1.4) * 1800, 'resonance': 10 }) },
        'Fan':        { type: 'Tremolo',        identity: 0.0, params: x => ({ 'rate': 15, 'intensity': Math.pow(clamp(x, 0, 1), 0.7) }) },
    };

    const ANALYSIS_INFO = {
        'samples':  { type: 'TimeSeries',    transform: x => Array.from(x).map(v => (v - 128) / 128) },
        'spectrum': { type: 'PowerSpectrum', transform: x => Array.from(x).map(v => v / 255) }
    };

    const DRUM_TO_NOTE = {
        'kick':       'A1',  'kick #2':       'C2',  'snare':      'G1',  'side stick snare': 'C#2',
        'open snare': 'E2',  'closed hi-hat': 'F#2', 'clap':       'Eb2', 'tom':              'C3',
        'rack tom':   'B2',  'floor tom':     'F2',  'crash':      'Bb2', 'crash #2':         'E3',
        'ride':       'Eb3', 'ride #2':       'F3',  'tamborine':  'F#3',
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

    const MODIFIERS_ALIASES = {
        'Grace': 'GraceAppoggiatura',
        'Tuplet 3:2': 'Triplet',
        'Tuplet 5:4': 'Quintuplet',
        'Tuplet 6:4': 'Sextuplet',
        'Tuplet 7:4': 'Septuplet',
    };

    function absoluteUrl(relative) {
        const defaultSrc = 'https://extensions.netsblox.org/extensions/BeatBlox/webAudioAPI.js';
        const src = JSON.parse(new URLSearchParams(window.location.search).get('extensions') || '[]').find(x => x.includes('BeatBlox/index.js')) || defaultSrc;
        const res = `${src.substring(0, src.lastIndexOf('/'))}/${relative}`;
        console.log(`resolved '${relative}' to ${res}`);
        return res;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.async = false;
    script.src = absoluteUrl('webAudioAPI.js');
    script.onload = () => {
        const audio = new window.WebAudioAPI();

        const DURATIONS = audio.getAvailableNoteDurations();
        const MODIFIERS = audio.getAvailableNoteModifications();
        const ANALYSES = audio.getAvailableAnalysisTypes();
        const ENCODERS = audio.getAvailableEncoders();
        const EFFECTS = audio.getAvailableEffects();
        const NOTES = audio.getAvailableNotes();
        const KEYS = audio.getAvailableKeySignatures();

        let INPUT_DEVICES = [];
        let MIDI_DEVICES = [];
        let INSTRUMENTS = [];

        let connectedDevice = null;
        let activeRecording = null;

        function applyAliases(obj, aliases) {
            for (const k in aliases) {
                const v = aliases[k];
                if (obj[k] === undefined && obj[v] !== undefined) {
                    obj[k] = obj[v];
                }
            }
        }

        applyAliases(MODIFIERS, MODIFIERS_ALIASES);

        audio.start();

        const PREFETCH = (async () => {
            try {
                MIDI_DEVICES = (await audio.getAvailableMidiDevices()).map(x => `${x}---(midi)`);
            } catch (e) {
                console.error('failed to load midi devices', e);
            }

            try {
                INPUT_DEVICES = await audio.getAvailableAudioInputDevices();
            } catch (e) {
                console.error('failed to load audio input devices', e);
            }

            try {
                INSTRUMENTS = await audio.getAvailableInstruments(absoluteUrl('instruments'));

                console.log('beginning instrument pre-fetch...');
                const tempTrack = '<<<temp-track>>>';
                audio.createTrack(tempTrack);
                await Promise.all(INSTRUMENTS.map(x => audio.updateInstrument(tempTrack, x)));
                audio.removeTrack(tempTrack);
                console.log('instrument pre-fetch completed');

                const p = INSTRUMENTS.indexOf('Drum Kit');
                if (p >= 0) INSTRUMENTS.splice(p, 1);
            } catch (e) {
                console.error('failed to load instruments', e);
            }
        })();

        function flatten(arr) {
            const res = [];
            function f(v) {
                if (Array.isArray(v)) {
                    for (const u of v) f(u);
                } else {
                    res.push(v);
                }
            }
            f(arr);
            return res;
        }

        function snapify(value) {
            if (typeof (value.map) === 'function') {
                return new List((Array.isArray(value) ? value : Array.from(value)).map(x => snapify(x)));
            } else if (typeof (value) === 'object') {
                const res = [];
                for (const key in value) {
                    res.push(new List([key, snapify(value[key])]));
                }
                return new List(res);
            } else {
                return value;
            }
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
            if (Array.isArray(note)) return note.map(x => parseNote(x));
            if (note.contents !== undefined) return note.contents.map(x => parseNote(x));
            if (typeof (note) === 'number' && Number.isInteger(note)) return note;
            if (typeof (note) !== 'string' || note === '') throw Error(`expected a note, got '${note}'`);
            if (note.toLowerCase() === 'rest') return NOTES['Rest'];

            const v = Number(note);
            if (Number.isInteger(v) && note == v) return v;

            const letter = note[0];
            let octave = null;
            let delta = 0;
            let accidental = false;
            for (let i = 1; i < note.length; ++i) {
                let v = note[i];
                if (v === '+' || v === '-' || (v >= '0' && v <= '9')) {
                    if (octave != null) throw Error(`expected a note, got '${note}' (multiple octaves listed)`);
                    ++i;
                    for (; i < note.length && note[i] >= '0' && note[i] <= '9'; ++i) {
                        v += note[i];
                    }
                    --i;
                    octave = parseInt(v);
                } else if (v === 's' || v === '#' || v === '♯') {
                    delta += 1;
                    accidental = true;
                } else if (v === 'b' || v === '♭') {
                    delta -= 1;
                    accidental = true;
                } else if (v === 'n') {
                    accidental = true;
                } else {
                    throw Error(`expected a note, got '${note}' (unknown character '${v}')`);
                }
            }
            if (octave == null) throw Error(`expected a note, got '${note}' (missing octave number)`);

            const base = NOTES[`${letter}${octave}`.toUpperCase()];
            if (base === undefined) throw Error(`expected a note, got '${note}'`);

            const off = base + delta;
            if (off <= 0 || off >= 128) throw Error(`Note outside of valid range, got ${note}`);

            return accidental ? -off : off;
        }

        function parseDrumNote(note) {
            if (Array.isArray(note)) return note.map(x => parseDrumNote(x));
            if (note.contents !== undefined) return note.contents.map(x => parseDrumNote(x));
            if (typeof (note) === 'number' && Number.isInteger(note)) return note;
            if (typeof (note) !== 'string' || note === '') throw Error(`expected a drum note, got '${note}'`);
            if (note.toLowerCase() === 'rest') return NOTES['Rest'];

            const res = DRUM_TO_NOTE[note.toLowerCase()];
            if (res === undefined) throw Error(`unknown drum sound: "${note}"`);
            return parseNote(res);
        }

        async function setupEntity(entity) {
            if (!(entity instanceof SpriteMorph) && !(entity instanceof StageMorph)) throw Error('internal error');

            if (entity.musicInfo === undefined) {
                entity.musicInfo = {
                    effects: {},
                };

                audio.createTrack(entity.id);
                audio.createTrack(entity.id + 'Drum');

                await PREFETCH;
                await audio.updateInstrument(entity.id, 'Grand Piano');
                await audio.updateInstrument(entity.id + 'Drum', 'Drum Kit');
            }
        }

        function setupProcess(proc) {
            if (!(proc instanceof Process)) throw Error('internal error');

            if (proc.musicInfo === undefined) {
                proc.musicInfo = {
                    t: audio.getCurrentTime() + SCHEDULING_WINDOW,
                    mods: [],
                };
            }
        }

        async function wait(duration) {
            return duration <= 0 ? undefined : new Promise(resolve => setTimeout(resolve, duration * 1000));
        }

        async function waitUntil(t) {
            await wait(t - audio.getCurrentTime());
        }

        // ----------------------------------------------------------------------

        class BeatBlox extends Extension {
            constructor(ide) {
                super('BeatBlox');

                this.ide = ide;
                ide.hideCategory('sound');

                (async () => {
                    while (true) {
                        await wait(0.05);
                        const a = SpriteMorph.prototype.categories.indexOf('sound');
                        const b = SpriteMorph.prototype.categories.indexOf('music');
                        if (a >= 0 && b >= 0) {
                            const t = SpriteMorph.prototype.categories[a];
                            SpriteMorph.prototype.categories[a] = SpriteMorph.prototype.categories[b];
                            SpriteMorph.prototype.categories[b] = t;
                            ide.createCategories();
                            ide.createPaletteHandle();
                            ide.fixLayout();
                            break;
                        }
                    }
                })();

                const _runStopScripts = StageMorph.prototype.runStopScripts;
                StageMorph.prototype.runStopScripts = function () {
                    _runStopScripts.call(this);
                    audio.clearAllTracks();
                };
            }

            onOpenRole() {
                audio.updateTempo(4, this.ide.stage.tempo);
            }

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
                    new Extension.Palette.Block('getBPM'),
                    '-',
                    new Extension.Palette.Block('playNotes'),
                    new Extension.Palette.Block('playDrums'),
                    new Extension.Palette.Block('rest'),
                    new Extension.Palette.Block('noteMod'),
                    new Extension.Palette.Block('tieDuration'),
                    new Extension.Palette.Block('customBeat'),
                    '-',
                    new Extension.Palette.Block('noteNumber'),
                    new Extension.Palette.Block('chordNotes'),
                    new Extension.Palette.Block('scaleNotes'),
                    '-',
                    new Extension.Palette.Block('playClip'),
                    new Extension.Palette.Block('queryClip'),
                    new Extension.Palette.Block('audioAnalysis'),
                    new Extension.Palette.Block('createClip'),
                    '-',
                    new Extension.Palette.Block('setAudioEffect'),
                    new Extension.Palette.Block('getAudioEffect'),
                    new Extension.Palette.Block('clearAudioEffects'),
                    '-',
                    new Extension.Palette.Block('setAudioInput'),
                    new Extension.Palette.Block('startRecording'),
                    new Extension.Palette.Block('finishRecording'),
                    new Extension.Palette.Block('isRecording'),
                ];
                return [
                    new Extension.PaletteCategory('music', blocks, SpriteMorph),
                    new Extension.PaletteCategory('music', blocks, StageMorph),
                ];
            }

            getBlocks() {
                return [
                    new Extension.Block('setInstrument', 'command', 'music', 'set instrument %instrument', ['Grand Piano'], function (instrument) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            if (INSTRUMENTS.indexOf(instrument) < 0) throw Error(`unknown instrument: "${instrument}"`);

                            await audio.updateInstrument(this.receiver.id, instrument);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('setKey', 'command', 'music', 'set key %keySig', ['CMajor'], function (key) {
                        if (KEYS[key] === undefined) throw Error(`unknown key: '${key}'`);
                        audio.updateKeySignature(KEYS[key]);
                    }),
                    new Extension.Block('setBPM', 'command', 'music', 'set tempo %n bpm', [60], function (tempo) {
                        tempo = Math.max(tempo, 1);
                        audio.updateTempo(4, tempo, 4, 4);
                        world.children[0].stage.tempo = tempo;
                    }),
                    new Extension.Block('getBPM', 'reporter', 'music', 'tempo', [], function () {
                        return audio.getTempo().beatsPerMinute;
                    }),
                    new Extension.Block('playNotes', 'command', 'music', 'play %noteDuration note %mult%s', ['Quarter', ['C4']], function (duration, notes) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            notes = parseNote(notes);
                            if (!Array.isArray(notes)) notes = [notes];
                            if (notes.length === 0) notes = [parseNote('Rest')];
                            notes = flatten(notes);

                            if (duration.contents !== undefined) duration = duration.contents;
                            if (!Array.isArray(duration)) duration = notes.map(() => duration);
                            if (duration.length !== notes.length) throw Error('number of durations and notes must match');
                            if (duration.some(x => typeof(x) !== 'string')) throw Error('unknown note duration');
                            duration = duration.map(x => x.split('+').filter(y => y.length !== 0));
                            if (duration.some(x => x.some(y => DURATIONS[y] === undefined))) throw Error('unknown note duration');

                            const mods = this.musicInfo.mods.map(x => audio.getModification(MODIFIERS[x]));

                            let t = Infinity;
                            for (let i = 0; i < notes.length; ++i) {
                                let tt = 0;
                                for (let j = 0; j < duration[i].length; ++j) {
                                    const m = j === duration[i].length - 1 ? mods : mods.concat([ audio.getModification(MODIFIERS['Tie']) ]);
                                    tt += await audio.playNote(this.receiver.id, notes[i], this.musicInfo.t + tt, DURATIONS[duration[i][j]], m);
                                }
                                t = Math.min(t, tt);
                            }
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('playDrums', 'command', 'music', 'hit %noteDuration note drums %mult%drum', ['Quarter', ['kick']], function (duration, notes) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            notes = parseDrumNote(notes);
                            if (!Array.isArray(notes)) notes = [notes];
                            if (notes.length === 0) notes = [parseDrumNote('Rest')];
                            notes = flatten(notes);

                            if (DURATIONS[duration] === undefined) throw Error(`unknown note duration: "${duration}"`);

                            const mods = this.musicInfo.mods.map(x => audio.getModification(MODIFIERS[x]));

                            const t = await audio.playNote(this.receiver.id + 'Drum', parseDrumNote('Rest'), this.musicInfo.t, DURATIONS[duration], mods);
                            for (let i = 0; i < notes.length; ++i) {
                                await audio.playNote(this.receiver.id + 'Drum', notes[i], this.musicInfo.t + t * (i / notes.length), DURATIONS[duration], mods, true);
                            }
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('rest', 'command', 'music', 'rest %noteDuration', ['Quarter'], function (duration) {
                        this.playNotes(duration, 'Rest');
                    }),
                    new Extension.Block('noteMod', 'command', 'music', 'note modifiers %mult%noteModifier %c', [['TurnUpper']], function (mods, code) {
                        setupProcess(this);

                        if (mods.contents !== undefined) mods = mods.contents;
                        if (!Array.isArray(mods)) mods = [mods];
                        if (mods.some(x => MODIFIERS[x] === undefined)) throw Error('unknown note modifier');

                        if (!this.context.modInfo) {
                            this.context.modInfo = { count: mods.length };

                            for (const mod of mods) {
                                this.musicInfo.mods.push(mod);
                            }

                            this.pushContext(code?.blockSequence() || []);
                            this.pushContext();
                        } else {
                            for (let i = 0; i < this.context.modInfo.count; ++i) {
                                this.musicInfo.mods.pop();
                            }
                        }
                    }),
                    new Extension.Block('tieDuration', 'reporter', 'music', 'tie %mult%noteDuration', [['Quarter']], durations => durations.contents.map(x => x.toString()).filter(x => x.length !== 0).join('+')),
                    new Extension.Block('customBeat', 'command', 'music', 'custom beat %drumGridOption', ['edit'], function (option) { 
                        if (option === 'edit') {
                            showDialog(beatGrid);
                            return;
                        }
                        const track = window.BeatGrid.getGridInfo();
                        const duration = window.BeatGrid.getBeatDivision();
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            const mods = this.musicInfo.mods.map(x => audio.getModification(MODIFIERS[x]));

                            const t = await audio.playNote(this.receiver.id + 'Drum', parseDrumNote('Rest'), this.musicInfo.t, DURATIONS[duration], mods, true);
                            for (let i = 0; i < track.length; ++i) {
                                let notes = parseDrumNote(track[i]);
                                if (!Array.isArray(notes)) notes = [notes];
                                if (notes.length === 0) notes = [parseDrumNote('Rest')];

                                let chord = notes.map(n => [n, DURATIONS[duration], []]);
                                console.log(chord);
                                await audio.playChord(this.receiver.id + 'Drum', chord, this.musicInfo.t + t * i, mods, true);
                            }
                            this.musicInfo.t += (t * track.length);
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('noteNumber', 'reporter', 'music', 'note# %s', ['C4'], note => snapify(parseNote(note))),
                    new Extension.Block('chordNotes', 'reporter', 'music', '%s %chordType chord', ['C4', 'Major'], function (note, type) {
                        if (CHORD_PATTERNS[type] === undefined) throw Error(`unknown chord type: '${type}'`);
                        function f(b) { return b.map ? b.map(f) : CHORD_PATTERNS[type].map(x => -(x + Math.abs(b))); }
                        return snapify(f(parseNote(note)));
                    }),
                    new Extension.Block('scaleNotes', 'reporter', 'music', '%s %scaleType scale', ['C4', 'Major'], function (note, type) {
                        if (SCALE_PATTERNS[type] === undefined) throw Error(`unknown scale type: '${type}'`);
                        function f(b) { return b.map ? b.map(f) : SCALE_PATTERNS[type].map(x => -(x + Math.abs(b))); }
                        return snapify(f(parseNote(note)));
                    }),
                    new Extension.Block('playClip', 'command', 'music', 'play sound %snd', [], function (rawSound) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            const sound = typeof(rawSound) === 'string' ? this.receiver.sounds.contents.find(x => x.name === rawSound) : rawSound;
                            if (!sound) throw Error(typeof(rawSound) === 'string' ? `unknown sound: "${rawSound}"` : 'input must be a sound');

                            const buffer = sound.audioBuffer || decodeBase64(sound.audio.src.split(',')[1]);
                            const t = await audio.playClip(this.receiver.id, buffer, this.musicInfo.t);
                            this.musicInfo.t += t;
                            await waitUntil(this.musicInfo.t - SCHEDULING_WINDOW);
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('queryClip', 'reporter', 'music', '%audioQuery of sound %snd', ['samples'], function (query, rawSound) {
                        return this.runAsyncFn(async () => {
                            const sound = typeof(rawSound) === 'string' ? this.receiver.sounds.contents.find(x => x.name === rawSound) : rawSound;
                            if (!sound) throw Error(typeof(rawSound) === 'string' ? `unknown sound: "${rawSound}"` : 'input must be a sound');

                            if (query === 'name') {
                                return sound.name || 'untitled';
                            } else if (query === 'duration') {
                                return await new Promise((resolve, reject) => {
                                    sound.audio.addEventListener('loadedmetadata', () => resolve(sound.audio.duration), { once: true });
                                    sound.audio.addEventListener('error', () => reject('Error loading audio metadata'), { once: true });
                                    if (sound.audio.readyState >= 1) return resolve(sound.audio.duration);
                                });
                            } else if (query === 'samples') {
                                const buffer = sound.audioBuffer || decodeBase64(sound.audio.src.split(',')[1]);
                                const decoded = await audio.decodeAudioClip(buffer);

                                const res = [];
                                for (let i = 0; i < decoded.numberOfChannels; ++i) {
                                    res.push(Array.from(decoded.getChannelData(i)));
                                }
                                return snapify(res);
                            } else if (query === 'sample rate') {
                                const buffer = sound.audioBuffer || decodeBase64(sound.audio.src.split(',')[1]);
                                const decoded = await audio.decodeAudioClip(buffer);
                                return decoded.sampleRate;
                            } else {
                                throw Error(`unknown sound property: "${query}"`);
                            }
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('audioAnalysis', 'reporter', 'music', 'output %audioAnalysis', ['samples'], function (analysis) {
                        const { type, transform } = ANALYSIS_INFO[analysis] || {};
                        if (type === undefined || transform === undefined) throw Error(`unknown audio analysis type: "${analysis}"`);

                        return snapify(transform(audio.analyzeAudio(ANALYSES[type])));
                    }),
                    new Extension.Block('createClip', 'reporter', 'music', 'samples %l at %n Hz', [null, 44100], function (samples, sampleRate) {
                        return this.runAsyncFn(async () => {
                            sampleRate = +sampleRate;
                            if (isNaN(sampleRate) || !isFinite(sampleRate) || sampleRate < 1) throw Error('invalid sample rate');

                            if (samples.contents !== undefined) samples = samples.contents;
                            if (!Array.isArray(samples)) throw Error(`expected a list, got ${typeof(samples)}`);
                            if (samples.every(x => x.contents === undefined && !Array.isArray(x))) samples = [samples];
                            samples = [...samples];

                            let maxLen = 0;
                            for (let i = 0; i < samples.length; ++i) {
                                if (samples[i].contents !== undefined) samples[i] = samples[i].contents;
                                if (!Array.isArray(samples[i])) throw Error(`expected a list, got ${typeof(samples[i])}`);
                                samples[i] = samples[i].map(x => +x);
                                if (samples[i].some(x => isNaN(x) || !isFinite(x))) throw Error('samples must be numbers');
                                maxLen = Math.max(maxLen, samples[i].length);
                            }
                            for (const channel of samples) {
                                for (let i = channel.length; i < maxLen; ++i) {
                                    channel.push(0);
                                }
                            }

                            const buffer = audio.createAudioBufferFromSamples(sampleRate, samples);
                            const blob = await audio.encodeAudioAs(ENCODERS['WAV'], buffer);
                            const res = new Sound(new Audio(URL.createObjectURL(blob, { type: 'audio/wav' })), 'netsblox-sound');
                            res.audioBuffer = blob;
                            return res;
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('setAudioEffect', 'command', 'music', 'set %audioEffect effect to %n %', ['Volume', 100], function (effect, rawValue) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            const { type, params } = EFFECT_INFO[effect] || {};
                            if (type === undefined || params === undefined) throw Error(`unknown effect: "${effect}"`);

                            const value = rawValue / 100;
                            if (isNaN(value)) throw Error(`expected a number, got "${rawValue}"`);

                            const targets = [this.receiver.id, this.receiver.id + 'Drum'];
                            if (this.receiver.musicInfo.effects[effect] === undefined) {
                                for (const target of targets) {
                                    await audio.applyTrackEffect(target, effect, EFFECTS[type]);
                                }
                            }
                            this.receiver.musicInfo.effects[effect] = value;
                            for (const target of targets) {
                                await audio.updateTrackEffect(target, effect, params(value));
                            }
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('getAudioEffect', 'reporter', 'music', 'get %audioEffectAug effect', ['Volume'], function (effect) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            const getSingle = effect => {
                                const { identity } = EFFECT_INFO[effect] || {};
                                if (identity === undefined) throw Error(`unknown effect: "${effect}"`);

                                return { value: this.receiver.musicInfo.effects[effect] ?? identity, identity };
                            };

                            if (effect === 'every') {
                                return snapify(Object.keys(EFFECT_INFO).map(x => [x, 100 * getSingle(x).value]));
                            } else if (effect === 'every active') {
                                return snapify(Object.keys(EFFECT_INFO).map(x => [x, getSingle(x)]).filter(x => x[1].value !== x[1].identity).map(x => [x[0], 100 * x[1].value]));
                            } else {
                                return 100 * getSingle(effect).value;
                            }
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('clearAudioEffects', 'command', 'music', 'clear audio effects', [], function () {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            for (const effect in EFFECT_INFO) {
                                for (const target of [this.receiver.id, this.receiver.id + 'Drum']) {
                                    audio.removeTrackEffect(target, effect);
                                }
                            }
                            this.receiver.musicInfo.effects = {};
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('setAudioInput', 'command', 'music', 'use input %audioInput', [], function (device) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            if (device === '') {
                                await audio.disconnectAudioInputDeviceFromTrack(this.receiver.id);
                                await audio.disconnectMidiDeviceFromTrack(this.receiver.id);
                                connectedDevice = null;
                            } else if (MIDI_DEVICES.indexOf(device) !== -1) {
                                await audio.connectMidiDeviceToTrack(this.receiver.id, device.replace('---(midi)', ''));
                                connectedDevice = 'midi';
                            } else if (INPUT_DEVICES.indexOf(device !== -1)) {
                                await audio.connectAudioInputDeviceToTrack(this.receiver.id, device);
                                connectedDevice = 'audio';
                            } else {
                                throw Error(`device not found: ${device}`);
                            }
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('startRecording', 'command', 'music', 'start recording %io', ['output'], function (io) {
                        return this.runAsyncFn(async () => {
                            await setupEntity(this.receiver);
                            setupProcess(this);

                            if (activeRecording) throw Error('recording already in progress');

                            if (io === 'input') {
                                if (!connectedDevice) {
                                    throw Error('no connected input device');
                                } else if (connectedDevice === 'midi') {
                                    activeRecording = audio.recordMidiClip(this.receiver.id, audio.getCurrentTime());
                                } else if (connectedDevice === 'audio') {
                                    activeRecording = audio.recordAudioClip(this.receiver.id, audio.getCurrentTime());
                                } else {
                                    throw Error(`unknown connected device type: "${connectedDevice}"`);
                                }
                            } else if (io === 'output') {
                                activeRecording = audio.recordOutput();
                            } else {
                                throw Error(`unknown audio direction: ${io}`);
                            }
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('finishRecording', 'reporter', 'music', 'finish recording', [], function () {
                        return this.runAsyncFn(async () => {
                            const recording = activeRecording;
                            activeRecording = null;
                            if (!recording) throw Error('no recording in progress');

                            await recording.finalize();

                            const blob = await recording.getEncodedData(ENCODERS['WAV']);
                            const res = new Sound(new Audio(URL.createObjectURL(blob, { type: 'audio/wav' })), 'netsblox-sound');
                            res.audioBuffer = blob;
                            return res;
                        }, { args: [], timeout: I32_MAX });
                    }),
                    new Extension.Block('isRecording', 'predicate', 'music', 'recording?', [], function () {
                        return !!activeRecording;
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
                        for (const key in map) {
                            res[key] = map[key];
                        }
                    }
                    return res;
                }
                const basicEnum = (name, values) => new Extension.LabelPart(name, () => new InputSlotMorph(null, false, values, true));
                return [
                    basicEnum('instrument', identityMap(INSTRUMENTS)),
                    basicEnum('keySig', {
                        'Major': identityMap(Object.keys(KEYS).filter(x => x.endsWith('Major')).map(x => [x.substring(0, x.length - 5), x])),
                        'Minor': identityMap(Object.keys(KEYS).filter(x => x.endsWith('Minor')).map(x => [x.substring(0, x.length - 5), x])),
                    }),
                    basicEnum('noteDuration', (base => unionMaps([
                        identityMap(base),
                        {
                            'Dotted': identityMap(base.map(x => [x, 'Dotted' + x])),
                            'DottedDotted': identityMap(base.map(x => [x, 'DottedDotted' + x])),
                        },
                    ]))(['Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'ThirtySecond', 'SixtyFourth'])),
                    basicEnum('drum', identityMap(Object.keys(DRUM_TO_NOTE))),
                    basicEnum('noteModifier', unionMaps([
                        {
                            'Tuplet': identityMap(['Tuplet 3:2', 'Tuplet 5:4', 'Tuplet 6:4', 'Tuplet 7:4']),
                        },
                        identityMap(['Accent', 'Staccato', 'TurnUpper', 'TurnLower']),
                    ])),
                    basicEnum('audioQuery', identityMap(['name', 'duration', 'samples', 'sample rate'])),
                    basicEnum('audioEffect', identityMap(Object.keys(EFFECT_INFO))),
                    basicEnum('audioEffectAug', identityMap([...Object.keys(EFFECT_INFO), 'every', 'every active'])),
                    basicEnum('audioInput', identityMap([...MIDI_DEVICES, ...INPUT_DEVICES])),
                    basicEnum('io', identityMap(['input', 'output'])),
                    basicEnum('audioAnalysis', identityMap(Object.keys(ANALYSIS_INFO))),
                    basicEnum('chordType', identityMap(Object.keys(CHORD_PATTERNS))),
                    basicEnum('scaleType', identityMap(Object.keys(SCALE_PATTERNS))),
                    basicEnum('drumGridOption', identityMap(['edit', 'play'])),
                ];
            }
        }
        NetsBloxExtensions.register(BeatBlox);
    };
    document.body.appendChild(script);

    var element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', 'https://pseudomorphic.netsblox.org/style.css');
    document.head.appendChild(element);

    var element = document.createElement('script');
    element.setAttribute('type', 'text/javascript');
    element.setAttribute('src', absoluteUrl('customBeats.js'));
    document.head.appendChild(element);

    var beatGridScript = document.createElement('script');
    beatGridScript.type = 'text/javascript';
    beatGridScript.async = false;
    beatGridScript.setAttribute('src', 'https://pseudomorphic.netsblox.org/script.js');
    beatGridScript.onload = function() {
        beatGrid = createDialog('Custom Beat');
        const contentElement = beatGrid.querySelector('content');
        contentElement.style.display = 'flex';
        contentElement.style['flex-flow'] = 'column';
        new window.BeatGrid(contentElement);
        setupDialog(beatGrid);
    };
    document.head.appendChild(beatGridScript);
})();
