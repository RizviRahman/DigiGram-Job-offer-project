const express = require("express");
const getSignup = require("../controllers/signupController");

const router = express.Router();


// login page
router.use("/", getSignup);

module.exports = router;