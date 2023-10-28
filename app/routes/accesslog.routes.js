const controller = require("../controllers/accesslog.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.post("/api/addressActivityLog", [authJwt.verifyToken], controller.addressActivityLog);
  app.post("/api/userRequestLog/:transactionId?", controller.userRequestLog);
  app.post("/api/userLogCache/", controller.userLogCache);
};
