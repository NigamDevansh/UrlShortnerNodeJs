//for token =>
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function setUser(user) {
  return jwt.sign({

    _id: user._id,
    email: user.email,

  }, secret);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    console.log(error);
  }
  
}

// for session=>
// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

module.exports = {
  setUser,
  getUser,
};