require("dotenv").config();
const axios = require("axios");

const API_BHR_ADDRESS_SEARCH_URL = process.env.API_BHR_ADDRESS_SEARCH_URL;

exports.searchAddress = async (req, res) => {
  const config = {
    params: {
      search: req.params.search,
    },
  };
  axios
    .get(API_BHR_ADDRESS_SEARCH_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
