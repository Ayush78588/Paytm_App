const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    balance: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("amount", accountSchema)