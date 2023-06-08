/**
 * The ctor for an object holding data taken from a MIDI signal.
 * 
 * @param {Int} command       The command for the signal.
 * @param {Int} note          The note being played.
 * @param {Int} velocity      The velocity of the note.
 * @param {Boolean} sounding  States if the note is sounding or not.
 */
function MIDIMessage(command, note, velocity) {
    this.command = command;
    this.note = note;
    this.velocity = velocity;
}

/**
 * @returns The command given by the MIDI signal.
 */
MIDIMessage.prototype.getCommand = function () {
    return this.command;
}

/**
 * @returns The note value give by the MIDI signal.
 */
MIDIMessage.prototype.getNote = function () {
    return this.note;
}

/**
 * @returns The velocity of the note.
 */
MIDIMessage.prototype.getVelocity = function () {
    return this.velocity
}

MIDIMessage.prototype.toString = function () {
    return "MIDIMessage => [Command: " + this.getCommand() + ", Note: " + this.getNote() +
        ", Velocity: " + this.getVelocity() + "]";
}

/**
 * @returns true if a note is sounding and false if otherwise.
 */
MIDIMessage.prototype.checkNoteStatus = function () {
    return this.getCommand() == 144 && this.getVelocity() > 0;
}
