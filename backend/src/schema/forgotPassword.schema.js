const Joi = require('@hapi/joi');
const { combineValidationMessages } = require('utilities/validation');
const { MANDATORY_FIELD_RULE, EMAIL_REGEX } = require('utilities/constants');

const forgotPasswordSchema = {
  body: Joi.object().keys({
    email: Joi.string()
      .pattern(EMAIL_REGEX)
      .required()
      .messages({
        ...combineValidationMessages(MANDATORY_FIELD_RULE, "Please enter a email"),
        "string.pattern.base": "Please enter a valid email"
      })
  })
};

module.exports = forgotPasswordSchema;