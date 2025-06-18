const mongoose = require('mongoose')
const User = require('../../model/user');
const { generateToken } = require('./tokenHandler');

// steps :-
/* (Testing Pending)
1. extract data from req body
2. validate data before passing it into mongoSchema (basic validation)
3. check the user is new or not ?
4. create User entry into database
5. do verificaiton (optional)
6. return appropriate response
*/

const validateData = (validationData)=>{
    let validation = true;
    validationData.forEach((val)=>{
        if(!val)
        {
            validation=false;
        }
    })
    return validation;
}

const registerUser = async(req,res)=>{
    try{
        const {fullname,email,password,profileImageUrl} = req.body;
        if(!validateData([fullname,email,password]))
        {
            return res.status(400).json({
                message:"All fields are Required",
                status:400,
            })
        }
        const isUserAlreadyExists = await User.findOne({email});
        if(isUserAlreadyExists){
            return res.status(400).json({
                message:"User already Exists with this Email",
                status:400,
            })
        }
        const createUser = await User.create({
            fullname,email,password,profileImageUrl
        })
        
        return res.status(201).json({
            status:200,
            message:"User created successfully",
            id:createUser._id,
            user:createUser,
            token:generateToken(createUser._id)
        })
    }
    catch(err)
    {
        return res.status(500).json({
            status:500,
            message:"Error registering User",
            error:err.message,
            originalError:err
        })
    }
}

module.exports = registerUser;