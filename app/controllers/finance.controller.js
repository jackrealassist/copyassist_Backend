require("dotenv").config();
const axios = require("axios");

const API_RENTCAST_KEY = process.env.API_RENTCAST_KEY;
const API_FINANCE_AUTH_URL = process.env.API_FINANCE_AUTH_URL + "/";
const API_FINANCE_CORRELATION_ID = process.env.API_FINANCE_CORRELATION_ID;
const API_FINANCE_TOTAL_REPORT_URL = process.env.API_FINANCE_TOTAL_REPORT_URL;
let authorizationToken = "";

// Auth
exports.login = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_RENTCAST_KEY,
    },
    params: {
      Ver: "1.0",
    },
  };

  axios
    .post(API_FINANCE_AUTH_URL, req.body, config)
    .then((response) => {
      authorizationToken = response.data;
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

//Total View Report
exports.totalViewReport = async (req, res) => {
  const config = {
    headers: {
      "access-control-allow-origin": "*",
      "api-supported-versions": "1.0",
      "cache-control": "no-cache",
      "content-encoding": "gzip",
      "content-security-policy":
        "default-src 'none';connect-src 'self' https://maps.googleapis.com https://col.eum-appdynamics.com *.datatree.com;script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.snapengage.com https://storage.googleapis.com https://maps.googleapis.com https://csi.gstatic.com https://cdn.appdynamics.com;style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;img-src blob: data: 'self' *;font-src blob: data: 'self' https://fonts.googleapis.com https://fonts.gstatic.com;media-src 'self' https://player.vimeo.com https://gcs-vimeo.akamaized.net http://www.datatree.com https://www.snapengage.com;form-action 'self' *.datatree.com;object-src 'self';frame-src 'self';frame-ancestors 'self';child-src 'self';plugin-types application/pdf;report-uri csp/report/",
      "content-type": "application/json;charset=utf-8",
      date: "Fri, 22 Nov 2019 17:06:07 GMT",
      expires: "-1",
      pragma: "no-cache",
      "referrer-policy": "no-referrer",
      server: "fa67hq",
      "strict-transport-security": "max-age=631138519; includeSubDomains,",
      "transfer-encoding": "chunked",
      vary: "Accept-Encoding",
      "x-aspnet-version": "4.0.30319",
      "x-content-type-options": "nosniff",
      "x-correlation-id": API_FINANCE_CORRELATION_ID,
      "x-powered-by": "ASP.NET",
      Authorization: authorizationToken,
      "x-xss-protection": "1; mode=block",
    },
  };

  axios
    .post(API_FINANCE_TOTAL_REPORT_URL, req.body, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

//Total View Report By APN
exports.totalViewReportByApn = async (req, res) => {
  const config = {
    headers: {
      "access-control-allow-origin": "*",
      "api-supported-versions": "1.0",
      "cache-control": "no-cache",
      "content-encoding": "gzip",
      "content-security-policy":
        "default-src 'none';connect-src 'self' https://maps.googleapis.com https://col.eum-appdynamics.com *.datatree.com;script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.snapengage.com https://storage.googleapis.com https://maps.googleapis.com https://csi.gstatic.com https://cdn.appdynamics.com;style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;img-src blob: data: 'self' *;font-src blob: data: 'self' https://fonts.googleapis.com https://fonts.gstatic.com;media-src 'self' https://player.vimeo.com https://gcs-vimeo.akamaized.net http://www.datatree.com https://www.snapengage.com;form-action 'self' *.datatree.com;object-src 'self';frame-src 'self';frame-ancestors 'self';child-src 'self';plugin-types application/pdf;report-uri csp/report/",
      "content-type": "application/json;charset=utf-8",
      date: "Fri, 22 Nov 2019 17:06:07 GMT",
      expires: "-1",
      pragma: "no-cache",
      "referrer-policy": "no-referrer",
      server: "fa67hq",
      "strict-transport-security": "max-age=631138519; includeSubDomains,",
      "transfer-encoding": "chunked",
      vary: "Accept-Encoding",
      "x-aspnet-version": "4.0.30319",
      "x-content-type-options": "nosniff",
      "x-correlation-id": API_FINANCE_CORRELATION_ID,
      "x-powered-by": "ASP.NET",
      Authorization: authorizationToken,
      "x-xss-protection": "1; mode=block",
    },
  };

  axios
    .post(API_FINANCE_TOTAL_REPORT_URL, req.body, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
