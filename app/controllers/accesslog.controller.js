require("dotenv").config();
const express = require("express");
const axios = require("axios");
const NodeGeocoder = require("node-geocoder");
const geocoder = NodeGeocoder({
  provider: "opencage",
  apiKey: "1609c0aaff964910bc962498abec1c7f",
});

const userRequestLog = require("../models/userRequestLog.model");
const userRequestLogCache = require("../models/userRequestLogCache.model");
const API_GETPLUNK_KEY = process.env.API_GETPLUNK_KEY;
const API_GETPLUNK_ADDRESS_URL = process.env.API_GETPLUNK_ADDRESS_URL;
const API_GETPLUNK_HOME_COMPARE_URL = process.env.API_GETPLUNK_HOME_COMPARE_URL;
const API_GETPLUNK_PARCEL_METADATA_URL = process.env.API_GETPLUNK_PARCEL_METADATA_URL;
const API_GETPLUNK_HOME_VALUATIONS_URL = process.env.API_GETPLUNK_HOME_VALUATIONS_URL;
const API_GETPLUNK_HOME_REMODEL_VALUE_URL = process.env.API_GETPLUNK_HOME_REMODEL_VALUE_URL;
const API_GETPLUNK_MARKET_MEDIAN_LIST_PRICE_DOLLARS_URL =
  process.env.API_GETPLUNK_MARKET_MEDIAN_LIST_PRICE_DOLLARS_URL;
const API_GETPUNK_MARKET_SALE_VS_LIST_PRICE_PERCENT_URL =
  process.env.API_GETPUNK_MARKET_SALE_VS_LIST_PRICE_PERCENT_URL;
const API_GETPLUNK_MARKET_PRICE_PER_SQUARE_FEET_DOLLARS_URL =
  process.env.API_GETPLUNK_MARKET_PRICE_PER_SQUARE_FEET_DOLLARS_URL;
const API_GETPLUNK_MARKET_INVENTORY_COUNT_URL = process.env.API_GETPLUNK_MARKET_INVENTORY_COUNT_URL;
const API_GETPLUNK_DAYS_OF_INVENTORY_COUNT_URL =
  process.env.API_GETPLUNK_DAYS_OF_INVENTORY_COUNT_URL;
const API_GETPLUNK_MEDIAN_DAYS_ON_MARKET_URL = process.env.API_GETPLUNK_MEDIAN_DAYS_ON_MARKET_URL;
const API_CRIME_KEY = process.env.API_CRIME_KEY;
const API_CRIME_URL = process.env.API_CRIME_URL;
const API_WEATHER_URL = process.env.API_WEATHER_URL;
const API_WEATHER_KEY = process.env.API_WEATHER_KEY;
const API_RENTCAST_KEY = process.env.API_RENTCAST_KEY;
const API_FINANCE_AUTH_URL = process.env.API_FINANCE_AUTH_URL + "/";
const API_FINANCE_CORRELATION_ID = process.env.API_FINANCE_CORRELATION_ID;
const API_FINANCE_TOTAL_REPORT_URL = process.env.API_FINANCE_TOTAL_REPORT_URL;
const API_FINANCE_CLIENT_ID = process.env.API_FINANCE_CLIENT_ID;
const API_FINANCE_CLIENT_SECRET = process.env.API_FINANCE_CLIENT_SECRET;
const API_ZONEOMICS_URL = process.env.API_ZONEOMICS_URL;
const API_ZONEOMICS_KEY = process.env.API_ZONEOMICS_KEY;

const STATE_CODES = {
  AL: "01",
  AK: "02",
  AZ: "04",
  AR: "05",
  CA: "06",
  CO: "08",
  CT: "09",
  DE: "10",
  FL: "12",
  GA: "13",
  HI: "15",
  ID: "16",
  IL: "17",
  IN: "18",
  IA: "19",
  KS: "20",
  KY: "21",
  LA: "22",
  ME: "23",
  MD: "24",
  MA: "25",
  MI: "26",
  MN: "27",
  MS: "28",
  MO: "29",
  MT: "30",
  NE: "31",
  NV: "32",
  NH: "33",
  NJ: "34",
  NM: "35",
  NY: "36",
  NC: "37",
  ND: "38",
  OH: "39",
  OK: "40",
  OR: "41",
  PA: "42",
  RI: "44",
  SC: "45",
  SD: "46",
  TN: "47",
  TX: "48",
  UT: "49",
  VT: "50",
  VA: "51",
  WA: "53",
  WV: "54",
  WI: "55",
  WY: "56",
};

