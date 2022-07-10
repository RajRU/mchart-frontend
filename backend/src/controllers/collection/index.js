const express = require('express');

const router = express.Router();

const validateRequest = require('utilities/validateRequest');
const addCollectionSchema = require('schema/addCollection.schema');
const addCollection = require('./addCollection.controller');

router
  .route('/collection')
  .post(validateRequest(addCollectionSchema), addCollection);

module.exports = router;
