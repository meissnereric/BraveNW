const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    // _id should be their email
    {
        email: {type: String, required: true},
        charName: {type: String, required: false}

    },
    { timestamps: true },
)

module.exports = mongoose.model('User', User)