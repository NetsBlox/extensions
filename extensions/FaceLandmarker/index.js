(async function () {
  const localhost = window.location.search.includes("localhost");
  const root = localhost
    ? "http://localhost:8000/"
    : "https://extensions.netsblox.org/";

  const DEVURL = {
    MODELPATHURL:
      "https://samankittani.github.io/mediapipe_models/models/face_landmarker.task",
    VISIONMODULELOADERURL: root + "utils/visionModuleLoader.js",
  };

  class FaceHandler {
    constructor() {
      this.faceLandmarker = null;

      this.expiry = 0;
      this.resolve = null;

      this.frameTime = 0;
    }

    static config = {
      data: null,
      updateTime: -1,
      options: {
        numFaces: 1,
        minFaceDetConf: .5,
        minFacePresConf: .5,
        minTracConf: .5,
        segMask: false,
      },
    };

    async generateTask() {
      if (!Vision) {
        throw Error("Vision Module is loading...");
      }

      if (this.faceLandmarker === "loading...") {
        throw Error("faceLandmarker is currently loading");
      }

      this.faceLandmarker = "loading...";

      this.faceLandmarker = await Vision.Module.FaceLandmarker
        .createFromOptions(Vision.Task, {
          baseOptions: {
            modelAssetPath: DEVURL.MODELPATHURL,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          outputFaceBlendshapes: true,
          numFaces: FaceHandler.config.options.numFaces,
          minFaceDetectionConfidence: FaceHandler.config.options.minFaceDetConf,
          minFacePresenceConfidence: FaceHandler.config.options.minFacePresConf,
          minTrackingConfidence: FaceHandler.config.options.minTracConf,
        }).catch((err) => {
          throw new Error(`Failed to generate vision task: Error: ${err}`);
        });
    }

    async infer(image) {
      if (this.faceLandmarker === null) {
        await this.generateTask();
      }
      if (this.faceLandmarker === "loading...") {
        throw new Error("handLandmarker is loading...");
      }
      if (this.resolve !== null) throw Error("FaceHandler is currently in use");
      this.resolve = "loading...";

      this.frameTime = performance.now();
      if (
        FaceHandler.config.data !== null &&
        ((this.frameTime - FaceHandler.config.updateTime) < 10)
      ) {
        this.resolve = null;
        return FaceHandler.config.data;
      }
      FaceHandler.config.updateTime = this.frameTime;

      this.expiry = +new Date() + 10000;

      return new Promise((resolve) => {
        FaceHandler.config.data = this.faceLandmarker.detectForVideo(
          image,
          this.frameTime,
        );
        this.resolve = null;
        resolve(FaceHandler.config.data);
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

  const FACE_HANDLES = [];
  function getFaceHandler() {
    for (const handle of FACE_HANDLES) {
      if (handle.isIdle()) {
        return handle;
      }
    }
    const handle = new FaceHandler();
    FACE_HANDLES.push(handle);
    return handle;
  }

  async function findFace(image) {
    const handle = getFaceHandler();
    return await handle.infer(image);
  }

  async function renderFace(image) {
    const data = await findFace(image);
    if (typeof data === "string") {
      return data;
    }
    const context = image.getContext("2d");
    const drawer = new Vision.Module.DrawingUtils(context);

    for (const landmarks of data.faceLandmarks) {
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_TESSELATION,
        { color: "#C0C0C070", lineWidth: 1 },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
        { color: "#30FF30" },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
        { color: "#30FF30" },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
        { color: "#30FF30" },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
        { color: "#30FF30" },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
        { color: "#30FF30" },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_LIPS,
        { color: "#30FF30" },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
        { color: "#30FF30" },
      );
      drawer.drawConnectors(
        landmarks,
        Vision.Module.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
        { color: "#30FF30" },
      );
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

  class FaceLandmarker extends Extension {
    constructor(ide) {
      super("FaceLandmarker");
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
        new Extension.Palette.Block("faceLandmarksFindFace"),
        new Extension.Palette.Block("faceLandmarksRender"),
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
          "faceLandmarksFindFace",
          "reporter",
          "sensing",
          "get face data from %s",
          [],
          function (img) {
            return this.runAsyncFn(async () => {
              img = img?.contents || img;
              if (
                !img || typeof img !== "object" || !img.width || !img.height
              ) throw Error("Expected an image as input");

              const res = await findFace(img);

              return snapify(res);
            }, { args: [], timeout: 10000 });
          },
        ),

        block("faceLandmarksRender", "reporter", "sensing", "render face %s", [
          "",
        ], function (img) {
          return this.runAsyncFn(async () => {
            img = img?.contents || img;

            if (!img || typeof img !== "object" || !img.width || !img.height) {
              throw Error("Expected an image as input");
            }

            const res = await renderFace(img);

            return new Costume(res);
          }, { args: [], timeout: 10000 });
        }),
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

  NetsBloxExtensions.register(FaceLandmarker);
  disableRetinaSupport();
})();
