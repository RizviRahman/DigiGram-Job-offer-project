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
            res.render("jobControll", { user: req.session.user, jobs: data });
          }
        });
});



router.post("/", (req, res) => {
    console.log(req.body);
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
        res.status(500).json({
            error: "There was a server side error!",
        });
      } else {
            res.status(200).json({
            message: "Job successfully inserted!",
            });
            console.log(req.body);
        }
    });
});



// update job - form route
router.get("/update", (req, res) => {
  // console.log(req.query);

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
            // res.render("jobControll", { user: req.session.user, jobs: data });
            res.render("jobUpdate", { user: req.session.user, job: data });
          }
        });


  // res.render("jobUpdate", { user: req.session.user });
});




// UPDATE a JOB
router.put("/:id", (req, res) => {
    console.log(req.body);
    const result = Job.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          category: req.body.category,
          companyName: req.body.companyName,
          title: req.body.title,
          description: req.body.description,
          type: req.body.type,
          location: req.body.location
        },
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            message: "Job successfully updated!",
          });
        }
      }
    );
    // console.log(result);
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