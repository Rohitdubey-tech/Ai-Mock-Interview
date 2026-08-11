const Answer = require('../models/Answer');
const Interview = require('../models/Interview');
const Question = require('../models/Question');
const { transcribeAudio, evaluateAnswer } = require('../services/aiService');
const { getIsConnected } = require('../config/db');
const { answers, questions, interviews } = require('../utils/inMemoryStore');

exports.submitAnswer = async (req, res, next) => {
  try {
    const interviewId = req.params.id;
    const { questionId, textAnswer } = req.body; 

    let questionText = 'General Technical Question';
    let targetQuestionId = questionId;

    if (getIsConnected()) {
      try {
        const questionObj = await Question.findById(questionId);
        if (questionObj) questionText = questionObj.text;
      } catch (err) {
        console.warn('Could not find question in DB, using fallback query text');
      }
    }

    if (questionText === 'General Technical Question') {
      const fallbackQ = questions.find(q => q._id === questionId);
      if (fallbackQ) questionText = fallbackQ.text;
    }

    let transcript = textAnswer || '';
    let audioUrl = null;

    if (req.file) {
      audioUrl = req.file.path; 
      if (!transcript) {
        transcript = await transcribeAudio(req.file.path);
      }
    }

    if (!transcript) {
      transcript = 'Candidate provided an unrecorded response for evaluation.';
    }

    const evaluation = await evaluateAnswer(questionText, transcript);

    const answerData = {
      _id: 'ans-' + Date.now(),
      interviewId,
      questionId: targetQuestionId,
      audioUrl,
      transcript,
      metrics: {
        clarityScore: evaluation.clarityScore,
        relevanceScore: evaluation.relevanceScore,
        confidenceScore: evaluation.confidenceScore,
        overallScore: evaluation.overallScore,
      },
      aiFeedback: evaluation.aiFeedback,
      improvedAnswer: evaluation.improvedAnswer,
    };

    if (getIsConnected()) {
      try {
        const answerObj = await Answer.create({
          interviewId,
          questionId: targetQuestionId,
          audioUrl,
          transcript,
          metrics: answerData.metrics,
          aiFeedback: answerData.aiFeedback,
          improvedAnswer: answerData.improvedAnswer,
        });

        // Update overall score on interview if possible
        const allAns = await Answer.find({ interviewId });
        if (allAns.length > 0) {
          const avgScore = allAns.reduce((sum, a) => sum + (a.metrics?.overallScore || 0), 0) / allAns.length;
          await Interview.findByIdAndUpdate(interviewId, { overallScore: parseFloat(avgScore.toFixed(1)) });
        }

        return res.status(201).json({
          success: true,
          data: answerObj,
        });
      } catch (err) {
        console.warn('DB answer saving failed, falling back to memory store');
      }
    }

    answers.push(answerData);

    // Update in-memory interview overallScore
    const intObj = interviews.find(i => i._id === interviewId);
    if (intObj) {
      const userAnswers = answers.filter(a => a.interviewId === interviewId);
      const avgScore = userAnswers.reduce((sum, a) => sum + (a.metrics?.overallScore || 0), 0) / userAnswers.length;
      intObj.overallScore = parseFloat(avgScore.toFixed(1));
    }

    res.status(201).json({
      success: true,
      data: answerData,
    });

  } catch (error) {
    next(error);
  }
};

exports.getAnswers = async (req, res, next) => {
  try {
    const interviewId = req.params.id;

    if (!getIsConnected()) {
      const filtered = answers.filter(a => a.interviewId === interviewId);
      // Map question object onto answer for frontend UI
      const populated = filtered.map(a => {
        const qObj = questions.find(q => q._id === a.questionId) || { text: 'Technical Interview Question' };
        return { ...a, questionId: qObj };
      });
      return res.status(200).json({
        success: true,
        count: populated.length,
        data: populated,
      });
    }

    const fetchedAnswers = await Answer.find({ interviewId }).populate('questionId');
    res.status(200).json({
      success: true,
      count: fetchedAnswers.length,
      data: fetchedAnswers,
    });
  } catch (error) {
    const filtered = answers.filter(a => a.interviewId === req.params.id);
    const populated = filtered.map(a => {
      const qObj = questions.find(q => q._id === a.questionId) || { text: 'Technical Interview Question' };
      return { ...a, questionId: qObj };
    });
    res.status(200).json({
      success: true,
      count: populated.length,
      data: populated,
    });
  }
};

