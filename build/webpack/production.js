import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import OptimizeJsPlugin from 'optimize-js-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import mediaPacker from 'css-mqpacker'
import config from '../config'
import baseConfig from './base'

export default merge(baseConfig, {
  output: {
    path: config.rootPath,
    publicPath: '',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: 'css?modules&importLoaders=1&localIdentName=[local]-[hash:base64:8]!resolve-url!sass',
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new ExtractTextPlugin('[name].[contenthash:8].css'),
    new CopyWebpackPlugin([
      {
        context: config.assetsPath,
        from: '**/*',
        to: path.join(config.rootPath, 'assets')
      }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.indexPath,
      inject: true,
      minify: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        preventAttributesEscaping: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        const resource = module.resource

        if (resource && (/\.js$/).test(resource)) {
          return resource.indexOf(config.nodePath) >= 0
        }

        return false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new OptimizeCssAssetsPlugin({
      canPrint: false
    })
  ]
})
