const scraper = require("../scraper");

const submitInventory = async (req, res) => {
  try {
    const { milks, username, password } = req.body;
    await scraper(milks, username, password);
    res
      .status(201)
      .json({ msg: "Inventory posted successfully", data: "/img.png" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  submitInventory,
};
