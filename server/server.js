const express = require("express")
require("dotenv").config()
const {connectDb} = require("./config/db")
const User = require("./models/User")
const authRoutes = require("./routes/authRoutes")
const accountRoutes = require('./routes/accountRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3000
connectDb()


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.get('/', function(req,res){
    res.send("Welcome to Paytm Project!")
})
app.use('/api/auth', authRoutes)
app.use('/api/v1/account', accountRoutes)
app.use('/api/user', userRoutes)






  

app.listen(port, ()=>{
    console.log(`server is live on port ${port}`);    
})