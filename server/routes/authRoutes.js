const express = require('express')
const route = express.Router();
const authController = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")

route.post('/register', authController.handleRegistration)

route.post('/login', authController.handleLogin)

route.post('/logout',authMiddleware, authController.handleLogout)



module.exports = route;