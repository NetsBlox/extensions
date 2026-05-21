export class FrozenLake {
  constructor(body, info) {
    this.body = body;
    this.tiles = createTiles(body, info);
    this.goal = createGoal(body, info);
    this.holes = createHoles(body, info);
    this.player = createPlayer(body, info);
  }
  update(info) {
    const row = Math.floor(info.state / 4);
    const col = info.state % 4;
    this.player.setLeft(col * 50 + 15 + this.body.left());
    this.player.setTop(row * 50 + 10 + this.body.top());
  }
}

function createTiles(body, info) {
  const rows = Math.sqrt(info.states.length);
  const cols = Math.sqrt(info.states.length);
  const tiles = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const color = new window.Color(185, 255, 255);
      const tile = new window.BoxMorph(4, 2, window.BLACK);
      body.addChild(tile);
      tile.setWidth(50);
      tile.setHeight(50);
      tile.setLeft(col * 50 + body.left());
      tile.setTop(row * 50 + body.top());
      tile.setColor(color);
      tiles.push(tile);
    }
  }
  return tiles;
}

function createPlayer(body, info) {
  const row = Math.floor(info.state / 4);
  const col = info.state % 4;
  const color = new window.Color(235, 216, 164);
  const player = new window.BoxMorph(4, 2, window.BLACK);
  body.addChild(player);
  player.setWidth(20);
  player.setHeight(30);
  player.setLeft(col * 50 + 15 + body.left());
  player.setTop(row * 50 + 10 + body.top());
  player.setColor(color);
  return player;
}

function createGoal(body, info) {
  const row = Math.floor(info.goal / 4);
  const col = info.goal % 4;
  const color = new window.Color(184, 180, 4);
  const goal = new window.BoxMorph(4, 2, window.BLACK);
  body.addChild(goal);
  goal.setWidth(30);
  goal.setHeight(20);
  goal.setLeft(col * 50 + 10 + body.left());
  goal.setTop(row * 50 + 15 + body.top());
  goal.setColor(color);
  return goal;
}

function createHoles(body, info) {
  const holes = [];
  for (const location of info.holes) {
    const row = Math.floor(location / 4);
    const col = location % 4;
    const color = new window.Color(72, 151, 217);
    const hole = new window.BoxMorph(4, 2, window.BLACK);
    body.addChild(hole);
    hole.setWidth(40);
    hole.setHeight(40);
    hole.setLeft(col * 50 + 5 + body.left());
    hole.setTop(row * 50 + 5 + body.top());
    hole.setColor(color);
    holes.push(hole);
  }
  return holes;
}
