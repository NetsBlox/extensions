(async function () {
  let videoMirrored = false;

  const dictionaries = [
    "APRILTAG_16h5",
    "APRILTAG_16h5_mini",
    "APRILTAG_16h5_duo",
  ];

  const localhost = window.location.search.includes("localhost");
  const root = localhost
    ? "http://localhost:8000/"
    : "https://extensions.netsblox.org/";

  const rendererURL = root + "extensions/AugmentedReality/js/renderModule.mjs";
  const tagURL = root + "extensions/AugmentedReality/js/tagHandler.mjs";

  const renderModule = await import(rendererURL);
  const tagModule = await import(tagURL);

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

  class AugmentedReality extends Extension {
    constructor(ide) {
      super("AugmentedReality");
      this.ide = ide;
    }

    onOpenRole() {
      videoMirrored = this.ide.stage.mirrorVideo;
    }

    getMenu() {
      return {
        "Code Generator": function () {
          new ArucoGenMorph().popUp(world);
        },
      };
    }

    getCategories() {
      return [];
    }

    getPalette() {
      const blocks = [
        new Extension.Palette.Block("ARCodeTracker"),
        new Extension.Palette.Block("ARCodeRender"),
        "-",
        new Extension.Palette.Block("ARCodeFlag"),
        new Extension.Palette.Block("ARCodeVisibleArray"),
        "-",
        new Extension.Palette.Block("ARCodeSetDictionary"),
        new Extension.Palette.Block("ARCodeDictionary").withWatcherToggle(),
        "-",
        new Extension.Palette.Block("ARCodeFlipVideo"),
        new Extension.Palette.Block("ARCodeFlipped").withWatcherToggle(),
        "-",
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
          "ARCodeTracker",
          "reporter",
          "sensing",
          "find AR code %s",
          [],
          function (image) {
            return this.runAsyncFn(async () => {
              image = image?.contents || image;
              if (
                !image || typeof image !== "object" || !image.width ||
                !image.height
              ) {
                throw TypeError("Expected an image as input");
              }

              const coordinates = await tagModule.getCoordinates(image);
              const res = await tagModule.transformCoordinates(
                coordinates,
                image,
              );

              return snapify(res);
            }, { args: [], timeout: 10000 });
          },
        ),

        block("ARCodeRender", "reporter", "sensing", "render %model on %s", [
          "box",
        ], function (model, image) {
          return this.runAsyncFn(async () => {
            image = image?.contents || image;
            if (
              !image || typeof image !== "object" || !image.width ||
              !image.height
            ) {
              throw TypeError("Expected an image as input");
            }
            const res = await renderModule.renderScene(image, model);

            return new Costume(res);
          }, { args: [], timeout: 10000 });
        }),

        block(
          "ARCodeFlag",
          "predicate",
          "sensing",
          "AR code %n visible in %s ?",
          [],
          function (value, image) {
            return this.runAsyncFn(async () => {
              image = image?.contents || image;
              if (
                !image || typeof image !== "object" || !image.width ||
                !image.height
              ) {
                throw TypeError("Expected an image as input");
              }

              console.log(value);
              value = value?.contents || value;

              if (typeof value === "number") {
                const temp = Array();
                temp.push(value);
                value = temp;
              }
              if (!value || !value.length) {
                throw TypeError("Expected number or list");
              }

              for (let i = 0; i < value.length; i++) {
                if (
                  typeof (value[i]) === "string" &&
                  !(value[i] = parseInt(value[i]))
                ) {
                  throw TypeError("list elements must be numbers");
                }
              }

              const visible = await tagModule.isTagVisible(image, value);

              return snapify(visible);
            }, { args: [], timeout: 10000 });
          },
        ),

        block(
          "ARCodeVisibleArray",
          "reporter",
          "sensing",
          "All AR codes visible in %s",
          [],
          function (image) {
            return this.runAsyncFn(async () => {
              image = image?.contents || image;
              if (
                !image || typeof image !== "object" || !image.width ||
                !image.height
              ) {
                throw TypeError("Expected an image as input");
              }

              const visible = await tagModule.getVisibleTags(image);

              return snapify(visible);
            }, { args: [], timeout: 10000 });
          },
        ),

        block(
          "ARCodeSetDictionary",
          "command",
          "sensing",
          "set dictionary to %dictionaries",
          ["APRILTAG_16h5"],
          function (dict) {
            return this.runAsyncFn(async () => {
              console.log(dict, dictionaries.indexOf(dict));
              if (dictionaries.indexOf(dict) === -1) {
                return new Error(dict, "is not a valid dictionary.");
              }

              tagModule.setDictionary(dict);
            }, { args: [], timeout: 10000 });
          },
        ),

        block(
          "ARCodeDictionary",
          "reporter",
          "sensing",
          "dictionary",
          [],
          function () {
            return tagModule.getDictionary();
          },
        ),

        block(
          "ARCodeFlipVideo",
          "command",
          "sensing",
          "flip video",
          [],
          function () {
            return this.runAsyncFn(async () => {
              world.children[0].stage.mirrorVideo = !world.children[0].stage
                .mirrorVideo;
              videoMirrored = world.children[0].stage.mirrorVideo;
            }, { args: [], timeout: 10000 });
          },
        ),

        block(
          "ARCodeFlipped",
          "reporter",
          "sensing",
          "flipped?",
          [],
          function () {
            videoMirrored = world.children[0].stage.mirrorVideo;
            return snapify(videoMirrored);
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
        new Extension.LabelPart("model", () =>
          new InputSlotMorph(
            null, // text
            false, // numeric
            identityMap(["box", "drum", "piano"]),
            true,
          )),
        new Extension.LabelPart("dictionaries", () =>
          new InputSlotMorph(
            null, // text
            false, // numeric
            identityMap(dictionaries),
            true,
          )),
      ];
    }
  }

  const sources = [root + "extensions/AugmentedReality/js/ui-morphs.js"];

  for (const source of sources) {
    const script = document.createElement("script");
    script.class = "ARUIScripts";
    script.type = "text/javascript";
    script.src = source;
    script.async = false;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }

  NetsBloxExtensions.register(AugmentedReality);
  disableRetinaSupport();
})();
