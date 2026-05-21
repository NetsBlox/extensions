import { FrozenLake as FrozenLakeRenderer } from "./frozenlake.mjs";
import { CartPole as CartPoleRenderer } from "./cartpole.mjs";

import { FrozenLake as FrozenLakeSimulator } from "../simulators/frozenlake.mjs";
import { CartPole as CartPoleSimulator } from "../simulators/cartpole.mjs";

let ManagerSingleton = null;
/**
 * Manages the simulation and renderer
 * Is a singleton, there shoudn't ever be two managers
 */
export class Manager {
  sim = null;
  renderer = null;

  constructor() {
    if (ManagerSingleton) {
      return ManagerSingleton;
    }
    this.dialog = createDialog("Default title");
    this.dialog.addButton(() => this.close(), "Close");
    const body = createBody(200, 200);
    this.dialog.addBody(body);
    this.dialog.fixLayout();
    this.dialog.popUp(window.world);
    this.close();

    ManagerSingleton = this;
  }

  loadFrozenLake() {
    this.clearBody();
    this.setTitle("Frozen Lake");
    this.sim = new FrozenLakeSimulator();
    const info = this.sim.info();
    this.renderer = new FrozenLakeRenderer(this.dialog.body, info);
    this.open();
    this.dialog.fixLayout();
  }

  loadCartPole() {
    this.clearBody();
    this.setTitle("Cart Pole");
    this.sim = new CartPoleSimulator();
    const info = this.sim.info();
    this.renderer = new CartPoleRenderer(this.dialog.body, info)
    this.open();
    this.dialog.fixLayout();
  }

  close() {
    this.dialog.hide();
    this.dialog.removeShadow();
  }

  open() {
    this.dialog.show();
    this.dialog.addShadow();
  }

  clearBody() {
    for (const child of this.dialog.body.children.toReversed()) {
      child.destroy();
    }
  }

  setTitle(title) {
    this.dialog.labelString = title;
    this.dialog.createLabel();
  }

  getInfo() {
    if (this.sim === null) {
      throw new Error("No environment is loaded.");
    }
    return this.sim.info();
  }

  getReward() {
    if (this.sim === null) {
      throw new Error("No environment is loaded.");
    }
    return this.sim.reward();
  }

  takeAction(action) {
    const state = this.sim.step(action);
    const info = this.sim.info();
    this.renderer.update(info);
    return state;
  }

  resetEnv() {
    this.sim.reset();
    const info = this.sim.info();
    this.renderer.update(info);
  }
}

/**
 * @param { string } title
 * @returns { any } a DialogBoxMorph
 */
function createDialog(title) {
  const dialog = new DialogBoxMorph().withKey("RLD");
  dialog.labelString = title;
  dialog.createLabel();
  return dialog;
}

/**
 * @param { number } opt.h - height of morph
 * @param { number } opt.w - width of morph
 * @returns { Morph }
 */
function createBody(h, w) {
  const body = new BoxMorph(4, 4, BLACK);
  body.setWidth(w);
  body.setHeight(h);
  body.setColor(BLACK);
  return body;
}
