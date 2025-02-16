const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

/*router.get('/', auth, async (req, res) => {
  const tasks = req.user.role === 'admin' ? await Task.find() : await Task.find({ userId: req.user.id });
  res.render('tasks', { tasks, csrfToken: req.csrfToken() });
});*/
/*router.get('/', auth, async (req, res) => {
  const { status, search, sort } = req.query;
  let query = { userId: req.user.id };
  if (req.user.role === 'admin') query = {};
  if (status) query.status = status;
  if (search) query.title = new RegExp(search, 'i');
  let tasks = await Task.find(query).sort(sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 });
  res.render('tasks', { tasks, status, search, sort, csrfToken: req.csrfToken() });
});*/
router.get('/', auth, async (req, res) => {
  const { status, search, sort } = req.query;
  let query = req.user.role === 'admin' ? {} : { userId: req.user.id }; 
  if (status) query.status = status;
  if (search) query.title = new RegExp(search, 'i');
  let tasks = await Task.find(query).sort(sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 });
  res.render('tasks', { tasks, status, search, sort, csrfToken: req.csrfToken() });
});



router.get('/create', auth, (req, res) => res.render('create-task', { csrfToken: req.csrfToken() }));

router.post('/create', auth, async (req, res) => {
  const { title, description } = req.body;
  await new Task({ title, description, userId: req.user.id, createdAt: new Date() }).save();
  res.redirect('/tasks');
});


router.post('/delete/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/tasks');
});

router.put('/update/:id', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description, status });
    res.redirect('/tasks'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при обновлении задачи');
  }
});






module.exports = router;