const express = require("express");
const { getContact } = require("../controllers/contactController");

const router = express.Router();


// login page
router.get("/", getContact);

module.exports = router;