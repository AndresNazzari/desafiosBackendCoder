const config = require('./config.js');
const { createTransport } = require('nodemailer');

const welcomeMail = async (user) => {
    const transporter = createTransport({
        // host: 'smtp.ethereal.email',
        service: 'gmail',
        port: 587,
        auth: {
            user: config.FROM_EMAIL,
            pass: config.PASS_EMAIL,
        },
    });
    const TEST_EMAIL = 'arthur.cronin41@ethereal.email';
    const mailList = [config.TO_EMAIL, user.email, TEST_EMAIL];
    mailList.forEach(async (mail) => {
        const mailOptions = {
            from: 'Servidor Node.js',
            to: mail,
            subject: 'nuevo registro',
            html: `<h1 style="color: blue;">Nuevo usuario registrado <span style="color: green;"> ${user}</span></h1>`,
        };

        await transporter.sendMail(mailOptions);
    });
};

module.exports = { welcomeMail };
