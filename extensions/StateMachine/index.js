/**
 * The following file is generated through a build script. Manually modifying it is an at-your-own-risk activity and your changes will likely be overridden.
 */

(function () {    
    class StateMachine extends Extension {
        constructor(ide) {
            super('StateMachine');
        }

        onOpenRole() {

        }

        getSettings() {
            return [

            ];
        }

        getMenu() {
            return {
				'Visualize': window.StateMachine_fns.visualize,
				'Copy Stateflow Code': window.StateMachine_fns.copy_stateflow_code,

            };
        }

        getCategories() {
            return [
				new Extension.Category('StateMachine', new Color(150, 150, 150)),

            ];
        }

        getPalette() {
            return [
				new Extension.PaletteCategory(
					'StateMachine',
					[
						new Extension.Palette.Block('smTransition'),
						new Extension.Palette.Block('smInState'),
					],
					SpriteMorph
				),
				new Extension.PaletteCategory(
					'StateMachine',
					[
						new Extension.Palette.Block('smTransition'),
						new Extension.Palette.Block('smInState'),
					],
					StageMorph
				),

            ];
        }

        getBlocks() {
            return [
				new Extension.Block(
					'smTransition',
					'command',
					'StateMachine',
					'transition %var to state %s',
					[],
					function (v0, v1) { return window.StateMachine_fns.transition(this, v0, v1); }
				).terminal().for(SpriteMorph, StageMorph),
				new Extension.Block(
					'smInState',
					'predicate',
					'StateMachine',
					'%var in state %s ?',
					[],
					function (v0, v1) { return window.StateMachine_fns.check_state(this, v0, v1); }
				).for(SpriteMorph, StageMorph),

            ];
        }

        getLabelParts() {
            return [

            ];
        }

    }

    NetsBloxExtensions.register(StateMachine);
    let path = document.currentScript.src;
    path = path.substring(0, path.lastIndexOf("/"));
    var s = document.createElement('script');
    s.type = "module";
    s.innerHTML = `import init, {check_state, copy_stateflow_code, transition, visualize} from '${path}/pkg/netsblox_stateflow_ext.js';
    
    
        await init();

        window.StateMachine_fns = {};
		window.StateMachine_fns.check_state = check_state;
		window.StateMachine_fns.copy_stateflow_code = copy_stateflow_code;
		window.StateMachine_fns.transition = transition;
		window.StateMachine_fns.visualize = visualize;
        `;
    document.body.appendChild(s);
})();