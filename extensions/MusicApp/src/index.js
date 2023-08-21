import {WebAudioAPI} from "./WebAudioAPI/build/lib/webAudioAPI";

(function () {
   const audioAPI = new WebAudioAPI();
   const I32_MAX = 2147483647;
   let syncStart = 0;
   audioAPI.createTrack('default');
   audioAPI.start();
   const availableEffects = audioAPI.getAvailableEffects();


    /**
     * Object representing a mapping between an effect type and its unique internal code.
     * @constant {Object.<string, number>}
     */
    const EffectType = {
        Reverb: 11, Delay: 12, Echo: 13,                                                 // Time-Based Effects
        Chorus: 21, Tremolo: 22, Vibrato: 23, Flanger: 24, Phaser: 25,                   // Modulation Effects
        Panning: 31, Equalization: 32,                                                   // Spectral Effects
        Volume: 41, Compression: 42, Distortion: 43,                                     // Dynamic Effects
        LowPassFilter: 51, HighPassFilter: 52, BandPassFilter: 53, BandRejectFilter: 54  // Filter Effects
    };

    const EffectsPreset = {
        'Under Water': ['LowPassFilter', {
            ['cutoffFrequency']: 500,
            ['resonance']: 12,
        }],
        'Telephone': ['HighPassFilter', {
            ['cutoffFrequency'] : 1800,
            ['resonance']: 10,
        }],
        'Cave': ['Echo', {
            ['feedback'] : 0.5,
            ['intensity'] : 0.4,
        }],
        'Fan Blade': ['Tremolo', {
            ['tremeloFrequency'] : 18,
        }],
    }

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
        return audioAPI.playClip(trackName, buffer, audioAPI.getCurrentTime(),0);
    }

    async function playAudioForDuration(binaryString, trackName, dur){
        await synchronize();
        const buffer = base64toArrayBuffer(binaryString.audio.src);
        audioAPI.start();
        return audioAPI.playClip(trackName, buffer,audioAPI.getCurrentTime(),  dur);
    }

    async function setTrackPanning(trackName, level){
        const effectOptions = { ["leftToRightRatio"]:Number(level)};
        // await audioAPI.applyTrackEffect(trackName,"Panning",availableEffects["Panning"]);
        await audioAPI.updateTrackEffect(trackName,"Panning",effectOptions);
    }

    async function applyTrackEffect(trackName, effectName){
      await audioAPI.applyTrackEffect(trackName,effectName,availableEffects[effectName]);
    
    }

    async function setTrackEffect(trackName, effectName, level){
        const effectType = availableEffects[effectName];
        const parameters = audioAPI.getAvailableEffectParameters(effectType);
        const effectOptions = {[Object.values(parameters).name] : level}
        console.log(`HERE ARE THE PARAMETERS ${trackName}:`, effectOptions);
        // await audioAPI.updateTrackEffect(trackName,effectName,effectOptions);
    }

    function createTrack(trackName){
        audioAPI.createTrack(trackName);
    }

    function stopAudio(){
        audioAPI.stop();
        audioAPI.clearAllTracks();
    }

    async function masterVolume(percent){
        const effectOptions = { ["intensity"]:Number(percent)};
        await audioAPI.updateMasterEffect(trackName,"Volume",effectOptions);
    }
    async function trackVolume(trackName, percent){
        const effectOptions = { ["intensity"]:Number(percent)};
        await audioAPI.updateTrackEffect(trackName,"Volume",effectOptions);
    }
    function  beatsPerMinute(bpm){
        return audioAPI.updateBeatsPerMinute(bpm);
    }
    async function addFxPreset(track, effect) {
        const effectName = EffectsPreset[effect][0];
        await audioAPI.applyTrackEffect(track, effectName, EffectType[effectName]);
        const effectOptions = EffectsPreset[effect][1];
        await audioAPI.updateTrackEffect(track, effectName, effectOptions);
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
            const oldStopAllActiveSounds = StageMorph.prototype.runStopScripts;
            StageMorph.prototype.runStopScripts = function(){
                oldStopAllActiveSounds.call(this);
                stopAudio();
            }

        }


        onOpenRole() {
            for (var i =0; i <this.ide.sprites.contents.length; i++){
               createTrack(this.ide.sprites.contents[i].id);
            }
        }

        onNewSprite(sprite){
            createTrack(sprite.id);
        }

        getMenu() { return {}; }

        getCategories() {
            return [
                new Extension.Category('music', new Color(250, 51, 51)),
            ];
        }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('playAudioClip'),
                new Extension.Palette.Block('playAudioClipforDuration'),
                new Extension.Palette.Block('stopClips'),
                new Extension.Palette.Block('masterVolume'),
                new Extension.Palette.Block('trackVolume'),
                new Extension.Palette.Block('setGlobalBPM'),
                new Extension.Palette.Block('setTrackPanning'),
                new Extension.Palette.Block('applyTrackEffect'),
                new Extension.Palette.Block('setTrackEffect'),
                new Extension.Palette.Block('presetEffect')
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
                        const trackName = this.receiver.id;
                        console.log(audioBuffer);
                        const duration = await playAudio(audioBuffer, trackName);
                        await wait(duration-.02);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('playAudioClipforDuration', 'command', 'music', 'play audio clip for duration %n %s', ['1', 'clip'], function (dur,audioBuffer){
                    this.runAsyncFn(async () =>{
                        const trackName = this.receiver.id;
                        const duration = await playAudioForDuration(audioBuffer, trackName, dur);
                        await wait(duration-Math.max(.02,0));
                    },{ args: [], timeout: I32_MAX });
                }),
                block('stopClips', 'command', 'music', 'stop all clips', [], function (){
                    stopAudio();
                    this.doStopAll();
                }),
                block('masterVolume', 'command', 'music', 'master volume %n %', ['80'], function (percent){
                    masterVolume(percent * 0.01);
                }),
                block('trackVolume', 'command', 'music', 'track volume %n %', ['50'], function (percent){
                    const trackName = this.receiver.id;
                    trackVolume(trackName,percent* 0.01);
                }),
                block('setGlobalBPM', 'command', 'music','set global BPM %n', ['120'], function (bpm){
                    beatsPerMinute(bpm);
                }),
                block('setTrackPanning', 'command', 'music','set track panning %n', ['0.5'], function (level){
                    this.runAsyncFn(async () =>{
                        const trackName = this.receiver.id;
                        await setTrackPanning(trackName, level);
                  
                    },{ args: [], timeout: I32_MAX });
                }),
                block('applyTrackEffect', 'command', 'music','apply track %effects effect', [], function (effectName){
                    this.runAsyncFn(async () =>{
                        const trackName = this.receiver.id;
                        await applyTrackEffect(trackName, effectName);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('setTrackEffect', 'command', 'music','set track %effects effect to %n', ['','0'], function (effectName, level){
                    this.runAsyncFn(async () =>{
                        const trackName = this.receiver.id;
                        await setTrackEffect(trackName, effectName, level);
                    },{ args: [], timeout: I32_MAX });
                }),
                block('presetEffect', 'command', 'music', 'preset effects %fxPreset %onOff', ['', 'on'], function (effect, status) {
                    const trackName = this.receiver.id;
                    if (effect != '') {
                        if (status == 'on') {
                            this.runAsyncFn(async () => {
                                await addFxPreset(trackName, effect);
                            });
                        } else {
                            const effectName = EffectsPreset[effect][0];
                            this.runAsyncFn(async () => {
                                await window.audioAPI.removeTrackEffect(trackName, effectName)
                            });
                        }
                    } else {
                        throw Error('must select an effect');
                    }         
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
            new Extension.LabelPart('bpmNotes', () => new InputSlotMorph(
                null, //text
                false, // numeric
                unionMaps([
                    identityMap([ 'Whole', 'Half', 'Quarter', 'Eighth', 'Sixteenth', 'Thirtysecondth']),
                ]),
                true,
            )),
            new Extension.LabelPart('enabled', () => new InputSlotMorph(
                null, //text
                false, //numeric
                unionMaps([
                    identityMap(['Enabled', 'Disabled']),
                ]),
                true,
            )),
            new Extension.LabelPart('effects', () => new InputSlotMorph(
                null, //text
                false, //numeric
                identityMap(Object.keys(availableEffects)),
                true, //readonly (no arbitrary text)
            )),
            new Extension.LabelPart('fxPreset', () => new InputSlotMorph(
                null, // text
                false, //numeric
                identityMap(['Under Water', 'Telephone', 'Cave', 'Fan Blade']),
                true, // readonly (no arbitrary text)
            )),
            new Extension.LabelPart('onOff', () => new InputSlotMorph(
                null, // text
                false, //numeric
                identityMap(['on', 'off']),
                true, // readonly (no arbitrary text)
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