const express = require("express");

const { submitInventory } = require("../controllers/submits");
const router = express.Router();

router.post("/inventory", submitInventory);

module.exports = router;
