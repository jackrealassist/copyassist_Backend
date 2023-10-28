const controller = require("../controllers/adressSearch.controller");

module.exports = function(app) {
  app.get("/api/addressSearch", controller.addressSearch);
};
