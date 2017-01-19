/**
 * Created by Nelson on 16/10/27.
 */
var webpack=require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('css/[name].css');
let extractLESS = new ExtractTextPlugin('css/[name].less');

module.exports={
    devtool: false,
    entry:{
        app: './entry.js'
    },
    output:{
        path:__dirname,
        filename:'js/bundle.js',
        publicPath:'/dist/'
    },
    module:{
        loaders:[//添加各种处理loader
            {
                test : /\.(less|css)$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            { test: /\.json$/, loader: 'json'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[hash:6].[name].[ext]'},
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/, include: __dirname, query: {presets: [ 'react-hmre' ]}},
            { test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader?prefix=font/" },
            { test: /\.eot$/, loader: "file-loader?prefix=font/" },
            { test: /\.svg$/, loader: "file-loader?prefix=font/" }
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    plugins: [
        extractCSS,
        extractLESS
    ]
};
