/**
 * The following file is generated through a build script. Manually modifying it is an at-your-own-risk activity and your changes will likely be overridden.
 */

(function () {    
    class RoboScapeOnline extends Extension {
        constructor(ide) {
            super('RoboScape Online');
        }

        onOpenRole() {

        }

        getSettings() {
            return [
				Extension.ExtensionSetting.createFromLocalStorage('Beeps Enabled', 'roboscape_beep', true, 'Robots can beep', 'Robots cannot beep', false),
				Extension.ExtensionSetting.createFromLocalStorage('Robot ID Billboards Enabled', 'roboscape_id_billboards', true, 'Robot IDs show over heads', 'Robots IDs hidden', false),

            ];
        }

        getMenu() {
            return {
				'New simulation...': window.RoboScapeOnline_fns.new_sim_menu,
				'Join room...': window.RoboScapeOnline_fns.join_sim_menu,
				'Show 3D View': window.RoboScapeOnline_fns.show_3d_view,

            };
        }

        getCategories() {
            return [

            ];
        }

        getPalette() {
            return [
				new Extension.PaletteCategory(
					'network',
					[
						new Extension.Palette.Block('robotsInRoom'),
						new Extension.Palette.Block('roomID'),
					],
					SpriteMorph
				),
				new Extension.PaletteCategory(
					'network',
					[
						new Extension.Palette.Block('robotsInRoom'),
						new Extension.Palette.Block('roomID'),
					],
					StageMorph
				),

            ];
        }

        getBlocks() {
            return [
				new Extension.Block(
					'robotsInRoom',
					'reporter',
					'network',
					'robots in room',
					[],
					function () { return RoboScapeOnline_fns.robots_in_room(); }
				).for(SpriteMorph, StageMorph),
				new Extension.Block(
					'roomID',
					'reporter',
					'network',
					'RoboScape room id',
					[],
					function () { return RoboScapeOnline_fns.room_id(); }
				).for(SpriteMorph, StageMorph),

            ];
        }

        getLabelParts() {
            return [

            ];
        }

    }

    NetsBloxExtensions.register(RoboScapeOnline);
    let path = document.currentScript.src;
    path = path.substring(0, path.lastIndexOf("/"));


    // Add CSS
    var element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', 'https://gsteinltu.github.io/PseudoMorphic/style.css');
    document.head.appendChild(element);

    var extraStyle = document.createElement('style');
    extraStyle.innerText = `
    #roboscapebuttonbar * {
        margin: auto 5px;
    }
    `;
    document.head.appendChild(extraStyle);

    // Add JS
    var scriptElement = document.createElement('script');

    scriptElement.onload = () => {        
        // Create 3D view dialog for later use
        {
            var element = createDialog('RoboScape Online');
            element.style.width = '400px';
            element.style.height = '400px';
            const canvas = document.createElement('canvas');
            canvas.id = 'roboscape-canvas';
            canvas.style.flex = '1 1 auto';
            canvas.style.overflow = 'hidden';
            const contentElement = element.querySelector('content');
            contentElement.style.display = 'flex';
            contentElement.style['flex-flow'] = 'column';
            contentElement.style['justify-content'] = 'flex-end';
            contentElement.appendChild(canvas);
            setupDialog(element);
            
            window.externalVariables['roboscapedialog'] = element;

            
            const buttonbar = document.createElement('div');
            buttonbar.id = 'roboscapebuttonbar';
            buttonbar.style.flex = '0 1';
            element.querySelector('content').appendChild(buttonbar);
            
            const robotmenu_label = document.createElement('label');
            robotmenu_label.innerText = 'Robot ID:';
            buttonbar.appendChild(robotmenu_label);
            const robotmenu = document.createElement('select');
            robotmenu.className = 'inset';
            robotmenu.onpointerdown = (e) => { e.stopPropagation(); disableDrag(); };
            const nonchoice = document.createElement('option');
            robotmenu.appendChild(nonchoice);
            buttonbar.appendChild(robotmenu);
            window.externalVariables['roboscapedialog-robotmenu'] = robotmenu;
        }

        // Create join dialog for later use
        {
            var element = document.createElement('datalist');
            element.id = 'roboscapedialog-join-rooms-list';
            document.body.appendChild(element);
            window.externalVariables['roboscapedialog-join-rooms-list'] = element;

            element = createDialog('Join a Session', false, ['Join', 'Close']);
            element.querySelector('content').innerHTML += `
            <div style="margin-bottom: 12px;"><label>Room ID:&nbsp;</label><input list="roboscapedialog-join-rooms-list" class="inset"/></div>
            <div><label>Password:&nbsp;</label><input class="inset"/></div>
            `;

            setupDialog(element, false);
            window.externalVariables['roboscapedialog-join'] = element;


            element = document.createElement('datalist');
            element.id = 'roboscapedialog-new-environments-list';
            document.body.appendChild(element);
            window.externalVariables['roboscapedialog-new-environments-list'] = element;

            element = createDialog('Create a Session', false, ['Create', 'Edit Mode', 'Close']);
            element.querySelector('content').innerHTML += `
            <div style="margin-bottom: 12px;"><label>Environment:&nbsp;</label><input list="roboscapedialog-new-environments-list" id="roboscapedialog-new-environment" class="inset"/></div>
            <div><label>Password:&nbsp;</label><input id="roboscapedialog-new-password" class="inset"/></div>
            `;

            setupDialog(element, false);
            window.externalVariables['roboscapedialog-new'] = element;

        }
    };

    scriptElement.setAttribute('src', 'https://gsteinltu.github.io/PseudoMorphic/script.js');
    document.head.appendChild(scriptElement);
 
    var scriptElement = document.createElement('script');
    scriptElement.async = false;

	scriptElement.onload = () => {
		var loaderScriptElement = document.createElement('script');
		loaderScriptElement.async = false;
		loaderScriptElement.onload = () => {
		    var s = document.createElement('script');
		    s.type = "module";
		    s.innerHTML = `import init, {join_sim_menu, room_id, robots_in_room, show_3d_view, new_sim_menu} from '${path}/pkg/roboscapesim_client.js';
		    
		    
		        await init();
		
		        window.RoboScapeOnline_fns = {};
				window.RoboScapeOnline_fns.join_sim_menu = join_sim_menu;
				window.RoboScapeOnline_fns.room_id = room_id;
				window.RoboScapeOnline_fns.robots_in_room = robots_in_room;
				window.RoboScapeOnline_fns.show_3d_view = show_3d_view;
				window.RoboScapeOnline_fns.new_sim_menu = new_sim_menu;
		        `;
		    document.body.appendChild(s);
		};
		loaderScriptElement.setAttribute('src', 'https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js');
		document.head.appendChild(loaderScriptElement);
		var guiScriptElement = document.createElement('script');
		guiScriptElement.async = false;
		guiScriptElement.setAttribute('src', 'https://preview.babylonjs.com/gui/babylon.gui.js');
		document.head.appendChild(guiScriptElement);
	};
	scriptElement.setAttribute('src', 'https://preview.babylonjs.com/babylon.js');
	document.head.appendChild(scriptElement);
	disableRetinaSupport();
})();