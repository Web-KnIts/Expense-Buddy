const User = require('../model/user')
const { tokenValidation } = require("../controller/Auth/tokenHandler");

const protect = async(req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({
        status:400,
        message:"Not authorized ,no Token"
    })
        const decoded = tokenValidation(token);
        if(!decoded.status)
        {   
            return res.status(401).json({
                message:decoded.error,
                status:decoded.status,
                payload:decoded.payload
            })
        }
        req.user = await User.findById(decoded.payload.id)
        next();
}

module.exports = protect;