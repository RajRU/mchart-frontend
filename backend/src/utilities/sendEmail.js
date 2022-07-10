const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport(config.get('smtp'));
const Logger = require('serverconfig/logger');

const sendEmail = (reciverEmailId, emailData) => {
  const mailOptions = {
    from: config.get('emailId'),
    to: reciverEmailId,
    subject: emailData.subject,
    html: emailData.content,
  };
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      Logger.info('Email send', info);
    })
    .catch((error) => {
      Logger.error(new Error(error));
    });
};
module.exports = {
  sendEmail,
};
