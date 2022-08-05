function getAbout(req, res, next){
    res.render("about",{user: req.session.user});
}


module.exports = {
    getAbout
}