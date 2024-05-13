const positVersion = 1;

class aprilTagHandler {
  constructor() {
    this.detector = new AR.Detector({
      dictionaryName: aprilTagHandler.config.dictionary,
      maxHammingDistance: 3,
    });
    this.state = "Idle";
    this.expiry = 0;
  }

  static config = {
    dictionary: "APRILTAG_16h5",
  };

  async detectAR(imageData) {
    this.state = "Detecting...";
    this.expiry = +new Date() + 10000;
    const markers = this.detector.detect(imageData);
    this.state = "Idle";
    return markers;
  }
  isIdle() {
    if (this.status === "Idle") {
      return true;
    }
    if (+new Date() > this.expiry) {
      this.state = "Idle";
      return true;
    }
    return false;
  }
}

const APRILTAGHANDLERS = [];

function getAprilHandler() {
  for (const handler of APRILTAGHANDLERS) {
    if (handler.isIdle()) {
      return handler;
    }
  }
  const newHandler = new aprilTagHandler();
  APRILTAGHANDLERS.push(newHandler);
  return newHandler;
}

function resetAllDetectors(dict) {
  for (const handler of APRILTAGHANDLERS) {
    (async (handler, dict) => {
      console.log(handler, dict);
      handler.detector = new AR.Detector({ dictionaryName: dict });
      console.log(handler, dict);
    })(handler, dict);
  }
}

async function getCoordinates(image) {
  const handler = getAprilHandler();
  const context = image.getContext("2d");
  const imageData = context.getImageData(0, 0, image.width, image.height);

  const markers = await handler.detectAR(imageData);
  return markers;
}

function transformCoordinates(markers, image) {
  if (markers.length === 0) {
    return markers;
  }

  for (const marker of markers) {
    for (const corner of marker.corners) {
      corner.x = corner.x - (image.width / 2);
      corner.y = 1 - (corner.y - (image.height / 2));
    }
    return markers;
  }
}

async function isTagVisible(image, value) {
  const markers = await getCoordinates(image);
  for (const marker of markers) {
    if (value.indexOf(marker.id) !== -1) {
      return true;
    }
  }
  return false;
}

async function getVisibleTags(image) {
  const handler = getAprilHandler();
  const res = (new Array(handler.detector.dictionary.codeList.length)).fill(
    false,
  );
  const markers = await getCoordinates(image);
  for (const marker of markers) {
    res[marker.id] = true;
  }
  return res;
}

function getDictionary() {
  return aprilTagHandler.config.dictionary;
}

function setDictionary(dict) {
  if (dict === aprilTagHandler.config.dictionary) {
    return;
  }
  aprilTagHandler.config.dictionary = dict;
  resetAllDetectors(dict);
}

const DEVURL = {
  SVDURL: "https://samankittani.github.io/js-aruco2/src/svd.js",
  POSIT1URL:
    `https://samankittani.github.io/js-aruco2/src/posit${positVersion}.js`,
  CVURL: "https://samankittani.github.io/js-aruco2/src/cv.js",
  ARUCOURL: "https://samankittani.github.io/js-aruco2/src/aruco.js",
  TAGDICURL01:
    "https://samankittani.github.io/js-aruco2/src/dictionaries/apriltag_16h5.js",
  TAGDICURL02:
    "https://samankittani.github.io/js-aruco2/src/dictionaries/apriltag_16h5_duo.js",
  TAGDICURL03:
    "https://samankittani.github.io/js-aruco2/src/dictionaries/apriltag_16h5_mini.js",
};
const sources = Object.values(DEVURL);

if ((document.getElementsByClassName("ARScripts")).length === 0) {
  for (const source of sources) {
    const script = document.createElement("script");
    script.className = "ARScipts";
    script.type = "text/javascript";
    script.src = source;
    script.async = false;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }
}

export {
  getCoordinates,
  getDictionary,
  getVisibleTags,
  isTagVisible,
  setDictionary,
  transformCoordinates,
};
