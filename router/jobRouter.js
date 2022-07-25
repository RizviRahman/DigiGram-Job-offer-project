const express = require("express");
// const { getJob } = require("../controllers/jobController");
const jobController = require("../controllers/jobController");
const router = express.Router();


router.use(express.json());


// router.get("/", getJob);

router.use("/", jobController);

module.exports = router;