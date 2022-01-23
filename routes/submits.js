const express = require("express");

const { submitInventory, getConfirmation } = require("../controllers/submits");
const router = express.Router();

router.post("/inventory", submitInventory);
router.get("/confirmation", getConfirmation);

module.exports = router;
