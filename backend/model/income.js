const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    icon:{ 
        type:String
    },
    source:{
        type:String,
        trim:true,
        required:true,
        minLength:[3,'minimum 3 character are needed'],
        maxLength:[50,'maximum 50 character are allowed']
    },
    amount:{
        type:Number,
        required:true,
        set: v => Math.round(v * 100) / 100,
        get: v => v.toFixed(2)
    },
    date:{
        type:Date,
        default:Date.now(),
    }
},{timestamps:true});


module.exports = mongoose.model('Income',incomeSchema);