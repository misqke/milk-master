const Milks = require("../models/milkSchema");

const getAllMilks = async (req, res) => {
  try {
    const milks = await Milks.find().sort("_id");
    res.status(200).json({ msg: "success", data: milks });
  } catch (error) {
    console.log(error);
  }
};

const addMilk = async (req, res) => {
  try {
    const milk = req.body;
    const newMilk = await Milks.create(milk);
    res.status(201).json({ msg: "success", data: newMilk });
  } catch (error) {
    console.log(error);
  }
};

const updateMilks = (req, res) => {
  try {
    const newMilks = req.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllMilks,
  updateMilks,
  addMilk,
};
