const mongoose = require("mongoose");
const connection = mongoose.connection;
const collectionName = "geo_data";
exports.zipCodeToCounty = async (req, res) => {
  const collection = connection.collection(collectionName);
  try {
    const { zipCode } = req.params;
    const query = { zipcode: zipCode };
    await collection.findOne(query).then((document) => {
      return res.status(200).json(document);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
