/**
 * Created by Nelson on 2016/11/28.
 */
const webpack=require('webpack');

//分离css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('css/[name].css');
let extractLESS = new ExtractTextPlugin('css/[name].less');

//文件压缩
const UglifyJsPlugin=new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}});

module.exports={
    devtool: 'eval-source-map',//定位到错误信息位置
    entry:[
        'webpack-hot-middleware/client?path=http://127.0.0.1:3000/__webpack_hmr&reload=true&noInfo=false&quiet=false',
        'babel-polyfill',
        './entry.js'
    ],
    output:{
        path:__dirname+'/dist/',
        filename:'js/bundle.js',
        publicPath:'http://127.0.0.1:3000/dist/'
    },
    module:{
        perLoaders:[//perLoaders顾名思义就是在loaders执行之前处理的
            {
                test: /\.(less|css)$/,
                loader: 'style!css!less'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=[hash:8].[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname,
                query: {presets: [ 'react-hmre' ]}
            }
        ],
        loaders:[//添加各种处理loader
            {
                test: /\.(less|css)$/,
                loader: 'style!css!less'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=[hash:8].[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname,
                query: {presets: [ 'react-hmre' ]}
            }

        ],
        jshint: {//配置jshint的选项，支持es6的校验
            "esnext": true
        }
    },
    resolve:{//
        extensions:['','.js','.json']
    },

    plugins: [
        //extractCSS,
        //extractLESS,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
