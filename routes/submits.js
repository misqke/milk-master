const express = require("express");

const { submitInventory } = require("../controllers/submits");
const extendTimeout = require("../middleware/extendTimeout");
const router = express.Router();

router.use(extendTimeout);
router.post("/inventory", submitInventory);

module.exports = router;
