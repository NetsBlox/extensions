(function () {

    // Global variables and constants
    let midiDevices = [], midiInstruments = [], midiTracks = new Map(), recordStatus = false,
        hotTrack = null;
    const I32_MAX = 2147483647;

    function loadWebAudioAPI() {
        window.audioAPI = new WebAudioAPI();
        window.audioAPI.createTrack('defaultTrack');
    }

    function getMidiDevices() {
        window.audioAPI.getAvailableMidiDevices().then(returnDevice, fail);
    }

    function returnDevice(devices) {
        midiDevices = devices;
        console.log(devices);
    }

    function fail() {
        console.log("something went wrong");
    }

    function getMidiInstruments() {
        window.audioAPI.getAvailableInstruments('http://localhost:8000/extensions/WebMidi/webAudioAPI-instruments').then(
            instruments => instruments.forEach(
                instrument => midiInstruments.push(instrument)
            )
        );
    }

    /**
     * Runs when ever a midi signal comes in.
     * @param {MIDIMessageEvent} event - Object containing the detected MIDI event.
     */
    function midiCallback(event) {
        const cmd = event.data[0];
        const note = event.data[1];
        const vel = event.data[2];
        const message = new MIDIMessage(cmd, note, vel);

        if (recordStatus) {
            hotTrack.addNote(message, window.audioAPI.getCurrentTime());
        }

        if (cmd == 144) {
            NoteVisualiser.createNote(message);
        } else {
            NoteVisualiser.removeNote(note);
        }
    }

    /**
     * Connects a MIDI device to the WebAudioAPI
     * @param {String} device - Name of the MIDI device being connected.
     */
    function midiConnect(device) {
        if (device != "") {
            window.audioAPI.connectMidiDeviceToTrack('defaultTrack', device).then(() => {
                console.log('Connected to MIDI device!');
            });
            window.audioAPI.registerMidiDeviceCallback(device, midiCallback);
        }
    }

    /**
     * Connects an instrument sample to the WebAudioAPI
     * @param {String} instrument - Name of instrument being loaded.
     */
    function changeInsturment(instrument) {
        window.audioAPI.start();
        window.audioAPI.updateInstrument('defaultTrack', instrument).then(() => {
            console.log('Instrument loading complete!');
        });
        window.instrumentName = instrument;
    }

    /**
     * Creates a new MIDI track to record audio.
     * @param {String} name - Name of track being created.
     * @throws an error if the track alread exists.
     */
    function createTrack(name) {
        if (!midiTracks.has(name)) {
            console.log("Track created: " + name);
            midiTracks.set(name, new MidiTrack());
        } else {
            throw Error('track already exists');
        }
    }

    /**
     * Play an audio track.
     * @param {ArrayBuffer} renderedTrack - An ArrayBuffer holding an audio file.
     */
    function playTrack(renderedTrack) {
        const audioCtx = new AudioContext();
        const track = audioCtx.createBufferSource();
        track.buffer = renderedTrack;
        track.connect(audioCtx.destination);
        track.start();
        console.log("track played");
    }

    /**
     * Starts recording incoming MIDI messages into a specified track.
     * @param {Strig} name - Name of the track being recorded to.
     * @throws an error if the track does not exist.
     */
    function startRecording(name) {
        if (midiTracks.has(name)) {
            console.log("Track armed: " + name);
            hotTrack = midiTracks.get(name);
            const startTime = window.audioAPI.getCurrentTime();
            hotTrack.startRecord(startTime);
            hotTrack.addNote(new MIDIMessage(144, 60, 60), startTime + 1);
            hotTrack.addNote(new MIDIMessage(128, 60, 60), startTime + 3);
            recordStatus = true;
        } else {
            throw Error('track not found');
        }
    }

    /**
     * Stops recording incoming MIDI messages.
     * @param {String} name - Name of the track to stop recording to.
     * @throws an error if the track does not exist.
     */
    function stopRecording(name) {
        if (midiTracks.has(name)) {
            console.log("Track disarmed: " + name);
            recordStatus = false;
            midiTracks.get(name).stopRecord(window.audioAPI.getCurrentTime());
        } else {
            throw Error('track not found');
        }
    }

    /**
     * Clears a MidiTrack.
     * @param {String} name - Name of the track being cleared.
     * @throws an error if the track does not exist.
     */
    function clearTrack(name) {
        if (midiTracks.has(name)) {
            midiTracks.get(name).clearTrack();
        } else {
            throw Error('track not found');
        }
    }

    /**
     * Converts a midi track to a Snap! Sound.
     * @asyn
     * @param {String} name - The name of the midi track being rendered.
     * @returns A Snap! Sound.
     */
    async function renderTrack(name) {
        if (midiTracks.has(name)) {
            await midiTracks.get(name).renderTrack();
            const process = new Process();
            const buffer = process.audioBufferToWav(midiTracks.get(name).getRenderedTrack());
            const blob = new Blob([buffer], { type: "audio/wav" });
            const audio = new Audio(URL.createObjectURL(blob, { type: "audio/wav" }));
            return new Sound(audio, name);
        } else {
            throw Error('track not found');
        }
    }

    /**
     * Exports a Snap! Sound as a .wav file.
     * @param {Sound} sound - the sound being exported.
     */
    function exportTrack(sound) {
       // TODO
    }

    class WebMidi extends Extension {
        
        constructor (ide) {
            super("WebMidi");
            this.ide = ide;
        }

        onOpenRole() {}

        getMenu() { return {}; }

        getCategories() {
            return [
                new Extension.Category("music", new Color(195, 0, 204)),
            ];
        }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block("setMidiDevice"),
                new Extension.Palette.Block("setInstrument"),
                new Extension.Palette.Block("showStaff"),
                new Extension.Palette.Block("midiTrack"),
                new Extension.Palette.Block("playTrack"),
                new Extension.Palette.Block("startRecording"),
                new Extension.Palette.Block("stopRecording"),
                new Extension.Palette.Block("clearTrack"),
                new Extension.Palette.Block("renderTrack"),
                new Extension.Palette.Block("exportAudio"),
                new Extension.Palette.Block("consoleLog"),
            ];
            return [
                new Extension.PaletteCategory("music", blocks, SpriteMorph),
                new Extension.PaletteCategory("music", blocks, StageMorph),
            ];
        }

        getBlocks() {
            function block(name, type, category, spec, defaults, action) {
                return new Extension.Block(name, type, category, spec, defaults, action).for(SpriteMorph, StageMorph);
            }
            return [
                block('setInstrument', 'command', 'music', 'Instrument %webMidiInstrument', [""], function (instrument) {
                    changeInsturment(instrument);
                }),
                block('setMidiDevice', 'command', 'music', 'Midi Device: %webMidiDevice', [""], function (device) {
                    midiConnect(device);
                }),
                block("showStaff", "command", "music", "Show Staff", [null], function() {
                    showDialog(window.externalVariables['webmidilog']);
                }),
                block("midiTrack", "command", "music", "Create Midi Track %s", [""], function(name) {
                    createTrack(name);
                }),
                block("playTrack", "command", "music", "Play Track %s",  [""], function(renderedTrack) {
                    playTrack(renderedTrack);
                }),
                block("startRecording", "command", "music", "Start Recording %s", [""], function (name) {
                    startRecording(name);
                }),
                block("stopRecording", "command", "music", "Stop Recording %s", [""], function (name) {
                    stopRecording(name);
                }),
                block("clearTrack", "command", "music", "Clear Track %s", [""], function (name) {
                    clearTrack(name);
                }),
                block("renderTrack", "reporter", "music", "Render Midi Track %s", [""], function (name) {
                    return this.runAsyncFn(async () => {
                        return renderTrack(name);
                    }, { args: [], timeout: I32_MAX });
                }), 
                block("exportAudio", "command", "music", "Export Track %s", [""], function (sound) {
                    exportTrack(sound);
                }),
                block("consoleLog", "command", "music", "Console Log %s", [""], function (x) {
                    console.log(x);
                }),
            ];
        }

        getLabelParts() {
            loadWebAudioAPI();
            getMidiDevices();
            getMidiInstruments();
            function identityMap(s) {
                const res = {};
                for (const x of s) res[x] = x;
                return res;
            }
            return [
                new Extension.LabelPart('webMidiInstrument', () => new InputSlotMorph(
                    null, // text
                    false, //numeric
                    identityMap(midiInstruments),
                    true, // readonly (no arbitrary text)
                )),
                new Extension.LabelPart('webMidiDevice', () => new InputSlotMorph(
                    null, // text
                    false, //numeric
                    identityMap(midiDevices),
                    true, // readonly (no arbitrary text)
                )),
            ];
        }
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = 'http://localhost:8000/extensions/WebMidi/js/webAudioAPI.js';
    document.body.appendChild(script);
    console.log("Added file: " + script.src);

    const files = [
        "https://cdn.jsdelivr.net/npm/vexflow@4.0.3/build/cjs/vexflow.js",
        "http://localhost:8000/extensions/WebMidi/js/vex.js",
        "http://localhost:8000/extensions/WebMidi/js/AudioStream.js",
        "http://localhost:8000/extensions/WebMidi/js/MIDIMessage.js",
        "http://localhost:8000/extensions/WebMidi/js/NoteVisualiser.js",
        "http://localhost:8000/extensions/WebMidi/js/MidiTrack.js",
    ];

    for (let i = 0; i < files.length; i++) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = files[i];
        script.async = false;
        document.body.appendChild(script);

        console.log("Added file: " + files[i]);
    }

    var element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', 'https://gsteinltu.github.io/PseudoMorphic/style.css');
    document.head.appendChild(element);

    var element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', 'https://gb0808.github.io/MidiVisualiser/style.css');
    document.head.appendChild(element);

    var scriptElement = document.createElement('script');

    scriptElement.onload = () => {
        var element = createDialog('WebMidi');
        element.querySelector('content').innerHTML = 
        '<div id="output"></div>' +
        '</div > ' + 
        '<a id="wav-link" download="netsblox.wav" style="display: none;"></a>'; 
        setupDialog(element);
        window.externalVariables['webmidilog'] = element;
    };
    scriptElement.setAttribute('src', 'https://gsteinltu.github.io/PseudoMorphic/script.js');
    document.head.appendChild(scriptElement);

    NetsBloxExtensions.register(WebMidi);
})();