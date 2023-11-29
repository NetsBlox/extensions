(function () {

    function getAprilDictionary(){
        const aprilTagDictionary = new AR.Dictionary('APRILTAG_16h5')
        return aprilTagDictionary;
    }

    function ArucoGenMorph (){
        this.init();
    }

    ArucoGenMorph.prototype = new DialogBoxMorph();
    ArucoGenMorph.prototype.constructor = ArucoGenMorph;
    ArucoGenMorph.uber = DialogBoxMorph.prototype;

    ArucoGenMorph.prototype.init = function () {
        ArucoGenMorph.uber.init.call(this);

        this.labelString = 'ArucoCodeGenerator';
        this.createLabel();

        const width = 300;
        const height = 300;
        this.bounds.setWidth(width);
        this.bounds.setHeight(height);
        this.dictionary = getAprilDictionary();

        this.add(this.IDPrompt = new StringMorph('Code Value: [0-29]'));  
        this.add(this.saveButton = new PushButtonMorph(null, () => this.download(), 'Download'));
        this.add(this.closeButton = new PushButtonMorph(null, () => this.destroy(), 'Close'));

        const [qrwidth, qrheight] = [150, 150];
        this.add(this.ARCode = new Morph());
        this.ARCode.setWidth(qrwidth);
        this.ARCode.setHeight(qrheight);
        this.ARCode.value = '0';  
        
        const options = Array.from(Array(30).keys())
        for(item of options){
            options[item] = item.toString();
        }
        const menuOptions = Object.assign({}, options);

        this.add(this.IDInput = new InputFieldMorph('0', true, menuOptions, true));
        
        this.fixLayout();
        this.rerender();
    };

    ArucoGenMorph.prototype.download = async function () {
        console.log("downloading");
        if(this.ARCode.texture){
            const svg = await (await fetch(this.ARCode.texture)).blob();
            console.log(svg);
            const url = window.URL.createObjectURL(svg);
            const name = `AprilTag_16h5_ID${this.ARCode.value}.svg` 
            const link = document.createElement("a");
            link.download = name;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    }

    ArucoGenMorph.prototype.updateARCode = function () {
        const newValue = parseInt(this.IDInput.children[0].children[0].text);
        if(newValue > 29){
            return;
        }
        this.ARCode.value = newValue; 
        console.log("value: ", this.ARCode.value);
        
        this.ARCode.cachedTexture = null;
        this.ARCode.texture = `http://127.0.0.1:5500/extensions/AugmentedReality/js-aruco2/apriltag_16h5_svgs/APRILTAG_16h5_ID${this.ARCode.value}.svg`;

        this.ARCode.rerender();
    }

    ArucoGenMorph.prototype.reactToChoice = function () {
        this.updateARCode();
    }

    ArucoGenMorph.prototype.fixLayout = function() {
        ArucoGenMorph.uber.fixLayout.call(this);

        if (this.IDPrompt) {
            this.IDPrompt.setCenter(this.center());
            this.IDPrompt.setTop(35);
        }
        if (this.IDInput) {
            this.IDInput.setCenter(this.center());
            this.IDInput.setTop(50);
            this.IDInput.setLeft(135);
            this.IDInput.bounds.setWidth(30);
            this.IDInput.children[0].bounds.setWidth(25);
            this.IDInput.children[1].setLeft(this.IDInput.left() + 15);
            
        }
        if (this.ARCode) {
            this.ARCode.setCenter(this.center());
            this.ARCode.setTop(90);
        }
        if (this.saveButton) {
            this.saveButton.setCenter(this.center());
            this.saveButton.setBottom(this.bottom() - 20);
            this.saveButton.setLeft(this.saveButton.left() - 40);
        }
        if (this.closeButton) {
            this.closeButton.setCenter(this.center());
            this.closeButton.setBottom(this.bottom() - 20);
            this.closeButton.setLeft(this.closeButton.left() + 40);
        }
    };

    ArucoGenMorph.prototype.accept = function () {
        if (this.action) {
            if (typeof this.target === 'function') {
                if (typeof this.action === 'function') {
                    this.target.call(this.environment, this.action.call());
                } else {
                    this.target.call(this.environment, this.action);
                }
            } else {
                if (typeof this.action === 'function') {
                    this.action.call(this.target, this.getInput());
                } else { // assume it's a String
                    this.target[this.action](this.getInput());
                }
            }
        }
        this.updateARCode();
    };  

    class ArucoHandler {
        constructor() {
            this.detector = new AR.Detector({dictionaryName: 'apriltag_16h5'});
            this.state = 'Idle';
            this.expiry = 0;
        }
        async detectAR(imageData){
            this.expiry = +new Date() + 10000;
            this.state = 'Detecting...';
            const markers = this.detector.detect(imageData);
            this.state = 'Idle';
            return markers;
        }
        isIdle() {
            if(this.status == 'Idle')
                return true;
            if(+new Date() > this.expiry){
                this.state = 'Idle';
                return true;
            }
            return false;
        }
    }

    const ARUCOHANDLERS = [];

    function getArucoHandler(){
        for(const handler of ARUCOHANDLERS){
            if(handler.isIdle)
                return handler;
        }
        const newHandler = new ArucoHandler();
        ARUCOHANDLERS.push(newHandler);
        return newHandler;
    }
    
    async function getCoordinates(image){
        const handler = getArucoHandler();
        
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d')
        
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0,0,canvas.width, canvas.height);         
        
        let markers = await handler.detectAR(imageData);

        if(!markers){
            throw Error('Error: failed to find AR code');
        }

        console.log(markers);
        for(let marker of markers){
            for(let corner of marker.corners){
                corner.x = corner.x - (image.width/2);
                corner.y = 1 - (corner.y - (image.height/2));
            }
        }

        return markers;
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
    
    class AugmentedReality extends Extension {
        constructor(ide) {
            super('AugmentedReality');
            this.ide = ide;
            this.ide.parent.isDevMode = true;
            console.log(this.ide.parent);

        }

        onOpenRole() {}

        getMenu() { return {
                     
            'Code Generator': function () {
                new ArucoGenMorph().popUp(world);
            },

        }; }

        getCategories() { return []; }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('ARCodeTracker'),
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
                block('ARCodeTracker', 'reporter', 'sensing', 'find AR code %s', [], function (image) {
                    return this.runAsyncFn(async () => {
                        
                        image = image?.contents || image;
                        if (!image || typeof(image) !== 'object' || !image.width || !image.height) throw Error('Expected an image as input');
                        
                        const coordinates = await getCoordinates(image);

                        return snapify(coordinates);        

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
            ];
        }
    }

    const sources = ['http://localhost:5500/extensions/AugmentedReality/js-aruco2/src/svd.js', 
                     'http://localhost:5500/extensions/AugmentedReality/js-aruco2/src/posit1.js', 
                     'http://localhost:5500/extensions/AugmentedReality/js-aruco2/src/cv.js', 
                     'http://localhost:5500/extensions/AugmentedReality/js-aruco2/src/aruco.js',
                     'http://localhost:5500/extensions/AugmentedReality/js-aruco2/src/dictionaries/apriltag_16h5.js'] 
    
    for(const source of sources){
        const script = document.createElement('script');
        script.id = 'arucoScipts'; 
        script.type = 'text/javascript';
        script.src = source;
        script.async = false;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
    } 
    
        

    NetsBloxExtensions.register(AugmentedReality);
    disableRetinaSupport();
})();
