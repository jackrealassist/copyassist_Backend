const controller = require("../controllers/zoneomics.controller");

module.exports = function (app) {
  app.get("/api/zoneomics/zoneDetails/:lat/:lng/:output_fields", controller.zoneDetails);
  app.get(
    "/api/zoneomics/zoneScreenshot/:address/:lat/:lng/:map_zoom_level",
    controller.zoneScreenshot
  );
  app.get(
    "/api/zoneomics/checkPermission/:bottom_left_lat/:bottom_left_lng/:top_right_lat/:top_right_lng",
    controller.checkPermission
  );
};
