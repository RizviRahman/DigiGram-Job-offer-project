const express = require("express");
const router = express.Router();


router.get('/about',(req, res)=>{
    res.render("aboutFR",{user: req.session.user});
});

router.get('/contact',(req, res)=>{
    res.render("contactFR",{user: req.session.user});
});

router.get('/',(req, res)=>{
    res.render("indexFR",{user: req.session.user});
});

module.exports = router;