var express = require("express");
var morgan = require("morgan");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

var config = require("./config");

var LED = require("./server/leds");

var leds = new LED();
leds.init(config.ledCount, config.ledOffset, config.enableSPI);

app.use(express.static(path.join(__dirname, "/public")));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = config.APP_PORT || 4000;
app.listen(port);

console.log("LED Controller Listening On Port: " + port);

console.log('Node Env:', process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      logLevel: "warn",
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(
    require("webpack-hot-middleware")(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  );
}

var router = express.Router();

require("./server/routes")(router, leds);
app.use("/api", router);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:" + port);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/", function (req, res) {
  res.sendfile("./public/index.html");
});
