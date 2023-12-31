//.............require all modul..................

const express =require("express");
const connection = require("./config/db")
const {userRouter}=require("./routes/User.route")
const {ResRouter}=require("./routes/restaurant.route")
const {OrderRoute}=require("./routes/Order.route")
const app = express();

require("dotenv").config()
//...................use module..................
app.use(express.json());
const port=process.env.PORT|| 5059



//...............................$


app.get("/",(req,res)=>{
    res.send("<h1>welcome to food Delivery App API</h1>")
})

app.use("/user",userRouter)
app.use("/api/restaurants",ResRouter)
app.use("/api/orders",OrderRoute)





//........... server is listen her ..............
app.listen(port,()=>{
    try {
        connection
        console.log('conected to DB')
    } catch (error) {
        console.log(error.message)
    }
    console.log(`port is runig ${port}`)
})