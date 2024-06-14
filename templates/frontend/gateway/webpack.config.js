const webpack = require('webpack')
const paths = require('./config/paths')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const loadPreset = require('./config/presets/loadPreset')
const loadConfig = (mode) => require(`./config/webpack.${mode}.js`)(mode)
const Dotenv = require('dotenv-webpack')

class HTMLPlugin {
  constructor(env) {
    this.env = env
  }

  apply(compiler) {
    const { mode = 'production' } = this.env || {}
    const isDevelopment = mode === 'development'

    const htmlPluginOptions = {
      template: `${paths.publicPath}/index.html`,
      robots: `${paths.publicPath}/robots.txt`,
      publicPath: isDevelopment ? '/' : './'
    }

    const htmlWebpackPlugin = new HTMLWebpackPlugin(htmlPluginOptions)
    htmlWebpackPlugin.apply(compiler)
  }
}

module.exports = function (env) {
  const { mode = 'production' } = env || {}

  return merge(
    {
      mode,
      entry: `${paths.srcPath}/index.js`,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
      },
      module: {
        rules: [
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false
            }
          },
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: path.resolve(__dirname, 'node_modules')
          },
          // Images: Copy image files to build folder
          { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

          // Fonts and SVGs: Inline files
          { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' }
        ]
      },
      resolve: {
        modules: [paths.srcPath, 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        fallback: {
          vm: false,
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          fs: false,
          path: require.resolve('path-browserify'),
          zlib: require.resolve('browserify-zlib')
        },
        alias: {
          react: path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
          'near-api-js': path.resolve(__dirname, './node_modules/near-api-js')
        }
      },
      plugins: [
        new Dotenv(),
        new webpack.EnvironmentPlugin({
          ENVIRONMENT: 'browser',
          MODE: mode
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: paths.publicPath,
              to: 'assets',
              globOptions: {
                ignore: ['*.DS_Store']
              },
              noErrorOnMissing: true
            }
          ]
        }),
        new HTMLPlugin(env),
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: [require.resolve('buffer/'), 'Buffer']
        }),
        new ManifestPlugin.WebpackManifestPlugin()
      ]
    },
    loadConfig(mode),
    loadPreset(env)
  )
}
