const express = require('express');
const registerUser = require('../controller/Auth/registerUser');
const loginUser = require('../controller/Auth/loginUser');
const getUser = require('../controller/Auth/getUser');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const authRouter = express.Router();
authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser)
authRouter.get('/get-user',protect,getUser)
authRouter.post('/upload-image',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({
            message:"No file Uploaded",
            status:400
        })
    }

    const imageUrl =`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({
        imageUrl:imageUrl,
        status:200,
        message:'Image Uploaded Successfully'
    })
})

authRouter.get('/test',(req,res)=>{return res.status(200).json({message:"working ..."})})


module.exports = authRouter;