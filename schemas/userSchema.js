const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },

    uid: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "User"
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = userSchema;
