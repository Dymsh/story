"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var sequence = require("gulp-sequence");
var del = require("del");
var uglify = require("gulp-uglify");



gulp.task("clean", function() {
  return del("build");
});
gulp.task ("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
    ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
})

gulp.task ("html-copy", function(){
  return gulp.src("*.html")
  .pipe(gulp.dest("build"));
});
gulp.task("html-update", ["html-copy"], function(done) {
  server.reload();
  done();
});
gulp.task("svgstore", function() {
  return gulp.src("build/img/*.svg")
  .pipe(svgmin())
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("imagemin", function() {
  return gulp.src("build/img/**/*.{jpg,png,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("style", function() {
  gulp.src("scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions"]}),
      mqpacker({sort: true})
    ]))
    .pipe(rename("stile-beforeCsso.css"))
    .pipe(gulp.dest("css"))
    .pipe(csso())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});
gulp.task("uglify", function () {
   return gulp.src("js/putText.js")
    .pipe(rename("test.js"))
    .pipe(uglify())
    .pipe(gulp.dest("js"))
    .pipe(server.stream());
});

gulp.task("server", ["style"],function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("scss/**/*.{scss,sass}", ["style"]);
  gulp.watch("js/*.js").on('change', server.reload);
  gulp.watch("*.html").on('change', server.reload);
});

gulp.task("build", function(end) {
  sequence("clean","copy","svgstore","imagemin","style","server", end);
});
