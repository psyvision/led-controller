class Scene {
  constructor(leds) {
    this.leds = leds;
    this.pos = 0;
  }

  get name() {
    return "Dots";
  }

  run() {
    this.leds.off();

    this.pos = 0;

    setTimeout(this.doNext, 500);

    return true;
  }

  doNext() {
    this.pos = this.pos + 1;

    this.leds.single(this.pos, this.leds.colour);
    this.leds.single(this.pos * -1, this.leds.colour);
    this.leds.sync();

    if (this.pos < this.leds.total / 2) {
      setTimeout(this.doNext, 500);
    }
  }
}

module.exports = Scene;
