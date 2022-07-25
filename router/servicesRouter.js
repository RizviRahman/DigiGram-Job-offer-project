const express = require("express");
const { getServices } = require("../controllers/servicesController");

const router = express.Router();


// login page
router.get("/", getServices);

module.exports = router;