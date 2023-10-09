// const { difference } = require("lodash");
(function () {

    async function loadVisionModule() {
        const module = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6');
        console.log(module);
        return module;
    }

    async function loadVisionTask(VisionModule) {
        const vision = await VisionModule.FilesetResolver.forVisionTasks( 
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6/wasm"
            );
            console.log(vision);
        return vision;
    }

    const Vision = {
        Module: '',
        Task: ''
    }; 

    function setVisionModuleAndTask() {
        const modulePromise = loadVisionModule();
        
        modulePromise.then((module) => {
            Vision.Module = module;
            Object.defineProperty(Vision, "Module", {writable: false}); 
            
            const visionPromise = loadVisionTask(module);
            visionPromise.then((vision) => {
                Vision.Task = vision;
                Object.defineProperty(Vision, "Task", {writable: false})
            },
                () => {throw Error('Failed to load vision task')});
        }, 
            () => {throw Error('Failed to load vision module')});
    }
    
    setVisionModuleAndTask();

    class VisionHandle {
        constructor() {

            this.handLandmarker = 'uninitialized'; 
            this.generateTask();

            this.expiry = 0;
            this.resolve = null;
            
        }

        async generateTask() {
            if(this.handLandmarker !== 'uninitialized' && this.handLandmarker !== 'loading')
                throw Error('Task is already generated');
            if(this.handLandmarker == 'loading')
                throw Error('HandLandmarker is currently loading');
            this.handLandmarker = 'loading';
           
            this.handLandmarker = await Vision.Module.HandLandmarker.createFromOptions(Vision.Task, {
                baseOptions: {
                    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
                    delegate: "GPU"
                },
                numHands: 2,
                runningMode: "IMAGE",
                minHandDetectionConfidence: 0.5,
                minHandPresenceConfidence: 0.5,
                minTrackingConfidence: 0.5
            })
        }

        async infer(image){
            if(this.handLandmarker == 'uninitialized') throw Error('handLandmarker is not initialized');
            if(this.handLandmarker == 'loading') return "HandLandmarker is loading...";

            if(this.resolve !== null) throw Error('VisionHandler is currently in use');
            this.resolve = 'loading...';

            this.expiry = +new Date() + 10000;

            return await new Promise(async resolve => {
                const data = await this.handLandmarker.detect(image);
                this.resolve = null;
                resolve(data);
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

        // This function takes new model parameters and sets them for the current handler
        setHandleOptions({newDetConf = this.handLandmarker.h.u[1], 
                         newPresConf = this.handLandmarker.s.u[1],
                         newTracConf = this.handLandmarker.j.u[3],
                         newMaxHands = this.handLandmarker.h.u[2]} = {}) {
     
            if(newDetConf < 0 || newDetConf > 1 || newTracConf < 0 || newTracConf > 1 || newMaxHands < 0 || newMaxHands > 4 || newPresConf < 0 || newPresConf > 1)
            {
                throw Error('Invalid Options Value');
            }
            this.handLandmarker.setOptions({
                maxNumHands: newMaxHands,
                minHandPresenceConfidence: newPresConf,
                minDetectionConfidence: newDetConf,
                minTrackingConfidence: newTracConf,
            })
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

    function getAllHandles() {
        return VISION_HANDLES;
    }
    
    async function findHands(image) {
        const handle = getVisionHandle();
        let handData = await handle.infer(image);
        return handData;
    }

    async function renderHands(image) {
        const data = await findHands(image);
        if(data == "HandLandmarker is loading..."){
            return data;
        }
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        for (const landmarks of data.landmarks) {
            drawConnectors(context, landmarks, HAND_CONNECTIONS, { color: '#00ff00', lineWidth: 3 });
            drawLandmarks(context, landmarks, { color: '#ff0000', lineWidth: 1 });
        }

        return canvas;
    }

    function parseLandmarks(data, option, landmark, img) {
        let landmarkCoords
        if(option == "Hand Landmark Coords") landmarkCoords = data.landmarks;
        
        if(option == "Hand World Landmark Coords") landmarkCoords = data.worldLandmarks;
        
        console.log(landmarkCoords);
        if(landmarkCoords.length == 0) return landmarkCoords;

        const LANDMARKS = ['WRIST','THUMB_cmc','THUMB_mcp','THUMB_ip','THUMB_tip', 
                           'INDEX_mcp','INDEX_pip','INDEX_dip','INDEX_tip',
                           'MIDDLE_mcp','MIDDLE_pip','MIDDLE_dip','MIDDLE_tip',
                           'RING_mcp','RING_pip','RING_dip','RING_tip',
                           'PINKY_mcp','PINKY_pip','PINKY_dip','PINKY_tip'];
    
        const landmarkIndex = LANDMARKS.indexOf(landmark);
        
        const ret = [];
        
        if(option == "Hand Landmark Coords"){
            const xCoord = (landmarkCoords[0][landmarkIndex].x * img.width) - (img.width/2);
            const yCoord = ((1 - landmarkCoords[0][landmarkIndex].y) * img.height) - (img.height/2);
            const zCoord = (landmarkCoords[0][landmarkIndex].z);
            ret.push(xCoord, yCoord, zCoord);
        }
        else if (option == "Hand World Landmark Coords"){
            const xCoord = (landmarkCoords[0][landmarkIndex].x);
            const yCoord = (landmarkCoords[0][landmarkIndex].y);
            const zCoord = (landmarkCoords[0][landmarkIndex].z);
            ret.push(xCoord, yCoord, zCoord);
        }
        return ret;
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
                new Extension.Palette.Block('handLandmarksFindHands'),
                new Extension.Palette.Block('handLandmarksFindLandmarks'),
                new Extension.Palette.Block('handLandmarksFindLandmark'),
                new Extension.Palette.Block('handLandmarksRender'),
                new Extension.Palette.Block('handLandmarksDistance'),
                new Extension.Palette.Block('handLandmarksSetOptions'),

                
                
                
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
                block('handLandmarksFindHands', 'reporter', 'sensing', 'get hands data from %s', [], function (img) {
                    return this.runAsyncFn(async () => {
                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        const res = await findHands(img);
                        if(res == "HandLandmarker is loading..."){
                            return snapify(res);
                        }
                        console.log(res);
                        return snapify(res);                        
                    }, { args: [], timeout: 10000 });
                }),            

                block('handLandmarksFindLandmarks', 'reporter', 'sensing', 'get %handLandmarkGet from %s', ['Hand Landmarks', ''], function (option, img) {
                    return this.runAsyncFn(async () => {
                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        option = option?.toString();
                        if(!option) throw Error('Select a valid option')

                        const res = await findHands(img);
                        if(res == "HandLandmarker is loading..." || !res){
                            return snapify(res);
                        }
                        console.log(res.landmarks);
                        
                        if(option == 'Hand Landmarks') return snapify(res.landmarks)
                        if(option == 'Hand World Landmarks') return snapify(res.worldLandmarks)
                        if(option == 'Handedness') return snapify(res.handedness)
                        
                        throw Error('function Error')                        
                    }, { args: [], timeout: 10000 });
                }),            

                block('handLandmarksFindLandmark', 'reporter', 'sensing', 'get %handLandmarkGetOne of %handLandmarks of hand from %s', ['Hand Landmark Coords', 'INDEX_tip'], function (option, landmark, img) {
                    return this.runAsyncFn(async () => {
                        landmark = landmark?.toString();
                        if (!landmark) throw Error('No landmark specified');
                        
                        option = option?.toString();
                        if (!option) throw Error('no option specified');

                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        const res = await findHands(img);
                        if(res == "HandLandmarker is loading..."){
                            return snapify(res);
                        }
                        const coords = parseLandmarks(res, option, landmark, img);

                        if(coords == 'Error') throw Error('please select a valid landmark');
                        
                        return snapify(coords);                        
                    }, { args: [], timeout: 10000 });
                }),
                
                block('handLandmarksRender', 'reporter', 'sensing', 'render hands %s', [''], function (img) {
                    return this.runAsyncFn(async () => {
                        img = img?.contents || img;
                       
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) {throw Error('Expected an image as input');}
                       
                        const res = await renderHands(img);
                        if(res == "HandLandmarker is loading..."){
                            return snapify(res);
                        }
                        return new Costume(res);}, { args: [], timeout: 10000 });
                }),

                block('handLandmarksDistance', 'reporter', 'sensing', 'Get distance from %handLandmarks to %handLandmarks with %handLandmarkGetOne from %s', ['WRIST', 'THUMB_tip', 'Hand Landmark Coords'], function (landmark1, landmark2, option, img) {
                    return this.runAsyncFn(async () => {
                        
                        landmark1 = landmark1?.toString();
                        landmark2 = landmark2?.toString(); 
                        if (!landmark1 || !landmark2) throw Error('No landmark specified');

                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) {throw Error('Expected an image as input');}
                       
                        const data = await findHands(img);
                        if(data == "HandLandmarker is loading..."){
                            return snapify(res);
                        }

                        const coords1 = parseLandmarks(data, option, landmark1, img);
                        const coords2 = parseLandmarks(data, option, landmark2, img);

                        const distance = Math.sqrt((coords1[0] - coords2[0])**2 + (coords1[0]- coords2[0])**2)   

                        console.log(`distance is ${distance}`);

                        return snapify(distance);}, { args: [], timeout: 10000 });
                }),         
                
                block('handLandmarksSetOptions', 'command', 'sensing', 'set %handLandmarkOptions to %n', ['Maximum Number of Hands', 2], function (option, newValue) {
                    return this.runAsyncFn(async () => {
                        
                        const OPTIONS = ['Minimum Detection Confidence', 
                                 'Minimum Presence Confidence',
                                 'Minimum Tracking Confidence',
                                 'Maximum Number of Hands' ];
                        
                        const optionIndex = OPTIONS.indexOf(option);
                        const HANDLES = getAllHandles();
                        if(optionIndex == 0){
                            for(const handle in HANDLES)
                                handle.setHandleOptions({newDetConf: newValue});
                        }
                        if(optionIndex == 1){
                            for(const handle in HANDLES)
                                handle.setHandleOptions({newPresConf: newValue});
                        }
                        if(optionIndex == 2){
                            for(const handle in HANDLES)
                                handle.setHandleOptions({newTracConf: newValue});
                        }
                        if(optionIndex == 3){
                            for(const handle in HANDLES)
                                handle.setHandleOptions({newMaxHands: newValue});
                        }
                        return snapify(newValue);}, { args: [], timeout: 10000 });
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
                new Extension.LabelPart('handLandmarks', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    identityMap(['WRIST','THUMB_cmc','THUMB_mcp','THUMB_ip','THUMB_tip', 
                                 'INDEX_mcp','INDEX_pip','INDEX_dip','INDEX_tip',
                                 'MIDDLE_mcp','MIDDLE_pip','MIDDLE_dip','MIDDLE_tip',
                                 'RING_mcp','RING_pip','RING_dip','RING_tip',
                                 'PINKY_mcp','PINKY_pip','PINKY_dip','PINKY_tip']),
                    true, // readonly (no arbitrary text)
                )),
                new Extension.LabelPart('handLandmarkOptions', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    identityMap(['Minimum Detection Confidence', 
                                 'Minimum Tracking Confidence',
                                 'Minimum Presence Confidence',
                                 'Maximum Number of Hands' 
                                 ]),
                    true, // readonly (no arbitrary text)
                )),
                new Extension.LabelPart('handLandmarkGet', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    identityMap(['Hand Landmarks', 
                                 'Hand World Landmarks',
                                 'Handedness'
                                 ]),
                    true, // readonly (no arbitrary text)
                )),
                new Extension.LabelPart('handLandmarkGetOne', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    identityMap(['Hand Landmark Coords', 
                                 'Hand World Landmark Coords',
                                 ]),
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
