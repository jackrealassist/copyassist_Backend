require("dotenv").config();
const axios = require("axios");

const API_OPENWEATHER_KEY = process.env.API_OPENWEATHER_KEY;
const API_OPENWEATHER_URL = process.env.API_OPENWEATHER_URL;

const getLastSixMonthsTimestamps = () => {
  let timestamps = [];
  const currentDate = new Date();

  for (let i = 1; i <= 6; i++) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() - i;

    if (currentMonth < 0) {
      currentYear--;
      currentMonth += 12;
    }
    const date = new Date(currentYear, currentMonth, 1, 12, 0, 0, 0);
    const timestamp = date.getTime() / 1000;
    timestamps.push(timestamp);
  }
  return timestamps;
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
  try {
    const lat = req.params.latitude;
    const lon = req.params.longitude;

    const firstMonthUrl = `${API_OPENWEATHER_URL}?lat=${lat}&lon=${lon}&dt=${timestamps[0]}&appid=${API_OPENWEATHER_KEY}`;
    const secondMonthUrl = `${API_OPENWEATHER_URL}?lat=${lat}&lon=${lon}&dt=${timestamps[1]}&appid=${API_OPENWEATHER_KEY}`;
    const thirdMonthUrl = `${API_OPENWEATHER_URL}?lat=${lat}&lon=${lon}&dt=${timestamps[2]}&appid=${API_OPENWEATHER_KEY}`;
    const fourthMonthUrl = `${API_OPENWEATHER_URL}?lat=${lat}&lon=${lon}&dt=${timestamps[3]}&appid=${API_OPENWEATHER_KEY}`;
    const fifthMonthUrl = `${API_OPENWEATHER_URL}?lat=${lat}&lon=${lon}&dt=${timestamps[4]}&appid=${API_OPENWEATHER_KEY}`;
    const sixthMonthUrl = `${API_OPENWEATHER_URL}?lat=${lat}&lon=${lon}&dt=${timestamps[5]}&appid=${API_OPENWEATHER_KEY}`;

    const [response1, response2, response3, response4, response5, response6] =
      await Promise.all([
        handleRequest(axios.get(firstMonthUrl)),
        handleRequest(axios.get(secondMonthUrl)),
        handleRequest(axios.get(thirdMonthUrl)),
        handleRequest(axios.get(fourthMonthUrl)),
        handleRequest(axios.get(fifthMonthUrl)),
        handleRequest(axios.get(sixthMonthUrl)),
      ]);

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
