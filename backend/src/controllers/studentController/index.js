const express = require('express');

const router = express.Router();

// const validateRequest = require('utilities/validateRequest');
const getAllStudents = require('./getAllStudents.controller');
const getAllClass = require('./getAllClass.controller');
const getScore = require('./getScore.controller');

router.route('/all-student').get(getAllStudents);
router.route('/all-classes').get(getAllClass);
router.route('/score').get(getScore);

module.exports = router;
