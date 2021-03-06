const dotstar = require("dotstar");
const SPI = require("pi-spi");
const fs = require("fs");
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

  init(total, offset = 0, enableSPI = true) {
    this.total = parseInt(total);
    this.offset = parseInt(offset);

    console.log(
      `LED service initialised with ${total} LEDs and offset ${offset}`
    );

    if (enableSPI === true && total > 0) {
      let spiBus = "/dev/spidev0.0";

      if (fs.existsSync(spiBus)) {
        var spi = SPI.initialize(spiBus);

        this.ledStrip = new dotstar.Dotstar(spi, {
          length: total
        });

        console.log("SPI bus initialised");
      }
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
