const multer = require('multer');
const fs = require('fs')
const path = require('path');
const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"./uploads/");
    },
    filename:(req,file,cb)=>{
        const suffix=Date.now();
        cb(null,suffix+'-'+file.originalname);
    }
})
const upload=multer({storage});
module.exports={upload};