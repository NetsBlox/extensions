import {WebAudioAPI} from "./WebAudioAPI/library/webaudioapi/webAudioAPI";

(function () {
   const audioAPI = new WebAudioAPI();
    const I32_MAX = 2147483647;
  
    const backgroundTrack = audioAPI.createTrack("backgroundTrack");
    audioAPI.start();
    const initialClock = audioAPI.currentTime;

    function base64toArrayBuffer(base64){
        var binaryString = atob(base64.replace("data:audio/mpeg;base64,", ""));
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    async function playAudio(binaryString, trackName){
        console.log(`HERE IS THE CLOCK: ${audioAPI.currentTime}`);
        const buffer = base64toArrayBuffer(binaryString.audio.src);
        audioAPI.start();
        if(trackName === undefined){
            return audioAPI.playClip("backgroundTrack",buffer,0);

        }
        else {
            return audioAPI.playClip(trackName, buffer, 0);
        }
        
    }
    function createTrack(trackName){
        audioAPI.createTrack(trackName);
    }

    function stopAudio(){
        audioAPI.stop();
        audioAPI.deleteAllTracks();
    }

    function masterVolume(percent){
        return audioAPI.updateVolume(null, percent, null);
    }
    function trackVolume(trackName, percent){
        return audioAPI.updateVolume(trackName, percent, 0);
    }
    function  beatsPerMinute(bpm){
        return audioAPI.updateBeatsPerMinute(bpm);
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
            const oldStopAllActiveSounds = StageMorph.prototype.doStopAll;
            StageMorph.prototype.doStopAll = function(){
                oldStopAllActiveSounds();
                stopAudio();
            }
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
                new Extension.Palette.Block('setGlobalBPM'),
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
                        console.log(`HERE IS THE CLIP CLOCK: ${audioAPI.currentTime}`);
                        await wait(duration-.02);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('stopClips', 'command', 'music', 'stop all clips', [], function (){
                    stopAudio();
                    this.doStopAll();
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
                block('masterVolume', 'command', 'music', 'master volume %n %', ['80'], function (percent){
                    masterVolume(percent * 0.01);
                }),
                block('trackVolume', 'command', 'music', 'track volume %n %', ['50'], function (percent){
                    const trackName = this.trackName;
                    trackVolume(trackName,percent* 0.01);
                }),
                block('setGlobalBPM', 'command', 'music','set global BPM %n', ['120'], function (bpm){
                    beatsPerMinute(bpm);
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