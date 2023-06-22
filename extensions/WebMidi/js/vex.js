const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 500);
const context = renderer.getContext();

// Create Staves
const staveTreble = new Stave(10, 40, 400);
staveTreble.addClef("treble");
staveTreble.setContext(context).draw();

const staveBass = new Stave(10, 100, 400);
staveBass.addClef("bass");
staveBass.setContext(context).draw();

// Create group
const group = context.openGroup();

console.log("Set up staff");

// Individual notes
class Note_v {

    #noteName;
    #clef;
    #note = [];

    /**
     * @constructor
     * @param {String} noteName - The name of the note being played.
     */
    constructor(noteName) {
        this.#noteName = noteName;
        switch (this.#getNoteClef()) {
            case "treble":
                this.#clef = staveTreble;
                break;
            case "bass":
                this.#clef = staveBass;
                break;
        }
        this.#note.push(new StaveNote({ 
            keys: [noteName], 
            duration: "w", 
            clef: this.#getNoteClef(),
        }));
    }

    /**
     * Shows a note on the staff.
     */
    showNote() {
        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(this.#note);
        new Formatter().joinVoices([voice]).format([voice], 350);
        voice.draw(context, this.#clef);
    }

    /**
     * Removes a note from the staff.
     */
    removeNote() {
        console.log("remove note");
        const x = document.getElementsByClassName("vf-stavenote");
        for (let i = 0; i < x.length; i++) {
            x[i].remove();
        }
    }

    /**
     * @private
     * @returns The staff that a note should be placed on.
     */
    #getNoteClef() {
        const octaveNumber = this.#noteName[this.#noteName.length - 1];
        if (octaveNumber >= 4) {
            return "treble";
        }
        return "bass";
    }
}