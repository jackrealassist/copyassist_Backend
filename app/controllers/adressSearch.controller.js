const axios = require("axios");

exports.addressSearch = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    // console.log("searchQuery", searchQuery);
    // Replace 'https://api.bhr.fyi' with the actual API URL
    // const apiUrl = `https://api.bhr.fyi/api/address/search?search=${searchQuery}`;

    const apiUrl = `https://analytics.placer.ai/2/guru/search/anon?type=venues%252Ccomplexes&purchase_only=false&query=${searchQuery}&limit=5`;

    // const apiUrl = `https://api.bhr.fyi/api/address/search?search=123`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
