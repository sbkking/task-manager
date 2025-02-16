require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const methodOverride = require('method-override');


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(csurf({ cookie: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

/*app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});*/
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
  next();
});

app.use('/', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
