const User = require("../models/User");
const bcrypt = require("bcrypt")     
const jwt = require('jsonwebtoken') 
const Account = require("../models/Account")


async function handleRegistration(req,res){
    const {firstName, lastName, username, password} = req.body;
    if(!firstName || !lastName || !username || !password) return res.status(400).json({"message": "Missing inputs"});

    let user = await User.findOne({username});
    if(user) return res.status(400).json({"message": "User exists"});

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({firstName, lastName, username, password: hashedPassword}); 

    const account = await Account.create({
        userId: user._id,
        balance: 1 + Math.round(Math.random() * 1000 * 100) / 100
    })
    
    res.status(201).json({
        message: "Account Created"
    });
}

async function handleLogin(req,res){
   const {username, password} = req.body;
   if(!username || !password) return res.status(400).json({message: "Missing field"});

   const user = await User.findOne({username});
   if(!user) return res.status(400).json({message: "User does not exist"});

   const matchPassword = await bcrypt.compare(password, user.password);
   if(!matchPassword) return res.status(400).json({message: "Invalid password"});

   const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {
     expiresIn: "30m"
   })

   res.cookie("accessToken", token, {
        maxAge: 30*60*1000,
        httpOnly: true
   })
   res.status(200).json({
    message: "Signed in",
    user: {
        firstName: user.firstName,
        username: user.username
    }
   })

}

function handleLogout(req,res){
    res.clearCookie("accessToken")
    res.status(200).json({
        message: "Signed out"
    })
}
 
module.exports = {
    handleRegistration,
    handleLogin,
    handleLogout
}