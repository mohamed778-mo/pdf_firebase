const mongoose = require('mongoose'); 


var UploadsSchema = new mongoose.Schema({
    name:{
        type:String,
      
      
    },
    pdf:{
        type:String
    }
    
});


module.exports = mongoose.model('Uploads', UploadsSchema);
