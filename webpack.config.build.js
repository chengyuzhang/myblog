/**
 * Created by Nelson on 16/10/27.
 */
var webpack=require('webpack');

//公共文件分离
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js');

//分离css文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ExtCSS=new ExtractTextPlugin('css/[name].css');
let ExtLESS = new ExtractTextPlugin('css/[name].less');

//文件压缩
var UglifyJs=new webpack.optimize.UglifyJsPlugin({compress:{warnings:false},minimize: true});

//生成html文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWeb=new HtmlWebpackPlugin({
    filename:'index.html',
    template:'template/index.html'
});

module.exports={
    devtool: false,
    entry:{
        app: './entry.js'
    },
    output:{
        path:__dirname+'/dist/',
        filename:'js/bundle.js',
        publicPath:'/dist/'
    },
    module:{
        loaders:[//添加各种处理loader
            { test: /\.(less|css)$/, loader: ExtractTextPlugin.extract("style", "css!less") },
            { test: /\.json$/, loader: 'json'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[hash:6].[name].[ext]'},
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/, include: __dirname, query: {presets: [ 'react-hmre' ]}},
            { test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader?prefix=font/" },
            { test: /\.eot$/, loader: "file-loader?prefix=font/" },
            { test: /\.svg$/, loader: "file-loader?prefix=font/" }
        ]
    },
    resolve:{//
        extensions:['','.js','.json']
    },
    plugins: [
        ExtCSS,
        ExtLESS,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        UglifyJs,
        HtmlWeb,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    watch:false
};
