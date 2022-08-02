module.exports = (req, res, next) => {
    console.log(`[${ req.method }] : ` + req.path + `${req.query ? " [Query]:" : ""}` , req.query ? req.query: "");
    next();
}