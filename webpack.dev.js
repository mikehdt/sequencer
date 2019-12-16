const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'source-map',
  entry: './src/index.js',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[name]-[local]-[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|mp3|mp4|m4a|ogg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]?hash=[hash:20]',
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
      inject: true,
    }),
  ],
};
