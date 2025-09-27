const User = require("../models/User")
const jwt = require('jsonwebtoken')

module.exports = async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(400).json({ message: "Please Log in" });

        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({_id: data._id}).select('-password -__v');
        if(!user) return res.status(400).json({message: "User not found"});
        req.user = user;
        next();

    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            message: err.message
        })
        
    }




}

