const express = require("express");
const { getMilkData } = require("../controllers/milks");

const router = express.Router();

router.route("/").post(getMilkData);

module.exports = router;
