const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const OpenAI = require('openai');

const app = express();

var corsOptions = {
  origin: `${process.env.HOST}:${process.env.PORT}`,
  origin: "http://20.193.155.12",
  origin: "http://20.193.155.12:81",
  origin: "http://localhost:3000", // remove in production
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const mongoose = db.mongoose;

// Set strictQuery to false globally for all schemas
mongoose.set("strictQuery", false);

//const Role = db.role;
mongoose
  .connect(
    `mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/real_estate`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/rentcast.routes")(app);
require("./app/routes/homeCompare.routes")(app);
require("./app/routes/homeValue.routes")(app);
require("./app/routes/marketInsights.routes")(app);
require("./app/routes/remodelValue.routes")(app);
require("./app/routes/demographics.routes")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/accesslog.routes")(app);
require("./app/routes/addressSearch.route")(app);

require("./app/routes/getPlunk.routes")(app);
require("./app/routes/crime.routes")(app);
require("./app/routes/address.routes")(app);
require("./app/routes/finance.routes")(app);
require("./app/routes/weather.routes")(app);
require("./app/routes/zoneomics.routes")(app);
require("./app/routes/contactUs.routes")(app);
require("./app/routes/hazards.routes")(app);
// require("./app/routes/openWeatherApi.routes")(app);
require("./app/routes/visualCrossing.routes")(app);
require("./app/routes/climateRisk.routes")(app);
require("./app/routes/geoData.routes")(app);
require("./app/routes/copyAssist.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
  res.json({ message: "API is Live!" });
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        } 
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

