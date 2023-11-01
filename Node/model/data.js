const mongoose = require("mongoose")


const dataSchema = mongoose.Schema({
    userId: {
        type: Number
    },
    age: {
        type: String,
        trim: true,

    },
    name: {
        type: String,
        trim: true,
    },
    email: String,

    role: { type: Number, default: 1 },
})


const datas = mongoose.model('records', dataSchema);

module.exports = datas;