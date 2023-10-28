require('dotenv').config();
const express = require("express");
const router = express.Router("express");
const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const sampleRemodelValueData = require("../fixtures/remodelValue.json");
const addressCache = new NodeCache({ stdTTL: 10000, checkperiod: 120 });

// env variables
const API_HOME_ADDRESS_URL = process.env.API_HOME_ADDRESS_URL;
const API_HOME_ADDRESS_FIPS_APN_URL = process.env.API_HOME_ADDRESS_FIPS_APN_URL;
const API_REMODEL_VALUE_URL = process.env.API_REMODEL_VALUE_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Route
exports.remodelValue = async (req, res) => {
  try {
    // Concatenate the address before using it to make a request to our Address Search endpoint
    const addressObj = req.body;
    const addressStr = `${addressObj.addressLineOne} ${addressObj.city} ${addressObj.state} ${addressObj.zipcode}`;

    // Use encodeURI to take out any spaces in address
    const encodedAddress = encodeURI(addressStr);

    // URL and options
    const addressUrl = `${API_HOME_ADDRESS_URL}?address=${encodedAddress}`;
    const addressOptions = {
      method: "GET",
    };

    // Before making the first API call using the full address string, check to see if it is in your cache
    let addressData = null;
    if (addressCache.has(addressStr)) {
      // Get the cached data for an address based on its addressStr if it is cached
      addressData = addressCache.get(addressStr);
    } else {
      // Make the call to the Address Search endpoint if the addressStr isn't cached
      const addressRes = await fetch(addressUrl, addressOptions);
      const addressResLoad = await addressRes.json();
      addressData = addressResLoad.hits[0].address;
    }

    // Validate that the first hit closely matches the address passed from the client and check if it has been cached
    if (
      addressData.city_name === addressObj.city &&
      addressData.state_code === addressObj.state &&
      addressData.zip_code === addressObj.zipcode &&
      addressCache.has(addressStr)
    ) {
      // The valuation is most likely to be a correct match to the address delivered from the client side
      // The data for the address has also already been cached
      // This increases the confidence in the valuation shown for an address
      console.log("Good Match");
    } else if (
      addressData.city_name === addressObj.city &&
      addressData.state_code === addressObj.state &&
      addressData.zip_code === addressObj.zipcode &&
      !addressCache.has(addressStr)
    ) {
      // The valuation is most likely to be a correct match to the address delivered from the client side
      // This increases the confidence in the valuation shown for an address
      console.log("Good Match");
      // Cache the address data as it is a good match and hasn't been cached
      addressCache.set(addressStr, addressData, 10000);
    } else {
      // The valuation returned is unlikely to be the correct match for the address delivered from the client-side
      // The the correct address could be present in the hits array, however, it is not the first hit
      // You may decide to have the user choose the correct address from the array of hits as a possible solution
      console.log("Poor Match");
    }

    // Ensure you have a parcelId, which is needed to request data from the Remodel Value endpoint
    const parcelId = addressData.parcel_id;
    if (!parcelId) {
      throw new Error("parcelId is a falsy value");
    }

    // URL and options with API key for Remodel Value endpoint
    const remodelValueURL = `${API_REMODEL_VALUE_URL}/${parcelId}`;
    const remodelValueOptions = {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY_VALUE,
      },
    };

    let remodelValueRes = null;
    if (API_KEY_VALUE !== "yourApiKeyHere") {
      // Retrieve the remodel value data based on the address' parcel_id
      response = await fetch(remodelValueURL, remodelValueOptions);

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.code = response.status;
        throw error;
      }

      remodelValueRes = await response.json();
    } else {
      // Use sampleRemodelValueData for the homeValueRes
      remodelValueRes = sampleRemodelValueData;
    }

    res.status(200).json(remodelValueRes);
  } catch (err) {
    res.status(err.code).json({ errorMessage: err.message });
    console.error("Our apologies, the data has errors, please try again.");
    console.error(err.name);
    console.error(err.message);
  }
};
