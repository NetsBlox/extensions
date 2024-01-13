const positVersion = 1;

const localhost = (await fetch('http://localhost:8000/extensions/AugmentedReality/js/tagHandler.mjs')).ok;

class aprilTagHandler {
  constructor() {
    this.detector = new AR.Detector({dictionaryName: 'APRILTAG_16h5'});
    this.state = 'Idle';
    this.expiry = 0;
  }
  async detectAR(imageData){
    this.state = 'Detecting...';
    this.expiry = +new Date() + 10000;
    const markers = this.detector.detect(imageData);
    this.state = 'Idle';
    return markers;
  }
  isIdle() {
    if(this.status === 'Idle')
      return true;
    if(+new Date() > this.expiry){
      this.state = 'Idle';
      return true;
    }
    return false;
  }
}

const APRILTAGHANDLERS = [];

function getAprilHandler(){
  for(const handler of APRILTAGHANDLERS){
    if(handler.isIdle())
      return handler;
  }
  const newHandler = new aprilTagHandler();
  APRILTAGHANDLERS.push(newHandler);
  return newHandler;
}

async function getCoordinates(image){
  const handler = getAprilHandler();
  const context = image.getContext('2d');
  const imageData = context.getImageData(0,0,image.width, image.height);         
  
  const markers = await handler.detectAR(imageData);
  console.log('markers:');
  console.log(markers);

  return markers;
}

function transformCoordinates(markers, image){
  if(markers.length === 0){
    return markers;
  }

  for(let marker of markers){
    for(let corner of marker.corners){
      corner.x = corner.x - (image.width/2);
      corner.y = 1 - (corner.y - (image.height/2));
    }
  return markers;
  }
}

async function isTagVisible(image, value) {
  const markers = await getCoordinates(image);
  for(let marker of markers){
    if(value.indexOf(marker.id) !== -1){
      return true;
    }
  }
  return false;
}

async function getVisibleTags(image) {
  const res = (new Array(30)).fill(false);
  const markers = await getCoordinates(image);
  for(let marker of markers){
    res[marker.id] = true;
  }
  return res;
}

const DEVURL = {
    SVDURL: 
    'https://samankittani.github.io/js-aruco2/src/svd.js',
    POSIT1URL: 
    `https://samankittani.github.io/js-aruco2/src/posit${positVersion}.js`,
    CVURL: 
    'https://samankittani.github.io/js-aruco2/src/cv.js',
    ARUCOURL: 
    'https://samankittani.github.io/js-aruco2/src/aruco.js',
    APRILTAGURL: 
    'https://samankittani.github.io/js-aruco2/src/dictionaries/apriltag_16h5.js'
   }
  const sources = Object.values(DEVURL);

  if((document.getElementsByClassName("ARScripts")).length === 0){
    for(const source of sources){
      const script = document.createElement('script');
      script.className = 'ARScipts'; 
      script.type = 'text/javascript';
      script.src = source;
      script.async = false;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
  }  

export {getCoordinates, transformCoordinates, isTagVisible, getVisibleTags}
