const mongoose=require("mongoose");
require("dotenv").config()

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
   address:addrSchema,
   menu:[
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true,
        },
        image:String
    }
   ]
})


const Restuarnt=mongoose.model("resturant",schema);



module.exports={Restuarnt}