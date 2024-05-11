import * as three from "https://esm.run/three@0.160.0";
import * as GLTFModule from "https://esm.run/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import * as handModule from "../../HandGestures/handLandmarkerModule.mjs";
import * as tagModule from "./tagHandler.mjs";
import * as filters from "./filters.mjs";

const localhost = window.location.search.includes("localhost");
const root = localhost
  ? "http://localhost:8000/"
  : "https://extensions.netsblox.org/";

const models = {};

function setModelDic() {
  Object.defineProperty(models, "box", {
    value: { mesh: createBoxObj(0xaa0000), scalar: 6 },
    writable: false,
  });
  console.log(models);
  createDrumObj();
  createPianoObj();
}

setModelDic();

function createDrumObj() {
  const loader = new GLTFModule.GLTFLoader();
  const modelURL =
    "https://samankittani.github.io/GLTF_Model_Server/models/drum/untitled.gltf";

  loader.load(
    modelURL,
    function (gltf) {
      const drum = gltf.scene.children[0];
      Object.defineProperty(models, "drum", {
        value: { mesh: drum, scalar: .1 },
        writable: false,
      });
    },
    undefined,
    function (error) {
      console.error(error);
    },
  );
}

function createPianoObj() {
  const loader = new GLTFModule.GLTFLoader();
  const modelURL =
    "https://samankittani.github.io/GLTF_Model_Server/models/piano/untitled.gltf";

  loader.load(
    modelURL,
    function (gltf) {
      const piano = gltf.scene.children[0];
      Object.defineProperty(models, "piano", {
        value: { mesh: piano, scalar: 20 },
        writable: false,
      });
    },
    undefined,
    function (error) {
      console.error(error);
    },
  );
}

function createBoxObj(hexColor) {
  const geometry = new three.BoxGeometry(1, 1, 1);
  const material = new three.MeshPhongMaterial({ color: hexColor });
  const mesh = new three.Mesh(geometry, material);

  return mesh;
}

class ThreeJSHandler {
  constructor() {
    this.image;
    this.context;

    this.renderer;

    this.imageScene;
    this.imageCamera;
    this.imagePlane;

    this.objScene;
    this.objCamera;
    this.objLight;
    this.obj;
    this.objScale;

    this.handPosit;
    this.handPositModelSize = 1; // in millimeters
    this.indexBox;
    this.handData;

    this.oldIndexBoxPosition = { x: 0, y: 0, z: 0 };
    this.handBoxScale = 10;

    this.posit;
    this.positModelSize = 35.0;
    this.pose;
    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;
    this.expFilter = new filters.singleExpFilter([0, 0, 0], .8);

    this.initScene();

    this.markers;
    this.corners;

    this.status = "idle";
    this.expiry = 0;
  }

  initScene() {
    this.createRenderer();
    this.createScenes();
  }

  createRenderer() {
    this.renderer = new three.WebGLRenderer();
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.autoClear = false;
  }

  createScenes() {
    this.imageScene = new three.Scene();
    this.imageCamera = new three.OrthographicCamera(-.5, .5, .5, -.5);
    this.createImagePlane();
    this.imageScene.add(this.imageCamera, this.imagePlane);

    this.objScene = new three.Scene();

    const stage = world.children[0].stage;

    this.objCamera = new three.PerspectiveCamera(
      40,
      stage.width() / stage.height(),
      1,
      1000,
    );
    this.objLight = new three.AmbientLight(0xffffff);

    this.indexBox = createBoxObj(0x5f5f5f);

    this.objScene.add(this.objCamera, this.objLight, this.indexBox);
  }

  createImagePlane() {
    const texture = new three.CanvasTexture();
    const geometry = new three.PlaneGeometry(1.0, 1.0);
    const material = new three.MeshBasicMaterial({
      map: texture,
      depthTest: false,
      depthWrite: false,
    });
    this.imagePlane = new three.Mesh(geometry, material);

    this.imagePlane.position.z = -1;
  }

  async getRender(image, obj) {
    this.state = "initializing";
    this.expiry = +new Date() + 10000;

    this.markers = await tagModule.getCoordinates(image);
    this.markers = tagModule.transformCoordinates(this.markers, image);

    this.updateValues(image, obj);
    this.orientObj();
    this.scaleObj();
    this.updateImagePlane();
    await this.updateHandObj(image);
    return this.render();
  }

  render() {
    this.renderer.clear();

    this.renderer.render(this.imageScene, this.imageCamera);
    this.renderer.render(this.objScene, this.objCamera);
    this.status = "Idle";
    return this.renderer.domElement;
  }

  updateValues(image, obj) {
    if (!this.image || this.image.width !== image.width) {
      this.objCamera.aspect = image.width / image.height;
      this.objCamera.updateProjectionMatrix();
      this.posit = new POS.Posit(this.positModelSize, image.width);
      this.handPosit = new POS.Posit(this.handPositModelSize, image.width);
      this.renderer.setSize(image.width, image.height);
    }
    this.image = image;
    this.context = this.image.getContext("2d");
    if (this.obj) {
      this.objScene.remove(this.obj);
    }
    this.obj = obj.mesh;
    this.objScene.add(this.obj);
    this.objScale = obj.scalar;
    this.obj.position.z = -2;

    if (this.markers[0]) {
      this.pose = this.posit.pose(this.markers[0].corners);
      console.log(this.pose.bestTranslation);
      this.updateAngles(this.pose.bestRotation);
      this.moveObj(this.pose.bestTranslation);
    }
  }

