const scraper = require("../scraper");

let image = "";

const clearImage = () => {
  image = "";
};

const submitInventory = async (req, res) => {
  try {
    const { milks, username, password } = req.body;
    runScraper(milks, username, password);
    res.status(201).json({
      msg: "Submitting inventory... please wait...",
    });
  } catch (error) {
    console.log(error);
  }
};

const getConfirmation = async (req, res) => {
  try {
    if (image) {
      setTimeout(() => clearImage(), 20000);
      return res
        .status(200)
        .json({ msg: "inventory posted successfully", data: image });
    } else {
      return res
        .status(200)
        .json({ msg: "Submitting inventory... please wait..." });
    }
  } catch (error) {
    console.log(error);
  }
};

const runScraper = async (milks, username, password) => {
  image = await scraper(milks, username, password);
};

module.exports = {
  submitInventory,
  getConfirmation,
};
