const authServices = require('services/authServices');
const Logger = require('serverconfig/logger');

const getProfile = (req, res, next) => {
  authServices
    .getProfile(req.id)
    .then((response) => {
      Logger.info('Exit log : Email verified successfully');
      res.status(200).json(response);
    })
    .catch((error) => {
      Logger.error(new Error(`Exit log : ${error}`));
      next(error);
    });
};

module.exports = getProfile;
