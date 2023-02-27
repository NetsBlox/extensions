(function () {
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
                new Extension.Palette.Block('playSingleTrack'),
                new Extension.Palette.Block('playMultipleTracks'),
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
                block('playSingleTrack', 'reporter', 'music', 'play single track', [], function (){return Date.now()}),
                block('playMultipleTracks', 'command', 'music', 'play multiple tracks', [], x => x),

            ];
        }
        getLabelParts() { return []; }

    }

    NetsBloxExtensions.register(MusicApp);
})();