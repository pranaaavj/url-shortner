const jwt = require('jsonwebtoken');
const secretKey = 'verySecret&123';
// const sessionIdToUserMap = new Map();

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;

  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
