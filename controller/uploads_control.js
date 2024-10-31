const admin = require('firebase-admin');
const fs = require('fs');
const Uploads = require("../model/uploads_model")
const path = require("path");
require('dotenv').config();

// const serviceAccount =JSON.parse(process.env.SERVER)



const upload_pdf =async (req, res) => {
  try{
    const file = req.files.find(f => f.fieldname === 'file')
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  if (file) {

          const pdf_name = req.body.name
        
    
            const publicUrl = `https://eltodi.genuisweb.com/uploads/${file.filename}`; 

                   
        const save_data = new Uploads({
            name : pdf_name,
            pdf : publicUrl,
            file_name:blob.name
         
        
        })
        await save_data.save()
        
        res.status(200).send({data : save_data , pdf_link :publicUrl })

                }

}catch(e){res.status(500).send(e.message)}
  
}
const get_pdf = async (req,res)=>{

try{
const pdf_id = req.params.pdf_id
const pdf_det = await Uploads.findById(pdf_id)

res.status(200).send(pdf_det)

}catch(e){res.status(500).send(e.message)}

}
const delete_pdf = async (req, res) => {
try {
        const pdf_id = req.params.pdf_id;
        const pdf_det = await Uploads.findById(pdf_id);
        
        if (!pdf_det) {
            return res.status(404).send('PDF not found.');
        }

        const photoPath = path.join(__dirname, '..', 'uploads', path.basename(pdf_det.pdf));
      fs.unlink(photoPath, (err) => {
          if (err) {
              console.error('Error deleting question photo:', err);
          }
      });

        
        await Uploads.findByIdAndDelete(pdf_id);

        res.status(200).send("File and database record deleted successfully!");
    } catch (e) {
        res.status(500).send(e.message);
    }

};

const get_pdfs =  async (req,res)=>{

    try{
  
    const pdfs = await Uploads.find()
    
    res.status(200).send(pdfs)
    
    }catch(e){res.status(500).send(e.message)}
    
}



  module.exports = {
    upload_pdf,get_pdf,delete_pdf,get_pdfs
  }
