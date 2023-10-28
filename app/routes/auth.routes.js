const { verifySignUp, authJwt } = require("../middlewares");
const express = require("express");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });
  app.use(express.urlencoded({ extended: true }));

  app.post("/api/auth/signup", [verifySignUp.checkRolesExisted], controller.signup);
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/getProfile", [authJwt.verifyToken], controller.getProfile);
  app.post("/api/auth/setProfile", [authJwt.verifyToken], controller.setProfile);
  app.get("/api/auth/forgotPassword", controller.forgotPasswordPage);
  app.post("/api/auth/forgotPassword", controller.forgotPassword);
  app.post("/api/auth/resetPassword", controller.resetPassword);
};
