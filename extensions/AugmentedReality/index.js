(async function () {

  let videoMirrored = false;

  const positVersion = 1;
  const localMode = window.location.href.includes('localhost');
  
  const rendererURL = 
    localMode?  'http://localhost:8000/extensions/AugmentedReality/js/renderModule.mjs':
                'https://extensions.netsblox.org/extensions/AugmentedReality/js/renderModule.mjs';
  
  const tagURL = 
    localMode?  'http://localhost:8000/extensions/AugmentedReality/js/tagHandler.mjs':
                'https://extensions.netsblox.org/extensions/AugmentedReality/js/tagHandler.mjs';

  const renderModule = await import(rendererURL);
  const tagModule = await import(tagURL);
  
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
    }

    onOpenRole() {
      this.ide.stage.mirrorVideo = false;
    }

    getMenu() { return {
           
      'Code Generator': function () {
        new ArucoGenMorph().popUp(world);
      },

    }; }

    getCategories() { return []; }

    getPalette() {
      const blocks = [
        new Extension.Palette.Block('ARCodeTracker'),
        new Extension.Palette.Block('ARCodeFlag'),
        new Extension.Palette.Block('ARCodeRender'),
        new Extension.Palette.Block('ARCodeFlipVideo')
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
            if (!image || typeof(image) !== 'object' || !image.width || !image.height) 
              throw TypeError('Expected an image as input');
            
            const coordinates = await tagModule.getCoordinates(image);
            const res = await tagModule.transformCoordinates(coordinates, image);

            return snapify(res);        

          }, { args: [], timeout: 10000 });
        }),            

        block('ARCodeFlag', 'predicate', 'sensing', 'AR code %n visible in %s ?', [], function (value, image) {
          return this.runAsyncFn(async () => {

            image = image?.contents || image;
            if (!image || typeof(image) !== 'object' || !image.width || !image.height){
              throw TypeError('Expected an image as input');
            }

            console.log(value);
            value = value?.contents || value;

            if(typeof(value) === 'number'){
              const temp = Array();
              temp.push(value);
              value = temp;
            }
            if (!value || !value.length){
              throw TypeError('Expected number or list');
            }

            for(let i = 0; i < value.length; i++){
              if(typeof(value[i]) === 'string' && !(value[i] = parseInt(value[i]))){
                throw TypeError('list elements must be numbers');
              }
            }

            const visible = await tagModule.isTagVisible(image, value);

            return snapify(visible);
            
          }, { args: [], timeout: 10000 });
        }),

        block('ARCodeRender', 'reporter', 'sensing', 'render %model on %s', ['box'], function (model, image) {
          return this.runAsyncFn(async () => {
            
            image = image?.contents || image;
            if (!image || typeof(image) !== 'object' || !image.width || !image.height){
              throw TypeError('Expected an image as input');
            }
            const res = await renderModule.renderScene(image, model);

            return new Costume(res);        

          }, { args: [], timeout: 10000 });
        }),

        block('ARCodeFlipVideo', 'command', 'sensing', 'flip video', [], function () {
          return this.runAsyncFn(async () => {
            
            world.children[0].stage.mirrorVideo = !videoMirrored;
            videoMirrored = world.children[0].stage.mirrorVideo;

          }, { args: [], timeout: 10000 });
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
        new Extension.LabelPart('model', () => new InputSlotMorph(
          null, // text
          false, // numeric
          identityMap(['box', 'drum', 'piano']), 
          true
        )),
      ];
    }
  }

  const sources = ['http://localhost:8000/extensions/AugmentedReality/js/ui-morphs.js'];

  for(const source of sources){
    const script = document.createElement('script');
    script.class = 'ARUIScripts'; 
    script.type = 'text/javascript';
    script.src = source;
    script.async = false;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  } 

  NetsBloxExtensions.register(AugmentedReality);
  disableRetinaSupport();
})();
