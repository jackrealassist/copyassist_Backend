const controller = require("../controllers/geoData.controller");

module.exports = function (app) {
  app.get("/api/geoData/zipCodeToCounty/:zipCode", controller.zipCodeToCounty);
};
