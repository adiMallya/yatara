const express = require('express');
const jwt = require('jsonwebtoken');

const { signUpUser, loginUser } = require('../controllers/user.controllers');

const authRouter = express.Router();

const mySecret = process.env['SECRET_KEY']

authRouter.post('/signup', async (req, res) => {
  try{
    const savedUser = await signUpUser(req.body);
    res.status(201).json({ message: "User created.", user: savedUser, token: "abcdefghi"});
  }catch(error){
    res.status(400).json({ error: error.message })
  }
});

authRouter.get('/login', async (req, res) => {
  try{
    const {email, password} = req.body;
    const user = await loginUser(email, password);
    if(user){
      const token = jwt.sign({ userId: user._id }, mySecret, { expiresIn: '24h'})
      res.status(200).json({ message: "Login sucessfull.", user: user.username, token });
    }
  }catch(error){
    res.status(400).json({ error : error.message });
  }
});

module.exports = { authRouter };