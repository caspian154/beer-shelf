var path = require('path')

const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './public/app.module.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // Extract all 3rd party modules into a separate 'vendor' chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),

    // Generate a 'manifest' chunk to be inlined in the HTML template
    new webpack.optimize.CommonsChunkPlugin('manifest'),

    // Need this plugin for deterministic hashing
    // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
    // for more info: https://webpack.js.org/how-to/cache/
    new WebpackMd5Hash(),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public') + '/index.html'
    }),

    new CopyWebpackPlugin([
      {
        context: 'public',
        from: '**/*.html',
        ignore: 'index.html'
      },
      {
        context: 'public',
        from: '**/*.css'
      }
    ])

    // Creates a 'webpack-assets.json' file with all of the
    // generated chunk names so you can reference them
    // new AssetsPlugin()
  ]
}
