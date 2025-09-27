const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const userController =  require('../controllers/userController')
const route = express.Router()

route.get('/filter', authMiddleware, userController.filterUser)
route.get('/me', authMiddleware, userController.aboutMe)

module.exports = route