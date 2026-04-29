const express = require("express");
const cors = require("cors")
require("dotenv").config();   
// const dotenv = require("dotenv");
const authRouter = require("./router/route-auth")
const postRouter = require("./router/router-post")
const adminRouter = require("./router/router-admin")
const connectDB = require("./config/db");
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
  };
connectDB();
const app= express();
app.use(express.json());
app.use(cors(corsOptions))
app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/admin",adminRouter)
//app.use("/api/auth",authRouter)
const PORT = 2000;

app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`)
})