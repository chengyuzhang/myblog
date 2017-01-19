/**
 * Created by Nelson on 2016/11/28.
 */
import path from 'path';
import express from 'express';
import log4js from 'log4js';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../reducers/reducers';
import { Router, Route, browserHistory,match,RouterContext} from 'react-router';
import {getData} from '../../actions/actions';
import App from '../../containers/App';
import routes from '../../routes/router.js';
import index from '../../routes/units/index';

import cluster from 'cluster';
import http from 'http';
import os from 'os';
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
    // 这里放入口文件的东西并且直接使用express监听端口
    const app = new express();
    const port = 3001;

    log4js.configure({
        appenders: [
            { type: 'console' }, //控制台输出
            {
                type: 'file', //文件输出
                filename: 'logs/access.log',
                maxLogSize: 1024,
                backups:3,
                category: 'normal'
            }
        ]
    });
    var logger = log4js.getLogger('normal');
    logger.setLevel('INFO');

    app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));

    app.use(express.static(path.join(path.resolve(path.resolve(__dirname, '..')),'..'), ''));

    app.get('*',(req, res) => {
        match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
            if (err) {
                res.status(500).end(`Internal Server Error ${err}`);
            } else if (redirectLocation) {
                res.redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                handleRender(req, res, renderProps);
            } else {
                res.status(404).end('Not found');
            }
        });
    });

    function handleRender(req, res,renderProps) {

        const store = createStore(
            rootReducer,
            applyMiddleware(thunkMiddleware)
        );

        Promise.all([store.dispatch(getData({}))])
            .then(()=>{
                const html = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                res.send(renderFullPage(html,store.getState()));
            }).catch(e=>{
            console.log('errorrrrrr:',e);
        });
    }

    function renderFullPage(html, initialState) {

        console.log('server:',new Date().getTime());

        return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <meta name="format-detection" content="telephone=no,email=no">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
        <title>Redux</title>
        <link href="/dist/css/animate.css" rel="stylesheet">
        <link href="/dist/css/app.css" rel="stylesheet">
        <script>document.querySelector('html').style.fontSize=window.innerWidth/3.75+'px';</script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/js/bundle.js"></script>
      </body>
    </html>
    `
    }

    app.use(express.static(path.join(path.resolve(path.resolve(__dirname, '..')),'..'), ''));

    app.listen(port, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        }
    });
}



