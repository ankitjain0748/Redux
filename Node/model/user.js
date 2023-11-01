const mongoose = require("mongoose")


const regSchema = mongoose.Schema({
    userId: {
        type: Number
    },
    username: {
        type: String,
        trim: true,

    },
    name: {
        type: String,
        trim: true,
    },
    email: String,
    password: {
        type: Number

    },
    confirmpasword: {
        type: Number

    },
    role: {type: Number, default:1},
})


const Singup = mongoose.model('users', regSchema);

module.exports = Singup;