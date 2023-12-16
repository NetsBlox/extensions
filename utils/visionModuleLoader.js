const Vision = {
  Module: null,
  Task: null
};

(function (){

  const DEVURL = {};

  if(window.location.href.includes('localhost')){
    DEVURL.VisionModuleURL = 'http://localhost:8000/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs';
    DEVURL.WASMURL = 'http://localhost:8000/node_modules/@mediapipe/tasks-vision/wasm';
  }else{
    DEVURL.VisionModuleURL = 'https://extensions.netsblox.org/node_modules/@mediapipe/tasks-vision/vision_bundle.mjs';
    DEVURL.WASMURL = 'https://extensions.netsblox.org/node_modules/@mediapipe/tasks-vision/wasm';
  }

  async function loadVisionModule() {
      const module = await import(DEVURL.VisionModuleURL);
      console.log(module);
      return module;
    }
    
  async function loadVisionTask(VisionModule) {
    const vision = await VisionModule.FilesetResolver.forVisionTasks(DEVURL.WASMURL);
      console.log(vision);
    return vision;
  } 
  
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
  })();;