const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jobSchema = require("../schemas/jobSchema");

const Job = new mongoose.model("Job", jobSchema);
const moment = require('moment');

// GET ALL THE JOBS AS NORMAL USER
router.get("/api", (req, res) => {
    Job.find({ status: "Active" })
      .select({
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
  

// GET A JOB by ID
router.get("/api/:id", (req, res) => {
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


// GET ALL THE JOBS AS NORMAL USER
router.get("/", (req, res) => {
    let {page=1,limit=10,job}=req.query

    const colorList={
        "Energy":{class:"img-holder1",no:1},
        "Environment":{class:"img-holder",no:2},
        "IT":{class:"img-holder3",no:3},
        "Industry":{class:"img-holder2",no:4}

    }

    if(job){
        Job.findOne({ _id:job}, (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
              return res.status(200).render("jobOfferDetails",{ data:data ,moment: moment, no:colorList[data.category].no});
            }
        });
    }else{
        limit = Number(limit)
        page = Number(page)
        const offset = (page - 1) * limit;
    
        Job.find({ status: "Active" })
            .select({
            __v: 0,
            status: 0
            }).limit(limit).skip(offset)
        .exec(async(err, data) => {
            if (err) {
                return res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                let finlData=[]
        
                data.forEach(obj => {
                    let sort_name=obj.title.split(" ")
                    if(sort_name.length==1){
                        sort_name=sort_name[0][0].toUpperCase()
                    }else{
                        sort_name=sort_name[0][0].toUpperCase()+sort_name[1][0].toUpperCase()
                    }
                    let color;
                
                    finlData.push({...obj.toObject(),sort_name,color:colorList[obj.category].class})
                });
                const totalJob = await Job.countDocuments()
                let totalPages = Math.ceil(totalJob / limit)
                totalPages = totalPages === 0 ? 1 : totalPages
        
                res.status(200).render("jobOffer",{ jobs: finlData ,moment: moment, totalPages, currentPage: page});
            }
        });
    }


});


module.exports = router;
