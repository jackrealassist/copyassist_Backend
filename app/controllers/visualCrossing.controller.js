require("dotenv").config();
const axios = require("axios");

const API_VISUAL_CROSSING_KEY = process.env.API_VISUAL_CROSSING_KEY;
const API_VISUAL_CROSSING_URL = process.env.API_VISUAL_CROSSING_URL;

const getLastSixMonthsTimestamps = () => {
  const startTimestamps = [];
  const endTimestamps = [];
  const currentDate = new Date();

  for (let i = 1; i <= 6; i++) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() - i;

    if (month < 0) {
      year--;
      month += 12;
    }

    const startTimestamp = new Date(year, month, 1, 9, 0, 0, 0);
    const endTimestamp = new Date(year, month, 1, 10, 0, 0, 0);

    const startISO = startTimestamp.toISOString().split("T")[0] + "T09:00:00";
    const endISO = endTimestamp.toISOString().split("T")[0] + "T10:00:00";

    startTimestamps.push(startISO);
    endTimestamps.push(endISO);
  }

  return { startTimestamps, endTimestamps };
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

// Last Six Months History from Current Date
exports.lastSixMonthsHistory = async (req, res) => {
  const timestamps = getLastSixMonthsTimestamps();
  const startTimestamps = timestamps.startTimestamps;
  const endTimestamps = timestamps.endTimestamps;
  try {
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    const address = `${latitude},${longitude}`;

    const firstMonthOptions = {
      method: "GET",
      url: API_VISUAL_CROSSING_URL,
      params: {
        startDateTime: startTimestamps[0],
        aggregateHours: "24",
        location: address,
        endDateTime: endTimestamps[0],
        unitGroup: "us",
        dayStartTime: "9:00:00",
        contentType: "json",
        dayEndTime: "10:00:00",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": API_VISUAL_CROSSING_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };
    const secondMonthOptions = {
      method: "GET",
      url: API_VISUAL_CROSSING_URL,
      params: {
        startDateTime: startTimestamps[1],
        aggregateHours: "24",
        location: address,
        endDateTime: endTimestamps[1],
        unitGroup: "us",
        dayStartTime: "9:00:00",
        contentType: "json",
        dayEndTime: "10:00:00",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": API_VISUAL_CROSSING_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };
    const thirdMonthOptions = {
      method: "GET",
      url: API_VISUAL_CROSSING_URL,
      params: {
        startDateTime: startTimestamps[2],
        aggregateHours: "24",
        location: address,
        endDateTime: endTimestamps[2],
        unitGroup: "us",
        dayStartTime: "9:00:00",
        contentType: "json",
        dayEndTime: "10:00:00",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": API_VISUAL_CROSSING_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };
    const fourthMonthOptions = {
      method: "GET",
      url: API_VISUAL_CROSSING_URL,
      params: {
        startDateTime: startTimestamps[3],
        aggregateHours: "24",
        location: address,
        endDateTime: endTimestamps[3],
        unitGroup: "us",
        dayStartTime: "9:00:00",
        contentType: "json",
        dayEndTime: "10:00:00",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": API_VISUAL_CROSSING_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };
    const fifthMonthOptions = {
      method: "GET",
      url: API_VISUAL_CROSSING_URL,
      params: {
        startDateTime: startTimestamps[4],
        aggregateHours: "24",
        location: address,
        endDateTime: endTimestamps[4],
        unitGroup: "us",
        dayStartTime: "9:00:00",
        contentType: "json",
        dayEndTime: "10:00:00",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": API_VISUAL_CROSSING_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };
    const sixthMonthOptions = {
      method: "GET",
      url: API_VISUAL_CROSSING_URL,
      params: {
        startDateTime: startTimestamps[5],
        aggregateHours: "24",
        location: address,
        endDateTime: endTimestamps[5],
        unitGroup: "us",
        dayStartTime: "9:00:00",
        contentType: "json",
        dayEndTime: "10:00:00",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": API_VISUAL_CROSSING_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    const [response1, response2, response3, response4, response5, response6] = await Promise.all([
      handleRequest(axios.request(firstMonthOptions)),
      handleRequest(axios.request(secondMonthOptions)),
      handleRequest(axios.request(thirdMonthOptions)),
      handleRequest(axios.request(fourthMonthOptions)),
      handleRequest(axios.request(fifthMonthOptions)),
      handleRequest(axios.request(sixthMonthOptions)),
    ]);

    // let first_month = response1;
    // let second_month = response2;
    // let third_month = response3;
    // let fourth_month = response4;
    // let fifth_month = response5;
    // let sixth_month = response6;

    let weather_history = {
      0: response1,
      1: response2,
      2: response3,
      3: response4,
      4: response5,
      5: response6,
    };

    return res.status(200).json({ weather_history: weather_history });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
