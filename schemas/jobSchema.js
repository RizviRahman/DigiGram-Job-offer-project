const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },


    description: String,
    type: {
        type: String,
        enum: [ "Full Time","Part Time" ]
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: [ "Active","Inactive" ],
        default: "Active"
    }
});


module.exports = jobSchema;




// When creating a job offer i need:

// - Job category

// - Date

// - Name of the company

// - Job Title

// - Job Type (Full time, Part-time)

// - Job Description

// - Location