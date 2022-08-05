const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jobSchema = require("../schemas/jobSchema");

const Job = new mongoose.model("Job", jobSchema);




router.get("/add-job", (req, res) => {
    console.log(req.body);
    // console.log(req.query);
    // console.log(req.path);
    // console.log(req.method);
    res.render("jobPost", { user: req.session.user });
});




router.get("/", (req, res) => {
    console.log(req.body);
    // console.log(req.query);
    // console.log(req.path);
    // console.log(req.method);
    // console.log(req);
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
    console.log(req.body);
    // console.log(req.query);
    // console.log(req.path);
    // console.log(req.method);
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
        // res.status(500).json({
        //     error: "There was a server side error!",
        // });
        res.redirect('/admin-path?add=0');
      } else {
            // res.status(200).json({
            // message: "Job successfully inserted!",
            // });
            // console.log(req.body);
            res.redirect('/admin-path?add=1');
        }
    });
});



// update job - form route
router.get("/update", (req, res) => {
  // console.log(req.query);
  // console.log(req.path);
  console.log(req.body);
  // console.log(req.query);
  // console.log(req.method);
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
router.post("/:id", (req, res) => {
    console.log(req.body);
    // let message = null;
    // console.log(req.query);
    // console.log(req.path);
    // console.log(req.method);
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
          // message.error = "There was a server side error!";
          // res.status(500).render({
          //   error: "There was a server side error!",
          // });
          res.redirect('/admin-path?update=0');
        } else {
          // message.success = "Job successfully updated!";
          // res.status(200).json({
          //   message: "Job successfully updated!",
          // });
          res.redirect('/admin-path?update=1');
        }
      }
    );
    // console.log(result);
});


// DELETE a JOB
router.delete("/:id", (req, res) => {
    console.log(req.body);
    // console.log(req.query);
    // console.log(req.path);
    // console.log(req.method);
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