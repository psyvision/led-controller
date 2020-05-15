require("dotenv").config();

var base = {
  ledCount: process.env.LED_COUNT || 0,
  enableSPI: process.env.ENABLE_SPI || true,
  ledOffset: process.env.LED_OFFSET || 0
};

module.exports = base;
