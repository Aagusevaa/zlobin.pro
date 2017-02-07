'use strict';

// https://github.com/webpack-contrib/awesome-webpack#webpack-plugins
// webpack or webpack -p

const path = require('path');
const webpack = require('webpack');

const compressionPlugin = require('compression-webpack-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isProduction = (env === 'production');
const srcPath = path.join(__dirname, 'src/js');
const distPath = path.join(__dirname, 'dist');
const entryPoint = './src/js/';
const outputName = 'bundle';

const plugins = [
  new compressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new styleLintPlugin()
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
        include: srcPath,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          'eslint-loader'
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};
