import path from 'path';

import cssnano from 'cssnano';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          babelrc: true,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(buildPath),
    new FaviconsWebpackPlugin({
      logo: './src/assets/icon.png',
      prefix: 'icons-[hash]/',
      persistentCache: true,
      inject: true,
      title: 'favicon',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new UglifyJSPlugin({
      sourceMap: false,
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('styles.[contentHash].css', {
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        map: {
          inline: false,
        },
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
  ],
};
