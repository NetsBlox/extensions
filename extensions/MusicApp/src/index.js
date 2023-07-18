import {WebAudioAPI} from "./WebAudioAPI/build/lib/webAudioAPI";

(function () {
   const audioAPI = new WebAudioAPI();
   const I32_MAX = 2147483647;
   let syncStart = 0;
   audioAPI.createTrack("backgroundTrack");
   audioAPI.start();

    function base64toArrayBuffer(base64){
        var binaryString = window.atob(base64.replace("data:audio/mpeg;base64,", ""));
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    async function synchronize(){
        let currentStart = syncStart++;
        await wait(.005)
        do {
            currentStart++;
            await wait(.005);
        } while (currentStart != syncStart);
        audioAPI.start();
    }

    async function playAudio(binaryString, trackName){
        await synchronize();  
        const buffer = base64toArrayBuffer(binaryString.audio.src);
        audioAPI.start();
        if(trackName === undefined){
            return audioAPI.playClip("backgroundTrack",buffer,audioAPI.getCurrentTime(),0);

        }
        else {
            return audioAPI.playClip(trackName, buffer, audioAPI.getCurrentTime(),0);
        }
        
    }

    async function playAudioForDuration(binaryString, trackName, dur){
        await synchronize();
        const buffer = base64toArrayBuffer(binaryString.audio.src);
        audioAPI.start();
        if(trackName === undefined){
            return audioAPI.playClip("backgroundTrack",buffer,audioAPI.getCurrentTime(), dur);

        }
        else {
            return audioAPI.playClip(trackName, buffer,audioAPI.getCurrentTime(),  dur);
        }
        
    }
    async function changePanning(trackName, level){
        const effectOptions = { ["leftToRightRatio"]:Number(level)};
        const execution = await audioAPI.updateTrackEffect(trackName,"Panning",effectOptions, 0);
        console.log(`WE EXECUTED PANNING ${execution}`);


    }
    function createTrack(trackName){
        audioAPI.createTrack(trackName);
    }

    function stopAudio(){
        audioAPI.stop();
        audioAPI.removeAllTracks();
    }

    function masterVolume(percent){
        return audioAPI.updateMasterVolume(percent, null);
    }
    function trackVolume(trackName, percent){
        return audioAPI.updateTrackVolume(trackName, percent, 0);
    }
    function  beatsPerMinute(bpm){
        return audioAPI.updateBeatsPerMinute(bpm);
    }

    function vizualize(binaryString){
        const buffer = base64toArrayBuffer(binaryString.audio.src);
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#4F4A85',
            progressColor: '#383351',
            media: buffer,
          })
    }

    async function wait(duration) {
        return new Promise(resolve => {
            setTimeout(resolve, duration * 1000);
        })
    }
    // ----------------------------------------------------------------------
    class MusicApp extends Extension {
        constructor(ide) {
            super('MusicApp');
            this.ide = ide;
            const oldStopAllActiveSounds = StageMorph.prototype.doStopAll;
            StageMorph.prototype.doStopAll = function(){
                oldStopAllActiveSounds();
                stopAudio();
            }
        }

        onOpenRole() {}

        getMenu() { return {}; }

        getCategories() {
            return [
                new Extension.Category('music', new Color(215, 10, 10)),
            ];
        }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('playAudioClip'),
                new Extension.Palette.Block('playAudioClipforDuration'),
                new Extension.Palette.Block('stopClips'),
                new Extension.Palette.Block('playbackControls'),
                new Extension.Palette.Block('track'),
                new Extension.Palette.Block('masterVolume'),
                new Extension.Palette.Block('trackVolume'),
                new Extension.Palette.Block('setGlobalBPM'),
                new Extension.Palette.Block('setTrackPanning'),
            ];
            return [
                new Extension.PaletteCategory('music', blocks, SpriteMorph),
                new Extension.PaletteCategory('music', blocks, StageMorph),
            ];
        }

        getBlocks() {
            function block(name, type, category, spec, defaults, action) {
                return new Extension.Block(name, type, category, spec, defaults, action)
            }
            return [
                block('playAudioClip', 'command', 'music', 'play audio clip %s', ['clip'], function (audioBuffer){
                    this.runAsyncFn(async () =>{
                        const trackName = this.trackName;
                        const duration = await playAudio(audioBuffer, trackName);
                        await wait(duration-.02);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('playAudioClipforDuration', 'command', 'music', 'play audio clip for duration %n %s', ['1', 'clip'], function (dur,audioBuffer){
                    this.runAsyncFn(async () =>{
                        const trackName = this.trackName;
                        const duration = await playAudioForDuration(audioBuffer, trackName, dur);
                        // console.log(`THIS IS WHAT I RECIEVED: ${duration}`);
                        await wait(duration-Math.max(.02,0));
                    },{ args: [], timeout: I32_MAX });
                }),
                block('stopClips', 'command', 'music', 'stop all clips', [], function (){
                    stopAudio();
                    this.doStopAll();
                }),
                block('playbackControls', 'command', 'music', 'playback %s time sig. %bpmNotes BPM = %n', ['4/4', 'Quarter', '120'], function (audio){
                    this.runAsyncFn(async () =>{
                        playAudio(audio);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('track', 'command', 'music', 'track %s', ['Name'], function (trackName){
                    // console.log(`HERE IS THE SECOND INPUT ${underBlock}`);
                    // var block = this.context.expression;
                    // console.log({arguments, "this": this})
                        createTrack(trackName);
                        this.trackName = trackName;
                }),
                block('masterVolume', 'command', 'music', 'master volume %n %', ['80'], function (percent){
                    masterVolume(percent * 0.01);
                }),
                block('trackVolume', 'command', 'music', 'track volume %n %', ['50'], function (percent){
                    const trackName = this.trackName;
                    trackVolume(trackName,percent* 0.01);
                }),
                block('setGlobalBPM', 'command', 'music','set global BPM %n', ['120'], function (bpm){
                    beatsPerMinute(bpm);
                }),
                block('setTrackPanning', 'command', 'music','set track panning %n', ['0.5'], function (level){
                    this.runAsyncFn(async () =>{
                        const trackName = this.trackName;
                        await changePanning(trackName, level);
                  
                    },{ args: [], timeout: I32_MAX });
                })
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
            new Extension.LabelPart('bpmNotes', () => new InputSlotMorph(
                null, //text
                false, // numeric
                unionMaps([
                    identityMap([ 'Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'Thirtysecondth']),
                ]),
                false,
            )),
            new Extension.LabelPart('enabled', () => new InputSlotMorph(
                null, //text
                false, //numeric
                unionMaps([
                    identityMap(['Enabled', 'Disabled']),
                ]),
                false,
            )),
        ]; 
    }

    }
    var element = document.createElement('link');
	element.setAttribute('rel', 'stylesheet');
	element.setAttribute('type', 'text/css');
	element.setAttribute('href', 'https://gsteinltu.github.io/PseudoMorphic/style.css');
	document.head.appendChild(element);

	var scriptElement = document.createElement('script');

	scriptElement.onload = () => {
		var element = createDialog('MusicApp');
		// const canvas = document.createElement('canvas');
		// canvas.id = 'roboscape-canvas';
		// element.querySelector('content').appendChild(canvas);
        element.querySelector('content').innerHTML = 
                    '<div id="waveform"></div><script type="module">import WaveSurfer from \'https://unpkg.com/wavesurfer.js@beta\' const wavesurfer = WaveSurfer.create({container: \'#waveform\', waveColor: \'violet\', progressColor: \'purple\'});      wavesurfer.once(\'interaction\', () => {wavesurfer.play()})</script>';
        setupDialog(element);
		window.externalVariables['musicAppDialog'] = element;
	};
	scriptElement.setAttribute('src', 'https://gsteinltu.github.io/PseudoMorphic/script.js');
	document.head.appendChild(scriptElement);

    NetsBloxExtensions.register(MusicApp);
})();