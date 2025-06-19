require('dotenv').config();

const express = require('express')
const cors = require('cors')
const path = require('path');
const { connectDatabase } = require('./config/db');
const authRouter = require('./routes/authRoutes');
const incomeRouter = require('./routes/incomeRoutes');
const expenseRouter = require('./routes/expenseRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');

const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition']
}));

app.use(express.json());
app.use('/api/v1/auth/',authRouter)
app.use('/api/v1/income/',incomeRouter)
app.use('/api/v1/expense/',expenseRouter)
app.use('/api/v1/dashboard/',dashboardRouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const PORT = process.env.PORT || 5000;
connectDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port : ${PORT}`)
    })
});
