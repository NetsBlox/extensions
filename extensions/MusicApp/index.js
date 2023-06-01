(function () {
   'use strict';

   class AsyncNoteStorage {
      constructor(sourceNode, volumeNode) {
         this.sourceNode = sourceNode;
         this.volumeNode = volumeNode;
      }
   }

   class Track {
      #audioSources = [];
      #asyncAudioSources = [];
      
      constructor(audioAPI, trackName, audioSink) {
         this.name = trackName;
         this.audioAPI = audioAPI;
         this.audioContext = audioAPI.audioContext;
         this.audioSink = this.audioContext.createDelay(1);
         this.volumeControlSync = this.audioContext.createGain();
         this.volumeControlAsync = this.audioContext.createGain();
         this.panningControlSync = this.audioContext.createStereoPanner();
         this.panningControlAsync = this.audioContext.createStereoPanner();
         this.audioSink.connect(this.volumeControlSync)
                       .connect(this.panningControlSync)
                       .connect(this.volumeControlAsync)
                       .connect(this.panningControlAsync)
                       .connect(audioSink);
         this.audioSink.delayTime.setValueAtTime(0.0, 0.0);
         this.panningControlSync.pan.setValueAtTime(0.0, 0.0);
         this.panningControlAsync.pan.setValueAtTime(0.0, 0.0);
         this.volumeControlSync.gain.setValueAtTime(1.0, 0.0);
         this.volumeControlAsync.gain.setValueAtTime(1.0, 0.0);
         this.instrument = null;
      }

      get instrumentName() {
         return (this.instrument == null) ? 'None' : this.instrument.name;
      }

      #sourceEnded(source, sourceVolume) {
         if (sourceVolume == null)
            sourceVolume = source;
         sourceVolume.disconnect();
         this.#audioSources.splice(this.#audioSources.indexOf(source), 1);
      }

      changeInstrument(instrument) {
         this.instrument = instrument;
      }

      updateVolume(percent, updateTime) {
         if (updateTime == null)
            this.volumeControlAsync.gain.setTargetAtTime(percent, this.audioContext.currentTime, 0.01);
         else
            this.volumeControlSync.gain.setTargetAtTime(percent, updateTime, 0.01);
      }

      updatePanning(percent, updateTime) {
         if (updateTime == null)
            this.panningControlAsync.pan.setTargetAtTime((2 * percent) - 1, this.audioContext.currentTime, 0.01);
         else
            this.panningControlSync.pan.setTargetAtTime((2 * percent) - 1, updateTime, 0.01);
      }

      playNoteAsync(note) {
         const noteSource = this.instrument.getNote(this.audioContext, note); // TODO: Method to getNoteContinuous so it loops
         const noteVolume = this.audioContext.createGain();
         noteSource.connect(noteVolume).connect(this.audioSink);
         noteVolume.gain.setValueAtTime(1.0, 0.0);
         const noteStorage = new AsyncNoteStorage(noteSource, noteVolume);
         noteSource.onended = this.stopNoteAsync.bind(this, noteStorage);
         this.#asyncAudioSources.push(noteStorage);
         noteSource.start(this.audioContext.currentTime);
         return noteStorage;
      }

      stopNoteAsync(noteObject) {
         this.#asyncAudioSources.splice(this.#asyncAudioSources.indexOf(noteObject), 1);
         noteObject.volumeNode.gain.setTargetAtTime(0.0, this.audioContext.currentTime, 0.1);
         setTimeout(function() {
            noteObject.sourceNode.stop();
            noteObject.volumeNode.disconnect();
         }, 200);
      }

      playNote(note, startTime, duration) {
         const durationSeconds = 60.0 / ((duration / this.audioAPI.beatBase) * this.audioAPI.beatsPerMinute);
         const noteSource = this.instrument.getNote(this.audioContext, note);
         const noteVolume = this.audioContext.createGain();
         noteSource.connect(noteVolume).connect(this.audioSink);
         noteVolume.gain.setValueAtTime(1.0, 0.0);
         noteVolume.gain.setTargetAtTime(0.0, startTime + durationSeconds - 0.1, 0.1);
         noteSource.onended = this.#sourceEnded.bind(this, noteSource, noteVolume);
         this.#audioSources.push(noteSource);
         noteSource.start(startTime);
         noteSource.stop(startTime + durationSeconds);
         return durationSeconds;
      }

      async playClip(buffer, startTime) {
         const audioBuffer = await this.audioContext.decodeAudioData(buffer);
         const clipSource = this.audioContext.createBufferSource();
         clipSource.buffer = audioBuffer;
         clipSource.connect(this.audioSink);
         clipSource.onended = this.#sourceEnded.bind(this, clipSource, null);
         this.#audioSources.push(clipSource);
         clipSource.start(startTime);
         return audioBuffer.duration;
      }

      async playFile(file, startTime) {
         console.log(`WE HIT THE PLAY FILE FUNC`);
         const response = await fetch(file);
         const arrayBuffer = await response.arrayBuffer();
         console.log(`THIS IS THE EXPECTED ARRAY BUFFER`);
         console.dir(arrayBuffer);
         return await this.playClip(arrayBuffer, startTime);
      }

      delete() {
         for (const source of this.#audioSources)
            source.stop();
         for (const source of this.#asyncAudioSources)
            source.sourceNode.stop();
         if (this.panningControlAsync != null)
            this.panningControlAsync.disconnect();
         this.instrument = this.panningControlSync = this.panningControlAsync = null;
         this.audioSink = this.volumeControlSync = this.volumeControlAsync = null;
      }
   }

   const Note = {
      'C0': 0,                'D0bb': 0,   'C0s': 1,                 'D0b': 1,    'D0': 2,   'C0ss': 2,   'E0bb': 2,
     'D0s': 3,    'E0b': 3,   'F0bb': 3,    'E0': 4,   'D0ss': 4,    'F0b': 4,    'F0': 5,    'E0s': 5,   'G0bb': 5,
     'F0s': 6,   'E0ss': 6,    'G0b': 6,    'G0': 7,   'F0ss': 7,   'A0bb': 7,   'G0s': 8,    'A0b': 8,
      'A0': 9,   'G0ss': 9,   'B0bb': 9,   'A0s': 10,   'B0b': 10,  'C1bb': 10,   'B0': 11,  'A0ss': 11,   'C1b': 11,
      'C1': 12,   'B0s': 12,  'D1bb': 12,  'C1s': 13,  'B0ss': 13,   'D1b': 13,   'D1': 14,  'C1ss': 14,  'E1bb': 14,
     'D1s': 15,   'E1b': 15,  'F1bb': 15,   'E1': 16,  'D1ss': 16,   'F1b': 16,   'F1': 17,   'E1s': 17,  'G1bb': 17,
     'F1s': 18,  'E1ss': 18,   'G1b': 18,   'G1': 19,  'F1ss': 19,  'A1bb': 19,  'G1s': 20,   'A1b': 20,
      'A1': 21,  'G1ss': 21,  'B1bb': 21,  'A1s': 22,   'B1b': 22,  'C2bb': 22,   'B1': 23,  'A1ss': 23,   'C2b': 23,
      'C2': 24,   'B1s': 24,  'D2bb': 24,  'C2s': 25,  'B1ss': 25,   'D2b': 25,   'D2': 26,  'C2ss': 26,  'E2bb': 26,
     'D2s': 27,   'E2b': 27,  'F2bb': 27,   'E2': 28,  'D2ss': 28,   'F2b': 28,   'F2': 29,   'E2s': 29,  'G2bb': 29,
     'F2s': 30,  'E2ss': 30,   'G2b': 30,   'G2': 31,  'F2ss': 31,  'A2bb': 31,  'G2s': 32,   'A2b': 32,
      'A2': 33,  'G2ss': 33,  'B2bb': 33,  'A2s': 34,   'B2b': 34,  'C3bb': 34,   'B2': 35,  'A2ss': 35,   'C3b': 35,
      'C3': 36,   'B2s': 36,  'D3bb': 36,  'C3s': 37,  'B2ss': 37,   'D3b': 37,   'D3': 38,  'C3ss': 38,  'E3bb': 38,
     'D3s': 39,   'E3b': 39,  'F3bb': 39,   'E3': 40,  'D3ss': 40,   'F3b': 40,   'F3': 41,   'E3s': 41,  'G3bb': 41,
     'F3s': 42,  'E3ss': 42,   'G3b': 42,   'G3': 43,  'F3ss': 43,  'A3bb': 43,  'G3s': 44,   'A3b': 44,
      'A3': 45,  'G3ss': 45,  'B3bb': 45,  'A3s': 46,   'B3b': 46,  'C4bb': 46,   'B3': 47,  'A3ss': 47,   'C4b': 47,
      'C4': 48,   'B3s': 48,  'D4bb': 48,  'C4s': 49,  'B3ss': 49,   'D4b': 49,   'D4': 50,  'C4ss': 50,  'E4bb': 50,
     'D4s': 51,   'E4b': 51,  'F4bb': 51,   'E4': 52,  'D4ss': 52,   'F4b': 52,   'F4': 53,   'E4s': 53,  'G4bb': 53,
     'F4s': 54,  'E4ss': 54,   'G4b': 54,   'G4': 55,  'F4ss': 55,  'A4bb': 55,  'G4s': 56,   'A4b': 56,
      'A4': 57,  'G4ss': 57,  'B4bb': 57,  'A4s': 58,   'B4b': 58,  'C5bb': 58,   'B4': 59,  'A4ss': 59,   'C5b': 59,
      'C5': 60,   'B4s': 60,  'D5bb': 60,  'C5s': 61,  'B4ss': 61,   'D5b': 61,   'D5': 62,  'C5ss': 62,  'E5bb': 62,
     'D5s': 63,   'E5b': 63,  'F5bb': 63,   'E5': 64,  'D5ss': 64,   'F5b': 64,   'F5': 65,   'E5s': 65,  'G5bb': 65,
     'F5s': 66,  'E5ss': 66,   'G5b': 66,   'G5': 67,  'F5ss': 67,  'A5bb': 67,  'G5s': 68,   'A5b': 68,
      'A5': 69,  'G5ss': 69,  'B5bb': 69,  'A5s': 70,   'B5b': 70,  'C6bb': 70,   'B5': 71,  'A5ss': 71,   'C6b': 71,
      'C6': 72,   'B5s': 72,  'D6bb': 72,  'C6s': 73,  'B5ss': 73,   'D6b': 73,   'D6': 74,  'C6ss': 74,  'E6bb': 74,
     'D6s': 75,   'E6b': 75,  'F6bb': 75,   'E6': 76,  'D6ss': 76,   'F6b': 76,   'F6': 77,   'E6s': 77,  'G6bb': 77,
     'F6s': 78,  'E6ss': 78,   'G6b': 78,   'G6': 79,  'F6ss': 79,  'A6bb': 79,  'G6s': 80,   'A6b': 80,
      'A6': 81,  'G6ss': 81,  'B6bb': 81,  'A6s': 82,   'B6b': 82,  'C7bb': 82,   'B6': 83,  'A6ss': 83,   'C7b': 83,
      'C7': 84,   'B6s': 84,  'D7bb': 84,  'C7s': 85,  'B6ss': 85,   'D7b': 85,   'D7': 86,  'C7ss': 86,  'E7bb': 86,
     'D7s': 87,   'E7b': 87,  'F7bb': 87,   'E7': 88,  'D7ss': 88,   'F7b': 88,   'F7': 89,   'E7s': 89,  'G7bb': 89,
     'F7s': 90,  'E7ss': 90,   'G7b': 90,   'G7': 91,  'F7ss': 91,  'A7bb': 91,  'G7s': 92,   'A7b': 92,
      'A7': 93,  'G7ss': 93,  'B7bb': 93,  'A7s': 94,   'B7b': 94,  'C8bb': 94,   'B7': 95,  'A7ss': 95,   'C8b': 95,
      'C8': 96,   'B7s': 96,  'D8bb': 96,  'C8s': 97,  'B7ss': 97,   'D8b': 97,   'D8': 98,  'C8ss': 98,  'E8bb': 98,
     'D8s': 99,   'E8b': 99,  'F8bb': 99,   'E8': 100, 'D8ss': 100,  'F8b': 100,  'F8': 101,  'E8s': 101, 'G8bb': 101,
     'F8s': 102, 'E8ss': 102,  'G8b': 102,  'G8': 103, 'F8ss': 103, 'A8bb': 103, 'G8s': 104,  'A8b': 104,
      'A8': 105, 'G8ss': 105, 'B8bb': 105, 'A8s': 106,  'B8b': 106, 'C9bb': 106,  'B8': 107, 'A8ss': 107,  'C9b': 107,
      'C9': 108,  'B8s': 108, 'D9bb': 108, 'C9s': 109, 'B8ss': 109,  'D9b': 109,  'D9': 110, 'C9ss': 110, 'E9bb': 110,
     'D9s': 111,  'E9b': 111, 'F9bb': 111,  'E9': 112, 'D9ss': 112,  'F9b': 112,  'F9': 113,  'E9s': 113, 'G9bb': 113,
     'F9s': 114, 'E9ss': 114,  'G9b': 114,  'G9': 115, 'F9ss': 115, 'A9bb': 115, 'G9s': 116,  'A9b': 116,
      'A9': 117, 'G9ss': 117, 'B9bb': 117, 'A9s': 118,  'B9b': 118,   'B9': 119,             'A9ss': 119
   };

   const Duration = {
             'Whole': 1.0,         'DottedWhole': 2.0 / 3.0,          'DottedDottedWhole': 4.0 / 7.0,
              'Half': 2.0,          'DottedHalf': 4.0 / 3.0,           'DottedDottedHalf': 8.0 / 7.0,
           'Quarter': 4.0,       'DottedQuarter': 8.0 / 3.0,       'DottedDottedQuarter': 16.0 / 7.0,
            'Eighth': 8.0,       'DottedEighth': 16.0 / 3.0,        'DottedDottedEighth': 32.0 / 7.0,
        'Sixteenth': 16.0,    'DottedSixteenth': 32.0 / 3.0,     'DottedDottedSixteenth': 64.0 / 7.0,
     'ThirtySecond': 32.0, 'DottedThirtySecond': 64.0 / 3.0, 'DottedDottedThirtySecond': 128.0 / 7.0,
      'SixtyFourth': 64.0, 'DottedSixtyFourth': 128.0 / 3.0,  'DottedDottedSixtyFourth': 256.0 / 7.0
   };

   const Effect = {
      Volume: 1, Reverb: 2, Echo: 3, Panning: 4
   };

   // DEFLATE is a complex format; to read this code, you should probably check the RFC first:
   // https://tools.ietf.org/html/rfc1951
   // You may also wish to take a look at the guide I made about this program:
   // https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
   // Some of the following code is similar to that of UZIP.js:
   // https://github.com/photopea/UZIP.js
   // However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
   // Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
   // is better for memory in most engines (I *think*).

   // aliases for shorter compressed code (most minifers don't do this)
   var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
   // fixed length extra bits
   var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
   // fixed distance extra bits
   // see fleb note
   var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
   // code length index map
   var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
   // get base, reverse index map from extra bits
   var freb = function (eb, start) {
       var b = new u16(31);
       for (var i = 0; i < 31; ++i) {
           b[i] = start += 1 << eb[i - 1];
       }
       // numbers here are at max 18 bits
       var r = new u32(b[30]);
       for (var i = 1; i < 30; ++i) {
           for (var j = b[i]; j < b[i + 1]; ++j) {
               r[j] = ((j - b[i]) << 5) | i;
           }
       }
       return [b, r];
   };
   var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
   // we can ignore the fact that the other numbers are wrong; they never happen anyway
   fl[28] = 258, revfl[258] = 28;
   var _b = freb(fdeb, 0), fd = _b[0];
   // map of value to reverse (assuming 16 bits)
   var rev = new u16(32768);
   for (var i = 0; i < 32768; ++i) {
       // reverse table algorithm from SO
       var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
       x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
       x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
       rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
   }
   // create huffman tree from u8 "map": index -> code length for code index
   // mb (max bits) must be at most 15
   // TODO: optimize/split up?
   var hMap = (function (cd, mb, r) {
       var s = cd.length;
       // index
       var i = 0;
       // u16 "map": index -> # of codes with bit length = index
       var l = new u16(mb);
       // length of cd must be 288 (total # of codes)
       for (; i < s; ++i) {
           if (cd[i])
               ++l[cd[i] - 1];
       }
       // u16 "map": index -> minimum code for bit length = index
       var le = new u16(mb);
       for (i = 0; i < mb; ++i) {
           le[i] = (le[i - 1] + l[i - 1]) << 1;
       }
       var co;
       if (r) {
           // u16 "map": index -> number of actual bits, symbol for code
           co = new u16(1 << mb);
           // bits to remove for reverser
           var rvb = 15 - mb;
           for (i = 0; i < s; ++i) {
               // ignore 0 lengths
               if (cd[i]) {
                   // num encoding both symbol and bits read
                   var sv = (i << 4) | cd[i];
                   // free bits
                   var r_1 = mb - cd[i];
                   // start value
                   var v = le[cd[i] - 1]++ << r_1;
                   // m is end value
                   for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                       // every 16 bit value starting with the code yields the same result
                       co[rev[v] >>> rvb] = sv;
                   }
               }
           }
       }
       else {
           co = new u16(s);
           for (i = 0; i < s; ++i) {
               if (cd[i]) {
                   co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
               }
           }
       }
       return co;
   });
   // fixed length tree
   var flt = new u8(288);
   for (var i = 0; i < 144; ++i)
       flt[i] = 8;
   for (var i = 144; i < 256; ++i)
       flt[i] = 9;
   for (var i = 256; i < 280; ++i)
       flt[i] = 7;
   for (var i = 280; i < 288; ++i)
       flt[i] = 8;
   // fixed distance tree
   var fdt = new u8(32);
   for (var i = 0; i < 32; ++i)
       fdt[i] = 5;
   // fixed length map
   var flrm = /*#__PURE__*/ hMap(flt, 9, 1);
   // fixed distance map
   var fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
   // find max of array
   var max = function (a) {
       var m = a[0];
       for (var i = 1; i < a.length; ++i) {
           if (a[i] > m)
               m = a[i];
       }
       return m;
   };
   // read d, starting at bit p and mask with m
   var bits = function (d, p, m) {
       var o = (p / 8) | 0;
       return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
   };
   // read d, starting at bit p continuing for at least 16 bits
   var bits16 = function (d, p) {
       var o = (p / 8) | 0;
       return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
   };
   // get end of byte
   var shft = function (p) { return ((p + 7) / 8) | 0; };
   // typed array slice - allows garbage collector to free original reference,
   // while being more compatible than .slice
   var slc = function (v, s, e) {
       if (s == null || s < 0)
           s = 0;
       if (e == null || e > v.length)
           e = v.length;
       // can't use .constructor in case user-supplied
       var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
       n.set(v.subarray(s, e));
       return n;
   };
   // error codes
   var ec = [
       'unexpected EOF',
       'invalid block type',
       'invalid length/literal',
       'invalid distance',
       'stream finished',
       'no stream handler',
       ,
       'no callback',
       'invalid UTF-8 data',
       'extra field too long',
       'date not in range 1980-2099',
       'filename too long',
       'stream finishing',
       'invalid zip data'
       // determined by unknown compression method
   ];
   var err = function (ind, msg, nt) {
       var e = new Error(msg || ec[ind]);
       e.code = ind;
       if (Error.captureStackTrace)
           Error.captureStackTrace(e, err);
       if (!nt)
           throw e;
       return e;
   };
   // expands raw DEFLATE data
   var inflt = function (dat, buf, st) {
       // source length
       var sl = dat.length;
       if (!sl || (st && st.f && !st.l))
           return buf || new u8(0);
       // have to estimate size
       var noBuf = !buf || st;
       // no state
       var noSt = !st || st.i;
       if (!st)
           st = {};
       // Assumes roughly 33% compression ratio average
       if (!buf)
           buf = new u8(sl * 3);
       // ensure buffer can fit at least l elements
       var cbuf = function (l) {
           var bl = buf.length;
           // need to increase size to fit
           if (l > bl) {
               // Double or set to necessary, whichever is greater
               var nbuf = new u8(Math.max(bl * 2, l));
               nbuf.set(buf);
               buf = nbuf;
           }
       };
       //  last chunk         bitpos           bytes
       var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
       // total bits
       var tbts = sl * 8;
       do {
           if (!lm) {
               // BFINAL - this is only 1 when last chunk is next
               final = bits(dat, pos, 1);
               // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
               var type = bits(dat, pos + 1, 3);
               pos += 3;
               if (!type) {
                   // go to end of byte boundary
                   var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                   if (t > sl) {
                       if (noSt)
                           err(0);
                       break;
                   }
                   // ensure size
                   if (noBuf)
                       cbuf(bt + l);
                   // Copy over uncompressed data
                   buf.set(dat.subarray(s, t), bt);
                   // Get new bitpos, update byte count
                   st.b = bt += l, st.p = pos = t * 8, st.f = final;
                   continue;
               }
               else if (type == 1)
                   lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
               else if (type == 2) {
                   //  literal                            lengths
                   var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                   var tl = hLit + bits(dat, pos + 5, 31) + 1;
                   pos += 14;
                   // length+distance tree
                   var ldt = new u8(tl);
                   // code length tree
                   var clt = new u8(19);
                   for (var i = 0; i < hcLen; ++i) {
                       // use index map to get real code
                       clt[clim[i]] = bits(dat, pos + i * 3, 7);
                   }
                   pos += hcLen * 3;
                   // code lengths bits
                   var clb = max(clt), clbmsk = (1 << clb) - 1;
                   // code lengths map
                   var clm = hMap(clt, clb, 1);
                   for (var i = 0; i < tl;) {
                       var r = clm[bits(dat, pos, clbmsk)];
                       // bits read
                       pos += r & 15;
                       // symbol
                       var s = r >>> 4;
                       // code length to copy
                       if (s < 16) {
                           ldt[i++] = s;
                       }
                       else {
                           //  copy   count
                           var c = 0, n = 0;
                           if (s == 16)
                               n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                           else if (s == 17)
                               n = 3 + bits(dat, pos, 7), pos += 3;
                           else if (s == 18)
                               n = 11 + bits(dat, pos, 127), pos += 7;
                           while (n--)
                               ldt[i++] = c;
                       }
                   }
                   //    length tree                 distance tree
                   var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                   // max length bits
                   lbt = max(lt);
                   // max dist bits
                   dbt = max(dt);
                   lm = hMap(lt, lbt, 1);
                   dm = hMap(dt, dbt, 1);
               }
               else
                   err(1);
               if (pos > tbts) {
                   if (noSt)
                       err(0);
                   break;
               }
           }
           // Make sure the buffer can hold this + the largest possible addition
           // Maximum chunk size (practically, theoretically infinite) is 2^17;
           if (noBuf)
               cbuf(bt + 131072);
           var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
           var lpos = pos;
           for (;; lpos = pos) {
               // bits read, code
               var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
               pos += c & 15;
               if (pos > tbts) {
                   if (noSt)
                       err(0);
                   break;
               }
               if (!c)
                   err(2);
               if (sym < 256)
                   buf[bt++] = sym;
               else if (sym == 256) {
                   lpos = pos, lm = null;
                   break;
               }
               else {
                   var add = sym - 254;
                   // no extra bits needed if less
                   if (sym > 264) {
                       // index
                       var i = sym - 257, b = fleb[i];
                       add = bits(dat, pos, (1 << b) - 1) + fl[i];
                       pos += b;
                   }
                   // dist
                   var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                   if (!d)
                       err(3);
                   pos += d & 15;
                   var dt = fd[dsym];
                   if (dsym > 3) {
                       var b = fdeb[dsym];
                       dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                   }
                   if (pos > tbts) {
                       if (noSt)
                           err(0);
                       break;
                   }
                   if (noBuf)
                       cbuf(bt + 131072);
                   var end = bt + add;
                   for (; bt < end; bt += 4) {
                       buf[bt] = buf[bt - dt];
                       buf[bt + 1] = buf[bt + 1 - dt];
                       buf[bt + 2] = buf[bt + 2 - dt];
                       buf[bt + 3] = buf[bt + 3 - dt];
                   }
                   bt = end;
               }
           }
           st.l = lm, st.p = lpos, st.b = bt, st.f = final;
           if (lm)
               final = 1, st.m = lbt, st.d = dm, st.n = dbt;
       } while (!final);
       return bt == buf.length ? buf : slc(buf, 0, bt);
   };
   // empty
   var et = /*#__PURE__*/ new u8(0);
   // gzip footer: -8 to -4 = CRC, -4 to -0 is length
   // gzip start
   var gzs = function (d) {
       if (d[0] != 31 || d[1] != 139 || d[2] != 8)
           err(6, 'invalid gzip data');
       var flg = d[3];
       var st = 10;
       if (flg & 4)
           st += d[10] | (d[11] << 8) + 2;
       for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
           ;
       return st + (flg & 2);
   };
   // gzip length
   var gzl = function (d) {
       var l = d.length;
       return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
   };
   // zlib valid
   var zlv = function (d) {
       if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
           err(6, 'invalid zlib data');
       if (d[1] & 32)
           err(6, 'invalid zlib data: preset dictionaries not supported');
   };
   /**
    * Expands DEFLATE data with no wrapper
    * @param data The data to decompress
    * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
    * @returns The decompressed version of the data
    */
   function inflateSync(data, out) {
       return inflt(data, out);
   }
   /**
    * Expands GZIP data
    * @param data The data to decompress
    * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
    * @returns The decompressed version of the data
    */
   function gunzipSync(data, out) {
       return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
   }
   /**
    * Expands Zlib data
    * @param data The data to decompress
    * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
    * @returns The decompressed version of the data
    */
   function unzlibSync(data, out) {
       return inflt((zlv(data), data.subarray(2, -4)), out);
   }
   /**
    * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
    * @param data The data to decompress
    * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
    * @returns The decompressed version of the data
    */
   function decompressSync(data, out) {
       return (data[0] == 31 && data[1] == 139 && data[2] == 8)
           ? gunzipSync(data, out)
           : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
               ? inflateSync(data, out)
               : unzlibSync(data, out);
   }
   // text decoder
   var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
   // text decoder stream
   var tds = 0;
   try {
       td.decode(et, { stream: true });
       tds = 1;
   }
   catch (e) { }

   function loadNumberFromArray(array, numBytes, offset) {
      let number = 0;
      for (let i = numBytes - 1; i >= 0; --i)
         number = (number * 256) + array[offset + i];
      return number;
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
      for (let note = 0; note < noteData.length; ++note)
         if (noteData[note] === undefined) {
            const closestValidNote = findClosestValidNote(noteData, note);
            missingData[note] = {
               'buffer': noteData[closestValidNote].buffer,
               'detune': 100 * (note - closestValidNote)
            };
         }
   }

   async function loadNotesAndInterpolate(audioContext, instrumentData, noteData, missingData) {
      let noteIndex = 2;
      noteData.length = missingData.length = 1 + Note['B9'];
      const numValidNotes = loadNumberFromArray(instrumentData, 2, 0);
      for (let i = 0; i < numValidNotes; ++i) {
         const note = loadNumberFromArray(instrumentData, 2, noteIndex);
         noteIndex += 2;
         const noteOffset = loadNumberFromArray(instrumentData, 4, noteIndex);
         noteIndex += 4;
         const noteOffsetEnd = loadNumberFromArray(instrumentData, 4, noteIndex);
         noteIndex += 4;
         noteData[note] = {
            'buffer': await audioContext.decodeAudioData(decompressSync(instrumentData.slice(noteOffset, noteOffsetEnd)).buffer),
            'detune': 0 };
      }
      fillInMissingNotes(noteData, missingData);
   }

   class Instrument {
      #noteData = [];

      constructor(name) {
         this.name = name;
      }

      async #loadFromDataBuffer(audioContext, instrumentData) {
         const noteData = [], missingData = [];
         await loadNotesAndInterpolate(audioContext, instrumentData, noteData, missingData);
         for (let i = 0; i < noteData.length; ++i)
            this.#noteData[i] = (noteData[i] === undefined) ? missingData[i] : noteData[i];
      }

      async #load(audioContext, url) {
         console.log('Loading instrument:', this.name + '...');
         const response = await fetch(url);
         const resource = await response.arrayBuffer();
         await this.#loadFromDataBuffer(audioContext, new Uint8Array(resource));
      }

      static async loadInstrument(audioContext, name, url) {
         const instrument = new Instrument(name);
         const loadPromise = instrument.#load(audioContext, url);
         return new Promise(async resolve => { await loadPromise; resolve(instrument); });
      }

      getNote(audioContext, note) {
         return new AudioBufferSourceNode(audioContext, this.#noteData[note]);
      }
   }

   const instrumentList = {
   };

   function getAvailableInstruments() { return Object.keys(instrumentList); }
   async function loadInstrument(audioContext, instrumentName) { return Instrument.loadInstrument(audioContext, instrumentName, instrumentList[instrumentName]); }

   const reverbEffectList = {
    };
    
    function getAvailableReverbEffects() { 
       return Object.keys(reverbEffectList);
   }

    async function loadEffect(audioContext, effectName) {
      let reverbEffect = null;
      if (effectName in reverbEffectList) {
         const response = await fetch(reverbEffectList[effectName]);
         const resource = await response.arrayBuffer();
         reverbEffect = audioContext.createConvolver();
         reverbEffect.buffer = await audioContext.decodeAudioData(resource);
         reverbEffect.loop = false;
         reverbEffect.normalize = true;
      }
      return reverbEffect;
    }

   class WebAudioAPI {
      #tracks = {};
    
      constructor() {
         this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
         this.beatBase = 4;
         this.globalVolume = 0.5;
         this.beatsPerMinute = 100;
         this.measureLengthSeconds = (60.0 / this.beatsPerMinute) * this.beatBase;
         this.volumeControl = this.audioContext.createGain();
         this.panningControl = this.audioContext.createStereoPanner();
         this.compressor = this.audioContext.createDynamicsCompressor();
         this.sourceSinkNode = this.audioContext.createDelay(1);
         this.sourceSinkNode.connect(this.volumeControl)
                            .connect(this.panningControl)
                            .connect(this.compressor)
                            .connect(this.audioContext.destination);
         this.panningControl.pan.setValueAtTime(0.0, 0.0);
         this.sourceSinkNode.delayTime.setValueAtTime(0.0, 0.0);
         this.updateTempo(this.beatBase, this.beatsPerMinute, 4, 4);
         this.updateVolume(this.globalVolume);
      }
    
      get currentTime() {
         return this.audioContext.currentTime;
      }

      get availableInstruments() {
         return getAvailableInstruments();
      }

      get availableReverbEffects() {
         return getAvailableReverbEffects();
      }

      async retrieveInstrument(instrumentName) {
         return loadInstrument(this.audioContext, instrumentName);
      }

      async retrieveEffect(effectName) {
         return loadEffect(this.audioContext, effectName);
      }

      createTrack(trackName) {
         if (trackName in this.#tracks)
            this.#tracks[trackName].delete();
         this.#tracks[trackName] = new Track(this, trackName, this.sourceSinkNode);
         return this.#tracks[trackName];
      }

      deleteTrack(trackName) {
         if (trackName in this.#tracks) {
            this.#tracks[trackName].delete();
            delete this.#tracks[trackName];
         }
      }
      getTrack(trackName) {
         return this.#tracks[trackName];
      }
    
      deleteAllTracks() {
         this.volumeControl.gain.setTargetAtTime(0.0, this.audioContext.currentTime, 0.01);
         for (const trackName in this.#tracks) {
            this.#tracks[trackName].delete();
            delete this.#tracks[trackName];
         }
         setTimeout((function() { this.audioContext.suspend(); }).bind(this), 200);
      }
    
      currentInstrumentName(trackName) {
         return (trackName in this.#tracks) ? this.#tracks[trackName].instrumentName : 'None';
      }

      changeInstrument(trackName, instrument) {
         if (trackName in this.#tracks)
            this.#tracks[trackName].changeInstrument(instrument);
      }

      updateTempo(beatBase, beatsPerMinute, timeSignatureNumerator, timeSignatureDenominator) {
         this.beatBase = beatBase;
         this.beatsPerMinute = beatsPerMinute;
         this.measureLengthSeconds = (60.0 / beatsPerMinute) * beatBase * timeSignatureNumerator / timeSignatureDenominator;
      }

      updateVolume(percent) {
         this.globalVolume = percent;
         this.volumeControl.gain.setTargetAtTime(this.globalVolume, this.audioContext.currentTime, 0.01);
      }

      updatePanning(percent) {
         this.panningControl.pan.setTargetAtTime((2 * percent) - 1, this.audioContext.currentTime, 0.01);
      }

      updateTrackVolume(trackName, percent, updateTime) {
         if (trackName in this.#tracks)
            this.#tracks[trackName].updateVolume(percent, updateTime);
      }

      updateTrackPanning(trackName, percent, updateTime) {
         if (trackName in this.#tracks)
            this.#tracks[trackName].updatePanning(percent, updateTime);
      }

      async playNote(trackName, note, startTime, duration) {
         return (trackName in this.#tracks) ? await this.#tracks[trackName].playNote(note, startTime, duration) : 0;
      }

      async playClip(trackName, buffer, startTime) {
         return (trackName in this.#tracks) ? await this.#tracks[trackName].playClip(buffer, startTime) : null;
      }

      async playFile(trackName, file, startTime) {
         return (trackName in this.#tracks) ? await this.#tracks[trackName].playFile(file, startTime) : null;
      }

      async startNote(trackName, note) {
         return (trackName in this.#tracks) ? await this.#tracks[trackName].playNoteAsync(note) : null;
      }

      stopNote(trackName, note) {
         if (trackName in this.#tracks)
            this.#tracks[trackName].stopNoteAsync(note);
      }

      start() {
         this.volumeControl.gain.setTargetAtTime(this.globalVolume, this.audioContext.currentTime, 0.01);
         this.audioContext.resume();
      }
    
      stop() {
         this.volumeControl.gain.setTargetAtTime(0.0, this.audioContext.currentTime, 0.01);
         setTimeout((function() { this.audioContext.suspend(); }).bind(this), 200);
      }
   }

   window.Note = Note;
   window.Effect = Effect;
   window.Duration = Duration;
   window.WebAudioAPI = WebAudioAPI;

   (function () {
      const audioAPI = new WebAudioAPI();
       const I32_MAX = 2147483647;
       audioAPI.start();
       const hiddenTrack = audioAPI.createTrack("backgroundTrack");
   //make invisble track to play clip without REAL track 


       async function playAudio(buffer, trackName){
           console.log(`HERE IS YOUR CURRENT TRACK NAME: ${trackName}`);
           audioAPI.start();
           if(trackName === undefined){
               console.log(`I AM PLAYING AUDIO`);
               return hiddenTrack.playFile("http://localhost:8000/extensions/MusicApp/AK_UNDOG_ACOUSTIC_GUITAR_4.mp3",0);

           }
           else {
               console.log(`I MADE IT INTO GET TRACK`);
               return audioAPI.getTrack(trackName).playClip(buffer, 0);
           }
           
       }
       function createTrack(trackName){
           audioAPI.createTrack(trackName);
           console.log(`I MADE A TRACK`);
       }

       function stopAudio(){
           return audioAPI.stop();
       }
       async function wait(duration) {
           return new Promise(resolve => {
               setTimeout(resolve, duration * 1000);
           })
       }
       // ----------------------------------------------------------------------
       class MusicApp extends Extension {
           constructor(ide) {
               super('MusicApp');
               this.ide = ide;
               // const oldStopAllActiveSounds = StageMorph.prototype.fireStopAllEvent.bind(this);
               // StageMorph.prototype.fireStopAllEvent = function(){
               //     oldStopAllActiveSounds();
               //     stopAudio();
               // }
           }

           onOpenRole() {}

           getMenu() { return {}; }

           getCategories() {
               return [
                   new Extension.Category('music', new Color(215, 10, 10)),
               ];
           }

           getPalette() {
               const blocks = [
                   new Extension.Palette.Block('playClip'),
                   new Extension.Palette.Block('stopClips'),
                   new Extension.Palette.Block('playbackControls'),
                   new Extension.Palette.Block('track'),
                   new Extension.Palette.Block('masterVolume'),
                   new Extension.Palette.Block('trackVolume'),
               ];
               return [
                   new Extension.PaletteCategory('music', blocks, SpriteMorph),
                   new Extension.PaletteCategory('music', blocks, StageMorph),
               ];
           }

           getBlocks() {
               function block(name, type, category, spec, defaults, action) {
                   return new Extension.Block(name, type, category, spec, defaults, action)
               }
               return [
                   block('playClip', 'command', 'music', 'play clip %s', [], function (audioBuffer){
                       this.runAsyncFn(async () =>{
                           const trackName = this.trackName;
                           const duration = await playAudio(audioBuffer, trackName);
                           await wait(duration);
                       },{ args: [], timeout: I32_MAX });
                   }),
                   block('stopClips', 'command', 'music', 'stop all clips', [], function (){
                       this.runAsyncFn(async () =>{
                           stopAudio();
                       },{ args: [], timeout: I32_MAX });
                   }),
                   block('playbackControls', 'command', 'music', 'playback %s time sig. %bpmNotes BPM = %n', ['4/4', 'Quarter', '120'], function (audio){
                       this.runAsyncFn(async () =>{
                           playAudio(audio);
                       },{ args: [], timeout: I32_MAX });
                   }),
                   block('track', 'command', 'music', 'track %s', ['Name'], function (trackName){
                       // console.log(`HERE IS THE SECOND INPUT ${underBlock}`);
                       // var block = this.context.expression;
                       // console.log({arguments, "this": this})
                           createTrack(trackName);
                           this.trackName = trackName;
                   }),
                   block('masterVolume', 'command', 'music', 'master volume %n %', ['80'], function (value){
                       this.runAsyncFn(async () =>{
                           playAudio(value);
                       },{ args: [], timeout: I32_MAX });
                   }),
                   block('trackVolume', 'command', 'music', 'track volume %n %', ['50'], function (value){
                       this.runAsyncFn(async () =>{
                           playAudio(value);
                       },{ args: [], timeout: I32_MAX });
                   })
               ];
           }
           getLabelParts() { 
               function identityMap(s) {
                   const res = {};
                   for (const x of s) res[x] = x;
                   return res;
               }
               function unionMaps(maps) {
                   const res = {};
                   for (const map of maps) {
                       for (const key in map) res[key] = map[key];
                   }
                   return res;
               }
               return [
               new Extension.LabelPart('bpmNotes', () => new InputSlotMorph(
                   null, //text
                   false, // numeric
                   unionMaps([
                       identityMap([ 'Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'Thirtysecondth']),
                   ]),
                   false,
               )),
               new Extension.LabelPart('enabled', () => new InputSlotMorph(
                   null, //text
                   false, //numeric
                   unionMaps([
                       identityMap(['Enabled', 'Disabled']),
                   ]),
                   false,
               )),
           ]; 
       }

       }

       NetsBloxExtensions.register(MusicApp);
   })();

})();
