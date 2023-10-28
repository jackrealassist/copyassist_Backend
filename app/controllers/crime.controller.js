require("dotenv").config();
const axios = require("axios");

const API_CRIME_KEY = process.env.API_CRIME_KEY;
const API_CRIME_URL = process.env.API_CRIME_URL;

// Crime Arrest Data from USA Government
exports.arrestData = async (req, res) => {
  const config = {
    params: {
      from: req.params.from,
      to: req.params.to,
      API_KEY: API_CRIME_KEY,
    },
  };
  const state = req.params.state;
  const finalApiUrl = `${API_CRIME_URL}/${state}/all`;
  axios
    .get(finalApiUrl, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
