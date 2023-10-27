(function () {

    const cache = {
        data: null,
        updateTime: -1,
        options: {
            minDetConf: .5,
            minPresConf: .5,
            minTracConf: .5,
            maxHands: 2
        }
    }

    class VisionHandle {
        constructor() {

            this.handLandmarker = 'uninitialized'; 
            
            this.generateTask();

            this.expiry = 0;
            this.resolve = null;

            this.frameTime = 0;
            
        }

        async generateTask() {
            if(this.handLandmarker !== 'uninitialized' && this.handLandmarker !== 'loading')
                throw Error('Task is already generated');

            if(!Vision)
                throw Error('Vision Module is loading');

            if(this.handLandmarker == 'loading')
                throw Error('HandLandmarker is currently loading');

            this.handLandmarker = 'loading';
           
            this.handLandmarker = await Vision.Module.HandLandmarker.createFromOptions(Vision.Task, {
                baseOptions: {
                    modelAssetPath: "http://localhost:5500/extensions/HandGestures/Models/HandTracking/hand_landmarker.task",
                    delegate: "GPU"
                },
                numHands: cache.options.maxHands,
                runningMode: "VIDEO",
                minHandDetectionConfidence: cache.options.minDetConf,
                minHandPresenceConfidence: cache.options.minPresConf,
                minTrackingConfidence: cache.options.minTracConf
            })
        }

        async infer(image){
            if(this.handLandmarker == 'uninitialized') throw Error('handLandmarker is not initialized');
            if(this.handLandmarker == 'loading') return "HandLandmarker is loading...";

            if(this.resolve !== null) throw Error('VisionHandler is currently in use');
            this.resolve = 'loading...';

            this.frameTime = performance.now();
            if(cache.data !== null && ((this.frameTime - cache.updateTime) < 5)){
                this.resolve = null;
                return cache.data;
            }
            cache.updateTime = this.frameTime;

            this.expiry = +new Date() + 10000;

            return new Promise(resolve => {
                cache.data = this.handLandmarker.detectForVideo(image, this.frameTime);
                this.resolve = null;
                resolve(cache.data);
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

        // This function takes new model parameters and sets them for all handlers 
        async setHandleOptions({newDetConf = cache.options.minDetConf, 
                         newPresConf = cache.options.minPresConf,
                         newTracConf = cache.options.minTracConf,
                         newMaxHands = cache.options.maxHands} = {}) {
     
            console.log(cache);
            if(newDetConf < 0 || newDetConf > 1 || newTracConf < 0 || newTracConf > 1 || newMaxHands < 0 || newMaxHands > 4 || newPresConf < 0 || newPresConf > 1)
            {
                throw Error('Invalid Options Value');
            }
            cache.options.minDetConf = newDetConf;
            cache.options.minPresConf = newPresConf;
            cache.options.minTracConf = newTracConf;
            cache.options.maxHands = newMaxHands;

            await this.handLandmarker.setOptions({
                minHandPresenceConfidence: newPresConf,
                minHandDetectionConfidence: newDetConf,
                minTrackingConfidence: newTracConf,
                numHands: newMaxHands
            });
            console.log(this.handLandmarker);
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
        console.log(VISION_HANDLES.length);
        if(VISION_HANDLES.length == 0){
            getVisionHandle();
            throw Error ("Initializing First HandGestureHandler");
        }
        return VISION_HANDLES;
    }
    
    async function findHands(image) {
        const handle = getVisionHandle();
        return await handle.infer(image);
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
        const drawer = new Vision.Module.DrawingUtils(context);
        
        for (const landmarks of data.landmarks) {
            drawer.drawConnectors(landmarks, Vision.Module.HandLandmarker.HAND_CONNECTIONS, { color: '#00ff00', lineWidth: 3 });
            drawer.drawLandmarks(landmarks, { color: '#ff0000', lineWidth: 1 });
        }

        return canvas;
    }

    function parseLandmarks(data, option, landmark, img) {
        let landmarkCoords
        if(option == "Hand Landmark Coords") landmarkCoords = data.landmarks;
        
        if(option == "Hand World Landmark Coords") landmarkCoords = data.worldLandmarks;
        
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
                block('handLandmarksFindHands', 'reporter', 'sensing', 'hands data from %s', [], function (img) {
                    return this.runAsyncFn(async () => {
                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        const res = await findHands(img);
                        if(res == "HandLandmarker is loading..."){
                            return snapify(res);
                        }
                        return snapify(res);                        
                    }, { args: [], timeout: 10000 });
                }),            

                block('handLandmarksFindLandmarks', 'reporter', 'sensing', '%handLandmarkGet from %s', ['Hand Landmarks', ''], function (option, img) {
                    return this.runAsyncFn(async () => {
                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        option = option?.toString();
                        if(!option) throw Error('Select a valid option')

                        const res = await findHands(img);
                        if(res == "HandLandmarker is loading..." || !res){
                            return snapify(res);
                        }
                        console.log(res);
                        
                        if(option == 'Hand Landmarks') return snapify(res.landmarks)
                        if(option == 'Hand World Landmarks') return snapify(res.worldLandmarks)
                        if(option == 'Handedness') return snapify(res.handedness)
                        
                        throw Error('function Error')                        
                    }, { args: [], timeout: 10000 });
                }),            

                block('handLandmarksFindLandmark', 'reporter', 'sensing', '%handLandmarkGetOne of %handLandmarks from %s', ['Hand Landmarks', 'INDEX_tip'], function (option, landmark, img) {
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

                block('handLandmarksDistance', 'reporter', 'sensing', '%handLandmarkGetOne Distance of %handLandmarks to %handLandmarks from %s', ['Hand Landmarks', 'WRIST', 'THUMB_tip'], function (option, landmark1, landmark2, img) {
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

                        return snapify(distance);}, { args: [], timeout: 10000 });
                }),         
                
                block('handLandmarksSetOptions', 'command', 'sensing', 'set %handLandmarkOptions to %n', ['Max Hands', 2], function (option, newValue) {
                    return this.runAsyncFn(async () => {
                        
                        const OPTIONS = ['Min Detect Confidence', 
                                 'Min Presence Confidence',
                                 'Min Track Confidence',
                                 'Max Hands' ];
                        
                        const optionIndex = OPTIONS.indexOf(option);
                        const HANDLES = getAllHandles();

                        HANDLES.forEach((handle) => {
                            console.log(handle);
                            if(optionIndex == 0){
                                handle.setHandleOptions({newDetConf: newValue});
                            }
                            if(optionIndex == 1){
                                handle.setHandleOptions({newPresConf: newValue});
                            }
                            if(optionIndex == 2){
                                handle.setHandleOptions({newTracConf: newValue});
                            }
                            if(optionIndex == 3){
                                handle.setHandleOptions({newMaxHands: newValue});
                            }
                    })
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
            function unionMaps(maps) {
                const res = {};
                for (const map of maps) {
                    for (const key in map) res[key] = map[key];
                }
                return res;
            }
            return [
                new Extension.LabelPart('handLandmarks', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    unionMaps([
                        identityMap(['WRIST']),
                        {'THUMB': identityMap(['THUMB_cmc','THUMB_mcp','THUMB_ip','THUMB_tip'])}, 
                        {'INDEX': identityMap(['INDEX_mcp','INDEX_pip','INDEX_dip','INDEX_tip'])}, 
                        {'MIDDLE': identityMap(['MIDDLE_mcp','MIDDLE_pip','MIDDLE_dip','MIDDLE_tip'])}, 
                        {'RING': identityMap([ 'RING_mcp','RING_pip','RING_dip','RING_tip'])}, 
                        {'PINKY': identityMap(['PINKY_mcp','PINKY_pip','PINKY_dip','PINKY_tip'])}, 
                    true, // readonly (no arbitrary text)
                    ])
                )),
                new Extension.LabelPart('handLandmarkOptions', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    identityMap(['Min Detect Confidence', 
                                 'Min Track Confidence',
                                 'Min Presence Confidence',
                                 'Max Hands' 
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
                    identityMap(['Landmarks', 
                                 'World Landmark',
                                 ]),
                    true, // readonly (no arbitrary text)
                )),
                    
                
            ];
        }
    }

    const visionSource = 'http://localhost:5500/extensions/utils/visionModuleLoader.js';
    if(!document.getElementById('visionModule')){
        const script = document.createElement('script');
        script.id = 'visionModule'; 
        script.type = 'text/javascript';
        script.src = visionSource;
        script.async = false;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
    }

    NetsBloxExtensions.register(HandGestures);
    disableRetinaSupport();
})();
