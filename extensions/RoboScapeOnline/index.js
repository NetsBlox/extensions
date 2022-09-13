(function () {

    var _open3d = function () {
        if (window.externalVariables.roboscapeSimCanvasInstance) {
            window.externalVariables.roboscapeSimCanvasInstance.show();
        }

        if (!engine) {
            activateBabylon();
        }
    };

    var _close3d = function () {
        if (window.externalVariables.roboscapeSimCanvasInstance) {
            window.externalVariables.roboscapeSimCanvasInstance.hide();
        }
    };

    class RoboScapeSim extends Extension {
        constructor(ide) {
            super('RoboScape Simulator');
        }

        onOpenRole() {
            console.log('onOpenRole');
            roboscapeSimCanvasInstance.popUp(world);

            if (!roomID) {
                roboscapeSimCanvasInstance.hide();
            } else {
                roboscapeSimCanvasInstance.handle.fixLayout();
            }
        }

        getMenu() {
            return {
                'New Room': function () {
                    updateEnvironmentsList().then(() => {
                        window.externalVariables.roboscapeSimCanvasInstance.hideCanvas();
                        const dialog = new DialogBoxMorph().withKey('NewRoboScapeSimRoom');
                        const roomPasswordField = new InputFieldMorph();
                        const environmentField = new DictMenuInputFieldMorph(null, false, availableEnvironments.reduce((p, c) => {

                            if (c.Category) {
                                if (!p[c.Category]) {
                                    p[c.Category] = {};
                                }

                                p[c.Category][c.Name] = c.ID;
                            } else {
                                p[c.Name] = c.ID;
                            }
                            return p;
                        }, {}), true);
                        const bdy = new AlignmentMorph('column', 2);

                        const row1 = new AlignmentMorph('row', 2);

                        row1.add(new TextMorph('Room Password:'));
                        row1.add(roomPasswordField);
                        row1.fixLayout();
                        bdy.add(row1);

                        const row2 = new AlignmentMorph('row', 2);
                        row2.add(new TextMorph('Environment:'));
                        row2.add(environmentField);
                        row2.fixLayout();
                        bdy.add(row2);
                        bdy.fixLayout();
                        dialog.addBody(bdy);
                        dialog.fixLayout();

                        dialog.addButton('submit', 'Create Room');
                        dialog.submit = () => {
                            newRoom(environmentField.getValue(), roomPasswordField.getValue());
                            _open3d();
                            window.externalVariables.roboscapeSimCanvasInstance.showCanvas();
                            dialog.destroy();
                        };
                        dialog.addButton('cancel', 'Close');
                        dialog.ok = () => this.grade(this.currentAssignment);
                        dialog.cancel = () => {
                            DialogBoxMorph.prototype.cancel.call(dialog);
                            window.externalVariables.roboscapeSimCanvasInstance.showCanvas();
                        };

                        dialog.labelString = `New Room`;
                        dialog.createLabel();
                        dialog.fixLayout();

                        bdy.setWidth(dialog.width());
                        bdy.fixLayout();
                        dialog.fixLayout();
                        dialog.popUp(world);

                    });
                },
                'Join Room': async function () {
                    window.externalVariables.roboscapeSimCanvasInstance.hideCanvas();

                    updateRoomsList().then(() => {

                        console.log("updated rooms")

                        // Pause for response
                        const dialog = new DialogBoxMorph().withKey('JoinRoboScapeSimRoom');
                        const roomIdField = new InputFieldMorph(null, false, availableRooms.reduce((p, r) => {
                            console.log(r);
                            p[r.id + ' (' + r.environment + ')'] = r.id;
                            return p;
                        }, {}), false);
                        const roomPasswordField = new InputFieldMorph();
                        const bdy = new AlignmentMorph('column', this.padding);

                        roomIdField.setWidth(200);

                        dialog.labelString = `Join Room`;
                        dialog.createLabel();


                        bdy.add(new TextMorph('Room ID:'));
                        bdy.add(roomIdField);
                        bdy.fixLayout();
                        dialog.addBody(bdy);

                        bdy.add(new TextMorph('Room Password:'));
                        bdy.add(roomPasswordField);
                        roomPasswordField.contents().text.toggleIsPassword();
                        bdy.fixLayout();
                        dialog.addBody(bdy);

                        dialog.addButton('submit', 'Join Room');
                        dialog.submit = () => {
                            joinRoom(roomIdField.getValue(), '', roomPasswordField.getValue());
                            _open3d();
                            window.externalVariables.roboscapeSimCanvasInstance.showCanvas();
                            dialog.destroy();
                        };
                        dialog.addButton('cancel', 'Close');
                        dialog.ok = () => this.grade(this.currentAssignment);
                        dialog.cancel = () => {
                            DialogBoxMorph.prototype.cancel.call(dialog);
                            window.externalVariables.roboscapeSimCanvasInstance.showCanvas();
                        };

                        dialog.fixLayout();
                        dialog.popUp(world);
                    });
                },
                'Open 3D View': function () {
                    _open3d();
                },
                'Copy Room ID': function () {
                    if (roomID) {
                        navigator.clipboard.writeText(roomID);
                    }
                },
                'Reset Cameras': function () {
                    if (followCam) {
                        followCam.heightOffset = 1.25;
                        followCam.radius = 2;
                        followCam.rotationOffset = 0;
                    }

                    if (camera) {
                        camera.position = new BABYLON.Vector3(0, 6, -2)
                        camera.setTarget(new BABYLON.Vector3(0, 0, 0));
                        scene.activeCamera = camera;
                    }
                },
                'Disable/Enable Beeps': function () {
                    beepsDisabled = !beepsDisabled;
                },
            };
        }

        getCategories() {
            return [];
        }

        getPalette() {
            return [
                new Extension.PaletteCategory(
                    'network',
                    [
                        new Extension.Palette.Block('robotsInRoom'),
                        new Extension.Palette.Block('inRoboScapeRoom'),
                        new Extension.Palette.Block('roboScapeRoomID'),
                        new Extension.Palette.Block('show3Dview'),
                        new Extension.Palette.Block('hide3Dview'),
                        new Extension.Palette.Block('joinRoom'),
                    ],
                    SpriteMorph
                ),
                new Extension.PaletteCategory(
                    'network',
                    [
                        new Extension.Palette.Block('robotsInRoom'),
                        new Extension.Palette.Block('inRoboScapeRoom'),
                        new Extension.Palette.Block('roboScapeRoomID'),
                        new Extension.Palette.Block('show3Dview'),
                        new Extension.Palette.Block('hide3Dview'),
                        new Extension.Palette.Block('joinRoom'),
                    ],
                    StageMorph
                )
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
                    () => new List(Object.keys(bodiesInfo).filter(label => label.startsWith('robot')).map(label => label.slice(6)))
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'inRoboScapeRoom',
                    'predicate',
                    'network',
                    'in RoboScape room',
                    [],
                    () => !!roomID
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'roboScapeRoomID',
                    'reporter',
                    'network',
                    'RoboScape room ID',
                    [],
                    () => (!!roomID) ? roomID : false
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'show3Dview',
                    'command',
                    'network',
                    'show 3D view',
                    [],
                    _open3d
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'hide3Dview',
                    'command',
                    'network',
                    'hide 3D view',
                    [],
                    _close3d
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'joinRoom',
                    'command',
                    'network',
                    'join RoboScape room %roomID with password %password',
                    [],
                    (roomID, password) => { joinRoom(roomID, password) }
                ).for(SpriteMorph, StageMorph)
            ];
        }

        getLabelParts() {
            return [
                new Extension.LabelPart(
                    '%roomID',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // non-numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),
                new Extension.LabelPart(
                    '%password',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // non-numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),
            ];
        }

    }

    if (window.origin.includes('localhost')) {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://localhost:8080/src/roboscapesim-ui.js';
        script.async = false;
        document.body.appendChild(script);

        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://localhost:8080/src/roboscapesim-babylon.js';
        script.async = false;
        document.body.appendChild(script);

        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://localhost:8080/src/roboscapesim.js';
        script.async = false;
        document.body.appendChild(script);
    } else {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://extensions.netsblox.org/extensions/RoboScapeOnline/js/roboscapesim-ui.js';
        script.async = false;
        document.body.appendChild(script);

        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://extensions.netsblox.org/extensions/RoboScapeOnline/js/roboscapesim-babylon.js';
        script.async = false;
        document.body.appendChild(script);

        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://extensions.netsblox.org/extensions/RoboScapeOnline/js/roboscapesim.js';
        script.async = false;
        document.body.appendChild(script);
    }

    NetsBloxExtensions.register(RoboScapeSim);
})();
