const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User.model.js');
const uploadAvatar = require('../../middleware/multer.middleware.js');
const loggerWarn = require('../../config/logger.js').loggerWarn;
const sendEMail = require('../../config/nodemailer.js').sendEMail;

router.get('/', (req, res) => {
    res.render('register');
});

router.get('/error', (req, res) => {
    res.render('register-error');
});

router.post('/', uploadAvatar, async (req, res) => {
    const { nombre, direccion, edad, telefono, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            res.redirect('/register/error');
        } else {
            user = new User({
                nombre,
                direccion,
                edad,
                telefono,
                email,
                password,
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            //Enviar email de bienvenida
            await sendEMail(user, true);

            res.redirect('/');
        }
    } catch (error) {
        loggerWarn.warn(error.message);
        res.redirect('/register/error');
    }
});

module.exports = router;
