var routes = (router, leds) => {
  router.route("/off").get(function(req, res) {
    leds.off();

    res.json({
      success: true
    });
  });

  router.route("/all").post(function(req, res) {
    console.log(req.body.r, req.body.g, req.body.b);

    leds.rgb(req.body.r, req.body.g, req.body.b);

    res.json({
      success: true
    });
  });
};

module.exports = routes;
