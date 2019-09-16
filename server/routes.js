var routes = (router, leds) => {
  router.route("/status").get(function(req, res) {
    var status = leds.status;

    var colour = leds.colour;

    var level = leds.level;

    res.json({
      success: true,
      status,
      colour,
      level
    });
  });

  router.route("/status/:status(on|off)").post(function(req, res) {
    if (req.params.status === "on") {
      leds.on();
    } else {
      leds.off();
    }

    var status = leds.status;

    res.json({
      success: true,
      status
    });
  });

  router.route("/on").post(function(req, res) {
    leds.status = "on";

    var status = leds.status;

    res.json({
      success: true,
      status
    });
  });

  router.route("/off").post(function(req, res) {
    leds.status = "off";

    var status = leds.status;

    res.json({
      success: true,
      status
    });
  });

  router.route("/colour").get(function(req, res) {
    var colour = leds.colour;

    res.json({
      success: true,
      colour
    });
  });

  router.route("/colour").post(function(req, res) {
    leds.colour = { r: req.body.r, g: req.body.g, b: req.body.b };

    var colour = leds.colour;

    res.json({
      success: true,
      colour
    });
  });

  router.route("/level").get(function(req, res) {
    var level = leds.level;

    res.json({
      success: true,
      level
    });
  });

  router.route("/level").post(function(req, res) {
    leds.level = req.body.level;

    var level = leds.level;

    res.json({
      success: true,
      level
    });
  });
};

module.exports = routes;
