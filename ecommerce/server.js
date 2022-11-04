import Express from 'express';
import dotenv from 'dotenv/config.js';
import config from './src/config/config.js';
import http from 'http';
import { Server } from 'socket.io';
import cluster from 'cluster';
import os from 'os';
import compression from 'compression';
import apiRouter from './src/routes/api/v1/index.js';
import webRouter from './src/routes/web/index.js';
import { defaultLogger, warnLogger } from './src/middlewares/loggers.middleware.js';
import { loggerDefault, loggerError } from './src/config/logger.config.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './src/config/swagger.js';
import exphbs from 'express-handlebars';
/*==================================[Config]=================================*/
export const app = Express();
const httpServer = http.Server(app);
const ioServer = new Server(httpServer);

/*==============================[Base de Datos]==============================*/

/*===============================[Middlewares]===============================*/
app.use(compression());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/*----------- Motor de plantillas -----------*/
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutDir: './src/views/layouts',
    partialDir: './src/views/partials',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');
/*==================================[Routes]==================================*/

app.use(defaultLogger); //loguea todas las requests

app.use('/api/v1/', apiRouter); //rutas de la api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/', webRouter);
app.use(warnLogger); //loguea acceso a recursos inexistentes
/*=================================[Websokets]===============================*/
//TODO implementar websoket para el chat

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
