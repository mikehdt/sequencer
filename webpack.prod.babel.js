import path from 'path';
import cssnano from 'cssnano';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash:8].js',
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        }],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              localIdentName: '[contenthash:8]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            limit: 8192,
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(buildPath),
    new UglifyJSPlugin({
      sourceMap: false,
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[name].[contenthash:8].css',
      chunkFilename: 'styles.[id].css',
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
