const dotstar = require("dotstar");
const SPI = require("pi-spi");

class LED {
  constructor() {
    this.ledStrip = null;
  }

  init(numLeds) {
    if (numLeds > 0) {
      var spi = SPI.initialize("/dev/spidev0.0");

      this.ledStrip = new dotstar.Dotstar(spi, {
        length: numLeds
      });
    }
  }

  rgb(r, g, b) {
    if (this.ledStrip != null) {
      this.ledStrip.all(r, g, b, 1.0);
      this.ledStrip.sync();
    }
  }

  rgba(r, g, b, a) {
    if (this.ledStrip != null) {
      this.ledStrip.all(r, g, b, a);
      this.ledStrip.sync();
    }
  }

  off() {
    if (this.ledStrip != null) {
      this.ledStrip.off();
    }
  }
}

module.exports = LED;
