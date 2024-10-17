const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const MAX_ASSET_SIZE = 0.1 * 1024 * 1024; // 100KB

module.exports = () =>
  merge(commonConfig(), {
    mode: 'production',
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'main.js',
      chunkFilename: 'main.js',
      publicPath: '/',
    },
    performance: {
      hints: 'warning',
      maxAssetSize: MAX_ASSET_SIZE,
      maxEntrypointSize: MAX_ASSET_SIZE,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'main.css',
      }),
      new Dotenv({
        systemvars: true,
      }),
    ],
  });
