const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.render('index'); 
});


router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('User with this email already exists');
  }
  const user = new User({ name, email, password, role });
  await user.save();
  res.redirect('/login');
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.redirect('/login');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }).redirect('/tasks');
});

router.get('/logout', (req, res) => {
  res.clearCookie('token').redirect('/login');
});

module.exports = router;