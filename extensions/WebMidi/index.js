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
                new Extension.Palette.Block("webMidiGetNoteCommand"),
                new Extension.Palette.Block("webMidiGetNote"),
                new Extension.Palette.Block("webMidiGetNoteFrequency"),
                new Extension.Palette.Block("webMidiGetNoteVelocity"),
                new Extension.Palette.Block("webMidiGetNoteName"),
                new Extension.Palette.Block("webMidiPlaySound"),
                new Extension.Palette.Block("webMidiStopSound"),
                new Extension.Palette.Block("webMidiWaveType"),
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
                        return AudioStream.noteValues[note];
                }),
                block("webMidiPlaySound", "command", "music", 
                    "Play Sound - Note: %n Velocity: %n Wave: %webMidiWaveType", 
                    [0, 0, "sine"], function(note, vel, wave) {
                        const message = new MIDIMessage(144, note, vel);
                        AudioStream.startSound(message, wave);
                }),
                block("webMidiStopSound", "command", "music", "Stop Sound - Note: %n", [0], 
                    function(note) {
                        AudioStream.stopSound(note);
                }),
                block("webMidiWaveType", "reporter", "music", "Wave: %webMidiWaveType", ["sine"], 
                    x => x
                ),
            ];
        }

        getLabelParts() {
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
                ))
            ];
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