const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model.js');
const loggerWarn = require('../config/logger.js').loggerWarn;
const loggerDefault = require('../config/logger.js').loggerDefault;

passport.use(
    new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ email: username });

        if (!user) {
            //console.log('Usuario no encontrado');
            loggerWarn.warn('Usuario no encontrado');
            return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            //console.log('Contraseña INCORRECTA');
            loggerWarn.warn('Contraseña INCORRECTA');
            return done(null, false);
        }
        loggerDefault.info('usuario encontrado');

        return done(null, user);
    })
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});
passport.deserializeUser(async (email, done) => {
    const user = await User.findOne({ email });
    done(null, user);
});

module.exports = passport;
