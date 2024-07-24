const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    bdMonth: {
        type: String,
        required: true,
    },
    bdDay: {
        type: Number,
        required: true,
    },
    bdYear: {
        type: Number,
        required: true,
    },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
