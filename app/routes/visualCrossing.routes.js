const controller = require("../controllers/visualCrossing.controller");

module.exports = function (app) {
  app.get(
    "/api/visualCrossing/lastSixMonthsHistory/:latitude/:longitude/",
    controller.lastSixMonthsHistory
  );
};
