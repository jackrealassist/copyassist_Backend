require("dotenv").config();
const axios = require("axios");
const https = require("https");
const crypto = require("crypto");

const API_HAZARDS_URL = process.env.API_HAZARDS_URL;

const options = {
  request: axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
    }),
  }),
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

const programSystemAcronyms = ["RCRAINFO", "ICIS", "NCDB", "AIRS/AFS", "TRIS", "BR", "CEDRI"];

const searchRadius = 2;

// All options
// exports.allHazards = async (req, res) => {
//   const { latitude, longitude } = req.params;

//   let responses = {
//     RCRAINFO: "",
//     ICIS: "",
//     NCDB: "",
//     "AIRS/AFS": "",
//     TRIS: "",
//     BR: "",
//     CEDRI: "",
//   };

//   for (const acronym of programSystemAcronyms) {
//     try {
//       const config = {
//         params: {
//           latitude83: latitude,
//           longitude83: longitude,
//           search_radius: searchRadius,
//           pgm_sys_acrnm: acronym,
//           output: "JSON",
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await options.request.get(API_HAZARDS_URL, config);
//       responses[acronym] = response.data.Results.FRSFacility;
//     } catch (error) {
//       console.error(`Error for ${acronym}: ${error.message}`);
//       res.status(403).json({ message: error.message });
//     }
//   }
//   return res.status(200).json(responses);
// };

let rcraInfo, icis, ncdb, airsAfs, tris, br, cedri, allHazards;

// All Options with Concurrency
exports.allHazards = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const rcraInfoConfig = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "RCRAINFO",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const icisConfig = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "ICIS",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const ncdbConfig = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "NCDB",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const airsAfsConfig = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "AIRS/AFS",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const trisConfig = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "ICIS",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const brConfig = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "BR",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const cedriConfig = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "CEDRI",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const [response1, response2, response3, response4, response5, response6, response7] =
      await Promise.all([
        handleRequest(options.request.get(API_HAZARDS_URL, rcraInfoConfig)),
        handleRequest(options.request.get(API_HAZARDS_URL, icisConfig)),
        handleRequest(options.request.get(API_HAZARDS_URL, ncdbConfig)),
        handleRequest(options.request.get(API_HAZARDS_URL, airsAfsConfig)),
        handleRequest(options.request.get(API_HAZARDS_URL, trisConfig)),
        handleRequest(options.request.get(API_HAZARDS_URL, brConfig)),
        handleRequest(options.request.get(API_HAZARDS_URL, cedriConfig)),
      ]);

    rcraInfo = response1;
    icis = response2;
    ncdb = response3;
    airsAfs = response4;
    tris = response5;
    br = response6;
    cedri = response7;

    allHazards = {
      rcraInfo,
      icis,
      ncdb,
      airsAfs,
      tris,
      br,
      cedri,
    };
    return res.status(200).json({ hazardous: allHazards });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// RCRAINFO
exports.rcraInfo = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const config = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "RCRAINFO",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await options.request.get(API_HAZARDS_URL, config);
    return res.status(200).json(response.data.Results.FRSFacility);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// ICIS
exports.icis = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const config = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "ICIS",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await options.request.get(API_HAZARDS_URL, config);
    return res.status(200).json(response.data.Results.FRSFacility);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// NCDB
exports.ncdb = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const config = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "NCDB",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await options.request.get(API_HAZARDS_URL, config);
    return res.status(200).json(response.data.Results.FRSFacility);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// AIRS/AFS
exports.airsAfs = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const config = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "AIRS/AFS",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await options.request.get(API_HAZARDS_URL, config);
    return res.status(200).json(response.data.Results.FRSFacility);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// TRIS
exports.tris = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const config = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "TRIS",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await options.request.get(API_HAZARDS_URL, config);
    return res.status(200).json(response.data.Results.FRSFacility);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// BR
exports.br = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const config = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "BR",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await options.request.get(API_HAZARDS_URL, config);
    return res.status(200).json(response.data.Results.FRSFacility);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// CEDRI
exports.cedri = async (req, res) => {
  try {
    const { latitude, longitude } = req.params;
    const config = {
      params: {
        latitude83: latitude,
        longitude83: longitude,
        search_radius: searchRadius,
        pgm_sys_acrnm: "CEDRI",
        output: "JSON",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await options.request.get(API_HAZARDS_URL, config);
    return res.status(200).json(response.data.Results.FRSFacility);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};
