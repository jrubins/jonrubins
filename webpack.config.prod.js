const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const buildConfig = require('./buildConfig')

module.exports = {
  bail: true,
  context: __dirname,
  entry: {
    main: buildConfig.paths.app.mainJs,
  },
  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js',
    path: buildConfig.paths.dist,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          buildConfig.paths.app.base,
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: [
          buildConfig.paths.app.base,
        ],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1',
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    // This is a shorthand plugin for the DefinePlugin.
    new webpack.EnvironmentPlugin([
      'API_BASE_URL',
      'APP_ENV',
      'NODE_ENV',
    ]),

    new HtmlWebpackPlugin({
      favicon: buildConfig.paths.app.favicon,
      template: buildConfig.paths.app.html,
    }),

    // Need this to preserve the IDs of Webpack modules between builds. Otherwise having new imports in the main bundle
    // will cache-bust the vendor bundle.
    new webpack.HashedModuleIdsPlugin(),

    // Enable scope-hoisting.
    new webpack.optimize.ModuleConcatenationPlugin(),

    // This makes our vendor bundle from node_modules modules.
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
      name: 'vendor',
    }),

    // This ensures that our vendor bundle name doesn't change between builds (unless the vendor contents change)
    // by extracting out the webpack bootstrap code into its own file.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false,
      },
      mangle: {
        screw_ie8: true, // eslint-disable-line camelcase
      },
      output: {
        comments: false,
        screw_ie8: true, // eslint-disable-line camelcase
      },
    }),

    new ExtractTextPlugin('css/[name].[contenthash].css'),

    new CopyWebpackPlugin([{
      from: './_redirects',
    }]),
  ],
  resolve: {
    modules: [
      'node_modules',
      buildConfig.paths.base,
    ],
    extensions: [
      '.js',
      '.jsx',
    ],
  },
}
