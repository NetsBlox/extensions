(function () {
    class StateMachine extends Extension {
        constructor(ide) {
            super('StateMachine');
        }

        getMenu() {
            return {
                'visualize': function () {
                    alert('Coming Soon!');
                },
            };
        }

        getCategories() {
            return [
                new Extension.Category('StateMachine', new Color(150, 150, 150)),
            ];
        }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('smTransition'),
                new Extension.Palette.Block('smInState'),
            ];
            return [
                new Extension.PaletteCategory('StateMachine', blocks, SpriteMorph),
                new Extension.PaletteCategory('StateMachine', blocks, StageMorph),
            ];
        }

        getBlocks() {
            return [
                new Extension.Block('smTransition', 'command', 'StateMachine', 'transition %var to state %s', [], function (machine, state) {
                    this.doSetVar(machine, state);
                    this.doStop();
                }).terminal().for(SpriteMorph, StageMorph),
                new Extension.Block('smInState', 'predicate', 'StateMachine', '%var in state %s ?', [], function (machine, state) {
                    const variables = this.context.variables;
                    return variables.getVar(machine) == state;
                }).for(SpriteMorph, StageMorph),
            ];
        }
    }

    NetsBloxExtensions.register(StateMachine);
})();
