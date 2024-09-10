/**
 * Module containing all musical notation constants in the various formats expected by the
 * {@link WebAudioAPI} library.
 * 
 * @module Constants
 */

/**
 * Object representing a mapping between the notational name of a musical note and its MIDI value.
 * @constant {Object<string, number>}
 */
const Note = {   Rest: 0,
   C0: 12,   C0n: -12,  D0bb: 12,   C0s: 13,   D0b: 13,     D0: 14,   D0n: -14, C0ss: 14,  E0bb: 14,
  D0s: 15,   E0b: 15,   F0bb: 15,    E0: 16,   E0n: -16,  D0ss: 16,   F0b: 16,    F0: 17,   F0n: -17, E0s: 17,   G0bb: 17,
  F0s: 18,  E0ss: 18,    G0b: 18,    G0: 19,   G0n: -19,  F0ss: 19,  A0bb: 19,   G0s: 20,   A0b: 20,
   A0: 21,   A0n: -21,  G0ss: 21,  B0bb: 21,   A0s: 22,    B0b: 22,  C1bb: 22,    B0: 23,   B0n: -23, A0ss: 23,   C1b: 23,
   C1: 24,   C1n: -24,   B0s: 24,  D1bb: 24,   C1s: 25,   B0ss: 25,   D1b: 25,    D1: 26,   D1n: -26, C1ss: 26,  E1bb: 26,
  D1s: 27,   E1b: 27,   F1bb: 27,    E1: 28,   E1n: -28,  D1ss: 28,   F1b: 28,    F1: 29,   F1n: -29,  E1s: 29,  G1bb: 29,
  F1s: 30,  E1ss: 30,    G1b: 30,    G1: 31,   G1n: -31,  F1ss: 31,  A1bb: 31,   G1s: 32,   A1b: 32,
   A1: 33,   A1n: -33,  G1ss: 33,  B1bb: 33,   A1s: 34,    B1b: 34,  C2bb: 34,    B1: 35,   B1n: -35, A1ss: 35,   C2b: 35,
   C2: 36,   C2n: -36,   B1s: 36,  D2bb: 36,   C2s: 37,   B1ss: 37,   D2b: 37,    D2: 38,   D2n: -38, C2ss: 38,  E2bb: 38,
  D2s: 39,   E2b: 39,   F2bb: 39,    E2: 40,   E2n: -40,  D2ss: 40,   F2b: 40,    F2: 41,   F2n: -41,  E2s: 41,  G2bb: 41,
  F2s: 42,  E2ss: 42,    G2b: 42,    G2: 43,   G2n: -43,  F2ss: 43,  A2bb: 43,   G2s: 44,   A2b: 44,
   A2: 45,   A2n: -45,  G2ss: 45,  B2bb: 45,   A2s: 46,    B2b: 46,  C3bb: 46,    B2: 47,   B2n: -47, A2ss: 47,   C3b: 47,
   C3: 48,   C3n: -48,   B2s: 48,  D3bb: 48,   C3s: 49,   B2ss: 49,   D3b: 49,    D3: 50,   D3n: -50, C3ss: 50,  E3bb: 50,
  D3s: 51,   E3b: 51,   F3bb: 51,    E3: 52,   E3n: -52,  D3ss: 52,   F3b: 52,    F3: 53,   F3n: -53,  E3s: 53,  G3bb: 53,
  F3s: 54,  E3ss: 54,    G3b: 54,    G3: 55,   G3n: -55,  F3ss: 55,  A3bb: 55,   G3s: 56,   A3b: 56,
   A3: 57,   A3n: -57,  G3ss: 57,  B3bb: 57,   A3s: 58,    B3b: 58,  C4bb: 58,    B3: 59,   B3n: -59, A3ss: 59,   C4b: 59,
   C4: 60,   C4n: -60,   B3s: 60,  D4bb: 60,   C4s: 61,   B3ss: 61,   D4b: 61,    D4: 62,   D4n: -62, C4ss: 62,  E4bb: 62,
  D4s: 63,   E4b: 63,   F4bb: 63,    E4: 64,   E4n: -64,  D4ss: 64,   F4b: 64,    F4: 65,   F4n: -65,  E4s: 65,  G4bb: 65,
  F4s: 66,  E4ss: 66,    G4b: 66,    G4: 67,   G4n: -67,  F4ss: 67,  A4bb: 67,   G4s: 68,   A4b: 68,
   A4: 69,   A4n: -69,  G4ss: 69,  B4bb: 69,   A4s: 70,    B4b: 70,  C5bb: 70,    B4: 71,   B4n: -71, A4ss: 71,   C5b: 71,
   C5: 72,   C5n: -72,   B4s: 72,  D5bb: 72,   C5s: 73,   B4ss: 73,   D5b: 73,    D5: 74,   D5n: -74, C5ss: 74,  E5bb: 74,
  D5s: 75,   E5b: 75,   F5bb: 75,    E5: 76,   E5n: -76,  D5ss: 76,   F5b: 76,    F5: 77,   F5n: -77,  E5s: 77,  G5bb: 77,
  F5s: 78,  E5ss: 78,    G5b: 78,    G5: 79,   G5n: -79,  F5ss: 79,  A5bb: 79,   G5s: 80,   A5b: 80,
   A5: 81,   A5n: -81,  G5ss: 81,  B5bb: 81,   A5s: 82,    B5b: 82,  C6bb: 82,    B5: 83,   B5n: -83, A5ss: 83,   C6b: 83,
   C6: 84,   C6n: -84,   B5s: 84,  D6bb: 84,   C6s: 85,   B5ss: 85,   D6b: 85,    D6: 86,   D6n: -86, C6ss: 86,  E6bb: 86,
  D6s: 87,   E6b: 87,   F6bb: 87,    E6: 88,   E6n: -88,  D6ss: 88,   F6b: 88,    F6: 89,   F6n: -89,  E6s: 89,  G6bb: 89,
  F6s: 90,  E6ss: 90,    G6b: 90,    G6: 91,   G6n: -91,  F6ss: 91,  A6bb: 91,   G6s: 92,   A6b: 92,
   A6: 93,   A6n: -93,  G6ss: 93,  B6bb: 93,   A6s: 94,    B6b: 94,  C7bb: 94,    B6: 95,   B6n: -95, A6ss: 95,   C7b: 95,
   C7: 96,   C7n: -96,   B6s: 96,   D7bb: 96,  C7s: 97,   B6ss: 97,   D7b: 97,    D7: 98,   D7n: -98, C7ss: 98,  E7bb: 98,
  D7s: 99,   E7b: 99,   F7bb: 99,    E7: 100,  E7n: -100, D7ss: 100,  F7b: 100,   F7: 101,  F7n: -101,  E7s: 101, G7bb: 101,
  F7s: 102, E7ss: 102,   G7b: 102,   G7: 103,  G7n: -103, F7ss: 103, A7bb: 103,  G7s: 104,  A7b: 104,
   A7: 105,  A7n: -105, G7ss: 105, B7bb: 105,  A7s: 106,   B7b: 106, C8bb: 106,   B7: 107,  B7n: -107, A7ss: 107,  C8b: 107,
   C8: 108,  C8n: -108,  B7s: 108, D8bb: 108,  C8s: 109,  B7ss: 109,  D8b: 109,   D8: 110,  D8n: -110, C8ss: 110, E8bb: 110,
  D8s: 111,  E8b: 111,  F8bb: 111,   E8: 112,  E8n: -112, D8ss: 112,  F8b: 112,   F8: 113,  F8n: -113,  E8s: 113, G8bb: 113,
  F8s: 114, E8ss: 114,   G8b: 114,   G8: 115,  G8n: -115, F8ss: 115, A8bb: 115,  G8s: 116,  A8b: 116,
   A8: 117,  A8n: -117, G8ss: 117, B8bb: 117,  A8s: 118,   B8b: 118, C9bb: 118,   B8: 119,  B8n: -119, A8ss: 119,  C9b: 119,
   C9: 120,  C9n: -120,  B8s: 120, D9bb: 120,  C9s: 121,  B8ss: 121,  D9b: 121,   D9: 122,  D9n: -122, C9ss: 122, E9bb: 122,
  D9s: 123,  E9b: 123,  F9bb: 123,   E9: 124,  E9n: -124, D9ss: 124,  F9b: 124,   F9: 125,  F9n: -125,  E9s: 125, G9bb: 125,
  F9s: 126, E9ss: 126,   G9b: 126,   G9: 127,  G9n: -127, F9ss: 127, A9bb: 127,  G9s: 128,  A9b: 128,
   A9: 129,  A9n: -129, G9ss: 129, B9bb: 129,  A9s: 130,   B9b: 130,   B9: 131,  B9n: 331, A9ss: 131
};

/**
 * Array containing the frequency (in Hz) of the MIDI value at the corresponding array index.
 * @constant {number[]}
 */
const Frequency = [
      0.0,    8.66,    9.18,    9.72,    10.30,    10.91,    11.56,    12.25,    12.98,    13.75,    14.57,    15.43,
    16.35,   17.32,   18.35,   19.45,    20.60,    21.83,    23.12,    24.50,    25.96,    27.50,    29.14,    30.87,
    32.70,   34.65,   36.71,   38.89,    41.20,    43.65,    46.25,    49.00,    51.91,    55.00,    58.27,    61.74,
    65.41,   69.30,   73.42,   77.78,    82.41,    87.31,    92.50,    98.00,   103.83,   110.00,   116.54,   123.47,
   130.81,  138.59,  146.83,  155.56,   164.81,   174.61,   185.00,   196.00,   207.65,   220.00,   233.08,   246.94,
   261.63,  277.18,  293.66,  311.13,   329.63,   349.23,   369.99,   392.00,   415.30,   440.00,   466.16,   493.88,
   523.25,  554.37,  587.33,  622.25,   659.26,   698.46,   739.99,   783.99,   830.61,   880.00,   932.33,   987.77,
  1046.50, 1108.73, 1174.66, 1244.51,  1318.51,  1396.91,  1479.98,  1567.98,  1661.22,  1760.00,  1864.66,  1975.53,
  2093.00, 2217.46, 2349.32, 2489.02,  2637.02,  2793.83,  2959.96,  3135.96,  3322.44,  3520.00,  3729.31,  3951.07,
  4186.01, 4434.92, 4698.64, 4978.03,  5274.04,  5587.65,  5919.91,  6271.93,  6644.88,  7040.00,  7458.62,  7902.13,
  8372.02, 8869.84, 9397.27, 9956.06, 10548.08, 11175.30, 11839.82, 12534.86, 13289.75, 14080.00, 14917.24, 15804.26
];

/**
 * Object representing a mapping between the notational name of a musical duration and its associated beat scaling factor.
 * @constant {Object<string, number>}
 */
const Duration = {
          Whole: 1.0,         DottedWhole: 2.0 / 3.0,          DottedDottedWhole: 4.0 / 7.0,
           Half: 2.0,          DottedHalf: 4.0 / 3.0,           DottedDottedHalf: 8.0 / 7.0,
        Quarter: 4.0,       DottedQuarter: 8.0 / 3.0,       DottedDottedQuarter: 16.0 / 7.0,
         Eighth: 8.0,       DottedEighth: 16.0 / 3.0,        DottedDottedEighth: 32.0 / 7.0,
     Sixteenth: 16.0,    DottedSixteenth: 32.0 / 3.0,     DottedDottedSixteenth: 64.0 / 7.0,
  ThirtySecond: 32.0, DottedThirtySecond: 64.0 / 3.0, DottedDottedThirtySecond: 128.0 / 7.0,
   SixtyFourth: 64.0, DottedSixtyFourth: 128.0 / 3.0,  DottedDottedSixtyFourth: 256.0 / 7.0
};

/**
 * Object representing a mapping between the notational name of a key signature and its position on the circle of fifths.
 * @constant {Object<string, number>}
 */
const KeySignature = {
   CMajor: 0, DMajor: 2, EMajor: 4, FMajor: -1, GMajor: 1, AMajor: 3,
   BMajor: 5, CSharpMajor: 7, FSharpMajor: 6, CFlatMajor: -7, DFlatMajor: -5,
   EFlatMajor: -3, GFlatMajor: -6, AFlatMajor: -4, BFlatMajor: -2,
   CMinor: -3, DMinor: -1, EMinor: 1, FMinor: -4, GMinor: -2, AMinor: 0,
   BMinor: 2, CSharpMinor: 4, DSharpMinor: 6, FSharpMinor: 3, GSharpMinor: 5,
   ASharpMinor: 7, EFlatMinor: -6, AFlatMinor: -7, BFlatMinor: -5
};

/**
 * Object representing a mapping between an effect type and its unique internal code.
 * @constant {Object<string, number>}
 */
const EffectType = {
   Reverb: 11, Delay: 12, Echo: 13, PitchShift: 14, Doppler: 15,                    // Time-Based Effects
   Chorus: 21, Tremolo: 22, Vibrato: 23, Flanger: 24, Phaser: 25,                   // Modulation Effects
   Panning: 31, Equalization: 32,                                                   // Spectral Effects
   Volume: 41, Compression: 42, Distortion: 43,                                     // Dynamic Effects
   LowPassFilter: 51, HighPassFilter: 52, BandPassFilter: 53, BandRejectFilter: 54  // Filter Effects
};

/**
 * Object representing a mapping between a note modification and its unique internal code.
 * @constant {Object<string, number>}
 */
const ModificationType = {
   Velocity: 1, Piano: 2, Forte: 3, MezzoPiano: 4, MezzoForte: 5,                         // Loudness modifications
   Pianissimo: 6, Fortissimo: 7, Pianississimo: 8, Fortississimo: 9,
   Slur: 20, Crescendo: 21, Decrescendo: 22, Diminuendo: 23,                              // Multi-note articulations
   Accent: 40, Marcato: 41, Staccato: 42, Staccatissimo: 43, Tenuto: 44, Sforzando: 45,   // Single-note articulations
   Tie: 60, OctaveShiftUp: 61, OctaveShiftDown: 62, Natural: 63,                          // Miscellaneous modifications
   GraceAcciaccatura: 80, GraceAppoggiatura: 81,                                          // Explicit ornamentations (alters single note)
   Tuplet: 100, Triplet: 101, Quintuplet: 102, Sextuplet: 103,                            // Duration modifications
   Septuplet: 104, Fermata: 105,
   TrillUpper: 120, TrillLower: 121, MordentUpper: 122, MordentLower: 123,                // Implicit ornamentations (adds notes)
   TurnUpper: 124, TurnLower: 125, Glissando: 126, Portamento: 127
};

/**
 * Object representing a mapping between an acoustic analysis type and its unique internal code.
 * @constant {Object<string, number>}
 */
const AnalysisType = {
   TimeSeries: 1, PowerSpectrum: 2, TotalPower: 3
};

/**
 * Object representing a mapping between an encoding file type and its unique internal code.
 * @constant {Object<string, number>}
 */
const EncodingType = {
   WAV: 1
};

/**
 * Object representing a mapping between an instrument file encoding type and its unique internal code.
 * @constant {Object<string, number>}
 */
const InstrumentEncodingType = {
   PCM: 0, WEBM_OPUS: 1
};

/** Class representing a set of details for playing an individual note */
class NoteDetails {

   /** @type {number} */
   note;
   /** @type {number} */
   velocity;
   /** @type {number} */
   duration;
   /** @type {number} */
   startTimeOffset;
   /** @type {number} */
   usedDuration;
   /** @type {boolean} */
   wasWaitingNote;

   constructor(note, velocity, duration, startTimeOffset, usedDuration) {
      this.note = note;
      this.velocity = velocity;
      this.duration = duration;
      this.startTimeOffset = (startTimeOffset === undefined) ? 0.0 : startTimeOffset;
      this.usedDuration = (usedDuration === undefined) ? duration : usedDuration;
      this.wasWaitingNote = false;
   }
}

/** Class representing all base-level {@link WebAudioAPI} note modifications */
class ModificationBase {

   // Reference to the original unmodified note and duration
   /** @type {Tempo} */
   tempo = null;
   /** @type {Key} */
   key = null;
   /** @type {NoteDetails} */
   unmodifiedDetails = null;

   /**
    * Called by a concrete modification instance to initialize the inherited {@link ModificationBase}
    * data structure.
    * 
    * @param {Tempo} tempo - Reference to the current global {@link Tempo}
    * @param {NoteDetails} details - Original unmodified details about the note to be played
    */
   constructor(tempo, key, details) {
      this.tempo = tempo;
      this.key = key;
      this.unmodifiedDetails = details;
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * @param {Object|null} [details] - Optional details used to refine the requested modification
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) { return undefined; }
}

/**
 * Module containing all {@link WebAudioAPI} error functionality.
 * 
 * @module Errors
 */

class WebAudioNotImplementedError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioNotImplementedError';
   }
}

class WebAudioMidiError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioMidiError';
   }
}

class WebAudioDeviceError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioDeviceError';
   }
}

class WebAudioTargetError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioTargetError';
   }
}

class WebAudioValueError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioValueError';
   }
}

class WebAudioTrackError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioTrackError';
   }
}

class WebAudioRecordingError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioRecordingError';
   }
}

class WebAudioInstrumentError extends Error {
   constructor(message) {
      super(message);
      this.name = 'WebAudioInstrumentError';
   }
}

/**
 * Class representing an Accent modification.
 * 
 * An Accent modification causes a note to be played slightly louder with a quicker attack
 * and more rapid taper than normal.
 * 
 * @extends ModificationBase
 */
class Accent extends ModificationBase {

   /**
    * Constructs a new {@link Accent} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Accent" modification cannot infer any parameters from a sequence of notes');
   }

   getModifiedNoteDetails() {
      // TODO: Need to pick instrument option with quick attack / alter attack and taper/release components of returned note
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity * 2.0,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Crescendo modification.
 * 
 * A Crescendo modification causes a sequence of notes to be played with increasing loudness
 * over time.
 * 
 * @extends ModificationBase
 */
class Crescendo extends ModificationBase {

   // Effect-specific private variables
   /** @type {boolean} */
   #isDecrescendo;

