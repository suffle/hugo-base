import gulp from "gulp";
import sourceMaps from "gulp-sourcemaps";
import postCss from "gulp-postcss";
import cssImport from "postcss-import";
import cssNext from "postcss-cssnext";
import precss from "precss";
import mqpacker from "css-mqpacker";
import cssnano from "cssnano";
import cssnanoConfig from "../config/cssnano.conf";
import precssConfig from "../config/precss.conf";

const postCssDefaultPlugins = [precss(precssConfig), cssNext(), mqpacker()];

const postCssProdPlugins = [];

export const cssDev = (src, dest, browserSync) => {
    return gulp
     .src(src)
     .pipe(sourceMaps.init())
     .pipe(postCss(postCssDefaultPlugins))
     .pipe(sourceMaps.write("."))
     .pipe(gulp.dest(dest))
     .pipe(browserSync.stream());
 };
 
 export const cssProd = (src, dest) => {
   const postCssPlugins = [...postCssDefaultPlugins, ...postCssProdPlugins];
 
   // For some reason cssnano must be called separately to work correctly
   return gulp
     .src(src)
     .pipe(postCss(postCssPlugins))
     .pipe(postCss([cssnano(cssnanoConfig)]))
     .pipe(gulp.dest(dest));
 };