require("dotenv").config();
const axios = require("axios");
const path = require("path");

const API_ZONEOMICS_URL = process.env.API_ZONEOMICS_URL;
const API_ZONEOMICS_KEY = process.env.API_ZONEOMICS_KEY;

// Zone Details
exports.zoneDetails = async (req, res) => {
  const config = {
    params: {
      api_key: API_ZONEOMICS_KEY,
      lat: req.params.lat,
      lng: req.params.lng,
      output_fields: req.params.output_fields,
    },
  };
  axios
    .get(API_ZONEOMICS_URL + "/zoneDetail", config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Zone Screenshot
exports.zoneScreenshot = async (req, res) => {
  const config = {
    params: {
      address: req.params.address,
      api_key: API_ZONEOMICS_KEY,
      lat: req.params.lat,
      lng: req.params.lng,
      map_zoom_level: req.params.map_zoom_level,
    },
  };
  // console.log(config);
  axios
    .get(API_ZONEOMICS_URL + "/ZoneScreenshot", config)
    .then((response) => {
      for (const [key, value] of Object.entries(response.headers)) {
        if (key === "Connection" || key === "connection") {
          res.setHeader(key, "keep-alive");
        } else {
          res.setHeader(key, value);
        }
      }

      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Zone Permit
exports.checkPermission = async (req, res) => {
  const config = {
    params: {
      api_key: API_ZONEOMICS_KEY,
      bottom_left_lat: req.params.bottom_left_lat,
      bottom_left_lng: req.params.bottom_left_lng,
      top_right_lat: req.params.top_right_lat,
      top_right_lng: req.params.top_right_lng,
    },
  };
  axios
    .get(API_ZONEOMICS_URL + "/zonePermits", config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
