const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './docs'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?[a-z0-9=.]+)?$/,
        type: 'asset',
      },
    ]
  },
  resolve: {
    alias: {
      $: 'jquery',
      jQuery: 'jquery',
    },
    extensions: ['*', '.js', '.json'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: 'src/logo.svg',
      mode: 'webapp',
      devMode: 'light',
      prefix: 'static/',
      favicons: {
        appName: 'K&R Fotoboxen',
        appDescription: 'K&R Fotoboxen',
        developerName: 'K&R Fotoboxen',
        lang: "de-DE",
        inject: true,
        start_url: "/",
        developerURL: null,
        background: '#6495ed',
        theme_color: '#6495ed',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/static', to: 'static' },
      ],
    }),
    new LinkTypePlugin({
      '*.css' : 'text/css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './docs'),
    },
    client: {
      progress: true,
      overlay: true,
    },
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  performance: {
    hints: false,
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production';
  module.exports.devtool = false;
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
