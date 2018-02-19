import gulp from "gulp";
import { spawn } from "child_process";
import hugo from "hugo-bin";
import htmlmin from "gulp-htmlmin";

import { minifierConf } from "../config/html.conf";

export const minifyHtml = (src, dest) => {
  return gulp
    .src(src)
    .pipe(htmlmin(minifierConf))
    .pipe(gulp.dest(dest));
};

export const buildSite = (src, dest, cb, env = "development") => {
  const hugoArgsGeneral = ["-d", dest, "-s", src, "-v"];
  const hugoArgsDev = ["--buildDrafts", "--buildFuture"];
  const hugoArgsProd = [];
  const args =
    env === "production"
      ? [...hugoArgsGeneral, ...hugoArgsProd]
      : [...hugoArgsGeneral, ...hugoArgsDev];

  process.env.NODE_ENV = env;

  spawn(hugo, args, { stdio: "inherit" }).on("close", code => {
    cb(code);
  });
};
