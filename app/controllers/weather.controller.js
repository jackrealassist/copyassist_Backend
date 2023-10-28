require("dotenv").config();
const axios = require("axios");

const API_WEATHER_URL = process.env.API_WEATHER_URL;

// Get Weather
exports.getWeather = async (req, res) => {
  const config = {
    params: {
      key: req.params.key,
      q: req.params.q,
      dt: req.params.dt,
    },
  };
  axios
    .get(API_WEATHER_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    });
};
