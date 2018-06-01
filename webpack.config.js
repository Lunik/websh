/**
 * Created by lunik on 04/07/2017.
 */
const webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

const BUILD_DIR = __dirname + '/build'

const DEV = process.env.NODE_ENV !== 'production'

const uglifyPlugin = DEV ? new UnminifiedWebpackPlugin() : new UglifyJsPlugin()

module.exports = [
  {
    entry: './src/server/index.js',
    watch: DEV,
    output: {
      path: BUILD_DIR,
      filename: 'server.js'
    },
    module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }]
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    plugins: [
      uglifyPlugin
    ]
  },
  {
    entry: './src/public/index.js',
    watch: DEV,
    output: {
      path: BUILD_DIR + '/public',
      filename: 'src/app.js'
    },
    module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }, {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/public/static/'}
      ]),
      uglifyPlugin
    ]
  }
]
