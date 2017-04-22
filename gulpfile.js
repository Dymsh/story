"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var csso = require("gulp-csso");
var browserSync = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var sequence = require("gulp-sequence");
var del = require("del");
var uglify = require("gulp-uglify");

gulp.task("clean", function() {
  return del(['build/**', '!build']);
});

gulp.task ("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2,ttf}",
    "img/**",
    "js/**",
    "modules/**",
    "libs/**",
    "*.php",
    ".htaccess"
    ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
})
gulp.task ('php_update', function() {
  return gulp.src(['*.php', 'modules/**/*.php', 'libs/**/*.php'], {
    base: "."
  })
  .pipe(gulp.dest("build"))
  .pipe(browserSync.stream());
});

gulp.task ('html_update', function() {
  return gulp.src(['*.html', 'modules/**/*.html'], {
    base: "."
  })
  .pipe(gulp.dest("build"))
  .pipe(browserSync.stream());

});

gulp.task ('js_update', function() {
  return gulp.src('js/*.js', {
    base: "."
  })
  .pipe(gulp.dest("build"))
  .pipe(browserSync.stream());

});
/*
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
*/
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
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

gulp.task("uglify", function () {
   return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
});


gulp.task("serve", ["style"],function() {
  browserSync.init({
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
  sequence("clean","copy","imagemin","style","browserSync", end);
});

gulp.task("browserSync", function() {
  browserSync.init({
    proxy:'story'
  });
  gulp.watch(["*.php", 'modules/**/*.php', 'libs/**/*.php'], ['php_update']);
  gulp.watch(["*.html",'modules/**/*.html'], ['html_update']);
  gulp.watch("js/*.js", ['js_update']);
  gulp.watch("scss/**/*.{scss,sass}", ['style']);
});
