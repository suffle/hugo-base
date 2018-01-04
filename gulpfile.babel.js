import gulp from "gulp";
import BrowserSync from "browser-sync";
import del from "del";

import { buildSite } from "./gulp_tasks/hugo.tasks";
import { cssDev, cssProd, criticalCss } from "./gulp_tasks/css.tasks";
import {
  getWebpackInstance,
  webpackErrorHandling
} from "./gulp_tasks/js.tasks";
import { imageDevTasks, imageProdTasks } from "./gulp_tasks/images.tasks";

const browserSync = BrowserSync.create();

const siteSrc = "src/site";
const siteDest = "./dist";

const cssSrcDir = "src/css";
const cssSrc = cssSrcDir + "/*.css";
const cssDest = "./dist/css";

const imgPaths = {
  imgSrc: "src/img",
  imgDest: "./dist/img",
  configSources: [cssDest + "/**/*.css", siteDest + "/**/*.html"]
};

const env =
  process.env.NODE_ENV === "production" ? "production" : "development";

const serve = cb => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
  cb();
};

const watch = cb => {
  gulp.watch(cssSrcDir + "/**/*.css", gulp.series("css"));
  gulp.watch(siteSrc + "/**/*.*", gulp.series("hugo"));
  cb();
};

gulp.task("clean", cb => {
  del(siteDest).then(() => cb());
});

gulp.task(
  "css",
  () =>
    env === "production"
      ? cssProd(cssSrc, cssDest)
      : cssDev(cssSrc, cssDest).pipe(browserSync.stream())
);

gulp.task(
  "criticalCss",
  gulp.series(criticalCss.bind(null, siteDest + "/**/*.html", siteDest))
);

gulp.task("js", cb => {
  const compiler = getWebpackInstance(env);

  const callback = () => {
    cb();
  };
  compiler.run(webpackErrorHandling(callback));
});

gulp.task("watch-js", cb => {
  const compiler = getWebpackInstance(env);

  const callback = () => {
    browserSync.reload();
    cb();
  };

  compiler.watch({ ignored: /node_modules/ }, webpackErrorHandling(callback));
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
      browserSync.notify("Hugo build failed");
      cb();
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

gulp.task(
  "additionalBuildSteps",
  env === "production" ? gulp.series("criticalCss") : cb => cb()
);

/** Some of the tasks in the build step could also be run parallel,
 * using series here to keep output similar in every run for debugging
 */

gulp.task(
  "build",
  gulp.series("clean", "hugo", "css", "js", "images", "additionalBuildSteps")
);

gulp.task("watch", gulp.series("build", "watch-js", serve, watch));

gulp.task("default", () => console.log(env));
