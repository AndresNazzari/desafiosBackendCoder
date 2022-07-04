const config = require('./config.js');
const { createTransport } = require('nodemailer');

const TEST_MAIL = 'arthur.cronin41@ethereal.email';

const welcomeMail = async (user) => {
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: TEST_MAIL,
            pass: config.ETHEREAL_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'nuevo registro',
        html: `<h1 style="color: blue;">Nuevo usuario registrado <span style="color: green;"> ${user}</span></h1>`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { welcomeMail };
