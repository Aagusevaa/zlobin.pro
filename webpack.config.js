'use strict';

const path = require('path');
const webpack = require('webpack');
// const sassLintPlugin = require('sasslint-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProduction = (env === 'production');
const srcPath = path.join(__dirname, 'src/js');
const distPath = path.join(__dirname, 'dist');
const entryPoint = './src/js/';
const outputName = 'bundle';

let plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.NoErrorsPlugin()/* ,
  new sassLintPlugin({
    quiet: false,
    failOnWarning: true,
    failOnError: false,
    testing: true
  }) */
];

if (isProduction) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        unsafe: true
      }
    })
  );
}

module.exports = {
  devtool: isProduction ? 'cheap-source-map' : 'eval',
  entry: entryPoint,
  watch: true,
  output: {
    path: distPath,
    filename: `${outputName}.js`
  },
  resolve: {
    root: distPath
  },
  plugins,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: srcPath
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      }, {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
};
