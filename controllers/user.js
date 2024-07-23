const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { getUser, setUser } = require('../service/auth');

async function handlerUserSignUp(req, res) {
  let { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect('/');
}
async function handlerUserLoginIn(req, res) {
  let { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render('login', {
      error: 'Invalid Username or Password',
    });
  }

  const token = setUser(user);
  // res.cookie('uid', token);

  return res.json({ token });
}

module.exports = {
  handlerUserSignUp,
  handlerUserLoginIn,
};
