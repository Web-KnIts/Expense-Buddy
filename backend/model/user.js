const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:[1,'Full name is required'],
        maxLength:[50,'Full name must be at most 50 characters']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate:[validator.isEmail,'Invalid email Found'],
        maxLength:[100,'Email must be at most 100 characters']
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'Password must be at least 8 characters'],
        maxLength:[20,'Password cannot exceed 20 characters'],
        validate:{
            validator:function(value){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/.test(value);
            },
            message:'Password must have atleast 1 UPPERCASE, 1 lowercase , 1 D1G1T and 1 Speci@l Character'
        }
    },
    profileImageUrl:{
        type:String,
        default:null
    },
    isVerified:{
        type:Boolean,
        default:false  
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true}) 

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next(); 
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}

module.exports = mongoose.model('User',userSchema);