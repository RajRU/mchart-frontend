const Joi = require('@hapi/joi');
const {
  combineValidationMessages,
  generalMinLengthMessage,
} = require('utilities/validation');
const { MANDATORY_FIELD_RULE } = require('utilities/constants');

const changePasswordSchema = {
  body: Joi.object().keys({
    oldPassword: Joi.string()
      .required()
      .min(7)
      .messages({
        ...combineValidationMessages(
          MANDATORY_FIELD_RULE,
          'Please enter oldPassword',
        ),
        ...generalMinLengthMessage('string.min', 7, 'oldPassword'),
      }),
    newPassword: Joi.string()
      .required()
      .min(7)
      .messages({
        ...combineValidationMessages(
          MANDATORY_FIELD_RULE,
          'Please enter newPassword',
        ),
        ...generalMinLengthMessage('string.min', 7, 'newPassword'),
      }),
  }),
};

module.exports = changePasswordSchema;
