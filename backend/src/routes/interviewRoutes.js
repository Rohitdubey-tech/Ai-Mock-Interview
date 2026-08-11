const express = require('express');
const router = express.Router();
const { createInterview, getInterviews, getInterview, completeInterview } = require('../controllers/interviewController');
const { submitAnswer, getAnswers } = require('../controllers/answerController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
  .post(protect, createInterview)
  .get(protect, getInterviews);

router.route('/:id')
  .get(protect, getInterview);

router.route('/:id/answers')
  .post(protect, upload.single('audio'), submitAnswer)
  .get(protect, getAnswers);

router.route('/:id/complete')
  .put(protect, completeInterview);

module.exports = router;
