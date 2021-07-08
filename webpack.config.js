const Dotenv = require("dotenv-webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // the output bundle won't be optimized for production but suitable for development
  mode: "development",
  devServer: {
    // needed for router to work properly
    historyApiFallback: true,
  },
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    // the output of the webpack build will be in /dist directory
    path: path.resolve(__dirname, "dist"),
    // the filename of the JS bundle will be bundle.js
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          "svg-react-loader",
        ],
      },
    ],
  },
  devtool: "source-map",
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new Dotenv(),
  ],
};
