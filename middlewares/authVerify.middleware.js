const { verifyToken } = require('../utils/verifyToken');
const { getUserIdFromToken } = require('../utils/getUserIdFromToken');

function authVerify(req, res, next) {
  const token = req.headers.authorization;

  try{
    const decoded = verifyToken(token);
    const userId = getUserIdFromToken(decoded);
    req.user = {userId};
    next();
  }catch(error){
    return res.status(401).json({ message: "Unauthorized access, please add valid token."})
  }
}

module.exports = { authVerify };