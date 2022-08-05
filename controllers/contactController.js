function getContact(req, res, next){
    res.render("contact",{user: req.session.user});
}


module.exports = {
    getContact
}