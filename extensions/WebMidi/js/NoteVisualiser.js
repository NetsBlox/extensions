const notes = new Map();

class NoteVisualiser {

    /**
     * Creates a note on the staff.
     * @param {MIDIMessage} midiMessage - MIDI data taken from the user.
     */
    static createNote(midiMessage) {
        const noteName = AudioStream.noteValues[midiMessage.getNote()];
        if (!notes.has(noteName)) {
            const staff = document.getElementById("staffContainer");
            const noteContainer = document.createElement("div");
            const note = document.createElement("div");


            this.styleNote(noteName, note);
            noteContainer.id = noteName;
            note.id = noteContainer.id + "--note";
            this.addAccidentals(noteContainer, note);

            noteContainer.appendChild(note);
            staff.appendChild(noteContainer);

            notes.set(noteName, noteContainer);
        }
    }

    /**
     * Applies CSS to the note being created.
     * @private
     * @param {String} noteName - the name of the note being played.
     * @param {HTML DOM Element} note - an HTML element acting as the note on a staff.
     */
    static styleNote(noteName, note) {
        note.style.position = "absolute";
        note.style.top = this.getTopPosition(noteName);
        note.style.left = this.getLeftPosition(noteName);
        note.style.height = "20px";
        note.style.width = "20px";
        note.style.backgroundColor = "black";
        note.style.borderRadius = "50%";
    }

    /**
     * Puts a note on the proper line or space on the staff.
     * @private
     * @param {String} noteName - the name of the note being played.
     * @returns the CSS top value.
     */
    static getTopPosition(noteName) {
        switch (noteName) {
            case "A":
                return "51%";
            case "A#/Bb":
                return "44%";
            case "B":
                return "44%";
            case "C":
                return "36%";
            case "C#/Db":
                return "36%";
            case "D":
                return "28%";
            case "D#/Eb":
                return "21%";
            case "E":
                return "21%";
            case "F":
                return "66%";
            case "F#/Gb":
                return "66%";
            case "G":
                return "59%";
            case "G#/Ab":
                return "51%";
        }
    }

    /**
     * Keeps notes from displaying on top of one another.
     * @private
     * @param {String} noteName - the name of the note being played.
     * @returns the CSS left value.
     */
    static getLeftPosition(noteName) {
        let left = "50%";
        switch (noteName) {
            case "A":
                if (notes.has("A#/Bb") || notes.has("G") || notes.has("B")) {
                    left = "54%";
                }
                if (notes.has("G#/Ab")) {
                    left = "46%";
                }
                break;
            case "A#/Bb":
                if (notes.has("A") || notes.has("C") || notes.has("C#/Db") || notes.has("G#/Ab")) {
                    left = "54%";
                }
                if (notes.has("B")) {
                    left = "46%";
                }
                break;
            case "B":
                if (notes.has("A") || notes.has("C") || notes.has("C#/Db") || notes.has("G#/Ab")) {
                    left = "54%";
                }
                if (notes.has("A#/Bb")) {
                    left = "46%";
                }
                break;
            case "C":
                if (notes.has("A#/Bb") || notes.has("B") || notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("C#/Db")) {
                    left = "46%";
                }
                break;
            case "C#/Db":
                if (notes.has("A#/Bb") || notes.has("B") || notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("C")) {
                    left = "46%";
                }
                break;
            case "D":
                if (notes.has("C") || notes.has("C#/Db") || notes.has("D#/Eb") || notes.has("E")) {
                    left = "54%";
                }
                break;
            case "D#/Eb":
                if (notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("E")) {
                    left = "46%";
                }
                break;
            case "E":
                if (notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("D#/Eb")) {
                    left = "46%";
                }
                break;
            case "F":
                if (notes.has("G")) {
                    left = "54%"
                }
                if (notes.has("F#/Gb")) {
                    left = "46%";
                }
                break;
            case "F#/Gb":
                if (notes.has("G")) {
                    left = "54%"
                }
                if (notes.has("F")) {
                    left = "46%";
                }
                break;
            case "G":
                if (notes.has("F") || notes.has("F#/Gb") || notes.has("G#/Ab") || notes.has("A")) {
                    left = "54%"
                }
                break;
            case "G#/Ab":
                if (notes.has("A#/Bb") || notes.has("G") || notes.has("B")) {
                    left = "54%";
                }
                if (notes.has("A")) {
                    left = "46%";
                }
                break;
        }
        return left;
    }

    /**
     * Determines what accidental gets added to a note.
     * @param {HTML DOM Element} noteContainer 
     * @param {HTML DOM Element} note 
     */
    static addAccidentals(noteContainer, note) {
        switch(noteContainer.id) {
            case "C#/Db": case "F#/Gb":
                this.insertAccidental(noteContainer, note, "♯");
                break;
            case "D#/Eb": case "G#/Ab": case "A#/Bb":
                this.insertAccidental(noteContainer, note, "♭");
                break;
        }
    }

    /**
     * Adds the given accidental to the note.
     * @param {HTML DOM Element} noteContainer 
     * @param {HTML DOM Element} note 
     * @param {String} accidental 
     */
    static insertAccidental(noteContainer, note, accidental) {
        const accidentalContainer = document.createElement("div");
        const accidentalText = document.createElement("p");
        const symbol = document.createTextNode(accidental);

        accidentalContainer.id = noteContainer.id + "--accidental";
        this.positionAccidental(note, accidentalContainer);

        accidentalText.appendChild(symbol);
        accidentalContainer.appendChild(accidentalText);
        noteContainer.appendChild(accidentalContainer);
    }

    /**
     * Positions the accidental.
     * @param {HTML DOM Element} note 
     * @param {HTML DOM Element} accidentalContainer 
     */
    static positionAccidental(note, accidentalContainer) {
        const top = parseInt(note.style.top) - 18 + "%";
        const left = parseInt(note.style.left) + 2 + "%"

        accidentalContainer.style.position = "absolute";
        accidentalContainer.style.top = top;
        accidentalContainer.style.left = left;
    }

    /**
     * Removes a note from the staff.
     * @param {Int} note - the MIDI value of the note that needs to be turned off.
     */
    static removeNote(note) {
        const noteName = AudioStream.noteValues[note];
        if (notes.has(noteName)) {
            notes.get(noteName).remove();
            notes.delete(noteName);
            console.log("off");
        }
    }
}