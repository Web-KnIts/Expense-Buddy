const jwt = require('jsonwebtoken');

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1hr'})
}

const tokenValidation = (token) =>{
   try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     if(decoded) {
        return {
         status:true,
         payload:decoded,
         error:undefined,
        }
     }
    return {
         status:false,
         payload:decoded,
         error:"Faild to validate token",
        }
   }
   catch(err){
    return {
      status:false,
      payload:decoded,
      error:error.message
    };
   }
}

module.exports = {generateToken,tokenValidation};