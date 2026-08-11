const Interview = require('../models/Interview');
const Question = require('../models/Question');
const { getIsConnected } = require('../config/db');
const { interviews } = require('../utils/inMemoryStore');

// @desc    Start an interview session
// @route   POST /api/v1/interviews
// @access  Private
exports.createInterview = async (req, res, next) => {
  try {
    const { type } = req.body;
    const userId = req.user?._id || req.user?.id || 'demo-user-id';

    if (!getIsConnected()) {
      const newInterview = {
        _id: 'int-' + Date.now(),
        userId,
        type: type || 'Frontend Developer',
        startedAt: new Date().toISOString(),
        overallScore: 0,
        status: 'In Progress'
      };
      interviews.unshift(newInterview);
      return res.status(201).json({
        success: true,
        data: newInterview,
      });
    }

    const interview = await Interview.create({
      userId,
      type: type || 'General Technical',
    });

    res.status(201).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's interviews
// @route   GET /api/v1/interviews
// @access  Private
exports.getInterviews = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const isDemoAccount = req.user?.email === 'demo@example.com' || userId === 'demo-user-id';

    if (!getIsConnected()) {
      const userInterviews = interviews.filter(i => {
        if (isDemoAccount) return i.userId === 'demo-user-id' || i.userId === userId;
        return i.userId === userId;
      });
      return res.status(200).json({
        success: true,
        count: userInterviews.length,
        data: userInterviews,
      });
    }


    const fetchedInterviews = await Interview.find({ userId }).sort({ startedAt: -1 });

    res.status(200).json({
      success: true,
      count: fetchedInterviews.length,
      data: fetchedInterviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single interview details
// @route   GET /api/v1/interviews/:id
// @access  Private
exports.getInterview = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!getIsConnected()) {
      const interview = interviews.find(i => i._id === id) || interviews[0];
      return res.status(200).json({
        success: true,
        data: interview,
      });
    }

    const interview = await Interview.findOne({ _id: id, userId: req.user.id });

    if (!interview) {
      // Fallback if ID is demo
      const fallbackInt = interviews.find(i => i._id === id) || interviews[0];
      return res.status(200).json({
        success: true,
        data: fallbackInt,
      });
    }

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    // Fallback response instead of 500 error
    const fallbackInt = interviews.find(i => i._id === req.params.id) || interviews[0];
    res.status(200).json({
      success: true,
      data: fallbackInt,
    });
  }
};

// @desc    Complete an interview
// @route   PUT /api/v1/interviews/:id/complete
// @access  Private
exports.completeInterview = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!getIsConnected()) {
      const interview = interviews.find(i => i._id === id);
      if (interview) {
        interview.status = 'Completed';
        interview.completedAt = new Date().toISOString();
        if (!interview.overallScore) interview.overallScore = 8.2;
      }
      return res.status(200).json({
        success: true,
        data: interview || interviews[0],
      });
    }

    const interview = await Interview.findOne({ _id: id, userId: req.user.id });

    if (!interview) {
      const fallbackInt = interviews.find(i => i._id === id);
      if (fallbackInt) {
        fallbackInt.status = 'Completed';
      }
      return res.status(200).json({
        success: true,
        data: fallbackInt || interviews[0],
      });
    }
    
    interview.status = 'Completed';
    interview.completedAt = Date.now();
    await interview.save();

    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    next(error);
  }
};

