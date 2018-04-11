const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/app.js')
  ],

  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'assets'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env', 'react', 'stage-2'],
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg|otf)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          }
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: './assets',
    port: 8000,
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true,
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    })
  ],
};
