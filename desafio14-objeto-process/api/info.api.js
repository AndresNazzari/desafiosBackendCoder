class InfoApi {
    getInfo() {
        return {
            argEntrada: process.argv,
            plataforma: process.platform,
            nodeVer: process.version,
            rss: process.memoryUsage().rss,
            execPath: process.cwd(),
            processId: process.pid,
            carpetaProyect: process.cwd(),
        };
    }
}
module.exports = InfoApi;
