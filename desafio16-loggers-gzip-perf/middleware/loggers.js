const loggerDefault = require('../config/logger.js').loggerDefault;
const loggerWarn = require('../config/logger.js').loggerWarn;
const loggerError = require('../config/logger.js').loggerError;

const defaultLogger = (req, res, next) => {
    loggerDefault.info(`Acceso a: ruta ${req.path} y método ${req.method} correcto`);
    next();
};

const warnLogger = (req, res, next) => {
    loggerWarn.warn(
        `Recurso Inexistente: ruta ${req.path} y método ${req.method} no definida`
    );
    next();
};

module.exports = { defaultLogger, warnLogger };
