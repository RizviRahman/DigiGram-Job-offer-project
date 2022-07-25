module.exports = (req, res, next) => {
    if (req.session.isAdmin){
        next();
    } else if(req.session.isAuth){
        res.redirect("/");
    } else {
        req.session.error = "You have to Login first";
        res.redirect("/login");
    }
}