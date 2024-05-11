import { OneEuroFilter } from "https://esm.run/@david18284/one-euro-filter@1.0.3";

class singleExpFilter {
  constructor(startVals, alpha) {
    this.oldVals = startVals;
    this.a = alpha;
  }

  filter(...args) {
    const res = new Array();
    const diff = this.oldVals.length - args.length;
    if (diff < 0) {
      for (let i = args.length; i > this.oldVals.length; i--) {
        this.oldVals.push(args[i - 1]);
        console.log(this.oldVals);
      }
    }

    for (let i = 0; i < args.length; i++) {
      const newVal = (this.a * this.oldVals[i]) + ((1 - this.a) * args[i]);
      res.push(newVal);
    }
    this.oldVals = res;

    return res;
  }
}

export { OneEuroFilter, singleExpFilter };
