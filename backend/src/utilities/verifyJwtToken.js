const jwt = require('jsonwebtoken');
const config = require('config');
const Logger = require('serverconfig/logger');
const {
  ForbiddenException,
  BadRequestException,
} = require('./exceptions');

const verifyToken = (req, res, next) => {
  if (!req.body.token) {
    throw new BadRequestException('Please provide token');
  } else {
    const { token } = req.body;
    jwt.verify(token, config.get('tokenSecretKey'), (error, data) => {
      if (error) {
        Logger.error(new Error(error));
        throw new ForbiddenException('Invalid token');
      } else {
        req.body = { ...req.body, ...data };
        next();
      }
    });
  }
};

const verifyAdminToken = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new BadRequestException('Please provide token');
  } else {
    const token = req.headers.authorization;
    jwt.verify(
      token,
      config.get('adminLoginSecret'),
      (error, data) => {
        if (error) {
          Logger.error(new Error(error));
          throw new ForbiddenException('Invalid token');
        } else {
          req.id = data.id;
          next();
        }
      },
    );
  }
};

const verifyUserToken = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new BadRequestException('Please provide token');
  } else {
    const token = req.headers.authorization;
    jwt.verify(
      token,
      config.get('userLoginSecret'),
      (error, userData) => {
        let userId = userData && userData.id;
        if (error) {
          jwt.verify(
            token,
            config.get('adminLoginSecret'),
            (adminError, adminData) => {
              if (adminError) {
                Logger.error(new Error(error));
                throw new ForbiddenException('Invalid token');
              }
              userId = adminData && adminData.id;
            },
          );
        }
        req.id = userId;
        next();
      },
    );
  }
};

// const verifyStripeToken = (req, res, next) => {
//   const sig = req.headers['stripe-signature'];
//   const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
//   try {
//     const event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       sig,
//       endpointSecret,
//     );
//     req.body = event;
//     next();
//   } catch (error) {
//     Sentry.captureException(new Error(error));
//     throw new ForbiddenException('Invalid token');
//   }
// };

module.exports = {
  verifyToken,
  verifyAdminToken,
  verifyUserToken,
};
