const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jobSchema = require("../schemas/jobSchema");

const Job = new mongoose.model("Job", jobSchema);


// GET ALL THE JOBS AS NORMAL USER
router.get("/", (req, res) => {
    Job.find({ status: "Active" })
      .select({
        _id: 0,
        __v: 0,
        status: 0
      })
    //   .limit(2)
    .exec((err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Success",
            });
        }
    });
});
  


// POST A JOB
router.post("/", (req, res) => {
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


// GET A JOB by ID
router.get("/:id", (req, res) => {
  Job.find({ _id: req.params.id }, (err, data) => {
      if (err) {
          res.status(500).json({
              error: "There was a server side error!",
          });
      } else {
          res.status(200).json({
              result: data,
              message: "Success",
          });
      }
  });
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



// function getJob(req, res, next){
//     res.render("job-offers");
// }


module.exports = router;
