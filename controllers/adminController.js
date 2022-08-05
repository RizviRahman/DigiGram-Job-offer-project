const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jobSchema = require("../schemas/jobSchema");

const Job = new mongoose.model("Job", jobSchema);




router.get("/add-job", (req, res) => {
    
    res.render("jobPost", { user: req.session.user });
});




router.get("/", (req, res) => {
    
    Job.find()
        .select({
          __v: 0
        })
        //   .limit(2)
        .exec((err, data) => {
          if (err) {
              res.status(500).json({
                  error: "There was a server side error!",
              });
          } else {
            // res.render("jobControll", { user: req.session.user, jobs: data });
            res.render("jobControll", { user: req.session.user, jobs: data });
          }
        });
});



router.post("/", (req, res) => {
    
    job_data = {
        category: req.body.category,
        companyName: req.body.companyName,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        location: req.body.location
    };
    const newJob = new Job(req.body);
    newJob.save((err) => {
      if (err) {
        res.redirect('/admin-path?add=0');
      } else {
            res.redirect('/admin-path?add=1');
        }
    });
});



// update job - form route
router.get("/update", (req, res) => {


  Job.findById(req.query.id)
        .select({
          __v: 0
        })
        //   .limit(2)
        .exec((err, data) => {
          if (err) {
              res.status(500).json({
                  error: "There was a server side error!",
              });
          } else {
            res.render("jobUpdate", { user: req.session.user, job: data });
          }
        });

});




// UPDATE a JOB
router.post("/:id", (req, res) => {
    const result = Job.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          category: req.body.category,
          companyName: req.body.companyName,
          title: req.body.title,
          description: req.body.description,
          type: req.body.type,
          location: req.body.location,
          status: req.body.status
        },
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          res.redirect('/admin-path?update=0');
        } else {
          res.redirect('/admin-path?update=1');
        }
      }
    );

});


// DELETE a JOB
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

  module.exports = router;