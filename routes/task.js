const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Task = require('../models/Task');

// @route     GET api/task
// @desc      Get all task
// @access    Public
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ $natural: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/task/:id
// @desc      Get single task
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({msg: 'Task not found'});
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/task
// @desc      Add new task
// @access    Public
router.post(
  '/',
  [
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('completed', 'Completion Status is required')
      .not()
      .isEmpty(),
      check('dueDate', 'Due Date is required')
      .not()
      .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const { title, description, completed, dueDate } = req.body;
    try {
      const newTask = new Task({ title, description, completed, dueDate });
      const task = await newTask.save();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/task/:id
// @desc      Update task
// @access    Public
router.put('/:id', async (req, res) => {
  const { title, description, completed, dueDate } = req.body;
  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (completed !== undefined) taskFields.completed = completed;
  if (dueDate) taskFields.dueDate = dueDate;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({msg: 'Task not found'});
    task = await Task.findByIdAndUpdate(
      req.params.id,
      {$set: taskFields},
      {new: true},
    );
    res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/task/:id
// @desc      Delete task
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({msg: 'Task not found'});
    await Task.findByIdAndRemove(req.params.id);
    res.status(202).json({msg: 'Task removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;