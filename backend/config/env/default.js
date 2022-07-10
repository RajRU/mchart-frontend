module.exports = {
  port: process.env.PORT,
  apiVersion: 'v1',
  dbConfig: {
    connectionString: `${process.env.mongoURI}/${process.env.mongoDBName}`, // 'mongodb://127.0.0.1:27017/maiChart'
  },
  logLevel: 'debug',
  adminLoginSecret: process.env.ADMIN_LOGIN_SECRET,
  smtp: {
    host: 'smtp.ionos.de',
    port: 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  emailId: process.env.SMTP_USER,
  sendEmailNotification: false,
  userLoginSecret: process.env.USER_LOGIN_SECRET,
  artistLoginSecret: process.env.ARTIST_LOGIN_SECRET,
};
