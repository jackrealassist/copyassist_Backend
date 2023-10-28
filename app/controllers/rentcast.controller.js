require("dotenv").config();
const axios = require("axios");

const API_RENTCAST_URL = process.env.API_RENTCAST_URL;
const API_RENTCAST_KEY = process.env.API_RENTCAST_KEY;

const requestOptions = {
  method: "GET",
  headers: {
    "X-API-Key": API_RENTCAST_KEY,
  },
};

let propertyType, bedrooms, bathrooms, squareFootage;

const handleRequest = async (axiosPromise) => {
  try {
    const response = await axiosPromise;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.allRentcast = async (req, res) => {
  try {
    const { address } = req.params;

    const propertyRecordsUrl = `${API_RENTCAST_URL}/properties?address=${encodeURI(address)}`;

    const infoResponse = await axios.request(propertyRecordsUrl, requestOptions);

    // console.log(infoResponse.data);

    propertyType = infoResponse.data[0].propertyType;
    bedrooms = infoResponse.data[0].bedrooms;
    bathrooms = infoResponse.data[0].bathrooms;
    squareFootage = infoResponse.data[0].squareFootage;

    const valueEstimateUrl = `${API_RENTCAST_URL}/avm/value?address=${encodeURI(
      address
    )}&propertyType=${encodeURI(propertyType)}&bedrooms=${encodeURI(
      bedrooms
    )}&bathrooms=${encodeURI(bathrooms)}&squareFootage=${encodeURI(squareFootage)}&compCount=5`;

    const longtermRentUrl = `${API_RENTCAST_URL}/avm/rent/long-term?address=${encodeURI(
      address
    )}&propertyType=${encodeURI(propertyType)}&bedrooms=${encodeURI(
      bedrooms
    )}&bathrooms=${encodeURI(bathrooms)}&squareFootage=${encodeURI(squareFootage)}&compCount=5`;

    const [response1, response2] = await Promise.all([
      handleRequest(axios.request(valueEstimateUrl, requestOptions)),
      handleRequest(axios.request(longtermRentUrl, requestOptions)),
    ]);

    let responseObj = {
      valueEstimate: response1,
      longtermRent: response2,
      propertyRecords: infoResponse.data,
    };

    return res.status(200).json(responseObj);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.valueEstimate = async (req, res) => {
  try {
    const { address, propertyType, bedrooms, bathrooms, squareFootage } = req.params;

    const finalApiUrl = `${API_RENTCAST_URL}/avm/value?address=${encodeURI(
      address
    )}&propertyType=${encodeURI(propertyType)}&bedrooms=${encodeURI(
      bedrooms
    )}&bathrooms=${encodeURI(bathrooms)}&squareFootage=${encodeURI(squareFootage)}&compCount=5`;

    response = await axios.request(finalApiUrl, requestOptions);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: err.message });
  }
};

exports.longtermRent = async (req, res) => {
  try {
    const { address, propertyType, bedrooms, bathrooms, squareFootage } = req.params;

    const finalApiUrl = `${API_RENTCAST_URL}/avm/rent/long-term?address=${encodeURI(
      address
    )}&propertyType=${encodeURI(propertyType)}&bedrooms=${encodeURI(
      bedrooms
    )}&bathrooms=${encodeURI(bathrooms)}&squareFootage=${encodeURI(squareFootage)}&compCount=5`;

    response = await axios.request(finalApiUrl, requestOptions);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: err.message });
  }
};

exports.propertyRecords = async (req, res) => {
  try {
    const { address } = req.params;

    const finalApiUrl = `${API_RENTCAST_URL}/properties?address=${encodeURI(address)}`;

    response = await axios.request(finalApiUrl, requestOptions);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: err.message });
  }
};
// exports.marketRentcast = async (req, res) => {
//   try {
//     const { zipCode, historyRange } = req.params;

//     const finalApiUrl = `${API_RENTCAST_URL}markets?zipCode=${zipCode}&historyRange=${historyRange}`;

//     response = await axios.request(finalApiUrl, requestOptions);
//     res.status(200).json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ errorMessage: err.message });
//   }
// };
