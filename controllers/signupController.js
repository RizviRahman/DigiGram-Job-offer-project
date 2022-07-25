const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

const bcrypt = require("bcryptjs");


router.get('/',(req, res)=>{
    res.status(200).render("signup", { user: null });
});

router.post("/", async(req, res) => {
    console.log(req.body);
    const hasdPsw = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      name: req.body.username,
      uid: req.body.uid,
      password: hasdPsw,
    });


    newUser.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
            console.log(err);
        } else {
              res.status(200).json({
              message: "User successfully inserted!",
              });
              console.log(req.body);
        }
    });
});

module.exports = router;



module.exports = router;