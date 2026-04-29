const mongoose = require("mongoose");

const URL = process.env.MONGODB_URL
const connectDB = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("connection success")
    } catch (error) {
        console.log("connection failed")
        console.error(error.message);
    }
}

module.exports = connectDB;