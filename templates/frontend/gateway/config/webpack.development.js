const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = () => ({
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // inject CSS to page
            loader: 'style-loader'
          },
          {
            // translates CSS into CommonJS modules
            loader: 'css-loader'
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require('autoprefixer')]
                }
              }
            }
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    open: true,
    static: path.resolve(__dirname, '../dist'),
    port: 8081,
    compress: true,
    historyApiFallback: true
  },
  plugins: [new HotModuleReplacementPlugin()]
})