const handleRequest = async (axiosPromise) => {
  try {
    const response = await axiosPromise;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let transactionId,
  parcel_id,
  region_id,
  home_value,
  latitude,
  longitude,
  parcel_metadata,
  home_valuation,
  fips,
  apn,
  home_compare,
  home_remodel_value,
  market_median_list_price_usd,
  market_sale_vs_list_price_percent,
  market_price_per_sqft_usd,
  market_inventory_count,
  market_days_of_inventory_count,
  market_median_days_on_market,
  state_code,
  state_code_id,
  demographics,
  crime,
  weather,
  countyName,
  climateRisk,
  financeAuthorizationToken,
  finance_report,
  zone_details,
  zone_permit,
  hazardous,
  weather_history,
  rentcast,
  logEntry;

let transactionDetails = {};

const freeServices = async (address, res) => {
  // Get parcel_id to store in userRequestLogs
  const getPlunkConfigForAddress = {
    params: {
      address: address.replace(/\+/g, " "),
      max_result_count: 10,
    },
  };

  await axios
    .get(API_GETPLUNK_ADDRESS_URL, getPlunkConfigForAddress)
    .then((response) => {
      home_value = response.data;
      parcel_id = response.data.hits[0].address.parcel_id;
      fips = response.data.hits[0].address.fips;
      apn = response.data.hits[0].address.apn;
      state_code = response.data.hits[0].address.state_code;
      state_code_id = STATE_CODES[state_code];
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    });

  const getPlunkConfigForHome = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
  };

  await axios
    .get(API_GETPLUNK_HOME_COMPARE_URL + `/${parcel_id}`, getPlunkConfigForHome)
    .then((response) => {
      if (transactionId) {
        home_compare = response.data;
      }
      region_id = response.data.region_id;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    });

  const crimeConfig = {
    params: {
      from: "2009",
      to: "2021",
      API_KEY: API_CRIME_KEY,
    },
  };

  // Old Weather Configuration
  // const weatherConfig = {
  //   params: {
  //     key: API_WEATHER_KEY,
  //     q: address,
  //     dt: new Date().toISOString().split("T")[0],
  //   },
  // };

  const [response1, response2, response3] = await Promise.all([
    handleRequest(axios.get(process.env.HOST + "/api/demographics/all/" + state_code_id)),
    handleRequest(axios.get(`${API_CRIME_URL}/${state_code}/all`, crimeConfig)),
    geocoder
      .geocode(address)
      .then((res) => {
        latitude = res[0].latitude;
        longitude = res[0].longitude;
      })
      .catch((err) => {
        console.error(err);
      }),
  ]);

  demographics = response1.demographics;
  crime = response2;
  // latitude = response3[0].latitude;
  // longitude = response3[0].longitude;
};

const paidServices = async (address, res) => {
  logEntry = null;
  const getPlunkConfigForHome = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
  };
  const getPlunkConfigForMarket = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      region_id: region_id,
    },
  };
  const financeAuthConfig = {
    headers: {
      "x-api-key": API_RENTCAST_KEY,
    },
    params: {
      Ver: "1.0",
    },
  };
  const financeAuthBody = {
    ClientId: API_FINANCE_CLIENT_ID,
    ClientSecretKey: API_FINANCE_CLIENT_SECRET,
  };

  // const financeReportBody = {
  //   ProductNames: ["TotalViewReport"],
  //   SearchType: "FullAddress",
  //   FullAddress: address,
  //   ReferenceId: "Customer unique identifier echoed back in Response",
  // };

  const financeReportBody = {
    ProductNames: ["TotalViewReport", "PropertyDetailReport"],
    SearchType: "APN",
    ApnDetail: {
      Apn: apn,
      ZipCode: region_id,
    },
    ReferenceId: "Customer unique identifier echoed back in Response",
  };

  const zoneDetailsConfig = {
    params: {
      api_key: API_ZONEOMICS_KEY,
      lat: latitude,
      lng: longitude,
      output_fields: "default",
    },
  };
  const zonePermitConfig = {
    params: {
      api_key: API_ZONEOMICS_KEY,
      bottom_left_lat: parseFloat(latitude) - 0.5,
      bottom_left_lng: parseFloat(longitude) - 0.5,
      top_right_lat: parseFloat(latitude) + 0.5,
      top_right_lng: parseFloat(longitude) + 0.5,
    },
  };
  await axios
    .post(API_FINANCE_AUTH_URL, financeAuthBody, financeAuthConfig)
    .then((response) => {
      financeAuthorizationToken = response.data;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    });
  const financeReportConfig = {
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
      Authorization: financeAuthorizationToken,
      "x-xss-protection": "1; mode=block",
    },
  };

  await axios
    .get(`${process.env.HOST}/api/geoData/zipCodeToCounty/${region_id.toString()}`)
    .then((response) => {
      countyName = response.data.county;
    })
    .catch((err) => {
      console.log("########### err of countyName ##########", JSON.stringify(err, null, 2));
    });

  const [
    response1,
    response2,
    response3,
    response4,
    response5,
    response6,
    response7,
    response8,
    response9,
    response10,
    response11,
    response12,
    response13,
    response14,
    response15,
    response16,
  ] = await Promise.all([
    handleRequest(
      axios.get(API_GETPLUNK_PARCEL_METADATA_URL + `/${parcel_id}`, getPlunkConfigForHome)
    ),
    handleRequest(
      axios.get(API_GETPLUNK_HOME_VALUATIONS_URL + `/${parcel_id}`, getPlunkConfigForHome)
    ),
    handleRequest(
      axios.get(API_GETPLUNK_HOME_REMODEL_VALUE_URL + `/${parcel_id}`, getPlunkConfigForHome)
    ),
    handleRequest(
      axios.get(API_GETPLUNK_MARKET_MEDIAN_LIST_PRICE_DOLLARS_URL, getPlunkConfigForMarket)
    ),
    handleRequest(
      axios.get(API_GETPUNK_MARKET_SALE_VS_LIST_PRICE_PERCENT_URL, getPlunkConfigForMarket)
    ),
    handleRequest(
      axios.get(API_GETPLUNK_MARKET_PRICE_PER_SQUARE_FEET_DOLLARS_URL, getPlunkConfigForMarket)
    ),
    handleRequest(axios.get(API_GETPLUNK_MARKET_INVENTORY_COUNT_URL, getPlunkConfigForMarket)),
    handleRequest(axios.get(API_GETPLUNK_DAYS_OF_INVENTORY_COUNT_URL, getPlunkConfigForMarket)),
    handleRequest(axios.get(API_GETPLUNK_MEDIAN_DAYS_ON_MARKET_URL, getPlunkConfigForMarket)),
    handleRequest(axios.post(API_FINANCE_TOTAL_REPORT_URL, financeReportBody, financeReportConfig)),
    handleRequest(axios.get(API_ZONEOMICS_URL + "/zoneDetail", zoneDetailsConfig)),
    handleRequest(axios.get(API_ZONEOMICS_URL + "/zonePermits", zonePermitConfig)),
    handleRequest(axios.get(`${process.env.HOST}/api/hazards/allHazards/${latitude}/${longitude}`)),
    handleRequest(
      axios.get(
        `${process.env.HOST}/api/visualCrossing/lastSixMonthsHistory/${latitude}/${longitude}`
      )
    ),
    handleRequest(axios.get(`${process.env.HOST}/api/rentcast/allRentcast/${address}`)),
    handleRequest(axios.get(`${process.env.HOST}/api/climateRisk/${countyName}`)),
  ]);

  parcel_metadata = response1;
  home_valuation = response2;
  home_remodel_value = response3;
  market_median_list_price_usd = response4;
  market_sale_vs_list_price_percent = response5;
  market_price_per_sqft_usd = response6;
  market_inventory_count = response7;
  market_days_of_inventory_count = response8;
  market_median_days_on_market = response9;
  finance_report = response10;
  zone_details = response11;
  zone_permit = response12;
  hazardous = response13.hazardous;
  weather_history = response14.weather_history;
  rentcast = response15;
  climateRisk = response16;
};

