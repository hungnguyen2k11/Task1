const express = require("express")
const router = express.Router()
const User = require("../model/user")

//getting user with name 
router.get("/",async (req,res)=>{
    const name = req.query.name
    if(name)
    {
        //check user with username or email have name
        try {
            const user = await User.find({$or : [{"username": { "$regex": name, "$options": "i" }}, {"email": { "$regex": name, "$options": "i" } }]})
            res.json(user)
        }catch(error){
            res.json({error : error.message })
        }
    }
    else
    {
        try {
            const user = await User.find()
            res.json(user)
        }catch(error){
            res.json({error : error.message })
        }
    }
   }
)



//update  user 
router.post("/update",async (req,res)=>{
    const data = req.body
    let checkerror = false
    //update many user 
    data.map(async (user)=>{
        console.log(user)
        try{
        const user1 = await User.findOneAndUpdate(
            {_id:user._id},
            user
        )
        await user1.save()}
        catch(error)
        {
            checkerror = error
        }
    })
    if(!checkerror)
    {
        res.json({mes : "Update is success" })
    }
    else{
        res.status(500).json({mes : "Update is fail" })
    }
})




module.exports = router