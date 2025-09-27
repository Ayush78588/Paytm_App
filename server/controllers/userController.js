const User = require("../models/User")

async function filterUser(req, res) {
    try {
        const { filter } = req.query
        
        if(filter==="") {
            const users = await User.find({_id: {$ne: req.user._id}}).select('-__v -password')    
            return res.status(200).json({users})
        }
        if (!filter) return res.status(400).json({ message: "Missing field" })

        const users = await User.find({ $or: [{ firstName: { $regex: filter, $options: "i" } }, { lastName: { $regex: filter, $options: "i" } }], _id: {$ne: req.user._id}}).select('-__v -password')
        if (!users) return res.status(400).json({ message: "No user found" })

        return res.status(200).json({ users })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "Internal server error" })
    }
}0

async function aboutMe(req,res){
    try{
        res.status(200).json({user: req.user})
    }catch(err){
        console.log(err.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    filterUser,
    aboutMe
}