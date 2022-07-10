const authServices = require('services/authServices');
const Logger = require('serverconfig/logger');

const registerUser = (req, res, next) => {
  authServices
    .registerUser(req.body, req?.files?.kycDoc)
    .then((response) => {
      Logger.info('Exit log : User registered successfully');
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.error(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = registerUser;
