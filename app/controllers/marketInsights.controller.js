require('dotenv').config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Env Variables
// When you add env variables or change them don't forget to restart the server
const API_MARKET_INSIGHTS_URL = process.env.API_MARKET_INSIGHTS_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Route
exports.marketInsights = async (req, res) => {
    // Path and Query params
  const { regionType } = req.params;
  const { region_id } = req.query;

  // check to see if the region_id is present
  if (!region_id) {
    res.status(400).json({
      message: "Missing region_id",
    });
    return;
  }

  // Url and options
  const url = `${API_MARKET_INSIGHTS_URL}/${regionType}/zipcode?region_id=${region_id}`;
  const options = {
    method: "GET",
    headers: {
      "X-API-Key": API_KEY_VALUE,
    },
  };

  try {
    // Make fetch request to Market Insights endpoint
    const apiRes = await fetch(url, options);
    const data = await apiRes.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
