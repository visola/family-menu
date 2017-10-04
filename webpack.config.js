const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
  entry: './src/frontend/js/index.js',
  node: {
    fs: 'empty',
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build/frontend/static`,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/frontend/html/index.html' }),
  ],
  module: {
    loaders: [{
      test: /src\/frontend\/js\/.+\.js$/,
      loader: 'babel-loader',
    }, {
      test: /.+\.css$/,
      use: [
        { loader: 'style-loader' }, // creates style nodes from JS strings
        { loader: 'css-loader' }, // translates CSS into CommonJS
      ],
    }, {
      test: /src\/frontend\/less\/.+\.less$/,
      use: [
        { loader: 'style-loader' }, // creates style nodes from JS strings
        { loader: 'css-loader' }, // translates CSS into CommonJS
        { loader: 'less-loader' }, // compiles Less to CSS
      ],
    }],
  },
};

module.exports = function exportedConfiguration(env) {
  const plugins = baseConfig.plugins || [];

  switch (env) {
    case 'development':
      Object.assign(baseConfig, {
        devtool: 'inline-source-map',
      });
      break;
    case 'production':
      plugins.push(new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }));
      plugins.push(new webpack.optimize.UglifyJsPlugin());

      Object.assign(baseConfig, { plugins });
      break;

    default:
      throw new Error('Unhandled environment.');
  }

  return baseConfig;
};
