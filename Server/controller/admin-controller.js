const User = require("../model/user-model");

const listUsers = async(req,res)=>{
 
    try {
        const users = await User.find({},{password:0});
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({msg:"user not found"})
    }
}

//delete user

const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        const deleteuser = await User.findByIdAndDelete(id)
        res.status(200).json({msg:"user delete"})
    } catch (error) {
        console.log("user not delete from backend")
    }
}
module.exports = {listUsers,deleteUser};