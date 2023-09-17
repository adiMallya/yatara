const jwt = require('jsonwebtoken');

const mySecret = process.env['SECRET_KEY']

function verifyToken(token){
  const decoded = jwt.verify(token, mySecret)
  if(decoded){
    return decoded;
  }else{
    return new Error('Invalid token');
  }
}

module.exports = {verifyToken};