const mongoose = require("mongoose")
require("dotenv").config()


const ATLAS_URL= process.env.ATLAS_URL
const DBconnection =()=>{ 
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
.then(()=>{console.log('done connection !!')})
.catch((e)=>{console.log(e.message)})
}


module.exports= DBconnection;

