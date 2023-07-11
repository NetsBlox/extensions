const notes = new Map();

class NoteVisualiser {
    
    /**
     * Creates a note on the staff.
     * @param {MIDIMessage} midiMessage - MIDI data taken from the user.
     */
    static createNote(midiMessage) {
        const noteName = AudioStream.noteValues[midiMessage.getNote()];
        if (!notes.has(noteName)) {
            const note = new Note_v(noteName);
            note.showNote();
            notes.set(noteName, note);
        }
    }

    /**
     * Removes a note from the staff.
     * @param {Int} noteNumber - The midi value of the note being stopped.
     */
    static removeNote(noteNumber) {
        const noteName = AudioStream.noteValues[noteNumber];
        if (notes.has(noteName)) {
            notes.get(noteName).removeNote();
            notes.delete(noteName);
        }
    }
}