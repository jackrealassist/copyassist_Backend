const mongoose = require("mongoose");
const connection = mongoose.connection;
const collectionName = "county";
exports.getCountyClimateRisks = async (req, res) => {
  const collection = connection.collection(collectionName);
  try {
    const { countyName } = req.params;
    const query = { COUNTY: countyName };
    await collection.findOne(query).then((document) => {
      return res.status(200).json(document);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
