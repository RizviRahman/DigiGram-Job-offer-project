const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");


const mainRouter = require("./router/mainRoute");
const dbConnect = require("./controllers/dbController");
const pathLog = require("./middleware/pathLog");

dotenv.config();

dbConnect(process.env.mongoDB);

const app = express();

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const tenMin = 1000*60*60*10 ;
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: tenMin }
    })
);


app.get('/logout',(req,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.use("/",pathLog, mainRouter);




app.listen(process.env.PORT, ()=>{
    console.log(`Application is running at http://localhost:${process.env.PORT}`);
});