const express = require("express");
const { getAbout } = require("../controllers/aboutController");

const router = express.Router();


// login page
router.get("/", getAbout);

module.exports = router;