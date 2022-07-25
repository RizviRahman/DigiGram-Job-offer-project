const express = require("express");
const getLogin = require("../controllers/loginController");

const router = express.Router();


// login page
router.use("/", getLogin);

module.exports = router;