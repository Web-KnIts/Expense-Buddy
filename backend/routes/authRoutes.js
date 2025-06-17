const express = require('express')

// const {} = require('../controller/Auth/index')

const authRouter = express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser)
authRouter.get('/get-user',getUser)

module.exports = authRouter;