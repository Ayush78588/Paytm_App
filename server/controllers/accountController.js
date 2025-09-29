const Account = require("../models/Account")
const mongoose = require('mongoose')
const Transaction = require("../models/Transaction")


async function getBalance(req, res) {
    const account = await Account.findOne({ userId: req.user._id })
    if (!account) return res.status(400).json({ message: "Account not found" })

    res.status(200).json({ balance: account.balance, accountId: account._id, userId: account.userId })
}

async function transferBalance(req, res) {
    let session;

    try {
        const { to, amount } = req.body
        if (!to || !amount) return res.status(400).json({ message: "Missing field" })
        if (amount <= 0) return res.status(400).json({ message: "Invalid amount" })
        if (to == req.user._id) return res.status(400).json({ message: "Cannot self transfer" })

        session = await mongoose.startSession()
        await session.startTransaction()

        const acc1 = await Account.findOneAndUpdate({ userId: req.user._id, balance: { $gte: amount } }, { $inc: { balance: -amount } }, { new: true, session })
        const acc2 = await Account.findOneAndUpdate({ userId: to }, { $inc: { balance: amount } }, { new: true, session })


        if (!acc1 || !acc2) {
            await session.abortTransaction()
            return res.status(400).json({ message: "Account not found or Insufficient balance" })
        }

        await Transaction.create([{
            accountId: acc1._id,
            counterAccountId: acc2._id,
            amount,
            type: "debit"
        }], { session })

        await Transaction.create([{
            accountId: acc2._id,
            counterAccountId: acc1._id,
            amount,
            type: "credit"
        }], { session })

        await session.commitTransaction()
        res.status(200).json({ message: "Txn Successfull" })


    } catch (err) {
        if (session && session.inTransaction()) {
            await session.abortTransaction()
        }
        console.log(err.message);
        res.status(500).json({ message: "Internal server error" })

    } finally {
        if (session) await session.endSession()
    }

}

async function getTransactions(req, res) {
    try {
        const { accountId } = req.params;
        if (!accountId) return res.status(400).json({ message: "Missing field" })
        if (!mongoose.Types.ObjectId.isValid(accountId)) return res.status(400).json({ message: "Invalid accountId" })

        const transactions = await Transaction.find({ accountId }).populate({
            path: "counterAccountId",
            populate: { path: "userId", select: "username" },
            select: "userId"
        }).select('-__v')

        res.status(200).json({ transactions })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "Internal server error" })
    }
}




module.exports = {
    getBalance,
    transferBalance,
    getTransactions
}
