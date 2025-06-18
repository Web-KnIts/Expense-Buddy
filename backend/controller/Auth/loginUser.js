const User = require('../../model/user');
const { generateToken } = require('./tokenHandler');

// steps :-
/* (Testing Pending)
1. extract data from req body;
2. validate data
3. check if user exists
4. valdiate password
5. handle responses appropriately
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

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!validateData([email,password]))
        {
            return res.status(400).json({
                message:"All fields are Required",
                status:400,
            })
        }
        const isUserAlreadyExists = await User.findOne({email});
        if(!isUserAlreadyExists){
            return res.status(400).json({
                message:"User does not exists with this Email",
                status:400,
            })
        }
        if(!(await isUserAlreadyExists.comparePassword(password)))
        {
            return res.status(400).json({
                message:"Password is incorrect",
                status:400,
            })
        }
        return res.status(201).json({
            status:200,
            message:'user logged in successfully',
            id:isUserAlreadyExists._id,
            user:isUserAlreadyExists,
            token:generateToken(isUserAlreadyExists._id)
        })
    }
    catch(err)
    {
        return res.status(500).json({
            status:500,
            message:"Error while Logging User in",
            error:err.message,
            originalError:err
        })
    }
}

module.exports = loginUser;