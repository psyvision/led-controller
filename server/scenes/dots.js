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

    setTimeout(this.doNext, 50, this);

    return true;
  }

  doNext(scene) {
    scene.leds.single(scene.pos, scene.leds.colour);
    scene.leds.single(scene.pos * -1 - 1, scene.leds.colour);
    scene.leds.sync();

    scene.pos = scene.pos + 1;

    if (scene.pos < scene.leds.total / 2) {
      setTimeout(scene.doNext, 50, scene);
    }
  }
}

module.exports = Scene;
