const express = require("express");



const isAdmin = require("../middleware/isAdmin");

const homeRouter = require("../router/homeRouter");
const aboutRouter = require("../router/aboutRouter");
const servicesRouter = require("../router/servicesRouter");
const contactRouter = require("../router/contactRouter");
const jobRouter = require("../router/jobRouter");
const loginRouter = require("../router/loginRouter");
const signupRouter = require("../router/signupRouter");
const adminRouter = require("../router/adminRouter");


const router = express.Router();

router.use('/about', aboutRouter);
router.use('/services', servicesRouter);
router.use('/job-offers', jobRouter);
router.use('/contact', contactRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/admin-path', isAdmin, adminRouter);


router.delete("/:id", (req, res) => {
    Job.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Job successfully deleted!",
        });
      }
    });
  });
  
router.use('/', homeRouter);

module.exports = router;