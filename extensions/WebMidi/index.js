(function () {

    let mostRecentMidiMessage = null;
    let midiDevices = [];

    /**
     * Sets up the broswer to listen for MIDI Data
     */
    function readMIDI() {
        if (navigator.requestMIDIAccess) {
            console.log("MIDI supported");
        } else {
            console.log("MIDI not supported");
        }

        navigator.requestMIDIAccess().then(success, failure);
    }

    /**
     * Sets up an event listener for each MIDI input
     * @param {MIDIAccess} midiAccess - a MIDIAccess object returned by the browser if the 
     *                                  browser is successful in connecting to your MIDI device.
     */
    function success(midiAccess) {
        console.log(midiAccess);

        mostRecentMidiMessage = new MIDIMessage(0, 0, 0);

        const inputs = midiAccess.inputs;
        inputs.forEach((input) => {
            input.addEventListener("midimessage", parseInput);
            console.log("MIDI detected");
        });
    }

    /**
     * Outputs an error message if the broswer can't connect to your MIDI device.
     */
    function failure() {
        console.log("ERROR: could not access MIDI device");
    }

    /**
     * Listens for MIDI input comming into the browser.
     * @param {MIDIInputMap} input - an input on your MIDI device.
     */
    function parseInput(input) {
        const message = new MIDIMessage(input.data[0], input.data[1], input.data[2]);
        mostRecentMidiMessage = message;
        console.log(message.toString());
    }

    /**
     * @returns The last command entered by the MIDI controller.
     */
    function getNoteCommand() {
        if (mostRecentMidiMessage != null) {
            return mostRecentMidiMessage.getCommand();
        }
        return 0;
    }

    /**
     * @returns The last note played by the MIDI controller.
     */
    function getNote() {
        if (mostRecentMidiMessage != null) {
            return mostRecentMidiMessage.getNote();
        }
        return 0;
    }

    /**
     * Determines the frequency of the note being played by the MIDI keyboard.
     * @returns the frequency of the note being played.
     */
    function getNoteFrequency() {
        if (mostRecentMidiMessage != null) {
            if (mostRecentMidiMessage.checkNoteStatus()) {
                return AudioStream.noteFrequencies[mostRecentMidiMessage.getNote()];
            }
        }
        return 0;
    }

    /**
     * @returns The last velocity entered by the MIDI controller.
     */
    function getNoteVelocity() {
        if (mostRecentMidiMessage != null) {
            return mostRecentMidiMessage.getVelocity();
        }
        return 0;
    }

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
        midiDevices = [];
        console.log("something went wrong");
    }

    function midiCallback(event) {
        console.log(event);
    }

    function midiConnect(device) {
        if (device != "") {
            window.audioAPI.registerMidiDeviceCallback(device, midiCallback);
            // window.audioAPI.connectMidiDeviceToTrack('defaultTrack', device).then((value) => {
            //     console.log('Connected to MIDI device!');
            //     console.log(value);
            // });
        }
    }

    function changeInsturment(instrument) {
        window.audioAPI.start();
        window.audioAPI.getAvailableInstruments('/extensions/WebMidi/webAudioAPI-instruments').then((device) => {
            console.log(device);
        });
        window.audioAPI.updateInstrument('defaultTrack', instrument).then(() => {
            console.log('Instrument loading complete!');
        });
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
                new Extension.Palette.Block("webMidiSetMidiDevice"),
                new Extension.Palette.Block("webMidiSetInstrument"),

                new Extension.Palette.Block("webMidiReadMidi"),
                new Extension.Palette.Block("webMidiGetNoteCommand"),
                new Extension.Palette.Block("webMidiGetNote"),
                new Extension.Palette.Block("webMidiGetNoteFrequency"),
                new Extension.Palette.Block("webMidiGetNoteVelocity"),
                new Extension.Palette.Block("webMidiGetNoteName"),
                new Extension.Palette.Block("webMidiPlaySound"),
                new Extension.Palette.Block("webMidiStopSound"),
                new Extension.Palette.Block("webMidiWaveType"),
                new Extension.Palette.Block("webMidiShowStaff"),
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
                block('webMidiSetInstrument', 'command', 'music', 'Instrument %webMidiInstrument', 
                [""], function (instrument) {
                    console.log(instrument);
                    changeInsturment(instrument);
                }),
                block('webMidiSetMidiDevice', 'command', 'music', 'Midi Device: %webMidiDevice', 
                [""], function (device) {
                    console.log(device);
                    midiConnect(device);
                }),
                
                block("webMidiReadMidi", "command", "music", "Listen for MIDI", [null], function() {
                    readMIDI();
                }),
                block("webMidiGetNoteCommand", "reporter", "music", "Get Command", [null], 
                    function() {
                        return getNoteCommand();
                }),
                block("webMidiGetNote", "reporter", "music", "Get Note", [null], function () {
                    return getNote();
                }),
                block("webMidiGetNoteFrequency", "reporter", "music", "Get Frequency", [null], 
                    function() {
                        return getNoteFrequency();
                }),
                block("webMidiGetNoteVelocity", "reporter", "music", "Get Velocity", [null],
                    function() {
                        return getNoteVelocity();
                }),
                block("webMidiGetNoteName", "reporter", "music", "Get Note Name: %n", [null], 
                    function(note) {
                        const noteName = AudioStream.noteValues[note];
                        return noteName.substring(0, noteName.length - 2);
                }),
                block("webMidiPlaySound", "command", "music", 
                    "Play Sound - Note: %n Velocity: %n Wave: %webMidiWaveType", 
                    [0, 0, "sine"], function(note, vel, wave) {
                        const message = new MIDIMessage(144, note, vel);
                        AudioStream.startSound(message, wave);
                        NoteVisualiser.createNote(message);
                }),
                block("webMidiStopSound", "command", "music", "Stop Sound - Note: %n", [0], 
                    function(note) {
                        AudioStream.stopSound(note);
                        NoteVisualiser.removeNote(note);
                }),
                block("webMidiWaveType", "reporter", "music", "Wave: %webMidiWaveType", ["sine"], 
                    x => x
                ),
                block("webMidiShowStaff", "command", "music", "Show Staff", [null], function() {
                    showDialog(window.externalVariables['webmidilog']);
                }),
            ];
        }

        getLabelParts() {
            loadWebAudioAPI();
            getMidiDevices();
            function identityMap(s) {
                const res = {};
                for (const x of s) res[x] = x;
                return res;
            }
            return [
                new Extension.LabelPart("webMidiWaveType", () => new InputSlotMorph(
                    null, // text
                    false, //numeric
                    identityMap(["sine", "square", "sawtooth", "triangle"]),
                    true, // readonly (no arbitrary text)
                )),
                new Extension.LabelPart('webMidiInstrument', () => new InputSlotMorph(
                    null, // text
                    false, //numeric
                    identityMap([
                        "Grand Piano", "Electric Bass", "Bassoon", "Cello", "Acoustic Guitar", 
                        "Electric Guitar", "Nylon Guitar", "Harp", "Pipe Organ", "Violin"
                    ]),
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
    script.src = 'https://hedgecrw.github.io/WebAudioAPI/lib/webAudioAPI.js';
    document.body.appendChild(script);
    console.log("Added file: " + script.src);

    const files = [
        "https://cdn.jsdelivr.net/npm/vexflow@4.0.3/build/cjs/vexflow.js",
        "http://localhost:8181/extensions/WebMidi/js/vex.js",
        "http://localhost:8181/extensions/WebMidi/js/AudioStream.js",
        "http://localhost:8181/extensions/WebMidi/js/MIDIMessage.js",
        "http://localhost:8181/extensions/WebMidi/js/NoteVisualiser.js",
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
        '</div > '; 
        setupDialog(element);
        window.externalVariables['webmidilog'] = element;
    };
    scriptElement.setAttribute('src', 'https://gsteinltu.github.io/PseudoMorphic/script.js');
    document.head.appendChild(scriptElement);

    NetsBloxExtensions.register(WebMidi);
})();