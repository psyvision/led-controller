require("dotenv").config();

var base = {
  ledCount: process.env.LED_COUNT || 0
};

module.exports = base;
