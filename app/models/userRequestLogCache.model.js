const mongoose = require("mongoose");
// Define the UserRequestLogs schema
const userRequestLogCacheSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toISOString().split("T")[0],
  },
  response: {
    type: Object,
    required: true,
  },
});

// Create the UserRequestLogs model
const userRequestLogCache = mongoose.model(
  "userRequestLogCache",
  userRequestLogCacheSchema
);

module.exports = userRequestLogCache;
