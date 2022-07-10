const config = require('config');

const paymentConfirmationTemplate = (user, packageName) => {
  return ({
    subject: 'Coinstox payment confirmation',
    content: `
    <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Welcome to Coinstox</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;1,200&family=Poppins:ital,wght@0,200;0,300;1,200&family=Quicksand:wght@300;400;500&display=swap"
        rel="stylesheet">
      <style>
        body {
          background-color: #FFFFFF;
          padding: 0;
          margin: 0;
        }
        .font-family-quicksand {
          font-family: 'Quicksand', sans-serif;
        }
        .font-family-poppins {
          font-family: 'Poppins', sans-serif;
        }
        .font-family-nunito {
          font-family: 'Nunito', sans-serif;
        }
        .title-font-style {
          font-size: 25px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.64;
          letter-spacing: normal;
          color: #252122;
          font-family: 'Quicksand', sans-serif;
        }
        .description-font-style {
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.75;
          letter-spacing: normal;
          color: #9b9bab;
          margin: 25.1px 0 0;
        }
        .handle-class{
          background-image: url(${config.get('clientEndpoint')}/assets/email-template-images/background-handle.png);
          background-repeat: no-repeat;
          background-position: top;
          background-size: contain;
          padding-top:25px;
        }
        .footer-class {
          padding: 26px 0 0 0.5px;
          background-color: #202b5d;
          text-align: center;
          margin-top: 10px;
        }
        .social-icons {
          width: 348px;
          margin: 20px auto;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .social-icons .social-icon-link{
          margin-right: 50px;
        }
        .copy-right-wrapper {
          border-top: solid 1px #515151;
          font-size: 12px;
          font-weight: 300;
          font-stretch: normal;
          font-style: normal;
          line-height: 2.93;
          letter-spacing: normal;
          text-align: center;
          color: #9b9b9b;
          padding: 10px;
        }
      </style>
    </head>
    <body style="padding: 0 20px;background: rgb(236,236,236);margin: auto;">
      <div class='handle-class' style="background-color: #fff;max-width: 612px;margin: auto;">
        <div style="padding:10px;text-align: center;">
          <img style='width:233px' src='${config.get('clientEndpoint')}/assets/email-template-images/logo.png' />
        </div>
        <div style='width:505px;height:0;border: solid 1px #e9e9e9;margin: 20px auto;'></div>
        <div style='text-align: center;padding: 0 50px;' class="font-family-quicksand">
          <img src='${config.get('clientEndpoint')}/assets/email-template-images/email-icon.png' />
          <div style='text-align: center;' class="title-font-style">Hi, ${user.firstName},</div>
          <div style='text-align: center;' class="description-font-style">Thank you for buying ${packageName} package. Payment has been received successfully. 
          Tokens transfer may take some time and you can get status for it from Coinstox website
          <a href="${config.get('clientEndpoint')}/dashboard">Dashboard</a>. </div>
          <div style='text-align: center;' class="description-font-style">If the link does not work, please copy the URL into the browser bar :</div>
          <div style='text-align: center;' class="description-font-style">${config.get('clientEndpoint')}/dashboard</div>
          <br/>
          <div style='text-align: center;' class="description-font-style"><b>Please connect to MetaMask to receive CSX Tokens. You can find  option to connect to MetaMask on Dashboard Page.
          <br/>Please refer <a href="${config.get('clientEndpoint')}/faq">FAQ</a>. page for more information on how to connect MetaMask.</b></div>

          <div style='text-align: start;' class="description-font-style">Thank You!</div>
          <div style='text-align: start;' class="description-font-style"">Coinstox Team</div>
        </div>
        <div class="footer-class">
          <img style='width:235px' src='${config.get('clientEndpoint')}/assets/email-template-images/footer-logo.png' />
          <div class="social-icons">
            <a class='social-icon-link'  href='https://www.facebook.com/Coinstoxio-102560158301307' target="_black">
              <img src='${config.get('clientEndpoint')}/assets/email-template-images/facebook.png' />
            </a>
            <a class='social-icon-link'  href='https://twitter.com/the_coinstox' target="_black">
              <img src='${config.get('clientEndpoint')}/assets/email-template-images/twitter.png' />
            </a>
            <a class='social-icon-link' href='https://www.instagram.com/coinstox.io' target="_black">
              <img src='${config.get('clientEndpoint')}/assets/email-template-images/instagram.png' />
            </a>
            <a class='social-icon-link' href='https://linkedin.com/company/coinstox-io' target="_black">
              <img src='${config.get('clientEndpoint')}/assets/email-template-images/linkedin.png' />
            </a>
            <a style="margin: 0" class='social-icon-link' href='https://t.me/coinstox' target="_black">
              <img src='${config.get('clientEndpoint')}/assets/email-template-images/telegram.png' />
            </a>
          </div>
          <div class="copy-right-wrapper font-family-nunito">
            © Copyright ${new Date().getFullYear()}-${new Date().getFullYear() + 1} Coinstox
          </div>
        </div>
      </div>
    </body>
    </html>`
  })
}

module.exports = { paymentConfirmationTemplate };

