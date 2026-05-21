export class FrozenLake {
  constructor() {
    this.actions = [0, 1, 2, 3];
    this.states = Array(16).keys().toArray();
    this.holes = [5, 7, 11, 12];
    this.goal = 15;
    this.state = 0;
    this.successRate = 0.8;
    this.completed = false;
  }

  reward() {
    if (this.holes.includes(this.state)) {
      return -5;
    } else if (this.state === this.goal) {
      return 5;
    } else {
      return 0;
    }
  }

  step(action) {
    if (this.actions.includes(action) === false) {
      throw new Error("Action is not valid number between 0 - 3");
    }

    if (this.completed) {
      throw new Error("Cannot perform action once episode is complete");
    }

    const rand = Math.random();
    if (rand < this.successRate) {
      this.update(action);
    } else if (rand < this.successRate + (1 - this.successRate) / 2) {
      this.update((action + 5) % 4);
    } else {
      this.update((action + 3) % 4);
    }
    return this.state;
  }

  update(action) {
    if (action === 0 && this.state > 3) {
      this.state -= 4;
    } else if (action === 1 && (this.state + 1) % 4 !== 0) {
      this.state += 1;
    } else if (action === 2 && this.state < 12) {
      this.state += 4;
    } else if (action === 3 && this.state % 4 !== 0) {
      this.state -= 1;
    }

    if (this.holes.includes(this.state) || this.state === this.goal) {
      this.completed = true;
    }
  }

  reset() {
    this.state = 0;
    this.completed = false;
  }

  info() {
    return {
      actions: this.actions,
      states: this.states,
      holes: this.holes,
      goal: this.goal,
      state: this.state,
      successRate: this.successRate,
      completed: this.completed,
    };
  }
}