   /**
    * Constructs a new {@link Crescendo} modification object.
    * 
    * @param {boolean} isDecrescendo - Whether this modification represents a decrescendo/diminuendo
    */
   constructor(isDecrescendo, tempo, key, details) {
      super(tempo, key, details);
      this.#isDecrescendo = isDecrescendo;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: ['noteIndex', 'totalNumNotes', 'endingDynamic'],
            sequence: ['endingDynamic']
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(sequence, index, params) {
      if (!params || !('endingDynamic' in params))
         throw new WebAudioValueError('The "endingDynamic" parameter cannot be automatically inferred from a note sequence');
      return {
         'noteIndex': index,
         'totalNumNotes': sequence.length,
         'endingDynamic': params.endingDynamic
      };
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable must contain the following two keys:
    * 
    * `noteIndex`: Which note this modification applies to within the total modified phrase (starting at 0)
    * `totalNumNotes`: Total number of notes present in the modified phrase
    * `endingDynamic`: Desired dynamic at the end of the modified phrase
    * 
    * @param {Object<string, number>} details - Information about the total modified phrase and this note's place in it
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('noteIndex' in details) || !('totalNumNotes' in details) || !('endingDynamic' in details))
         throw new WebAudioValueError('The "details" variable must contain the following keys: noteIndex, totalNumNotes, endingDynamic');
      else if (!Number.isInteger(details.noteIndex) || (Number(details.noteIndex) < 1))
         throw new WebAudioValueError(`The "noteIndex" value (${details.noteIndex}) must be a positive integer > 0`);
      else if (!Number.isInteger(details.totalNumNotes) || (Number(details.totalNumNotes) < 2) || (Number(details.totalNumNotes) < Number(details.noteIndex)))
         throw new WebAudioValueError(`The "totalNumNotes" value (${details.totalNumNotes}) must be a positive integer >= noteIndex and > 1`);
      else if (!Number.isInteger(details.endingDynamic) || (Number(details.endingDynamic) < ModificationType.Piano) || (Number(details.endingDynamic) > ModificationType.Fortississimo))
         throw new WebAudioValueError(`The "endingDynamic" value (${details.endingDynamic}) must be a valid dynamic value (e.g., ModificationType.Piano)`);
      const endingVelocity = loadModification(details.endingDynamic, this.tempo, this.key, new NoteDetails(null, null, null)).getModifiedNoteDetails()[0].velocity;
      const velocityModification = (endingVelocity - this.unmodifiedDetails.velocity) / (1 + details.totalNumNotes - details.noteIndex);
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity + ((details.noteIndex == 1) ? 0 : velocityModification),
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Fermata modification.
 * 
 * A Fermata modification causes a note to be played for a longer duration than specified.
 * By default, the duration will be twice what is originally specified.
 * 
 * @extends ModificationBase
 */
class Fermata extends ModificationBase {

   /**
    * Constructs a new {@link Fermata} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: ['relativeDelayExtension'],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Fermata" modification cannot infer any parameters from a sequence of notes');
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable may contain the following optional key:
    * 
    * `relativeDelayExtension`: How much longer than the original duration the note should be
    * held. A value of 1.0 means to hold the note for its exact duration, whereas a value of
    * 2.0 means to hold the note for twice as long. If no value is specified, this parameter
    * will default to 2.0.
    * 
    * @param {Object<string, number>} details - Information about the length of the fermata
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details={relativeDelayExtension: 2.0}) {
      if (!('relativeDelayExtension' in details))
         details.relativeDelayExtension = (('implicit' in details) ? details.implicit : 2.0);
      if (Number(details.relativeDelayExtension) < 1.0)
         throw new WebAudioValueError(`The relative delay extension (${details.relativeDelayExtension}) must be at least 1.0`);
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         this.unmodifiedDetails.duration / Number(details.relativeDelayExtension)
      )];
   }
}

/**
 * Class representing a Glissando modification.
 * 
 * A Glissando modification causes an implicit sequence of notes to be played rapidly and
 * individually between a starting note and the next printed note. The duration of a
 * glissando spans the entire printed duration of the starting note.
 * 
 * @extends ModificationBase
 */
class Glissando extends ModificationBase {

   /**
    * Constructs a new {@link Glissando} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: ['nextNoteValue'],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(sequence, index) {
      return (index < sequence.length) ?
         { 'nextNoteValue': (Array.isArray(sequence[index][0]) ? sequence[index][0][0] : sequence[index][0]) } :
         null;
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable may contain the following optional key:
    * 
    * `nextNoteValue`:  MIDI number of the note that follows this note
    * 
    * @param {Object<string, number>} details - Information about the ending note of the glissando
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('nextNoteValue' in details)) {
         if (!('implicit' in details))
            throw new WebAudioValueError('The "details" variable must contain the following keys: nextNoteValue');
         details.nextNoteValue = details.implicit;
      }
      if (!Number.isInteger(details.nextNoteValue))
         throw new WebAudioValueError(`The next note value (${details.nextNoteValue}) must be a positive integer representing a valid MIDI note`);
      else if (Number(details.nextNoteValue) <= this.unmodifiedDetails.note)
         throw new WebAudioValueError(`The next note (${details.nextNoteValue}) must be higher than the current note (${this.unmodifiedDetails.note})`);
      const glissando = [];
      const totalDurationSeconds = (this.unmodifiedDetails.duration < 0) ?
         -this.unmodifiedDetails.duration : (60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute));
      const noteDuration = totalDurationSeconds / (Number(details.nextNoteValue) - this.unmodifiedDetails.note);
      for (let i = 0, note = this.unmodifiedDetails.note; note < Number(details.nextNoteValue); ++note, ++i)
         glissando.push(new NoteDetails(
            note,
            this.unmodifiedDetails.velocity,
            -noteDuration,
            i * noteDuration
         ));
      return glissando;
   }
}

/**
 * Class representing a Global Dynamic modification.
 * 
 * A Global Dynamic modification causes all subsequent notes to be played either softer
 * or louder than average.
 * 
 * @extends ModificationBase
 */
class GlobalDynamic extends ModificationBase {

   // Effect-specific private variables
   /** @type {number} */
   #degreeOfDynamic;

   // Conversion from degrees to velocity
   static degreesConversion = [
      0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.45, 0.5,
      0.55, 0.6, 0.6, 0.75, 0.75, 0.85, 0.85, 0.95, 0.95 ];

   /**
    * Constructs a new {@link GlobalDynamic} modification object.
    * 
    * @param {number} degreeOfDynamic - Number of dynamic symbols to apply (0.5 for mezzo-dynamics, negative for pianos)
    */
   constructor(degreeOfDynamic, tempo, key, details) {
      super(tempo, key, details);
      this.#degreeOfDynamic = degreeOfDynamic;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "GlobalDynamic" modification cannot infer any parameters from a sequence of notes');
   }

   getModifiedNoteDetails() {
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         GlobalDynamic.degreesConversion[(this.#degreeOfDynamic * 2) + 8],
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Grace note modification.
 * 
 * A Grace note modification causes a note to either begin sounding earlier than anticipated (an
 * acciaccatura) or to rob time from the duration of the next note (an appoggiatura). An
 * appoggiatura will also be lightly accented in loudness, while an accacciatura will be slightly
 * deaccented.
 * 
 * @extends ModificationBase
 */
class Grace extends ModificationBase {

   // Effect-specific private variables
   /** @type {boolean} */
   #isAppoggiatura;

   /**
    * Constructs a new {@link Grace} modification object.
    * 
    * @param {boolean} isAppoggiatura - Whether this modification represents an appoggiatura (vs. an accacciatura)
    */
   constructor(isAppoggiatura, tempo, key, details) {
      super(tempo, key, details);
      this.#isAppoggiatura = isAppoggiatura;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: ['graceNoteValue'],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Grace" modification cannot infer any parameters from a sequence of notes');
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable must contain the following key:
    * 
    * `graceNoteValue`:  MIDI note number of the grace note
    * 
    * @param {Object<string, number>} details - Information about the grace note value
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('graceNoteValue' in details)) {
         if (!('implicit' in details))
            throw new WebAudioValueError('The "details" variable must contain the following keys: graceNoteValue');
         details.graceNoteValue = details.implicit;
      }
      if (!Number.isInteger(details.graceNoteValue) || (Number(details.graceNoteValue) < 1))
         throw new WebAudioValueError(`The grace note value (${details.graceNoteValue}) must be a positive integer representing a valid MIDI note`);
      let primaryNoteStartTimeOffset = 0.0;
      const fullDuration = ((this.unmodifiedDetails.duration < 0) ?
         this.unmodifiedDetails.duration : (-60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute)));
      const graceDuration = -60.0 / ((16.0 / this.tempo.beatBase) * this.tempo.beatsPerMinute);
      const graceNote = new NoteDetails(Number(details.graceNoteValue), this.unmodifiedDetails.velocity, Math.max(graceDuration, fullDuration / 3.0), 0.0, 0.0);
      if (this.#isAppoggiatura) {
         primaryNoteStartTimeOffset -= graceNote.duration;
         graceNote.velocity *= 1.5;
      }
      else {
         graceNote.startTimeOffset = graceNote.duration;
         graceNote.velocity *= 0.75;
      }
      const primaryNote = new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         fullDuration - (this.#isAppoggiatura ? graceNote.duration : 0.0),
         primaryNoteStartTimeOffset,
         this.unmodifiedDetails.duration
      );
      return [graceNote, primaryNote];
   }
}

/**
 * Class representing a Marcato modification.
 * 
 * A Marcato modification causes a note to be played as if it were modified by both an
 * {@link Accent} and a {@link Staccato}.
 * 
 * @extends ModificationBase
 */
class Marcato extends ModificationBase {

   /**
    * Constructs a new {@link Marcato} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Marcato" modification cannot infer any parameters from a sequence of notes');
   }

   getModifiedNoteDetails() {
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity * 2.0,
         this.unmodifiedDetails.duration * 2.0,
         this.unmodifiedDetails.startTimeOffset,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Mordent modification.
 * 
 * A Mordent modification causes an implicit set of notes to be played after the primary
 * printed note. In the case of an upper mordent, the notes to be played are the principle
 * note, the note above it, then the principle note again. In the case of a lower mordent,
 * the notes to be played are the principle note, the note below it, and the principle note
 * again. The total cumulative duration of all notes in the mordent is the same as the
 * printed duration of the principle note.
 * 
 * @extends ModificationBase
 */
class Mordent extends ModificationBase {

   // Effect-specific private variables
   /** @type {boolean} */
   #isUpper;

   // Major scale intervals
   static upperOffsetsMajor = [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1];
   static lowerOffsetsMajor = [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1];

   /**
    * Constructs a new {@link Mordent} modification object.
    * 
    * @param {boolean} isUpper - Whether this modification represents an upper mordent
    */
   constructor(isUpper, tempo, key, details) {
      super(tempo, key, details);
      this.#isUpper = isUpper;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: ['offset'],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Mordent" modification cannot infer any parameters from a sequence of notes');
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable may contain the following optional key:
    * 
    * `offset`:  Integer offset of the mordent from the primary note
    * 
    * @param {Object<string, number>} details - Information about the note value of the mordent
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      let mordentNote = this.unmodifiedDetails.note;
      if (details && (('offset' in details) || ('implicit' in details))) {
         mordentNote += ('offset' in details) ?
            (this.#isUpper ? Number(details.offset) : -Number(details.offset)) :
            (this.#isUpper ? Number(details.implicit) : -Number(details.implicit));
      }
      else {
         mordentNote += (this.#isUpper ? Mordent.upperOffsetsMajor[mordentNote % 12] : -Mordent.lowerOffsetsMajor[mordentNote % 12]);
         mordentNote += this.key.offsets[mordentNote % 12];
      }
      if (!Number.isInteger(mordentNote) || (Number(mordentNote) < 1))
         throw new WebAudioValueError(`The offset value (${mordentNote}) must be a positive integer > 0`);
      const mordentNoteDuration = 60.0 / ((32.0 / this.tempo.beatBase) * this.tempo.beatsPerMinute);
      const primaryNoteDuration = ((this.unmodifiedDetails.duration < 0) ?
         -this.unmodifiedDetails.duration : (60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute))) -
         (2 * mordentNoteDuration);
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         -mordentNoteDuration,
         0.0
      ),
      new NoteDetails(
         mordentNote,
         this.unmodifiedDetails.velocity,
         -mordentNoteDuration,
         mordentNoteDuration
      ),
      new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         -primaryNoteDuration,
         2 * mordentNoteDuration
      )];
   }
}

/**
 * Class representing a Natural modification.
 * 
 * A Natural modification removes any accidentals from a note, causing it to be played
 * as if in the key of C.
 * 
 * @extends ModificationBase
 */
class Natural extends ModificationBase {

   /**
    * Constructs a new {@link Natural} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Natural" modification cannot infer any parameters from a sequence of notes');
   }

   getModifiedNoteDetails() {
      const offset = ([1, 3, 6, 8, 10].includes(this.unmodifiedDetails.note % 12) ? ((this.key.signature > 0) ? -1 : 1) : 0);
      return [new NoteDetails(
         this.unmodifiedDetails.note + offset,
         this.unmodifiedDetails.velocity,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing an Octave Shift modification.
 * 
 * An Octave Shift modification causes a note to be played a full octave higher or lower than written.
 * 
 * @extends ModificationBase
 */
class OctaveShift extends ModificationBase {

   // Effect-specific private variables
   /** @type {boolean} */
   #shiftUp;

   /**
    * Constructs a new {@link OctaveShift} modification object.
    * 
    * @param {boolean} shiftUp - Whether this is an octave shift up or down
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   constructor(shiftUp, tempo, key, details) {
      super(tempo, key, details);
      this.#shiftUp = shiftUp;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(_sequence, _index, params) {
      return params;
   }

   getModifiedNoteDetails() {
      return [new NoteDetails(
         this.unmodifiedDetails.note + (this.#shiftUp ? 12 : -12),
         this.unmodifiedDetails.velocity,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Portamento modification.
 * 
 * A Portamento modification causes a starting note to glide smoothly into the next printed
 * note, with no individual notes being discernible. The duration of a portamento spans the
 * entire printed duration of the starting note.
 * 
 * @extends ModificationBase
 */
class Portamento extends ModificationBase {

   /**
    * Constructs a new {@link Portamento} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: ['nextNoteValue'],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(sequence, index) {
      return (index < sequence.length) ?
         { 'nextNoteValue': (Array.isArray(sequence[index][0]) ? sequence[index][0][0] : sequence[index][0]) } :
         null;
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable may contain the following optional key:
    * 
    * `nextNoteValue`:  MIDI number of the note that follows this note
    * 
    * @param {Object<string, number>} details - Information about the ending note of the portamento
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('nextNoteValue' in details)) {
         if (!('implicit' in details))
            throw new WebAudioValueError('The "details" variable must contain the following keys: nextNoteValue');
         details.nextNoteValue = details.implicit;
      }
      if (!Number.isInteger(details.nextNoteValue))
         throw new WebAudioValueError(`The next note value (${details.nextNoteValue}) must be a positive integer representing a valid MIDI note`);
      else if (Number(details.nextNoteValue) <= this.unmodifiedDetails.note)
         throw new WebAudioValueError(`The next note (${details.nextNoteValue}) must be higher than the current note (${this.unmodifiedDetails.note})`);
      // TODO: CHANGE THIS SO THAT IT DETUNES OVER THE DURATION TO THE "NEXT NOTE VALUE" (ONLY FOR INSTRUMENTS THAT ALLOW FOR CONTINUOUS SLIDES)
      const portamento = [];
      const totalDurationSeconds = (this.unmodifiedDetails.duration < 0) ?
         -this.unmodifiedDetails.duration : (60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute));
      const noteDuration = totalDurationSeconds / (Number(details.nextNoteValue) - this.unmodifiedDetails.note);
      for (let i = 0, note = this.unmodifiedDetails.note; note < Number(details.nextNoteValue); ++note, ++i)
         portamento.push(new NoteDetails(
            note,
            this.unmodifiedDetails.velocity,
            -noteDuration,
            i * noteDuration
         ));
      return portamento;
   }
}

/**
 * Class representing a Sforzando modification.
 * 
 * A Sforzando modification causes a note to be played in the same was as a note with an
 * {@link Accent} modification.
 * 
 * @extends ModificationBase
 */
class Sforzando extends ModificationBase {

   /**
    * Constructs a new {@link Sforzando} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Sforzando" modification cannot infer any parameters from a sequence of notes');
   }

   getModifiedNoteDetails() {
      // TODO: Need to pick instrument option with quick attack / alter attack and taper/release components of returned note
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity * 2.0,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Slur modification.
 * 
 * A Slur modification causes a sequence of notes to be played as if belonging to a
 * single phrase. This translates to a slight crescendo/descrescendo over the course
 * of the sequence, as well as a somewhat early release of the final note.
 * 
 * @extends ModificationBase
 */
class Slur extends ModificationBase {

   /**
    * Constructs a new {@link Slur} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: ['noteIndex', 'totalNumNotes'],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(sequence, index) {
      return {
         'noteIndex': index,
         'totalNumNotes': sequence.length
      };
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable must contain the following two keys:
    * 
    * `noteIndex`: Which note this modification applies to within the total modified phrase (starting at 1)
    * `totalNumNotes`: Total number of notes present in the modified phrase
    * 
    * @param {Object<string, number>} details - Information about the total modified phrase and this note's place in it
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('noteIndex' in details) || !('totalNumNotes' in details))
         throw new WebAudioValueError('The "details" variable must contain the following keys: noteIndex, totalNumNotes');
      else if (!Number.isInteger(details.noteIndex) || (Number(details.noteIndex) < 1))
         throw new WebAudioValueError(`The "noteIndex" value (${details.noteIndex}) must be a positive integer > 0`);
      else if (!Number.isInteger(details.totalNumNotes) || (Number(details.totalNumNotes) < 1) ||
              (Number(details.totalNumNotes) < Number(details.noteIndex)))
         throw new WebAudioValueError(`The "totalNumNotes" value (${details.totalNumNotes}) must be a positive integer >= noteIndex`);
      const velocityModification = 1.0 + Math.sin(Math.PI * Number(details.noteIndex) / Number(details.totalNumNotes));
      const duration = (this.unmodifiedDetails.duration < 0) ? -this.unmodifiedDetails.duration :
         (60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute));
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity * velocityModification,
         (Number(details.noteIndex) < Number(details.totalNumNotes)) ? this.unmodifiedDetails.duration : -duration + (60.0 / ((32.0 / this.tempo.beatBase) * this.tempo.beatsPerMinute)),
         0.0,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Staccato modification.
 * 
 * A Staccato modification causes a note to be played with a rapid attack for one-half of the
 * printed duration, such that there is silence for the second half of the duration. If a
 * staccatissimo modification is requested, the note will only sound for one-quarter of the
 * printed duration.
 * 
 * @extends ModificationBase
 */
class Staccato extends ModificationBase {

   // Effect-specific private variables
   /** @type {boolean} */
   #isStaccatissimo;

   /**
    * Constructs a new {@link Staccato} modification object.
    * 
    * @param {boolean} isStaccatissimo - Whether this modification represents a staccatissimo duration shortening
    */
   constructor(isStaccatissimo, tempo, key, details) {
      super(tempo, key, details);
      this.#isStaccatissimo = isStaccatissimo;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Staccato" modification cannot infer any parameters from a sequence of notes');
   }

   getModifiedNoteDetails() {  // TODO: Need to pick instrument option with quick attack / alter attack and taper/release components of returned note
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         this.unmodifiedDetails.duration * (this.#isStaccatissimo ? 4.0 : 2.0),
         0.0,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Tenuto modification.
 * 
 * A Tenuto modification forces a note to played for its full duration, regardless of its
 * location in a phrase or any other modifications, implicit or explicit.
 * 
 * @extends ModificationBase
 */
class Tenuto extends ModificationBase {

   /**
    * Constructs a new {@link Tenuto} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Tenuto" modification cannot infer any parameters from a sequence of notes');
   }

   getModifiedNoteDetails() {
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Tie modification.
 * 
 * A Tie modification causes a note to continue to play for both its own duration and
 * the duration of the note to which it is tied.
 * 
 * @extends ModificationBase
 */
class Tie extends ModificationBase {

   /**
    * Constructs a new {@link Tie} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: ['tiedDuration'],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(sequence, index) {
      const params = { 'tiedDuration': 0 };
      for (let i = index; i < sequence.length; ++i)
         params.tiedDuration = 1.0 / ((params.tiedDuration ? (1.0 / params.tiedDuration) : 0.0) + (1.0 / (Array.isArray(sequence[i][0]) ? sequence[i][0][1] : sequence[i][1])));
      return params;
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable may contain the following key:
    * 
    * `tiedDuration`: The duration of the note to which this note is tied
    * 
    * @param {Object<string, number>} details - Information about the tied phrase
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('tiedDuration' in details)) {
         if (!('implicit' in details))
            throw new WebAudioValueError('The "details" variable must contain the following keys: tiedDuration');
         details.tiedDuration = details.implicit;
      }
      if (Number(details.tiedDuration) < 0.0)
         throw new WebAudioValueError(`The target tied duration (${details.tiedDuration}) cannot be negative`);
      const duration = (this.unmodifiedDetails.duration < 0) ? -this.unmodifiedDetails.duration : (60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute));
      const tiedDuration = (Number(details.tiedDuration) > 0) ? (60.0 / ((Number(details.tiedDuration) / this.tempo.beatBase) * this.tempo.beatsPerMinute)) : 0.0;
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         -(duration + tiedDuration),
         0.0,
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Class representing a Trill modification.
 * 
 * A Trill modification causes an implicit set of notes to be played after the primary
 * printed note. In the case of an upper trill, the notes to be played are the principle
 * note and the note above it, repeated for the printed duration of the principle note.
 * In the case of a lower trill, the notes to be played are the principle note and the
 * note below it, repeated for the printed duration of the principle note.
 * 
 * @extends ModificationBase
 */
class Trill extends ModificationBase {

   // Effect-specific private variables
   /** @type {boolean} */
   #isUpper;

   // Major scale intervals
   static upperOffsetsMajor = [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1];
   static lowerOffsetsMajor = [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1];

   /**
    * Constructs a new {@link Trill} modification object.
    * 
    * @param {boolean} isUpper - Whether this modification represents an upper trill
    */
   constructor(isUpper, tempo, key, details) {
      super(tempo, key, details);
      this.#isUpper = isUpper;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: ['offset'],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Trill" modification cannot infer any parameters from a sequence of notes');
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable may contain the following optional key:
    * 
    * `offset`:  Integer offset of the trill from the primary note
    * 
    * @param {Object<string, number>} details - Information about the note value of the trill
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      let trillNote = this.unmodifiedDetails.note;
      if (details && (('offset' in details) || ('implicit' in details))) {
         trillNote += ('offset' in details) ?
            (this.#isUpper ? Number(details.offset) : -Number(details.offset)) :
            (this.#isUpper ? Number(details.implicit) : -Number(details.implicit));
      }
      else {
         trillNote += (this.#isUpper ? Trill.upperOffsetsMajor[trillNote % 12] : -Trill.lowerOffsetsMajor[trillNote % 12]);
         trillNote += this.key.offsets[trillNote % 12];
      }
      if (!Number.isInteger(trillNote) || (Number(trillNote) < 1))
         throw new WebAudioValueError(`The offset value (${trillNote}) must be a positive integer > 0`);
      const trill = [];
      const fullNoteDuration = (this.unmodifiedDetails.duration < 0) ?
         -this.unmodifiedDetails.duration : (60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute));
      const trillNoteDuration = 60.0 / ((32.0 / this.tempo.beatBase) * this.tempo.beatsPerMinute);
      const numNotes = Math.floor(fullNoteDuration / trillNoteDuration);
      for (let i = 0; i < numNotes; ++i)
         trill.push(new NoteDetails(
            (i % 2) ? trillNote : this.unmodifiedDetails.note,
            this.unmodifiedDetails.velocity * ((i == 0) ? 1.0 : 0.75),
            -trillNoteDuration,
            i * trillNoteDuration
         ));
      if ((numNotes * trillNoteDuration) < fullNoteDuration)
         trill.push(new NoteDetails(
            (numNotes % 2) ? trillNote : 0,
            this.unmodifiedDetails.velocity,
            -(fullNoteDuration - (numNotes * trillNoteDuration)),
            numNotes * trillNoteDuration
         ));
      return trill;
   }
}

/**
 * Class representing a Tuplet modification.
 * 
 * A Tuplet modification causes a note to play for only 1/N of the duration of the next
 * longest standard note duration. For example, three eighth notes in a triplet would
 * take the same amount of time to play as a single quarter note. As an alternate
 * formulation, an N-tuplet-modified note would play for 2/N of its printed duration.
 * 
 * @extends ModificationBase
 */
class Tuplet extends ModificationBase {

   /**
    * Constructs a new {@link Tuplet} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: ['numNotes', 'intoNumNotes'],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(sequence) {
      return { 'numNotes': sequence.length, 'intoNumNotes': ((sequence.length == 3) ? 2 : 4) };
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable must contain the following two keys:
    * 
    * `numNotes`: Number of notes taking part in the tuplet
    * `intoNumNotes`: Number of notes of the same duration that should total the full duration of the tuplet
    * 
    * @param {Object<string, number>} details - Timing information about the triplet
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('numNotes' in details) || !('intoNumNotes' in details))
         throw new WebAudioValueError('The "details" variable must contain the following keys: numNotes, intoNumNotes');
      else if ((Number(details.numNotes) < 0) || (Number(details.intoNumNotes) < 0))
         throw new WebAudioValueError('The "numNotes" and "intoNumNotes" parameters must be positive');
      else if (Number(details.numNotes) < Number(details.intoNumNotes))
         throw new WebAudioValueError('The "numNotes" parameters must be greater than the "intoNumNotes" parameter');
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         this.unmodifiedDetails.duration * (Number(details.numNotes) / Number(details.intoNumNotes))
      )];
   }
}

/**
 * Class representing a TupletNote modification.
 * 
 * A TupletNote modification causes a note to play for only 1/N of the duration of
 * the next longest standard note duration. For example, three eighth notes in a triplet
 * would take the same amount of time to play as a single quarter note. As an alternate
 * formulation, an N-tuplet-modified note would play for 2/N of its printed duration.
 * 
 * @extends ModificationBase
 */
class TupletNote extends ModificationBase {

   // Effect-specific private variables
   /** @type {number} */
   #degree;

   /**
    * Constructs a new {@link TupletNote} modification object.
    */
   constructor(degree, tempo, key, details) {
      super(tempo, key, details);
      this.#degree = degree;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return true;
   }

   static inferParametersFromSequence(_sequence, _index, params) {
      return params;
   }

   getModifiedNoteDetails() {
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         this.unmodifiedDetails.duration * (this.#degree / ((this.#degree == 3) ? 2 : 4))
      )];
   }
}

/**
 * Class representing a Turn modification.
 * 
 * A Turn modification causes an implicit set of notes to be played after the primary
 * printed note. In the case of an upper turn, the notes to be played are the principle
 * note, the note above it, the principle note, the note below it, then finally the
 * principle note again. In the case of a lower turn, the notes to be played are the
 * principle note, the note below it, the principle note, the note above it, then finally
 * the principle note again. The total cumulative duration of all notes in the turn is
 * the same as the printed duration of the principle note.
 * 
 * @extends ModificationBase
 */
class Turn extends ModificationBase {

   // Effect-specific private variables
   /** @type {boolean} */
   #isUpper;

   // Major scale intervals
   static upperOffsetsMajor = [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1];
   static lowerOffsetsMajor = [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1];

   /**
    * Constructs a new {@link Turn} modification object.
    * 
    * @param {boolean} isUpper - Whether this modification represents an upper turn
    */
   constructor(isUpper, tempo, key, details) {
      super(tempo, key, details);
      this.#isUpper = isUpper;
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: [],
            sequence: []
         },
         optional: {
            singleNote: ['upperOffset', 'lowerOffset'],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Turn" modification cannot infer any parameters from a sequence of notes');
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable may contain the following two keys:
    * 
    * `upperOffset`: Upper offset value of the turn from the primary note
    * `lowerOffset`: Lower offset value of the turn from the primary note
    * 
    * @param {Object<string, number>} [details] - Details about the notes in the turn
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      let upperNote = this.unmodifiedDetails.note, lowerNote = this.unmodifiedDetails.note;
      if (details && ('upperOffset' in details))
         upperNote += Number(details.upperOffset);
      else {
         upperNote += Turn.upperOffsetsMajor[upperNote % 12];
         upperNote += this.key.offsets[upperNote % 12];
      }
      if (details && ('lowerOffset' in details))
         lowerNote -= Number(details.lowerOffset);
      else {
         lowerNote -= Turn.lowerOffsetsMajor[lowerNote % 12];
         lowerNote += this.key.offsets[lowerNote % 12];
      }
      const turnNoteDuration = 60.0 / ((32.0 / this.tempo.beatBase) * this.tempo.beatsPerMinute);
      const primaryNoteDuration = ((this.unmodifiedDetails.duration < 0) ?
         -this.unmodifiedDetails.duration : (60.0 / ((this.unmodifiedDetails.duration / this.tempo.beatBase) * this.tempo.beatsPerMinute))) -
         (4 * turnNoteDuration);
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         -turnNoteDuration,
         0.0
      ),
      new NoteDetails(
         this.#isUpper ? upperNote : lowerNote,
         this.unmodifiedDetails.velocity * 0.75,
         -turnNoteDuration,
         turnNoteDuration
      ),
      new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity * 0.75,
         -turnNoteDuration,
         2 * turnNoteDuration
      ),
      new NoteDetails(
         this.#isUpper ? lowerNote : upperNote,
         this.unmodifiedDetails.velocity * 0.75,
         -turnNoteDuration,
         3 * turnNoteDuration
      ),
      new NoteDetails(
         this.unmodifiedDetails.note,
         this.unmodifiedDetails.velocity,
         -primaryNoteDuration,
         4 * turnNoteDuration
      )];
   }
}

/**
 * Class representing a Velocity modification.
 * 
 * A Velocity modification causes a note to be played at an absolute velocity between [0.0, 1.0].
 * 
 * @extends ModificationBase
 */
class Velocity extends ModificationBase {

   /**
    * Constructs a new {@link Velocity} modification object.
    */
   constructor(tempo, key, details) {
      super(tempo, key, details);
   }

   /**
    * Returns a list of all parameters available for use in this modification, including whether
    * the parameter is required or optional when playing back either a "sequence" or just a
    * single "note".
    * 
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    */
   static getParameters() {
      return {
         required: {
            singleNote: ['velocity'],
            sequence: []
         },
         optional: {
            singleNote: [],
            sequence: []
         }
      };
   }

   /**
    * Returns whether this modification can be used to modify a sequence of notes.
    * 
    * @returns {boolean} Whether this modification can be used to modify a sequence of notes
    */
   static canModifySequence() {
      return false;
   }

   static inferParametersFromSequence() {
      throw new WebAudioValueError('The "Velocity" modification cannot infer any parameters from a sequence of notes');
   }

   /**
    * Returns a list of all modified notes, durations, and velocities as generated by the
    * corresponding modification class.
    * 
    * The `details` variable must contain the following key:
    * 
    * `velocity`:  Intensity at which to play the note between [0.0, 1.0]
    * 
    * @param {Object<string, number>} details - Information about the intensity of the note
    * @returns {NoteDetails[]} List of {@link NoteDetails} to replace the original note
    */
   getModifiedNoteDetails(details) {
      if (!('velocity' in details)) {
         if (!('implicit' in details))
            throw new WebAudioValueError('The "details" variable must contain the following keys: velocity');
         details.velocity = details.implicit;
      }
      if ((Number(details.velocity) < 0.0) || (Number(details.velocity) > 1.0))
         throw new WebAudioValueError(`The target velocity value (${details.velocity}) is outside of the available range: [0.0, 1.0]`);
      return [new NoteDetails(
         this.unmodifiedDetails.note,
         Number(details.velocity),
         this.unmodifiedDetails.duration
      )];
   }
}

/**
 * Module containing functionality to apply {@link WebAudioAPI} note modifications.
 * @module Modification
 */


const ModificationClasses = {
   [ModificationType.Accent]: [Accent, Accent],
   [ModificationType.Marcato]: [Marcato, Marcato],
   [ModificationType.Staccato]: [Staccato, Staccato.bind(null, false)],
   [ModificationType.Staccatissimo]: [Staccato, Staccato.bind(null, true)],
   [ModificationType.Tenuto]: [Tenuto, Tenuto],
   [ModificationType.Sforzando]: [Sforzando, Sforzando],
   [ModificationType.Slur]: [Slur, Slur],
   [ModificationType.Portamento]: [Portamento, Portamento],
   [ModificationType.Crescendo]: [Crescendo, Crescendo.bind(null, false)],
   [ModificationType.Decrescendo]: [Crescendo, Crescendo.bind(null, true)],
   [ModificationType.Diminuendo]: [Crescendo, Crescendo.bind(null, true)],
   [ModificationType.TrillUpper]: [Trill, Trill.bind(null, true)],
   [ModificationType.TrillLower]: [Trill, Trill.bind(null, false)],
   [ModificationType.MordentUpper]: [Mordent, Mordent.bind(null, true)],
   [ModificationType.MordentLower]: [Mordent, Mordent.bind(null, false)],
   [ModificationType.TurnUpper]: [Turn, Turn.bind(null, true)],
   [ModificationType.TurnLower]: [Turn, Turn.bind(null, false)],
   [ModificationType.Glissando]: [Glissando, Glissando],
   [ModificationType.GraceAcciaccatura]: [Grace, Grace.bind(null, false)],
   [ModificationType.GraceAppoggiatura]: [Grace, Grace.bind(null, true)],
   [ModificationType.Tie]: [Tie, Tie],
   [ModificationType.Velocity]: [Velocity, Velocity],
   [ModificationType.Natural]: [Natural, Natural],
   [ModificationType.Piano]: [GlobalDynamic, GlobalDynamic.bind(null, -1)],
   [ModificationType.MezzoPiano]: [GlobalDynamic, GlobalDynamic.bind(null, -0.5)],
   [ModificationType.OctaveShiftUp]: [OctaveShift, OctaveShift.bind(null, true)],
   [ModificationType.OctaveShiftDown]: [OctaveShift, OctaveShift.bind(null, false)],
   [ModificationType.Pianissimo]: [GlobalDynamic, GlobalDynamic.bind(null, -2)],
   [ModificationType.Pianississimo]: [GlobalDynamic, GlobalDynamic.bind(null, -3)],
   [ModificationType.Forte]: [GlobalDynamic, GlobalDynamic.bind(null, 1)],
   [ModificationType.MezzoForte]: [GlobalDynamic, GlobalDynamic.bind(null, 0.5)],
   [ModificationType.Fortissimo]: [GlobalDynamic, GlobalDynamic.bind(null, 2)],
   [ModificationType.Fortississimo]: [GlobalDynamic, GlobalDynamic.bind(null, 3)],
   [ModificationType.Tuplet]: [Tuplet, Tuplet],
   [ModificationType.Triplet]: [TupletNote, TupletNote.bind(null, 3)],
   [ModificationType.Quintuplet]: [TupletNote, TupletNote.bind(null, 5)],
   [ModificationType.Sextuplet]: [TupletNote, TupletNote.bind(null, 6)],
   [ModificationType.Septuplet]: [TupletNote, TupletNote.bind(null, 7)],
   [ModificationType.Fermata]: [Fermata, Fermata]
};


/**
 * Returns whether the corresponding {@link module:Constants.ModificationType ModificationType}
 * can be used to modify a sequence of notes.
 * 
 * @param {number} modificationType - The {@link module:Constants.ModificationType ModificationType} about which to query
 * @returns {boolean} Whether the corresponding modification type can be used to modify a sequence of notes
 * @see {@link module:Constants.ModificationType ModificationType}
 */
function canModifySequence(modificationType) {
   return ModificationClasses[modificationType][0].canModifySequence();
}

/**
 * Returns a list of modification-specific parameters for use with the corresponding
 * {@link module:Constants.ModificationType ModificationType}.
 * 
 * Note that the `modificationType` parameter must be the **numeric value** associated
 * with a certain {@link module:Constants.ModificationType ModificationType}, not a
 * string-based key.
 * 
 * The object returned from this function will contain 2 keys: 'required' and 'optional'.
 * These keys can be used to access sub-objects with 2 keys: 'singleNote' and 'sequence'.
 * These keys hold arrays containing the string-based names of parameters that are available
 * for manipulation within the given modification.
 * 
 * Parameter values within the "sequence" array indicate parameters that have meaning when
 * used with the {@link WebAudioAPI#playSequence playSequence()} function. Parameter values
 * within the "singleNote" array indicate parameters that have meaning when used with the 
 * {@link WebAudioAPI#playNote playNote()} function.
 * 
 * @param {number} modificationType - The {@link module:Constants.ModificationType ModificationType} for which to return a parameter list
 * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
 * @see {@link module:Constants.ModificationType ModificationType}
 */
function getModificationParameters(modificationType) {
   return ModificationClasses[modificationType][0].getParameters();
}

/**
 * Attempts to infer the required modification parameter values from a given sequence of notes.
 * 
 * @param {number} modificationType - Numeric value corresponding to the desired {@link module:Constants.ModificationType ModificationType}
 * @param {Array<Array|Array<Array>>} sequence - Array of `[note, duration]` and/or chords corresponding to the sequence to be played
 * @param {number} index - Index of the current note in the sequence
 * @param {Object|null} params - Object containing the currently known parameter values
 * @returns {Object} Object containing the inferred and known parameter values
 * @see {@link module:Constants.ModificationType ModificationType}
 */
function inferModificationParametersFromSequence(modificationType, sequence, index, params) {
   return ModificationClasses[modificationType][0].inferParametersFromSequence(sequence, index, params);
}

/**
 * Loads a concrete {@link ModificationBase} instance capable of modifying an individual note
 * and duration.
 * 
 * @param {number} modificationType - Numeric value corresponding to the desired {@link module:Constants.ModificationType ModificationType}
 * @param {Tempo} tempo - Reference to the current global {@link Tempo} object
 * @param {Key} key - Reference to the current global {@link Key} object
 * @param {NoteDetails} details - Unmodified details about the note to be played
 * @returns {ModificationBase} Newly created note {@link ModificationBase} object
 * @see {@link module:Constants.ModificationType ModificationType}
 * @see {@link ModificationBase}
 * @see {@link NoteDetails}
 * @see {@link Tempo}
 */
function loadModification(modificationType, tempo, key, details) {

   // Load the requested concrete modification type
   return new ModificationClasses[modificationType][1](tempo, key, details);
}

/** Class representing all base-level {@link WebAudioAPI} effects */
class EffectBase {

   // Reference to the stored global AudioContext
   /** @type {AudioContext} */
   audioContext = null;

   /**
    * Called by a concrete effect instance to initialize the inherited {@link EffectBase} data
    * structure.
    * 
    * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
    */
   constructor(audioContext) {
      this.audioContext = audioContext;
   }

   /**
    * Loads the necessary data to implement the corresponding {@link Effect}, which can then be
    * applied to an individual {@link Track} or to the aggregate output of all tracks.
    */
   async load() { return; }

   /**
    * Returns the value of all effect parameters at the current time.
    * 
    * @returns {Object} Effect-specific parameter values with keys as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    */
   currentParameterValues() { return undefined; }

   /**
    * Updates the parameters of the effect at the specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update(effectOptions, updateTime, timeConstant) { return false; }

   /**
    * Returns a reference to the {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
    * to which all source {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNodes}
    * should be connected in order to activate this {@link Effect}.
    * 
    * @returns {AudioNode} Reference to the first {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode} in the effect sequencing pipeline
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
    */
   getInputNode() { return undefined; }

   /**
    * Returns a reference to the {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
    * from which all effect-modified output audio is produced.
    * 
    * @returns {AudioNode} Reference to the final {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode} in the effect sequencing pipeline
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
    */
   getOutputNode() { return undefined; }
}

/**
 * Class representing a Band-Pass Filter effect.
 * 
 * A Band-Pass Filter is defined by a lower and upper cutoff frequency between which audio
 * signals are allowed to pass, while all frequencies outside of this range are reduced or
 * eliminated completely.
 * 
 * @extends EffectBase
 */
class BandPassFilter extends EffectBase {

   // Effect-specific private variables
   /** @type {BiquadFilterNode} */
   #filterNode;
   /** @type {number} */
   #lowerCutoffFrequency;
   /** @type {number} */
   #upperCutoffFrequency;

   // Parameter limits
   static minFrequency = 1;
   static maxFrequency = 22050;

   /**
    * Constructs a new {@link BandPassFilter} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#filterNode = new BiquadFilterNode(audioContext, { type: 'bandpass' });
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'lowerCutoffFrequency', type: 'number', validValues: [BandPassFilter.minFrequency, BandPassFilter.maxFrequency], defaultValue: BandPassFilter.minFrequency },
         { name: 'upperCutoffFrequency', type: 'number', validValues: [BandPassFilter.minFrequency, BandPassFilter.maxFrequency], defaultValue: BandPassFilter.maxFrequency }
      ];
   }

   async load() {
      this.#lowerCutoffFrequency = BandPassFilter.minFrequency;
      this.#upperCutoffFrequency = BandPassFilter.maxFrequency;
      this.#filterNode.frequency.value = 148.5;
      this.#filterNode.Q.value = 0.0001;
   }

   /**
    * Updates the {@link BandPassFilter} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} lowerCutoffFrequency - Frequency below which audio content will be reduced between [1, 22050]
    * @param {number} upperCutoffFrequency - Frequency above which audio content will be reduced between [1, 22050]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({lowerCutoffFrequency, upperCutoffFrequency}, updateTime, timeConstant) {
      if ((lowerCutoffFrequency == null) && (upperCutoffFrequency == null))
         throw new WebAudioValueError('Cannot update the BandPassFilter effect without at least one of the following parameters: "lowerCutoffFrequency, upperCutoffFrequency"');
      if (lowerCutoffFrequency != null) {
         if (((upperCutoffFrequency != null) && (lowerCutoffFrequency > upperCutoffFrequency)) || (lowerCutoffFrequency > this.#upperCutoffFrequency))
            throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
      }
      else if (upperCutoffFrequency < this.#lowerCutoffFrequency)
         throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
      if ((lowerCutoffFrequency != null) && (lowerCutoffFrequency < BandPassFilter.minFrequency))
         throw new WebAudioValueError(`Lower cutoff frequency cannot be less than ${BandPassFilter.minFrequency}`);
      if ((upperCutoffFrequency != null) && (upperCutoffFrequency > BandPassFilter.maxFrequency))
         throw new WebAudioValueError(`Upper cutoff frequency cannot be greater than ${BandPassFilter.maxFrequency}`);
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (lowerCutoffFrequency != null)
         this.#lowerCutoffFrequency = lowerCutoffFrequency;
      if (upperCutoffFrequency != null)
         this.#upperCutoffFrequency = upperCutoffFrequency;
      const centerFrequency = Math.sqrt(this.#upperCutoffFrequency * this.#lowerCutoffFrequency);
      this.#filterNode.frequency.setTargetAtTime(centerFrequency, timeToUpdate, timeConstantTarget);
      this.#filterNode.Q.setTargetAtTime(centerFrequency / (0.0001 + this.#upperCutoffFrequency - this.#lowerCutoffFrequency), timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         lowerCutoffFrequency: this.#lowerCutoffFrequency,
         upperCutoffFrequency: this.#upperCutoffFrequency
      };
   }

   getInputNode() {
      return this.#filterNode;
   }

   getOutputNode() {
      return this.#filterNode;
   }
}

/**
 * Class representing a Band-Reject Filter effect.
 * 
 * A Band-Reject Filter is defined by a lower and upper cutoff frequency between which audio
 * signals are reduced or eliminated completely, while all frequencies outside of this range are
 * allowed to pass without alteration.
 * 
 * @extends EffectBase
 */
class BandRejectFilter extends EffectBase {

   // Effect-specific private variables
   /** @type {BiquadFilterNode} */
   #filterNode;
   /** @type {number} */
   #lowerCutoffFrequency;
   /** @type {number} */
   #upperCutoffFrequency;

   // Parameter limits
   static minFrequency = 1;
   static maxFrequency = 22050;

   /**
    * Constructs a new {@link BandRejectFilter} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#filterNode = new BiquadFilterNode(audioContext, { type: 'notch' });
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'lowerCutoffFrequency', type: 'number', validValues: [BandRejectFilter.minFrequency, BandRejectFilter.maxFrequency], defaultValue: 148.5 },
         { name: 'upperCutoffFrequency', type: 'number', validValues: [BandRejectFilter.minFrequency, BandRejectFilter.maxFrequency], defaultValue: 148.5 }
      ];
   }

   async load() {
      this.#lowerCutoffFrequency = 148.5;
      this.#upperCutoffFrequency = 148.5;
      this.#filterNode.frequency.value = 148.5;
      this.#filterNode.Q.value = 1000.0;
   }

   /**
    * Updates the {@link BandRejectFilter} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} lowerCutoffFrequency - Frequency above which audio content will be reduced between [1, 22050]
    * @param {number} upperCutoffFrequency - Frequency below which audio content will be reduced between [1, 22050]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({lowerCutoffFrequency, upperCutoffFrequency}, updateTime, timeConstant) {
      if ((lowerCutoffFrequency == null) && (upperCutoffFrequency == null))
         throw new WebAudioValueError('Cannot update the BandRejectFilter effect without at least one of the following parameters: "lowerCutoffFrequency, upperCutoffFrequency"');
      if (lowerCutoffFrequency != null) {
         if (lowerCutoffFrequency < 20) {
            lowerCutoffFrequency = 20;
            if ((upperCutoffFrequency != null) && (upperCutoffFrequency < 20))
               upperCutoffFrequency = 20;
         }
         if (((upperCutoffFrequency != null) && (lowerCutoffFrequency > upperCutoffFrequency)) || (lowerCutoffFrequency > this.#upperCutoffFrequency))
            throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
      }
      else if (upperCutoffFrequency < this.#lowerCutoffFrequency)
         throw new WebAudioValueError('Lower cutoff frequency cannot be greater than the upper cutoff frequency');
      if ((lowerCutoffFrequency != null) && (lowerCutoffFrequency < BandRejectFilter.minFrequency))
         throw new WebAudioValueError(`Lower cutoff frequency cannot be less than ${BandRejectFilter.minFrequency}`);
      if ((upperCutoffFrequency != null) && (upperCutoffFrequency > BandRejectFilter.maxFrequency))
         throw new WebAudioValueError(`Upper cutoff frequency cannot be greater than ${BandRejectFilter.maxFrequency}`);
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (lowerCutoffFrequency != null)
         this.#lowerCutoffFrequency = lowerCutoffFrequency;
      if (upperCutoffFrequency != null)
         this.#upperCutoffFrequency = upperCutoffFrequency;
      const centerFrequency = Math.sqrt(this.#upperCutoffFrequency * this.#lowerCutoffFrequency);
      this.#filterNode.frequency.setTargetAtTime(centerFrequency, timeToUpdate, timeConstantTarget);
      this.#filterNode.Q.setTargetAtTime(centerFrequency / (0.0001 + this.#upperCutoffFrequency - this.#lowerCutoffFrequency), timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         lowerCutoffFrequency: this.#lowerCutoffFrequency,
         upperCutoffFrequency: this.#upperCutoffFrequency
      };
   }

   getInputNode() {
      return this.#filterNode;
   }

   getOutputNode() {
      return this.#filterNode;
   }
}

/**
 * Class representing a Chorus effect.
 * 
 * A Chorus effect is an audio modulation effect that replicates an audio signal and modulates
 * and delays the result, such that it comes directly after and alters the original signal's
 * pitch. This effect is used to thicken the tone of an audio signal and create an epic feeling.
 * 
 * @extends EffectBase
 */
class Chorus extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #inputNode;
   /** @type {GainNode} */
   #outputNode;
   /** @type {DelayNode} */
   #wetDelayNode;
   /** @type {OscillatorNode} */
   #lfoNode;
   /** @type {GainNode} */
   #lfoGainNode;
   /** @type {DelayNode} */
   #delayLeft;
   /** @type {DelayNode} */
   #delayRight;
   /** @type {GainNode} */
   #feedbackLeft;
   /** @type {GainNode} */
   #feedbackRight;

   // Parameter limits
   static minRate = 0;
   static maxRate = 10;
   static minDelay = 0.0001;
   static maxDelay = 0.1;
   static minFeedback = 0;
   static maxFeedback = 0.95;
   static minIntensity = 0;
   static maxIntensity = 1;

   /**
    * Constructs a new {@link Chorus} effect object.
    */
   constructor(audioContext) {
      super(audioContext);

      this.#inputNode = new GainNode(audioContext);
      this.#outputNode = new GainNode(audioContext);
      const splitter = new ChannelSplitterNode(audioContext, { numberOfOutputs: 2 });
      this.#lfoNode = new OscillatorNode(audioContext);
      this.#delayLeft = new DelayNode(audioContext, { maxDelayTime: 1 });
      this.#delayRight = new DelayNode(audioContext, { maxDelayTime: 1 });
      this.#wetDelayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
      this.#lfoGainNode = new GainNode(audioContext);
      this.#feedbackLeft = new GainNode(audioContext);
      this.#feedbackRight = new GainNode(audioContext);
      const merger = new ChannelMergerNode(audioContext, { numberOfInputs: 2 });

      this.#lfoNode.connect(this.#lfoGainNode);
      this.#lfoGainNode.connect(this.#delayLeft.delayTime);
      this.#lfoGainNode.connect(this.#delayRight.delayTime);

      this.#inputNode.connect(this.#outputNode);
      this.#inputNode.connect(this.#wetDelayNode);
      this.#wetDelayNode.connect(splitter);
      splitter.connect(this.#delayLeft, 0);
      splitter.connect(this.#delayRight, 1);
      this.#delayLeft.connect(this.#feedbackLeft).connect(this.#delayRight).connect(merger, 0, 1);
      this.#delayRight.connect(this.#feedbackRight).connect(this.#delayLeft).connect(merger, 0, 0);
      merger.connect(this.#outputNode);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'rate', type: 'number', validValues: [Chorus.minRate, Chorus.maxRate], defaultValue: 0.8 },
         { name: 'shape', type: 'string', validValues: ['sine', 'square', 'sawtooth', 'triangle'], defaultValue: 'sine' },
         { name: 'delay', type: 'number', validValues: [Chorus.minDelay, Chorus.maxDelay], defaultValue: 0.03 },
         { name: 'feedback', type: 'number', validValues: [Chorus.minFeedback, Chorus.maxFeedback], defaultValue: 0 },
         { name: 'intensity', type: 'number', validValues: [Chorus.minIntensity, Chorus.maxIntensity], defaultValue: 0 },
      ];
   }

   async load() {
      this.#inputNode.gain.value = 0.5;
      this.#outputNode.gain.value = 1;
      this.#lfoGainNode.gain.value = 0;
      this.#wetDelayNode.delayTime.value = 0.03;
      this.#delayLeft.delayTime.value = this.#delayRight.delayTime.value = 0.01;
      this.#feedbackLeft.gain.value = this.#feedbackRight.gain.value = 0;
      this.#lfoNode.frequency.value = 0.8;
      this.#lfoNode.type = 'sine';
      this.#lfoNode.start();
   }

   /**
    * Updates the {@link Chorus} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} rate - Frequency at which an oscillator modulates the delayed chorus signal in Hertz between [0, 10]
    * @param {string} shape - Waveform shape used to modulate the delayed chorus signal from ['sine', 'square', 'sawtooth', 'triangle']
    * @param {number} delay - Number of seconds delay between the original signal and the modulated chorus signal between [0.0001, 0.1]
    * @param {number} feedback - Percentage of processed signal to be fed back into the chorus circuit between [0, 0.95]
    * @param {number} intensity - Amount of modulation to apply as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ rate, shape, delay, feedback, intensity }, updateTime, timeConstant) {
      if ((rate == null) && (shape == null) && (delay == null) && (feedback == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Chorus effect without at least one of the following parameters: "rate, shape, delay, feedback, intensity"');
      if (rate != null) {
         if (rate < Chorus.minRate)
            throw new WebAudioValueError(`Rate value cannot be less than ${Chorus.minRate}`);
         else if (rate > Chorus.maxRate)
            throw new WebAudioValueError(`Rate value cannot be greater than ${Chorus.maxRate}`);
      }
      if (shape != null) {
         if (!['sine', 'square', 'sawtooth', 'triangle'].includes(shape))
            throw new WebAudioValueError('Shape value must be one of: ["sine", "square", "sawtooth", "triangle"]');
      }
      if (delay != null) {
         if (delay < Chorus.minDelay)
            throw new WebAudioValueError(`Delay value cannot be less than ${Chorus.minDelay}`);
         else if (delay > Chorus.maxDelay)
            throw new WebAudioValueError(`Delay value cannot be greater than ${Chorus.maxDelay}`);
      }
      if (feedback != null) {
         if (feedback < Chorus.minFeedback)
            throw new WebAudioValueError(`Feedback value cannot be less than ${Chorus.minFeedback}`);
         else if (feedback > Chorus.maxFeedback)
            throw new WebAudioValueError(`Feedback value cannot be greater than ${Chorus.maxFeedback}`);
      }
      if (intensity != null) {
         if (intensity < Chorus.minIntensity)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Chorus.minIntensity}`);
         else if (intensity > Chorus.maxIntensity)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Chorus.maxIntensity}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (rate != null)
         this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
      if (shape != null)
         this.#lfoNode.type = shape;
      if (delay != null)
         this.#wetDelayNode.delayTime.setTargetAtTime(delay, timeToUpdate, timeConstantTarget);
      if (feedback != null) {
         this.#feedbackLeft.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
         this.#feedbackRight.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
      }
      if (intensity != null)
         this.#lfoGainNode.gain.setTargetAtTime(0.001 * intensity, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         rate: this.#lfoNode.frequency.value,
         shape: this.#lfoNode.type,
         delay: this.#wetDelayNode.delayTime.value,
         feedback: this.#feedbackLeft.gain.value,
         intensity: 1000 * this.#lfoGainNode.gain.value
      };
   }

   getInputNode() {
      return this.#inputNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing a Compression effect.
 * 
 * A Compression effect, also known as Dynamic Range Compression, alters an audio signal such
 * that a steady volume is maintained throughout audio playback. This is achieved by amplifying
 * quieter sounds and attenuating louder sounds to help create signal homogeneity.
 * 
 * @extends EffectBase
 */
class Compression extends EffectBase {

   // Effect-specific private variables
   /** @type {DynamicsCompressorNode} */
   #compressorNode;

   // Parameter limits
   static minThreshold = -100;
   static maxThreshold = 0;
   static minAttack = 0;
   static maxAttack = 1;
   static minRelease = 0;
   static maxRelease = 1;
   static minIntensity = 0;
   static maxIntensity = 1;

   /**
    * Constructs a new {@link Compression} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#compressorNode = new DynamicsCompressorNode(audioContext);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'threshold', type: 'number', validValues: [Compression.minThreshold, Compression.maxThreshold], defaultValue: -24 },
         { name: 'attack', type: 'number', validValues: [Compression.minAttack, Compression.maxAttack], defaultValue: 0.003 },
         { name: 'release', type: 'number', validValues: [Compression.minRelease, Compression.maxRelease], defaultValue: 0.25 },
         { name: 'intensity', type: 'number', validValues: [Compression.minIntensity, Compression.maxIntensity], defaultValue: 0 }
      ];
   }

   async load() {
      this.#compressorNode.threshold.value = -24;
      this.#compressorNode.attack.value = 0.003;
      this.#compressorNode.release.value = 0.25;
      this.#compressorNode.ratio.value = 1.0;
   }

   /**
    * Updates the {@link Compression} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} threshold - Decibel loudness of the input signal above which the compressor kicks in between [-100, 0]
    * @param {number} attack - Number of seconds required to reduce signal gain by 10 dB between [0, 1]
    * @param {number} release - Number of seconds required to increase signal gain by 10 dB between [0, 1]
    * @param {number} intensity - Amount of compression applied as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({threshold, attack, release, intensity}, updateTime, timeConstant) {
      if ((threshold == null) && (attack == null) && (release == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Compression effect without at least one of the following parameters: "threshold, attack, release, intensity"');
      if (threshold != null) {
         if (threshold < Compression.minThreshold)
            throw new WebAudioValueError(`Threshold value cannot be less than ${Compression.minThreshold}`);
         else if (threshold > Compression.maxThreshold)
            throw new WebAudioValueError(`Threshold value cannot be greater than ${Compression.maxThreshold}`);
      }
      if (attack != null) {
         if (attack < Compression.minAttack)
            throw new WebAudioValueError(`Attack value cannot be less than ${Compression.minAttack}`);
         else if (attack > Compression.maxAttack)
            throw new WebAudioValueError(`Attack value cannot be greater than ${Compression.maxAttack}`);
      }
      if (release != null) {
         if (release < Compression.minRelease)
            throw new WebAudioValueError(`Release value cannot be less than ${Compression.minRelease}`);
         else if (release > Compression.maxRelease)
            throw new WebAudioValueError(`Release value cannot be greater than ${Compression.maxRelease}`);
      }
      if (intensity != null) {
         if (intensity < Compression.minIntensity)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Compression.minIntensity}`);
         else if (intensity > Compression.maxIntensity)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Compression.maxIntensity}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (threshold != null)
         this.#compressorNode.threshold.setTargetAtTime(threshold, timeToUpdate, timeConstantTarget);
      if (attack != null)
         this.#compressorNode.attack.setTargetAtTime(attack, timeToUpdate, timeConstantTarget);
      if (release != null)
         this.#compressorNode.release.setTargetAtTime(release, timeToUpdate, timeConstantTarget);
      if (intensity != null) {
         const ratioValue = 1.0 + (intensity * 19.0);
         this.#compressorNode.ratio.setTargetAtTime(ratioValue, timeToUpdate, timeConstantTarget);
      }
      return true;
   }

   currentParameterValues() {
      return {
         threshold: this.#compressorNode.threshold.value,
         attack: this.#compressorNode.attack.value,
         release: this.#compressorNode.release.value,
         intensity: (this.#compressorNode.ratio.value - 1.0) / 19.0
      };
   }

   getInputNode() {
      return this.#compressorNode;
   }

   getOutputNode() {
      return this.#compressorNode;
   }
}

/**
 * Class representing a Delay effect.
 * 
 * A Delay effect replicates an audio signal and plays back one or more possibly attenuated
 * copies at a later, user-specified time.
 * 
 * @extends EffectBase
 */
class Delay extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #inputNode;
   /** @type {GainNode} */
   #outputNode;
   /** @type {DelayNode} */
   #delayNode;
   /** @type {GainNode} */
   #gainNode;

   // Parameter limits
   static minDelay = 0;
   static maxDelay = 1;
   static minAttenuation = 0;
   static maxAttenuation = 1;

   /**
    * Constructs a new {@link Delay} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#inputNode = new GainNode(audioContext);
      this.#outputNode = new GainNode(audioContext);
      this.#delayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
      this.#gainNode = new GainNode(audioContext);
      this.#inputNode.connect(this.#outputNode);
      this.#inputNode.connect(this.#delayNode).connect(this.#gainNode).connect(this.#outputNode);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'delay', type: 'number', validValues: [Delay.minDelay, Delay.maxDelay], defaultValue: Delay.minDelay },
         { name: 'attenuation', type: 'number', validValues: [Delay.minAttenuation, Delay.maxAttenuation], defaultValue: Delay.minAttenuation }
      ];
   }

   async load() {
      this.#inputNode.gain.value = this.#outputNode.gain.value = 1;
      this.#delayNode.delayTime.value = Delay.minDelay;
      this.#gainNode.gain.value = 1.0 - Delay.minAttenuation;
   }

   /**
    * Updates the {@link Delay} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} delay - Number of seconds to delay outputting the audio signal between [0, 1]
    * @param {number} attenuation - Amount to attenuate the delayed signal as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({delay, attenuation}, updateTime, timeConstant) {
      if ((delay == null) && (attenuation == null))
         throw new WebAudioValueError('Cannot update the Delay effect without at least one of the following parameters: "delay, attenuation"');
      if (delay != null) {
         if (delay < Delay.minDelay)
            throw new WebAudioValueError(`Delay value cannot be less than ${Delay.minDelay}`);
         else if (delay > Delay.maxDelay)
            throw new WebAudioValueError(`Delay value cannot be greater than ${Delay.maxDelay}`);
      }
      if (attenuation != null) {
         if (attenuation < Delay.minAttenuation)
            throw new WebAudioValueError(`Attenuation value cannot be less than ${Delay.minAttenuation}`);
         else if (attenuation > Delay.maxAttenuation)
            throw new WebAudioValueError(`Attenuation value cannot be greater than ${Delay.maxAttenuation}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (delay != null)
         this.#delayNode.delayTime.setTargetAtTime(delay, timeToUpdate, timeConstantTarget);
      if (attenuation != null)
         this.#gainNode.gain.setTargetAtTime(1.0 - attenuation, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         delay: this.#delayNode.delayTime.value,
         attenuation: 1.0 - this.#gainNode.gain.value
      };
   }

   getInputNode() {
      return this.#inputNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing a Distortion effect.
 * 
 * A Distortion effect alters an audio waveform by adding a large amount of gain to the audio
 * signal, normally to the point of clipping the signal. This creates a distorted, gritty feeling,
 * most commonly used with electrical instruments.
 * 
 * @extends EffectBase
 */
class Distortion extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #outputNode;
   /** @type {BiquadFilterNode} */
   #preBandpassNode;
   /** @type {WaveShaperNode} */
   #distortionNode;
   /** @type {number} */
   #intensityValue;

   // Parameter limits
   static minTone = 0;
   static maxTone = 22050;
   static minIntensity = 0;
   static maxIntensity = 1;

   /**
    * Constructs a new {@link Distortion} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#outputNode = new GainNode(audioContext);
      this.#preBandpassNode = new BiquadFilterNode(audioContext, { type: 'lowpass' });
      this.#distortionNode = new WaveShaperNode(audioContext);
      this.#preBandpassNode.connect(this.#distortionNode).connect(this.#outputNode);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'tone', type: 'number', validValues: [Distortion.minTone, Distortion.maxTone], defaultValue: 3000 },
         { name: 'intensity', type: 'number', validValues: [Distortion.minIntensity, Distortion.maxIntensity], defaultValue: 0.5 }
      ];
   }

   async load() {
      const driveValue = 0.5, n = 22050, deg = Math.PI / 180;
      const k = driveValue * 100, curve = new Float32Array(n);
      this.#preBandpassNode.frequency.value = 3000;
      for (let i = 0; i < n; ++i) {
         const x = i * 2 / n - 1;
         curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
      }
      this.#distortionNode.curve = curve;
      this.#outputNode.gain.value = driveValue;
      this.#intensityValue = 0.5;
   }

   /**
    * Updates the {@link Distortion} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} tone - Low-pass cutoff frequency in Hz for filtering before distortion between [0, 22050]
    * @param {number} intensity - Ratio of distorted-to-original sound as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ tone, intensity }, updateTime, timeConstant) {
      if ((tone == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Distortion effect without at least one of the following parameters: "tone, intensity"');
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (tone != null)
         this.#preBandpassNode.frequency.setTargetAtTime(tone, timeToUpdate, timeConstantTarget);
      if (intensity != null) {
         const n = 22050, deg = Math.PI / 180;
         const k = intensity * 100, curve = new Float32Array(n);
         for (let i = 0; i < n; ++i) {
            const x = i * 2 / n - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
         }
         this.#distortionNode.curve = curve;
         const gainOffset = (intensity < 0.5) ? (Math.exp(2.3 * (0.5 - intensity)) - 0.5) : (0.5 + (0.2 * (0.5 - intensity)));
         this.#outputNode.gain.setTargetAtTime(gainOffset, timeToUpdate, timeConstantTarget);
         this.#intensityValue = intensity;
      }
      return true;
   }

   currentParameterValues() {
      return {
         tone: this.#preBandpassNode.frequency.value,
         intensity: this.#intensityValue
      };
   }

   getInputNode() {
      return this.#preBandpassNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing a Pitch Shift effect.
 * 
 * A Pitch Shift performs a permanent shift in frequency between an incoming and
 * outgoing audio signal.
 * 
 * @extends EffectBase
 */
class PitchShift extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #inputNode; #outputNode;
   /** @type {GainNode} */
   #modGain1Node; #modGain2Node;
   /** @type {AudioBuffer} */
   #shiftDownBuffer; #shiftUpBuffer;
   /** @type {GainNode} */
   #mod1GainNode; #mod2GainNode; #mod3GainNode; #mod4GainNode;
   /** @type {AudioBufferSourceNode} */
   #mod1Node; #mod2Node; #mod3Node; #mod4Node;
   /** @type {AudioBufferSourceNode} */
   #fade1Node; #fade2Node;
   /** @type {number} */
   #shiftValue;

   // Parameter limits
   static bufferTime = 0.250;
   static delayTime = 0.250;
   static fadeTime = 0.125;
   static minShift = -1200;
   static maxShift = 700;

   /**
    * Constructs a new {@link PitchShift} effect object.
    */
   constructor(audioContext) {
      super(audioContext);

      // Required audio nodes
      this.#inputNode = new GainNode(audioContext);
      this.#outputNode = new GainNode(audioContext);
      this.#mod1GainNode = new GainNode(audioContext, { gain: 1 });
      this.#mod2GainNode = new GainNode(audioContext, { gain: 1 });
      this.#mod3GainNode = new GainNode(audioContext, { gain: 0 });
      this.#mod4GainNode = new GainNode(audioContext, { gain: 0 });
      this.#modGain1Node = new GainNode(audioContext, { gain: 1 });
      this.#modGain2Node = new GainNode(audioContext, { gain: 1 });
      const delay1 = new DelayNode(audioContext, { maxDelayTime: 1 });
      const delay2 = new DelayNode(audioContext, { maxDelayTime: 1 });

      // Delay modulation
      const length1 = PitchShift.bufferTime * audioContext.sampleRate;
      const length = length1 + ((PitchShift.bufferTime - 2*PitchShift.fadeTime) * audioContext.sampleRate);
      this.#shiftDownBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
      {
         const p = this.#shiftDownBuffer.getChannelData(0);
         for (let i = 0; i < length1; ++i)
            p[i] = i / length1;
         for (let i = length1; i < length; ++i)
            p[i] = 0;
      }
      this.#shiftUpBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
      {
         const p = this.#shiftUpBuffer.getChannelData(0);
         for (let i = 0; i < length1; ++i)
            p[i] = (length1 - i) / length;
         for (let i = length1; i < length; ++i)
            p[i] = 0;
      }      
      this.#mod1Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftDownBuffer, loop: true });
      this.#mod2Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftDownBuffer, loop: true });
      this.#mod3Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftUpBuffer, loop: true });
      this.#mod4Node = new AudioBufferSourceNode(audioContext, { buffer: this.#shiftUpBuffer, loop: true });

      // Delay amount for changing pitch
      this.#mod1Node.connect(this.#mod1GainNode);
      this.#mod2Node.connect(this.#mod2GainNode);
      this.#mod3Node.connect(this.#mod3GainNode);
      this.#mod4Node.connect(this.#mod4GainNode);
      this.#mod1GainNode.connect(this.#modGain1Node);
      this.#mod2GainNode.connect(this.#modGain2Node);
      this.#mod3GainNode.connect(this.#modGain1Node);
      this.#mod4GainNode.connect(this.#modGain2Node);
      this.#modGain1Node.connect(delay1.delayTime);
      this.#modGain2Node.connect(delay2.delayTime);

      // Crossfading
      const fadeBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
      {
         const p = fadeBuffer.getChannelData(0), fadeLength = PitchShift.fadeTime * audioContext.sampleRate;
         const fadeIndex1 = fadeLength, fadeIndex2 = length1 - fadeLength;
         for (let i = 0; i < length1; ++i)
            p[i] = (i < fadeIndex1) ? Math.sqrt(i / fadeLength) :
               ((i >= fadeIndex2) ? Math.sqrt(1 - (i - fadeIndex2) / fadeLength) : 1);
         for (let i = length1; i < length; ++i)
            p[i] = 0;
      }
      this.#fade1Node = new AudioBufferSourceNode(audioContext, { buffer: fadeBuffer, loop: true });
      this.#fade2Node = new AudioBufferSourceNode(audioContext, { buffer: fadeBuffer, loop: true });
      const mix1 = new GainNode(audioContext, { gain: 0 });
      const mix2 = new GainNode(audioContext, { gain: 0 });
      this.#fade1Node.connect(mix1.gain);    
      this.#fade2Node.connect(mix2.gain);
         
      // Connect processing graph
      this.#inputNode.connect(delay1);
      this.#inputNode.connect(delay2);
      delay1.connect(mix1);
      delay2.connect(mix2);
      mix1.connect(this.#outputNode);
      mix2.connect(this.#outputNode);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'shift', type: 'number', validValues: [PitchShift.minShift, PitchShift.maxShift], defaultValue: 0 }
      ];
   }

   async load() {
      const t = this.audioContext.currentTime + 0.050;
      const t2 = t + PitchShift.bufferTime - PitchShift.fadeTime;
      this.#modGain1Node.gain.value = 0;
      this.#modGain2Node.gain.value = 0;
      this.#mod1Node.start(t);
      this.#mod2Node.start(t2);
      this.#mod3Node.start(t);
      this.#mod4Node.start(t2);
      this.#fade1Node.start(t);
      this.#fade2Node.start(t2);
      this.#shiftValue = 0;
   }

   // Private update function for internal use only by Doppler effect
   async updatePrivate(shift, updateTime, timeWeights, duration) {
      const finalGain = 0.5 * PitchShift.delayTime * Math.abs(shift) / 1200;
      for (let i = 0; i < timeWeights.length; ++i)
         timeWeights[i] *= finalGain;
      this.#mod1GainNode.gain.cancelScheduledValues(updateTime);
      this.#mod2GainNode.gain.cancelScheduledValues(updateTime);
      this.#mod3GainNode.gain.cancelScheduledValues(updateTime);
      this.#mod4GainNode.gain.cancelScheduledValues(updateTime);
      if (shift > 0) {
         this.#mod1GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
         this.#mod2GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
         this.#mod3GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
         this.#mod4GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
      } else {
         this.#mod1GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
         this.#mod2GainNode.gain.setTargetAtTime(1, updateTime, 0.01);
         this.#mod3GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
         this.#mod4GainNode.gain.setTargetAtTime(0, updateTime, 0.01);
      }
      this.#modGain1Node.gain.cancelScheduledValues(updateTime);
      this.#modGain2Node.gain.cancelScheduledValues(updateTime);
      this.#modGain1Node.gain.setValueCurveAtTime(timeWeights, updateTime, duration);
      this.#modGain2Node.gain.setValueCurveAtTime(timeWeights, updateTime, duration);
      return true;
   }

   /* eslint no-empty-pattern: "off" */
   /**
    * Updates the {@link PitchShift} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} shift - Frequency shift in cents between [-1200, 1200]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ shift }, updateTime, timeConstant) {
      if (shift == null)
         throw new WebAudioValueError('Cannot update the PitchShift effect without at least one of the following parameters: "shift"');
      else if (shift < PitchShift.minShift)
         throw new WebAudioValueError(`Shift value cannot be less than ${PitchShift.minShift}`);
      else if (shift > PitchShift.maxShift)
         throw new WebAudioValueError(`Shift value cannot be greater than ${PitchShift.maxShift}`);
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      this.#mod1GainNode.gain.cancelScheduledValues(timeToUpdate);
      this.#mod2GainNode.gain.cancelScheduledValues(timeToUpdate);
      this.#mod3GainNode.gain.cancelScheduledValues(timeToUpdate);
      this.#mod4GainNode.gain.cancelScheduledValues(timeToUpdate);
      if (shift > 0) {
         this.#mod1GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
         this.#mod2GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
         this.#mod3GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
         this.#mod4GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
      } else {
         this.#mod1GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
         this.#mod2GainNode.gain.setTargetAtTime(1, timeToUpdate, 0.01);
         this.#mod3GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
         this.#mod4GainNode.gain.setTargetAtTime(0, timeToUpdate, 0.01);
      }
      this.#shiftValue = shift;
      this.#modGain1Node.gain.cancelScheduledValues(timeToUpdate);
      this.#modGain2Node.gain.cancelScheduledValues(timeToUpdate);
      this.#modGain1Node.gain.setTargetAtTime(0.5 * PitchShift.delayTime * Math.abs(shift) / 1200, timeToUpdate, timeConstantTarget);
      this.#modGain2Node.gain.setTargetAtTime(0.5 * PitchShift.delayTime * Math.abs(shift) / 1200, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         shift: this.#shiftValue
      };
   }

   getInputNode() {
      return this.#inputNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing a Doppler effect.
 * 
 * A Doppler effect performs a linear change in frequency over a specified period of time.
 * 
 * @extends EffectBase
 */
class Doppler extends EffectBase {

   // Effect-specific private variables
   /** @type {PitchShift} */
   #pitchShifter;
   /** @type {number} */
   #initDistance;
   /** @type {number} */
   #finalDistance;
   /** @type {number} */
   #missDistance;
   /** @type {number} */
   #duration;

   // Parameter limits
   static minDistance = 0;
   static maxDistance = 1000;
   static minDuration = 0;
   static maxDuration = 60;

   /**
    * Constructs a new {@link Doppler} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#pitchShifter = new PitchShift(audioContext);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'initDistance', type: 'number', validValues: [Doppler.minDistance, Doppler.maxDistance], defaultValue: 100 },
         { name: 'finalDistance', type: 'number', validValues: [Doppler.minDistance, Doppler.maxDistance], defaultValue: 100 },
         { name: 'missDistance', type: 'number', validValues: [Doppler.minDistance, Doppler.maxDistance], defaultValue: 14 },
         { name: 'duration', type: 'number', validValues: [Doppler.minDuration, Doppler.maxDuration], defaultValue: 10 }
      ];
   }

   async load() {
      this.#initDistance = 100;
      this.#finalDistance = 100;
      this.#missDistance = 14;
      this.#duration = 10;
      await this.#pitchShifter.load();
   }

   /* eslint no-empty-pattern: "off" */
   /**
    * Updates the {@link Doppler} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} initDistance - Starting distance in meters between an audio source and an observer
    * @param {number} finalDistance - Final distance in meters between an audio source and an observer
    * @param {number} missDistance - Distance in meters by which the audio source misses the observer
    * @param {number} duration - Duration in seconds required for the audio source to travel from its starting to final location
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ initDistance, finalDistance, missDistance, duration }, updateTime) {
      if ((initDistance == null) || (finalDistance == null) || (missDistance == null) || (duration == null))
         throw new WebAudioValueError('Cannot update the Doppler effect without all of the following parameters: "initDistance, finalDistance, missDistance, duration"');
      else if (initDistance < Doppler.minDistance)
         throw new WebAudioValueError(`Distance value cannot be less than ${Doppler.minDistance}`);
      else if (initDistance > Doppler.maxDistance)
         throw new WebAudioValueError(`Distance value cannot be greater than ${Doppler.maxDistance}`);
      else if (finalDistance < Doppler.minDistance)
         throw new WebAudioValueError(`Distance value cannot be less than ${Doppler.minDistance}`);
      else if (finalDistance > Doppler.maxDistance)
         throw new WebAudioValueError(`Distance value cannot be greater than ${Doppler.maxDistance}`);
      else if (missDistance < Doppler.minDistance)
         throw new WebAudioValueError(`Distance value cannot be less than ${Doppler.minDistance}`);
      else if (missDistance > Doppler.maxDistance)
         throw new WebAudioValueError(`Distance value cannot be greater than ${Doppler.maxDistance}`);
      else if (duration < Doppler.minDuration)
         throw new WebAudioValueError(`Duration value cannot be less than ${Doppler.minDuration}`);
      else if (duration > Doppler.maxDuration)
         throw new WebAudioValueError(`Duration value cannot be greater than ${Doppler.maxDuration}`);
      else if (initDistance < missDistance)
         throw new WebAudioValueError('Initial distance cannot be less than the miss distance');
      else if (finalDistance < missDistance)
         throw new WebAudioValueError('Final distance cannot be less than the miss distance');
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const approachingDistance = Math.sqrt(initDistance**2 - missDistance**2);
      const departingDistance = Math.sqrt(finalDistance**2 - missDistance**2);
      const totalDistance = approachingDistance + departingDistance;
      const speedMetersPerCentisecond = totalDistance / (100 * duration);
      const approachingDuration = duration * (approachingDistance / totalDistance);
      const departingDuration = duration * (departingDistance / totalDistance);
      const approachingWeights = new Float32Array(approachingDuration * 100);
      const departingWeights = new Float32Array(departingDuration * 100);
      for (let i = 0; i < approachingWeights.length; ++i)
         approachingWeights[i] = Math.cos(Math.atan2(missDistance, approachingDistance - (i * speedMetersPerCentisecond)));
      for (let i = 0; i < departingWeights.length; ++i)
         departingWeights[i] = Math.cos(Math.atan2(missDistance, i * speedMetersPerCentisecond));
      const approachingFrequency = 1200 * Math.log2(343.0 / (343.0 - (100 * speedMetersPerCentisecond)));
      const departingFrequency = 1200 * Math.log2(343.0 / (343.0 + (100 * speedMetersPerCentisecond)));
      this.#pitchShifter.updatePrivate(approachingFrequency, timeToUpdate, approachingWeights, approachingDuration);
      this.#pitchShifter.updatePrivate(departingFrequency, timeToUpdate + approachingDuration, departingWeights, departingDuration);
      this.#initDistance = initDistance;
      this.#finalDistance = finalDistance;
      this.#missDistance = missDistance;
      this.#duration = duration;
      return true;
   }

   currentParameterValues() {
      return {
         initDistance: this.#initDistance,
         finalDistance: this.#finalDistance,
         missDistance: this.#missDistance,
         duration: this.#duration
      };
   }

   getInputNode() {
      return this.#pitchShifter.getInputNode();
   }

   getOutputNode() {
      return this.#pitchShifter.getOutputNode();
   }
}

/**
 * Class representing an Echo effect.
 * 
 * An Echo effect represents more or more reflections of an original audio signal. It is similar
 * to a Delay effect, except that echoes themselves can feed back into the audio processing loop,
 * resulting in additional, decaying echoes.
 * 
 * @extends EffectBase
 */
class Echo extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #inputNode;
   /** @type {DelayNode} */
   #delayNode;
   /** @type {GainNode} */
   #feedbackNode;
   /** @type {GainNode} */
   #outputNode;

   // Parameter limits
   static minEchoTime = 0;
   static maxEchoTime = 1;
   static minFeedback = 0;
   static maxFeedback = 0.95;

   /**
    * Constructs a new {@link Echo} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#inputNode = new GainNode(audioContext);
      this.#outputNode = new GainNode(audioContext);
      this.#delayNode = new DelayNode(audioContext, { maxDelayTime: Echo.maxEchoTime });
      this.#feedbackNode = new GainNode(audioContext);
      this.#inputNode.connect(this.#outputNode);
      this.#inputNode.connect(this.#delayNode).connect(this.#feedbackNode).connect(this.#delayNode).connect(this.#outputNode);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'echoTime', type: 'number', validValues: [Echo.minEchoTime, Echo.maxEchoTime], defaultValue: Echo.minEchoTime },
         { name: 'intensity', type: 'number', validValues: [Echo.minFeedback, Echo.maxFeedback], defaultValue: Echo.minFeedback },
      ];
   }

   async load() {
      this.#inputNode.gain.value = this.#outputNode.gain.value = 1;
      this.#delayNode.delayTime.value = Echo.minEchoTime;
      this.#feedbackNode.gain.value = Echo.minFeedback;
   }

   /**
    * Updates the {@link Echo} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} echoTime - Number of seconds between the original audio and its first echo between [0, 1]
    * @param {number} intensity - Percentage of the original audio that will be present in each consecutive echo between [0, 0.95]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({echoTime, intensity}, updateTime, timeConstant) {
      if ((echoTime == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Echo effect without at least one of the following parameters: "echoTime, intensity"');
      if (echoTime != null) {
         if (echoTime < Echo.minEchoTime)
            throw new WebAudioValueError(`EchoTime value cannot be less than ${Echo.minEchoTime}`);
         else if (echoTime > Echo.maxEchoTime)
            throw new WebAudioValueError(`EchoTime value cannot be greater than ${Echo.maxEchoTime}`);
      }
      if (intensity != null) {
         if (intensity < Echo.minFeedback)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Echo.minFeedback}`);
         else if (intensity > Echo.maxFeedback)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Echo.maxFeedback}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (echoTime != null)
         this.#delayNode.delayTime.setTargetAtTime(echoTime, timeToUpdate, timeConstantTarget);
      if (intensity != null) 
         this.#feedbackNode.gain.setTargetAtTime(intensity, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         echoTime: this.#delayNode.delayTime.value,
         intensity: this.#feedbackNode.gain.value
      };
   }

   getInputNode() {
      return this.#inputNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing an Equalization effect.
 * 
 * An Equalizer allows for the volume of an audio signal to be adjusted piecewise according to
 * any number of discrete frequency ranges. Both the size and quantity of frequency ranges are
 * user-definable.
 * 
 * @extends EffectBase
 */
class Equalization extends EffectBase {

   // Effect-specific private variables
   /** @type {BiquadFilterNode[]} */
   #equalizerNodes;

   // Parameter limits
   static minGain = -40;
   static maxGain = 40;
   static minCutoff = 1000;
   static maxCutoff = 22050;

   /**
    * Constructs a new {@link Equalization} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#equalizerNodes = [
         new BiquadFilterNode(audioContext, { type: 'lowshelf', frequency: audioContext.sampleRate / 4, gain: 0 }),
         new BiquadFilterNode(audioContext, { type: 'highshelf', frequency: audioContext.sampleRate / 4, gain: 0 })
      ];
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'frequencyBandUpperCutoffs', type: 'Array<number>', validValues: [Equalization.minCutoff, Equalization.maxCutoff], defaultValue: 0 },
         { name: 'frequencyBandGains', type: 'Array<number>', validValues: [Equalization.minGain, Equalization.maxGain], defaultValue: 0 },
      ];
   }

   async load() {
      this.#equalizerNodes[0].connect(this.#equalizerNodes[1]);
   }

   /**
    * Updates the {@link Equalization} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number[]} frequencyBandUpperCutoffs - Upper frequency cutoffs in Hz for each band in the equalizer between [0, 22050]
    * @param {number[]} frequencyBandGains - Gains in dB for each frequency band in the equalizer between [-40, 40]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ frequencyBandUpperCutoffs, frequencyBandGains }, updateTime, timeConstant) {
      if ((frequencyBandUpperCutoffs == null) || (frequencyBandGains == null))
         throw new WebAudioValueError('Cannot update the Equalization effect without both of the following parameters: "frequencyBandUpperCutoffs, frequencyBandGains"');
      if (frequencyBandUpperCutoffs.length != frequencyBandGains.length)
         throw new WebAudioValueError('Frequency cutoff array and frequency gain array must have the same size');
      for (const cutoff of frequencyBandUpperCutoffs) {
         if (cutoff < Equalization.minCutoff)
            throw new WebAudioValueError(`Frequency upper cutoff value cannot be less than ${Equalization.minCutoff}`);
         else if (cutoff > Equalization.maxCutoff)
            throw new WebAudioValueError(`Frequency upper cutoff value cannot be greater than ${Equalization.maxCutoff}`);
      }
      for (const gain of frequencyBandGains) {
         if (gain < Equalization.minGain)
            throw new WebAudioValueError(`Gain value cannot be less than ${Equalization.minGain}`);
         else if (gain > Equalization.maxGain)
            throw new WebAudioValueError(`Gain value cannot be greater than ${Equalization.maxGain}`);
      }
      for (let i = 1; i < frequencyBandUpperCutoffs.length; ++i) {
         if (frequencyBandUpperCutoffs[i] <= frequencyBandUpperCutoffs[i-1])
            throw new WebAudioValueError('Frequency band upper cutoffs must be monotonically increasing within the array');
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;

      // Ensure the correct number of equalization bands are present
      if (frequencyBandUpperCutoffs.length < this.#equalizerNodes.length) {
         this.#equalizerNodes[0].connect(this.#equalizerNodes[this.#equalizerNodes.length - frequencyBandUpperCutoffs.length + 1]);
         for (const removedNode of this.#equalizerNodes.splice(1, this.#equalizerNodes.length - frequencyBandUpperCutoffs.length))
            removedNode.disconnect();
      }
      else if (frequencyBandUpperCutoffs.length > this.#equalizerNodes.length) {
         const lastNode = this.#equalizerNodes.splice(-1, 1)[0];
         this.#equalizerNodes[this.#equalizerNodes.length - 1].disconnect();
         while ((this.#equalizerNodes.length + 1) < frequencyBandUpperCutoffs.length) {
            const newNode = new BiquadFilterNode(this.audioContext, { type: 'peaking' });
            this.#equalizerNodes[this.#equalizerNodes.length - 1].connect(newNode);
            this.#equalizerNodes.push(newNode);
         }
         this.#equalizerNodes[this.#equalizerNodes.length - 1].connect(lastNode);
         this.#equalizerNodes.push(lastNode);
      }

      // Update the parameters for each equalization band
      this.#equalizerNodes[0].frequency.setTargetAtTime(frequencyBandUpperCutoffs[0], timeToUpdate, timeConstantTarget);
      this.#equalizerNodes[0].gain.setTargetAtTime(frequencyBandGains[0], timeToUpdate, timeConstantTarget);
      this.#equalizerNodes[this.#equalizerNodes.length-1].frequency.setTargetAtTime(frequencyBandUpperCutoffs[frequencyBandUpperCutoffs.length-2], timeToUpdate, timeConstantTarget);
      this.#equalizerNodes[this.#equalizerNodes.length-1].gain.setTargetAtTime(frequencyBandGains[frequencyBandGains.length-1], timeToUpdate, timeConstantTarget);
      for (let i = 1; i < this.#equalizerNodes.length - 1; ++i) {
         const centerFrequency = 0.5 * (frequencyBandUpperCutoffs[i] + frequencyBandUpperCutoffs[i-1]);
         this.#equalizerNodes[i].frequency.setTargetAtTime(centerFrequency, timeToUpdate, timeConstantTarget);
         this.#equalizerNodes[i].Q.setTargetAtTime(centerFrequency / (frequencyBandUpperCutoffs[i] - frequencyBandUpperCutoffs[i-1]), timeToUpdate, timeConstantTarget);
         this.#equalizerNodes[i].gain.setTargetAtTime(frequencyBandGains[i], timeToUpdate, timeConstantTarget);
      }
      return true;
   }

   currentParameterValues() {
      const cutoffs = [], gains = [];
      for (const element of this.#equalizerNodes) {
         cutoffs.push(element.frequency.value);
         gains.push(element.gain.value);
      }
      return {
         frequencyBandUpperCutoffs: cutoffs,
         frequencyBandGains: gains
      };
   }

   getInputNode() {
      return this.#equalizerNodes[0];
   }

   getOutputNode() {
      return this.#equalizerNodes[this.#equalizerNodes.length - 1];
   }
}

/**
 * Class representing a Flanger effect.
 * 
 * A Flanger effect generates a delayed, modulated version of an original audio signal which gets
 * played slightly out-of-phase and slower than the original.
 * 
 * @extends EffectBase
 */
class Flanger extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #inputNode;
   /** @type {GainNode} */
   #outputNode;
   /** @type {DelayNode} */
   #delayNode;
   /** @type {OscillatorNode} */
   #lfoNode;
   /** @type {GainNode} */
   #lfoGainNode;
   /** @type {GainNode} */
   #feedbackNode;
   /** @type {number} */
   #intensityValue;

   // Parameter limits
   static minRate = 0;
   static maxRate = 10;
   static minDelay = 0.0001;
   static maxDelay = 0.01;
   static minFeedback = 0;
   static maxFeedback = 0.95;
   static minIntensity = 0;
   static maxIntensity = 1;

   /**
    * Constructs a new {@link Flanger} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
   
      this.#inputNode = new GainNode(audioContext);
      this.#outputNode = new GainNode(audioContext);
      this.#delayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
      this.#lfoNode = new OscillatorNode(audioContext);
      this.#lfoGainNode = new GainNode(audioContext);
      this.#feedbackNode = new GainNode(audioContext);

      this.#lfoNode.connect(this.#lfoGainNode).connect(this.#delayNode.delayTime);
      this.#inputNode.connect(this.#outputNode);
      this.#inputNode.connect(this.#delayNode).connect(this.#feedbackNode).connect(this.#delayNode).connect(this.#outputNode);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'rate', type: 'number', validValues: [Flanger.minRate, Flanger.maxRate], defaultValue: 0.8 },
         { name: 'shape', type: 'string', validValues: ['sine', 'square', 'sawtooth', 'triangle'], defaultValue: 'sine' },
         { name: 'delay', type: 'number', validValues: [Flanger.minDelay, Flanger.maxDelay], defaultValue: 0.0075 },
         { name: 'feedback', type: 'number', validValues: [Flanger.minFeedback, Flanger.maxFeedback], defaultValue: 0 },
         { name: 'intensity', type: 'number', validValues: [Flanger.minIntensity, Flanger.maxIntensity], defaultValue: 0 }
      ];
   }

   async load() {
      this.#intensityValue = 0;
      this.#inputNode.gain.value = 0.5;
      this.#outputNode.gain.value = 1;
      this.#lfoGainNode.gain.value = 0;
      this.#delayNode.delayTime.value = 0.0075;
      this.#feedbackNode.gain.value = 0;
      this.#lfoNode.frequency.value = 0.8;
      this.#lfoNode.type = 'sine';
      this.#lfoNode.start();
   }

   /**
    * Updates the {@link Flanger} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} rate - Frequency at which an oscillator modulates the delayed flanger signal in Hertz between [0, 10]
    * @param {string} shape - Waveform shape used to modulate the delayed flanger signal from ['sine', 'square', 'sawtooth', 'triangle']
    * @param {number} delay - Number of seconds delay between the original signal and the modulated flanger signal between [0.0001, 0.01]
    * @param {number} feedback - Percentage of processed signal to be fed back into the flanger circuit between [0, 0.95]
    * @param {number} intensity - Ratio of flangered-to-original sound as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ rate, shape, delay, feedback, intensity }, updateTime, timeConstant) {
      if ((rate == null) && (shape == null) && (delay == null) && (feedback == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Flanger effect without at least one of the following parameters: "rate, shape, delay, feedback, intensity"');
      if (rate != null) {
         if (rate < Flanger.minRate)
            throw new WebAudioValueError(`Rate value cannot be less than ${Flanger.minRate}`);
         else if (rate > Flanger.maxRate)
            throw new WebAudioValueError(`Rate value cannot be greater than ${Flanger.maxRate}`);
      }
      if (shape != null) {
         if (!['sine', 'square', 'sawtooth', 'triangle'].includes(shape))
            throw new WebAudioValueError('Shape value must be one of: ["sine", "square", "sawtooth", "triangle"]');
      }
      if (delay != null) {
         if (delay < Flanger.minDelay)
            throw new WebAudioValueError(`Delay value cannot be less than ${Flanger.minDelay}`);
         else if (delay > Flanger.maxDelay)
            throw new WebAudioValueError(`Delay value cannot be greater than ${Flanger.maxDelay}`);
      }
      if (feedback != null) {
         if (feedback < Flanger.minFeedback)
            throw new WebAudioValueError(`Feedback value cannot be less than ${Flanger.minFeedback}`);
         else if (feedback > Flanger.maxFeedback)
            throw new WebAudioValueError(`Feedback value cannot be greater than ${Flanger.maxFeedback}`);
      }
      if (intensity != null) {
         if (intensity < Flanger.minIntensity)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Flanger.minIntensity}`);
         else if (intensity > Flanger.maxIntensity)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Flanger.maxIntensity}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (rate != null)
         this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
      if (shape != null)
         this.#lfoNode.type = shape;
      if (delay != null)
         this.#delayNode.delayTime.setTargetAtTime(delay, timeToUpdate, timeConstantTarget);
      if (feedback != null)
         this.#feedbackNode.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
      if (intensity != null) {
         this.#intensityValue = intensity;
         this.#lfoGainNode.gain.setTargetAtTime(this.#delayNode.delayTime.value * intensity, timeToUpdate, timeConstantTarget);
      }
      return true;
   }

   currentParameterValues() {
      return {
         rate: this.#lfoNode.frequency.value,
         shape: this.#lfoNode.type,
         delay: this.#delayNode.delayTime.value,
         feedback: this.#feedbackNode.gain.value,
         intensity: this.#intensityValue
      };
   }

   getInputNode() {
      return this.#inputNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing a High-Pass Filter effect.
 * 
 * A High-Pass Filter is defined by a cutoff frequency above which audio signals are allowed to
 * pass and below which audio signals are reduced or eliminated completely.
 * 
 * @extends EffectBase
 */
class HighPassFilter extends EffectBase {

   // Effect-specific private variables
   /** @type {BiquadFilterNode} */
   #filterNode;

   // Parameter limits
   static minFrequency = 0;
   static maxFrequency = 22050;
   static minResonance = 0.0001;
   static maxResonance = 1000;

   /**
    * Constructs a new {@link HighPassFilter} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#filterNode = new BiquadFilterNode(audioContext, { type: 'highpass' });
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'cutoffFrequency', type: 'number', validValues: [HighPassFilter.minFrequency, HighPassFilter.maxFrequency], defaultValue: HighPassFilter.minFrequency },
         { name: 'resonance', type: 'number', validValues: [HighPassFilter.minResonance, HighPassFilter.maxResonance], defaultValue: HighPassFilter.minResonance }
      ];
   }

   async load() {
      this.#filterNode.frequency.value = HighPassFilter.minFrequency;
      this.#filterNode.Q.value = HighPassFilter.minResonance;
   }

   /**
    * Updates the {@link HighPassFilter} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} cutoffFrequency - Frequency below which audio content will be reduced between [0, 22050]
    * @param {number} resonance - Amount of frequency exaggeration around the cutoff as a value between [0.0001, 1000.0]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({cutoffFrequency, resonance}, updateTime, timeConstant) {
      if ((cutoffFrequency == null) && (resonance == null))
         throw new WebAudioValueError('Cannot update the HighPassFilter effect without at least one of the following parameters: "cutoffFrequency, resonance"');
      if (cutoffFrequency != null) {
         if (cutoffFrequency < HighPassFilter.minFrequency)
            throw new WebAudioValueError(`Cutoff frequency cannot be less than ${HighPassFilter.minFrequency}`);
         else if (cutoffFrequency > HighPassFilter.maxFrequency)
            throw new WebAudioValueError(`Cutoff frequency cannot be greater than ${HighPassFilter.maxFrequency}`);
      }
      if (resonance != null) {
         if (resonance < HighPassFilter.minResonance)
            throw new WebAudioValueError(`Resonance exaggeration cannot be less than ${HighPassFilter.minResonance}`);
         else if (resonance > HighPassFilter.maxResonance)
            throw new WebAudioValueError(`Resonance exaggeration cannot be greater than ${HighPassFilter.maxResonance}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (cutoffFrequency != null)
         this.#filterNode.frequency.setTargetAtTime(cutoffFrequency, timeToUpdate, timeConstantTarget);
      if (resonance != null)
         this.#filterNode.Q.setTargetAtTime(resonance, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         cutoffFrequency: this.#filterNode.frequency.value,
         resonance: this.#filterNode.Q.value
      };
   }

   getInputNode() {
      return this.#filterNode;
   }

   getOutputNode() {
      return this.#filterNode;
   }
}

/**
 * Class representing a Low-Pass Filter effect.
 * 
 * A Low-Pass Filter is defined by a cutoff frequency below which audio signals are allowed to
 * pass and above which audio signals are reduced or eliminated completely.
 * 
 * @extends EffectBase
 */
class LowPassFilter extends EffectBase {

   // Effect-specific private variables
   /** @type {BiquadFilterNode} */
   #filterNode;

   // Parameter limits
   static minFrequency = 0;
   static maxFrequency = 22050;
   static minResonance = 0.0001;
   static maxResonance = 1000;

   /**
    * Constructs a new {@link LowPassFilter} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#filterNode = new BiquadFilterNode(audioContext, { type: 'lowpass' });
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'cutoffFrequency', type: 'number', validValues: [LowPassFilter.minFrequency, LowPassFilter.maxFrequency], defaultValue: LowPassFilter.maxFrequency },
         { name: 'resonance', type: 'number', validValues: [LowPassFilter.minResonance, LowPassFilter.maxResonance], defaultValue: LowPassFilter.minResonance }
      ];
   }

   async load() {
      this.#filterNode.frequency.value = LowPassFilter.maxFrequency;
      this.#filterNode.Q.value = LowPassFilter.minResonance;
   }

   /**
    * Updates the {@link LowPassFilter} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} cutoffFrequency - Frequency above which audio content will be reduced between [0, 22050]
    * @param {number} resonance - Amount of frequency exaggeration around the cutoff as a value between [0.0001, 1000.0]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({cutoffFrequency, resonance}, updateTime, timeConstant) {
      if ((cutoffFrequency == null) && (resonance == null))
         throw new WebAudioValueError('Cannot update the LowPassFilter effect without at least one of the following parameters: "cutoffFrequency, resonance"');
      if (cutoffFrequency != null) {
         if (cutoffFrequency < LowPassFilter.minFrequency)
            throw new WebAudioValueError(`Cutoff frequency cannot be less than ${LowPassFilter.minFrequency}`);
         else if (cutoffFrequency > LowPassFilter.maxFrequency)
            throw new WebAudioValueError(`Cutoff frequency cannot be greater than ${LowPassFilter.maxFrequency}`);
      }
      if (resonance != null) {
         if (resonance < LowPassFilter.minResonance)
            throw new WebAudioValueError(`Resonance exaggeration cannot be less than ${LowPassFilter.minResonance}`);
         else if (resonance > LowPassFilter.maxResonance)
            throw new WebAudioValueError(`Resonance exaggeration cannot be greater than ${LowPassFilter.maxResonance}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (cutoffFrequency != null)
         this.#filterNode.frequency.setTargetAtTime(cutoffFrequency, timeToUpdate, timeConstantTarget);
      if (resonance != null)
         this.#filterNode.Q.setTargetAtTime(resonance, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         cutoffFrequency: this.#filterNode.frequency.value,
         resonance: this.#filterNode.Q.value
      };
   }

   getInputNode() {
      return this.#filterNode;
   }

   getOutputNode() {
      return this.#filterNode;
   }
}

/**
 * Class representing a Panning effect.
 * 
 * A Panning effect distributes an audio signal across a stereo field by making it appear to
 * originate from different places in the left-right audio spectrum, thereby creating more space
 * and width.
 * 
 * @extends EffectBase
 */
class Panning extends EffectBase {

   // Effect-specific private variables
   /** @type {StereoPannerNode} */
   #panningNode;

   // Parameter limits
   static panningLeft = 0;
   static panningRight = 1;

   /**
    * Constructs a new {@link Panning} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#panningNode = new StereoPannerNode(audioContext);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'leftToRightRatio', type: 'number', validValues: [Panning.panningLeft, Panning.panningRight], defaultValue: 0.5 * (Panning.panningRight - Panning.panningLeft) }
      ];
   }

   async load() {
      this.#panningNode.pan.value = 0.0;
   }

   /* eslint no-empty-pattern: "off" */
   /**
    * Updates the {@link Panning} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} leftToRightRatio - Ratio of sound output from the left speaker to the right speaker as a percentage between [0.0, 1.0]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({leftToRightRatio}, updateTime, timeConstant) {
      if (leftToRightRatio == null)
         throw new WebAudioValueError('Cannot update the Panning effect without at least one of the following parameters: "leftToRightRatio"');
      if (leftToRightRatio < Panning.panningLeft)
         throw new WebAudioValueError(`Left-to-right-ratio value cannot be less than ${Panning.panningLeft}`);
      else if (leftToRightRatio > Panning.panningRight)
         throw new WebAudioValueError(`Left-to-right-ratio value cannot be greater than ${Panning.panningRight}`);
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      this.#panningNode.pan.setTargetAtTime(2.0 * (leftToRightRatio - 0.5), timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         leftToRightRatio: (0.5 * this.#panningNode.pan.value) + 0.5
      };
   }

   getInputNode() {
      return this.#panningNode;
   }

   getOutputNode() {
      return this.#panningNode;
   }
}

/**
 * Class representing a Phaser effect.
 * 
 * A Phaser effect manipulates an audio signal by generating high-pass filters in the form of
 * peaks in the frequency spectrum which are used to create cuts in the high-frequency ranges
 * of the original audio signal and modulate them up and down throughout the audio. This effect
 * is frequently used in funk music, and it adds character to individual notes to create a form
 * of swirling movement in the audio.
 * 
 * @extends EffectBase
 */
class Phaser extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #inputNode;
   /** @type {GainNode} */
   #outputNode;
   /** @type {BiquadFilterNode[]} */
   #filterNodes = [];
   /** @type {OscillatorNode} */
   #lfoNode;
   /** @type {GainNode} */
   #lfoGainNode;
   /** @type {GainNode} */
   #feedbackNode;
   /** @type {number} */
   #frequencyValue;


   // Parameter limits
   static numPoles = 9;
   static minRate = 0;
   static maxRate = 10;
   static minFrequency = 1;
   static maxFrequency = 22050;
   static minFeedback = 0;
   static maxFeedback = 0.95;
   static minIntensity = 0;
   static maxIntensity = 1;

   /**
    * Constructs a new {@link Phaser} effect object.
    */
   constructor(audioContext) {
      super(audioContext);

      this.#inputNode = new GainNode(audioContext);
      this.#outputNode = new GainNode(audioContext);
      for (let i = 0; i < Phaser.numPoles; ++i)
         this.#filterNodes.push(new BiquadFilterNode(audioContext, { type: 'allpass', Q: 0.1 }));
      this.#lfoNode = new OscillatorNode(audioContext);
      this.#lfoGainNode = new GainNode(audioContext);
      this.#feedbackNode = new GainNode(audioContext);

      this.#outputNode.connect(this.#feedbackNode).connect(this.#inputNode);
      for (let i = 0; i < Phaser.numPoles; ++i) {
         this.#lfoNode.connect(this.#lfoGainNode).connect(this.#filterNodes[i].detune);
         this.#inputNode.connect(this.#filterNodes[i]).connect(this.#outputNode);
      }
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'rate', type: 'number', validValues: [Phaser.minRate, Phaser.maxRate], defaultValue: 8 },
         { name: 'shape', type: 'string', validValues: ['sine', 'square', 'sawtooth', 'triangle'], defaultValue: 'sine' },
         { name: 'frequency', type: 'number', validValues: [Phaser.minFrequency, Phaser.maxFrequency], defaultValue: 1500 },
         { name: 'feedback', type: 'number', validValues: [Phaser.minFeedback, Phaser.maxFeedback], defaultValue: 0 },
         { name: 'intensity', type: 'number', validValues: [Phaser.minIntensity, Phaser.maxIntensity], defaultValue: 0 }
      ];
   }

   async load() {
      this.#frequencyValue = 1500;
      this.#inputNode.gain.value = 0.5;
      this.#outputNode.gain.value = 0.2;
      this.#lfoGainNode.gain.value = 0;
      for (let i = 0; i < Phaser.numPoles; ++i)
         this.#filterNodes[i].frequency.value = 1500 + ((22050 - 1500) / (1 + Phaser.numPoles)) * i;
      this.#feedbackNode.gain.value = 0;
      this.#lfoNode.frequency.value = 8;
      this.#lfoNode.type = 'sine';
      this.#lfoNode.start();
   }

   /**
    * Updates the {@link Phaser} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} rate - Frequency at which an oscillator modulates the phaser signal in Hertz between [0, 10]
    * @param {string} shape - Waveform shape used to modulate the phaser signal from ['sine', 'square', 'sawtooth', 'triangle']
    * @param {number} frequency - Starting frequency of the all-pass filter between [1, 22050]
    * @param {number} feedback - Percentage of processed signal to be fed back into the phaser circuit between [0, 0.95]
    * @param {number} intensity - Ratio of processed-to-original sound as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ rate, shape, frequency, feedback, intensity }, updateTime, timeConstant) {
      if ((rate == null) && (shape == null) && (frequency == null) && (feedback == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Phaser effect without at least one of the following parameters: "rate, shape, frequency, feedback, intensity"');
      if (rate != null) {
         if (rate < Phaser.minRate)
            throw new WebAudioValueError(`Rate value cannot be less than ${Phaser.minRate}`);
         else if (rate > Phaser.maxRate)
            throw new WebAudioValueError(`Rate value cannot be greater than ${Phaser.maxRate}`);
      }
      if (shape != null) {
         if (!['sine', 'square', 'sawtooth', 'triangle'].includes(shape))
            throw new WebAudioValueError('Shape value must be one of: ["sine", "square", "sawtooth", "triangle"]');
      }
      if (frequency != null) {
         if (frequency < Phaser.minFrequency)
            throw new WebAudioValueError(`Frequency value cannot be less than ${Phaser.minFrequency}`);
         else if (frequency > Phaser.maxFrequency)
            throw new WebAudioValueError(`Frequency value cannot be greater than ${Phaser.maxFrequency}`);
      }
      if (feedback != null) {
         if (feedback < Phaser.minFeedback)
            throw new WebAudioValueError(`Feedback value cannot be less than ${Phaser.minFeedback}`);
         else if (feedback > Phaser.maxFeedback)
            throw new WebAudioValueError(`Feedback value cannot be greater than ${Phaser.maxFeedback}`);
      }
      if (intensity != null) {
         if (intensity < Phaser.minIntensity)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Phaser.minIntensity}`);
         else if (intensity > Phaser.maxIntensity)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Phaser.maxIntensity}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (rate != null)
         this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
      if (shape != null)
         this.#lfoNode.type = shape;
      if (frequency != null) {
         this.#frequencyValue = frequency;
         for (let i = 0; i < Phaser.numPoles; ++i)
            this.#filterNodes[i].frequency.setTargetAtTime(frequency + ((22050 - frequency) / (1 + Phaser.numPoles)) * i, timeToUpdate, timeConstantTarget);
      }
      if (feedback != null)
         this.#feedbackNode.gain.setTargetAtTime(feedback, timeToUpdate, timeConstantTarget);
      if (intensity != null)
         this.#lfoGainNode.gain.setTargetAtTime(1000 * intensity, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         rate: this.#lfoNode.frequency.value,
         shape: this.#lfoNode.type,
         frequency: this.#frequencyValue,
         feedback: this.#feedbackNode.gain.value,
         intensity: 0.001 * this.#lfoGainNode.gain.value
      };
   }

   getInputNode() {
      return this.#inputNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing a Reverb effect.
 * 
 * A Reverb effect represents a complex echo resulting from the absorption of sound by various
 * surfaces in an environment, as well as from multiple echoes reflecting from hard surfaces
 * many times and with differing amplitudes. This effect is useful for creating a sense of
 * spaciousness and can help to unify multiple elements within a musical piece.
 * 
 * @extends EffectBase
 */
class Reverb extends EffectBase {

   // Effect-specific private variables
   /** @type {ConvolverNode} */
   #convolutionNode;
   /** @type {GainNode} */
   #inputNode; #outputNode;
   /** @type {GainNode} */
   #dryGainNode; #wetGainNode;
   /** @type {number} */
   #relativeRoomSize; #decay;

   // Parameter limits
   static minDecay = 0;
   static maxDecay = 1;
   static minIntensity = 0;
   static maxIntensity = 1;
   static minRoomSize = 0.1;
   static maxRoomSize = 1;

   /**
    * Constructs a new {@link Reverb} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#convolutionNode = new ConvolverNode(audioContext);
      this.#dryGainNode = new GainNode(audioContext);
      this.#wetGainNode = new GainNode(audioContext);
      this.#inputNode = new GainNode(audioContext, { gain: 1 });
      this.#outputNode = new GainNode(audioContext, { gain: 1 });
      this.#inputNode.connect(this.#dryGainNode).connect(this.#outputNode);
      this.#inputNode.connect(this.#convolutionNode).connect(this.#wetGainNode).connect(this.#outputNode);
   }

   // Private function to generate an impulse response on-the-fly
   impulseResponse(duration, decay) {
      const sampleRate = this.audioContext.sampleRate;
      const length = sampleRate * 10 * duration;
      const impulse = this.audioContext.createBuffer(2, length, sampleRate);
      const impulseL = impulse.getChannelData(0), impulseR = impulse.getChannelData(1);
      for (let i = 0; i < length; ++i) {
         impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 10 * decay);
         impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 10 * decay);
      }
      return impulse;
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'decay', type: 'number', validValues: [Reverb.minDecay, Reverb.maxDecay], defaultValue: 0.3 },
         { name: 'roomSize', type: 'number', validValues: [Reverb.minRoomSize, Reverb.maxRoomSize], defaultValue: 0.1 },
         { name: 'intensity', type: 'number', validValues: [Reverb.minIntensity, Reverb.maxIntensity], defaultValue: 0 }
      ];
   }

   async load() {
      this.#decay = 0.3;
      this.#relativeRoomSize = 0.1;
      this.#dryGainNode.gain.value = 1;
      this.#wetGainNode.gain.value = 0;
      this.#convolutionNode.buffer = this.impulseResponse(this.#relativeRoomSize, this.#decay);
   }

   /**
    * Updates the {@link Reverb} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} decay - Number of seconds before reflections start to decay
    * @param {number} roomSize - Number of seconds before the first reflection occurs
    * @param {number} intensity - Ratio of reverbed-to-original sound as a percentage between [0.0, 1.0]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ decay, roomSize, intensity }, updateTime, timeConstant) {
      if ((decay ==  null) && (roomSize == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Reverb effect without at least one of the following parameters: "decay, roomSize, intensity"');
      if (decay != null) {
         if (decay < Reverb.minDecay)
            throw new WebAudioValueError(`Rate value cannot be less than ${Reverb.minDecay}`);
         else if (decay > Reverb.maxDecay)
            throw new WebAudioValueError(`Rate value cannot be greater than ${Reverb.maxDecay}`);
      }
      if (roomSize != null) {
         if (roomSize < Reverb.minRoomSize)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Reverb.minRoomSize}`);
         else if (roomSize > Reverb.maxRoomSize)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Reverb.maxRoomSize}`);
      }
      if (intensity != null) {
         if (intensity < Reverb.minIntensity)
            throw new WebAudioValueError(`Rate value cannot be less than ${Reverb.minIntensity}`);
         else if (intensity > Reverb.maxIntensity)
            throw new WebAudioValueError(`Rate value cannot be greater than ${Reverb.maxIntensity}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (decay != null)
         this.#decay = decay;
      if (roomSize != null)
         this.#relativeRoomSize = Math.max(roomSize, 0.01);
      if (intensity != null) {
         this.#wetGainNode.gain.setTargetAtTime(2.5 * intensity, timeToUpdate, timeConstantTarget);
         this.#dryGainNode.gain.setTargetAtTime(1 - intensity, timeToUpdate, timeConstantTarget);
      }
      this.#convolutionNode.buffer = this.impulseResponse(this.#relativeRoomSize, this.#decay);
      return true;
   }

   currentParameterValues() {
      return {
         decay: this.#decay,
         roomSize: this.#relativeRoomSize,
         intensity: 1 - this.#dryGainNode.gain.value
      };
   }

   getInputNode() {
      return this.#inputNode;
   }

   getOutputNode() {
      return this.#outputNode;
   }
}

/**
 * Class representing a Tremolo effect.
 * 
 * A Tremolo effect modulates an audio signal to produce a wavering effect based on rapidly
 * varying the amplitude of the signal. Acoustically, it is created by rapidly reiterating
 * the same note over and over. Perceptually, it is similar to vibrato; however, vibrato is
 * achieved by altering pitch, whereas tremolo is achieved by altering volume.
 * 
 * @extends EffectBase
 */
class Tremolo extends EffectBase {

   // Effect-specific private variables
   /** @type {OscillatorNode} */
   #lfoNode;
   /** @type {GainNode} */
   #normalizationNode;
   /** @type {GainNode} */
   #depthNode;

   // Parameter limits
   static minRate = 0;
   static maxRate = 20;
   static minIntensity = 0;
   static maxIntensity = 1;

   /**
    * Constructs a new {@link Tremolo} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#normalizationNode = new GainNode(audioContext);
      this.#depthNode = new GainNode(audioContext);
      this.#lfoNode = new OscillatorNode(audioContext);
      this.#lfoNode.connect(this.#depthNode).connect(this.#normalizationNode.gain);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'rate', type: 'number', validValues: [Tremolo.minRate, Tremolo.maxRate], defaultValue: 10 },
         { name: 'intensity', type: 'number', validValues: [Tremolo.minIntensity, Tremolo.maxIntensity], defaultValue: 0 }
      ];
   }

   async load() {
      this.#lfoNode.type = 'sine';
      this.#lfoNode.frequency.value = 10;
      this.#normalizationNode.gain.value = 1;
      this.#depthNode.gain.value = 0;
      this.#lfoNode.start();
   }

   /**
    * Updates the {@link Tremolo} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} rate - Frequency at which an oscillator modulates the tremolo signal in Hz between [0, 40]
    * @param {number} intensity - Intensity of the effect as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ rate, intensity }, updateTime, timeConstant) {
      if ((rate == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Tremolo effect without at least one of the following parameters: "rate, intensity"');
      if (rate != null) {
         if (rate < Tremolo.minRate)
            throw new WebAudioValueError(`Rate value cannot be less than ${Tremolo.minRate}`);
         else if (rate > Tremolo.maxRate)
            throw new WebAudioValueError(`Rate value cannot be greater than ${Tremolo.maxRate}`);
      }
      if (intensity != null) {
         if (intensity < Tremolo.minIntensity)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Tremolo.minIntensity}`);
         else if (intensity > Tremolo.maxIntensity)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Tremolo.maxIntensity}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (rate != null)
         this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
      if (intensity != null) {
         this.#depthNode.gain.setTargetAtTime(0.5 * intensity, timeToUpdate, timeConstantTarget);
         this.#normalizationNode.gain.setTargetAtTime(1.0 - (0.5 * intensity), timeToUpdate, timeConstantTarget);
      }
      return true;
   }

   currentParameterValues() {
      return {
         rate: this.#lfoNode.frequency.value,
         intensity: 2.0 * this.#depthNode.gain.value
      };
   }

   getInputNode() {
      return this.#normalizationNode;
   }

   getOutputNode() {
      return this.#normalizationNode;
   }
}

/**
 * Class representing a Vibrato effect.
 * 
 * A Vibrato effect modulates an audio signal to produce a wavering effect based on rapidly
 * varying the pitch of the signal. Perceptually, it is similar to tremolo; however, tremolo is
 * achieved by altering volume, whereas vibrato is achieved by altering pitch.
 * 
 * @extends EffectBase
 */
class Vibrato extends EffectBase {

   // Effect-specific private variables
   /** @type {OscillatorNode} */
   #lfoNode;
   /** @type {DelayNode} */
   #delayNode;
   /** @type {GainNode} */
   #gainNode;

   // Parameter limits
   static minRate = 0;
   static maxRate = 10;
   static minIntensity = 0;
   static maxIntensity = 1;

   /**
    * Constructs a new {@link Vibrato} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#lfoNode = new OscillatorNode(audioContext);
      this.#delayNode = new DelayNode(audioContext, { maxDelayTime: 1 });
      this.#gainNode = new GainNode(audioContext);
      this.#lfoNode.connect(this.#gainNode).connect(this.#delayNode.delayTime);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'rate', type: 'number', validValues: [Vibrato.minRate, Vibrato.maxRate], defaultValue: 8 },
         { name: 'intensity', type: 'number', validValues: [Vibrato.minIntensity, Vibrato.maxIntensity], defaultValue: 0 }
      ];
   }

   async load() {
      this.#gainNode.gain.value = 0;
      this.#delayNode.delayTime.value = 0.01;
      this.#lfoNode.frequency.value = 8;
      this.#lfoNode.type = 'sine';
      this.#lfoNode.start();
   }

   /**
    * Updates the {@link Vibrato} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} rate - Frequency at which an oscillator modulates the vibrato signal in Hz between [0, 10]
    * @param {number} intensity - Intensity of the effect as a percentage between [0, 1]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({ rate, intensity }, updateTime, timeConstant) {
      if ((rate == null) && (intensity == null))
         throw new WebAudioValueError('Cannot update the Vibrato effect without at least one of the following parameters: "rate, intensity"');
      if (rate != null) {
         if (rate < Vibrato.minRate)
            throw new WebAudioValueError(`Rate value cannot be less than ${Vibrato.minRate}`);
         else if (rate > Vibrato.maxRate)
            throw new WebAudioValueError(`Rate value cannot be greater than ${Vibrato.maxRate}`);
      }
      if (intensity != null) {
         if (intensity < Vibrato.minIntensity)
            throw new WebAudioValueError(`Intensity value cannot be less than ${Vibrato.minIntensity}`);
         else if (intensity > Vibrato.maxIntensity)
            throw new WebAudioValueError(`Intensity value cannot be greater than ${Vibrato.maxIntensity}`);
      }
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      if (rate != null) 
         this.#lfoNode.frequency.setTargetAtTime(rate, timeToUpdate, timeConstantTarget);
      if (intensity != null)
         this.#gainNode.gain.setTargetAtTime(0.001 * intensity, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         rate: this.#lfoNode.frequency.value,
         intensity: 1000 * this.#gainNode.gain.value
      };
   }

   getInputNode() {
      return this.#delayNode;
   }

   getOutputNode() {
      return this.#delayNode;
   }
}

/**
 * Class representing a Volume effect.
 * 
 * A Volume effect modulates the overall loudness of an audio signal.
 * 
 * @extends EffectBase
 */
class Volume extends EffectBase {

   // Effect-specific private variables
   /** @type {GainNode} */
   #volumeNode;

   // Parameter limits
   static minVolume = 0;
   static maxVolume = 1;

   /**
    * Constructs a new {@link Volume} effect object.
    */
   constructor(audioContext) {
      super(audioContext);
      this.#volumeNode = new GainNode(audioContext);
   }

   /**
    * Returns a list of all available parameters for manipulation in the `effectOptions` parameter
    * of the {@link EffectBase#update update()} function for this {@link Effect}.
    * 
    * @returns {EffectParameter[]} List of effect-specific parameters for use in the effect's {@link EffectBase#update update()} function
    * @see {@link EffectParameter}
    */
   static getParameters() {
      return [
         { name: 'intensity', type: 'number', validValues: [Volume.minVolume, Volume.maxVolume], defaultValue: Volume.maxVolume }
      ];
   }

   async load() {
      this.#volumeNode.gain.value = Volume.maxVolume;
   }

   /* eslint no-empty-pattern: "off" */
   /**
    * Updates the {@link Volume} effect according to the specified parameters at the
    * specified time.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {number} intensity - Intensity of the volume as a percentage between [0.0, 1.0]
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
    * @returns {Promise<boolean>} Whether the effect update was successfully applied
    */
   async update({intensity}, updateTime, timeConstant) {
      if (intensity == null)
         throw new WebAudioValueError('Cannot update the Volume effect without at least one of the following parameters: "intensity"');
      if (intensity < Volume.minVolume)
         throw new WebAudioValueError(`Intensity value cannot be less than ${Volume.minVolume}`);
      else if (intensity > Volume.maxVolume)
         throw new WebAudioValueError(`Intensity value cannot be greater than ${Volume.maxVolume}`);
      const timeToUpdate = (updateTime == null) ? this.audioContext.currentTime : updateTime;
      const timeConstantTarget = (timeConstant == null) ? 0.0 : timeConstant;
      this.#volumeNode.gain.setTargetAtTime(intensity, timeToUpdate, timeConstantTarget);
      return true;
   }

   currentParameterValues() {
      return {
         intensity: this.#volumeNode.gain.value
      };
   }

   getInputNode() {
      return this.#volumeNode;
   }

   getOutputNode() {
      return this.#volumeNode;
   }
}

/**
 * Module containing functionality to apply and update {@link WebAudioAPI} effects.
 * @module Effect
 */


const EffectClasses = {
   [EffectType.Reverb]: Reverb, [EffectType.Delay]: Delay, [EffectType.Echo]: Echo, [EffectType.Chorus]: Chorus, [EffectType.Doppler]: Doppler,
   [EffectType.Tremolo]: Tremolo, [EffectType.Vibrato]: Vibrato, [EffectType.Flanger]: Flanger, [EffectType.Phaser]: Phaser,
   [EffectType.Panning]: Panning, [EffectType.Equalization]: Equalization, [EffectType.Volume]: Volume, [EffectType.Compression]: Compression,
   [EffectType.Distortion]: Distortion, [EffectType.LowPassFilter]: LowPassFilter, [EffectType.HighPassFilter]: HighPassFilter,
   [EffectType.BandPassFilter]: BandPassFilter, [EffectType.BandRejectFilter]: BandRejectFilter, [EffectType.PitchShift]: PitchShift
};


/**
 * Returns a list of effect-specific {@link EffectParameter EffectParameters} for manipulation
 * in the corresponding {@link module:Constants.EffectType EffectType}.
 * 
 * Note that the `effectType` parameter must be the **numeric value** associated with a certain
 * {@link module:Constants.EffectType EffectType}, not a string-based key.
 * 
 * @param {number} effectType - {@link module:Constants.EffectType EffectType} for which to return a parameter list
 * @returns {EffectParameter[]} List of effect-specific parameters available for updating
 * @see {@link module:Constants.EffectType EffectType}
 * @see {@link EffectParameter}
 */
function getEffectParameters(effectType) {
   return EffectClasses[effectType].getParameters();
}


/**
 * Loads a pre-defined {@link Effect} capable of being applied to an individual {@link Track} or
 * to the aggregate output of all tracks.
 * 
 * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @param {string} effectName - User-defined name to assign to the newly loaded effect
 * @param {number} effectType - Numeric value corresponding to the desired {@link module:Constants.EffectType EffectType}
 * @returns {Promise<Effect>} Newly created audio {@link Effect}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @see {@link module:Constants.EffectType EffectType}
 * @see {@link Effect}
 * @async
 */
async function loadEffect(audioContext, effectName, effectType) {

   // Load the requested concrete effect type
   const effect = new EffectClasses[effectType](audioContext);
   await effect.load();

   // Returns an object containing functions and attributes within the public Effect namespace
   return {
      /**
       * User-defined name of the {@link Effect}.
       * @memberof Effect
       * @instance
       */
      name: effectName,
   
      /**
       * Numeric value corresponding to the {@link module:Constants.EffectType EffectType} of the {@link Effect}.
       * @memberof Effect
       * @instance
       */
      type: effectType,
   
      /**
       * Reference to an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
       * to which all source {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNodes}
       * should be connected.
       * @memberof Effect
       * @instance
       */
      input: effect.getInputNode(),
   
      /**
       * Reference to an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
       * from which all effect-modified output audio is produced, and which should be connected to all
       * destination {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNodes}.
       * @memberof Effect
       * @instance
       */
      output: effect.getOutputNode(),

      /**
       * List of effect-specific {@link EffectParameter EffectParameters} for manipulation in the
       * `effectOptions` parameter of the {@link Effect#update update()} function.
       * @memberof Effect
       * @instance
       */
      parameters: EffectClasses[effectType].getParameters(),

      /**
       * Retrieves the values for all effect-specific parameters at the current time, with keys as
       * specified by the {@link Effect#parameters parameters} member of this {@link Effect}.
       * 
       * @function
       * @returns {Object} Effect-specific parameter values with keys as returned by {@link Effect#parameters parameters}
       * @memberof Effect
       * @instance
       */
      currentParameterValues: effect.currentParameterValues.bind(effect),

      /**
       * Updates the parameters of the effect at the specified time.
       * 
       * Note that the `updateTime` parameter can be omitted to immediately cause the requested
       * changes to take effect.
       * 
       * @function
       * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
       * @param {number} [updateTime] - Global API time at which to update the effect
       * @param {number} [timeConstant] - Time constant defining an exponential approach to the target
       * @returns {Promise<boolean>} Whether the effect update was successfully applied
       * @memberof Effect
       * @instance
       * @async
       */
      update: effect.update.bind(effect)
   };
}

/**
 * Module containing all MIDI constants and functionality available in the {@link WebAudioAPI} library.
 * 
 * @module Midi
 */

/**
 * Object representing a mapping between a General MIDI command and its protocol value.
 * @constant {Object<string, number>}
 */
const MidiCommand = {
   Unknown: 0x00, NoteOff: 0x80, NoteOn: 0x90, Aftertouch: 0xA0, ContinuousController: 0xB0,
   ProgramChange: 0xC0, ChannelPressure: 0xD0, PitchBend: 0xE0, SystemMessage: 0xF0
};

/**
 * Returns a value representing the MIDI command in the specified `midiData`.
 * 
 * @param {number[]} midiData - Data array containing raw MIDI event data
 * @returns {number} MIDI command specified in the corresponding `midiData`
 * @see {@link module:Midi.MidiCommand MidiCommand}
 */
function getMidiCommand(midiData) {
   return midiData[0] & 0xF0;
}

/**
 * Returns the MIDI note corresponding to the `NoteOn` or `NoteOff` command in the specified
 * `midiData` parameter.
 * 
 * @param {number[]} midiData - Data array containing raw MIDI event data
 * @returns {number} MIDI note corresponding to the relevant `midiData` command
 */
function getMidiNote(midiData) {
   return midiData[1] & 0x7F;
}

/**
 * Returns the note velocity corresponding to the `NoteOn` or `NoteOff` command in the
 * specified `midiData` parameter. This velocity will be in the range from [0.0, 1.0].
 * 
 * @param {number[]} midiData - Data array containing raw MIDI event data
 * @returns {number} Note velocity for a MIDI note in the range [0.0, 1.0]
 */
function getMidiVelocity(midiData) {
   return (midiData[2] & 0x7F) / 127.0;
}

/** Class representing all built-in {@link WebAudioAPI} audio encoders */
class EncoderBase {

   /**
    * Called by a concrete encoder instance to initialize the inherited {@link EncoderBase} data
    * structure.
    */
   constructor() { /* Empty constructor */ }

   /**
    * Encodes the corresponding audio buffer, and returns a
    * {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly
    * encoded data.
    * 
    * @param {AudioBuffer} audioData - {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer AudioBuffer} containing the data to encode
    * @param {Object} [encodingOptions] - Optional encoding-specific options such as 'bitRate'
    * @returns {Promise<Blob>} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer AudioBuffer}
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
    */
   async encode(audioData, encodingOptions) { return undefined; }
}

/**
 * Class containing all WAV file encoding functionality.
 * @extends EncoderBase
 */
class WavFileEncoder extends EncoderBase {

   /**
    * Constructs a new {@link WavFileEncoder} object.
    */
   constructor() {
      super();
   }

   async encode(audioData) {
      // Code taken from https://russellgood.com/how-to-convert-audiobuffer-to-audio-file/
      const numChannels = audioData.numberOfChannels, length = audioData.length * numChannels * 2 + 44;
      const buffer = new ArrayBuffer(length), channels = [];
      const view = new DataView(buffer);
      let offset = 0, pos = 0;

      // Nested helper functions
      function setUint16(data) {
         view.setUint16(pos, data, true);
         pos += 2;
      }

      function setUint32(data) {
         view.setUint32(pos, data, true);
         pos += 4;
      }

      // Write WAVE header
      setUint32(0x46464952);                              // "RIFF"
      setUint32(length - 8);                              // file length - 8
      setUint32(0x45564157);                              // "WAVE"

      setUint32(0x20746d66);                              // "fmt " chunk
      setUint32(16);                                      // length = 16
      setUint16(1);                                       // PCM (uncompressed)
      setUint16(numChannels);
      setUint32(audioData.sampleRate);
      setUint32(audioData.sampleRate * 2 * numChannels);  // avg. bytes/sec
      setUint16(numChannels * 2);                         // block-align
      setUint16(16);                                      // 16-bit (hardcoded in this demo)

      setUint32(0x61746164);                              // "data" - chunk
      setUint32(length - pos - 4);                        // chunk length

      // Write interleaved data
      for (let i = 0; i < audioData.numberOfChannels; ++i)
         channels.push(audioData.getChannelData(i));
      while (pos < length) {
         for (let i = 0; i < numChannels; ++i) {
            let sample = Math.max(-1, Math.min(1, channels[i][offset]));          // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;    // scale to 16-bit signed int
            view.setInt16(pos, sample, true);                                     // write 16-bit sample
            pos += 2;
         }
         ++offset;                                                                // next source sample
      }
      return new Blob([view.buffer], { type: 'audio/wav' });
   }
}

/**
 * Module containing functionality to create and utilize {@link WebAudioAPI} data encoders.
 * @module Encoder
 */


const EncoderClasses = {
   [EncodingType.WAV]: WavFileEncoder,
};

/**
 * Returns a concrete encoder implementation for the specified file type. The value passed
 * to the `fileType` parameter must be the **numeric value** associated with a certain
 * {@link module:Constants.EncodingType EncodingType}, not a string-based key.
 * 
 * @param {number} encodingType - Numeric value corresponding to the desired file {@link module:Constants.EncodingType EncodingType}
 * @returns {EncoderBase} Concrete encoder implementation for the specified {@link module:Constants.EncodingType EncodingType}
 * @see {@link module:Constants.EncodingType EncodingType}
 * @see {@link EncoderBase}
 */
function getEncoderFor(encodingType) {
   return new EncoderClasses[encodingType]();
}

/**
 * Module containing functionality to create new {@link WebAudioAPI} tracks.
 * @module Track
 */


/**
 * Creates a new audio {@link Track} object capable of playing sequential audio.
 * 
 * @param {string} name - Name of the track to create
 * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @param {Tempo} tempo - Reference to the {@link Tempo} object stored in the global {@link WebAudioAPI} object
 * @param {Key} keySignature - Reference to the {@link Key} object stored in the global {@link WebAudioAPI} object
 * @param {AudioNode} trackAudioSink - Reference to the {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode} to which the output of this track should be connected
 * @returns {Track} Newly created audio {@link Track}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode AudioNode}
 * @see {@link Key}
 * @see {@link Track}
 * @see {@link Tempo}
 */
function createTrack(name, audioContext, tempo, keySignature, trackAudioSink) {

   // Track-local variable definitions
   let instrument = null, midiDevice = null, audioDeviceInput = null;
   let currentVelocity = 0.5, chordIndex = 0, chordDynamicUpdated = false;
   const audioSources = [], asyncAudioSources = [], effects = [], notesInWaiting = {}, waitingTies = [];
   const audioSink = new AnalyserNode(audioContext, { fftSize: 1024, maxDecibels: -10.0, smoothingTimeConstant: 0.5 });
   const analysisBuffer = new Uint8Array(audioSink.frequencyBinCount);
   audioSink.connect(trackAudioSink);

   // Private internal Track functions
   function createAsyncNote(noteValue, sourceNode, volumeNode) {
      return { noteValue, sourceNode, volumeNode };
   }

   function midiEventReceived(event) {
      const command = getMidiCommand(event.data);
      if (command === MidiCommand.NoteOff) {
         for (const asyncSource of asyncAudioSources)
            if (asyncSource.noteValue == getMidiNote(event.data)) {
               stopNoteAsync(asyncSource);
               break;
            }
      }
      else if ((command === MidiCommand.NoteOn) && (getMidiVelocity(event.data) > 0))
         playNoteAsync(getMidiNote(event.data), getMidiVelocity(event.data));
   }
   
   function sourceEnded(source, sourceVolume) {
      if (sourceVolume == null)
         sourceVolume = source;
      sourceVolume.disconnect();
      audioSources.splice(audioSources.indexOf(source), 1);
   }

   /**
    * Updates the instrument used to play back audio on the current track.
    * 
    * @param {Instrument} instrumentData - Instrument object to use when generating audio on the current track
    * @memberof Track
    * @instance
    */
   function updateInstrument(instrumentObject) {
      instrument = instrumentObject;
   }

   /**
    * Removes the instrument used to play back audio on the current track.
    * 
    * @memberof Track
    * @instance
    */
   function removeInstrument() {
      instrument = null;
   }

   /**
    * Returns a buffer containing the realtime frequency content of the audio being produced by
    * the current track.
    * 
    * @param {number} analysisType - Audio {@link module:Constants.AnalysisType AnalysisType} for which the buffer will be used
    * @returns {Uint8Array} Array containing time or frequency content of the track's current audio output
    * @memberof Track
    * @instance
    */
   function getAnalysisBuffer(analysisType) {
      if (analysisType == AnalysisType.TimeSeries)
         audioSink.getByteTimeDomainData(analysisBuffer);
      else
         audioSink.getByteFrequencyData(analysisBuffer);
      return analysisBuffer;
   }

   /**
    * Applies a new track effect at the specified time.
    * 
    * Calling this function affects the sequential ordering in which effects will be
    * processed, with each new call appending the corresponding effect to the *end* of the
    * processing sequence.
    * 
    * If an effect with the specified `effectName` has already been applied , then calling
    * this function will simply re-order the effect to move it to the very end of the effect
    * processing sequence, without changing its parameter values.
    * 
    * @param {string} effectName - User-defined name to associate with the track effect
    * @param {number} effectType - Track {@link module:Constants.EffectType EffectType} to apply
    * @see {@link module:Constants.EffectType EffectType}
    * @memberof Track
    * @instance
    */
   async function applyEffect(effectName, effectType) {
      const existingEffect = await this.removeEffect(effectName);
      const newEffect = existingEffect || await loadEffect(audioContext, effectName, effectType);
      newEffect.output.connect(trackAudioSink);
      if (effects.length) {
         const previousEffect = effects.slice(-1)[0];
         previousEffect.output.disconnect();
         previousEffect.output.connect(newEffect.input);
      }
      else {
         audioSink.disconnect();
         audioSink.connect(newEffect.input);
      }
      effects.push(newEffect);
   }

   /**
    * Updates the parameters of a track effect at the specified time.
    * 
    * Calling this function will **not** affect the sequential processing order of any applied
    * effects.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {string} effectName - Name of the track effect to be updated
    * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    * @param {number} updateTime - Global API time at which to update the effect
    * @param {number} timeConstant - Time constant defining an exponential approach to the target
    * @memberof Track
    * @instance
    */
   async function updateEffect(effectName, effectOptions, updateTime, timeConstant) {
      for (const effect of effects)
         if (effect.name == effectName) {
            await effect.update(effectOptions, updateTime, timeConstant);
            return;
         }
      throw new WebAudioTargetError(`The target track effect (${effectName}) does not exist`);
   }

   /**
    * Returns the current parameter settings for the specified track effect.
    * 
    * @param {string} effectName - Name of the track effect for which to retrieve current settings
    * @returns {Object} Effect-specific parameter values with keys as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    * @memberof Track
    * @instance
    */
   function getCurrentEffectParameters(effectName) {
      for (const effect of effects)
         if (effect.name == effectName)
            return effect.currentParameterValues();
      throw new WebAudioTargetError(`The target track effect (${effectName}) does not exist`);
   }

   /**
    * Removes the specified track effect from being applied.
    * 
    * @param {string} effectName - Name of the track effect to be removed
    * @returns {Effect|null} Existing effect or null
    * @memberof Track
    * @instance
    */
   async function removeEffect(effectName) {
      let existingEffect = null;
      for (const [index, effect] of effects.entries())
         if (effect.name == effectName) {
            existingEffect = effects.splice(index, 1)[0];
            if (index == 0) {
               audioSink.disconnect();
               audioSink.connect(effects.length ? effects[0].input : trackAudioSink);
            }
            else {
               effects[index-1].output.disconnect();
               effects[index-1].output.connect((effects.length > index) ? effects[index].input : trackAudioSink);
            }
            existingEffect.input.disconnect();
            existingEffect.output.disconnect();
            break;
         }
      return existingEffect;
   }

   /**
    * Immediately stop playing a note on the current track. The note to be stopped must be a
    * reference to an actively playing note that was previously returned from the
    * {@link Track#playNoteAsync playNoteAsync()} function.
    * 
    * @param {Object} noteObject - Reference to an active note that was started using {@link Track#playNoteAsync playNoteAsync()}
    * @memberof Track
    * @instance
    */
   function stopNoteAsync(noteObject) {
      noteObject.sourceNode.onended = null;
      asyncAudioSources.splice(asyncAudioSources.indexOf(noteObject), 1);
      noteObject.volumeNode.gain.setTargetAtTime(0.0, audioContext.currentTime, 0.03);
      setTimeout(() => {
         noteObject.sourceNode.stop();
         noteObject.volumeNode.disconnect();
      }, 200);
   }

   /**
    * Immediately begins playing a note on the current track. Playback continues until the note
    * is explicitly stopped using the {@link Track#stopNoteAsync stopNoteAsync()} function.
    * 
    * Note that the `note` parameter should correspond to a valid MIDI note number.
    * 
    * @param {number} note -  MIDI {@link module:Constants.Note Note} number to be played
    * @param {number} velocity - Intensity of the note to play between [0.0, 1.0]
    * @returns {Object} Reference to the newly scheduled note
    * @memberof Track
    * @instance
    */
   function playNoteAsync(note, velocity) {
      if (!instrument)
         throw new WebAudioTrackError(`The current track (${name}) cannot play a note without first setting up an instrument`);
      const noteSource = instrument.getNote(note);
      const noteVolume = new GainNode(audioContext, { gain: velocity });
      noteSource.connect(noteVolume).connect(audioSink);
      const noteStorage = createAsyncNote(note, noteSource, noteVolume);
      noteSource.onended = stopNoteAsync.bind(this, noteStorage);
      asyncAudioSources.push(noteStorage);
      noteSource.start(audioContext.currentTime);
      return noteStorage;
   }

   /**
    * Schedules a note to be played on the current track for some duration of time.
    * 
    * Note that the `duration` parameter should correspond to the beat scaling factor
    * associated with one of the note durations from
    * {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()}.
    * Likewise, the `note` parameter should correspond to a valid MIDI note number.
    * 
    * The `modifications` parameter may either be a single {@link ModificationDetails}
    * structure or a list of such structures.
    * 
    * @param {number} note - MIDI {@link module:Constants.Note Note} number to be played
    * @param {number} startTime - Global API time at which to start playing the note
    * @param {number} duration - {@link module:Constants.Duration Duration} for which to continue playing the note
    * @param {ModificationDetails[]} modifications - One or more {@link ModificationDetails Modifications} to apply to the note
    * @param {boolean} isDrumNote - Whether this note is a drum note (i.e., not affected by key or duration)
    * @param {boolean} [fromChord] - Whether this note is being played from the {@link playChord playChord()} function
    * @returns {number} Duration (in seconds) of the note being played
    * @memberof Track
    * @instance
    */
   function playNote(note, startTime, duration, modifications, isDrumNote, fromChord=false) {
      if (!instrument)
         throw new WebAudioTrackError(`The current track (${name}) cannot play a note without first setting up an instrument`);

      // Infer missing modification details for any notes in waiting
      const waitingNoteDetails = [], newTies = [];
      for (const noteInWaitingPitch in notesInWaiting) {
         const noteInWaiting = notesInWaiting[noteInWaitingPitch];
         if (!fromChord || (noteInWaiting.chordIndex != chordIndex)) {
            let noteDetails = [new NoteDetails(noteInWaiting.note, currentVelocity, noteInWaiting.duration)];
            const sequence = [[noteInWaiting.note, noteInWaiting.duration], [note, duration]];
            for (const modification of noteInWaiting.pendingModifications)
               modification.value = inferModificationParametersFromSequence(modification.type, sequence, 1, modification.value);
            for (const modification of noteInWaiting.modifications) {
               const modClass = loadModification(modification.type, tempo, keySignature, noteDetails[0]);
               noteDetails = modClass.getModifiedNoteDetails(modification.value);
               if (modification.type == ModificationType.Tie)
                  newTies.push(noteDetails[0].note);
               for (const noteDetail of noteDetails) {
                  noteDetail.startTimeOffset -= (startTime - noteInWaiting.startTime);
                  noteDetail.wasWaitingNote = true;
               }
            }
            delete notesInWaiting[noteInWaitingPitch];
            waitingNoteDetails.push(...noteDetails);
         }
      }

      // Remove any duplicate modifications, keeping only the last one
      const exists = [];
      for (let i = modifications.length - 1; i >= 0; --i)
         if (exists.includes(modifications[i].type))
            modifications.splice(i, 1);
         else
            exists.push(modifications[i].type);

      // Order modifications by type so that they make sense when applied: GlobalDynamic < Loudness < Start Time Offsets < Durations < Adds notes
      modifications.sort((a, b) => { return a.type - b.type; });

      // Get concrete note details based on any applied modifications
      let requiresWaiting = false, totalDurationSeconds = 0.0;
      let noteDetails = [new NoteDetails(note, currentVelocity, duration)];
      for (const modification of modifications) {

         // Determine if the modification requires that we wait for the next note to infer missing details
         let modRequiresWaiting = false;
         const neededParams = getModificationParameters(modification.type).optional.singleNote;
         if (neededParams.length && canModifySequence(modification.type)) {
            for (const neededParam of neededParams)
               if (!('value' in modification) || !(neededParam in modification.value) && ((neededParams.length > 1) || !('implicit' in modification.value))) {
                  if (!(note in notesInWaiting))
                     notesInWaiting[note] = { note: note, duration: duration, startTime: startTime, chordIndex: chordIndex, modifications: modifications, pendingModifications: [] };
                  notesInWaiting[note].pendingModifications.push(modification);
                  requiresWaiting = modRequiresWaiting = true;
               }
         }

         // Update the concrete note details based on the current modification
         if (!modRequiresWaiting) {
            const modClass = loadModification(modification.type, tempo, keySignature, noteDetails[0]);
            noteDetails = modClass.getModifiedNoteDetails(modification.value);
            if (((modification.type == ModificationType.Crescendo) || (modification.type == ModificationType.Decrescendo) ||
                 (modification.type == ModificationType.Diminuendo) || (modClass instanceof GlobalDynamic)) &&
                (!fromChord || !chordDynamicUpdated)) {
               currentVelocity = noteDetails[0].velocity;
               chordDynamicUpdated = fromChord;
            }
            else if (modification.type == ModificationType.Tie)
               newTies.push(noteDetails[0].note);
         }
         else
            totalDurationSeconds = (noteDetails[0].usedDuration < 0) ? -noteDetails[0].usedDuration : (60.0 / ((noteDetails[0].usedDuration / tempo.beatBase) * tempo.beatsPerMinute));
      }

      // Schedule all notes for playback
      noteDetails = (requiresWaiting ? waitingNoteDetails : waitingNoteDetails.concat(noteDetails));
      for (const note of noteDetails) {
         const durationSeconds = (note.duration < 0) ? -note.duration : (60.0 / ((note.duration / tempo.beatBase) * tempo.beatsPerMinute));
         if (waitingTies.includes(note.note))
            waitingTies.splice(waitingTies.indexOf(note.note), 1);
         else {
            const noteSource = instrument.getNote(note.note);
            const noteVolume = new GainNode(audioContext, { gain: note.velocity });
            noteSource.connect(noteVolume).connect(audioSink);
            if (!isDrumNote)
               noteVolume.gain.setTargetAtTime(0.0, startTime + note.startTimeOffset + durationSeconds, 0.03);
            noteSource.onended = sourceEnded.bind(this, noteSource, noteVolume);
            audioSources.push(noteSource);
            noteSource.start(startTime + note.startTimeOffset, 0, isDrumNote ? undefined : (durationSeconds + 0.200));
         }
         if (newTies.includes(note.note))
            waitingTies.push(newTies.splice(newTies.indexOf(note.note), 1)[0]);
         if (!note.wasWaitingNote)
            totalDurationSeconds += (note.usedDuration <= 0) ? -note.usedDuration : (60.0 / ((note.usedDuration / tempo.beatBase) * tempo.beatsPerMinute));
      }
      return totalDurationSeconds;
   }

   /**
    * Schedules a chord of notes to be played on the current track.
    * 
    * Note that the `chord` parameter should be an array of `[note, duration, mods]` tuples,
    * where the `note` parameter should correspond to a valid MIDI note number, the `duration`
    * parameter should correspond to the beat scaling factor associated with one of the note
    * durations from {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()},
    * and `mods` may either be a single modification to the chord, a list of modifications, or
    * omitted completely.
    * 
    * The `modifications` parameter may either be a single {@link ModificationDetails}
    * structure or a list of such structures.
    * 
    * @param {Array<Array>}} chord - Array of `[note, duration, mods]` corresponding to the chord to be played
    * @param {number} startTime - Global API time at which to start playing the chord
    * @param {ModificationDetails[]} modifications - One or more {@link ModificationDetails Modifications} to apply to the chord
    * @param {boolean} areDrumNotes - Whether this chord contains only drum notes (i.e., not affected by key or duration)
    * @returns {number} Duration (in seconds) of the chord being played
    * @memberof Track
    * @instance
    */
   function playChord(chord, startTime, modifications, areDrumNotes) {
      chordIndex = (chordIndex + 1) % 2;
      let minDuration = Number.POSITIVE_INFINITY;
      for (const chordItem of chord) {
         const [note, duration, noteMods] = chordItem;
         const mods = modifications.concat(noteMods ? (Array.isArray(noteMods) ? noteMods : [noteMods]) : []);
         minDuration = Math.min(minDuration, playNote(Number(note), startTime, Number(duration), mods, areDrumNotes, true));
      }
      chordDynamicUpdated = false;
      return minDuration;
   }

   /**
    * Schedules a musical sequence to be played on the current track.
    * 
    * Note that the `sequence` parameter should be an array containing either chords (as
    * defined in the {@link playChord playChord()} function) or `[note, duration, mods]` tuples,
    * where the `note` parameter should correspond to a valid MIDI note number, the `duration`
    * parameter should correspond to the beat scaling factor associated with one of the note
    * durations from {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()},
    * and `mods` may either be a single modification that affects the whole sequence, a list of
    * modifications, or omitted completely.
    * 
    * The `modifications` parameter may either be a single {@link ModificationDetails}
    * structure or a list of such structures.
    * 
    * @param {Array<Array|Array<Array>>} sequence - Array of `[note, duration, mods]` and/or chords corresponding to the sequence to be played
    * @param {number} startTime - Global API time at which to start playing the sequence
    * @param {ModificationDetails[]} modifications - One or more {@link ModificationDetails Modifications} to apply to the sequence
    * @param {boolean} areDrumNotes - Whether this sequence contains only drum notes (i.e., not affected by key or duration)
    * @returns {number} Duration (in seconds) of the sequence being played
    * @memberof Track
    * @instance
    */
   function playSequence(sequence, startTime, modifications, areDrumNotes) {
      let noteIndex = 0;
      const originalStartTime = startTime;
      for (const sequenceItem of sequence) {
         ++noteIndex;
         for (const modification of modifications)
            modification.value = inferModificationParametersFromSequence(modification.type, sequence, noteIndex, modification.value);
         if (Array.isArray(sequenceItem[0]))
            startTime += playChord(sequenceItem, startTime, modifications, areDrumNotes);
         else {
            const [note, duration, noteMods] = sequenceItem;
            const mods = (noteMods ? (Array.isArray(noteMods) ? noteMods : [noteMods]) : []).concat(modifications);
            startTime += playNote(Number(note), startTime, Number(duration), mods, areDrumNotes);
         }
      }
      return startTime - originalStartTime;
   }

   /**
    * Schedules an audio clip to be played on the current track for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio clip will
    * play to completion.
    * 
    * @param {ArrayBuffer|AudioBuffer|Blob|MidiClip|AudioClip} audioClip - Object containing audio data to play
    * @param {number} startTime - Global API time at which to start playing the clip
    * @param {number} [duration] -  Number of seconds for which to continue playing the clip
    * @returns {Promise<number>} Duration (in seconds) of the clip being played
    * @memberof Track
    * @instance
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
    * @see {@link MidiClip}
    */
   async function playClip(audioClip, startTime, duration) {
      let expectedDuration = null;
      if (audioClip instanceof ArrayBuffer || audioClip instanceof AudioBuffer || audioClip instanceof Blob || audioClip.clipType == 'audio') {
         const audioBuffer = (audioClip instanceof AudioBuffer) ? audioClip :
            (await audioContext.decodeAudioData(audioClip instanceof ArrayBuffer ? audioClip : (audioClip instanceof Blob ? await audioClip.arrayBuffer() : await audioClip.getRawData().arrayBuffer())));
         const clipSource = new AudioBufferSourceNode(audioContext, { buffer: audioBuffer });
         audioSources.push(clipSource);
         if (duration) {
            const clipVolume = new GainNode(audioContext);
            clipSource.connect(clipVolume).connect(audioSink);
            clipVolume.gain.setTargetAtTime(0.0, startTime + duration, 0.03);
            clipSource.onended = sourceEnded.bind(this, clipSource, clipVolume);
            clipSource.start(startTime, 0, duration + 0.200);
         }
         else {
            clipSource.connect(audioSink);
            clipSource.onended = sourceEnded.bind(this, clipSource, null);
            clipSource.start(startTime);
         }
         expectedDuration = (duration && (duration < audioBuffer.duration)) ? duration : audioBuffer.duration;
      }
      else {
         if (!instrument)
            throw new WebAudioTrackError(`The current track (${name}) cannot play a MIDI clip without first setting up an instrument`);
         const unmatchedNotes = {};
         for (const [noteTime, midiData] of Object.entries(audioClip.getRawData()))
            if (!duration || (Number(noteTime) < duration)) {
               const command = getMidiCommand(midiData), note = getMidiNote(midiData);
               if ((command === MidiCommand.NoteOn) && (getMidiVelocity(midiData) > 0))
                  unmatchedNotes[note] = [ Number(noteTime), getMidiVelocity(midiData) ];
               else if ((command === MidiCommand.NoteOff) && (note in unmatchedNotes)) {
                  const noteDuration = ((!duration || (Number(noteTime) <= duration)) ? Number(noteTime) : duration) - unmatchedNotes[note][0];
                  playNote(note, startTime + unmatchedNotes[note][0], -noteDuration, [{ type: ModificationType.Velocity, value: unmatchedNotes[note][1] }], false);
                  delete unmatchedNotes[note];
               }
            }
         for (const [note, noteData] of Object.entries(unmatchedNotes)) {
            const noteDuration = audioClip.getDuration() - noteData[0];
            playNote(note, startTime + noteData[0], -noteDuration, [{ type: ModificationType.Velocity, value: noteData[1] }], false);
         }
         expectedDuration = (duration && (duration < audioClip.getDuration())) ? duration : audioClip.getDuration();
      }
      return expectedDuration;
   }

   /**
    * Schedules a MIDI clip to be recorded on the current track for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the MIDI clip will
    * continue to record until manually stopped by the {@link MidiClip#finalize finalize()}
    * function on the returned {@link MidiClip} object.
    * 
    * Note that the recorded MIDI clip will **not** include any effects that might exist on
    * the track. This is so that recording and then immediately playing back on the same track
    * will not cause any underlying effects to be doubled.
    * 
    * @param {number} startTime - Global API time at which to start recording the MIDI clip
    * @param {number} [duration] - Number of seconds for which to continue recording the MIDI clip
    * @returns {MidiClip} Reference to a {@link MidiClip} object representing the MIDI data to be recorded
    * @memberof Track
    * @instance
    * @see {@link MidiClip}
    */
   function recordMidiClip(startTime, duration) {

      /**
       * Object containing all data needed to record and render a MIDI audio clip.
       * @namespace MidiClip
       * @global
       */

      // MIDI clip-local variable definitions
      let thisMidiDevice = midiDevice, recordedDuration = null, completionCallback = null;
      const midiLog = {};

      // Ensure that a MIDI device is currently connected to this track
      if (!thisMidiDevice)
         throw new WebAudioRecordingError(`The current track (${name}) has no MIDI device associated with it from which to record`);

      // Private MIDI handling functions
      function midiEventToRecord(event) {
         if ((audioContext.currentTime >= startTime) && (!duration || (audioContext.currentTime < startTime + duration)))
            midiLog[audioContext.currentTime - startTime] = event.data;
      }

      function playNoteOffline(offlineContext, note, velocity, startTime, duration) {
         const noteSource = instrument.getNoteOffline(offlineContext, note);
         const noteVolume = new GainNode(offlineContext, { gain: velocity });
         noteSource.connect(noteVolume).connect(offlineContext.destination);
         noteVolume.gain.setTargetAtTime(0.0, startTime + duration, 0.03);
         noteSource.start(startTime, 0, duration + 0.200);
      }

      /**
       * Returns a dictionary of all MIDI event data within the {@link MidiClip}, stored according
       * to the relative times (in seconds) that they were received.
       * 
       * @returns {Object} Dictionary containing MIDI event data stored according to their relative reception times
       * @memberof MidiClip
       * @instance
       */
      function getRawData() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve raw data from this MIDI clip because recording has not yet completed');
         return midiLog;
      }

      /**
       * Returns the total duration of the MIDI clip in seconds.
       * 
       * @returns {number} Duration of the MIDI clip in seconds
       * @memberof MidiClip
       * @instance
       */
      function getDuration() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve duration of this MIDI clip because recording has not yet completed');
         return recordedDuration;
      }

      /**
       * Stops recording any future MIDI data within the {@link MidiClip}, finalizes the internal
       * storage of all recorded data, and calls the user-completion notification callback, if
       * registered.
       * 
       * Note that this function is called automatically if the original call to
       * {@link Track#recordMidiClip recordMidiClip()} specified a concrete duration for the clip.
       * If no duration was specified, then this function **must** be called in order to stop
       * recording. A {@link MidiClip} is unable to be used or played back until this function
       * has been called.
       * 
       * @memberof MidiClip
       * @instance
       */
      async function finalize() {
         if (!recordedDuration) {
            if (duration) {
               while ((startTime + duration) > audioContext.currentTime)
                  await new Promise(r => setTimeout(r, 10));
               recordedDuration = duration;
            }
            else
               recordedDuration = audioContext.currentTime - startTime;
            thisMidiDevice.removeEventListener('midimessage', midiEventToRecord);
            thisMidiDevice = null;
            if (completionCallback)
               completionCallback(this);
            completionCallback = null;
         }
      }

      /**
       * Allows a user to register a callback for notification when all MIDI recording activities
       * have been completed for this {@link MidiClip}. This corresponds to the time when the
       * {@link MidiClip#finalize finalize()} function gets called, either manually or
       * automatically.
       * 
       * A user-defined notification callback will be called with a single parameter which is a
       * reference to this {@link MidiClip}.
       * 
       * @param {RecordCompleteCallback} notificationCallback - Callback to fire when recording of this clip has completed
       * @memberof MidiClip
       * @instance
       */
      function notifyWhenComplete(notificationCallback) {
         if (!recordedDuration)
            completionCallback = notificationCallback;
         else
            notificationCallback(this);
      }

      /**
       * Encodes this {@link MidiClip} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
       * specified in the `encodingType` parameter.
       * 
       * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
       * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
       * @memberof MidiClip
       * @instance
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * @see {@link module:Constants.EncodingType EncodingType}
       */
      async function getEncodedData(encodingType) {
         if (!Object.values(EncodingType).includes(Number(encodingType)))
            throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot render this MIDI clip because recording has not yet completed');
         if (!instrument)
            throw new WebAudioTrackError(`The current track (${name}) cannot render a MIDI clip without first setting up an instrument`);
         const unmatchedNotes = {}, offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
         for (const [startTime, midiData] of Object.entries(midiLog)) {
            const command = getMidiCommand(midiData), note = getMidiNote(midiData);
            if ((command === MidiCommand.NoteOn) && (getMidiVelocity(midiData) > 0))
               unmatchedNotes[note] = [ Number(startTime), getMidiVelocity(midiData) ];
            else if ((command === MidiCommand.NoteOff) && (note in unmatchedNotes)) {
               playNoteOffline(offlineContext, note, unmatchedNotes[note][1], unmatchedNotes[note][0], Number(startTime) - unmatchedNotes[note][0]);
               delete unmatchedNotes[note];
            }
         }
         for (const [note, noteData] of Object.entries(unmatchedNotes)) {
            const noteDuration = recordedDuration - noteData[0];
            playNoteOffline(offlineContext, note, noteData[1], noteData[0], noteDuration);
         }
         const renderedData = await offlineContext.startRendering();
         return await getEncoderFor(Number(encodingType)).encode(renderedData);
      }

      // Begin listening for all incoming MIDI events and optionally set a timer to stop listening
      thisMidiDevice.addEventListener('midimessage', midiEventToRecord);
      if (duration)
         setTimeout(finalize, startTime + duration - audioContext.currentTime);

      // Returns an object containing functions and attributes within the MidiClip namespace
      return { clipType: 'midi', getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
   }

   /**
    * Schedules an audio clip to be recorded on the current track for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio clip will
    * continue to record until manually stopped by the {@link AudioClip#finalize finalize()}
    * function on the returned {@link AudioClip} object.
    * 
    * Note that the recorded audio clip will **not** include any effects that might exist on
    * the track. This is so that recording and then immediately playing back on the same track
    * will not cause any underlying effects to be doubled.
    * 
    * @param {number} startTime - Global API time at which to start recording the audio clip
    * @param {number} [duration] - Number of seconds for which to continue recording the audio clip
    * @returns {AudioClip} Reference to an {@link AudioClip} object representing the audio data to be recorded
    * @memberof Track
    * @instance
    * @see {@link AudioClip}
    */
   function recordAudioClip(startTime, duration) {

      /**
       * Object containing all data needed to record and render an audio clip.
       * @namespace AudioClip
       * @global
       */

      // Audio clip-local variable definitions
      let recorderDestination = audioContext.createMediaStreamDestination();
      let recorder = new MediaRecorder(recorderDestination.stream);
      let thisAudioInputDevice = audioDeviceInput, audioData = null;
      let recordedDuration = null, completionCallback = null;

      // Ensure that an audio input device is currently connected to this track
      if (!thisAudioInputDevice)
         throw new WebAudioRecordingError(`The current track (${name}) has no audio input device associated with it from which to record`);

      // Private audio data handling functions
      function startRecording() {
         if (startTime >= (audioContext.currentTime + 0.001))
            setTimeout(startRecording, 1);
         else
            recorder.start(duration ? (1000 * duration) : undefined);
      }

      recorder.ondataavailable = (event) => {
         if (!audioData) {
            audioData = event.data;
            recordedDuration = duration || (audioContext.currentTime - startTime);
            finalize();
         }
      };

      recorder.onstop = async () => {
         thisAudioInputDevice.disconnect();
         thisAudioInputDevice = null;
         if (completionCallback)
            completionCallback(this);
         completionCallback = null;
         recorderDestination = null;
         recorder = null;
      };

      /**
       * Returns a {@link Blob} containing all of the recorded audio data.
       * 
       * @returns {Blob} Buffer containing all recorded audio data
       * @memberof AudioClip
       * @instance
       */
      function getRawData() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve raw data from this audio clip because recording has not yet completed');
         return audioData;
      }

      /**
       * Returns the total duration of the audio clip in seconds.
       * 
       * @returns {number} Duration of the audio clip in seconds
       * @memberof AudioClip
       * @instance
       */
      function getDuration() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve duration of this audio clip because recording has not yet completed');
         return recordedDuration;
      }

      /**
       * Stops recording any future audio data within the {@link AudioClip}, finalizes the internal
       * storage of all recorded data, and calls the user-completion notification callback, if
       * registered.
       * 
       * Note that this function is called automatically if the original call to
       * {@link Track#recordAudioClip recordAudioClip()} specified a concrete duration for the
       * clip. If no duration was specified, then this function **must** be called in order to stop
       * recording. An {@link AudioClip} is unable to be used or played back until this function
       * has been called.
       * 
       * @memberof AudioClip
       * @instance
       */
      async function finalize() {
         if (duration) {
            while ((startTime + duration) > audioContext.currentTime)
               await new Promise(r => setTimeout(r, 10));
         }
         if (recorder.state != 'inactive')
            recorder.stop();
      }

      /**
       * Allows a user to register a callback for notification when all audio recording activities
       * have been completed for this {@link AudioClip}. This corresponds to the time when the
       * {@link AudioClip#finalize finalize()} function gets called, either manually or
       * automatically.
       * 
       * A user-defined notification callback will be called with a single parameter which is a
       * reference to this {@link AudioClip}.
       * 
       * @param {RecordCompleteCallback} notificationCallback - Callback to fire when recording of this clip has completed
       * @memberof AudioClip
       * @instance
       */
      function notifyWhenComplete(notificationCallback) {
         if (!recordedDuration)
            completionCallback = notificationCallback;
         else
            notificationCallback(this);
      }

      /**
       * Encodes this {@link AudioClip} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
       * specified in the `encodingType` parameter.
       * 
       * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
       * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
       * @memberof AudioClip
       * @instance
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * @see {@link module:Constants.EncodingType EncodingType}
       */
      async function getEncodedData(encodingType) {
         if (!Object.values(EncodingType).includes(Number(encodingType)))
            throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
         if (!recordedDuration || !(audioData instanceof Blob))
            throw new WebAudioRecordingError('Cannot render this audio clip because recording has not yet completed');
         const offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
         const audioBuffer = await offlineContext.decodeAudioData(await audioData.arrayBuffer());
         const clipSource = new AudioBufferSourceNode(offlineContext, { buffer: audioBuffer });
         clipSource.connect(offlineContext.destination);
         clipSource.start();
         const renderedData = await offlineContext.startRendering();
         return await getEncoderFor(Number(encodingType)).encode(renderedData);
      }

      // Begin listening for incoming audio data
      thisAudioInputDevice.connect(recorderDestination);
      startRecording();

      // Returns an object containing functions and attributes within the AudioClip namespace
      return { clipType: 'audio', getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
   }

   /**
    * Schedules an audio recording to be executed on the cumulative output of the current track
    * for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio recording will
    * continue until manually stopped by the {@link AudioRecording#finalize finalize()} function
    * on the returned {@link AudioRecording} object.
    * 
    * Note that the recorded audio **will** include **all** effects that exist on the track.
    * 
    * @param {number} startTime - Global API time at which to start recording the audio output
    * @param {number} [duration] - Number of seconds for which to continue recording the audio output
    * @returns {AudioRecording} Reference to an {@link AudioRecording} object representing the audio recording
    * @memberof Track
    * @instance
    * @see {@link AudioRecording}
    */
   function recordOutput(startTime, duration) {

      /**
       * Object containing all data needed to render a full audio recording.
       * @namespace AudioRecording
       * @global
       */

      // Audio recording-local variable definitions
      let recorderDestination = audioContext.createMediaStreamDestination();
      let recorder = new MediaRecorder(recorderDestination.stream), isRecording = true;
      let audioData = null, recordedDuration = null, completionCallback = null;

      // Private audio data handling functions
      function startRecording() {
         if (startTime >= (audioContext.currentTime + 0.001))
            setTimeout(startRecording, 1);
         else {
            startTime = audioContext.currentTime;
            recorder.start(duration ? (1000 * duration) : undefined);
         }
      }

      recorder.ondataavailable = (event) => {
         if (!audioData) {
            audioData = event.data;
            recordedDuration = duration || (audioContext.currentTime - startTime);
            finalize();
         }
         isRecording = false;
      };

      recorder.onstop = async () => {
         trackAudioSink.disconnect(recorderDestination);
         if (completionCallback)
            completionCallback(this);
         completionCallback = null;
         recorderDestination = null;
         recorder = null;
      };

      /**
       * Returns a {@link Blob} containing all of the recorded audio data.
       * 
       * @returns {Blob} Buffer containing all recorded audio data
       * @memberof AudioRecording
       * @instance
       */
      function getRawData() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve raw data from this audio recording because recording has not yet completed');
         return audioData;
      }

      /**
       * Returns the total duration of the audio recording in seconds.
       * 
       * @returns {number} Duration of the audio recording in seconds
       * @memberof AudioRecording
       * @instance
       */
      function getDuration() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve duration of this audio recording because recording has not yet completed');
         return recordedDuration;
      }

      /**
       * Stops recording any future audio data within the {@link AudioRecording}, finalizes the
       * internal storage of all recorded data, and calls the user-completion notification
       * callback, if registered.
       * 
       * Note that this function is called automatically if the original call to
       * {@link Track#recordOutput recordOutput()} specified a concrete duration for the
       * recording. If no duration was specified, then this function **must** be called in order
       * to stop recording. An {@link AudioRecording} is unable to be used or played back until
       * this function has been called.
       * 
       * @memberof AudioRecording
       * @instance
       */
      async function finalize() {
         if (duration) {
            while ((startTime + duration) > audioContext.currentTime)
               await new Promise(r => setTimeout(r, 10));
         }
         if (recorder.state != 'inactive') {
            recorder.stop();
            while (isRecording)
               await new Promise(r => setTimeout(r, 1));
         }
      }

      /**
       * Allows a user to register a callback for notification when all audio recording activities
       * have been completed for this {@link AudioRecording}. This corresponds to the time when the
       * {@link AudioRecording#finalize finalize()} function gets called, either manually or
       * automatically.
       * 
       * A user-defined notification callback will be called with a single parameter which is a
       * reference to this {@link AudioRecording}.
       * 
       * @param {RecordCompleteCallback} notificationCallback - Callback to fire when this recording has completed
       * @memberof AudioRecording
       * @instance
       */
      function notifyWhenComplete(notificationCallback) {
         if (!recordedDuration)
            completionCallback = notificationCallback;
         else
            notificationCallback(this);
      }

      /**
       * Encodes this {@link AudioRecording} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
       * specified in the `encodingType` parameter.
       * 
       * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
       * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
       * @memberof AudioRecording
       * @instance
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * @see {@link module:Constants.EncodingType EncodingType}
       */
      async function getEncodedData(encodingType) {
         if (!Object.values(EncodingType).includes(Number(encodingType)))
            throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
         if (!recordedDuration || !(audioData instanceof Blob))
            throw new WebAudioRecordingError('Cannot render this audio recording because recording has not yet completed');
         const offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
         const audioBuffer = await offlineContext.decodeAudioData(await audioData.arrayBuffer());
         const clipSource = new AudioBufferSourceNode(offlineContext, { buffer: audioBuffer });
         clipSource.connect(offlineContext.destination);
         clipSource.start();
         const renderedData = await offlineContext.startRendering();
         return await getEncoderFor(Number(encodingType)).encode(renderedData);
      }

      // Begin listening for incoming audio data
      trackAudioSink.connect(recorderDestination);
      startRecording();

      // Returns an object containing functions and attributes within the AudioClip namespace
      return { getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
   }

   /**
    * Schedules an audio file to be played on the current track for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio file will
    * play to completion.
    * 
    * @param {string} fileURL - URL location pointing to an audio file
    * @param {number} startTime - Global API time at which to start playing the file
    * @param {number} [duration] - Number of seconds for which to continue playing the file
    * @returns {Promise<number>} Duration (in seconds) of the file being played
    * @memberof Track
    * @instance
    */
   async function playFile(fileURL, startTime, duration) {
      const response = await fetch(fileURL);
      const arrayBuffer = await response.arrayBuffer();
      return await playClip(arrayBuffer, startTime, duration);
   }

   /**
    * Disconnects the current track from the specified MIDI device so that no further MIDI events
    * will be received.
    * 
    * @memberof Track
    * @instance
    */
   function disconnectFromMidiDevice() {
      if (midiDevice != null)
         midiDevice.removeEventListener('midimessage', midiEventReceived);
      midiDevice = null;
   }

   /**
    * Disconnects the current track from the specified audio input device so that no further audio
    * events will be received.
    * 
    * @memberof Track
    * @instance
    */
   function disconnectFromAudioInputDevice() {
      if (audioDeviceInput != null)
         audioDeviceInput.disconnect();
      audioDeviceInput = null;
   }

   /**
    * Connects the current track to the specified MIDI device so that any incoming events will be
    * automatically played in real-time.
    * 
    * @param {MIDIInput} midiInput - MIDI device to which to connect the current track
    * @memberof Track
    * @instance
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIInput MIDIInput}
    */
   function connectToMidiDevice(midiInput) {
      disconnectFromMidiDevice();
      midiInput.addEventListener('midimessage', midiEventReceived);
      midiDevice = midiInput;
   }

   /**
    * Connects the current track to the specified audio input device so that any incoming audio
    * will be automatically played in real-time.
    * 
    * @param {string} audioDeviceID - ID of the audio input device to which to connect the current track
    * @memberof Track
    * @instance
    */
   async function connectToAudioInputDevice(audioDeviceID) {
      disconnectFromAudioInputDevice();
      try {
         const audioStream = await navigator.mediaDevices.getUserMedia({ audio: {'deviceId': audioDeviceID}, video: false });
         audioDeviceInput = audioContext.createMediaStreamSource(audioStream);
         audioDeviceInput.connect(audioSink);
      }
      catch (err) {
         throw WebAudioDeviceError('Unable to connect to the requested audio input device. Error was: ' + err);
      }
   }

   /**
    * Cancels any current or scheduled audio from playing on the current track.
    * 
    * @memberof Track
    * @instance
    */
   function clearTrack() {
      for (const source of audioSources)
         source.stop();
      for (const source of asyncAudioSources)
         source.sourceNode.stop();
   }

   /**
    * Deletes the current track and cancels any scheduled audio from playing or from starting
    * to play in the future.
    * 
    * @memberof Track
    * @instance
    */
   function deleteTrack() {
      disconnectFromMidiDevice();
      clearTrack();
      for (const effect of effects)
         effect.output.disconnect();
   }

   // Returns an object containing functions and attributes within the public Track namespace
   return {
      /**
       * Name of the {@link Track}.
       * @memberof Track
       * @instance
       */
      name,
      updateInstrument, removeInstrument, applyEffect, updateEffect, getCurrentEffectParameters, removeEffect, stopNoteAsync,
      playNoteAsync, playNote, playChord, playSequence, playClip, playFile, recordMidiClip, recordAudioClip, recordOutput,
      connectToMidiDevice, disconnectFromMidiDevice, connectToAudioInputDevice, disconnectFromAudioInputDevice, deleteTrack,
      clearTrack, getAnalysisBuffer
   };
}

/**
 * Module containing all instrument-specific {@link WebAudioAPI} functionality.
 * @module Instrument
 */


/**
 * Loads an existing {@link Instrument} object capable of mapping audio data to musical output.
 * 
 * If the `url` parameter is set to `null`, a sine-wave oscillator will be used to generate
 * all audio output.
 * 
 * @param {AudioContext} audioContext - Reference to the global browser {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @param {string} name - Name of the instrument to load
 * @param {string|null} url - URL pointing to the instrument data to load or `null`
 * @returns {Promise<Instrument>} Newly loaded {@link Instrument}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext AudioContext}
 * @see {@link Instrument}
 * @async
 */
async function loadInstrument(audioContext, name, url) {

   // Private internal Instrument functions
   function loadNumberFromArray(array, numBytes, offset) {
      let number = 0;
      for (let i = numBytes - 1; i >= 0; --i)
         number = (number * 256) + array[offset + i];
      return number;
   }
   
   function parseMetadata(data) {
      const metadata = {};
      if (data[0] != 87 || data[1] != 65 || data[2] != 73 || data[3] != 78)
         return null;
      metadata.version = [ data[4], data[5], data[6] ];
      if (metadata.version[0] != 0 || metadata.version[1] != 1 || data.byteLength < 61)
         return null;
      metadata.metadataLength = loadNumberFromArray(data, 2, 7);
      if (metadata.metadataLength != 61)
         return null;
      metadata.dataLength = loadNumberFromArray(data, 4, 9);
      let nameLength = 0;
      while ((nameLength < 33) && data[13 + nameLength]) ++nameLength;
      metadata.name = new TextDecoder().decode(new Uint8Array(data.buffer, 13, nameLength));
      metadata.numNotes = data[46]; metadata.minValidNote = data[47]; metadata.maxValidNote = data[48];
      metadata.sustainedNotesDecay = Boolean(data[49]); metadata.slideNotesPossible = Boolean(data[50]);
      metadata.sampleRate = loadNumberFromArray(data, 4, 51);
      metadata.bitRate = loadNumberFromArray(data, 4, 55);
      metadata.format = loadNumberFromArray(data, 2, 59);
      return (metadata.format == InstrumentEncodingType.PCM || metadata.format == InstrumentEncodingType.WEBM_OPUS) ? metadata : null;
   }

   async function decompilePCM(data, metadata) {
      const zippedBlob = new Blob([data]);
      const decompressor = new DecompressionStream('gzip');
      const decompressedStream = zippedBlob.stream().pipeThrough(decompressor);
      const decompressedData = new Float32Array(await new Response(decompressedStream).arrayBuffer());
      const audioBuffer = audioContext.createBuffer(1, decompressedData.length, metadata.sampleRate);
      audioBuffer.copyToChannel(decompressedData, 0);
      return audioBuffer;
   }

   async function decompile(data, metadata) {
      return (metadata.format == InstrumentEncodingType.PCM) ? await decompilePCM(data, metadata) :
         await audioContext.decodeAudioData(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
   }

   function findClosestValidNote(noteData, noteIndex) {
      let nearestLowerNote = -10000, nearestHigherNote = 10000;
      for (let i = noteIndex - 1; i >= 0; --i)
         if (noteData[i] !== undefined) {
            nearestLowerNote = i;
            break;
         }
      for (let i = noteIndex + 1; i < noteData.length; ++i)
         if (noteData[i] !== undefined) {
            nearestHigherNote = i;
            break;
         }
      return ((noteIndex - nearestLowerNote) > (nearestHigherNote - noteIndex)) ? nearestHigherNote : nearestLowerNote;
   }
   
   function fillInMissingNotes(noteData, missingData) {
      for (let note = 1; note < noteData.length; ++note)
         if (noteData[note] === undefined) {
            const closestValidNote = findClosestValidNote(noteData, note);
            missingData[note] = {
               'buffer': noteData[closestValidNote].buffer,
               'detune': 100 * (note - closestValidNote),
               'loop': noteData[closestValidNote].loop,
               'loopStart': noteData[closestValidNote].loopStart,
               'loopEnd': noteData[closestValidNote].loopEnd
            };
         }
      missingData[0] = { 'buffer': null, 'detune': 0 };
   }
   
   async function loadNotesAndInterpolate(instrumentData, noteData, missingData, metadata) {
      let noteIndex = 0;
      noteData.length = missingData.length = 1 + Note['B9'];
      for (let i = 0; i < metadata.numNotes; ++i) {
         const note = loadNumberFromArray(instrumentData, 2, noteIndex);
         noteIndex += 2;
         const noteOffset = loadNumberFromArray(instrumentData, 4, noteIndex);
         noteIndex += 4;
         const noteDataLength = loadNumberFromArray(instrumentData, 4, noteIndex);
         noteIndex += 4;
         const audioBuffer = await decompile(new Uint8Array(instrumentData.buffer, noteOffset, noteDataLength), metadata);
         noteData[note] = {
            'buffer': audioBuffer,
            'detune': 0,
            'loop': !metadata.sustainedNotesDecay,
            'loopStart': audioBuffer.duration - 1.0,
            'loopEnd': audioBuffer.duration
         };
      }
      fillInMissingNotes(noteData, missingData);
   }
   
   async function loadInstrument(url) {
      const noteData = [], foundData = [], missingData = [];
      const response = await fetch(url);
      const resource = await response.arrayBuffer();
      const instrumentData = new Uint8Array(resource);
      const metadata = parseMetadata(instrumentData);
      if (!metadata)
         throw new WebAudioInstrumentError(`The specified instrument file at ${url} is corrupt or of an unexpected type`);
      await loadNotesAndInterpolate(new Uint8Array(instrumentData.buffer, metadata.metadataLength), foundData, missingData, metadata);
      for (let i = 0; i < foundData.length; ++i)
         noteData[i] = (foundData[i] === undefined) ? missingData[i] : foundData[i];
      return [noteData, metadata];
   }

   // Create an instance of the Instrument object
   const instrumentInstance = {
      /**
       * Name of the {@link Instrument}.
       * @memberof Instrument
       * @instance
       */
      name,

      /**
       * Returns an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
       * that can be used to play back the specified MIDI `note`.
       * 
       * @function
       * @param {number} note - MIDI note number for which to generate a playable note
       * @memberof Instrument
       * @instance
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
       */
      getNote: null,

      /**
       * Returns an {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
       * that can be used to play back the specified MIDI `note` from an {@link OfflineAudioContext}.
       * 
       * @function
       * @param {OfflineAudioContext} - Offline audio context whicih will be used to play back the note
       * @param {number} note - MIDI note number for which to generate a playable note
       * @memberof Instrument
       * @instance
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode AudioScheduledSourceNode}
       */
      getNoteOffline: null
   };

   // Actually load and return the instrument
   console.log('Loading instrument:', name + '...');
   if (url == null) {
      instrumentInstance.getNote = function (note) {
         return new OscillatorNode(audioContext, { frequency: Frequency[note] });
      };
      instrumentInstance.getNoteOffline = function (offlineContext, note) {
         return new OscillatorNode(offlineContext, { frequency: Frequency[note] });
      };
   }
   else {
      const [noteData, metadata] = await loadInstrument(url);
      instrumentInstance.getNote = function (note) {
         if (note && (note < metadata.minValidNote) || (note > metadata.maxValidNote))
            throw new WebAudioInstrumentError(`The specified note (${note}) is unplayable on this instrument. Valid notes are [${metadata.minValidNote}, ${metadata.maxValidNote}]`);
         return new AudioBufferSourceNode(audioContext, noteData[note]);
      };
      instrumentInstance.getNoteOffline = function (offlineContext, note) {
         if (note && (note < metadata.minValidNote) || (note > metadata.maxValidNote))
            throw new WebAudioInstrumentError(`The specified note (${note}) is unplayable on this instrument. Valid notes are [${metadata.minValidNote}, ${metadata.maxValidNote}]`);
         return new AudioBufferSourceNode(offlineContext, noteData[note]);
      };
   }
   return instrumentInstance;
}

/** Class representing all base-level {@link WebAudioAPI} audio analysis functions */
class AnalysisBase {

   /**
    * Called by a concrete analysis instance to initialize the inherited {@link AnalysisBase} data
    * structure.
    */
   constructor() { /* Empty constructor */ }

   /**
    * Performs a spectral analysis corresponding to an underlying concrete class on the passed-in
    * buffer containing audio frequency content.
    * 
    * @param {Uint8Array} frequencyContent - {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array} containing audio frequency data
    * @returns {Object} Object containing the results of the specified acoustic analysis
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array}
    */
   static analyze(frequencyContent) { return undefined; }
}

/**
 * Class representing an acoustic "power spectrum" analysis algorithm.
 * 
 * A Power Spectrum is an array in which each bin contains the power attributed to a discrete
 * range of frequencies within an audio signal.
 * 
 * @extends AnalysisBase
 */
class PowerSpectrum extends AnalysisBase {

   /**
    * Constructs a new {@link PowerSpectrum} analysis object.
    */
   constructor() {
      super();
   }

   /**
    * Performs a power spectrum analysis on the passed-in buffer containing audio
    * frequency content. The bins of the resulting power spectrum will contain values between
    * [0, 255], where 0 represents silence and 255 represents the maximum representable power.
    * 
    * @param {Uint8Array} frequencyContent - {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array} containing audio frequency data
    * @returns {Uint8Array} Array containing the power spectrum corresponding to the specified frequency data as values between [0, 255]
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array}
    */
   static analyze(frequencyContent) {
      return frequencyContent;
   }
}

/**
 * Class representing an acoustic "total power" analysis algorithm.
 * 
 * Total power analysis determines the total cumulative spectral power present across all
 * frequencies within an audio signal.
 * 
 * @extends AnalysisBase
 */
class TotalPower extends AnalysisBase {

   /**
    * Constructs a new {@link TotalPower} analysis object.
    */
   constructor() {
      super();
   }

   /**
    * Performs a total power spectral analysis on the passed-in buffer containing audio
    * frequency content. The resulting value will be between [0, 1], where 0 represents
    * silence and 1 represents the maximum representable power.
    * 
    * @param {Uint8Array} frequencyContent - {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array} containing audio frequency data
    * @returns {number} Total power content across all frequencies in the specified frequency data as a value between [0, 1]
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Uint8Array Uint8Array}
    */
   static analyze(frequencyContent) {
      const frequencyTotal = frequencyContent.reduce(function(a, b) { return a + b; });
      return frequencyTotal / (frequencyContent.length * 255);
   }
}

/**
 * Module containing functionality to create and utilize {@link WebAudioAPI} audio analyzers.
 * @module Analysis
 */


const AnalysisClasses = {
   [AnalysisType.PowerSpectrum]: PowerSpectrum,
   [AnalysisType.TotalPower]: TotalPower
};

/**
 * Returns a concrete analyzer implementation for the specified analysis type. The value passed
 * to the `analysisType` parameter must be the **numeric value** associated with a certain
 * {@link module:Constants.AnalysisType AnalysisType}, not a string-based key.
 * 
 * @param {number} analysisType - Numeric value corresponding to the desired {@link module:Constants.AnalysisType AnalysisType}
 * @returns {AnalysisBase} Concrete analyzer implementation for the specified {@link module:Constants.AnalysisType AnalysisType}
 * @see {@link module:Constants.AnalysisType AnalysisType}
 * @see {@link AnalysisBase}
 */
function getAnalyzerFor(analysisType) {
   return AnalysisClasses[analysisType];
}

var version = "0.5.0";

/**
 * Required function prototype to use when registering a MIDI device callback.
 * 
 * @callback MidiEventCallback
 * @param {MIDIMessageEvent} event - Object containing the detected MIDI event
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIMessageEvent MIDIMessageEvent}
 */

/**
 * Required function prototype to use when registering a recording completion callback.
 * 
 * @callback RecordCompleteCallback
 * @param {MidiClip|AudioClip} clip - Instance of the fully recorded clip
 * @see {@link AudioClip}
 * @see {@link MidiClip}
 */

/**
 * Composite object type for holding all tempo-related information.
 * 
 * @typedef {Object} Tempo
 * @property {number} beatBase - Note {@link module:Constants.Duration Duration} corresponding to a global beat
 * @property {number} beatsPerMinute - Number of global beats per minute
 * @property {number} timeSignatureNumerator - Number of beats per measure
 * @property {number} timeSignatureDenominator - Note {@link module:Constants.Duration Duration} corresponding to a measure beat
 * @property {number} measureLengthSeconds - Length (in seconds) of a measure
 */

/**
 * Composite object type for holding all key-related information.
 * 
 * @typedef {Object} Key
 * @property {number} signature - Numerical {@link module:Constants.KeySignature KeySignature} indicator based on its circle of fifths position
 * @property {Array<number>} offsets - Array containing all pitch offsets in the current key signature where the offset for C is at index 0
 */

/**
 * Composite object type for holding a set of concrete {@link Effect} parameter details.
 * 
 * @typedef {Object} EffectParameter
 * @property {string} name - Name of the effect parameter
 * @property {string} type - Type of effect parameter value (either "string" or "number")
 * @property {Array<string|number>} validValues - For "string" types, a listing of all valid values; for "number" types, the min/max values
 * @property {string|number} defaultValue - Default effect value before any updates
 */

/**
 * Composite object type for holding a set of note modification details.
 * 
 * @typedef {Object} ModificationDetails
 * @property {number} type - Underlying {@link module:Constants.ModificationType ModificationType}
 * @property {Object} [value] - Modification-specific values (i.e., slur length, glissando ending note)
 * @see {@link module:Constants.ModificationType ModificationType}
 */

// Private helper functions
function checkModifications(mods, forSingleNote) {
   for (const modification of mods) {
      if (!(modification instanceof(Object)) || !('type' in modification))
         throw new WebAudioValueError('The "modifications" parameter must either be unspecified or as returned from the "getModification()" function');
      else if (!forSingleNote && !canModifySequence(modification.type))
         throw new WebAudioValueError(`The "${modification.type}" modification type cannot be used to modify a sequence of notes`);
      const requiredParams = forSingleNote ? getModificationParameters(modification.type).required.singleNote : getModificationParameters(modification.type).required.sequence;
      if (requiredParams.length) {
         if (!('value' in modification))
            throw new WebAudioValueError(`The "modifications" parameter ({type: ${modification.type}}) is missing a required value.`);
         else if (!(modification.value instanceof(Object)))
            throw new WebAudioValueError('The "modifications" parameter must be created with the "getModification()" function using a "modificationOptions" parameter of type Object containing required parameter keys and values');
         else {
            for (const requiredParam of requiredParams)
               if (!(requiredParam in modification.value) && ((requiredParams.length > 1) || !('implicit' in modification.value)))
                  throw new WebAudioValueError(`The "modifications" parameter ({type: ${modification.type}}) is missing the following required value: ${requiredParam}`);
         }
      }
   }
}

function getNoteInKey(note, key) {
   if (!note)
      return 0;
   else if (note < 0)
      return -note;
   else
      return (note + key.offsets[note % 12]);
}

/** Contains all WebAudioAPI top-level functionality. */
class WebAudioAPI {

   // Singleton instance of the WebAudioAPI class
   static #instance = null;

   // WebAudioAPI private variable definitions
   #started = false;
   #audioContext = new AudioContext({ latencyHint: 'interactive', sampleRate: 44100 });
   /** @type {Object<string, Object>} */
   #midiCallbacks = {};
   /** @type {Object<string, Track>} */
   #tracks = {};
   /** @type {Effect[]} */
   #effects = [];
   /** @type {Object<string, string>} */
   #instrumentListing = {};
   /** @type {Object<string, Instrument>} */
   #loadedInstruments = {};
   /** @type {Tempo} */
   #tempo = { measureLengthSeconds: (4 * 60.0 / 100.0), beatBase: 4, beatsPerMinute: 100, timeSignatureNumerator: 4, timeSignatureDenominator: 4 };
   /** @type {Key} */
   #key = { signature: 0, offsets: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
   /** @type {MIDIAccess|null} */
   #midiDeviceAccess = null;
   /** @type {Object<string, string>} */
   #audioInputDevices = {};
   /** @type {Object<string, string>} */
   #audioOutputDevices = {};
   /** @type {DynamicsCompressorNode} */
   #compressorNode;
   /** @type {AnalyserNode} */
   #analysisNode;
   /** @type {GainNode} */
   #sourceSinkNode;
   /** @type {Uint8Array} */
   #analysisBuffer;

   /**
    * Returns a singleton instance of the WebAudioAPI interface.
    */
   constructor() {
      // Create or return the singleton instance if it already exists
      if (WebAudioAPI.#instance)
         return WebAudioAPI.#instance;
      WebAudioAPI.#instance = this;
      
      // Generate and connect all required audio nodes
      this.#sourceSinkNode = new GainNode(this.#audioContext);
      this.#compressorNode = new DynamicsCompressorNode(this.#audioContext);
      this.#analysisNode = new AnalyserNode(this.#audioContext, { fftSize: 1024, maxDecibels: -10.0, smoothingTimeConstant: 0.5 });
      this.#analysisBuffer = new Uint8Array(this.#analysisNode.frequencyBinCount);
      this.#sourceSinkNode.connect(this.#compressorNode).connect(this.#analysisNode).connect(this.#audioContext.destination);
   }

   /**
    * Returns the current {@link WebAudioAPI} library version number.
    * 
    * @returns {string} Current library version number
    */
   getVersion() {
      return version;
   }
   
   /**
    * Returns the current global time since the {@link WebAudioAPI} library was started or
    * resumed using the {@link WebAudioAPI#start start()} function.
    * 
    * @returns {number} Current global time since the {@link WebAudioAPI} library was started
    */
   getCurrentTime() {
      return this.#audioContext.currentTime;
   }

   /**
    * Returns a full listing of recognized key signatures by the {@link WebAudioAPI} library.
    * 
    * This function can be used to enumerate available key signatures for displaying on a web page.
    * Note, however, that the `keySignature` parameter passed to the
    * {@link WebAudioAPI#updateKeySignature updateKeySignature()} function must be the location of
    * the desired key on the circle of fifths associated with a certain
    * {@link module:Constants.KeySignature KeySignature}, not a string-based key signature.
    * 
    * @returns {Object<string, number>} Listing of recognized key signatures by the {@link WebAudioAPI} library
    * @see {@link module:Constants.KeySignature KeySignature}
    */
   getAvailableKeySignatures() {
      return KeySignature;
   }

   /**
    * Returns a full listing of recognized musical notes by the {@link WebAudioAPI} library.
    * 
    * This function can be used to enumerate available note options for displaying on a web page.
    * Note, however, that the `note` parameter passed to the {@link WebAudioAPI#playNote playNote()}
    * function must be the **numeric MIDI value** associated with a certain
    * {@link module:Constants.Note Note}, not a string-based key.
    * 
    * @returns {Object<string, number>} Listing of recognized musical notes by the {@link WebAudioAPI} library
    * @see {@link module:Constants.Note Note}
    */
   getAvailableNotes() {
      return Note;
   }

   /**
    * Returns a full listing of recognized note durations by the {@link WebAudioAPI} library.
    * 
    * This function can be used to enumerate available duration options for displaying on a
    * web page. Note, however, that the `duration` parameter passed to the
    * {@link WebAudioAPI#playNote playNote()} function must be the **numeric value** associated
    * with a certain {@link module:Constants.Duration Duration}, not a string-based key.
    * 
    * @returns {Object<string, number>} Listing of recognized note durations by the {@link WebAudioAPI} library
    * @see {@link module:Constants.Duration Duration}
    */
   getAvailableNoteDurations() {
      return Duration;
   }

   /**
    * Returns a listing of all available note modifications in the {@link WebAudioAPI} library.
    * 
    * This function can be used to enumerate available note modification options for displaying
    * on a web page. Note, however, that the modification `type` parameter passed to the
    * {@link WebAudioAPI#getModification getModification()} function must include the **numeric
    * value** associated with a certain {@link module:Constants.ModificationType ModificationType},
    * not a string-based key.
    * 
    * @returns {Object<string, number>} Listing of all available note modifications in the {@link WebAudioAPI} library
    * @see {@link module:Constants.ModificationType ModificationType}
    */
   getAvailableNoteModifications() {
      return ModificationType;
   }

   /**
    * Returns a listing of all available effects in the {@link WebAudioAPI} library.
    * 
    * This function can be used to enumerate available effect options for displaying on a
    * web page. Note, however, that the `effectType` parameter passed to either the
    * {@link WebAudioAPI#applyMasterEffect applyMasterEffect()} or the
    * {@link WebAudioAPI#applyTrackEffect applyTrackEffect()} function must be the
    * **numeric value** associated with a certain {@link module:Constants.EffectType EffectType},
    * not a string-based key.
    * 
    * @returns {Object<string, number>} Listing of all available effect types in the {@link WebAudioAPI} library
    * @see {@link module:Constants.EffectType EffectType}
    */
   getAvailableEffects() {
      return EffectType;
   }

   /**
    * Returns a list of effect-specific {@link EffectParameter EffectParameters} for manipulation
    * in the `effectOptions` parameter of the {@link WebAudioAPI#updateMasterEffect updateMasterEffect()}
    * or the {@link WebAudioAPI#updateTrackEffect updateTrackEffect()} function.
    * 
    * This function can be used to enumerate available effect parameters for displaying on a
    * web page. Note, however, that the `effectType` parameter must be the **numeric value**
    * associated with a certain {@link module:Constants.EffectType EffectType}, not a
    * string-based key.
    * 
    * @param {number} effectType - The {@link module:Constants.EffectType EffectType} for which to return a parameter list
    * @returns {EffectParameter[]} List of effect-specific parameters available for updating
    * @see {@link module:Constants.EffectType EffectType}
    * @see {@link EffectParameter}
    */
   getAvailableEffectParameters(effectType) {
      if (!Object.values(EffectType).includes(Number(effectType)))
         throw new WebAudioTargetError(`The target effect type identifier (${effectType}) does not exist`);
      return getEffectParameters(effectType);
   }

   /**
    * Returns a list of modification-specific parameters for use in the `modificationOptions`
    * parameter of the {@link WebAudioAPI#getModification getModification()} function or
    * an empty list if the specified modification does not require any parameters.
    * 
    * This function can be used to enumerate available modification parameters for displaying
    * on a web page. Note, however, that the `modificationType` parameter must be the **numeric
    * value** associated with a certain {@link module:Constants.ModificationType ModificationType},
    * not a string-based key.
    * 
    * The object returned from this function will contain 2 keys: 'required' and 'optional'.
    * These keys can be used to access sub-objects with 2 keys: 'singleNote' and 'sequence'.
    * These keys hold arrays containing the string-based names of parameters that are available
    * for manipulation within the given modification.
    * 
    * Parameter values within the "sequence" array indicate parameters that have meaning when
    * used with the {@link WebAudioAPI#playSequence playSequence()} function. Parameter values
    * within the "singleNote" array indicate parameters that have meaning when used with the 
    * {@link WebAudioAPI#playNote playNote()} function.
    * 
    * @param {number} modificationType - The {@link module:Constants.ModificationType ModificationType} for which to return a parameter list
    * @returns {Object<string,Object<string,string[]>>} List of modification-specific parameter keys and when they are required
    * @see {@link module:Constants.ModificationType ModificationType}
    */
   getAvailableModificationParameters(modificationType) {
      if (!Object.values(ModificationType).includes(Number(modificationType)))
         throw new WebAudioTargetError(`The target modification type identifier (${modificationType}) does not exist`);
      return getModificationParameters(modificationType);
   }

   /**
    * Returns a listing of all available encoders in the {@link WebAudioAPI} library.
    * 
    * This function can be used to enumerate available encoding options for displaying on a
    * web page.
    * 
    * @returns {Object<string, number>} Listing of all available encoding types in the {@link WebAudioAPI} library
    * @see {@link module:Constants.EncodingType EncodingType}
    */
   getAvailableEncoders() {
      return EncodingType;
   }

   /**
    * Returns a listing of all available audio analysis types in the {@link WebAudioAPI} library.
    * 
    * This function can be used to enumerate available analysis options for displaying on a
    * web page.
    * 
    * @returns {Object<string, number>} Listing of all available audio analysis types in the {@link WebAudioAPI} library
    * @see {@link module:Constants.AnalysisType AnalysisType}
    */
   getAvailableAnalysisTypes() {
      return AnalysisType;
   }

   /**
    * Returns a listing of the available instruments located in the specified asset library.
    * 
    * Individual results from this function call can be passed directly to the
    * {@link WebAudioAPI#updateInstrument updateInstrument()} function to load a specific
    * instrument into an audio track.
    * 
    * @param {string} instrumentLibraryLocation - Absolute or relative URL pointing to a {@link WebAudioAPI} instrument library
    * @returns {Promise<string[]>} Listing of all available instrument names
    */
   async getAvailableInstruments(instrumentLibraryLocation) {
      if (Object.keys(this.#instrumentListing).length === 0) {
         this.#instrumentListing['Synthesizer'] = null;
         const cleanLocation = instrumentLibraryLocation.replace(/\/$/, '');
         const response = await fetch(cleanLocation + '/instrumentLibrary.json', {
            headers: { 'Accept': 'application/json' }
         });
         const instrumentData = await response.json();
         Object.keys(instrumentData).forEach(instrumentName => {
            this.#instrumentListing[instrumentName] = cleanLocation + instrumentData[instrumentName];
         });
      }
      return Object.keys(this.#instrumentListing);
   }

   /**
    * Returns a listing of the available MIDI devices connected to the client device.
    * 
    * Individual results from this function call can be passed directly to the
    * {@link connectMidiDeviceToTrack()} function to attach a MIDI device to a specified audio track.
    * 
    * @returns {Promise<string[]>} Listing of all available MIDI devices connected to the client device
    */
   async getAvailableMidiDevices() {
      const midiDevices = [];
      if (navigator.requestMIDIAccess && this.#midiDeviceAccess === null) {
         try {
            this.#midiDeviceAccess = await navigator.requestMIDIAccess();
            for (const midiDevice of this.#midiDeviceAccess.inputs.values())
               midiDevices.push(midiDevice.name);
         } catch (err) {
            this.#midiDeviceAccess = null;
            throw new WebAudioMidiError('MIDI permissions are required in order to enumerate available MIDI devices!');
         }
      }
      return midiDevices;
   }

   /**
    * Returns a listing of the available audio input devices connected to the client device.
    * 
    * Individual results from this function call can be passed directly to the
    * {@link connectAudioInputDeviceToTrack()} function to attach an input device to a specified
    * audio track.
    * 
    * @returns {Promise<string[]>} Listing of all available audio input devices connected to the client
    */
   async getAvailableAudioInputDevices() {
      const inputDevices = [];
      for (const key in this.#audioInputDevices)
         delete this.#audioInputDevices[key];
      if (navigator.mediaDevices?.enumerateDevices) {
         try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            for (const device of await navigator.mediaDevices.enumerateDevices())
               if (device.kind == 'audioinput') {
                  let alreadyFound = false;
                  for (const [i, existingDevice] of inputDevices.entries()) {
                     if (existingDevice.groupId == device.groupId) {
                        if (device.deviceId.length > existingDevice.id.length) {
                           inputDevices[i].id = device.deviceId;
                           inputDevices[i].label = device.label;
                        }
                        alreadyFound = true;
                        break;
                     }
                  }
                  if (!alreadyFound)
                     inputDevices.push({ id: device.deviceId, groupId: device.groupId, label: device.label });
               }
         } catch (err) {
            throw new WebAudioDeviceError('Microphone and audio input permissions are required in order to enumerate available devices!');
         }
      }
      inputDevices.forEach(device => this.#audioInputDevices[device.label] = device.id);
      return Object.keys(this.#audioInputDevices);
   }

   /**
    * Returns a listing of the available audio output devices connected to the client device.
    * 
    * Individual results from this function call can be passed directly to the
    * {@link selectAudioOutputDevice()} function to choose where to direct all audio output.
    * 
    * @returns {Promise<string[]>} Listing of all available audio output devices connected to the client
    */
   async getAvailableAudioOutputDevices() {
      const outputDevices = [];
      for (const key in this.#audioOutputDevices)
         delete this.#audioOutputDevices[key];
      if (navigator.mediaDevices?.enumerateDevices) {
         try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            for (const device of await navigator.mediaDevices.enumerateDevices())
               if (device.kind == 'audiooutput') {
                  let alreadyFound = false;
                  for (const [i, existingDevice] of outputDevices.entries()) {
                     if (existingDevice.groupId == device.groupId) {
                        if (device.deviceId.length > existingDevice.id.length) {
                           outputDevices[i].id = device.deviceId;
                           outputDevices[i].label = device.label;
                        }
                        alreadyFound = true;
                        break;
                     }
                  }
                  if (!alreadyFound)
                     outputDevices.push({ id: device.deviceId, groupId: device.groupId, label: device.label });
               }
         } catch (err) {
            throw new WebAudioDeviceError('Audio permissions are required in order to enumerate available devices!');
         }
      }
      outputDevices.forEach(device => this.#audioOutputDevices[device.label] = device.id);
      return Object.keys(this.#audioOutputDevices);
   }

   /**
    * Decodes an {@link ArrayBuffer} containing an audio clip into an {@link AudioBuffer} object.
    * 
    * @param {ArrayBuffer} audioClip - Array buffer containing the audio clip to decode
    * @returns {AudioBuffer} Decoded audio buffer for the specified audio clip
    */
   async decodeAudioClip(audioClip) {
      if (!(audioClip instanceof ArrayBuffer))
         throw new WebAudioValueError('The specified audio clip must be of type ArrayBuffer for decoding');
      return await this.#audioContext.decodeAudioData(audioClip);
   }

   /**
    * Analyzes the current realtime audio output according to the specified `analysisType`.
    * 
    * The `trackName` parameter is optional, and if left blank, will cause the analysis to be
    * carried out on the aggregate output over all tracks and all applied effects.
    * 
    * The type of return value from this function will depend on the analysis being carried out
    * and can be determined by examining the corresponding concrete definitions of the
    * {@link AnalysisBase} interface.
    * 
    * @param {number} analysisType - Audio {@link module:Constants.AnalysisType AnalysisType} to execute
    * @param {string} [trackName] - Name of the track whose audio should be analyzed
    * @returns {Any} Result of the specified analysis
    * @see {@link module:Constants.AnalysisType AnalysisType}
    */
   analyzeAudio(analysisType, trackName) {
      let analysisBuffer = null;
      if (!Object.values(AnalysisType).includes(Number(analysisType)))
         throw new WebAudioTargetError(`The target analysis type identifier (${analysisType}) does not exist`);
      if (trackName) {
         if (!(trackName in this.#tracks))
            throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
         analysisBuffer = this.#tracks[trackName].getAnalysisBuffer(analysisType);
      }
      else {
         analysisBuffer = this.#analysisBuffer;
         if (analysisType == AnalysisType.TimeSeries)
            this.#analysisNode.getByteTimeDomainData(analysisBuffer);
         else
            this.#analysisNode.getByteFrequencyData(analysisBuffer);
      }
      return (analysisType == AnalysisType.TimeSeries) ? analysisBuffer : getAnalyzerFor(analysisType).analyze(analysisBuffer);
   }

   /**
    * Returns a properly formatted structure containing the relevant musical modification and
    * parameters passed into this function.
    * 
    * Note that the `modificationOptions` parameter should normally be either omitted/undefined
    * or an `Object` containing the required keys as returned by the
    * {@link WebAudioAPI#getAvailableModificationParameters getAvailableModificationParameters()}
    * function; however, if there is only one required key, you may simply pass a numerical
    * value to `modificationOptions` instead of explicitly enumerating an Object with the single
    * required key.
    * 
    * @param {number} modificationType - Number corresponding to the {@link module:Constants.ModificationType ModificationType} to generate
    * @param {Object|number} [modificationOptions] - Potential modification-specific options as returned by {@link WebAudioAPI#getAvailableModificationParameters getAvailableModificationParameters()}
    * @returns {ModificationDetails} A structure containing the relevant musical modification details passed into this function
    * @see {@link module:Constants.ModificationType ModificationType}
    */
   getModification(modificationType, modificationOptions) {
      if (!Object.values(ModificationType).includes(Number(modificationType)))
         throw new WebAudioTargetError(`The target modification type identifier (${modificationType}) does not exist`);
      else if (modificationOptions && Array.isArray(modificationOptions))
         throw new WebAudioValueError('The "modificationOptions" parameter must be either a number or an "Object" with keys as specified in getAvailableModificationParameters()');
      const options = (!modificationOptions || ((typeof(modificationOptions) === 'object') && ('value' in modificationOptions))) ? modificationOptions : 
         { value: ((typeof(modificationOptions) === 'object') ? modificationOptions : { implicit: modificationOptions }) };
      return { type: modificationType, ...options };
   }

   /**
    * Creates a track capable of playing sequential audio. A single track can only utilize a
    * single instrument at a time.
    * 
    * @param {string} name - Name of the newly created track
    */
   createTrack(name) {
      this.removeTrack(name);
      this.#tracks[name] = createTrack(name, this.#audioContext, this.#tempo, this.#key, this.#sourceSinkNode);
   }

   /**
    * Removes the specified audio track and cancels any audio scheduled for playback on this
    * track from playing or starting to play in the future.
    * 
    * @param {string} name - Name of the track to remove
    */
   removeTrack(name) {
      if (name in this.#tracks) {
         this.#tracks[name].deleteTrack();
         delete this.#tracks[name];
      }
   }

   /**
    * Removes all existing audio tracks and cancels all current and scheduled audio.
    */
   removeAllTracks() {
      for (const name in this.#tracks)
         this.removeTrack(name);
   }

   /**
    * Cancels all current and scheduled audio from playing on the specified track.
    * 
    * @param {string} name - Name of the track to clear
    */
   clearTrack(name) {
      if (name in this.#tracks)
         this.#tracks[name].clearTrack();
   }

   /**
    * Cancels all current and scheduled audio from playing on all existing tracks.
    */
   clearAllTracks() {
      for (const name in this.#tracks)
         this.#tracks[name].clearTrack();
   }

   /**
    * Updates the instrument used to play back audio on the specified track.
    * 
    * The instrument name must refer to a valid instrument as returned by the
    * {@link WebAudioAPI#getAvailableInstruments getAvailableInstruments()} function.
    * 
    * @param {string} trackName - Name of the track for which to update the instrument
    * @param {string} instrumentName - Name of the instrument to assign to the track
    */
   async updateInstrument(trackName, instrumentName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      if (!(instrumentName in this.#instrumentListing))
         throw new WebAudioTargetError(`The target instrument name (${instrumentName}) does not exist`);
      if (!(instrumentName in this.#loadedInstruments))
         this.#loadedInstruments[instrumentName] = await loadInstrument(this.#audioContext, instrumentName, this.#instrumentListing[instrumentName]);
      this.#tracks[trackName].updateInstrument(this.#loadedInstruments[instrumentName]);
   }

   /**
    * Removes the instrument used to play back audio on the specified track.
    * 
    * @param {string} trackName - Name of the track from which to remove the current instrument
    */
   async removeInstrument(trackName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      this.#tracks[trackName].removeInstrument();
   }

   /**
    * Returns the current global {@link Tempo} parameters for all audio tracks.
    * 
    * @returns {Tempo} Global {@link Tempo} parameters and settings
    */
   getTempo() {
      return {...this.#tempo};
   }

   /**
    * Returns the current global {@link Key} parameters for all audio tracks.
    * 
    * @returns {Key} Global {@link Key} parameters and settings
    */
   getKeySignature() {
      return {...this.#key};
   }

   /**
    * Converts a note {@link module:Constants.Duration Duration} into a corresponding number of seconds given the
    * current {@link Tempo} settings.
    * 
    * @param {number} duration - Note {@link module:Constants.Duration Duration} to convert to seconds
    * @returns {number} Number of seconds corresponding to the specified `duration` at current {@link Tempo} settings
    */
   convertNoteDurationToSeconds(duration) {
      return 60.0 / ((duration / this.#tempo.beatBase) * this.#tempo.beatsPerMinute);
   }

   /**
    * Converts a number of seconds into the nearest corresponding note {@link module:Constants.Duration Duration} given the
    * current {@link Tempo} settings.
    * 
    * @param {number} seconds - Number of seconds to convert to a note {@link module:Constants.Duration Duration}
    * @returns {number} Note {@link module:Constants.Duration Duration} corresponding to the specified `seconds` at current {@link Tempo} settings
    */
   convertSecondsToNoteDuration(seconds) {
      // TODO: Implement this
      console.log(seconds);
      throw new WebAudioNotImplementedError('The "convertSecondsToNoteDuration" functionality has not yet been implemented');
   }

   /**
    * Updates the global tempo parameters for all audio tracks.
    * 
    * The `beatBase` parameter should correspond to the beat scaling factor associated with one of
    * the note durations from {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()}.
    * 
    * Any parameter may be set to `null` to keep it unchanged between consecutive function calls.
    * 
    * @param {number|null} beatBase - Note {@link module:Constants.Duration Duration} corresponding to a global beat
    * @param {number|null} beatsPerMinute - Number of global beats per minute
    * @param {number|null} timeSignatureNumerator - Number of beats per measure
    * @param {number|null} timeSignatureDenominator - Note {@link module:Constants.Duration Duration} corresponding to a measure beat
    */
   updateTempo(beatBase, beatsPerMinute, timeSignatureNumerator, timeSignatureDenominator) {
      this.#tempo.beatBase = beatBase ? Number(beatBase) : this.#tempo.beatBase;
      this.#tempo.beatsPerMinute = beatsPerMinute ? Number(beatsPerMinute) : this.#tempo.beatsPerMinute;
      this.#tempo.timeSignatureNumerator = timeSignatureNumerator ? Number(timeSignatureNumerator) : this.#tempo.timeSignatureNumerator;
      this.#tempo.timeSignatureDenominator = timeSignatureDenominator ? Number(timeSignatureDenominator) : this.#tempo.timeSignatureDenominator;
      this.#tempo.measureLengthSeconds = (60.0 / this.#tempo.beatsPerMinute) * this.#tempo.beatBase * this.#tempo.timeSignatureNumerator / this.#tempo.timeSignatureDenominator;
   }

   /**
    * Updates the global key signature parameters for all audio tracks.
    * 
    * The `keySignature` parameter should correspond to the location of the desired key on the
    * circle of fifths as returned by the {@link WebAudioAPI#getAvailableKeySignatures getAvailableKeySignatures()}
    * function. Alternately, you can specify the number of sharps as a positive value or the
    * number of flats as a negative value.
    * 
    * @param {number} keySignature - Numerical {@link module:Constants.KeySignature KeySignature} indicator based on its circle of fifths position
    */
   updateKeySignature(keySignature) {
      if (!Object.values(KeySignature).includes(Number(keySignature)))
         throw new WebAudioTargetError(`The target key signature (${keySignature}) does not exist`);
      const noteOffsets = {
         [KeySignature.CMajor]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [KeySignature.DMajor]: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
         [KeySignature.EMajor]: [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
         [KeySignature.FMajor]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
         [KeySignature.GMajor]: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
         [KeySignature.AMajor]: [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
         [KeySignature.BMajor]: [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
         [KeySignature.CSharpMajor]: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
         [KeySignature.FSharpMajor]: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
         [KeySignature.CFlatMajor]: [-1, 0, -1, 0, -1, -1, 0, -1, 0, -1, 0, -1],
         [KeySignature.DFlatMajor]: [0, 0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1],
         [KeySignature.EFlatMajor]: [0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, -1],
         [KeySignature.GFlatMajor]: [-1, 0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1],
         [KeySignature.AFlatMajor]: [0, 0, -1, 0, -1, 0, 0, 0, 0, -1, 0, -1],
         [KeySignature.BFlatMajor]: [0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1]
      };
      this.#key.signature = Number(keySignature);
      this.#key.offsets = noteOffsets[Number(keySignature)];
   }

   /**
    * Applies a new master effect to the aggregate output from all tracks at the specified time.
    * 
    * Calling this function affects the sequential ordering in which master effects will be
    * processed, with each new call appending the corresponding effect to the *end* of the
    * processing sequence.
    * 
    * The parameters of the added effect will be set to their default values such that the result
    * of adding the effect will not be audible. In order to manipulate and utilize this effect,
    * use the {@link WebAudioAPI#updateMasterEffect updateMasterEffect()} function.
    * 
    * If a master effect with the specified `effectName` has already been applied, then calling
    * this function will simply re-order the effect to move it to the very end of the effect
    * processing sequence, without changing its parameter values.
    * 
    * @param {string} effectName - User-defined name to associate with the master effect
    * @param {number} effectType - Master {@link module:Constants.EffectType EffectType} to apply
    * @see {@link module:Constants.EffectType EffectType}
    */
   async applyMasterEffect(effectName, effectType) {
      if (!Object.values(EffectType).includes(Number(effectType)))
         throw new WebAudioTargetError(`The target effect type identifier (${effectType}) does not exist`);
      const existingEffect = await this.removeMasterEffect(effectName);
      const newEffect = existingEffect || await loadEffect(this.#audioContext, effectName, Number(effectType));
      newEffect.output.connect(this.#compressorNode);
      if (this.#effects.length) {
         const previousEffect = this.#effects.slice(-1)[0];
         previousEffect.output.disconnect();
         previousEffect.output.connect(newEffect.input);
      }
      else {
         this.#sourceSinkNode.disconnect();
         this.#sourceSinkNode.connect(newEffect.input);
      }
      this.#effects.push(newEffect);
   }

   /**
    * Applies a new effect to the specified track at the specified time.
    * 
    * Calling this function affects the sequential ordering in which effects will be processed
    * within the specified track, with each new call appending the corresponding effect to the
    * *end* of the processing sequence.
    * 
    * The parameters of the added effect will be set to their default values such that the result
    * of adding the effect will not be audible. In order to manipulate and utilize this effect,
    * use the {@link WebAudioAPI#updateTrackEffect updateTrackEffect()} function.
    * 
    * If an effect with the specified `effectName` has already been applied to the specified
    * track, then calling this function will simply re-order the effect to move it to the very end
    * of the effect processing sequence, without changing its parameter values.
    * 
    * @param {string} trackName - Name of the track on which to apply the effect
    * @param {string} effectName - User-defined name to associate with the track effect
    * @param {number} effectType - Track-specific {@link module:Constants.EffectType EffectType} to apply
    * @see {@link module:Constants.EffectType EffectType}
    */
   async applyTrackEffect(trackName, effectName, effectType) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      if (!Object.values(EffectType).includes(Number(effectType)))
         throw new WebAudioTargetError(`The target effect type identifier (${effectType}) does not exist`);
      await this.#tracks[trackName].applyEffect(effectName, Number(effectType));
   }

   /**
    * Updates the parameters of a master effect at the specified time.
    * 
    * Calling this function will **not** affect the sequential processing order of any applied
    * effects.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {string} effectName - Name of the master effect to be updated
    * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [transitionLength] - Number of seconds over which to update the effect
    */
   async updateMasterEffect(effectName, effectOptions, updateTime, transitionLength) {
      for (const effect of this.#effects)
         if (effect.name == effectName) {
            await effect.update(effectOptions, updateTime ? Number(updateTime) : undefined, transitionLength ? (0.333 * Number(transitionLength)) : undefined);
            return;
         }
      throw new WebAudioTargetError(`The target master effect (${effectName}) does not exist`);
   }

   /**
    * Updates the parameters of a track-specific effect at the specified time.
    * 
    * Calling this function will **not** affect the sequential processing order of any applied
    * effects.
    * 
    * Note that the `updateTime` parameter can be omitted to immediately cause the requested
    * changes to take effect.
    * 
    * @param {string} trackName - Name of the track for which to update the effect
    * @param {string} effectName - Name of the track effect to be updated
    * @param {Object} effectOptions - Effect-specific options as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    * @param {number} [updateTime] - Global API time at which to update the effect
    * @param {number} [transitionLength] - Number of seconds over which to update the effect
    */
   async updateTrackEffect(trackName, effectName, effectOptions, updateTime, transitionLength) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      await this.#tracks[trackName].updateEffect(effectName, effectOptions, updateTime ? Number(updateTime) : undefined, transitionLength ? (0.333 * Number(transitionLength)) : undefined);
   }

   /**
    * Returns the current parameter settings for the specified master effect.
    * 
    * @param {string} effectName - Name of the master effect for which to retrieve current settings
    * @returns {Object} Effect-specific parameter values with keys as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    */
   getCurrentMasterEffectParameters(effectName) {
      for (const effect of this.#effects)
         if (effect.name == effectName)
            return effect.currentParameterValues();
      throw new WebAudioTargetError(`The target master effect (${effectName}) does not exist`);
   }

   /**
    * Returns the current parameter settings for a track-specific effect.
    * 
    * @param {string} trackName - Name of the track for which to retrieve current effect settings
    * @param {string} effectName - Name of the track effect for which to retrieve current settings
    * @returns {Object} Effect-specific parameter values with keys as returned by {@link WebAudioAPI#getAvailableEffectParameters getAvailableEffectParameters()}
    */
   getCurrentTrackEffectParameters(trackName, effectName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      return this.#tracks[trackName].getCurrentEffectParameters(effectName);
   }

   /**
    * Removes the specified master effect from being applied.
    * 
    * @param {string} effectName - Name of the master effect to be removed
    * @returns {Promise<Effect|null>} The effect that was removed, if any
    * @see {@link Effect}
    */
   async removeMasterEffect(effectName) {
      let existingEffect = null;
      for (const [index, effect] of this.#effects.entries())
         if (effect.name == effectName) {
            existingEffect = this.#effects.splice(index, 1)[0];
            if (index == 0) {
               this.#sourceSinkNode.disconnect();
               this.#sourceSinkNode.connect(this.#effects.length ? this.#effects[0].input : this.#compressorNode);
            }
            else {
               this.#effects[index-1].output.disconnect();
               this.#effects[index-1].output.connect((this.#effects.length > index) ? this.#effects[index].input : this.#compressorNode);
            }
            existingEffect.input.disconnect();
            existingEffect.output.disconnect();
            break;
         }
      return existingEffect;
   }

   /**
    * Removes the specified effect from being applid on the corresponding track.
    * 
    * @param {string} trackName - Name of the track from which to remove the effect
    * @param {string} effectName - Name of the track effect to be removed
    */
   async removeTrackEffect(trackName, effectName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      await this.#tracks[trackName].removeEffect(effectName);
   }

   /**
    * Registers a callback function to receive incoming events from the specified MIDI device.
    * 
    * The `midiEventCallback` parameter should be a function that receives one parameter of type
    * {@link https://developer.mozilla.org/en-US/docs/Web/API/MIDIMessageEvent MIDIMessageEvent}.
    * 
    * **Note:** A callback may be registered for a MIDI device that is also connected to an audio
    * track; however, only one top-level event callback can be registered to a MIDI device at
    * a time.
    * 
    * @param {string} midiDeviceName - Name of the MIDI device for which to receive events
    * @param {MidiEventCallback} midiEventCallback - Callback to fire when a MIDI event is received
    */
   registerMidiDeviceCallback(midiDeviceName, midiEventCallback) {
      this.deregisterMidiDeviceCallback(midiDeviceName);
      if (!this.#midiDeviceAccess)
         throw new WebAudioMidiError('MIDI access permissions have not yet been granted...first call getAvailableMidiDevices()');
      for (const midiDevice of this.#midiDeviceAccess.inputs.values())
         if (midiDeviceName == midiDevice.name) {
            midiDevice.addEventListener('midimessage', midiEventCallback);
            this.#midiCallbacks[midiDeviceName] = { device: midiDevice, callback: midiEventCallback };
            return;
         }
      throw new WebAudioTargetError(`The target MIDI device (${midiDeviceName}) could not be located`);
   }

   /**
    * Removes a user-registered callback from the specified MIDI device so that it will no
    * longer fire upon reception of a MIDI event.
    * 
    * @param {string} midiDeviceName - Name of the MIDI device for which to stop receiving events
    */
   deregisterMidiDeviceCallback(midiDeviceName) {
      if (midiDeviceName in this.#midiCallbacks) {
         const midiObject = this.#midiCallbacks[midiDeviceName];
         midiObject.device.removeEventListener('midimessage', midiObject.callback);
         delete this.#midiCallbacks[midiDeviceName];
      }
   }

   /**
    * Redirects all audio output to the specified device.
    * 
    * @param {string} audioOutputDeviceName - Name of the output device to which to direct all audio
    */
   async selectAudioOutputDevice(audioOutputDeviceName) {
      if (!(audioOutputDeviceName in this.#audioOutputDevices))
         throw new WebAudioTargetError(`The target audio output device (${audioOutputDeviceName}) does not exist`);
      await this.#audioContext.setSinkId(this.#audioOutputDevices[audioOutputDeviceName]);
   }

   /**
    * Connects a MIDI device to the specified audio track.
    * 
    * **Note:** A single MIDI device can be connected to multiple audio tracks, but an audio track
    * can only be connected to a single MIDI device.
    * 
    * @param {string} trackName - Name of the track to which to connect the MIDI device
    * @param {string} midiDeviceName - Name of the MIDI device to connect to the track
    */
   async connectMidiDeviceToTrack(trackName, midiDeviceName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      if (!this.#midiDeviceAccess)
         throw new WebAudioMidiError('MIDI access permissions have not yet been granted...first call getAvailableMidiDevices()');
      for (const midiDevice of this.#midiDeviceAccess.inputs.values())
         if (midiDeviceName == midiDevice.name) {
            this.#tracks[trackName].connectToMidiDevice(midiDevice);
            return;
         }
      throw new WebAudioTargetError(`The target MIDI device (${midiDeviceName}) could not be located`);
   }

   /**
    * Connects an audio input device to the specified audio track.
    * 
    * **Note:** A single audio input device can be connected to multiple audio tracks, but an
    * audio track can only be connected to a single audio input device.
    * 
    * @param {string} trackName - Name of the track to which to connect the audio input device
    * @param {string} audioInputDeviceName - Name of the audio input device to connect to the track
    */
   async connectAudioInputDeviceToTrack(trackName, audioInputDeviceName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      if (!(audioInputDeviceName in this.#audioInputDevices))
         throw new WebAudioTargetError(`The target audio input device (${audioInputDeviceName}) does not exist`);
      await this.#tracks[trackName].connectToAudioInputDevice(this.#audioInputDevices[audioInputDeviceName]);
   }

   /**
    * Disconnects all MIDI devices from the specified audio track.
    * 
    * @param {string} trackName - Name of the track from which to disconnect the MIDI devices
    */
   async disconnectMidiDeviceFromTrack(trackName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      this.#tracks[trackName].disconnectFromMidiDevice();
   }

   /**
    * Disconnects all audio input devices from the specified audio track.
    * 
    * @param {string} trackName - Name of the track from which to disconnect the audio input devices
    */
   async disconnectAudioInputDeviceFromTrack(trackName) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      this.#tracks[trackName].disconnectFromAudioInputDevice();
   }

   /**
    * Schedules a note to be played on a specific track for some duration of time.
    * 
    * Note that the `duration` parameter should correspond to the beat scaling factor
    * associated with one of the note durations from
    * {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()}.
    * Likewise, the `note` parameter should correspond to a MIDI note number as
    * associated with one of the notes returned from
    * {@link WebAudioAPI#getAvailableNotes getAvailableNotes()}.
    * 
    * The `modifications` parameter is optional, and if included, may either be a single
    * {@link ModificationDetails} structure or a list of such structures. This structure should
    * be obtained from the {@link WebAudioAPI#getModification getModification()} function.
    * 
    * @param {string} trackName - Name of the track on which to play the note
    * @param {number} note - MIDI {@link module:Constants.Note Note} number to be played
    * @param {number} startTime - Global API time at which to start playing the note
    * @param {number} duration - {@link module:Constants.Duration Duration} for which to continue playing the note
    * @param {ModificationDetails|ModificationDetails[]} [modifications] - Optional individual or list of modifications to apply to the note
    * @param {boolean} [isDrumNote] - Optional flag indicating whether this note is a drum note (i.e., not affected by key or duration)
    * @returns {Promise<number>} Duration (in seconds) of the note being played
    * @see {@link module:Constants.Note Note}
    * @see {@link module:Constants.Duration Duration}
    * @see {@link module:Constants.ModificationType ModificationType}
    * @see {@link WebAudioAPI#getModification getModification()}
    */
   async playNote(trackName, note, startTime, duration, modifications=[], isDrumNote=false) {
      const mods = (modifications ? (Array.isArray(modifications) ? modifications : [modifications]) : []);
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      else
         checkModifications(mods, true);
      return await this.#tracks[trackName].playNote(getNoteInKey(Number(note), this.#key), Number(startTime), Number(duration), mods, isDrumNote);
   }

   /**
    * Schedules a chord of notes to be played on a specific track.
    * 
    * Note that the `chord` parameter should be an array of `[note, duration, mods]` tuples,
    * where the `note` parameter should correspond to a valid MIDI note number, the `duration`
    * parameter should correspond to the beat scaling factor associated with one of the note
    * durations from {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()},
    * and `mods` may either be a single modification to the chord, a list of modifications, or
    * omitted completely.
    * 
    * The `modifications` parameter is optional, and if included, may either be a single
    * {@link ModificationDetails} structure or a list of such structures. This structure should
    * be obtained from the {@link WebAudioAPI#getModification getModification()} function.
    * 
    * @param {string} trackName - Name of the track on which to play the note
    * @param {Array<Array>} chord - Array of `[note, duration, mods]` corresponding to the chord to be played
    * @param {number} startTime - Global API time at which to start playing the chord
    * @param {ModificationDetails[]} [modifications] - Optional individual or list of modifications to apply to the chord
    * @param {boolean} [areDrumNotes] - Optional flag indicating whether this chord contains only drum notes (i.e., not affected by key or duration)
    * @returns {Promise<number>} Duration (in seconds) of the chord being played
    * @see {@link module:Constants.Note Note}
    * @see {@link module:Constants.Duration Duration}
    * @see {@link module:Constants.ModificationType ModificationType}
    * @see {@link WebAudioAPI#getModification getModification()}
    */
   async playChord(trackName, chord, startTime, modifications=[], areDrumNotes=false) {
      const mods = (modifications ? (Array.isArray(modifications) ? modifications : [modifications]) : []);
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      else if (!Array.isArray(chord) || !Array.isArray(chord[0]))
         throw new WebAudioValueError('The "chord" parameter must be an array of tuples');
      else
         checkModifications(mods, true);
      for (const chordItem of chord)
         chordItem[0] = getNoteInKey(Number(chordItem[0]), this.#key);
      return await this.#tracks[trackName].playChord(chord, Number(startTime), mods, areDrumNotes);
   }

   /**
    * Schedules a musical sequence to be played on a specific track.
    * 
    * Note that the `sequence` parameter should be an array containing either chords (as
    * defined in the {@link playChord playChord()} function) or `[note, duration, mods]` tuples,
    * where the `note` parameter should correspond to a valid MIDI note number, the `duration`
    * parameter should correspond to the beat scaling factor associated with one of the note
    * durations from {@link WebAudioAPI#getAvailableNoteDurations getAvailableNoteDurations()},
    * and `mods` may either be a single modification that affects the whole sequence, a list of
    * modifications, or omitted completely.
    * 
    * The `modifications` parameter is optional, and if included, may either be a single
    * {@link ModificationDetails} structure or a list of such structures. This structure should
    * be obtained from the {@link WebAudioAPI#getModification getModification()} function.
    * 
    * @param {string} trackName - Name of the track on which to play the note
    * @param {Array<Array|Array<Array>>} sequence - Array of `[note, duration, mods]` and/or chords corresponding to the sequence to be played
    * @param {number} startTime - Global API time at which to start playing the sequence
    * @param {ModificationDetails[]} [modifications] - Optional individual or list of modifications to apply to the sequence
    * @param {boolean} [areDrumNotes] - Optional flag indicating whether this sequence contains only drum notes (i.e., not affected by key or duration)
    * @returns {Promise<number>} Duration (in seconds) of the sequence being played
    * @see {@link module:Constants.Note Note}
    * @see {@link module:Constants.Duration Duration}
    * @see {@link module:Constants.ModificationType ModificationType}
    * @see {@link WebAudioAPI#getModification getModification()}
    */
   async playSequence(trackName, sequence, startTime, modifications=[], areDrumNotes=false) {
      const mods = (modifications ? (Array.isArray(modifications) ? modifications : [modifications]) : []);
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      else if (!Array.isArray(sequence) || !Array.isArray(sequence[0]))
         throw new WebAudioValueError('The "sequence" parameter must be either an array of tuples or an array of an array of tuples');
      else
         checkModifications(mods, false);
      for (const sequenceItem of sequence) {
         if (Array.isArray(sequenceItem[0])) {
            for (const chordItem of sequenceItem)
               chordItem[0] = getNoteInKey(Number(chordItem[0]), this.#key);
         }
         else
            sequenceItem[0] = getNoteInKey(Number(sequenceItem[0]), this.#key);
      }
      return await this.#tracks[trackName].playSequence(sequence, Number(startTime), mods, areDrumNotes);
   }

   /**
    * Schedules an audio clip to be played on a specific track for some duration of time.
    * 
    * The format of the audio clip in the `audioClip` parameter may be a data buffer containing
    * raw audio-encoded data (such as from a WAV file), a blob containing audio-encoded data, an
    * already-decoded audio buffer, or a {@link MidiClip} or {@link AudioClip} that was recorded
    * using this library.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio clip will
    * play to completion.
    * 
    * @param {string} trackName - Name of the track on which to play the clip
    * @param {ArrayBuffer|AudioBuffer|Blob|MidiClip|AudioClip} audioClip - Object containing audio data to play
    * @param {number} startTime - Global API time at which to start playing the clip
    * @param {number} [duration] - Number of seconds for which to continue playing the clip
    * @returns {Promise<number>} Duration (in seconds) of the clip being played
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer ArrayBuffer}
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
    * @see {@link MidiClip}
    */
   async playClip(trackName, audioClip, startTime, duration) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      if (!(audioClip instanceof ArrayBuffer || audioClip instanceof AudioBuffer || audioClip instanceof Blob || (audioClip instanceof Object && Object.prototype.hasOwnProperty.call(audioClip, 'clipType'))))
         throw new WebAudioTrackError('The audio clip is not a known type (ArrayBuffer, AudioBuffer, Blob, MidiClip, AudioClip) and cannot be played');
      return await this.#tracks[trackName].playClip(audioClip, Number(startTime), duration ? Number(duration) : undefined);
   }

   /**
    * Schedules an audio file to be played on a specific track for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio file will
    * play to completion.
    * 
    * @param {string} trackName - Name of the track on which to play the file
    * @param {string} fileURL - URL location pointing to an audio file
    * @param {string} startTime - Global API time at which to start playing the file
    * @param {number} [duration] - Number of seconds for which to continue playing the file
    * @returns {Promise<number>} Duration (in seconds) of the file being played
    */
   async playFile(trackName, fileURL, startTime, duration) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      return await this.#tracks[trackName].playFile(fileURL, Number(startTime), duration ? Number(duration) : undefined);
   }

   /**
    * Immediately begins playing a note on the specified track. Playback continues until the note
    * is explicitly stopped using the {@link WebAudioAPI#stopNote stopNote()} function.
    * 
    * Note that the `note` parameter should correspond to a MIDI note number as associated
    * with one of the notes returned from {@link WebAudioAPI#getAvailableNotes getAvailableNotes()}.
    * 
    * @param {string} trackName - Name of the track on which to start playing the note
    * @param {number} note - MIDI {@link module:Constants.Note Note} number to be played
    * @param {number} [velocity=0.75] - Intensity of the note to play between [0.0, 1.0]
    * @returns {Promise<Object>} Reference to the newly scheduled note
    * @see {@link module:Constants.Note Note}
    */
   async startNote(trackName, note, velocity=0.75) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      if ((Number(velocity) < 0.0) || (Number(velocity) > 1.0))
         throw new WebAudioValueError(`The target velocity value (${velocity}) is outside of the available range: [0.0, 1.0]`);
      return await this.#tracks[trackName].playNoteAsync(Number(note) < 0 ? -Number(note) : Number(note), Number(velocity));
   }

   /**
    * Immediately stop playing a note on the specified track. The note to be stopped must be a
    * reference to an actively playing note that was previously returned from the
    * {@link WebAudioAPI#startNote startNote()} function.
    * 
    * @param {string} trackName - Name of the track on which to stop playing the note
    * @param {Object} note - Reference to an active note that was started using {@link WebAudioAPI#startNote startNote()}
    */
   async stopNote(trackName, note) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      this.#tracks[trackName].stopNoteAsync(Number(note) < 0 ? -Number(note) : Number(note));
   }

   /**
    * Schedules an audio clip to be recorded on a specific track for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio clip will
    * continue to record until manually stopped by the {@link AudioClip#finalize finalize()}
    * function on the returned {@link AudioClip} object.
    * 
    * Note that the recorded audio clip will **not** include any effects that might exist on
    * the target track. This is so that recording on an effect-modified track and then
    * immediately playing back on the same track will not cause the effects to be doubled.
    * 
    * @param {string} trackName - Name of the track on which to record the audio clip
    * @param {number} startTime - Global API time at which to start recording the audio clip
    * @param {number} [duration] - Number of seconds for which to continue recording the audio clip
    * @returns {AudioClip} Reference to an {@link AudioClip} object representing the audio data to be recorded
    * @see {@link AudioClip}
    */
   recordAudioClip(trackName, startTime, duration) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      return this.#tracks[trackName].recordAudioClip(Number(startTime), duration ? Number(duration) : undefined);
   }

   /**
    * Schedules a MIDI clip to be recorded on a specific track for some duration of time.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the MIDI clip will
    * continue to record until manually stopped by the {@link MidiClip#finalize finalize()}
    * function on the returned {@link MidiClip} object.
    * 
    * Note that the recorded MIDI clip will **not** include any effects that might exist on
    * the target track. This is so that recording on an effect-modified track and then
    * immediately playing back on the same track will not cause the effects to be doubled.
    * 
    * @param {string} trackName - Name of the track on which to record the MIDI clip
    * @param {number} startTime - Global API time at which to start recording the MIDI clip
    * @param {number} [duration] - Number of seconds for which to continue recording the MIDI clip
    * @returns {MidiClip} Reference to a {@link MidiClip} object representing the MIDI data to be recorded
    * @see {@link MidiClip}
    */
   recordMidiClip(trackName, startTime, duration) {
      if (!(trackName in this.#tracks))
         throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
      return this.#tracks[trackName].recordMidiClip(Number(startTime), duration ? Number(duration) : undefined);
   }

   /**
    * Schedules an audio recording to be executed on the cumulative output of the specified audio
    * track for some duration of time.
    * 
    * If the `trackName` parameter is not specified or is set to `null`, the audio recording will
    * include the cumulative output of **all** audio tracks and effects.
    * 
    * If the `startTime` parameter is not specified or is set to `null`, the audio recording will
    * begin immediately.
    * 
    * If the `duration` parameter is not specified or is set to `null`, the audio recording will
    * continue until manually stopped by the {@link AudioRecording#finalize finalize()} function
    * on the returned {@link AudioRecording} object.
    * 
    * Note that the recorded audio **will** include **all** existing effects.
    * 
    * @param {string} [trackName] - Name of the track from which to record all audio output
    * @param {number} [startTime] - Global API time at which to start recording the audio output
    * @param {number} [duration] - Number of seconds for which to continue recording the audio output
    * @returns {AudioRecording} Reference to an {@link AudioRecording} object representing the audio recording
    * @see {@link AudioRecording}
    */
   recordOutput(trackName, startTime, duration) {

      /**
       * Object containing all data needed to render a full audio recording.
       * @namespace AudioRecording
       * @global
       */

      // Forward this request to the indicated track, if specified
      if (trackName) {
         if (!(trackName in this.#tracks))
            throw new WebAudioTargetError(`The target track name (${trackName}) does not exist`);
         return this.#tracks[trackName].recordOutput(startTime, duration);
      }

      // Audio recording-local variable definitions
      let recorderDestination = this.#audioContext.createMediaStreamDestination();
      let recorder = new MediaRecorder(recorderDestination.stream), isRecording = true;
      let audioData = null, recordedDuration = null, completionCallback = null;
      const audioContext = this.#audioContext, analysisNode = this.#analysisNode;

      // Private audio data handling functions
      function startRecording() {
         if (startTime >= (audioContext.currentTime + 0.001))
            setTimeout(startRecording, 1);
         else {
            startTime = audioContext.currentTime;
            recorder.start(duration ? (1000 * duration) : undefined);
         }
      }

      recorder.ondataavailable = (event) => {
         if (!audioData) {
            audioData = event.data;
            recordedDuration = duration || (audioContext.currentTime - startTime);
            finalize();
         }
         isRecording = false;
      };

      recorder.onstop = async () => {
         analysisNode.disconnect(recorderDestination);
         if (completionCallback)
            completionCallback(this);
         completionCallback = null;
         recorderDestination = null;
         recorder = null;
      };

      /**
       * Returns a {@link Blob} containing all of the recorded audio data.
       * 
       * @returns {Blob} Buffer containing all recorded audio data
       * @memberof AudioRecording
       * @instance
       */
      function getRawData() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve raw data from this audio recording because recording has not yet completed');
         return audioData;
      }

      /**
       * Returns the total duration of the audio recording in seconds.
       * 
       * @returns {number} Duration of the audio recording in seconds
       * @memberof AudioRecording
       * @instance
       */
      function getDuration() {
         if (!recordedDuration)
            throw new WebAudioRecordingError('Cannot retrieve duration of this audio recording because recording has not yet completed');
         return recordedDuration;
      }

      /**
       * Stops recording any future audio data within the {@link AudioRecording}, finalizes the
       * internal storage of all recorded data, and calls the user-completion notification
       * callback, if registered.
       * 
       * Note that this function is called automatically if the original call to
       * {@link Track#recordOutput recordOutput()} specified a concrete duration for the
       * recording. If no duration was specified, then this function **must** be called in order
       * to stop recording. An {@link AudioRecording} is unable to be used or played back until
       * this function has been called.
       * 
       * @memberof AudioRecording
       * @instance
       */
      async function finalize() {
         if (duration) {
            while ((startTime + duration) > audioContext.currentTime)
               await new Promise(r => setTimeout(r, 10));
         }
         if (recorder.state != 'inactive') {
            recorder.stop();
            while (isRecording)
               await new Promise(r => setTimeout(r, 1));
         }
      }

      /**
       * Allows a user to register a callback for notification when all audio recording activities
       * have been completed for this {@link AudioRecording}. This corresponds to the time when the
       * {@link AudioRecording#finalize finalize()} function gets called, either manually or
       * automatically.
       * 
       * A user-defined notification callback will be called with a single parameter which is a
       * reference to this {@link AudioRecording}.
       * 
       * @param {RecordCompleteCallback} notificationCallback - Callback to fire when this recording has completed
       * @memberof AudioRecording
       * @instance
       */
      function notifyWhenComplete(notificationCallback) {
         if (!recordedDuration)
            completionCallback = notificationCallback;
         else
            notificationCallback(this);
      }

      /**
       * Encodes this {@link AudioRecording} into a {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * containing raw audio data according to the {@link module:Constants.EncodingType EncodingType}
       * specified in the `encodingType` parameter.
       * 
       * @param {number} encodingType - Numeric value corresponding to the desired {@link module:Constants.EncodingType EncodingType}
       * @returns {Blob} Data {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob} containing the newly encoded audio data
       * @memberof AudioRecording
       * @instance
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob Blob}
       * @see {@link module:Constants.EncodingType EncodingType}
       */
      async function getEncodedData(encodingType) {
         if (!Object.values(EncodingType).includes(Number(encodingType)))
            throw new WebAudioTargetError(`An encoder for the target type identifier (${encodingType}) does not exist`);
         if (!recordedDuration || !(audioData instanceof Blob))
            throw new WebAudioRecordingError('Cannot render this audio recording because recording has not yet completed');
         const offlineContext = new OfflineAudioContext(1, 44100 * recordedDuration, 44100);
         const audioBuffer = await offlineContext.decodeAudioData(await audioData.arrayBuffer());
         const clipSource = new AudioBufferSourceNode(offlineContext, { buffer: audioBuffer });
         clipSource.connect(offlineContext.destination);
         clipSource.start();
         const renderedData = await offlineContext.startRendering();
         return await getEncoderFor(Number(encodingType)).encode(renderedData);
      }

      // Begin listening for incoming audio data
      analysisNode.connect(recorderDestination);
      startRecording();

      // Returns an object containing functions and attributes within the AudioClip namespace
      return { getRawData, getDuration, finalize, getEncodedData, notifyWhenComplete };
   }

   /**
    * Starts the {@link WebAudioAPI} library and allows audio playback to resume.
    */
   async start() {
      this.#started = true;
      await this.#audioContext.resume();
   }
 
   /**
    * Stops the {@link WebAudioAPI} library and pauses any currently playing audio.
    */
   stop() {
      this.#started = false;
      setTimeout(async () => { if (!this.#started) await this.#audioContext.suspend(); }, 200);
   }
}

// Attach a WebAudioAPI reference to "window" so that it can be accessed from non-module Javascript files
window.WebAudioAPI = WebAudioAPI;

export { WebAudioAPI };
