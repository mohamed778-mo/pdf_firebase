const admin = require('firebase-admin');
const fs = require('fs');
const Uploads = require("../model/uploads_model")

require('dotenv').config();

const serviceAccount =JSON.parse(process.env.SERVER)



const upload_pdf =async (req, res) => {
    try{
    const file = req.files.find(f => f.fieldname === 'file')
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
  if (file) {
          if (!admin.apps.length) {
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
              storageBucket: process.env.STORAGE_BUCKET
            });
          }
    
    const bucket = admin.storage().bucket();
    const blob = bucket.file(file.filename);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: 'application/pdf'
      }
    });
            const pdf_name = req.body.name
        
    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Error uploading file.');
    });
  
    blobStream.on('finish', () => {
        

        blob.makePublic().then(async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            fs.unlinkSync(file.path); 
       
          
        const save_data = new Uploads({
            name : pdf_name,
            pdf : publicUrl,
         
        
        })
        await save_data.save()
        
        res.status(200).send({data : save_data , pdf_link :publicUrl })

        }).catch(err => {
            console.error(err);
            res.status(500).send('Error making file public.');
        });
    });
  

    fs.createReadStream(file.path).pipe(blobStream);
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
    const pdf_det = await Uploads.findByIdAndDelete(pdf_id);

    if (pdf_det) {
      const bucket = admin.storage().bucket();
      const file = bucket.file(pdf_det.filename);
      await file.delete();
      res.status(200).send("Delete is successful!!");
    } else {
      res.status(404).send("PDF not found.");
    }
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
