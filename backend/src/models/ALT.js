const { Schema, model } = require('mongoose');
// const { PACKAGE } = require('./Enum');

const ALT = new Schema(
  {
    studentID: {
      type: String,
    },
    classID: {
      type: String,
    },
    subject: {
      type: String,
    },
    correctAnswers: {
      type: Number,
    },
    totalAnswers: {
      type: Number,
    },
    correctAdaptive: {
      type: Number,
    },
    totalAdaptiveAnswers: {
      type: Number,
    },
    totalAdaptiveExercises: {
      type: Number,
    },
    totalExercises: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = model('ALT', ALT);
