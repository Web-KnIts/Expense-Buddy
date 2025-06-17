const jwt = require('jsonwebtoken');

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1hr'})
}

const tokenValidation = (token) =>{
   try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     if(decoded){
        return true;
     }
     else{
        false
     }
   }
   catch(err){
    return false;
   }
}

module.exports = {generateToken,tokenValidation};