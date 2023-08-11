const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('task', TaskSchema);