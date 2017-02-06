'use strict';

// https://github.com/webpack-contrib/awesome-webpack#webpack-plugins
// webpack or webpack -p

const path = require('path');
const webpack = require('webpack');

const compressionPlugin = require('compression-webpack-plugin');
const sassLintPlugin = require('sasslint-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProduction = (env === 'production');
const srcPath = path.join(__dirname, 'src/js');
const distPath = path.join(__dirname, 'dist');
const entryPoint = './src/js/';
const outputName = 'bundle';

let plugins = [
  new compressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new sassLintPlugin({
    quiet: false,
    failOnWarning: false,
    failOnError: false,
    testing: false
  })
];

module.exports = {
  devtool: isProduction ? 'cheap-source-map' : 'eval',
  entry: entryPoint,
  watch: true,
  output: {
    path: distPath,
    filename: `${outputName}.js`
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
          'eslint-loader'
        ],
        include: srcPath,
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'sasslint-loader'
        ]
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};
