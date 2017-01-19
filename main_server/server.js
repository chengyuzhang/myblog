
import path from 'path';
import express from 'express';
import log4js from 'log4js';
import cluster from 'cluster';
import http from 'http';
import os from 'os';
import index from './routes/index';


var numCPUs = os.cpus().length;

if (cluster.isMaster) {
    // Fork workers
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' restart');
        setTimeout(function() {cluster.fork();},2000);
    });
} else {
    const app = new express();
    const port = 3001;

    app.use(express.static(path.join(path.resolve(__dirname, '..'),'')));

    //路由
    app.use('/',index)

    app.listen(port, (error) => {
        if (error) {
            console.error('err:',error);
        } else {
            console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        }
    });
}
