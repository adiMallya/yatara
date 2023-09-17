const mongoose = require('mongoose');

const user = mongoose.Schema({
  email : {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password : {
    type: String,
    required: true,
    minlength: 5
  },
  profilePicture : { type: String },
  username : { type: String, trim: true, unique: true },
  nickname : { type: String, trim: true },
  phoneNumber : { type: Number, length: 10}
}, { timestamps : true })

const User = mongoose.model('User', user);

module.exports = User;