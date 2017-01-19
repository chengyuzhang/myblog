/**
 * Created by Nelson on 2016/11/28.
 */
import path from 'path';
import express from 'express';
import log4js from 'log4js';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.node.dev.js';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory,match,RouterContext} from 'react-router';

import {getData} from '../actions/actions';
import {App} from '../containers/App';
import routes from '../routes/router';

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
    const app = new express();
    const port = 3000;


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



    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));

    app.use(express.static(path.join(path.resolve(__dirname, '..'),'')));
//console.log('__dirname:',path.join(path.resolve(__dirname, '..'),''));
//app.use(express.static(path.join(__dirname, ''), {index: false}))

    app.get('*',(req, res) => {
        match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {

            //console.log('url:',req.url);

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

        // const html = renderToString(
        //     <Provider store={store}>
        //         <RouterContext {...renderProps} />
        //     </Provider>
        // );

        // console.log('html:',html);

        // res.send(renderFullPage(html,store.getState()));
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
        <title>MyBlog</title>
        <link href="http://127.0.0.1:3000/dist/css/animate.css" rel="stylesheet">
        <script>document.querySelector('html').style.fontSize=window.innerWidth/19.2+'px';</script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="http://127.0.0.1:3000/dist/js/bundle.js"></script>
        <script>

            // var oList=document.querySelector('.img-list');
            // var aLi=document.querySelectorAll('.right-item');
            // var iW=aLi[0].offsetWidth+1;
            // var iL=aLi.length;

            // oList.style.width=iW*iL+'px';

            // var aBtn=document.querySelectorAll('.btn');
            // var num=0;

            // aBtn[0].addEventListener('click',function(){
            //     num--;
            //     if(num<-(iL-3)){
            //         num=-(iL-3);
            //         return;
            //     }
            //     //oList.style.transform='translate3d('+num*iW+'px,0,0)';
            //     oList.style.left=num*iW+'px';
            // },false);

            // aBtn[1].addEventListener('click',function(){
            //     num++;
            //     if(num>0){
            //         num=0;
            //         return;
            //     }
            //     //oList.style.transform='translate3d('+num*iW+'px,0,0)';
            //     oList.style.left=num*iW+'px';
            // },false);


            // for(var i=0; i<aLi.length; i++){
            //     aLi[i].addEventListener('click',function(){

            //         var obj=this.querySelector('.content');
            //         obj.style.display='block';
            //     },false);
            // }

            // window.onresize=function(){
            //     document.querySelector('html').style.fontSize=window.innerWidth/19.2+'px';

            //     iW=aLi[0].offsetWidth+1;
            //     oList.style.width=iW*iL+'px';

            //     var aBtn=document.querySelectorAll('.btn');
            //     var num=0;

            //     aBtn[0].addEventListener('click',function(){
            //         num--;
            //         if(num<-(iL-3)){
            //             num=-(iL-3);
            //             return;
            //         }
            //         //oList.style.transform='translate3d('+num*iW+'px,0,0)';
            //         oList.style.left=num*iW+'px';
            //     },false);

            //     aBtn[1].addEventListener('click',function(){
            //         num++;
            //         if(num>0){
            //             num=0;
            //             return;
            //         }
            //         //oList.style.transform='translate3d('+num*iW+'px,0,0)';
            //         oList.style.left=num*iW+'px';
            //     },false);
            // };


        </script>
      </body>
    </html>
    `
    }

    app.listen(port, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        }
    });
}
