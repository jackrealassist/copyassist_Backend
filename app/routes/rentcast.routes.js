const controller = require("../controllers/rentcast.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/rentcast/allRentcast/:address/", controller.allRentcast);
  app.get(
    "/api/rentcast/valueEstimate/:address/:propertyType/:bedrooms/:bathrooms/:squareFootage/:compCount/",
    controller.valueEstimate
  );
  app.get(
    "/api/rentcast/longtermRent/:address/:propertyType/:bedrooms/:bathrooms/:squareFootage/:compCount/",
    controller.longtermRent
  );
  app.get(
    "/api/rentcast/propertyRecords/:address/",
    controller.propertyRecords
  );
  // app.get(
  //   "/api/rentcast/marketRentcast/:zipCode/:historyRange/",
  //   controller.marketRentcast
  // );
};
