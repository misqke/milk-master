const express = require("express");
const { getAllMilks, updateMilks, addMilk } = require("../controllers/milks");

const router = express.Router();

router.route("/").get(getAllMilks).patch(updateMilks).post(addMilk);

module.exports = router;
