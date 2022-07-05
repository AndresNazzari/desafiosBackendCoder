const config = require('../config/config.js');
const twilio = require('twilio');

const sendWA = async (user, cart) => {
    const client = twilio(config.TWILIO_SID, config.TWILIO_TOKEN);

    const numbers = [config.TWILIO_PHONE, user.telefono];
    //numbers es igual a [ ' +1 864 668 3602','+541167413192' ]

    //lo comento ya que no me funciona debido a que le di a release al numero de twilio y para poner uno nuevo me cobran
    // numbers.forEach(async (number) => {
    //     const message = await client.messages.create({
    //         body: `Nueva compra de ${user.nombre}, con los siguientes items ${cart}`,
    //         from: `whatsapp:${config.TWILIO_PHONE}`,
    //         to: `whatsapp:${number}`,
    //     });
    //     console.log(message.sid);
    // });
};

module.exports = { sendWA };
