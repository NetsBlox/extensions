(function () {

    let midiDevices = [];
    let midiInstruments = [];

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

    function midiCallback(event) {
        const cmd = event.data[0];
        const note = event.data[1];
        const vel = event.data[2];

        if (cmd == 144) {
            const message = new MIDIMessage(cmd, note, vel);
            NoteVisualiser.createNote(message);
        } else {
            NoteVisualiser.removeNote(note);
        }
    }

    function midiConnect(device) {
        if (device != "") {
            window.audioAPI.connectMidiDeviceToTrack('defaultTrack', device).then(() => {
                console.log('Connected to MIDI device!');
            });
            window.audioAPI.registerMidiDeviceCallback(device, midiCallback);
        }
    }

    function changeInsturment(instrument) {
        window.audioAPI.start();
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
                block("webMidiShowStaff", "command", "music", "Show Staff", [null], function() {
                    showDialog(window.externalVariables['webmidilog']);
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
    script.src = 'https://hedgecrw.github.io/WebAudioAPI/lib/webAudioAPI.js';
    document.body.appendChild(script);
    console.log("Added file: " + script.src);

    const files = [
        "https://cdn.jsdelivr.net/npm/vexflow@4.0.3/build/cjs/vexflow.js",
        "http://localhost:8000/extensions/WebMidi/js/vex.js",
        "http://localhost:8000/extensions/WebMidi/js/AudioStream.js",
        "http://localhost:8000/extensions/WebMidi/js/MIDIMessage.js",
        "http://localhost:8000/extensions/WebMidi/js/NoteVisualiser.js",
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