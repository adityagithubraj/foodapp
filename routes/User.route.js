const express=require("express");
const { User } = require("../model/User.model.js");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router();




userRouter.post("/register",async(req,res)=>{
    const {name,email,password,address}=req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        let user=new User({name,email,password:hashedPassword,address})
        await user.save()    
        res.status(201).send({msg:"User Registered Successfully"})
    } catch (error) {
        console.log(error)
        res.send({msg:"something went wrong",error})
    }
})
//..........................................login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({email:email,userid:user[0]._id},"masai")
                    res.send({"msg":'logged in',token:token})
                }else{
                    res.send({msg:"something went wrong"})
                }
            })
        }else{
            res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})

 //......................reset pasw............

 userRouter.post("/:id/reset",async(req,res)=>{

    try{
        const userId=req.params.id;
        const {password}=req.body;
        if(password==undefined){
            return res.status(500).send({"msg":"Enter all credential"})
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
               return   res.status(400).send({"msg":"An error occured"})
            } 
            const user=await User.findByIdAndUpdate(userId,{password:hash})
            if(user){
                
                return res.status(204).send({"msg":"Your password has been updated successfully"})
            }else{
                return res.status(401).send({"msg":"Something went wrong"})
            }
       });
     
        
    }
    catch(err){
      res.status(500).send({"msg":err.message})
    }
})
 
 //........export model.....
module.exports={
    userRouter
}