  updateImagePlane() {
    const texture = new three.CanvasTexture(this.image);
    this.imagePlane.material.map = texture;
    this.imagePlane.material.needsUpdate = true;
  }

  orientObj() {
    if (this.obj && this.yaw) {
      this.obj.rotation.x = -this.pitch;
      this.obj.rotation.y = -this.yaw;
      this.obj.rotation.z = this.roll;
    }
  }

  moveObj(transMatrix) {
    if (this.obj) {
      this.obj.position.x = transMatrix[0];
      this.obj.position.y = transMatrix[1];
      this.obj.position.z = -transMatrix[2];
    }
  }

  scaleObj() {
    if (this.obj) {
      this.obj.scale.x = this.positModelSize * this.objScale;
      this.obj.scale.y = this.positModelSize * this.objScale;
      this.obj.scale.z = this.positModelSize * this.objScale;
    }
  }

  updateAngles(matrix) {
    this.yaw = Math.atan2(matrix[0][2], matrix[2][2]);
    this.pitch = Math.asin(-matrix[1][2]);
    this.roll = Math.atan2(matrix[1][0], matrix[1][1]);

    [this.yaw, this.pitch, this.roll] = this.expFilter.filter(
      this.yaw,
      this.pitch,
      this.roll,
    );
  }

  async updateHandObj(img) {
    const data = await handModule.findHands(img);
    if (!data.landmarks[0]) {
      return;
    }
    this.handData = data.landmarks[0];

    const corners = this.createCoplanarCoords(this.handData);
    const pose = this.handPosit.pose(corners);
    this.transformHandObj(pose);
  }

  transformHandObj(pose) {
    this.moveHandObj(pose.bestTranslation);
    this.scaleHandObj();
  }

  moveHandObj(transMatrix) {
    console.log(transMatrix);
    if (this.obj) {
      this.oldIndexBoxPosition.x = this.indexBox.position.x;
      this.oldIndexBoxPosition.y = this.indexBox.position.y;
      this.oldIndexBoxPosition.z = this.indexBox.position.z;

      this.indexBox.position.x = transMatrix[0];
      this.indexBox.position.y = transMatrix[1];
      this.indexBox.position.z = -transMatrix[2];
    }
  }

  scaleHandObj() {
    if (this.obj) {
      this.indexBox.scale.x = this.handPositModelSize * this.handBoxScale;
      this.indexBox.scale.y = this.handPositModelSize * this.handBoxScale;
      this.indexBox.scale.z = this.handPositModelSize * this.handBoxScale;
    }
  }

  createCoplanarCoords(data) {
    const centeredData = this.centerData(data);
    const res = new Array();
    const sep = this.getSeperation() * 3;

    res.push({
      x: Math.floor(centeredData[8].x) + sep,
      y: Math.floor(centeredData[8].y) - sep,
    });
    res.push({
      x: Math.floor(centeredData[8].x) - sep,
      y: Math.floor(centeredData[8].y) - sep,
    });
    res.push({
      x: Math.floor(centeredData[8].x) - sep,
      y: Math.floor(centeredData[8].y) + sep,
    });
    res.push({
      x: Math.floor(centeredData[8].x) + sep,
      y: Math.floor(centeredData[8].y) + sep,
    });
    return res;
  }

  centerData(data) {
    const res = new Array();

    for (const mark of data) {
      const newData = {
        x: (mark.x * this.image.width) - (this.image.width / 2),
        y: (this.image.height / 2) - (mark.y * this.image.height),
      };
      res.push(newData);
    }
    return res;
  }

  getSeperation() {
    const data = this.handData;

    if (!data || data.length === 0) {
      return;
    }
    const dist = Math.sqrt(
      (data[8].x - data[6].x) ** 2 +
        (data[8].y - data[6].y) ** 2 +
        ((data[8].z - data[6].z) * 2) ** 2,
    );

    console.log(`dist: ${dist}`);
    return dist;
  }

  intersectionForce() {
    const eucDist = Math.sqrt(
      (this.indexBox.position.x - this.oldIndexBoxPosition.x) ** 2 +
        (this.indexBox.position.y - this.oldIndexBoxPosition.y) ** 2 +
        (this.indexBox.position.z - this.oldIndexBoxPosition.z) ** 2,
    );

    const speed = this.isHandOverlapping() ? eucDist : 0;
    return speed;
  }

  isHandOverlapping() {
    let objMesh = this.obj;
    while (!objMesh.isMesh) {
      objMesh = objMesh.children[0];
    }
    objMesh.updateMatrixWorld();
    this.indexBox.updateMatrixWorld();
    let bounding1 = objMesh.geometry.boundingBox.clone();
    bounding1.applyMatrix4(objMesh.matrixWorld);
    let bounding2 = this.indexBox.geometry.boundingBox.clone();
    bounding2.applyMatrix4(this.indexBox.matrixWorld);

    if (bounding1.intersectsBox(bounding2)) {
      return true;
    }
    return false;
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

const RENDERERS = [];
function getRenderer() {
  if (!three) throw new Error("three not loaded yet");
  for (const renderer of RENDERERS) {
    if (renderer.isIdle()) {
      return renderer;
    }
  }
  const newRenderer = new ThreeJSHandler();
  RENDERERS.push(newRenderer);
  return newRenderer;
}

async function renderScene(image, objKey) {
  const renderer = getRenderer();
  return await renderer.getRender(image, models[objKey]);
}

export { renderScene };
