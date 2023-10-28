const mongoose = require("mongoose");
// Define the UserRequestLogs schema
const userRequestLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  requestData: [
    {
      address: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true, // Set the default value to the current date and time
        default: new Date().toISOString().split("T")[0],
      },
      transactionDetails: {
        type: Object,
        required: false,
      },
      home_value: {
        type: Object,
        required: true,
      },
      home_valuation: {
        type: Object,
        required: false,
      },
      parcel_metadata: {
        type: Object,
        required: false,
      },
      home_compare: {
        type: Object,
        required: false,
      },
      home_remodel_value: {
        type: Object,
        required: false,
      },
      market_data: {
        type: Object,
        required: false,
      },
      finance_report: {
        type: Object,
        required: false,
      },
      zone_details: {
        type: Object,
        required: false,
      },
      zone_permit: {
        type: Object,
        required: false,
      },
      hazardous: {
        type: Object,
        required: false,
      },
      weather_history: {
        type: Object,
        required: false,
      },
      rentcast: {
        type: Object,
        required: false,
      },
      climateRisk: {
        type: Object,
        required: false,
      },
    },
  ],
});

// Create the UserRequestLogs model
const userRequestLog = mongoose.model("userRequestLog", userRequestLogSchema);

module.exports = userRequestLog;
