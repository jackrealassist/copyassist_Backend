const controller = require("../controllers/crime.controller");

module.exports = function (app) {
  app.get("/api/crimes/arrestData/:state/:from/:to", controller.arrestData);
};
