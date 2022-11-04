const config = require('./config.js');
const nodemailer = require('nodemailer');
const loggerDefault = require('./logger.js').loggerDefault;

const sendEMail = async (user, welcome, cart) => {
  const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'gmail',
    port: 587,
    auth: {
      user: config.FROM_EMAIL,
      pass: config.PASS_EMAIL,
    },
  });

  const mailList = [config.TO_EMAIL, user.email || user];
  let mailOptions;

  mailList.forEach(async (mail) => {
    if (welcome) {
      mailOptions = {
        from: 'Servidor Node.js',
        to: mail,
        subject: 'nuevo registro',
        html: `<h1 style="color: blue;">Nuevo usuario registrado <span style="color: green;"> ${user}</span></h1>`,
      };
    } else {
      mailOptions = {
        from: 'Servidor Node.js',
        to: mail,
        subject: 'nueva compra',
        html: `<h1 style="color: blue;">Nuevo usuario registrado <span style="color: green;"> ${user}</span></h1>
            Ha comprado: ${cart}`,
      };
    }

    const info = await transporter.sendMail(mailOptions);
    loggerDefault.info(`Message sent: ${info.messageId} to ${mail}`);
  });
};

module.exports = { sendEMail };
