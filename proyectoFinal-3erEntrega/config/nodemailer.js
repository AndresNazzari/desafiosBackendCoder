const config = require('./config.js');
const nodemailer = require('nodemailer');
const loggerDefault = require('./logger.js').loggerDefault;

const welcomeMail = async (user) => {
    const transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'gmail',
        port: 587,
        auth: {
            user: config.FROM_EMAIL,
            pass: config.PASS_EMAIL,
        },
    });

    const mailList = [config.TO_EMAIL, user.email];
    mailList.forEach(async (mail) => {
        const mailOptions = {
            from: 'Servidor Node.js',
            to: mail,
            subject: 'nuevo registro',
            html: `<h1 style="color: blue;">Nuevo usuario registrado <span style="color: green;"> ${user}</span></h1>`,
        };

        const info = await transporter.sendMail(mailOptions);
        loggerDefault.info(`Message sent: ${info.messageId} to ${mail}`);
    });
};

module.exports = { welcomeMail };
