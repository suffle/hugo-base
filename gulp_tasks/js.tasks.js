import gulp from "gulp";
import gutil from "gulp-util";
import webpack from "webpack";
import webpackConf, {
  webpackDevConf,
  webpackProdConf
} from "../config/webpack.conf";
import webpackMerge from "webpack-merge";

export const webpackErrorHandling = callback => {
  return (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log(
      "[webpack]",
      stats.toString({
        colors: true,
        progress: true
      })
    );
    callback();
  };
};

export const getWebpackInstance = env => {
  const conf = webpackMerge(
    webpackConf,
    env === "production" ? webpackProdConf : webpackDevConf
  );

  return webpack(conf);
};
