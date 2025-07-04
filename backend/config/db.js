
const mongoose = require('mongoose');

const connectDatabase = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (err) {
        console.log("Error connecting to mongoDB",err);
        process.exit(1);
    }
}

module.exports =  {connectDatabase}