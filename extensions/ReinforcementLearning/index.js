(async function () {
  if (!document.getElementById("PlanckPhysicsLibrary")) {
    const script = document.createElement("script");
    script.id = "PlanckPhysicsLibrary";
    script.src = "https://cdn.jsdelivr.net/npm/planck@1.4.3/dist/planck.min.js";
    document.body.appendChild(script);
  }

  const { Manager } = await import("./renderers/manager.mjs");

  const manager = new Manager();

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

  class ReinforcementLearning extends Extension {
    constructor(ide) {
      super("ReinforcementLearning");
      this.ide = ide;
    }

    onOpenRole() {}

    getMenu() {
      return {
        "Open...": () => manager.open(),
        "Load Frozen Lake...": () => manager.loadFrozenLake(),
        "Load Cart Pole...": () => manager.loadCartPole(),
      };
    }

    getCategories() {
      return [new Extension.Category("reinforce", new Color(100, 100, 255))];
    }

    getPalette() {
      const blocks = [
        new Extension.Palette.Block("getInfo"),
        new Extension.Palette.Block("getState"),
        new Extension.Palette.Block("getReward"),
        "-",
        new Extension.Palette.Block("stepSim"),
        new Extension.Palette.Block("resetEnv"),
      ];
      return [
        new Extension.PaletteCategory("reinforce", blocks, SpriteMorph),
        new Extension.PaletteCategory("reinforce", blocks, StageMorph),
      ];
    }

    getBlocks() {
      return [
        new Extension.Block(
          "getInfo",
          "reporter",
          "reinforce",
          "environment information",
          [],
          function () {
            return snapify(manager.getInfo());
          },
        ).for(SpriteMorph, StageMorph),

        new Extension.Block(
          "getState",
          "reporter",
          "reinforce",
          "current state",
          [],
          function (action) {
            return snapify(manager.getInfo().state);
          },
        ).for(SpriteMorph, StageMorph),

        new Extension.Block(
          "getReward",
          "reporter",
          "reinforce",
          "current reward",
          [],
          function (action) {
            return snapify(manager.getReward());
          },
        ).for(SpriteMorph, StageMorph),

        new Extension.Block(
          "stepSim",
          "command",
          "reinforce",
          "take action %n",
          [],
          function (action) {
            return snapify(manager.takeAction(action));
          },
        ).for(SpriteMorph, StageMorph),

        new Extension.Block(
          "resetEnv",
          "command",
          "reinforce",
          "reset environment",
          [],
          function (action) {
            return snapify(manager.resetEnv());
          },
        ).for(SpriteMorph, StageMorph),

      ];
    }

    getLabelParts() {
      return [];
    }
  }

  NetsBloxExtensions.register(ReinforcementLearning);
})();
