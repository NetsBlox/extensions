export class CartPole {
  constructor(body, sim) {
    this.body = body;
    this.cart = createCart(body, sim);
    this.pole = createPole(body, sim);
  }

  update(sim) {
  const cartPos = sim.cart.getPosition();
  cart.setCenter(body.center() - 10 * cartPos.x)
  cart.setTop(body.center().y - 10 * cartPos.y)

  const polePos = sim.pole.getPosition();
  this.pole.setCenter(body.center() - 10 * polePos.x)
  this.pole.setTop(body.center().y - 10 * polePos.y)
  }
}

function createCart(body, sim) {
  const pos = sim.cart.getPosition();
  const color = new window.Color(235, 216, 164);
  const cart = new window.BoxMorph(4, 2, window.BLACK);
  cart.setWidth(40);
  cart.setHeight(20);
  cart.setCenter(body.center() - 10 * pos.x)
  cart.setTop(body.center().y - 10 * pos.y)
  cart.setColor(color);
  body.addChild(cart);
  return cart;
}

function createPole(body, sim) {
  const pos = sim.pole.getPosition();
  const color = new window.Color(72, 151, 217);
  const pole = new window.BoxMorph(4, 2, window.BLACK);
  pole.setWidth(20);
  pole.setHeight(50);
  pole.setCenter(body.center() - 10 * pos.x)
  pole.setTop(body.center().y - 10 * pos.y)
  pole.setColor(color);
  body.addChild(pole);
  return pole;
}

