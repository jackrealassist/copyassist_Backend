require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB: process.env.DB_NAME,
  MONGODB_URL: process.env.MONGODB_URL
};