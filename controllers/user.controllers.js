const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const signUpUser =  async (userdetail) => {
  try{
    const {username, password} = userdetail;
    
    const user = await User.findOne({ username: username });
    
    if(user){
      throw new Error('User already exists');
    }else{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({...userdetail, password: hashedPassword});
      const savedUser = await user.save();
      return savedUser;      
    }
  }catch(error){
    throw error;
  }
}

const loginUser = async (email, password) => {
  try{
    const userFound = await User.findOne({ email : email });
    if(userFound){
        const passwordMatched = await bcrypt.compare(password, userFound.password);
        if(passwordMatched){
          return userFound;
        }
        else {
          throw new Error('Wrong password.');
        }
    }else {
      throw new Error("Invalid credentials")
    }
  }catch(error){
    throw error;
  }
}

const changePassword = async (email, currentPassword, newPassword) => {
  try{
   const userFound = await User.findOne({ email : email })

    if(userFound && userFound.password === currentPassword){
      userFound.password = newPassword;
      const updatedUser = await userFound.save();
      return updatedUser;
    } else {
      throw new Error('Invalid credentials')
    }
  }catch(error){
    throw error;
  }
}

const updateProfilePicture = async (email, newProfilePicture) => {
  try{
   const userFound = await User.findOne({ email : email })

    if(userFound){
      userFound.profilePicture = newProfilePicture;
      const updatedUser = await userFound.save();
      return updatedUser;
    } else {
      throw new Error('User not found.')
    }
  }catch(error){
    throw error;
  }
}

const updateContactDetails = async(email, newContactDetails) => {
  try{
   const userFound = await User.findOne({ email : email })

    if(userFound){
      Object.assign(userFound, newContactDetails)
      const updatedUser = await userFound.save();
      return updatedUser;
    } else {
      throw new Error('User not found.')
    }
  }catch(error){
    throw error;    
  }
}

const findByPhonenumber = async (phoneNumber) => {
  try{
    const userFound = await User.findOne({ phoneNumber : phoneNumber})
    if(userFound){
      console.log('Found user : \n', userFound);
      return userFound;
    }
    else
      throw new Error('User not found')
  }catch(error){
    throw error;
  }
}

const findUserProfile = async (userId) => {
  try{
    const user = await User.findById(userId);
    if(!user){
      throw new Error('User not found');
    }

    const profile = {
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      profilePicture: user.profilePicture,
      phoneNo: user.phoneNumber
    }

    return profile;
  }catch(error){
    throw error;
  }
}

module.exports = { signUpUser, loginUser, changePassword, updateProfilePicture, updateContactDetails, findByPhonenumber, findUserProfile };