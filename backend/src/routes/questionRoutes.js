const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion, getRandomQuestions } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getQuestions)
  .post(protect, createQuestion); // In real app, add admin middleware

router.route('/random')
  .get(protect, getRandomQuestions);

module.exports = router;
