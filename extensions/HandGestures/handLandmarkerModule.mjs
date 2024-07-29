const localhost =
  window.location.search.includes("localhost") ||
  window.location.search.includes("127.0.0.1");
const root = localhost
  ? "http://localhost:8000/"
  : "https://extensions.netsblox.org/";

const DEVURL = {
  MODELPATHURL:
    "https://samankittani.github.io/mediapipe_models/models/hand_landmarker.task",
  VISIONMODULELOADERURL: root + "utils/visionModuleLoader.js",
};

const LANDMARKS = [
  "WRIST",
  "THUMB_cmc",
  "THUMB_mcp",
  "THUMB_ip",
  "THUMB_tip",
  "INDEX_mcp",
  "INDEX_pip",
  "INDEX_dip",
  "INDEX_tip",
  "MIDDLE_mcp",
  "MIDDLE_pip",
  "MIDDLE_dip",
  "MIDDLE_tip",
  "RING_mcp",
  "RING_pip",
  "RING_dip",
  "RING_tip",
  "PINKY_mcp",
  "PINKY_pip",
  "PINKY_dip",
  "PINKY_tip",
];

const DATAOPTIONS = ["Hand Landmarks", "World Landmarks", "Handedness"];

const CONFIGOPTIONS = [
  "Min Detect Confidence",
  "Min Presence Confidence",
  "Min Track Confidence",
  "Max Hands",
];

/* comparison helper */
function inRange(x, min, max) {
  return min <= x && x <= max;
}

/* dataOptionConverter */
function convertOption(option) {
  const index = DATAOPTIONS.indexOf(option);
  switch (index) {
    case 0:
      return "landmarks";

    case 1:
      return "worldLandmarks";

    case 2:
      return "handedness";

    default:
      return undefined;
  }
}

class VisionHandler {
  constructor() {
    this.modelPathUrl = DEVURL.MODELPATHURL;
    this.handLandmarker = null;

    this.expiry = 0;
    this.resolve = null;

    this.frameTime = 0;
  }

  static config = {
    data: null,
    updateTime: -1,
    options: {
      minDetConf: 0.5,
      minPresConf: 0.5,
      minTracConf: 0.5,
      maxHands: 2,
    },
  };

  async generateTask() {
    if (!Vision) {
      throw Error("Vision Module is loading");
    }

    this.handLandmarker = "loading...";
    console.log("Vision:", Vision.Task);
    this.handLandmarker = await Vision.Module.HandLandmarker.createFromOptions(
      Vision.Task,
      {
        baseOptions: {
          modelAssetPath: this.modelPathUrl,
          delegate: "GPU",
        },
        numHands: VisionHandler.config.options.maxHands,
        runningMode: "VIDEO",
        minHandDetectionConfidence: VisionHandler.config.options.minDetConf,
        minHandPresenceConfidence: VisionHandler.config.options.minPresConf,
        minTrackingConfidence: VisionHandler.config.options.minTracConf,
      },
    ).catch((err) => {
      this.handLandmarker = null;
      throw new Error(`Failed to generate vision task, Error: ${err}`);
    });
  }

