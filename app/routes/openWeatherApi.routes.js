const controller = require("../controllers/openWeatherApi.controller");

module.exports = function (app) {
  app.get(
    "/api/openWeather/lastSixMonthsHistory/:latitude/:longitude/",
    controller.lastSixMonthsHistory
  );
};
