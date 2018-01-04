import gulp from "gulp";
import responsive from "gulp-responsive";
import responsiveConfig from "gulp-responsive-config";
import imagemin from "gulp-imagemin";

import { responsiveOptions } from "../config/images.conf";

export const createResponsiveImages = (src, dest, configDirs) => {
  const config = responsiveConfig(configDirs, {
    extensions: ["jpg", "jpeg", "png", "webp"]
  });
  const fallback = [
    {
      name: "*.*"
    }
  ];

  return gulp
    .src(src + "/*.{png,jpg,webp}")
    .pipe(responsive([...config, ...fallback], responsiveOptions))
    .pipe(gulp.dest(dest));
};

export const copyNonResponsiveImages = (src, dest) => {
  return gulp.src(src).pipe(gulp.dest(dest));
};

export const minifyImages = imgDir => {
  return gulp
    .src(imgDir + "/*")
    .pipe(
      imagemin(
        [
          imagemin.gifsicle(),
          imagemin.jpegtran(),
          imagemin.optipng(),
          imagemin.svgo()
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest(imgDir));
};

export const imageDevTasks = ({ imgSrc, imgDest, configSources }) => {
  return gulp.parallel(
    createResponsiveImages.bind(null, imgSrc, imgDest, configSources),
    copyNonResponsiveImages.bind(null, imgSrc + "/*.{svg,gif}", imgDest)
  );
};

export const imageProdTasks = ({ imgSrc, imgDest, configSources }) => {
  return gulp.series(
    imageDevTasks({ imgSrc, imgDest, configSources }),
    minifyImages.bind(null, imgDest)
  );
};
