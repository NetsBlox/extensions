import {WebAudioAPI} from "./WebAudioAPI/library/webaudioapi/webAudioAPI";

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