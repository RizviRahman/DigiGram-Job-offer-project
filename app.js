const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");


const mainRouter = require("./router/mainRoute");
const dbConnect = require("./controllers/dbController");

dotenv.config();

dbConnect(process.env.mongoDB);

const app = express();

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        // cookie: { secure: true , maxAge: 360000 }
    })
);


app.use("/", mainRouter);



app.listen(process.env.PORT, ()=>{
    console.log(`Application is running at http://localhost:${process.env.PORT}`);
});