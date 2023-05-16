(function () {

    const I32_MAX = 2147483647;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();

    function playAudio(){
        return "Done";
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
                new Extension.Palette.Block('playAll'),
                new Extension.Palette.Block('stopAll'),
                new Extension.Palette.Block('pauseAll'),
                new Extension.Palette.Block('resumeAll'),
                new Extension.Palette.Block('loopForever'),
            ];
            return [
                new Extension.PaletteCategory('music', blocks, SpriteMorph),
                new Extension.PaletteCategory('music', blocks, StageMorph),
            ];
        }

        getBlocks() {
            function block(name, type, category, spec, defaults, action) {
                return new Extension.Block(name, type, category, spec, defaults, action).for(SpriteMorph, StageMorph)
            }
            return [
                block('playClip', 'command', 'music', 'play clip %s', [], function (audio){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('playbackControls', 'command', 'music', 'playback %s time sig. %bpmNotes BPM = %n', ['4/4', 'Quarter', '120'], function (audio){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('track', 'command', 'music', 'track %s %enabled %cs ', ['Name','Enabled'], function (tracks){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('masterVolume', 'command', 'music', 'master volume %n %', ['80'], function (value){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('trackVolume', 'command', 'music', 'track volume %n %', ['50'], function (value){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('playAll', 'command', 'music', 'play all', [], function (){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('stopAll', 'command', 'music', 'stop all', [], function (){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('pauseAll', 'command', 'music', 'pause all', [], function (){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('resumeAll', 'command', 'music', 'resume all', [], function (){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                }),
                block('loopForever', 'command', 'music', 'loop forever', [], function (){
                    this.runAsyncFn(async () =>{
                        playAudio();
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