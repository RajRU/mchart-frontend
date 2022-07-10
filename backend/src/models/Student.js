const { Schema, model } = require('mongoose');
// const { PACKAGE } = require('./Enum');

const Student = new Schema(
  {
    studentID: {
      type: String,
    },
    classIDs: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('Student', Student);
