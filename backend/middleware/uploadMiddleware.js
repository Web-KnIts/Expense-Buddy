const multer = require('multer');

const storage  = multer.diskStorage({
    destination:(req,files,cb)=>{
        cb(null,'upload/')
    },
    filename:(req,files,cb)=>{
        cb(null,`${Date.now()}-${files.originalname}`)
    },
});

const fileFilter = (req,file,cb)=>{
    const allowedFiles = ['image/jpeg','image/png','image/jpg'];
    console.log(file.mimetype);
    if(allowedFiles.includes(file.mimetype))
    {
        cb(null,true);
    }
    else
    {
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'),false)
    }
}

const upload = multer({storage,fileFilter});

module.exports = upload;