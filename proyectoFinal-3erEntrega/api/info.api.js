const os = require('os');

class InfoApi {
    getInfo() {
        //console.log('pruieba prueba');
        return {
            argEntrada: process.argv,
            plataforma: process.platform,
            nodeVer: process.version,
            rss: process.memoryUsage().rss,
            execPath: process.cwd(),
            processId: process.pid,
            carpetaProyect: process.cwd(),
            numCPUs: os.cpus().length,
        };
    }
}
module.exports = InfoApi;
