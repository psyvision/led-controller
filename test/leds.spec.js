const assert = require("assert");

const LED = require("../server/leds");

describe("LED driver", function() {
  it("should calc offset when expected less than real max", function() {
    var leds = new LED();

    leds.total = 100;
    leds.offset = 50;

    var expected = 70;

    var actual = leds.calc(20);

    assert.equal(actual, expected);
  });

  it("should calc offset when expected more than real max", function() {
    var leds = new LED();

    leds.total = 100;
    leds.offset = 50;

    var expected = 20;

    var actual = leds.calc(70);

    assert.equal(actual, expected);
  });

  it("should calc offset correctly for fake index 0", function() {
    var leds = new LED();

    leds.total = 100;
    leds.offset = 50;

    var expected = 50;

    var actual = leds.calc(0);

    assert.equal(actual, expected);
  });

  it("should calc offset with negative fake index", function() {
    var leds = new LED();

    leds.total = 100;
    leds.offset = 50;

    var expected = 30;

    var actual = leds.calc(-20);

    assert.equal(actual, expected);
  });

  it("should calc offset with negative fake index less than real 0", function() {
    var leds = new LED();

    leds.total = 100;
    leds.offset = 50;

    var expected = 80;

    var actual = leds.calc(-70);

    assert.equal(actual, expected);
  });
});
