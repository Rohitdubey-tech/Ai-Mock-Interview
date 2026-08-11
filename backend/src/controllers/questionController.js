const Question = require('../models/Question');
const { getIsConnected } = require('../config/db');
const { questions } = require('../utils/inMemoryStore');

// @desc    Get all questions (with optional filters)
// @route   GET /api/v1/questions
// @access  Private
exports.getQuestions = async (req, res, next) => {
  try {
    const { type, difficulty, tags } = req.query;

    if (!getIsConnected()) {
      let filtered = [...questions];
      if (type) filtered = filtered.filter(q => q.type.toLowerCase() === type.toLowerCase());
      if (difficulty) filtered = filtered.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered,
      });
    }

    const query = {};
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (tags) query.tags = { $in: tags.split(',') };

    const fetchedQuestions = await Question.find(query);

    res.status(200).json({
      success: true,
      count: fetchedQuestions.length,
      data: fetchedQuestions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new question
// @route   POST /api/v1/questions
// @access  Admin
exports.createQuestion = async (req, res, next) => {
  try {
    if (!getIsConnected()) {
      const newQ = { _id: 'q-' + Date.now(), ...req.body };
      questions.push(newQ);
      return res.status(201).json({ success: true, data: newQ });
    }

    const question = await Question.create(req.body);
    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get random questions for an interview
// @route   GET /api/v1/questions/random
// @access  Private
exports.getRandomQuestions = async (req, res, next) => {
  try {
    const { type, limit = 5 } = req.query;
    const countLimit = parseInt(limit);

    if (!getIsConnected()) {
      let filtered = questions;
      if (type) {
        filtered = questions.filter(q => q.type.toLowerCase().includes(type.toLowerCase()) || type.toLowerCase().includes(q.type.toLowerCase()));
      }
      if (filtered.length === 0) filtered = questions;
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, countLimit);
      return res.status(200).json({
        success: true,
        data: selected,
      });
    }

    const query = type ? { type: new RegExp(type, 'i') } : {};
    
    let dbQuestions = await Question.aggregate([
      { $match: query },
      { $sample: { size: countLimit } }
    ]);

    if (!dbQuestions || dbQuestions.length === 0) {
      let filtered = questions;
      if (type) {
        filtered = questions.filter(q => q.type.toLowerCase().includes(type.toLowerCase()) || type.toLowerCase().includes(q.type.toLowerCase()));
      }
      if (filtered.length === 0) filtered = questions;
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      dbQuestions = shuffled.slice(0, countLimit);
    }

    res.status(200).json({
      success: true,
      data: dbQuestions,
    });
  } catch (error) {
    // Return standard fallback questions on error
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    res.status(200).json({
      success: true,
      data: shuffled.slice(0, parseInt(req.query.limit || 5)),
    });
  }
};

