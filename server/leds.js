const dotstar = require("dotstar");
const SPI = require("pi-spi");

const dots = require("./scenes/dots");

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

    this.offset = 0;

    this.total = 0;

    this.scenes = [new dots(this)];
  }

  init(total, offset = 0) {
    this.offset = offset;

    if (total > 0) {
      var spi = SPI.initialize("/dev/spidev0.0");

      this.ledStrip = new dotstar.Dotstar(spi, {
        length: total
      });

      this.total = total;
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

    this.sync();
  }

  get colour() {
    return this._rgb;
  }

  set colour(value) {
    this._rgb = value;

    this.update();

    this.sync();
  }

  single(led, colour) {
    var pos = this.calc(led);

    if (this.ledStrip != null) {
      this.ledStrip.set(pos, colour.r, colour.g, colour.b);
    }
  }

  calc(led) {
    var pos = this.offset + led;

    if (pos > this.total) {
      return pos - this.total;
    }

    if (pos < 0) {
      return this.total + pos;
    }

    return pos;
  }

  update() {
    if (this.ledStrip != null) {
      this.ledStrip.all(
        this._rgb.r,
        this._rgb.g,
        this._rgb.b,
        this.level / 100
      );
    }
  }

  sync() {
    if (this.ledStrip != null) {
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
