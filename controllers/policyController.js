function getPolicy(req, res, next){
    res.render("policy",{user: req.session.user});
}


module.exports = {
    getPolicy
}