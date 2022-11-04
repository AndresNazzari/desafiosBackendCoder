import os from 'os';

export default class InfoApi {
  getInfo() {
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
  static getInstance() {
    if (!InfoApi.instance) {
      InfoApi.instance = new InfoApi();
    }
    return InfoApi.instance;
  }
}
