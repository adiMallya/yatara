function getUserIdFromToken(decodedToken){
  if(decodedToken && decodedToken.userId){
    return decodedToken.userId
  }else{
    throw new Error('Invalid or missing userId in token.')
  }
}

module.exports = {getUserIdFromToken};