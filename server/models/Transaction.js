const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "account"
    },
    counterAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "account"
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("transaction", transactionSchema);