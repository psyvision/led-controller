var routes = (router, leds) => {
  router.route("/status").get((req, res) => {
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

  router.route("/status/:status(on|off)").post((req, res) => {
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

  router.route("/on").post((req, res) => {
    leds.status = "on";

    var status = leds.status;

    res.json({
      success: true,
      status
    });
  });

  router.route("/off").post((req, res) => {
    leds.status = "off";

    var status = leds.status;

    res.json({
      success: true,
      status
    });
  });

  router.route("/colour").get((req, res) => {
    var colour = leds.colour;

    res.json({
      success: true,
      colour
    });
  });

  router.route("/colour").post((req, res) => {
    leds.colour = { r: req.body.r, g: req.body.g, b: req.body.b };

    var colour = leds.colour;

    res.json({
      success: true,
      colour
    });
  });

  router.route("/level").get((req, res) => {
    var level = leds.level;

    res.json({
      success: true,
      level
    });
  });

  router.route("/level").post((req, res) => {
    leds.level = req.body.level;

    var level = leds.level;

    res.json({
      success: true,
      level
    });
  });

  router.route("/scenes").get((req, res) => {
    var info = leds.scenes.map((scene, id) => {
      return {
        id,
        name: scene.name
      };
    });

    res.json({
      success: true,
      scenes: info
    });
  });

  router.route("/scene/:id").post((req, res) => {
    var scene = leds.scenes[parseInt(req.params.id)];

    scene.run();

    res.json({
      success: true
    });
  });
};

module.exports = routes;
