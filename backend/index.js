require('dotenv').config();

const express = require('express')
const cors = require('cors')
const path = require('path');
const { connectDatabase } = require('./config/db');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL || "*",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization']
}))

app.use(express.json());
app.use('/api/v1/auth/',authRouter)
const PORT = process.env.PORT || 5000;

connectDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port : ${PORT}`)
    })
});