exports.addressActivityLog = (req, res) => {
  const id = req.userId;

  userRequestLog.find(
    { userId: id },
    {
      _id: 0,
      "requestData.date": 1,
      "requestData.address": 1,
      "requestData.transactionDetails": 1,
    },
    (err, logs) => {
      if (err) {
        console.error(err);
        return;
      }

      const result = logs.map((item) => {
        // Check if transactionDetails is present in requestData[0]
        const transactionDetails = item.requestData[0]?.transactionDetails;

        // Determine the callType based on the presence of transactionDetails
        const callType = transactionDetails ? "Premium" : "Free";
        return {
          address: item.requestData[0].address,
          date: item.requestData[0].date,
          callType: callType,
        };
      });

      return res.status(200).json(result);
    }
  );
};

// userRequestLog Endpoint
exports.userRequestLog = async (req, res) => {
  try {
    let existingResponse;
    transactionId = req.params.transactionId;
    if (transactionId) {
      transactionDetails = {
        transactionId: transactionId,
        amount: 20,
        timestamp: new Date().toISOString(),
      };
    }

    const { userId, address } = req.body;

    // Check for Caches
    existingResponse = await userRequestLogCache.findOne({ address: address });
    if (existingResponse) {
      if (
        existingResponse.response[0] &&
        existingResponse.response[0].transactionDetails &&
        existingResponse.response[0].transactionDetails.transactionId !== undefined
      ) {
        if (req.params.transactionId) {
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: existingResponse.response[0],
          });
          await logEntry.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        } else {
          const tempObj = {
            address: existingResponse.response[0].address,
            date: existingResponse.response[0].date,
            home_value: existingResponse.response[0].home_value,
          };
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: tempObj,
          });
          await logEntry.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        }
      } else {
        if (req.params.transactionId) {
          await freeServices(address, res);
          await paidServices(address, res);
          const tempObj = {
            address: existingResponse.response[0].address,
            date: existingResponse.response[0].date,
            home_value: existingResponse.response[0].home_value,
            transactionDetails: transactionDetails,
            home_valuation: home_valuation,
            parcel_metadata: parcel_metadata,
            home_compare: home_compare,
            home_remodel_value: home_remodel_value,
            market_data: {
              median_list_price_usd: market_median_list_price_usd,
              sale_vs_list_price_percent: market_sale_vs_list_price_percent,
              price_per_sqft_usd: market_price_per_sqft_usd,
              inventory_count: market_inventory_count,
              days_of_inventory_count: market_days_of_inventory_count,
              median_days_on_market: market_median_days_on_market,
            },
            finance_report: finance_report,
            zone_details: zone_details,
            zone_permit: zone_permit,
            hazardous: hazardous,
            weather_history: weather_history,
            rentcast: rentcast,
          };
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: tempObj,
          });
          existingResponse.response[0] = tempObj;
          console.log("Updated Existing Response upward: ", existingResponse);
          await userRequestLogCache.findByIdAndUpdate(existingResponse._id, existingResponse);
          await logEntry.save();
          // await existingResponse.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        } else {
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: existingResponse.response[0],
          });
          await logEntry.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        }
      }
    } else {
      const currentDate = new Date().toISOString().split("T")[0]; //new Date().toISOString();
      await freeServices(address, res);
      // Add data to home_value object
      home_value = {
        ...home_value,
        parcel_id: parcel_id,
        region_id: region_id,
        latitude: latitude,
        longitude: longitude,
        fips: fips,
        apn: apn,
        state_code: state_code,
        state_code_id: state_code_id,
        demographics: demographics,
        crime: crime,
      };
      if (transactionId) {
        await paidServices(address, res);
      }
      // Create the log entry
      logEntry = new userRequestLog({
        userId,
        requestData: {
          address,
          date: currentDate,
          transactionDetails,
          home_value,
          home_valuation,
          parcel_metadata,
          home_compare,
          home_remodel_value,
          market_data: {
            median_list_price_usd: market_median_list_price_usd,
            sale_vs_list_price_percent: market_sale_vs_list_price_percent,
            price_per_sqft_usd: market_price_per_sqft_usd,
            inventory_count: market_inventory_count,
            days_of_inventory_count: market_days_of_inventory_count,
            median_days_on_market: market_median_days_on_market,
          },
          finance_report,
          zone_details,
          zone_permit,
          hazardous,
          weather_history,
          rentcast,
          climateRisk,
        },
      });

      // Check the number of requests from the same userId on the same date
      // const requestCount = await userRequestLog.countDocuments({
      //   userId,
      //   "requestData.date": currentDate,
      // });

      // if (requestCount >= 3) {
      //   // If the request count exceeds 3, return a message indicating the need for a premium plan
      //   return res
      //     .status(403)
      //     .json({ message: "Premium plan required for more requests" });
      // }

      // Save the log entry to the database
      await logEntry.save();

      const currentCache = new userRequestLogCache({
        userId: userId,
        address: address,
        response: logEntry.requestData,
      });

      await currentCache.save();
    }

    // Check for Caches once again
    const currentCachedResponse = await userRequestLogCache.findOne({ address: address });
    if (currentCachedResponse) {
      if (
        currentCachedResponse.response[0] &&
        currentCachedResponse.response[0].transactionDetails &&
        currentCachedResponse.response[0].transactionDetails.transactionId !== undefined
      ) {
        if (req.params.transactionId) {
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: currentCachedResponse.response[0],
          });
          await logEntry.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        } else {
          const tempObj = {
            address: currentCachedResponse.response[0].address,
            date: currentCachedResponse.response[0].date,
            home_value: currentCachedResponse.response[0].home_value,
          };
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: tempObj,
          });
          await logEntry.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        }
      } else {
        if (req.params.transactionId) {
          await paidServices(address, res);
          const tempObj = {
            address: currentCachedResponse.response[0].address,
            date: currentCachedResponse.response[0].date,
            home_value: currentCachedResponse.response[0].home_value,
            transactionDetails: transactionDetails,
            home_valuation: home_valuation,
            parcel_metadata: parcel_metadata,
            home_compare: home_compare,
            home_remodel_value: home_remodel_value,
            market_data: {
              median_list_price_usd: market_median_list_price_usd,
              sale_vs_list_price_percent: market_sale_vs_list_price_percent,
              price_per_sqft_usd: market_price_per_sqft_usd,
              inventory_count: market_inventory_count,
              days_of_inventory_count: market_days_of_inventory_count,
              median_days_on_market: market_median_days_on_market,
            },
            finance_report: finance_report,
            zone_details: zone_details,
            zone_permit: zone_permit,
            hazardous: hazardous,
            weather_history: weather_history,
            rentcast: rentcast,
          };
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: tempObj,
          });
          currentCachedResponse.response[0] = tempObj;
          await currentCachedResponse.save();
          console.log("Updated Existing Response: ", currentCachedResponse);
          await logEntry.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        } else {
          const logEntry = new userRequestLog({
            userId: userId,
            requestData: currentCachedResponse.response[0],
          });
          await logEntry.save();
          return res
            .status(200)
            .json({ message: "Log entry created successfully", details: logEntry });
        }
      }
    }
    await logEntry.save();
    return res.status(200).json({ message: "Log entry created successfully", details: logEntry });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error: error });
  }
};

exports.userLogCache = async (req, res) => {
  try {
    let { userId, address, response } = req.body;
    const cache = new userRequestLogCache({
      userId: userId,
      address: address,
      response: response,
    });

    await cache.save();

    return res.status(200).json(cache);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
