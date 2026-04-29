const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // ✅ NEW FIELDS
    username: {
        type: String,
        unique:true,
    },
    image:{
        type:String
    },
    dob: {
        type: Date
    },
    bio:{
        type:String
    },
    followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }],
    following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }]
        
},
{timestamps:true})

const User = mongoose.model("user",userSchema);

module.exports = User;