  async infer(image) {
    if (this.handLandmarker === null) {
      await this.generateTask();
    }
    if (this.handLandmarker === "loading...") {
      throw new Error("handLandmarker is loading...");
    }
    if (this.resolve !== null) throw Error("VisionHandler is currently in use");
    this.resolve = "loading...";

    this.frameTime = performance.now();
    if (
      VisionHandler.config.data !== null &&
      this.frameTime - VisionHandler.config.updateTime < 5
    ) {
      this.resolve = null;
      return VisionHandler.config.data;
    }
    VisionHandler.config.updateTime = this.frameTime;

    this.expiry = +new Date() + 10000;

    return new Promise((resolve) => {
      VisionHandler.config.data = this.handLandmarker.detectForVideo(
        image,
        this.frameTime,
      );
      this.resolve = null;
      resolve(VisionHandler.config.data);
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

  // This function takes new model parameters and sets them for all handlers
  async resetHandleOptions() {
    await this.handLandmarker.setOptions({
      minHandPresenceConfidence: VisionHandler.config.options.minPresConf,
      minHandDetectionConfidence: VisionHandler.config.options.minDetConf,
      minTrackingConfidence: VisionHandler.config.options.minTracConf,
      numHands: VisionHandler.config.options.maxHands,
    });
    console.log(this.handLandmarker);
  }
}

const VISION_HANDLES = [];
function getVisionHandler() {
  for (const handle of VISION_HANDLES) {
    if (handle.isIdle()) {
      return handle;
    }
  }
  const handle = new VisionHandler();
  VISION_HANDLES.push(handle);
  return handle;
}

async function findHands(image) {
  const handle = getVisionHandler();
  return await handle.infer(image);
}

async function renderHands(image) {
  const data = await findHands(image);

  const context = image.getContext("2d");
  const drawer = new Vision.Module.DrawingUtils(context);

  for (const landmarks of data.landmarks) {
    drawer.drawConnectors(
      landmarks,
      Vision.Module.HandLandmarker.HAND_CONNECTIONS,
      { color: "#00ff00", lineWidth: 3 },
    );
    drawer.drawLandmarks(landmarks, { color: "#ff0000", lineWidth: 1 });
  }

  return image;
}

async function getCentralCoords(image) {
  const data = await findHands(image);
  if (!data || data.landmarks.length) {
    return data;
  }
  const imageCoords = data.landmarks;
  for (const hands of imageCoords) {
    for (const coord of hands) {
      coord.x = coord.x * image.width - image.width / 2;
      coord.y = 1 - (coord.y * image.height - image.height / 2);
      coord.z = coord.z * image.width - image.width / 2;
    }
  }
  return imageCoords;
}

async function getCentralCoord(image, landmark) {
  const data = await findHands(image);
  if (!data || !data.landmarks.length) {
    return;
  }
  const index = LANDMARKS.indexOf(landmark);
  const coords = data.landmarks[0][index]; /* does hand 0 everytime */

  const centralCoords = {
    x: coords.x * image.width - image.width / 2,
    y: 1 - coords.y * image.height - image.height / 2,
    z: coords.z, //* image.width) - (image.width/2)
  };

  return centralCoords;
}

async function parseLandmark(image, option, landmark) {
  const data = await findHands(image);
  const convOption = convertOption(option);
  const coords = data[convOption];
  const res = new Array();

  for (const hand of coords) {
    const index = LANDMARKS.indexOf(landmark);
    res.push(hand[index]);
  }
  return res;
}

async function parseLandmarkDistance(image, landmark1, landmark2) {
  const data = await findHands(image);
  const coords = data.landmarks;
  const res = new Array();

  for (const hand of coords) {
    const index1 = LANDMARKS.indexOf(landmark1);
    const index2 = LANDMARKS.indexOf(landmark2);
    const dist = Math.sqrt(
      ((hand[index1].x - hand[index2].x) * image.width) ** 2 +
        ((hand[index1].y - hand[index2].y) * image.height) ** 2,
    );
    res.push(dist);
  }

  return res;
}

async function parseNormalLandmarkDist(image, landmark1, landmark2) {
  const data = await findHands(image);

  const coords = data.landmarks[0];

  if (!coords || coords.length === 0) {
    return [];
  }

  const index1 = LANDMARKS.indexOf(landmark1);
  const index2 = LANDMARKS.indexOf(landmark2);
  const distance = Math.sqrt(
    (coords[index1].x - coords[index2].x) ** 2 +
      (coords[index1].y - coords[index2].y) ** 2 +
      (coords[index1].z - coords[index2].z) ** 2,
  );

  return distance;
}

function updateConfig(option, newValue) {
  switch (option) {
    case "Min Detect Confidence":
      VisionHandler.config.options.minDetConf = newValue;
      break;
    case "Min Presence Confidence":
      VisionHandler.config.options.minPresConf = newValue;
      break;
    case "Min Track Confidence":
      VisionHandler.config.options.minTracConf = newValue;
      break;
    case "Max Hands":
      VisionHandler.config.options.maxHands = newValue;
      break;
    default:
      throw Error("invalid Option");
  }
}

async function updateAllHandleOptions(option, newValue) {
  let min, max;
  switch (option) {
    case "Max Hands":
      min = 1;
      max = 4;
      break;
    default:
      min = 0;
      max = 1;
      break;
  }

  if (!inRange(newValue, min, max)) {
    throw new Error("Invalid Options Value");
  }

  updateConfig(option, newValue);
  for (const handle of VISION_HANDLES) {
    handle.resetHandleOptions();
  }
}

function isValidLandmark(landmark) {
  return LANDMARKS.indexOf(landmark) !== -1 ? true : false;
}

function isValidDataOption(dataOption) {
  return DATAOPTIONS.indexOf(dataOption) !== -1 ? true : false;
}
function isValidConfigOption(configOption) {
  return CONFIGOPTIONS.indexOf(configOption) !== -1 ? true : false;
}

if (!document.getElementById("visionModule")) {
  const script = document.createElement("script");
  script.id = "visionModule";
  script.type = "text/javascript";
  script.src = DEVURL.VISIONMODULELOADERURL;
  script.async = false;
  script.crossOrigin = "anonymous";
  document.body.appendChild(script);
}

export {
  findHands,
  getCentralCoord,
  getCentralCoords,
  getVisionHandler,
  isValidConfigOption,
  isValidDataOption,
  isValidLandmark,
  parseLandmark,
  parseLandmarkDistance,
  parseNormalLandmarkDist,
  renderHands,
  updateAllHandleOptions,
  VISION_HANDLES,
  VisionHandler,
};
