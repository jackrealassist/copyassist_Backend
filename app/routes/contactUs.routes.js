const controller = require("../controllers/contactUs.controller");
module.exports = function (app) {
  app.post("/api/contact/submit", controller.submitContactUsForm);
};
