const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email : {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password : {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6
  },
}, { timestamps : true })

const User = mongoose.model('User', UserSchema);

module.exports = User;