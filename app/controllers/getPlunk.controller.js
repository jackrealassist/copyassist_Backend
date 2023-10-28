require("dotenv").config();
const axios = require("axios");

const API_GETPLUNK_ADDRESS_URL = process.env.API_GETPLUNK_ADDRESS_URL;
const API_GETPLUNK_APN_URL = process.env.API_GETPLUNK_APN_URL;
const API_GETPLUNK_KEY = process.env.API_GETPLUNK_KEY;
const API_GETPLUNK_HOME_VALUATIONS_URL =
  process.env.API_GETPLUNK_HOME_VALUATIONS_URL;
const API_GETPLUNK_PARCEL_METADATA_URL =
  process.env.API_GETPLUNK_PARCEL_METADATA_URL;
const API_GETPLUNK_HOME_COMPARE_URL = process.env.API_GETPLUNK_HOME_COMPARE_URL;
const API_GETPLUNK_HOME_REMODEL_VALUE_URL =
  process.env.API_GETPLUNK_HOME_REMODEL_VALUE_URL;
const API_GETPLUNK_MARKET_MEDIAN_LIST_PRICE_DOLLARS_URL =
  process.env.API_GETPLUNK_MARKET_MEDIAN_LIST_PRICE_DOLLARS_URL;
const API_GETPUNK_MARKET_SALE_VS_LIST_PRICE_PERCENT_URL =
  process.env.API_GETPUNK_MARKET_SALE_VS_LIST_PRICE_PERCENT_URL;
const API_GETPLUNK_MARKET_PRICE_PER_SQUARE_FEET_DOLLARS_URL =
  process.env.API_GETPLUNK_MARKET_PRICE_PER_SQUARE_FEET_DOLLARS_URL;
const API_GETPLUNK_MARKET_INVENTORY_COUNT_URL =
  process.env.API_GETPLUNK_MARKET_INVENTORY_COUNT_URL;
const API_GETPLUNK_DAYS_OF_INVENTORY_COUNT_URL =
  process.env.API_GETPLUNK_DAYS_OF_INVENTORY_COUNT_URL;
const API_GETPLUNK_MEDIAN_DAYS_ON_MARKET_URL =
  process.env.API_GETPLUNK_MEDIAN_DAYS_ON_MARKET_URL;

// Plunk Home Value By Address
exports.plunkHomeValueByAddress = async (req, res) => {
  const config = {
    params: {
      address: encodeURI(address),
      max_result_count: req.params.max_result_count,
    },
  };
  axios
    .get(API_GETPLUNK_ADDRESS_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Home Value By APN
exports.plunkHomeValueByApn = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      fips: req.params.fips,
      apn: req.params.apn,
    },
  };

  axios
    .get(API_GETPLUNK_APN_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Home Value Parcel Metadata
exports.plunkHomeValuations = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
  };

  axios
    .get(API_GETPLUNK_PARCEL_METADATA_URL + `/${req.params.parcel_id}`, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Home Valuations
exports.plunkParcelMetadata = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
  };

  axios
    .get(API_GETPLUNK_HOME_VALUATIONS_URL + `/${req.params.parcel_id}`, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Home Compare
exports.plunkHomeCompare = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
  };

  axios
    .get(API_GETPLUNK_HOME_COMPARE_URL + `/${req.params.parcel_id}`, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Home Remodel Value
exports.plunkHomeRemodelValue = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
  };

  axios
    .get(
      API_GETPLUNK_HOME_REMODEL_VALUE_URL + `/${req.params.parcel_id}`,
      config
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Market Median List Price in Dollars
exports.plunkMarketMedianListPriceDollars = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      region_id: req.params.region_id,
    },
  };

  axios
    .get(API_GETPLUNK_MARKET_MEDIAN_LIST_PRICE_DOLLARS_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Market Sale V/S List Price in Percentage
exports.plunkMarketSaleVsListPricePercent = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      region_id: req.params.region_id,
    },
  };

  axios
    .get(API_GETPUNK_MARKET_SALE_VS_LIST_PRICE_PERCENT_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Market Price/SqFt in Dollars
exports.plunkMarketPricePerSqFtDollars = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      region_id: req.params.region_id,
    },
  };

  axios
    .get(API_GETPLUNK_MARKET_PRICE_PER_SQUARE_FEET_DOLLARS_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Market Inventory Count
exports.plunkMarketInventoryCount = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      region_id: req.params.region_id,
    },
  };

  axios
    .get(API_GETPLUNK_MARKET_INVENTORY_COUNT_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Market Days of Inventory Count
exports.plunkMarketDaysOfInventoryCount = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      region_id: req.params.region_id,
    },
  };

  axios
    .get(API_GETPLUNK_DAYS_OF_INVENTORY_COUNT_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

// Plunk Market Median Days on Market
exports.plunkMedianDaysOnMarket = async (req, res) => {
  const config = {
    headers: {
      "x-api-key": API_GETPLUNK_KEY,
    },
    params: {
      region_id: req.params.region_id,
    },
  };

  axios
    .get(API_GETPLUNK_MEDIAN_DAYS_ON_MARKET_URL, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
