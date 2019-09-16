const dotstar = require("dotstar");
const SPI = require("pi-spi");
const debug = require("debug")("leds");

class LED {
  constructor() {
    this.ledStrip = null;

    this._rgb = {
      r: 0,
      g: 0,
      b: 0
    };

    this._status = "off";

    this._level = 100;
  }

  init(numLeds) {
    if (numLeds > 0) {
      var spi = SPI.initialize("/dev/spidev0.0");

      this.ledStrip = new dotstar.Dotstar(spi, {
        length: numLeds
      });
    }
  }

  get status() {
    return this._status;
  }

  set status(value) {
    if (value == "on") {
      this.on();
    } else {
      this.off();
    }
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = value;

    this.update();
  }

  get colour() {
    return this._rgb;
  }

  set colour(value) {
    this._rgb = value;

    this.update();
  }

  update() {
    debug(
      "Updating R: %o, G: %o, B: %o, A: %o",
      this._rgb.r,
      this._rgb.g,
      this._rgb._b,
      this.level
    );

    if (this.ledStrip != null) {
      this.ledStrip.all(
        this._rgb.r,
        this._rgb.g,
        this._rgb.b,
        this.level / 100
      );
      this.ledStrip.sync();
    }
  }

  on() {
    this._status = "on";

    if (this.ledStrip != null) {
      this.ledStrip.sync();
    }
  }

  off() {
    this._status = "off";

    if (this.ledStrip != null) {
      this.ledStrip.off();
    }
  }
}

module.exports = LED;
