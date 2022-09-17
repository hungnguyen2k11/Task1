const mongoose = require("mongoose")

//users database
const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email :{
        type :String,
        required:true,
    },
    birthday:{
        type:String ,
        required:true
    },
},
{
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = mongoose.model("users",userSchema)
