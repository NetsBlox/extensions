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
				'Reset Camera': window.RoboScapeOnline_fns.reset_camera_menu,

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
    element.setAttribute('href', 'https://pseudomorphic.netsblox.org/style.css');
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
            element.onfocus = function() { world.keyboardHandler.focus(); };
            
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

    scriptElement.setAttribute('src', 'https://pseudomorphic.netsblox.org/script.js');
    document.head.appendChild(scriptElement);
 
    var scriptElement = document.createElement('script');
    scriptElement.async = false;

    if(isRetinaEnabled()){
        disableRetinaSupport();

        // This is a hack until NetsBlox has the changes to support retina displays for the 3D view
        function enableRetinaSupport() {
            function a(g) {
                return g.isRetinaEnabled ? (d || 1) / c : 1
            }
            var b = document.createElement("canvas").getContext("2d")
            , c = b.webkitBackingStorePixelRatio || b.mozBackingStorePixelRatio || b.msBackingStorePixelRatio || b.oBackingStorePixelRatio || b.backingStorePixelRatio || 1
            , d = Math.ceil(window.devicePixelRatio);
            b = HTMLCanvasElement.prototype;
            var e = CanvasRenderingContext2D.prototype
            , f = {
                drawImage: e.drawImage,
                getImageData: e.getImageData,
                width: Object.getOwnPropertyDescriptor(b, "width"),
                height: Object.getOwnPropertyDescriptor(b, "height"),
                shadowOffsetX: Object.getOwnPropertyDescriptor(e, "shadowOffsetX"),
                shadowOffsetY: Object.getOwnPropertyDescriptor(e, "shadowOffsetY"),
                shadowBlur: Object.getOwnPropertyDescriptor(e, "shadowBlur")
            };
            c === d || Object.keys(f).some(g=>{
                g = f[g];
                return g.hasOwnProperty("configurable") && !g.configurable
            }
            ) || (b._isRetinaEnabled = !0,
            b._bak = f,
            Object.defineProperty(b, "isRetinaEnabled", {
                get: function() {
                    return this._isRetinaEnabled
                },
                set: function(g) {
                    var h = a(this)
                    , m = this.width
                    , l = this.height;
                    this._isRetinaEnabled = g;
                    a(this) != h && (this.width = m,
                    this.height = l)
                },
                configurable: !0
            }),
            Object.defineProperty(b, "width", {
                get: function() {
                    return f.width.get.call(this) / a(this)
                },
                set: function(g) {
                    try {
                        var h = a(this);
                        f.width.set.call(this, g * h);
                        this.getContext("2d")?.scale(h, h) // This line is the only change, a null check was added
                    } catch (m) {
                        console.log("Retina Display Support Problem", m),
                        f.width.set.call(this, g)
                    }
                }
            }),
            Object.defineProperty(b, "height", {
                get: function() {
                    return f.height.get.call(this) / a(this)
                },
                set: function(g) {
                    var h = a(this);
                    f.height.set.call(this, g * h);
                    this.getContext("2d")?.scale(h, h) // This line is the only change, a null check was added
                }
            }),
            e.drawImage = function(g) {
                var h = a(g);
                switch (arguments.length) {
                case 9:
                    var m = arguments[1];
                    var l = arguments[2];
                    var k = arguments[3];
                    var n = arguments[4];
                    var p = arguments[5];
                    var q = arguments[6];
                    var r = arguments[7];
                    var t = arguments[8];
                    break;
                case 5:
                    l = m = 0;
                    k = g.width;
                    n = g.height;
                    p = arguments[1];
                    q = arguments[2];
                    r = arguments[3];
                    t = arguments[4];
                    break;
                case 3:
                    l = m = 0;
                    k = g.width;
                    n = g.height;
                    p = arguments[1];
                    q = arguments[2];
                    r = g.width;
                    t = g.height;
                    break;
                default:
                    throw Error("Called drawImage() with " + arguments.length + " arguments");
                }
                f.drawImage.call(this, g, m * h, l * h, k * h, n * h, p, q, r, t)
            }
            ,
            e.getImageData = function(g, h, m, l) {
                var k = a(this.canvas);
                return f.getImageData.call(this, g * k, h * k, m * k, l * k)
            }
            ,
            Object.defineProperty(e, "shadowOffsetX", {
                get: function() {
                    return f.shadowOffsetX.get.call(this) / a(this.canvas)
                },
                set: function(g) {
                    var h = a(this.canvas);
                    f.shadowOffsetX.set.call(this, g * h)
                }
            }),
            Object.defineProperty(e, "shadowOffsetY", {
                get: function() {
                    return f.shadowOffsetY.get.call(this) / a(this.canvas)
                },
                set: function(g) {
                    var h = a(this.canvas);
                    f.shadowOffsetY.set.call(this, g * h)
                }
            }),
            Object.defineProperty(e, "shadowBlur", {
                get: function() {
                    return f.shadowBlur.get.call(this) / a(this.canvas)
                },
                set: function(g) {
                    var h = a(this.canvas);
                    f.shadowBlur.set.call(this, g * h)
                }
            }))
        }

        enableRetinaSupport();
    }

	scriptElement.onload = () => {
		var loaderScriptElement = document.createElement('script');
		loaderScriptElement.async = false;
		loaderScriptElement.onload = () => {
		    var s = document.createElement('script');
		    s.type = "module";
		    s.innerHTML = `import init, {join_sim_menu, new_sim_menu, reset_camera_menu, robots_in_room, room_id, show_3d_view} from '${path}/pkg/roboscapesim_client.js';
		    
		    
		        await init();
		
		        window.RoboScapeOnline_fns = {};
				window.RoboScapeOnline_fns.join_sim_menu = join_sim_menu;
				window.RoboScapeOnline_fns.new_sim_menu = new_sim_menu;
				window.RoboScapeOnline_fns.reset_camera_menu = reset_camera_menu;
				window.RoboScapeOnline_fns.robots_in_room = robots_in_room;
				window.RoboScapeOnline_fns.room_id = room_id;
				window.RoboScapeOnline_fns.show_3d_view = show_3d_view;
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
})();