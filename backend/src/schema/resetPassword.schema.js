const Joi = require('@hapi/joi');
const { combineValidationMessages, generalMinLengthMessage } = require('utilities/validation');
const { MANDATORY_FIELD_RULE } = require('utilities/constants');

const resetPasswordSchema = {
  body: Joi.object().keys({
    password: Joi.string()
      .required()
      .min(7)
      .messages({
        ...combineValidationMessages(MANDATORY_FIELD_RULE, "Please enter a password"),
        ...generalMinLengthMessage("string.min", 7, "password"),
      }),
    id: Joi.string(),
    token: Joi.string(),
    iat: Joi.number()
  })
};

module.exports = resetPasswordSchema;