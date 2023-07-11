(function () {    

    var _ports = {};
    var _lastID = 0;
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    class LineBreakTransformer {
        constructor() {
            this.container = '';
        }
      
        transform(chunk, controller) {
            this.container += chunk;
            const lines = this.container.split('\r\n');
            this.container = lines.pop();
            lines.forEach(line => controller.enqueue(line));
        }
      
        flush(controller) {
            controller.enqueue(this.container);
        }
    }

    class WebSerial extends Extension {
        constructor(ide) {
            super('WebSerial (wip)');
        }

        onOpenRole() {

        }

        getSettings() {
            return [];
        }

        getMenu() {
            return {};
        }

        getCategories() {
            return [];
        }

        getPalette() {
            return [
                new Extension.PaletteCategory(
                    'sensing',
                    [
                        new Extension.Palette.Block('connectSerial'),
                        new Extension.Palette.Block('getSerialDevices'),
                        new Extension.Palette.Block('readLineSerial'),
                        //new Extension.Palette.Block('writeSerial'),
                        //new Extension.Palette.Block('disconnectSerial'),
                    ],
                    SpriteMorph
                ),
                new Extension.PaletteCategory(
                    'sensing',
                    [
                        new Extension.Palette.Block('connectSerial'),
                        new Extension.Palette.Block('getSerialDevices'),
                        new Extension.Palette.Block('readLineSerial'),
                        //new Extension.Palette.Block('writeSerial'),
                        //new Extension.Palette.Block('disconnectSerial'),
                    ],
                    StageMorph
                )
            ];
        }

        getBlocks() {
            return [
                new Extension.Block(
                    'connectSerial',
                    'command',
                    'sensing',
                    'connect to Serial device at baud rate %baud',
                    [],
                    function (baud) { return this.runAsyncFn(async () => {
                        let port = await navigator.serial.requestPort();
                        let info = JSON.stringify(port.getInfo());
                        if(!Object.keys(_ports).includes(info) && !port.readable) {
                            await port.open({baudRate: baud || 9600 });       
                            console.log(port);
                            _ports[info] = {port, id: _lastID, writer: port.writable.getWriter()};
                            _ports[info].readerStream = port.readable
                                .pipeThrough(new TextDecoderStream())
                                .pipeThrough(new TransformStream(new LineBreakTransformer()));
                            _ports[info].reader = _ports[info].readerStream.getReader();
                            _lastID += 1;
                            console.log(_ports);
                        } else {
                            console.log("Already connected to " + info);
                        }
                    }, {timeout: 60000})}
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'getSerialDevices',
                    'reporter',
                    'sensing',
                    'get Serial devices',
                    [],
                    function () { 
                        return new List(Object.keys(_ports));
                    }
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'readLineSerial',
                    'reporter',
                    'sensing',
                    'read line from Serial device %device',
                    [],
                    function (device) { return this.runAsyncFn(async () => {
                        if(device.indexOf("{") == -1){
                            // Assume number
                            device = Number.parseInt(device) - 1;

                            if(device >= Object.keys(_ports).length){
                                throw Error("Serial device not found");
                            }

                            device = Object.keys(_ports)[device];
                        } else {
                            // Assume getInfo
                            if(!Object.keys(_ports).includes(device)){
                                throw Error("Serial device not found");
                            }
                        }

                        // device will have info of device in it at this point
                        device = _ports[device];

                        if(!device){
                            throw Error("Serial device not found");
                        }

                        return (await device.reader.read()).value;
                    }, {timeout: 1000})}
                ).for(SpriteMorph, StageMorph),
                /*new Extension.Block(
                    'disconnectSerial',
                    'command',
                    'sensing',
                    'disconnect from Serial %port',
                    [],
                    (roomID, password) => { joinRoom(roomID, password) }
                ).for(SpriteMorph, StageMorph)*/
            ];
        }

        getLabelParts() {
            return [
                /*new Extension.LabelPart(
                    '%port',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // non-numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),*/
                new Extension.LabelPart(
                    '%baud',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            true, // numeric
                            {'9600': 9600,
                            '19200': 19200,
                            '28800': 28800,
                            '38400': 38400,
                            '57600': 57600,
                            '76800': 76800,
                            '115200': 115200},
                            false
                        );
                        return part;
                    }
                ),
                new Extension.LabelPart(
                    '%device',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),
            ];
        }

    }

    window.externalVariables._serialPorts = _ports;

    NetsBloxExtensions.register(WebSerial);
})();
