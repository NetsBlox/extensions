(function () {

    var _open3d = function() {
        if (window.externalVariables.roboscapeSimCanvasInstance) {
            window.externalVariables.roboscapeSimCanvasInstance.show();
        }

        if (!engine) {
            activateBabylon();
        }
    };

    class RoboScapeSim extends Extension {
        constructor(ide) {  
            super('RoboScape Simulator');   
        }

        onOpenRole() {
            console.log('onOpenRole');
            roboscapeSimCanvasInstance.popUp(world);
            roboscapeSimCanvasInstance.hide();
        }

        getMenu() {
            return {
                'New Room': function () {
                    connectToRoboScapeSim().then(() => {
                        window.externalVariables.roboscapeSimCanvasInstance.hideCanvas();
                        const dialog = new DialogBoxMorph().withKey('NewRoboScapeSimRoom');
                        const roomIdField = new InputFieldMorph();
                        const roomPasswordField = new InputFieldMorph();
                        const environmentField = new InputFieldMorph(null, false, availableEnvironments.reduce((p, c) => {
                            console.log(c);
                            p[c.Name] = c.ID;
                            return p;
                        }, {}), true);
                        const bdy = new AlignmentMorph('column', this.padding);
                    
                        roomIdField.setWidth(200);

                        dialog.labelString = `New Room`;
                        dialog.createLabel();

                        bdy.add(new TextMorph('Room Password:'));
                        bdy.add(roomPasswordField);
                        bdy.fixLayout();
                        dialog.addBody(bdy);

                        bdy.add(new TextMorph('Environment:'));
                        bdy.add(environmentField);
                        bdy.fixLayout();
                        dialog.addBody(bdy);

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

                        dialog.fixLayout();
                        dialog.popUp(world);
                        
                    });
                },
                'Join Room': function () {
                    connectToRoboScapeSim().then(() => {
                        window.externalVariables.roboscapeSimCanvasInstance.hideCanvas();
                        const dialog = new DialogBoxMorph().withKey('JoinRoboScapeSimRoom');
                        const roomIdField = new InputFieldMorph(null, false, availableRooms.reduce((p, r) => {
                            console.log(r);
                            p[r] = r;
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
                'Open 3D view': function () {
                    _open3d();
                }
            };
        }

        getCategories() {
            return [];
        }

        getPalette() {
            return [];
        }

        getBlocks() {
            return [];
        }

        getLabelParts() {
            return [];
        }

    }

    if (window.origin.includes('localhost')) {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://localhost:8080/src/babylon-roboscapesim.js';
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
        script.src = 'https://extensions.netsblox.org/extensions/RoboScapeOnline/js/babylon-roboscapesim.js';
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
