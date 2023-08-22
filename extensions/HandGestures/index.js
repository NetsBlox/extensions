(function () {
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

    async function findHands(image) {
        const handle = getHandsHandle();
        return await handle.infer(image);
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
                new Extension.Palette.Block('handGesturesCalc'),
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
                block('handGesturesCalc', 'reporter', 'sensing', '%handGesturesMode hands %s', ['find'], function (mode, img) {
                    return this.runAsyncFn(async () => {
                        mode = mode?.toString();
                        if (!mode) throw Error('No hand detection mode specified');

                        img = img?.contents || img;
                        if (!img || typeof(img) !== 'object' || !img.width || !img.height) throw Error('Expected an image as input');

                        if (mode === 'find') {
                            const res = await findHands(img);
                            const parseLandmarks = raw => raw.map(coords => coords.map(p => [p.x, p.y, p.z]));
                            const imageLandmarks = parseLandmarks(res.multiHandLandmarks);
                            const worldLandmarks = parseLandmarks(res.multiHandWorldLandmarks);
                            const handedness = res.multiHandedness.map(e => ({ index: e.index, score: e.score, label: e.label }));

                            if (imageLandmarks.length !== worldLandmarks.length || imageLandmarks.length !== handedness.length) throw Error('Hand Detector Internal Error');

                            const ret = [];
                            for (let i = 0; i < imageLandmarks.length; ++i) {
                                ret.push({
                                    imagelandmarks: imageLandmarks[i],
                                    worldLandmarks: worldLandmarks[i],
                                    handedness: handedness[i],
                                });
                            }
                            return snapify(ret);
                        } else if (mode === 'render') {
                            const res = await renderHands(img);
                            return new Costume(res);
                        } else throw Error(`Unknown hand detection mode: "${mode}"`);
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
                new Extension.LabelPart('handGesturesMode', () => new InputSlotMorph(
                    null, // text
                    false, // numeric
                    identityMap(['find', 'render']),
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
