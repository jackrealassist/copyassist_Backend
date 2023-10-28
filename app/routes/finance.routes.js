const controller = require("../controllers/finance.controller");

module.exports = function (app) {
  app.post("/api/finance/auth/login", controller.login);
  app.post("/api/finance/totalViewReport", controller.totalViewReport);
  app.post("/api/finance/totalViewReportByApn", controller.totalViewReportByApn);
};
