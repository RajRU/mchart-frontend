/* eslint-disable global-require */
const config = require('config');

const apiVersion = config.get('apiVersion');

module.exports = (app) => {
  app.use(`/${apiVersion}/rarity`, require('./collection'));
  app.use(`/${apiVersion}/auth`, require('./authController'));
  app.use(`/${apiVersion}/student`, require('./studentController'));
};
