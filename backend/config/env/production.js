module.exports = {
  port: process.env.PORT || 3030,
  apiVersion: 'v1',
  dbConfig: {
    connectionString:
      'mongodb+srv://root:root@cluster0.bb21w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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
