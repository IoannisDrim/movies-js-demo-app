const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const Dotenv = require('dotenv-webpack');

module.exports = () =>
  merge(commonConfig(), {
    mode: 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      chunkFilename: 'main.js',
      publicPath: '/',
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    devServer: {
      liveReload: true,
      open: true,
      hot: true,
    },
    plugins: [new Dotenv()],
  });
