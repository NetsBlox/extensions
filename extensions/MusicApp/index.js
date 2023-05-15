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
                new Extension.Palette.Block('playAudio')
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
                block('playAudio', 'command', 'music', 'play audio %s', [], function (audio){
                    this.runAsyncFn(async () =>{
                        playAudio();
                    },{ args: [], timeout: I32_MAX });
                })
            ];
        }
        getLabelParts() { return []; }

    }

    NetsBloxExtensions.register(MusicApp);
})();