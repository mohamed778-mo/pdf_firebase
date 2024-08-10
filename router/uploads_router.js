const router =require('express').Router() 
const storage = require("../middleware/multer_upload")

const { upload_pdf,get_pdf,delete_pdf,get_pdfs} = require('../controller/uploads_control');


router.post('/upload_pdf',storage.any(), upload_pdf);
router.get('/get_pdf/:pdf_id', get_pdf); 
router.delete('/delete_pdf/:pdf_id', delete_pdf);
router.get('/get_pdfs', get_pdfs);





module.exports =router;
