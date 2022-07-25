const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

const bcrypt = require("bcryptjs");


router.get('/',(req, res)=>{
    res.status(200).render("login", { user: null });
});

router.post('/', async(req, res)=>{
    const { uid, password } = req.body;
    const user = await User.findOne({ uid });
    if (!user) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }
    
    req.session.isAuth = true;
    req.session.user = user;
    console.log("Login successfull");

    if(user.role == "Admin"){
        req.session.isAdmin = true;
        res.redirect("/admin-path");
    }else{
        res.redirect("/");
    }
});



module.exports = router;