const authServices = require('services/authServices');
const Logger = require('serverconfig/logger');

const verifyEmail = (req, res, next) => {
  authServices
    .verifyEmail(req.body)
    .then((response) => {
      Logger.captureMessage('Exit log : Email verified successfully');
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.captureException(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = verifyEmail;
