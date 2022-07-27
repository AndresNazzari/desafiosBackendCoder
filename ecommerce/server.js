import Express from 'express';
import dotenv from 'dotenv/config.js';
import config from './src/config/config.js';
import http from 'http';
import { Server } from 'socket.io';
import cluster from 'cluster';
import os from 'os';
import compression from 'compression';
import apiRouter from './src/routes/api/v1/index.js';
import { defaultLogger, warnLogger } from './src/middlewares/loggers.middleware.js';
import { loggerDefault, loggerError } from './src/config/logger.config.js';

/*==================================[Config]=================================*/
export const app = Express();
const httpServer = http.Server(app);
const ioServer = new Server(httpServer);

/*==============================[Base de Datos]==============================*/

/*===============================[Middlewares]===============================*/
app.use(compression());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/*==================================[Routes]==================================*/

//app.use(defaultLogger); //loguea todas las requests

app.use('/api/v1/', apiRouter); //rutas de la api

app.use(warnLogger); //loguea acceso a recursos inexistentes
/*=================================[Websokets]===============================*/

/*==================================[Server]=============================y=====*/
if (config.MODE == 'cluster') {
    if (cluster.isPrimary) {
        loggerDefault.info('Server is running in cluster mode');
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }
        cluster.on('listening', (worker, address) => {
            loggerDefault.info(`Worker ${worker.process.pid} connected to ${address.address}:${address.port}`);
        });
    } else {
        const server = httpServer.listen(config.PORT, () => {
            loggerDefault.info(`Server is running in worker mode on port ${config.PORT}`);
        });
        server.on('error', (error) => {
            loggerError.error(`Error en servidor! ${error}`);
        });
    }
} else {
    const server = httpServer.listen(config.PORT, () => {
        loggerDefault.info(`Server is running in ${config.MODE} mode on port ${config.PORT}`);
    });

    server.on('error', (error) => {
        loggerError.error(`Error en servidor! ${error}`);
    });
}
