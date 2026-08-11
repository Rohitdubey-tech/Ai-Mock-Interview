const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['DSA', 'HR', 'System Design', 'Custom'],
    required: true,
  },
  status: {
    type: String,
    enum: ['In-Progress', 'Completed'],
    default: 'In-Progress',
  },
  overallScore: {
    type: Number,
    default: null, // Out of 10
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
