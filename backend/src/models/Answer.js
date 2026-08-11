const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  audioUrl: {
    type: String, // Can be null if it was text input
  },
  transcript: {
    type: String,
    required: [true, 'Please provide the answer text or transcript'],
  },
  metrics: {
    clarityScore: { type: Number, default: 0 },
    relevanceScore: { type: Number, default: 0 },
    confidenceScore: { type: Number, default: 0 },
    overallScore: { type: Number, default: 0 },
  },
  aiFeedback: {
    type: String,
  },
  improvedAnswer: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);
