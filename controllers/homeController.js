function getHome(req, res, next){
    console.log(req.session.user);
    res.render("index", { user: req.session.user });
}


module.exports = {
    getHome
}