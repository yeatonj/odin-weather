const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require('webpack')
require('dotenv').config({ path: './src/.env' });
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY)
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
