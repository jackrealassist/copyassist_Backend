const controller = require("../controllers/hazards.controller");

module.exports = function (app) {
  app.get("/api/hazards/allHazards/:latitude/:longitude/", controller.allHazards);
  app.get("/api/hazards/rcraInfo/:latitude/:longitude/", controller.rcraInfo);
  app.get("/api/hazards/icis/:latitude/:longitude/", controller.icis);
  app.get("/api/hazards/ncdb/:latitude/:longitude/", controller.ncdb);
  app.get("/api/hazards/airsAfs/:latitude/:longitude/", controller.airsAfs);
  app.get("/api/hazards/tris/:latitude/:longitude/", controller.tris);
  app.get("/api/hazards/br/:latitude/:longitude/", controller.br);
  app.get("/api/hazards/cedri/:latitude/:longitude/", controller.cedri);
};
