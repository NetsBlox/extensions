(function () {

    let mostRecentMidiMessage = null;

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
                new Extension.Palette.Block("webMidiReadMidi"),
                new Extension.Palette.Block("webMidiGetNoteFrequency"),
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
                block("webMidiReadMidi", "command", "music", "Listen for MIDI", [null], function() {
                    readMIDI();
                }),
                block("webMidiGetNoteFrequency", "reporter", "music", "Get Frequency", [null], 
                    function() {
                        return getNoteFrequency();
                }),
            ]
        }
    }

    const files = [
        "http://localhost:8181/extensions/WebMidi/js/AudioStream.js",
        "http://localhost:8181/extensions/WebMidi/js/MIDIMessage.js",
    ];

    for (let i = 0; i < files.length; i++) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = files[i];
        script.async = false;
        document.body.appendChild(script);

        console.log("Added file: " + files[i]);
    }

    NetsBloxExtensions.register(WebMidi);
})();