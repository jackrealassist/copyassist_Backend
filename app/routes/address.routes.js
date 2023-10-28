const controller = require("../controllers/address.controller");

module.exports = function (app) {
  app.get("/api/address/search/:search", controller.searchAddress);
};
