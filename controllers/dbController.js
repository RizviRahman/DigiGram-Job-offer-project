const mongoose = require("mongoose");

const dbConnect = async (uri)=>{
    await mongoose
    .connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("Database connection successfull"))
    .catch((err)=>console.log(err));
} 


module.exports = dbConnect;