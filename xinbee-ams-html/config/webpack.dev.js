const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');


module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',

    devServer: {
      contentBase: path.join(__dirname, "../build"),
      compress: true,
      host : '0.0.0.0',
      port: 3000,
      proxy: {
        "/test": {
          target: 'http://192.168.0.26:8091',
          pathRewrite: {"^/test" : ""}
        }
      }
    }
  })
}
