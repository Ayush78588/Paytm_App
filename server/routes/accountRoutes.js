const express = require("express")
const route = express.Router()
const accountController = require('../controllers/accountController')
const authMiddleware = require("../middleware/authMiddleware")

route.get('/balance', authMiddleware, accountController.getBalance)
route.put('/balance/transfer', authMiddleware, accountController.transferBalance)
route.get('/:accountId/transactions', authMiddleware, accountController.getTransactions)


module.exports = route