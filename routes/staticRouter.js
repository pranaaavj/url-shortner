const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
  if (!req.user) return res.redirect('/login');
  let allUrl = await URL.find({});
  return res.render('home', {
    urls: allUrl,
  });
});

router.get('/', restrictTo(['NORMAL', 'ADMIN']),async (req, res) => {
  if (!req.user) return res.redirect('/login');
  let allUrl = await URL.find({ createdBy: req.user._id });
  return res.render('home', {
    urls: allUrl,
  });
});

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.get('/login', (req, res) => {
  return res.render('login');
});

module.exports = router;
