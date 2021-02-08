const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
// const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const uglify = require("gulp-uglify");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;
// const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require("./gulp.config");

sass.compiler = require("node-sass");

task("clean", () => {
  return src("dist/**/*", { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src("src/*.html")
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

task("copy:img", () => {
  return src("src/img/**/*").pipe(dest("dist/img"));
});

task("copy:fonts", () => {
  return src("src/fonts/**/*").pipe(dest("dist/fonts"));
});

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/styles/main.scss",
];

task("styles", () => {
  return src(styles)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      gulpif(
        env === "prod",
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
          cascade: false,
        })
      )
    )
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

const libs = ["node_modules/jquery/dist/jquery.js", "src/scripts/*.js"];

task("scripts", () => {
  return src(libs)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src('src/img/icons/*.svg')
    // .pipe(svgo({
    //   plugins: [
    //     {
    //       removeAttrs: {
    //         attrs: '(fill|stroke|style|width|height|data.*)'
    //       }
    //     }
    //   ]
    // }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img/icons'));
 });

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: false,
  });
});

task("watch", () => {
  watch("./src/styles/**/*.scss", series("styles"));
  watch("./src/*.html", series("copy:html"));
  watch("./src/scripts/*.js", series("scripts"));
  watch("./src/img/icons/*.svg", series("icons"));
});

task(
  "default",
  series(
    "clean",
    parallel("copy:html", "copy:img", "copy:fonts", "styles", "scripts", "icons"),
    parallel("watch", "server")
  )
);

task(
  "build",
  series(
    "clean",
    parallel("copy:html", "copy:img", "copy:fonts", "styles", "scripts", "icons")
  )
);
