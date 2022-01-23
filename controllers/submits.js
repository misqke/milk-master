const scraper = require("../scraper");

const submitInventory = async (req, res) => {
  try {
    const { milks, username, password } = req.body;
    const image = await scraper(milks, username, password);

    res.status(201).json({
      msg: "Inventory posted successfully",
      data: image,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  submitInventory,
};
