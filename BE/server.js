const express = require("express");
const app = express();
const mongoose = require("mongoose")
const User = require("./model/user")
const cors = require("cors");
mongoose.connect("mongodb+srv://Admin:Hung1572001@cluster0.zhzudng.mongodb.net/test",{  
    useNewUrlParser: true,
    dbName:"Task-1"
  })
const db = mongoose.connection
db.on("error",(error)=>console.log(error))
db.once("open",(error)=>console.log("Connection Database"))
app.use(express.json())
app.use(cors())
const userRouter = require("./routes/userRouter")
app.use("/user",userRouter)
app.listen(8080)