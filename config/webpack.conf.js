import webpack from "webpack";
import path from "path";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const commonConfig = {
    context: path.join(__dirname, "../src"),
    entry: {
      header: "./js/header",
      footer: "./js/footer"
    },
    output: {
      path: path.join(__dirname, "../dist/js"),
      publicPath: "/js",
      filename: "[name].js"
    },
  
    module: {
      rules: [
        {
          test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader?name=/[hash].[ext]"
        },
        {
          loader: "babel-loader",
          test: /\.js?$/,
          exclude: /node_modules/,
          query: { cacheDirectory: true }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist/js"], {
        root: process.cwd()
      }),
    ]
  };
  

const webpackDevConf = {
    devtool: 'source-map'
}

const webpackProdConf = {
    plugins: [
        new UglifyJSPlugin()
    ]
}

export {webpackDevConf, webpackProdConf}

export default commonConfig