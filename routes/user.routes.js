const express = require('express');
const jwt = require('jsonwebtoken');

const { changePassword, updateProfilePicture, updateContactDetails, findByPhonenumber, findUserProfile } = require('../controllers/user.controllers');
const { authVerify } = require('../middlewares/authVerify.middleware');

const userRouter = express.Router();

userRouter.post('/change-password', async (req, res) => {
  try{
   const {email, currentPassword, newPassword} = req.body;
    const user = await changePassword(email, currentPassword, newPassword);
    if(user) {
      res.status(200).json({ message: "Updated password for user.", user: user });
    }
  }catch(error){
    res.status(400).json({ error : "Invalid credentials." });
  }
});

userRouter.post('/update-profile-picture', authVerify, async (req, res) => {
  try{
    const { email, newProfilePicture } = req.body;
    const user = await updateProfilePicture(email, newProfilePicture);
    if(user){
      res.status(200).json({ message: "Updated profile picture.", user: user })
    }
  }catch(error){
    res.status(400).json({ error: "User not found." })
  }
});

userRouter.post('/update-contact/:email', authVerify, async (req, res) => {
  try{
    const user = await updateContactDetails(req.params.email, req.body);
    if(user){
      res.status(200).json({ message: "Updated user contact,", user: user });
    }
  }catch(error){
    res.status(400).json({ error: "User not found." })
  }
})

userRouter.get('/users/phone/:phoneNumber', async (req, res) => {
  try{
    const user = await findByPhonenumber(req.params.phoneNumber);
    res.status(200).json({ message: "User found.", user: user })
  }catch(error){
    res.status(400).json({ error: "Failed to fetch user."})
  }
});

userRouter.get('/user/:userId', authVerify, async (req, res) => {
  try{
    const { userId } = req.params;

    if(userId !== req.user.userId){
      res.status(403).json({ message: "Trying to access unauthorized." })
    }

    const user = await findUserProfile(userId);
    res.status(200).json({ message: "Found profile.", user })
  } catch(error){
    res.status(500).json({ error: "Failed to fetch user." })
  } 
});

module.exports = { userRouter };