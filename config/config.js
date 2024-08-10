const mongoose = require("mongoose")
require("dotenv").config()


const MONGOLINK= process.env.MONGOLINK
const DBconnection =()=>{ 
mongoose.connect(MONGOLINK)
.then(()=>{console.log('done connection !!')})
.catch((e)=>{console.log(e.message)})
}


module.exports= DBconnection;

