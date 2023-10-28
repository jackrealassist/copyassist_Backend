const controller = require("../controllers/weather.controller");

module.exports = function (app) {
  app.get("/api/weather/:key/:q/:dt", controller.getWeather);
};
