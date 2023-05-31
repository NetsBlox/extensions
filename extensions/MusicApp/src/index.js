import {WebAudioAPI} from "./WebAudioAPI/library/webaudioapi/webAudioAPI";

(function () {
   const audioAPI = new WebAudioAPI();
    const I32_MAX = 2147483647;
    audioAPI.start();
    const backgroundTrack = audioAPI.createTrack("backgroundTrack");
//make invisble track to play clip without REAL track 

    async function playAudio(buffer){
        console.log(`I AM PLAYING AUDIO`);
        await backgroundTrack.playFile("http://localhost:8000/extensions/MusicApp/AK_UNDOG_ACOUSTIC_GUITAR_4.mp3",0);
    }
    function createTrack(trackName){
        console.log(`I MADE A TRACK`);
        audioAPI.createTrack(trackName);
    }
    // ----------------------------------------------------------------------
    class MusicApp extends Extension {
        constructor(ide) {
            super('MusicApp');
            this.ide = ide;
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
                        playAudio(audioBuffer);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('playbackControls', 'command', 'music', 'playback %s time sig. %bpmNotes BPM = %n', ['4/4', 'Quarter', '120'], function (audio){
                    this.runAsyncFn(async () =>{
                        playAudio(audio);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('track', 'command', 'music', 'track %s %cs', ['Name'], function (trackName){
                    // var block = this.context.expression;
                    // console.log({arguments, "this": this})
                    this.runAsyncFn(async () =>{
                        createTrack(trackName);
                    },{ args: [], timeout: I32_MAX });
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