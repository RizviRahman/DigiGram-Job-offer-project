const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();
router.use(express.json());

// login page
router.use("/", adminController);

module.exports = router;