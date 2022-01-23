const express = require("express");

const { submitInventory } = require("../controllers/submits");
const extendedTimeout = require("../middleware/extendedTimeout");
const router = express.Router();

router.use(extendedTimeout);
router.post("/inventory", submitInventory);

module.exports = router;
