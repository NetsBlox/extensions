(async function () {
  const localhost =
    window.location.search.includes("localhost") ||
    window.location.search.includes("127.0.0.1");
  const root = localhost
    ? "http://localhost:8000/"
    : "https://extensions.netsblox.org/";

  const moduleURL = root + "extensions/HandGestures/handLandmarkerModule.mjs";
  const handModule = await import(moduleURL);

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

  class HandGestures extends Extension {
    constructor(ide) {
      super("HandGestures");
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
        "-",
        new Extension.Palette.Block("handLandmarksFindHands"),
        new Extension.Palette.Block("handLandmarksRender"),
        new Extension.Palette.Block("handLandmarksFindLandmarks"),
        new Extension.Palette.Block("handLandmarksFindLandmark"),
        new Extension.Palette.Block("handLandmarksDistance"),
        new Extension.Palette.Block("handLandmarksSetOptions"),
        "-",
      ];
      return [
        new Extension.PaletteCategory("sensing", blocks, SpriteMorph),
        new Extension.PaletteCategory("sensing", blocks, StageMorph),
      ];
    }

    getBlocks() {
      function block(name, type, category, spec, defaults, action) {
        return new Extension.Block(
          name,
          type,
          category,
          spec,
          defaults,
          action,
        ).for(SpriteMorph, StageMorph);
      }
      return [
        block(
          "handLandmarksFindHands",
          "reporter",
          "sensing",
          "hands data from %s",
          [],
          function (img) {
            return this.runAsyncFn(
              async () => {
                img = img?.contents || img;
                if (
                  !img ||
                  typeof img !== "object" ||
                  !img.width ||
                  !img.height
                )
                  throw Error("Expected an image as input");

                const res = await handModule.findHands(img);

                return snapify(res);
              },
              { args: [], timeout: 10000 },
            );
          },
        ),

        block(
          "handLandmarksRender",
          "reporter",
          "sensing",
          "render hands %s",
          [""],
          function (img) {
            return this.runAsyncFn(
              async () => {
                img = img?.contents || img;
                if (
                  !img ||
                  typeof img !== "object" ||
                  !img.width ||
                  !img.height
                ) {
                  throw Error("Expected an image as input");
                }

                const res = await handModule.renderHands(img);

                return new Costume(res);
              },
              { args: [], timeout: 10000 },
            );
          },
        ),

        block(
          "handLandmarksFindLandmarks",
          "reporter",
          "sensing",
          "%handLandmarkGet from %s",
          ["Hand Landmarks", ""],
          function (option, img) {
            return this.runAsyncFn(
              async () => {
                img = img?.contents || img;
                if (
                  !img ||
                  typeof img !== "object" ||
                  !img.width ||
                  !img.height
                )
                  throw Error("Expected an image as input");

                option = option?.toString();
                if (!option) throw Error("Select a valid option");

                const res = await handModule.findHands(img);

                if (!res.landmarks) return snapify(res);
                if (option === "Hand Landmarks") return snapify(res.landmarks);
                if (option === "World Landmarks") {
                  return snapify(res.worldLandmarks);
                }
                if (option === "Handedness") return snapify(res.handedness);

                throw new Error("Block Error");
              },
              { args: [], timeout: 10000 },
            );
          },
        ),

        block(
          "handLandmarksFindLandmark",
          "reporter",
          "sensing",
          "%handLandmarkGetOne of %handLandmarks from %s",
          ["Hand Landmarks", "INDEX_tip"],
          function (option, landmark, img) {
            return this.runAsyncFn(
              async () => {
                landmark = landmark?.toString();
                option = option?.toString();
                if (!landmark || !handModule.isValidLandmark(landmark))
                  throw Error("invalid landmark");
                if (!option || !handModule.isValidDataOption(option))
                  throw Error("invalid option");
                img = img?.contents || img;
                if (
                  !img ||
                  typeof img !== "object" ||
                  !img.width ||
                  !img.height
                )
                  throw Error("Expected an image as input");

                const coords = await handModule.parseLandmark(
                  img,
                  option,
                  landmark,
                );

                return snapify(coords);
              },
              { args: [], timeout: 10000 },
            );
          },
        ),

        block(
          "handLandmarksDistance",
          "reporter",
          "sensing",
          "%handLandmarkGetOne Distance of %handLandmarks to %handLandmarks from %s",
          ["Hand Landmarks", "WRIST", "THUMB_tip"],
          function (option, landmark1, landmark2, img) {
            return this.runAsyncFn(
              async () => {
                landmark1 = landmark1?.toString();
                landmark2 = landmark2?.toString();
                if (!landmark1 || !landmark2) {
                  throw Error("landmark not specified");
                }

                img = img?.contents || img;
                if (
                  !img ||
                  typeof img !== "object" ||
                  !img.width ||
                  !img.height
                )
                  throw Error("Expected an image as input");

                const distance = await handModule.parseLandmarkDistance(
                  img,
                  landmark1,
                  landmark2,
                );

                return snapify(distance);
              },
              { args: [], timeout: 10000 },
            );
          },
        ),

        block(
          "handLandmarksSetOptions",
          "command",
          "sensing",
          "set %handLandmarkOptions to %n",
          ["Max Hands", 2],
          function (option, newValue) {
            return this.runAsyncFn(
              async () => {
                if (!handModule.isValidConfigOption(option)) {
                  throw new Error("option not valid");
                }

                await handModule.updateAllHandleOptions(option, newValue);

                return snapify(newValue);
              },
              { args: [], timeout: 10000 },
            );
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
      function unionMaps(maps) {
        const res = {};
        for (const map of maps) {
          for (const key in map) res[key] = map[key];
        }
        return res;
      }
      return [
        new Extension.LabelPart(
          "handLandmarks",
          () =>
            new InputSlotMorph(
              null, // text
              false, // numeric
              unionMaps([
                identityMap(["WRIST"]),
                {
                  THUMB: identityMap([
                    "THUMB_cmc",
                    "THUMB_mcp",
                    "THUMB_ip",
                    "THUMB_tip",
                  ]),
                },
                {
                  INDEX: identityMap([
                    "INDEX_mcp",
                    "INDEX_pip",
                    "INDEX_dip",
                    "INDEX_tip",
                  ]),
                },
                {
                  MIDDLE: identityMap([
                    "MIDDLE_mcp",
                    "MIDDLE_pip",
                    "MIDDLE_dip",
                    "MIDDLE_tip",
                  ]),
                },
                {
                  RING: identityMap([
                    "RING_mcp",
                    "RING_pip",
                    "RING_dip",
                    "RING_tip",
                  ]),
                },
                {
                  PINKY: identityMap([
                    "PINKY_mcp",
                    "PINKY_pip",
                    "PINKY_dip",
                    "PINKY_tip",
                  ]),
                },
              ]),
              true, // readonly (no arbitrary text)
            ),
        ),
        new Extension.LabelPart(
          "handLandmarkOptions",
          () =>
            new InputSlotMorph(
              null, // text
              false, // numeric
              identityMap([
                "Min Detect Confidence",
                "Min Presence Confidence",
                "Min Track Confidence",
                "Max Hands",
              ]),
              true, // readonly (no arbitrary text)
            ),
        ),
        new Extension.LabelPart(
          "handLandmarkGet",
          () =>
            new InputSlotMorph(
              null, // text
              false, // numeric
              identityMap(["Hand Landmarks", "World Landmarks", "Handedness"]),
              true, // readonly (no arbitrary text)
            ),
        ),
        new Extension.LabelPart(
          "handLandmarkGetOne",
          () =>
            new InputSlotMorph(
              null, // text
              false, // numeric
              identityMap(["Hand Landmarks", "World Landmarks"]),
              true, // readonly (no arbitrary text)
            ),
        ),
      ];
    }
  }

  NetsBloxExtensions.register(HandGestures);
  disableRetinaSupport();
})();
