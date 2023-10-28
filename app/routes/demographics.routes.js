const controller = require("../controllers/demographics.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/demographics/all/:state", controller.all);
  app.get("/api/demographics/income/:state", controller.income);
  app.get("/api/demographics/population/:state", controller.population);
  app.get("/api/demographics/household/:state", controller.household);
  app.get("/api/demographics/housing/:state", controller.housing);
  app.get("/api/demographics/heatSource/:state", controller.heatSource);
  app.get("/api/demographics/education/:state", controller.education);
  app.get("/api/demographics/employment/:state", controller.employment);
  app.get("/api/demographics/commuting/:state", controller.commuting);
  app.get("/api/demographics/health/:state", controller.health);
  app.get("/api/demographics/language/:state", controller.language);
  app.get("/api/demographics/ancestry/:state", controller.ancestry);
  app.get("/api/demographics/raceEthnicity/:state", controller.raceEthnicity);
};
