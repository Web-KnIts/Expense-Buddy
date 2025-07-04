const User = require('../../model/user');

const getUser = async(req,res)=>{
    try{
        const userInformation = await User.findById(req.user.id).select('-password');
        if(!userInformation)
        {
            return res.status(404).json({
                message:"User not found",
                // status:"success"
            })
        }
        return res.status(200).json({
            message:'user details fetched successfully',
            user:userInformation,
            id:req.user.id,
            // status:"success"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            // status:"danger",
            message:"Error while fetching user information",
            error:err.message,
            originalError:err
        })
    }
}

module.exports = getUser;