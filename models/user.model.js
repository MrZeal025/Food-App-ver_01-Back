const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    profilePicture: {
        type: String,
        default: ""
    },
    backGroundPicture: {
        type: String,
        default: ""
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    type: {
        type: String,
        default: "User:Regular"
    },
    validated: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
