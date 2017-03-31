import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import baseWebpackConfig from './base'
import config from '../config'

Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    ...[baseWebpackConfig.entry[name]]
  ]
})

export default merge(baseWebpackConfig, {
  cache: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.WatchIgnorePlugin([config.nodePath]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.indexPath,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
