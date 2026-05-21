import planck from "https://cdn.jsdelivr.net/npm/planck@1.4.3/dist/planck.mjs";
/** @import planckType from "planck"; */

/** @type {typeof planckType} */
const { World, Box, RevoluteJoint } = planck;

export class CartPole {
  constructor() {
    const { world, cart, pole } = buildCartpoleSimulation();
    this.actions = [-1, 1];
    this.world = world;
    this.cart = cart;
    this.pole = pole;
    this.completed = false;
    this.state = {
      cartPosition: this.cart.getPosition(),
      cartVelocity: this.cart.getLinearVelocity(),
      poleAngle: this.pole.getAngle(),
      poleSpin: this.pole.getAngularVelocity(),
    };

    console.log(this);
  }

  reward() {}

  step(action) {
    if (this.actions.includes(action) === false) {
      throw new Error("Action is not -1 or 1");
    } else if (this.completed) {
      throw new Error("Cannot perform action once episode is complete");
    }

    this.update(action);
    return this.state;
  }

  update(action) {
    const cartVel = this.cart.getLinearVelocity();
    this.cart.setLinearVelocity(cartVel.add({ x: 10 * action, y: 0 }));
    this.world.step(1 / 60);
    this.state = {
      cartPosition: this.cart.getPosition().x,
      cartVelocity: this.cart.getLinearVelocity().x,
      poleAngle: this.pole.getAngle(),
      poleSpin: this.pole.getAngularVelocity(),
    };
  }

  reset() {}

  info() {
    return {
      state: this.state,
      completed: this.completed,
    };
  }
}

export function buildCartpoleSimulation() {
  const world = new World({ gravity: { x: 0, y: -10 } });
  const cart = world.createBody({
    type: "kinematic",
    position: { x: 0, y: 0 },
  });
  const cartBox = new Box(2, 1);
  const cartFixture = cart.createFixture(cartBox, { density: 1 });

  const pole = world.createBody({ type: "dynamic", position: { x: 0, y: 2 } });
  const poleBox = new Box(1, 2.5);
  const poleFixture = pole.createFixture(poleBox, { density: 1 });

  const joint = new RevoluteJoint({}, cart, pole, cart.getWorldCenter());
  world.createJoint(joint);

  return { world, cart, pole };
}
