const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add question text'],
  },
  type: {
    type: String,
    enum: ['DSA', 'HR', 'System Design', 'Custom'],
    required: [true, 'Please select a question type'],
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  tags: {
    type: [String],
    default: [], // e.g. ['arrays', 'behavioral', 'architecture']
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
