function print(){
  console.log(this);
}

/* const DEVURL = {}
    
if(window.location.href.includes('localhost')){
  DEVURL.MODELPATHURL = "http://localhost:8000/extensions/HandGestures/Models/hand_landmarker.task",
  DEVURL.VISIONMODULELOADERURL = 'http://localhost:8000/utils/visionModuleLoader.js';  
}else{
  DEVURL.MODELPATHURL = "https://extensions.netsblox.org/extensions/HandGestures/Models/hand_landmarker.task",
  DEVURL.VISIONMODULELOADERURL = 'https://extensions.netsblox.org/utils/visionModuleLoader.js';
}

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
        modelAssetPath: DEVURL.MODELPATHURL,
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
} */

export {print}