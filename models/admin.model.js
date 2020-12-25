const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  
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
        default: "Admin:Super"
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

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
