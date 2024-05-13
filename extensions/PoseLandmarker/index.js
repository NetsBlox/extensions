(async function () {
  const localhost = window.location.search.includes("localhost");
  const root = localhost
    ? "http://localhost:8000/"
    : "https://extensions.netsblox.org/";

  const DEVURL = {
    MODELPATHURL:
      "https://samankittani.github.io/mediapipe_models/models/pose_landmarker_full.task",
    VISIONMODULELOADERURL: root + "utils/visionModuleLoader.js",
  };

  class PoseHandler {
    constructor() {
      this.poseLandmarker = null;

      this.expiry = 0;
      this.resolve = null;

      this.frameTime = 0;
    }

    static config = {
      data: null,
      updateTime: -1,
      options: {
        numPoses: 1,
        minPoseDetConf: .5,
        minPosePresConf: .5,
        minTracConf: .5,
        segMask: false,
      },
    };

    async generateTask() {
      if (!Vision) {
        throw Error("Vision Module is loading...");
      }

      if (this.poseLandmarker === "loading...") {
        throw Error("PoseLandmarker is currently loading");
      }

      this.poseLandmarker = "loading...";

      this.poseLandmarker = await Vision.Module.PoseLandmarker
        .createFromOptions(Vision.Task, {
          baseOptions: {
            modelAssetPath: DEVURL.MODELPATHURL,
            delegate: "GPU",
          },
          numPoses: PoseHandler.config.options.numPoses,
          runningMode: "VIDEO",
          minPoseDetectionConfidence: PoseHandler.config.options.minPoseDetConf,
          minPosePresenceConfidence: PoseHandler.config.options.minPosePresConf,
          minTrackingConfidence: PoseHandler.config.options.minTracConf,
        }).catch((err) => {
          throw new Error(`Failed to generate vision task: Error: ${err}`);
        });
    }

    async infer(image) {
      if (this.poseLandmarker === null) {
        await this.generateTask();
      }
      if (this.poseLandmarker === "loading...") {
        throw new Error("poseLandmarker is loading...");
      }
      if (this.resolve !== null) throw Error("PoseHandler is currently in use");
      this.resolve = "loading...";

      this.frameTime = performance.now();
      if (
        PoseHandler.config.data !== null &&
        ((this.frameTime - PoseHandler.config.updateTime) < 10)
      ) {
        this.resolve = null;
        return PoseHandler.config.data;
      }
      PoseHandler.config.updateTime = this.frameTime;

      this.expiry = +new Date() + 10000;

      return new Promise((resolve) => {
        PoseHandler.config.data = this.poseLandmarker.detectForVideo(
          image,
          this.frameTime,
        );
        this.resolve = null;
        resolve(PoseHandler.config.data);
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

  const POSE_HANDLES = [];
  function getPoseHandler() {
    for (const handle of POSE_HANDLES) {
      if (handle.isIdle()) {
        return handle;
      }
    }
    const handle = new PoseHandler();
    POSE_HANDLES.push(handle);
    return handle;
  }

  async function findPose(image) {
    const handle = getPoseHandler();
    return await handle.infer(image);
  }

  async function renderPose(image) {
    const data = await findPose(image);

    const context = image.getContext("2d");
    const drawer = new Vision.Module.DrawingUtils(context);

    for (const landmarks of data.landmarks) {
      drawer.drawConnectors(
        landmarks,
        Vision.Module.PoseLandmarker.POSE_CONNECTIONS,
      );
      drawer.drawLandmarks(landmarks);
    }
    return image;
  }

  function snapify(value) {
    if (Array.isArray(value)) {
      const res = [];
      for (const item of value) res.push(snapify(item));
      return new List(res);
    } else if (typeof value === "object") {
      const res = [];
      for (const key in value) res.push(new List([key, snapify(value[key])]));
      return new List(res);
    } else return value;
  }

  class PoseLandmarker extends Extension {
    constructor(ide) {
      super("PoseLandmarker");
      this.ide = ide;
    }

    onOpenRole() {}

    getMenu() {
      return {};
    }

    getCategories() {
      return [];
    }

    getPalette() {
      const blocks = [
        new Extension.Palette.Block("poseLandmarksFindPose"),
        new Extension.Palette.Block("poseLandmarksRender"),
      ];
      return [
        new Extension.PaletteCategory("sensing", blocks, SpriteMorph),
        new Extension.PaletteCategory("sensing", blocks, StageMorph),
      ];
    }

    getBlocks() {
      function block(name, type, category, spec, defaults, action) {
        return new Extension.Block(name, type, category, spec, defaults, action)
          .for(SpriteMorph, StageMorph);
      }
      return [
        block(
          "poseLandmarksFindPose",
          "reporter",
          "sensing",
          "pose data from %s",
          [],
          function (img) {
            return this.runAsyncFn(async () => {
              img = img?.contents || img;
              if (
                !img || typeof img !== "object" || !img.width || !img.height
              ) throw Error("Expected an image as input");

              const res = await findPose(img);
              return snapify(res);
            }, { args: [], timeout: 10000 });
          },
        ),

        block(
          "poseLandmarksRender",
          "reporter",
          "sensing",
          "render pose from %s",
          [""],
          function (img) {
            return this.runAsyncFn(async () => {
              img = img?.contents || img;

              if (
                !img || typeof img !== "object" || !img.width || !img.height
              ) throw Error("Expected an image as input");

              const res = await renderPose(img);
              return new Costume(res);
            }, { args: [], timeout: 10000 });
          },
        ),
      ];
    }

    getLabelParts() {
      function identityMap(s) {
        const res = {};
        for (const x of s) res[x] = x;
        return res;
      }
      return [];
    }
  }

  const visionSource = DEVURL.VISIONMODULELOADERURL;
  if (!document.getElementById("visionModule")) {
    const script = document.createElement("script");
    script.id = "visionModule";
    script.type = "text/javascript";
    script.src = visionSource;
    script.async = false;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }

  NetsBloxExtensions.register(PoseLandmarker);
  disableRetinaSupport();
})();
