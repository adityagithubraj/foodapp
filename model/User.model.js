const mongoose=require("mongoose");
require("dotenv").config();

  
const addrSchema=new mongoose.Schema({
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
})

const schema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   address:addrSchema
})


const User=mongoose.model("user",schema);



module.exports={User}