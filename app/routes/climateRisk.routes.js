const controller = require("../controllers/climateRisk.controller");

module.exports = function (app) {
  app.get("/api/climateRisk/:countyName", controller.getCountyClimateRisks);
};
