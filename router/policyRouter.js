const express = require("express");
const { getPolicy } = require("../controllers/policyController");

const router = express.Router();


// login page
router.get('/', getPolicy);

module.exports = router;