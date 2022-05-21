const inventoryScraper = require("../inventoryScraper");
const orderScraper = require("../orderScraper");

let image = "";

const clearImage = () => {
  image = "";
};

const submitInventory = async (req, res) => {
  try {
    const { milks, login, password } = req.body;

    runScraper(milks, login, password, 1);
    res.status(201).json({
      message: "Submitting inventory... ",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const submitOrder = async (req, res) => {
  try {
    const { milks, login, password } = req.body;

    runScraper(milks, login, password, 2);
    res.status(201).json({
      message: "Submitting order... ",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const getConfirmation = async (req, res) => {
  try {
    const { num } = req.query;
    if (image) {
      setTimeout(() => clearImage(), 22000);
      if (image.slice(0, 5) === "error") {
        return res.status(500).json({ error: image.slice(7) });
      } else {
        return res.status(200).json({
          message: `${num === "1" ? "Inventory" : "Order"} Posted Successfully`,
          data: image,
        });
      }
    } else {
      return res.status(200).json({
        message: `Submitting ${num === "1" ? "inventory" : "order"}...`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const runScraper = async (milks, login, password, num) => {
  if (num === 1) {
    image = await inventoryScraper(milks, login, password);
  } else {
    image = await orderScraper(milks, login, password);
  }
};

module.exports = {
  submitInventory,
  submitOrder,
  getConfirmation,
};
