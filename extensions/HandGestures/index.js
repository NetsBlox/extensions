// const { difference } = require("lodash");
(function () {
    
    async function loadVisionModule() {
        const module = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6');
        return module;
    }
    
    function getVisionModule() {
        if(VisionModule){
            return VisionModule;
        }
        modulePromise = loadVisionModule();
        modulePromise.then((module) => {
            console.log("I am getting the vision module");
            console.log(module);
            return module, 3;
        }, 
            () => {throw Error('Failed to load vision module')});
    }

    const VisionModule = getVisionModule();
    
    class VisionHandle {
        constructor() {
            this.expiry = 0;
            this.resolve = null;
            
            this.vision = null;
            this.gestureRecognizer = 'u'; // u = uninitialized, l = loading 
            this.generateTask();
        }

        async generateTask() {
            if(this.gestureRecognizer !== 'l' && this.gestureRecognizer !== 'u')
                throw Error('Task is already generated');
            if(this.gestureRecognizer == 'l')
                throw Error('Task is currently loading');

            this.gestureRecognizer = 'l';
            this.vision = await VisionModule.FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6/wasm"
            );
             this.gestureRecognizer = await VisionModule.GestureRecognizer.createFromOptions(this.vision, {
                baseOptions: {
                    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task"
                },
                numHands: 2,
                runningMode: "IMAGE"
            })
        }

        async infer(image){
            if(this.gestureRecognizer == 'u') throw Error('Task is not initialized');
            if(this.gestureRecognizer == 'l') throw Error('Task is loading');
            if(this.resolve !== null) throw Error('VisionHandler is currently in use');
            this.resolve = 'loading...';
            this.expiry = +new Date() + 10000;

            return await new Promise(async resolve => {
                this.resolve = null;
                resolve(this.gestureRecognizer.recognize(image));
            })
        }

        isIdle() {
            if (this.resolve === null) return true;
            if (+new Date() > this.expiry) {
                this.resolve = null;
                return true;
            }
            return false;
        }
    }        
        
    const VISION_HANDLES = [];
    function getVisionHandle() {
        for (const handle of VISION_HANDLES) {
            if (handle.isIdle()) 
                return handle;
        }
        const handle = new VisionHandle();
        VISION_HANDLES.push(handle);
        return handle;
    }


    class HandsHandle {
        constructor() {
            this.resolve = null;
            this.expiry = 0;

            this.rawHandle = new Hands({
                locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
            });
            this.rawHandle.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });
            this.rawHandle.onResults(results => {
                const resolve = this.resolve;
                this.resolve = null;
                if (resolve !== null) resolve(results); // make sure resolve didn't expire
            });
        }
        async infer(image) {
            if (this.resolve !== null) throw Error('HandsHandle is currently in use');
            this.resolve = 'loading...'; // must immediately set resolve to non-null (gets real value async-ly later)
            this.expiry = +new Date() + 10000; // if not resolved by this time, invalidate

            return await new Promise(async resolve => {
                this.resolve = resolve;
                await this.rawHandle.send({ image });
            });
        }
        isIdle() {
            if (this.resolve === null) return true;
            if (+new Date() > this.expiry) {
                this.resolve = null;
                return true;
            }
            return false;
        }

        // This function takes new model parameters and sets them for the current handler
        setHandleOptions({newDetConf = this.rawHandle.h.l.minDetectionConfidence, newTracConf = this.rawHandle.h.l.minTrackingConfidence, newMaxHands = this.rawHandle.h.l.maxNumHands,newModComp = this.rawHandle.h.l.modelComplexity} = {}) {
            
            if(newDetConf < 0 || newDetConf > 1 || newTracConf < 0 || newTracConf > 1 || newMaxHands < 0 || newMaxHands > 4 || newModComp < 0 || newModComp > 1)
            {
                console.log("Error: invalid Options value");
                return 1;
            }
            this.rawHandle.setOptions({
                maxNumHands: newMaxHands,
                modelComplexity: newModComp,
                minDetectionConfidence: newDetConf,
                minTrackingConfidence: newTracConf,
            })
            return 0;
        }
   }

    const HANDS_HANDLES = [];
    function getHandsHandle() {
        for (const handle of HANDS_HANDLES) {
            if (handle.isIdle()) return handle;
        }
        const handle = new HandsHandle();
        HANDS_HANDLES.push(handle);
        return handle;
    }
    
    async function findNewHands(image) {
        const handle = getVisionHandle();
        let handData = await handle.infer(image);
        return handData;
    }

    async function findHands(image) {
        const handle = getHandsHandle();
        let handData = await handle.infer(image);
        return handData;
    }
    async function renderHands(image) {
        const data = await findHands(image);
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        for (const landmarks of data.multiHandLandmarks) {
            drawConnectors(context, landmarks, HAND_CONNECTIONS, { color: '#00ff00', lineWidth: 3 });
            drawLandmarks(context, landmarks, { color: '#ff0000', lineWidth: 1 });
        }

        return canvas;
    }

    function snapify(value) {
        if (Array.isArray(value)) {
            const res = [];
            for (const item of value) res.push(snapify(item));
            return new List(res);
        } else if (typeof(value) === 'object') {
            const res = [];
            for (const key in value) res.push(new List([key, snapify(value[key])]));
            return new List(res);
        } else return value;
    }

    function parseHandLandmarks(data, landmark, img) {
        const landmarkCoords = data.map(coords => coords.map(p => [p.x, p.y, p.z]));
        
        if(landmarkCoords.length === 0) return landmarkCoords;

        const landmarks = ['WRIST','THUMB_cmc','THUMB_mcp','THUMB_ip','THUMB_tip', 
                           'INDEX_mcp','INDEX_pip','INDEX_dip','INDEX_tip',
                           'MIDDLE_mcp','MIDDLE_pip','MIDDLE_dip','MIDDLE_tip',
                           'RING_mcp','RING_pip','RING_dip','RING_tip',
                           'PINKY_mcp','PINKY_pip','PINKY_dip','PINKY_tip'];
    
        const landmarkIndex = landmarks.indexOf(landmark);
        
        const ret = [];
            
        // get x value
        const xCoord = (landmarkCoords[0][landmarkIndex][0] * img.width) - (img.width/2);
        // get y value
        const yCoord = ((1 - landmarkCoords[0][landmarkIndex][1]) * img.height) - (img.height/2);

        ret.push(xCoord);
        ret.push(yCoord);
        return ret;
        
    }   
    
    class HandGestures extends Extension {
        constructor(ide) {
            super('HandGestures');
            this.ide = ide;
        }

        onOpenRole() {}

        getMenu() { return {}; }

        getCategories() { return []; }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('handGesturesFind'),
                new Extension.Palette.Block('handGesturesRender'),
                new Extension.Palette.Block('handGesturesHanded'),
                new Extension.Palette.Block('handGesturesDistance'),
                new Extension.Palette.Block('handGesturesSetDetConf'),
                new Extension.Palette.Block('handGesturesSetTracConf'),
                new Extension.Palette.Block('handGesturesSetNumHands'),
                new Extension.Palette.Block('handGesturesSetModCompl'),
                new Extension.Palette.Block('handGesturesGetModel'),

                
                
                
            ];
            return [
                new Extension.PaletteCategory('sensing', blocks, SpriteMorph),
                new Extension.PaletteCategory('sensing', blocks, StageMorph),
            ];
        }

        getBlocks() {
            function block(name, type, category, spec, defaults, action) {
                return new Extension.Block(name, type, category, spec, defaults, action).for(SpriteMorph, StageMorph)
            }
            return [
                block('handGesturesFind', 'reporter', 'sensing', 'get %handLandMarks coords of hand from %s', ['INDEX_tip'], function (landmark, img) {
                    return this.runAsyncFn(async () => {
                        landmark = landmark?.toString();
                        if (!landmark) throw Error('No landmark specified');

                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        const res = await findHands(img);
                        const coords = parseHandLandmarks(res.multiHandLandmarks, landmark, img);
                        if(coords === 'Error') throw Error('please select a valid landmark');
                        return snapify(coords);                        
                        // const worldLandmarks = parseHandLandmarks(res.multiHandWorldLandmarks, landmark);         // create segregate into its own block. this adds real world coords in meters
                    }, { args: [], timeout: 10000 });
                }),
                
                block('handGesturesRender', 'reporter', 'sensing', 'render hands %s', [''], function (img) {
                    return this.runAsyncFn(async () => {
                        img = img?.contents || img;
                       
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) {throw Error('Expected an image as input');}
                       
                        const res = await renderHands(img);
                        return new Costume(res);}, { args: [], timeout: 10000 });
                }),

                block('handGesturesHanded', 'reporter', 'sensing', 'Get handedness from %s', [''], function (img) {
                    return this.runAsyncFn(async () => {
 
                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) {throw Error('Expected an image as input');}
                       
                        const data = await findHands(img);
                        const handedness = data.multiHandedness.map(e => ({ index: e.index, score: e.score, label: e.label }));
                        console.log(handedness);

                        return snapify(handedness);}, { args: [], timeout: 10000 });

                }),            

                block('handGesturesDistance', 'reporter', 'sensing', 'Get distance from %handLandMarks to %handLandMarks from %s', ['WRIST', 'THUMB_tip'], function (landmark1, landmark2, img) {
                    return this.runAsyncFn(async () => {
                        
                        landmark1 = landmark1?.toString();
                        landmark2 = landmark2?.toString(); 
                        if (!landmark1 || !landmark2) throw Error('No landmark specified');

                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) {throw Error('Expected an image as input');}
                       
                        const data = await findHands(img);
                        const coords1 = parseHandLandmarks(data.multiHandLandmarks, landmark1, img);
                        const coords2 = parseHandLandmarks(data.multiHandLandmarks, landmark2, img);

                        distance = Math.sqrt(difference(coords1[0], coords2[0]) ** 2 + difference(coords1[0], coords2[0]) ** 2)   

                        console.log('distance is' + toString(distance) + '\n' );

                        return snapify(distance);}, { args: [], timeout: 10000 });
            
                }),         
                
                block('handGesturesSetDetConf', 'command', 'sensing', 'set Minimum Detection Confidence to %n', [.5], function (newConf) {
                    return this.runAsyncFn(async () => {
                        
                        const handle = getHandsHandle();
                        if(handle.setHandleOptions({newDetConf: newConf})){
                            throw Error('Minimum Detection Confidence must be between 0 and 1');
                        }
                        return snapify(newConf);}, { args: [], timeout: 10000 });

                }),         

                block('handGesturesSetTracConf', 'command', 'sensing', 'set Minimum Tracking Confidence to %n', [.5], function (newConf) {
                    return this.runAsyncFn(async () => {
                        
                        const handle = getHandsHandle();
                        if(handle.setHandleOptions({newTracConf: newConf})){
                            throw Error('Minimum tracking Confidence must be between 0 and 1');
                        }
                        return snapify('');}, { args: [], timeout: 10000 });

                }),               
               
                block('handGesturesSetNumHands', 'command', 'sensing', 'Set Maximum Number of Hands to %n', [2], function (newMaxHands) {
                    return this.runAsyncFn(async () => {
                        
                        const handle = getHandsHandle();
                        if(handle.setHandleOptions({newMaxHands: newMaxHands})){
                            throw Error('Max number of hands must be between 0 and 4');
                        }
                        return snapify('');}, { args: [], timeout: 10000 });

                }),               
                 block('handGesturesSetModCompl', 'command', 'sensing', 'set Model Complexity to  %n', [.5], function (newModComp) {
                    return this.runAsyncFn(async () => {
                        
                        const handle = getHandsHandle();
                        if(handle.setHandleOptions({newModComp: newModComp})){
                            throw Error('Model Complexity must be between 0 and 1');
                            
                        }
                        return snapify('');}, { args: [], timeout: 10000 });

                }),               
                block('handGesturesGetModel', 'reporter', 'sensing', 'get hand from %s', [], function (img) {
                    return this.runAsyncFn(async () => {
                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        const res = await findNewHands(img);
                        console.log(res);
                        return snapify(res);                        
                        // const worldLandmarks = parseHandLandmarks(res.multiHandWorldLandmarks, landmark);         // create segregate into its own block. this adds real world coords in meters
                    }, { args: [], timeout: 10000 });
                }),            
  
            ];
        }

        getLabelParts() {
            function identityMap(s) {
                const res = {};
                for (const x of s) res[x] = x;
                return res;
            }
            return [
                new Extension.LabelPart('handLandMarks', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    identityMap(['WRIST','THUMB_cmc','THUMB_mcp','THUMB_ip','THUMB_tip', 
                                 'INDEX_mcp','INDEX_pip','INDEX_dip','INDEX_tip',
                                 'MIDDLE_mcp','MIDDLE_pip','MIDDLE_dip','MIDDLE_tip',
                                 'RING_mcp','RING_pip','RING_dip','RING_tip',
                                 'PINKY_mcp','PINKY_pip','PINKY_dip','PINKY_tip']),
                    true, // readonly (no arbitrary text)
                )),
                    
                
            ];
        }
    }

    const sources = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
        'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js',
    ];
    for (const source of sources) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = source;
        script.async = false;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
    }

    NetsBloxExtensions.register(HandGestures);
    disableRetinaSupport();
})();
