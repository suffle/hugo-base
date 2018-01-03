import gulp from "gulp";
import { spawn } from "child_process";
import hugo from "hugo-bin";
import BrowserSync from "browser-sync";

import { buildSite } from "./gulp_tasks/hugo.tasks";
import { cssDev, cssProd } from "./gulp_tasks/css.tasks";
import {
  getWebpackInstance,
  webpackErrorHandling
} from "./gulp_tasks/js.tasks";
import { imageDevTasks, imageProdTasks } from "./gulp_tasks/images.tasks";

const browserSync = BrowserSync.create();

const siteSrc = "src/site";
const siteDest = "./dist/";

const cssSrc = "src/css/*.css";
const cssDest = "./dist/css";

const imgPaths = {
  imgSrc: "src/img",
  imgDest: "./dist/img",
  configSources: [cssDest + "/**/*.css", siteDest + "/**/*.html"]
};

const env =
  process.env.NODE_ENV === "production" ? "production" : "development";

gulp.task(
  "css",
  () =>
    env === "production"
      ? cssProd(cssSrc, cssDest)
      : cssDev(cssSrc, cssDest, browserSync)
);

gulp.task("js", cb => {
  const compiler = getWebpackInstance(env);

  const devCallback = () => {
    browserSync.reload();
    cb();
  };

  const prodCallback = () => {
    cb();
  };

  return env === "production"
    ? compiler.run(webpackErrorHandling(prodCallback))
    : compiler.watch(
        { ignored: /node_modules/ },
        webpackErrorHandling(devCallback)
      );
});

gulp.task(
  "images",
  env === "production" ? imageProdTasks(imgPaths) : imageDevTasks(imgPaths)
);
gulp.task("hugo", cb => {
  const devCallback = code => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  };

  const prodCallback = code => {
    if (code === 0) {
      cb();
    } else {
      cb("Hugo build failed");
    }
  };

  return buildSite(
    siteSrc,
    "../../" + siteDest,
    env === "production" ? prodCallback : devCallback,
    env
  );
});

gulp.task("default", () => console.log(env));
