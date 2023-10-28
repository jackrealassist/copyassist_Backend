require('dotenv').config();
const url = require("url");
const express = require("express");
const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const sampleHomeCompareData = require("../fixtures/homeCompare.json");
const { validateAddress } = require("../utils/validateAddress");
const { validateApn } = require("../utils/validateApn");
const addressCache = new NodeCache({ stdTTL: 10000, checkperiod: 120 });

// env variables
const API_HOME_ADDRESS_URL = process.env.API_HOME_ADDRESS_URL;
const API_HOME_ADDRESS_FIPS_APN_URL = process.env.API_HOME_ADDRESS_FIPS_APN_URL;
const API_HOME_COMPARE_URL = process.env.API_HOME_COMPARE_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Route
exports.homeCompare = async (req, res) => {
  try {
    // Concatenate the address before using it to make a request to our API endpoint
    const addressObj = req.body;
    const fips = addressObj.fips;
    const apn = addressObj.apn;
    const address = `${addressObj.addressLineOne} ${addressObj.city} ${addressObj.state} ${addressObj.zipcode}`;
    // Use encodeURI to take out any spaces in the address for use with the Address Search endpoint
    const encodedAddress = encodeURI(address);

    // There are two endpoint options for getting the parcel_id for a property. Choose one to use.

    // OPTION 1. ADDRESS SEARCH ENDPOINT
    // URL and options
    const endpointUrl = `${API_HOME_ADDRESS_URL}?address=${encodedAddress}`;
    const endpointOptions = {
      method: "GET",
    };

    // OPTION 2. ADDRESS SEARCH BY FIPS+APN ENDPOINT
    // URL and options
    // const endpointUrl = `${API_HOME_ADDRESS_FIPS_APN_URL}?fips=${fips}&apn=${apn}`;
    // const endpointOptions = {
    //   method: "GET",
    //   headers: {
    //     "X-API-Key": API_KEY_VALUE,
    //   },
    // };

    // Before making the first API call using the address string, check to see if it is in your cache
    let addressData = null;
    if (addressCache.has(address)) {
      // Get the cached data for an address based on its addressStr if it is cached
      addressData = addressCache.get(address);
    } else {
      // Make the call to the Address Search endpoint if it isn't yet cached
      const addressRes = await fetch(endpointUrl, endpointOptions);
      const addressResLoad = await addressRes.json();
      addressData = addressResLoad.hits[0].address;
    }

    // Validate that the first hit closely matches the address and apn passed from the client
    const isValidApn = validateApn(addressData, addressObj);
    const isValidAddress = validateAddress(addressData, addressObj);
    console.log("Is this a valid match?", isValidApn && isValidAddress);

    // Cache the address data if it is a good match and hasn't been cached
    if (isValidApn && isValidAddress && !addressCache.has(address)) {
      addressCache.set(address, addressData, 10000);
    }

    // Ensure you have a parcelId, which is needed to request data from the Home Valuation endpoint
    const parcelId = addressData.parcel_id;
    if (!parcelId) {
      throw new Error("parcelId is a falsy value");
    }

    // URL and options with API key for Home Valuation endpoint
    const homeCompareUrl = `${API_HOME_COMPARE_URL}/${parcelId}`;
    const homeCompareOptions = {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY_VALUE,
      },
    };

    let homeCompareRes = null;
    // check to see if you have a legitimate api key to make a request
    if (API_KEY_VALUE !== "yourApiKeyHere") {
      // Retrieve the remodel value data based on the address' parcel_id
      response = await fetch(homeCompareUrl, homeCompareOptions);

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.code = response.status;
        throw error;
      }

      homeCompareRes = await response.json();
    } else {
      // Use sampleHomeCompareData for the homeCompareRes
      homeCompareRes = sampleHomeCompareData;
    }

    res.status(200).json(homeCompareRes);
  } catch (err) {
    res.status(err.code).json({ errorMessage: err.message });
    console.error("Our apologies, the data has errors, please try again.");
    console.error(err.name);
    console.error(err.message);
  }
};
